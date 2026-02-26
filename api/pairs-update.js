import { neon } from '@neondatabase/serverless';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'PATCH, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'PATCH') return res.status(405).json({ error: 'Method not allowed' });

  try {
    const sql = neon(process.env.DATABASE_URL);
    const { id, ...fields } = req.body;
    if (!id) return res.status(400).json({ error: 'Missing id' });

    const current = await sql`SELECT * FROM video_pairs WHERE id = ${id}`;
    if (!current.length) return res.status(404).json({ error: 'Pair not found' });

    if (fields.status && fields.status !== current[0].status) {
      await sql`INSERT INTO video_pair_history (pair_id, old_status, new_status, changed_by)
                VALUES (${id}, ${current[0].status}, ${fields.status}, ${fields.changed_by || 'app'})`;
    }

    if (fields.status !== undefined) {
      await sql`UPDATE video_pairs SET status = ${fields.status}, updated_at = NOW() WHERE id = ${id}`;
    }
    if (fields.assignee !== undefined) {
      await sql`UPDATE video_pairs SET assignee = ${fields.assignee}, updated_at = NOW() WHERE id = ${id}`;
    }
    if (fields.notes !== undefined) {
      await sql`UPDATE video_pairs SET notes = ${fields.notes}, updated_at = NOW() WHERE id = ${id}`;
    }
    if (fields.description !== undefined) {
      await sql`UPDATE video_pairs SET description = ${fields.description}, updated_at = NOW() WHERE id = ${id}`;
    }
    if (fields.drive_folder_id !== undefined) {
      await sql`UPDATE video_pairs SET drive_folder_id = ${fields.drive_folder_id}, updated_at = NOW() WHERE id = ${id}`;
    }
    if (fields.video_a_id !== undefined) {
      await sql`UPDATE video_pairs SET video_a_id = ${fields.video_a_id}, updated_at = NOW() WHERE id = ${id}`;
    }
    if (fields.video_b_id !== undefined) {
      await sql`UPDATE video_pairs SET video_b_id = ${fields.video_b_id}, updated_at = NOW() WHERE id = ${id}`;
    }

    const updated = await sql`SELECT * FROM video_pairs WHERE id = ${id}`;
    res.status(200).json(updated[0]);
  } catch (err) {
    console.error('Error updating pair:', err);
    res.status(500).json({ error: 'Failed to update pair', detail: err.message });
  }
}
