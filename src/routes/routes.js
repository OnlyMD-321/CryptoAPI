const app = require("express")();


const authRoutes = require('./authRoutes');
const portfolioRoutes = require('./portfolioRoutes');
const cryptoRoutes = require('./cryptoRoutes');
const performanceRoutes = require('./performanceRoutes');

app.use('/auth', authRoutes);
app.use('/portfolios', portfolioRoutes);
app.use('/cryptos', cryptoRoutes);
app.use('/performance', performanceRoutes);

module.exports = app;