const express = require('express');
const { Pool } = require('pg');
require('dotenv').config();

const router = express.Router();

const pool = new Pool({
   user: process.env.DB_USER,
   host: process.env.DB_HOST,
   database: process.env.DB_NAME,
   password: process.env.DB_PASSWORD,
   port: process.env.DB_PORT,
});

// Get all users
router.get('/', async (req, res) => {
   try {
      console.log("test deploy1")
      const result = await pool.query('SELECT * FROM users');
      res.json(result.rows);
   } catch (err) {
      res.status(500).json({ error: err.message });
   }
});

// Get a user by ID
router.get('/:id', async (req, res) => {
   try {
      console.log("test deploy1")
      const { id } = req.params;
      const result = await pool.query('SELECT * FROM users WHERE id = $1', [id]);
      res.json(result.rows[0]);
   } catch (err) {
      res.status(500).json({ error: err.message });
   }
});

// Create a user
router.post('/', async (req, res) => {
   try {
      console.log("test deploy1")
      const { name, email } = req.body;
      const result = await pool.query(
         'INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *',
         [name, email]
      );
      res.json(result.rows[0]);
   } catch (err) {
      res.status(500).json({ error: err.message });
   }
});

// Update a user
router.put('/:id', async (req, res) => {
   try {
      console.log("test deploy1")
      const { id } = req.params;
      const { name, email } = req.body;
      const result = await pool.query(
         'UPDATE users SET name = $1, email = $2 WHERE id = $3 RETURNING *',
         [name, email, id]
      );
      res.json(result.rows[0]);
   } catch (err) {
      res.status(500).json({ error: err.message });
   }
});

// Delete a user
router.delete('/:id', async (req, res) => {
   try {
      console.log("test deploy1")
      const { id } = req.params;
      await pool.query('DELETE FROM users WHERE id = $1', [id]);
      res.json({ message: 'User deleted' });
   } catch (err) {
      res.status(500).json({ error: err.message });
   }
});

module.exports = router;
