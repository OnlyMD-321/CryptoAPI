const axios = require('axios');

const fetchMarketData = async () => {
  try {
    const response = await axios.get('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum&vs_currencies=usd');
    return response.data;
  } catch (error) {
    console.error('Error fetching market data:', error);
    throw new Error('Unable to fetch market data');
  }
};

module.exports = fetchMarketData;
