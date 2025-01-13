const pool = require('../config/db');

// SQL to create tables if they don't exist
const createTables = async () => {
    const createUsersTableQuery = `
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        email VARCHAR(255) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL,
        confirmpassword VARCHAR(255) NOT NULL,
        token VARCHAR(255),
        is_verified BOOLEAN DEFAULT false,
        otp VARCHAR(6),
        created_at TIMESTAMP DEFAULT NOW()
      );
    `;
  
    const createPortfolioTableQuery = `
      CREATE TABLE IF NOT EXISTS portfolios (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        userId INT REFERENCES users(id) ON DELETE CASCADE,
        created_At TIMESTAMP DEFAULT NOW()
      );
    `;
  
    const createPortfolioItemsTableQuery = `
      CREATE TABLE IF NOT EXISTS portfolio_items (
        id SERIAL PRIMARY KEY,
        portfolioId INT REFERENCES portfolios(id) ON DELETE CASCADE,
        crypto VARCHAR(255) NOT NULL,
        quantity NUMERIC(10, 2) NOT NULL,
        acquisitionCost NUMERIC(15, 2) NOT NULL,
        created_At TIMESTAMP DEFAULT NOW()
      );
    `;
  
    try {
      // Execute queries
      await pool.query(createUsersTableQuery);
      await pool.query(createPortfolioTableQuery);
      await pool.query(createPortfolioItemsTableQuery);
      console.log('Tables created or already exist');
    } catch (error) {
      console.error('Error creating tables:', error);
    }
  };
  

module.exports = createTables;
