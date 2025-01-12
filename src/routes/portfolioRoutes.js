const express = require('express');
const {
  createPortfolio,
  addCryptoToPortfolio,
  editPortfolioItem,
  deletePortfolioItem,
  viewPortfolioPerformance,
} = require('../controllers/portfolioController');
const authenticate = require('../middlewares/authMiddleware');

const router = express.Router();

// Create Portfolio
router.post('/create', authenticate, createPortfolio);

// Add Cryptocurrency to Portfolio
router.post('/add', authenticate, addCryptoToPortfolio);

// Edit Portfolio Item
router.put('/edit/:id', authenticate, editPortfolioItem);

// Delete Portfolio Item
router.delete('/delete/:id', authenticate, deletePortfolioItem);

// View Portfolio Performance
router.get('/performance', authenticate, viewPortfolioPerformance);

module.exports = router;
