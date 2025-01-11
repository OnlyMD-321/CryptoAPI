const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');

// Charger les variables d'environnement
dotenv.config();

// Initialiser l'application
const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());


// Utiliser les routes d'authentification
const authRoutes = require('./routes/authRoutes');

app.use('/api/auth', authRoutes);


// Utiliser les routes des portefeuilles
const portfolioRoutes = require('./routes/portfolioRoutes');

app.use('/api/portfolios', portfolioRoutes);


// Utiliser les routes pour les crypto-monnaies
const cryptoRoutes = require('./routes/cryptoRoutes');

app.use('/api/cryptos', cryptoRoutes);



// Route de test
app.get('/', (req, res) => {
  res.send('API is running!');
});



const pool = require('./config/db');

app.get('/db-test', async (req, res) => {
  try {
    const result = await pool.query('SELECT NOW()');
    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).send('Database error');
  }
});


// Démarrer le serveur
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});