const axios = require('axios');

const BASE_URL = 'https://pro-api.coinmarketcap.com/';
const API_KEY = process.env.COINMARKETCAP_API_KEY;

const getCryptocurrencies = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/cryptocurrency/listings/latest`, {
            headers: {
                'X-CMC_PRO_API_KEY': API_KEY,
            },
            params: {
                start: 1,
                limit: 100,
                convert: 'USD',
            },
        });
        return response.data.data; // Returns an array of cryptocurrencies
    } catch (error) {
        console.error('Error fetching cryptocurrencies:', error.message);
        throw new Error('Unable to fetch cryptocurrency data.');
    }
};

const getCryptoDetails = async (id) => {
    try {
        const response = await axios.get(`${BASE_URL}/cryptocurrency/info`, {
            headers: {
                'X-CMC_PRO_API_KEY': API_KEY,
            },
            params: { id },
        });
        return response.data.data;
    } catch (error) {
        console.error('Error fetching cryptocurrency details:', error.message);
        throw new Error('Unable to fetch cryptocurrency details.');
    }
};

module.exports = { getCryptocurrencies, getCryptoDetails };
