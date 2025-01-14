const PerformanceService = require('../services/performanceService');
const DBFactory = require('../factories/crudFactory');

const viewPortfolioPerformance = async (req, res) => {
  const { portfolioId } = req.params;

  try {
    // check if the portfolio exists
    const portfolio = await DBFactory.findOne(`SELECT * FROM portfolios WHERE id = $1 `,[id]);
      
    if (!portfolio) {
      throw new Error('Portfolio not found');
    }

    const performance = await PerformanceService.viewPortfolioPerformance(portfolioId);
    res.status(200).json({ message: 'Portfolio performance retrieved successfully', performance });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = { viewPortfolioPerformance };
