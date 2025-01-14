const PortfolioService = require('../services/itemsPortfoliosService');
const DBFactory = require('../factories/crudFactory');


const addCryptoToPortfolio = async (req, res) => {
  const { id } = req.params;
  const { cryptoId, quantity } = req.body;

  try {
    // check if the portfolio exists
    const portfolio = await DBFactory.findOne(`SELECT * FROM portfolios WHERE id = $1 `,[id]);
      
    if (!portfolio) {
      throw new Error('Portfolio not found');
    }

    const crypto = await PortfolioService.addCryptoToPortfolio(id, cryptoId, quantity);
    res.status(201).json({ message: 'Crypto added to portfolio successfully', crypto });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const editPortfolioItem = async (req, res) => {
  const { id, item_id } = req.params;
  const { quantity } = req.body;

  try {
    // check if the portfolio exists
    const portfolio = await DBFactory.findOne(`SELECT * FROM portfolios WHERE id = $1 `,[id]);
      
    if (!portfolio) {
      throw new Error('Portfolio not found');
    }

    const updatedCrypto = await PortfolioService.editPortfolioItem(id, item_id, quantity);
    res.status(200).json({ message: 'Portfolio item updated successfully', updatedCrypto });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deletePortfolioItem = async (req, res) => {
  const { id, item_id } = req.params;
  
  try {
    // check if the portfolio exists
    const portfolio = await DBFactory.findOne(`SELECT * FROM portfolios WHERE id = $1 `,[id]);
      
    if (!portfolio) {
      throw new Error('Portfolio not found');
    }

    await PortfolioService.deletePortfolioItem(id, item_id);
    res.status(200).json({ message: 'Item removed from portfolio' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


module.exports = {
  addCryptoToPortfolio,
  editPortfolioItem,
  deletePortfolioItem,
};
