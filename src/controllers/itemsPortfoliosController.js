const PortfolioService = require('../services/itemsPortfoliosService');


const addCryptoToPortfolio = async (req, res) => {
  const { portfolioId } = req.params;
  const { cryptoId, quantity, acquisitionCost } = req.body;

  try {
    const crypto = await PortfolioService.addCryptoToPortfolio(portfolioId, cryptoId, quantity, acquisitionCost);
    res.status(201).json({ message: 'Crypto added to portfolio successfully', crypto });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const editPortfolioItem = async (req, res) => {
  const { portfolioId, cryptoId } = req.params;
  const { quantity, acquisitionCost } = req.body;

  try {
    const updatedCrypto = await PortfolioService.editPortfolioItem(portfolioId, cryptoId, quantity, acquisitionCost);
    res.status(200).json({ message: 'Portfolio item updated successfully', updatedCrypto });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deletePortfolioItem = async (req, res) => {
  const { portfolioId, cryptoId } = req.params;

  try {
    await PortfolioService.deletePortfolioItem(portfolioId, cryptoId);
    res.status(200).json({ message: 'Item removed from portfolio' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const viewPortfolioPerformance = async (req, res) => {
  const { portfolioId } = req.params;

  try {
    const performance = await PortfolioService.viewPortfolioPerformance(portfolioId);
    res.status(200).json({ message: 'Portfolio performance retrieved successfully', performance });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  addCryptoToPortfolio,
  editPortfolioItem,
  deletePortfolioItem,
  viewPortfolioPerformance,
};
