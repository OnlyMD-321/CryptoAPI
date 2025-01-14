const PerformanceService = require('../services/performanceService');
const DBFactory = require('../factories/crudFactory');

const updatePortfolioValue = async (req, res) => {
  try {
    const { id } = req.params;

    // Fetch portfolio and related items
    const portfolioItems = await DBFactory.findAll(`SELECT * FROM portfolio_items WHERE portfolio_id = $1 `,[id]);
    if (!portfolioItems || portfolioItems.length === 0 || portfolioItems === null) {
      return res.status(404).json({ message: 'Portfolio not exist' });
    }

    // Calculate performance
    const result = await PerformanceService.updatePortfolioValueRealTime(portfolioItems);

    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch portfolio performance.' });
  }
};

const Calculate_profit_loss_for_portfolio = async (req, res) => {
  try {
    const { id , items_id } = req.params;

    // Fetch portfolio and related items
    const portfolioItems = await DBFactory.findOne(`SELECT * FROM portfolio_items WHERE portfolio_id = $1 AND id = $2`, [id, items_id]);
    if (!portfolioItems || portfolioItems.length === 0 || portfolioItems === null) {
      return res.status(404).json({ message: 'Portfolio not exist' });
    }

    const result = await PerformanceService.Calculate_profit_loss(portfolioItems);

    res.status(200).json(result);
    
  }catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch portfolio performance.' });
  }
}

module.exports = { updatePortfolioValue , Calculate_profit_loss_for_portfolio };
