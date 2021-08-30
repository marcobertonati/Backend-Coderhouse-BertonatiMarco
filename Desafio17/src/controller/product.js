/* Requiero DB y configuración de la misma */
const { options } = require ('../../options/mysqlDB');
const knex = require ('knex')(options);

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

        const newProductBody = req.body;
        const productDB = [{title: newProductBody.title,price: newProductBody.price,thumbnail: newProductBody.thumbnail}];

        knex('products').insert(productDB)
                .then(()=>console.log('Producto guardado en la DB'))
                .catch((e)=>console.log(e))
                // .finally(()=>knex.destroy());
        res.json(`Agregado nuevo producto`);
    }

updateProduct = async (req,res,next) => {

        /*Perdido a DB */
          
        knex('products').where('id', '=', `${req.params.id}`)
        .update({title: req.body.title, price: req.body.price, thumbnail: req.body.thumbnail})
        .then(()=>console.log('Producto actualizado'))
        .catch((e)=>console.log(e))
        // .finally(()=>knex.destroy())
    
        res.json('Producto modificado');
        
    }

deleteProduct = async (req,res,next) => {
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

module.exports = {
    getProducts,
    getOneProduct,
    createProduct,
    updateProduct,
    deleteProduct
}