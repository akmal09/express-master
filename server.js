require('dotenv').config();
const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

const pool = new Pool({
   user: process.env.DB_USER,
   host: process.env.DB_HOST,
   database: process.env.DB_NAME,
   password: process.env.DB_PASSWORD,
   port: process.env.DB_PORT,
});

// Test database connection
pool.connect()
   .then(() => console.log('Connected to PostgreSQL'))
   .catch(err => console.error('Connection error', err.stack));

// Routes
app.get('/health', (req, res) => res.send('Master app is good. Lets use this app'));

// Import user routes
const userRoutes = require('./routes/userRoutes');
app.use('/users', userRoutes);


// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
   console.log(`Server running on port ${PORT}`);
});
