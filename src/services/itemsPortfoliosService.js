const DBFactory = require('../factories/crudFactory');
const axios = require('axios');
const { getCryptoDetailsById } = require('./cryptoService');

const PortfolioService = {

  // Add a cryptocurrency to a portfolio
  addCryptoToPortfolio: async (portfolioId, crypto, quantity) => {
    try {
         
      // get the crypty details
      const cryptoDetails = await getCryptoDetailsById(crypto);

      const query = `
        INSERT INTO portfolio_items (portfolio_id, crypto_id, quantity, acquisition_cost)
        VALUES ($1, $2, $3, $4)
        RETURNING *;
      `;
      const params = [portfolioId, crypto, quantity, cryptoDetails.current_price];
      return await DBFactory.insert(query, params);
    }
    catch (error) {
      console.error(error);
      throw new Error('Unable to add cryptocurrency to portfolio.');
    }
  },

  // Edit details of a cryptocurrency in the portfolio
  editPortfolioItem: async (portfolioId, item_id, quantity) => {
    const query = `
      UPDATE portfolio_items
      SET quantity = $1
      WHERE portfolio_id = $2 AND id = $3
      RETURNING *;
    `;
    const params = [quantity, portfolioId, item_id];
    const updatedItem = await DBFactory.update(query, params);
    if (!updatedItem) {
      throw new Error('Cryptocurrency not found in portfolio.');
    }
    return updatedItem;
  },

  // Delete a cryptocurrency from a portfolio
  deletePortfolioItem: async (portfolioId, item_id) => {
    const query = `
      DELETE FROM portfolio_items
      WHERE portfolio_id = $1 AND id = $2
      RETURNING *;
    `;
    const params = [portfolioId, item_id];
    const deletedItem = await DBFactory.delete(query, params);
    if (!deletedItem) {
      throw new Error('Cryptocurrency not found in portfolio.');
    }
    return deletedItem;
  },

};

module.exports = PortfolioService;
