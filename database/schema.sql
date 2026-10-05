CREATE DATABASE IF NOT EXISTS campus_apparel;
USE campus_apparel;

CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    full_name VARCHAR(120) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    role ENUM('USER','ADMIN') NOT NULL DEFAULT 'USER',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Password hashes below are bcrypt hashes for the demo credentials:
-- user@campusapparel.com / User@123
-- admin@campusapparel.com / Admin@123

INSERT INTO users (full_name, email, password_hash, role)
VALUES
('Campus User', 'user@campusapparel.com', '$2b$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', 'USER'),
('Campus Admin', 'admin@campusapparel.com', '$2b$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', 'ADMIN')
ON DUPLICATE KEY UPDATE email=email;
