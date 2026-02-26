import { google } from "googleapis";
import { neon } from "@neondatabase/serverless";

function getAuth() {
  const oauth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET
  );
  oauth2Client.setCredentials({ refresh_token: process.env.GOOGLE_REFRESH_TOKEN });
  return oauth2Client;
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { pairNumber } = req.body;
    if (!pairNumber || pairNumber < 1 || pairNumber > 80) {
      return res.status(400).json({ error: "Invalid pairNumber (1-80)" });
    }

    const pad = String(pairNumber).padStart(2, "0");
    const folderName = `Pair_${pad}`;
    const auth = getAuth();
    const drive = google.drive({ version: "v3", auth });

    const ourFolderId = process.env.OUR_DRIVE_FOLDER_ID;
    const clientFolderId = process.env.CLIENT_DRIVE_FOLDER_ID;

    const searchRes = await drive.files.list({
      q: `'${ourFolderId}' in parents and name='${folderName}' and mimeType='application/vnd.google-apps.folder' and trashed=false`,
      fields: "files(id,name)",
    });

    if (!searchRes.data.files?.length) {
      return res.status(404).json({ error: `Folder ${folderName} not found in our Drive` });
    }

    const srcFolderId = searchRes.data.files[0].id;

    const filesRes = await drive.files.list({
      q: `'${srcFolderId}' in parents and trashed=false`,
      fields: "files(id,name,mimeType)",
    });

    const files = filesRes.data.files || [];
    if (files.length === 0) {
      return res.status(404).json({ error: `No files found in ${folderName}` });
    }

    const destFolder = await drive.files.create({
      requestBody: {
        name: folderName,
        mimeType: "application/vnd.google-apps.folder",
        parents: [clientFolderId],
      },
      fields: "id",
    });

    const copied = [];
    for (const file of files) {
      const copy = await drive.files.copy({
        fileId: file.id,
        requestBody: {
          name: file.name,
          parents: [destFolder.data.id],
        },
        fields: "id,name",
      });
      copied.push(copy.data.name);
    }

    // Save client folder link to DB
    const clientDriveLink = `https://drive.google.com/drive/folders/${destFolder.data.id}`;
    try {
      const sql = neon(process.env.DATABASE_URL);
      await sql`UPDATE video_pairs SET client_drive_link = ${clientDriveLink}, updated_at = NOW() WHERE id = ${pairNumber}`;
    } catch (dbErr) {
      console.error("Failed to save client link to DB:", dbErr);
    }

    return res.status(200).json({
      success: true,
      pairNumber,
      folderName,
      filesCopied: copied,
      destFolderId: destFolder.data.id,
    });
  } catch (err) {
    console.error("Deliver error:", err);
    return res.status(500).json({ error: err.message, detail: err.response?.data || null });
  }
}
