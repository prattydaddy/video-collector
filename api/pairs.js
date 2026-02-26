const { neon } = require('@neondatabase/serverless');

module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' });

  try {
    const sql = neon(process.env.DATABASE_URL);
    const rows = await sql`SELECT * FROM video_pairs ORDER BY id`;
    res.status(200).json(rows);
  } catch (err) {
    console.error('Error fetching pairs:', err);
    res.status(500).json({ error: 'Failed to fetch pairs' });
  }
};
