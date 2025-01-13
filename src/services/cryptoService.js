const axios = require('axios');

const BASE_URL = 'https://pro-api.coinmarketcap.com/v1';
const API_KEY = process.env.COINMARKETCAP_API_KEY;

// Fetch the latest cryptocurrency data
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

        return response.data.data.map((crypto) => ({
            id: crypto.id,
            name: crypto.name,
            symbol: crypto.symbol,
            current_price: crypto.quote.USD.price,
            market_cap: crypto.quote.USD.market_cap,
            volume: crypto.quote.USD.volume_24h,
        }));
    } catch (error) {
        console.error('Error fetching cryptocurrencies:', error.response?.data || error.message);
        throw new Error('Unable to fetch cryptocurrency data.');
    }
};

// Fetch details of a cryptocurrency by ID
const getCryptoDetailsById = async (id) => {
    try {
        const response = await axios.get(`${BASE_URL}/cryptocurrency/info`, {
            headers: {
                'X-CMC_PRO_API_KEY': API_KEY,
            },
            params: { id },
        });

        const cryptoData = response.data.data[id];
        if (!cryptoData) throw new Error('Cryptocurrency not found.');

        return {
            id: cryptoData.id,
            name: cryptoData.name,
            symbol: cryptoData.symbol,
            description: cryptoData.description,
            logo: cryptoData.logo,
            tags: cryptoData.tags,
            category: cryptoData.category,
        };
    } catch (error) {
        console.error('Error fetching cryptocurrency details:', error.response?.data || error.message);
        throw new Error('Unable to fetch cryptocurrency details.');
    }
};


module.exports = { getCryptocurrencies, getCryptoDetailsById };
