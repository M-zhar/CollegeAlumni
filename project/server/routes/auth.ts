import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import pool from '../config/database.js';

const router = express.Router();

router.post('/register/student', async (req, res) => {
  try {
    const { email, password, full_name, department, enrollment_year, current_year } = req.body;

    if (!email || !password || !full_name || !department || !enrollment_year || !current_year) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const [result] = await pool.execute(
      'INSERT INTO students (email, password, full_name, department, enrollment_year, current_year) VALUES (?, ?, ?, ?, ?, ?)',
      [email, hashedPassword, full_name, department, enrollment_year, current_year]
    );

    res.status(201).json({ message: 'Student registered successfully' });
  } catch (error: any) {
    if (error.code === 'ER_DUP_ENTRY') {
      return res.status(400).json({ error: 'Email already registered' });
    }
    res.status(500).json({ error: 'Registration failed' });
  }
});

router.post('/register/alumni', async (req, res) => {
  try {
    const { email, password, full_name, department, graduation_year, current_company, current_position, location, linkedin_url, phone } = req.body;

    if (!email || !password || !full_name || !department || !graduation_year) {
      return res.status(400).json({ error: 'Required fields missing' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await pool.execute(
      'INSERT INTO alumni (email, password, full_name, department, graduation_year, current_company, current_position, location, linkedin_url, phone) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [email, hashedPassword, full_name, department, graduation_year, current_company || '', current_position || '', location || '', linkedin_url || '', phone || '']
    );

    res.status(201).json({ message: 'Alumni registered successfully' });
  } catch (error: any) {
    if (error.code === 'ER_DUP_ENTRY') {
      return res.status(400).json({ error: 'Email already registered' });
    }
    res.status(500).json({ error: 'Registration failed' });
  }
});

router.post('/register/department', async (req, res) => {
  try {
    const { email, password, full_name, department_name, position } = req.body;

    if (!email || !password || !full_name || !department_name) {
      return res.status(400).json({ error: 'Required fields missing' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await pool.execute(
      'INSERT INTO departments (email, password, full_name, department_name, position) VALUES (?, ?, ?, ?, ?)',
      [email, hashedPassword, full_name, department_name, position || 'Administrator']
    );

    res.status(201).json({ message: 'Department registered successfully' });
  } catch (error: any) {
    if (error.code === 'ER_DUP_ENTRY') {
      return res.status(400).json({ error: 'Email already registered' });
    }
    res.status(500).json({ error: 'Registration failed' });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { email, password, userType } = req.body;

    if (!email || !password || !userType) {
      return res.status(400).json({ error: 'Email, password, and user type are required' });
    }

    let table = 'students';
    if (userType === 'alumni') {
      table = 'alumni';
    } else if (userType === 'department') {
      table = 'departments';
    }

    const [rows]: any = await pool.execute(
      `SELECT * FROM ${table} WHERE email = ?`,
      [email]
    );

    if (rows.length === 0) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const user = rows[0];
    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET || 'your-secret-key-change-this',
      { expiresIn: '24h' }
    );

    const { password: _, ...userWithoutPassword } = user;
    res.json({ token, user: userWithoutPassword });
  } catch (error) {
    res.status(500).json({ error: 'Login failed' });
  }
});

export default router;
