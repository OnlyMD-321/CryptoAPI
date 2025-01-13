const express = require('express');
const {
  addCryptoToPortfolio,
  editPortfolioItem,
  deletePortfolioItem,
  viewPortfolioPerformance,
} = require('../controllers/itemsPortfoliosController');
const authenticate = require('../middlewares/authMiddleware');

const router = express.Router();

// Add Cryptocurrency to Portfolio
router.post('/add', authenticate, addCryptoToPortfolio);

// Edit Portfolio Item
router.put('/edit/:id', authenticate, editPortfolioItem);

// Delete Portfolio Item
router.delete('/delete/:id', authenticate, deletePortfolioItem);

// View Portfolio Performance
router.get('/performance', authenticate, viewPortfolioPerformance);

module.exports = router;
