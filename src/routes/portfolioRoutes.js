const express = require('express');
const {
  createPortfolio,
  getPortfolios,
  getPortfolioById,
  updatePortfolio,
  deletePortfolio,
} = require('../controllers/portfolioController');

const {
  addCryptoToPortfolio,
  editPortfolioItem,
  deletePortfolioItem,
  viewPortfolioPerformance,
} = require('../controllers/itemsPortfoliosController');

const authenticate = require('../middlewares/authMiddleware');

const router = express.Router();

// Create Portfolio
router.post('/', authenticate, createPortfolio);

// get portfolio
router.get('/', authenticate, getPortfolios);

// get portfolio by id
router.get('/:id', authenticate, getPortfolioById);

// update portfolio
router.put('/:id', authenticate, updatePortfolio);

// delete portfolio
router.delete('/:id', authenticate, deletePortfolio);

// Add Cryptocurrency to Portfolio
router.post('/:id/items', authenticate, addCryptoToPortfolio);

// Edit Portfolio Item
router.put('/:id/items/:item_id', authenticate, editPortfolioItem);

// Delete Portfolio Item
router.delete('/:id/items/:item_id:', authenticate, deletePortfolioItem);

// View Portfolio Performance
router.get('/performance', authenticate, viewPortfolioPerformance);

module.exports = router;
