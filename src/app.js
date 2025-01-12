const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const dotenv = require('dotenv');
const routes = require('./routes/routes');
const pool = require('./config/db');
const createTables = require('./utils/createTables');

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


app.use('/', routes );



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