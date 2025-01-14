const DBFactory = require('../factories/crudFactory');
const axios = require('axios');

const PerformanceService = {


  // View portfolio performance with real-time updates
  getPortfolioPerformance: async (userId) => {
    try {
      // Fetch the portfolio of the user
      const portfolioQuery = 'SELECT * FROM portfolios WHERE userId = $1';
      const portfolioResult = await DBFactory.findOne(portfolioQuery, [userId]);

      if (portfolioResult.rows.length === 0) {
          throw new Error('No portfolio found for this user.');
      }

      const portfolio = portfolioResult.rows[0];

      // Fetch the portfolio items
      const portfolioItemsQuery = 'SELECT * FROM portfolio_items WHERE portfolio_id = $1';
      const portfolioItemsResult = await DBFactory.findOne(portfolioItemsQuery, [portfolio.id]);

      const portfolioItems = portfolioItemsResult.rows;
      let totalValue = 0;

      // Fetch crypto details for each portfolio item and calculate the total value
      for (let item of portfolioItems) {
          const cryptoDetails = await getCryptoDetailsById(item.crypto_id);
          const currentValue = cryptoDetails.current_price * item.quantity;
          totalValue += currentValue;
      }

      return { portfolio: portfolio.name, totalValue };

  } catch (error) {
      console.error('Error fetching portfolio performance:', error.message);
      throw new Error('Unable to fetch portfolio performance.');
  }
  },

};

module.exports = PerformanceService;
