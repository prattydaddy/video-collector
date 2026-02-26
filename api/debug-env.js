export default async function handler(req, res) {
  res.status(200).json({
    hasClientId: !!process.env.GOOGLE_CLIENT_ID,
    clientIdPrefix: (process.env.GOOGLE_CLIENT_ID || '').substring(0, 10),
    hasClientSecret: !!process.env.GOOGLE_CLIENT_SECRET,
    secretPrefix: (process.env.GOOGLE_CLIENT_SECRET || '').substring(0, 8),
    hasRefreshToken: !!process.env.GOOGLE_REFRESH_TOKEN,
    refreshPrefix: (process.env.GOOGLE_REFRESH_TOKEN || '').substring(0, 10),
    hasDbUrl: !!process.env.DATABASE_URL,
    ourFolder: process.env.OUR_DRIVE_FOLDER_ID || 'NOT SET',
    clientFolder: process.env.CLIENT_DRIVE_FOLDER_ID || 'NOT SET',
  });
}
