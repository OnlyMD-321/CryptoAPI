const pool = require('../config/db');

class crudFactory {
  static async findOne(query, params) {
    const result = await pool.query(query, params);
    return result.rows[0] || null;
  }

  static async findAll(query, params) {
    const result = await pool.query(query, params);
    return result.rows;
  }

  static async insert(query, params) {
    const result = await pool.query(query, params);
    return result.rows[0];
  }

  static async execute(query, params) {
    return await pool.query(query, params);
  }

  static async update(query, params) {
    const result = await pool.query(query, params);
    return result.rows[0];
  }

  static async delete(query, params) {
    const result = await pool.query(query, params);
    return result.rows[0];
  }

}

module.exports = crudFactory;
