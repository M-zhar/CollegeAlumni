import express from 'express';
import pool from '../config/database.js';
import { authenticateToken, requireRole, AuthRequest } from '../middleware/auth.js';

const router = express.Router();

router.get('/list', authenticateToken, requireRole('alumni'), async (req: AuthRequest, res) => {
  try {
    const [alumni] = await pool.execute(
      'SELECT id, email, full_name, department, graduation_year, current_company, current_position, location, linkedin_url, phone, created_at FROM alumni ORDER BY graduation_year DESC'
    );

    res.json(alumni);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch alumni' });
  }
});

router.get('/posts', authenticateToken, requireRole('alumni'), async (req: AuthRequest, res) => {
  try {
    const [rows]: any = await pool.execute(
      'SELECT * FROM alumni WHERE id = ?',
      [req.user?.id]
    );

    if (rows.length === 0) {
      return res.status(404).json({ error: 'Alumni not found' });
    }

    const userDepartment = rows[0].department;

    const [posts] = await pool.execute(
      'SELECT * FROM department_posts WHERE department = ? OR department = "all" ORDER BY created_at DESC',
      [userDepartment]
    );

    res.json(posts);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch posts' });
  }
});

router.get('/profile', authenticateToken, requireRole('alumni'), async (req: AuthRequest, res) => {
  try {
    const [rows]: any = await pool.execute(
      'SELECT id, email, full_name, department, graduation_year, current_company, current_position, location, linkedin_url, phone, created_at FROM alumni WHERE id = ?',
      [req.user?.id]
    );

    if (rows.length === 0) {
      return res.status(404).json({ error: 'Alumni not found' });
    }

    res.json(rows[0]);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch profile' });
  }
});

router.put('/profile', authenticateToken, requireRole('alumni'), async (req: AuthRequest, res) => {
  try {
    const { current_company, current_position, location, linkedin_url, phone } = req.body;

    await pool.execute(
      'UPDATE alumni SET current_company = ?, current_position = ?, location = ?, linkedin_url = ?, phone = ? WHERE id = ?',
      [current_company, current_position, location, linkedin_url, phone, req.user?.id]
    );

    res.json({ message: 'Profile updated successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update profile' });
  }
});

export default router;
