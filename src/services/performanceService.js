const DBFactory = require('../factories/crudFactory');
const axios = require('axios');

const PerformanceService = {

  // View portfolio performance with real-time updates
  viewPortfolioPerformance: async (portfolioId) => {
    // Fetch portfolio items
    const query = `
      SELECT crypto, quantity, acquisitionCost
      FROM portfolio_items
      WHERE portfolioId = $1;
    `;
    const params = [portfolioId];
    const portfolioItems = await DBFactory.findAll(query, params);

    if (portfolioItems.length === 0) {
      throw new Error('Portfolio is empty or does not exist.');
    }

    // Fetch live market data for cryptocurrencies
    const liveData = {};
    for (const item of portfolioItems) {
      const response = await axios.get(`https://api.coingecko.com/api/v3/simple/price`, {
        params: {
          ids: item.crypto,
          vs_currencies: 'usd',
        },
      });
      liveData[item.crypto] = response.data[item.crypto].usd;
    }

    // Calculate performance
    let totalValue = 0;
    let totalCost = 0;

    const performance = portfolioItems.map((item) => {
      const currentPrice = liveData[item.crypto];
      const currentValue = currentPrice * item.quantity;
      const profitLoss = currentValue - item.acquisition_cost * item.quantity;

      totalValue += currentValue;
      totalCost += item.acquisition_cost * item.quantity;

      return {
        crypto: item.crypto,
        quantity: item.quantity,
        acquisitionCost: item.acquisition_cost,
        currentPrice,
        currentValue,
        profitLoss,
      };
    });

    return {
      performance,
      totalValue,
      totalCost,
      totalProfitLoss: totalValue - totalCost,
    };
  },
};

module.exports = PerformanceService;
