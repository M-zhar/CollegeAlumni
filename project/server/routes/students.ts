import express from 'express';
import pool from '../config/database.js';
import { authenticateToken, requireRole, AuthRequest } from '../middleware/auth.js';

const router = express.Router();

router.get('/alumni', authenticateToken, requireRole('student'), async (req: AuthRequest, res) => {
  try {
    const [alumni] = await pool.execute(
      'SELECT id, email, full_name, department, graduation_year, current_company, current_position, location, linkedin_url, phone, created_at FROM alumni ORDER BY graduation_year DESC'
    );

    res.json(alumni);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch alumni' });
  }
});

router.get('/profile', authenticateToken, requireRole('student'), async (req: AuthRequest, res) => {
  try {
    const [rows]: any = await pool.execute(
      'SELECT id, email, full_name, department, enrollment_year, current_year, created_at FROM students WHERE id = ?',
      [req.user?.id]
    );

    if (rows.length === 0) {
      return res.status(404).json({ error: 'Student not found' });
    }

    res.json(rows[0]);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch profile' });
  }
});

export default router;
