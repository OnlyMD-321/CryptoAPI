const express = require('express');
const {
  createPortfolio,
  getPortfolios,
  getPortfolioById,
  updatePortfolio,
  deletePortfolio,
} = require('../controllers/portfolioController');
const authenticate = require('../middlewares/authMiddleware');
const router = express.Router();

// Appliquer le middleware d'authentification
router.use(authenticate);

// Endpoints
router.post('/', createPortfolio); // Créer un portefeuille
router.get('/', getPortfolios); // Récupérer tous les portefeuilles
router.get('/:id', getPortfolioById); // Récupérer un portefeuille spécifique
router.put('/:id', updatePortfolio); // Mettre à jour un portefeuille
router.delete('/:id', deletePortfolio); // Supprimer un portefeuille

module.exports = router;