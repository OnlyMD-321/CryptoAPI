const express = require('express');
const { listCryptos, getCryptoDetails } = require('../controllers/cryptoController');
const router = express.Router();

// GET /cryptos - List all cryptocurrencies
router.get('/', listCryptos);

// GET /cryptos/:id - Get details of a specific cryptocurrency
router.get('/:id', getCryptoDetails);

module.exports = router;
