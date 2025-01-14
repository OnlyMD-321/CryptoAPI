const express = require('express');
const router = express.Router();

const { viewPortfolioPerformance } = require('../controllers/performaceControllers');

// View Portfolio Performance
router.get('/performance/:id', viewPortfolioPerformance);

module.exports = router;
