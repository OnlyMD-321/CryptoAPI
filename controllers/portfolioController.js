const pool = require('../config/db');

// Créer un portefeuille
const createPortfolio = async (req, res) => {
  const { name } = req.body;
  const userId = req.user.id; // ID de l'utilisateur authentifié

  try {
    const newPortfolio = await pool.query(
      'INSERT INTO Portfolios (name, user_id) VALUES ($1, $2) RETURNING *',
      [name, userId]
    );
    res.status(201).json(newPortfolio.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Récupérer tous les portefeuilles d'un utilisateur
const getPortfolios = async (req, res) => {
  const userId = req.user.id;

  try {
    const portfolios = await pool.query(
      'SELECT * FROM Portfolios WHERE user_id = $1',
      [userId]
    );
    res.status(200).json(portfolios.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Récupérer un portefeuille spécifique
const getPortfolioById = async (req, res) => {
  const { id } = req.params;
  const userId = req.user.id;

  try {
    const portfolio = await pool.query(
      'SELECT * FROM Portfolios WHERE id = $1 AND user_id = $2',
      [id, userId]
    );

    if (portfolio.rows.length === 0) {
      return res.status(404).json({ message: 'Portfolio not found' });
    }

    res.status(200).json(portfolio.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Mettre à jour un portefeuille
const updatePortfolio = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  const userId = req.user.id;

  try {
    const updatedPortfolio = await pool.query(
      'UPDATE Portfolios SET name = $1, updated_at = NOW() WHERE id = $2 AND user_id = $3 RETURNING *',
      [name, id, userId]
    );

    if (updatedPortfolio.rows.length === 0) {
      return res.status(404).json({ message: 'Portfolio not found or unauthorized' });
    }

    res.status(200).json(updatedPortfolio.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Supprimer un portefeuille
const deletePortfolio = async (req, res) => {
  const { id } = req.params;
  const userId = req.user.id;

  try {
    const deletedPortfolio = await pool.query(
      'DELETE FROM Portfolios WHERE id = $1 AND user_id = $2 RETURNING *',
      [id, userId]
    );

    if (deletedPortfolio.rows.length === 0) {
      return res.status(404).json({ message: 'Portfolio not found or unauthorized' });
    }

    res.status(200).json({ message: 'Portfolio deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  createPortfolio,
  getPortfolios,
  getPortfolioById,
  updatePortfolio,
  deletePortfolio,
};