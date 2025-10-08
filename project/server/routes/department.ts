import express from 'express';
import pool from '../config/database.js';
import { authenticateToken, requireRole, AuthRequest } from '../middleware/auth.js';

const router = express.Router();

router.get('/students', authenticateToken, requireRole('department'), async (req: AuthRequest, res) => {
  try {
    const [students] = await pool.execute(
      'SELECT id, email, full_name, department, enrollment_year, current_year, created_at FROM students WHERE role = "student" ORDER BY enrollment_year DESC, department'
    );

    res.json(students);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch students' });
  }
});

router.get('/alumni', authenticateToken, requireRole('department'), async (req: AuthRequest, res) => {
  try {
    const [alumni] = await pool.execute(
      'SELECT id, email, full_name, department, graduation_year, current_company, current_position, location, linkedin_url, phone, created_at FROM alumni ORDER BY graduation_year DESC, department'
    );

    res.json(alumni);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch alumni' });
  }
});

router.delete('/students/:id', authenticateToken, requireRole('department'), async (req: AuthRequest, res) => {
  try {
    const { id } = req.params;

    const [result]: any = await pool.execute(
      'DELETE FROM students WHERE id = ? AND role = "student"',
      [id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Student not found' });
    }

    res.json({ message: 'Student deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete student' });
  }
});

router.delete('/alumni/:id', authenticateToken, requireRole('department'), async (req: AuthRequest, res) => {
  try {
    const { id } = req.params;

    const [result]: any = await pool.execute(
      'DELETE FROM alumni WHERE id = ?',
      [id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Alumni not found' });
    }

    res.json({ message: 'Alumni deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete alumni' });
  }
});

router.post('/posts', authenticateToken, requireRole('department'), async (req: AuthRequest, res) => {
  try {
    const { title, content, post_type, department } = req.body;

    if (!title || !content || !post_type || !department) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    if (!['event', 'message', 'announcement'].includes(post_type)) {
      return res.status(400).json({ error: 'Invalid post type' });
    }

    await pool.execute(
      'INSERT INTO department_posts (title, content, post_type, department, created_by) VALUES (?, ?, ?, ?, ?)',
      [title, content, post_type, department, req.user?.email]
    );

    res.status(201).json({ message: 'Post created successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create post' });
  }
});

router.get('/posts', authenticateToken, requireRole('department'), async (req: AuthRequest, res) => {
  try {
    const [posts] = await pool.execute(
      'SELECT * FROM department_posts ORDER BY created_at DESC'
    );

    res.json(posts);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch posts' });
  }
});

router.delete('/posts/:id', authenticateToken, requireRole('department'), async (req: AuthRequest, res) => {
  try {
    const { id } = req.params;

    const [result]: any = await pool.execute(
      'DELETE FROM department_posts WHERE id = ?',
      [id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Post not found' });
    }

    res.json({ message: 'Post deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete post' });
  }
});

export default router;
