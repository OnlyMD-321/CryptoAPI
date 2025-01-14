const { Pool } = require('pg');
const dotenv = require('dotenv');

dotenv.config();

// Database connection using environment variable
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

module.exports = pool;
