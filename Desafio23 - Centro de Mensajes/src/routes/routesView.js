/*Requiero controladores de productos */
const ProductService = require('../services/productService');
const product = new ProductService();
const {auth} = require('../auth/auth')

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
        .get('/login', (req,res,next)=>{
          console.log('Ingresaron a pagina de login');
          res.render('./pages/login')
        })
        .get('/welcome', auth, (req,res,next)=>{
          console.log('Ingresaron a pagina de welcome');
          res.render('./pages/welcome')
        })
        .get('/goodbye', auth, (req,res,next)=> {
          res.render('./pages/goodbye')
        })
    return router    
}