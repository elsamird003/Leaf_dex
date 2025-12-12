-- Disable checking foreign keys for faster initial setup
SET foreign_key_checks = 0;

-- Drop the table if it already exists to allow for easy recreation during development
DROP TABLE IF EXISTS users;

-- -----------------------------------------------------
-- Table structure for the Node.js authentication code
-- -----------------------------------------------------
CREATE TABLE users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Re-enable foreign key checks
SET foreign_key_checks = 1;