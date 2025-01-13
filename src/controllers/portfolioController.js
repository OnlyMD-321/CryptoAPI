const PortfolioService = require('../services/portfolioService');

const createPortfolio = async (req, res) => {
  const { userId, name } = req.body;

  try {
    const portfolio = await PortfolioService.createPortfolio(userId, name);
    res.status(201).json({ message: 'Portfolio created successfully', portfolio });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getPortfolios = async (req, res) => {
  const { portfolioId } = req.params;

  try {
    const portfolio = await PortfolioService.getPortfolios();
    res.status(200).json(portfolio);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

const getPortfolioById = async (req, res) => {
  const { id } = req.params;  
  try {
    const portfolio = await PortfolioService.getPortfolioById(id);
    res.status(200).json(portfolio);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

// update portfolio
const updatePortfolio = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  try {
    const portfolio = await PortfolioService.updatePortfolio(id, name);
    res.status(200).json( {"message" : 'Portfolio updated successfully', "name" : name});;
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

// delete portfolio
const deletePortfolio = async (req, res) => {
  const { id } = req.params;

  try {
    const portfolio = await PortfolioService.deletePortfoliobyID(id);
    res.status(200).json( {"message" : 'Portfolio deleted successfully' , "portfolioId" : id});;
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
  
}

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
  createPortfolio,
  getPortfolios,
  getPortfolioById,
  updatePortfolio,
  deletePortfolio,
  addCryptoToPortfolio,
  editPortfolioItem,
  deletePortfolioItem,
  viewPortfolioPerformance,
};
