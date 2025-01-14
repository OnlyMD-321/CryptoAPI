const DBFactory = require('../factories/crudFactory');
const { getCryptoDetailsById } = require('../services/cryptoService');

// Function to run every 5 minutes
async function updatePortfolioAutomatically() {
    try {
        console.log('Running scheduled portfolio update...');
        const portfolioItems = await DBFactory.findAll('SELECT * FROM portfolio_items');
        let updatedItems = [];

        for (const item of portfolioItems) {
            const cryptoDetails = await getCryptoDetailsById(item.crypto_id);
            if (parseFloat(cryptoDetails.current_price.toFixed(2)) !== parseFloat(Number(item.acquisition_cost).toFixed(2))) {
                console.log("current" , parseFloat(cryptoDetails.current_price.toFixed(2)));
                console.log("acquisition" , parseFloat(Number(item.acquisition_cost).toFixed(2)));
                
                // Update the portfolio item with the new price
                const updateQuery = 'UPDATE portfolio_items SET acquisition_cost = $1 WHERE id = $2';
                await DBFactory.update(updateQuery, [cryptoDetails.current_price, item.id]);
                updatedItems.push(item);
            }
        }

        if (updatedItems.length === 0) {
            console.log('------>No portfolio items updated');
        }else {
            console.log('------>Portfolio updated successfully');
        }
    } catch (error) {
        console.error('Error during scheduled portfolio update:', error);
    }
}

module.exports = { updatePortfolioAutomatically };