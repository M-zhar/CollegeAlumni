-- College Alumni Platform Database Schema
-- Run this script in MySQL Workbench to create the database and tables

-- Create database
CREATE DATABASE IF NOT EXISTS alumni_platform;
USE alumni_platform;

-- Students table
CREATE TABLE IF NOT EXISTS students (
  id VARCHAR(36) PRIMARY KEY DEFAULT (UUID()),
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  full_name VARCHAR(255) NOT NULL,
  department VARCHAR(100) NOT NULL,
  enrollment_year INT NOT NULL,
  current_year INT NOT NULL,
  role VARCHAR(20) DEFAULT 'student' NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_email (email),
  INDEX idx_department (department)
);

-- Alumni table
CREATE TABLE IF NOT EXISTS alumni (
  id VARCHAR(36) PRIMARY KEY DEFAULT (UUID()),
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  full_name VARCHAR(255) NOT NULL,
  department VARCHAR(100) NOT NULL,
  graduation_year INT NOT NULL,
  current_company VARCHAR(255) DEFAULT '',
  current_position VARCHAR(255) DEFAULT '',
  location VARCHAR(255) DEFAULT '',
  linkedin_url VARCHAR(500) DEFAULT '',
  phone VARCHAR(20) DEFAULT '',
  role VARCHAR(20) DEFAULT 'alumni' NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_email (email),
  INDEX idx_department (department),
  INDEX idx_graduation_year (graduation_year)
);

-- Departments table (for department admins)
CREATE TABLE IF NOT EXISTS departments (
  id VARCHAR(36) PRIMARY KEY DEFAULT (UUID()),
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  full_name VARCHAR(255) NOT NULL,
  department_name VARCHAR(100) NOT NULL,
  position VARCHAR(100) DEFAULT 'Administrator',
  role VARCHAR(20) DEFAULT 'department' NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_email (email),
  INDEX idx_department_name (department_name)
);

-- Department posts table
CREATE TABLE IF NOT EXISTS department_posts (
  id VARCHAR(36) PRIMARY KEY DEFAULT (UUID()),
  title VARCHAR(255) NOT NULL,
  content TEXT NOT NULL,
  post_type ENUM('event', 'message', 'announcement') NOT NULL,
  department VARCHAR(100) NOT NULL,
  created_by VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_department (department),
  INDEX idx_created_at (created_at DESC)
);
