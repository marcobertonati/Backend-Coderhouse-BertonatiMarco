/*Requiero controladores de productos */
const ProductService = require('../services/productsMongoose');
const product = new ProductService();

module.exports = (router) => {
    router
        .get('/productos/vista', async (req,res,next) => {
          console.log('Entro a /productos/lista')
         const products = await product.getAllProducts();
         res.render('./pages/lista', {products})
        })
        .get('/productos/agregar', (req,res,next) => {
          console.log('Ingresaron a pagina agregar producto');
          res.render('./pages/agregar');
        })
        .get('/chat-view', (req,res,next)=>{
          console.log('Ingresaron a pagina de chat');
          res.render('./websocket')
        })
    return router    
}