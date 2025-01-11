const { Pool } = require('pg');
const dotenv = require('dotenv');

dotenv.config();

const pool = new Pool({
  user: process.env.DB_USER,          // Your PostgreSQL username
  host: process.env.DB_HOST,          // Hostname (usually localhost)
  database: process.env.DB_DATABASE,      // Your database name
  password: process.env.DB_PASSWORD,  // Password for the user
  port: process.env.DB_PORT,          // Default PostgreSQL port
});


module.exports = pool;