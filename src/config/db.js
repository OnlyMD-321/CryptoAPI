const { Pool } = require('pg');
const dotenv = require('dotenv');

dotenv.config();

// Use DATABASE_URL if it exists (for Render) or fallback to local configuration
const isProduction = process.env.NODE_ENV === 'production';

const pool = new Pool(
  isProduction
    ? {
        connectionString: process.env.DATABASE_URL,
        ssl: { rejectUnauthorized: false }, // Required for Render's managed PostgreSQL
      }
    : {
        user: process.env.DB_USER,          // Local PostgreSQL username
        host: process.env.DB_HOST,          // Local hostname
        database: process.env.DB_DATABASE,  // Local database name
        password: process.env.DB_PASSWORD,  // Local password
        port: process.env.DB_PORT,          // Local PostgreSQL port
      }
);

module.exports = pool;
