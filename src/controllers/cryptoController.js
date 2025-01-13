const { getCryptocurrencies, getCryptoDetailsById } = require('../services/cryptoService');

// Fetch and return all cryptocurrencies
const listCryptos = async (req, res) => {
  try {
    const cryptos = await getCryptocurrencies();
    res.status(200).json({ success: true, data: cryptos });
  } catch (error) {
    console.error('Error:', error.response?.data || error.message);
    res.status(500).json({ success: false, message: 'Unable to fetch cryptocurrency data.' });
  }
};

// Fetch details of a specific cryptocurrency by ID
const getCryptoDetails = async (req, res) => {
  const { id } = req.params;  
  
  if (!id) return res.status(400).json({ success: false, message: 'Cryptocurrency ID is required.' });
  try {
    const cryptoDetails = await getCryptoDetailsById(id);
    res.status(200).json({ success: true, data: cryptoDetails });
  } catch (error) {
    console.error('Error:', error.response?.data || error.message);
    res.status(500).json({ success: false, message: 'Unable to fetch cryptocurrency details.' });
  }
};



module.exports = { listCryptos, getCryptoDetails };
