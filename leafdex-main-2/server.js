// Load environment variables from .env file (optional, but good)
// The Docker Compose variables (DB_HOST, DB_USER, etc.) will already be available
require('dotenv').config();


const express = require('express');
const bcrypt = require('bcrypt');
const mysql = require('mysql2/promise'); // Using promise-based client
const path = require('path'); // ADDED: Need the path module for static file serving

const app = express();
const cors = require("cors");
app.use(cors());
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON bodies from incoming requests
app.use(express.json());

// --- Database Connection Configuration ---
const dbConfig = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
};

// Create a connection pool to manage connections efficiently
const pool = mysql.createPool(dbConfig);

// ===============================================
// ✅ 1. ALL API ENDPOINTS (MUST come first)
// ===============================================

// --- 🚀 /api/register Endpoint ---
app.post('/api/register', async (req, res) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        return res.status(400).json({ message: 'All fields are required.' });
    }

    try {
        const saltRounds = 10;
        const passwordHash = await bcrypt.hash(password, saltRounds);

        const [existingUser] = await pool.query(
            'SELECT user_id FROM users WHERE username = ? OR email = ?',
            [username, email]
        );

        if (existingUser.length > 0) {
            return res.status(409).json({ message: 'User with this username or email already exists.' });
        }

        const [result] = await pool.query(
            'INSERT INTO users (username, email, password_hash) VALUES (?, ?, ?)',
            [username, email, passwordHash]
        );

        res.status(201).json({
            message: 'User registered successfully!',
            userId: result.insertId
        });

    } catch (error) {
        console.error('Database registration error:', error);
        res.status(500).json({ message: 'An unexpected error occurred during registration.' });
    }
});

// --- 🔑 /api/login Endpoint ---
// MOVED: This was incorrectly placed AFTER the static routes
app.post('/api/login', async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required.' });
    }

    try {
        const [users] = await pool.query(
            'SELECT user_id, username, password_hash FROM users WHERE email = ?',
            [email]
        );

        const user = users[0];

        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials.' });
        }

        const isMatch = await bcrypt.compare(password, user.password_hash);

        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials.' });
        }

        res.status(200).json({
            message: 'Login successful!',
            user: {
                userId: user.user_id,
                username: user.username,
                email: email
            }
        });

    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ message: 'An unexpected error occurred during login.' });
    }
});

// ===============================================
// 🗑️ 2. STATIC FILE SERVING (MUST come last)
// ===============================================
// This ensures that all requests that don't match /api/* are served the frontend.
// The original file had this logic duplicated.

// Serve static assets from the built frontend directory
app.use(express.static(path.join(__dirname, 'dist')));

// Serve index.html for all other GET requests (for client-side routing)
app.use((req, res) => {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

// --- Server Startup ---
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});