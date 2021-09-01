/* Requiero DB y configuración de la misma */
const knex = require('../dao/db/connectionKnex');

/*Requiero clase Producto */
const { Product } = require ('../dao/models/products');

getProducts = async (req,res,next) => {
        console.log('Entro a getProducts')
         /*Consulta a base de datos por productos */
        knex.from('products').select('*')
         .then((rows) => res.json(rows))
         .catch((e)=>console.log(e))
         // .finally(()=>knex.destroy())
    }

getOneProduct = async (req,res,next) => {
        console.log('Entro a getOneProducts')
         /*Consulta a base de datos de producto por id */
         knex.from('products').select('*').where('id', '=', `${req.params.id}`)
         .then((rows) => {
           
           if(rows.length <= 0) {
             res.json({msg: 'Producto no encontrado'})
           }
     
           rows.forEach((product) => {
             res.json({msg: 'Producto encontrado', product:product})
             });})
         .catch((e)=>console.log(e))
         // .finally(()=>knex.destroy())

    }

createProduct = async (req,res,next) => {
        console.log('Entro a createProduct')
        const newProductBody = req.body;
        const productDB = [{title: newProductBody.title,price: newProductBody.price,thumbnail: newProductBody.thumbnail}];

        knex('products').insert(productDB)
            .then(()=>res.render('./pages/agregar'))
            .catch((e)=>console.log(e))
            // .finally(()=>knex.destroy());
    }

updateProduct = async (req,res,next) => {
        console.log('Entro a updateProduct')
         const productExist = await knex('products').select('*').where('id', '=', `${req.params.id}`).then(product=> product);

         if (productExist.length <= 0) {
            res.json({msg: 'Producto no encontrado'});
         } else {

             /*Perdido a DB */
             knex('products').where('id', '=', `${req.params.id}`)
             .update({title: req.body.title, price: req.body.price, thumbnail: req.body.thumbnail})
             .then(()=>res.json('Producto modificado'))
             .catch((e)=>console.log(e))
             // .finally(()=>knex.destroy())
             ;
         }
    }

deleteProduct = async (req,res,next) => {
            console.log('Entro a deleteProduct')
            const productExist = await knex('products').select('*').where('id', '=', `${req.params.id}`).then(product=> product);
            
            if (productExist.length <= 0) {
                res.json({msg: 'Producto no encontrado'})
            } else {
                /*Solicitud a la DB */
                knex('products').where('id', '=', `${req.params.id}`)
                  .del()
                  .then(()=>{
                    console.log('Producto borrado')
                    res.json({msg: 'Se ha borrado un productos'});
                  })
                  .catch((e)=>console.log(e))
                  // .finally(()=>knex.destroy());
            }
    }

module.exports = {
    getProducts,
    getOneProduct,
    createProduct,
    updateProduct,
    deleteProduct
}