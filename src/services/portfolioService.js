const DBFactory = require('../factories/crudFactory');
const axios = require('axios'); // For fetching live crypto data

const PortfolioService = {
  // Create a new portfolio
  createPortfolio: async (userId, name) => {
    const query = `
      INSERT INTO portfolios (userId, name)
      VALUES ($1, $2)
      RETURNING *;
    `;
    const params = [userId, name];
    return await DBFactory.insert(query, params);
  },

  // Add a cryptocurrency to a portfolio
  addCryptoToPortfolio: async (portfolioId, crypto, quantity, acquisitionCost) => {
    const query = `
      INSERT INTO portfolio_items (portfolioId, crypto, quantity, acquisitionCost)
      VALUES ($1, $2, $3, $4)
      RETURNING *;
    `;
    const params = [portfolioId, crypto, quantity, acquisitionCost];
    return await DBFactory.insert(query, params);
  },

  // Edit details of a cryptocurrency in the portfolio
  editPortfolioItem: async (portfolioId, crypto, quantity, acquisitionCost) => {
    const query = `
      UPDATE portfolio_items
      SET quantity = $1, acquisitionCost = $2
      WHERE portfolioId = $3 AND crypto = $4
      RETURNING *;
    `;
    const params = [quantity, acquisitionCost, portfolioId, crypto];
    const updatedItem = await DBFactory.update(query, params);
    if (!updatedItem) {
      throw new Error('Cryptocurrency not found in portfolio.');
    }
    return updatedItem;
  },

  // Delete a cryptocurrency from a portfolio
  deletePortfolioItem: async (portfolioId, crypto) => {
    const query = `
      DELETE FROM portfolio_items
      WHERE portfolioId = $1 AND crypto = $2
      RETURNING *;
    `;
    const params = [portfolioId, crypto];
    const deletedItem = await DBFactory.delete(query, params);
    if (!deletedItem) {
      throw new Error('Cryptocurrency not found in portfolio.');
    }
    return deletedItem;
  },

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

module.exports = PortfolioService;
