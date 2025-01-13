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



module.exports = router;
