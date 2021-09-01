/* Requiero DB y configuración de la misma */
const knex = require('../dao/db/connectionKnex')

module.exports = (router) => {

    router.
        get('/productos/vista', async (req,res, next) => {
            const products = await knex.from('products').select('*')
            .then((rows) => rows)
            .catch(e=>console.log(e))
            // .finally(()=>knex.destroy())
        
          if (products.length <= 0) {
            console.log('Ingresaron a pagina de lista productos:');
            console.log("No se encontraron productos");
            const noProducts = { state: true, msg: "No hay productos cargados"}
            res.render('./pages/lista', {noProducts})
          } else {
            console.log('Ingresaron a pagina de lista productos:');
            console.log("Se encontraron productos");
            res.render('./pages/lista', {products})
          }
        })
        .get('/productos/agregar', async (req,res,next) => {
            console.log('Ingresaron a pagina agregar producto');
            res.render('./pages/agregar');
        })
        .get('/chat', (req,res, next) => {
            console.log('Ingresaron a pagina de chat');
            res.render('./websocket')
        })

    return router
        
}