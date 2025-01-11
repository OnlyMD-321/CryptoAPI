const express = require('express');
const { signup, login } = require('../controllers/authController');
const router = express.Router();

// Endpoint pour l'inscription
router.post('/signup', signup);

// Endpoint pour la connexion
router.post('/login', login);

module.exports = router;