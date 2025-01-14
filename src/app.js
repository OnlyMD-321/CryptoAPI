const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const dotenv = require('dotenv');
const rateLimit = require('express-rate-limit'); // Import rate limiter
const routes = require('./routes/routes');
const pool = require('./config/db');
const createTables = require('./utils/createTables');
const cron = require('node-cron');
const { updatePortfolioAutomatically } = require('./utils/crons');

// Charger les variables d'environnement
dotenv.config();

// Initialiser l'application
const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(helmet());

// Créer les tables de la base de données
createTables();

// Define rate limiter: max 5 requests per 2 seconds
const limiter = rateLimit({
  windowMs: 5 * 1000, // 5 seconds
  max: 2, // limit each IP to 2 requests per windowMs
  message: {
    message: "Too many requests, please try again later.",
  },
});

// Apply rate limiter to all routes
app.use((req, res, next) => {
  // Skip rate limit for cron job routes
  if (req.originalUrl.startsWith('/cryptos')) {
    return next();
  }
  // Apply rate limiter for all other routes
  limiter(req, res, next);
});

app.use('/', routes);



// Schedule the cron job to run every 5 minutes
cron.schedule("*/10 * * * * *", updatePortfolioAutomatically);



// Route de test
app.get('/', (req, res) => {
  res.send('API is running!');
});

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

  // if db connection is successful
  pool.on('connect', () => {
    console.log('Connected to the database');
  });
});
