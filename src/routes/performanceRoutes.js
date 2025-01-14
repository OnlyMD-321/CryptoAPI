const express = require('express');
const router = express.Router();

const { updatePortfolioValue , Calculate_profit_loss_for_portfolio } = require('../controllers/performaceControllers');

// View Portfolio Performance
router.get('/:id', updatePortfolioValue);

// calculate profit or loss for a portfolio
router.get('/:id/profit-loss/:items_id', Calculate_profit_loss_for_portfolio);

module.exports = router;
