import express from 'express';
import { requireAuth, requireAdmin } from '../middleware/auth.js';
import { pool } from '../config/db.js';

const router = express.Router();

router.get('/me', requireAuth, async (req, res) => {
  const [rows] = await pool.query(
    'SELECT id, full_name, email, role, created_at FROM users WHERE id = ?',
    [req.user.id]
  );
  res.json(rows[0] || null);
});

router.get('/admin/users', requireAuth, requireAdmin, async (_req, res) => {
  const [rows] = await pool.query(
    'SELECT id, full_name, email, role, created_at FROM users ORDER BY created_at DESC'
  );
  res.json(rows);
});

export default router;
