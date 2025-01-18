const axios = require('axios');

const BASE_URL = 'https://pro-api.coinmarketcap.com/v1';
const API_KEY = process.env.COINMARKETCAP_API_KEY;

// Fetch the latest cryptocurrency data
const getCryptocurrencies = async () => {
    try {
        // Step 1: Fetch the latest cryptocurrency data
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

        const cryptocurrencies = response.data.data;

        // Step 2: Fetch the metadata for the listed cryptocurrencies in bulk
        const ids = cryptocurrencies.map((crypto) => crypto.id).join(',');
        const metadataResponse = await axios.get(`${BASE_URL}/cryptocurrency/info`, {
            headers: {
                'X-CMC_PRO_API_KEY': API_KEY,
            },
            params: { id: ids },
        });

        const metadata = metadataResponse.data.data;

        // Step 3: Combine price and metadata information
        return cryptocurrencies.map((crypto) => ({
            id: crypto.id,
            name: crypto.name,
            symbol: crypto.symbol,
            current_price: crypto.quote.USD.price,
            market_cap: crypto.quote.USD.market_cap,
            volume: crypto.quote.USD.volume_24h,
            logo: metadata[crypto.id]?.logo || null, // Include logo if available
        }));
    } catch (error) {
        console.error('Error fetching cryptocurrencies:', error.response?.data || error.message);
        throw new Error('Unable to fetch cryptocurrency data.');
    }
};

// Fetch details of a cryptocurrency by ID
const getCryptoDetailsById = async (id) => {
    try {
        // Fetch metadata from cryptocurrency/info
        const infoResponse = await axios.get(`${BASE_URL}/cryptocurrency/info`, {
            headers: {
                'X-CMC_PRO_API_KEY': API_KEY,
            },
            params: { id },
        });

        const cryptoData = infoResponse.data.data[id];
        if (!cryptoData) {
            throw new Error('Cryptocurrency not found.');
        }

        // Fetch latest price from cryptocurrency/quotes/latest
        const quotesResponse = await axios.get(`${BASE_URL}/cryptocurrency/quotes/latest`, {
            headers: {
                'X-CMC_PRO_API_KEY': API_KEY,
            },
            params: {
                id,
                convert: 'USD', // Convert prices to USD
            },
        });

        const quoteData = quotesResponse.data.data[id].quote.USD;

        // Combine metadata and price data
        return {
            id: cryptoData.id,
            name: cryptoData.name,
            symbol: cryptoData.symbol,
            current_price: quoteData.price,
            description: cryptoData.description,
            logo: cryptoData.logo,
            category: cryptoData.category,
            market_cap: quoteData.market_cap,
            volume_24h: quoteData.volume_24h,
        };
    } catch (error) {
        console.error('Error fetching cryptocurrency details:', error.response?.data || error.message);
        throw new Error('Unable to fetch cryptocurrency details.');
    }
};


module.exports = { getCryptocurrencies, getCryptoDetailsById };
