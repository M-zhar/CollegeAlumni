import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'Alumni',
  password: process.env.DB_PASSWORD || 'Database@0786',
  database: process.env.DB_NAME || 'alumni_platform',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

export default pool;
