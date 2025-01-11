const express = require('express');
const { getCryptos, getCryptoDetails } = require('../controllers/cryptoController');
const authenticate = require('../middlewares/authMiddleware');
const router = express.Router();

// Routes pour les crypto-monnaies
router.get('/', authenticate, getCryptos); // Liste des crypto-monnaies
router.get('/:id', authenticate, getCryptoDetails); // Détails d'une crypto-monnaie

module.exports = router;