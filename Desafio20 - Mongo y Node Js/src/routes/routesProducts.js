/*Requiero controladores de productos */
const productController = require('../controller/product');

module.exports = (router) => {

    router
        .post('/api/product/create', productController.createProduct)
        .get('/api/product/:id', productController.getOne)
        .get('/api/product/', productController.findAll)
        .patch('/api/product/update/:id', productController.updateProduct)
        .delete('/api/product/delete/:id', productController.deleteOne)

    return router
        
}