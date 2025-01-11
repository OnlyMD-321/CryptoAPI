const pool = require('../config/db');

const createUser = async (email, password) => {
  const query = `
    INSERT INTO Users (email, password)
    VALUES ($1, $2)
    RETURNING *;
  `;
  const values = [email, password];
  const result = await pool.query(query, values);
  return result.rows[0];
};

module.exports = { createUser };