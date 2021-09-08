/*Requiero controladores de productos */
const cartController = require('../controller/cartController');

module.exports = (router) => {

    router
        .post('/api/cart/create', cartController.createCart)
        .get('/api/cart/:id', cartController.getProductOnCart)
        .delete('/api/cart/delete/:id', cartController.deleteProductOnCart)
    return router   
}