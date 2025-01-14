const DBFactory = require('../factories/crudFactory');
const { getCryptoDetailsById } = require('./cryptoService');

const PerformanceService = {

  updatePortfolioValueRealTime: async (portfolioItems) => {
    try {
      let updatedItems = [];

      for (const item of portfolioItems) {
        const cryptoDetails = await getCryptoDetailsById(item.crypto_id);
        // Check if the acquisition_cost changed ( check just the umber and the 2 numbers after the decimal point)
        if (
          parseFloat(cryptoDetails.current_price.toFixed(2)) !==
          parseFloat(Number(item.acquisition_cost).toFixed(2))
        ) {
          // Update the portfolio item with the new price
          const updateQuery = 'UPDATE portfolio_items SET acquisition_cost = $1 WHERE id = $2';
          await DBFactory.update(updateQuery, [cryptoDetails.current_price, item.id]);
          updatedItems.push(item);
        }
      }

      if (updatedItems.length === 0) {
        return { message: 'No portfolio items updated' };
      }
      return { message: 'Portfolio items updated successfully', updatedItems };

    } catch (error) {
      console.error('Error updating portfolio value:', error);
      throw error;
    }
  },


  Calculate_profit_loss: async (portfolioItem) => {
    try {
      // Validate input
      if (typeof portfolioItem !== 'object' || Array.isArray(portfolioItem)) {
        throw new TypeError('portfolioItem must be an object');
      }
  
      // Get crypto details
      const cryptoDetails = await getCryptoDetailsById(portfolioItem.crypto_id);
  
      // Calculate the total value of the portfolio
      const totalValue = cryptoDetails.current_price * parseFloat(portfolioItem.quantity);
  
      // Calculate the profit or loss
      const profitLoss = totalValue - parseFloat(portfolioItem.acquisition_cost);
  
      return { message: 'Profit/Loss calculated successfully', "profit/Loss" : profitLoss };
    } catch (error) {
      console.error('Error calculating profit or loss:', error);
      throw error;
    }
  }
  
  


};

module.exports = PerformanceService;
