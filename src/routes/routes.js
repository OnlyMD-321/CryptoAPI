const app = require("express")();


const authRoutes = require('./authRoutes');
const portfolioRoutes = require('./portfolioRoutes');
const portfolioItems = require('./portfolioItemsRoutes');
const cryptoRoutes = require('./cryptoRoutes');

app.use('/auth', authRoutes);
app.use('/portfolios', portfolioRoutes);
app.use('/portfolioItems', portfolioItems);
app.use('/cryptos', cryptoRoutes);

module.exports = app;