const PortfolioService = require('../services/portfolioService');

const createPortfolio = async (req, res) => {
  const { userId, name } = req.body;

  try {
    const portfolio = await PortfolioService.createPortfolio(userId, name);
    res.status(201).json({ portfolio });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const addCryptoToPortfolio = async (req, res) => {
  const { portfolioId } = req.params;
  const { cryptoId, quantity, acquisitionCost } = req.body;

  try {
    const crypto = await PortfolioService.addCryptoToPortfolio(portfolioId, cryptoId, quantity, acquisitionCost);
    res.status(201).json({ crypto });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const editPortfolioItem = async (req, res) => {
  const { portfolioId, cryptoId } = req.params;
  const { quantity, acquisitionCost } = req.body;

  try {
    const updatedCrypto = await PortfolioService.editPortfolioItem(portfolioId, cryptoId, quantity, acquisitionCost);
    res.status(200).json({ updatedCrypto });
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
    res.status(200).json({ performance });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  createPortfolio,
  addCryptoToPortfolio,
  editPortfolioItem,
  deletePortfolioItem,
  viewPortfolioPerformance,
};
