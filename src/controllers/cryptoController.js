const axios = require('axios');

// URL de base de l'API CoinMarketCap
const COINMARKETCAP_BASE_URL = 'https://pro-api.coinmarketcap.com/v1/cryptocurrency';

// Récupérer la liste des crypto-monnaies
const listCryptos = async (req, res) => {
  try {
    const response = await axios.get(`${COINMARKETCAP_BASE_URL}/listings/latest`, {
      headers: {
        'X-CMC_PRO_API_KEY': process.env.COINMARKETCAP_API_KEY,
      },
      params: {
        start: 1,
        limit: 50,
        convert: 'USD',
      },
    });

    res.status(200).json(response.data.data);
  } catch (error) {
    console.error(error.response?.data || error.message);
    res.status(500).json({ message: 'Error fetching cryptocurrencies' });
  }
};

// Récupérer les détails d'une crypto-monnaie spécifique
const getCrypto = async (req, res) => {
  const { id } = req.params;

  try {
    const response = await axios.get(`${COINMARKETCAP_BASE_URL}/quotes/latest`, {
      headers: {
        'X-CMC_PRO_API_KEY': process.env.COINMARKETCAP_API_KEY,
      },
      params: {
        id,
        convert: 'USD',
      },
    });

    res.status(200).json(response.data.data[id]);
  } catch (error) {
    console.error(error.response?.data || error.message);
    res.status(500).json({ message: 'Error fetching cryptocurrency details' });
  }
};

module.exports = {
  listCryptos,
  getCrypto,
};