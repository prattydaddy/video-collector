const { google } = require("googleapis");

function getAuth() {
  const oauth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET
  );
  oauth2Client.setCredentials({ refresh_token: process.env.GOOGLE_REFRESH_TOKEN });
  return oauth2Client;
}

module.exports = async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { pairNumber, description } = req.body;
    if (!pairNumber || pairNumber < 1 || pairNumber > 80) {
      return res.status(400).json({ error: "Invalid pairNumber (1-80)" });
    }
    if (typeof description !== "string") {
      return res.status(400).json({ error: "description is required" });
    }

    const pad = String(pairNumber).padStart(2, "0");
    const folderName = `Pair_${pad}`;
    const auth = getAuth();
    const drive = google.drive({ version: "v3", auth });
    const ourFolderId = process.env.OUR_DRIVE_FOLDER_ID;

    // Find the pair folder
    const searchRes = await drive.files.list({
      q: `'${ourFolderId}' in parents and name='${folderName}' and mimeType='application/vnd.google-apps.folder' and trashed=false`,
      fields: "files(id,name)",
    });

    if (!searchRes.data.files?.length) {
      return res.status(404).json({ error: `Folder ${folderName} not found` });
    }

    const folderId = searchRes.data.files[0].id;

    // Find description.txt
    const filesRes = await drive.files.list({
      q: `'${folderId}' in parents and name='description.txt' and trashed=false`,
      fields: "files(id,name)",
    });

    const { Readable } = require("stream");

    if (filesRes.data.files?.length) {
      // Update existing file
      const fileId = filesRes.data.files[0].id;
      await drive.files.update({
        fileId,
        media: {
          mimeType: "text/plain",
          body: Readable.from([description]),
        },
      });
    } else {
      // Create new description.txt
      await drive.files.create({
        requestBody: {
          name: "description.txt",
          parents: [folderId],
          mimeType: "text/plain",
        },
        media: {
          mimeType: "text/plain",
          body: Readable.from([description]),
        },
      });
    }

    return res.status(200).json({ ok: true, folder: folderName });
  } catch (err) {
    console.error("update-description error:", err);
    return res.status(500).json({ error: err.message });
  }
};
