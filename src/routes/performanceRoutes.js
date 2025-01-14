const express = require('express');
const { viewPortfolioPerformance } = require('../controllers/performaceControllers');

// View Portfolio Performance
router.get('/performance', authenticate, viewPortfolioPerformance);

module.exports = router;
