const productController = require('../controller/product');


module.exports = (router) => {

    router.
        get("/api/productos/listar", productController.getProducts)
        .get("/api/productos/listar/:id", productController.getOneProduct)
        .post("/api/productos/guardar", productController.createProduct)
        .put("/api/productos/actualizar/:id", productController.updateProduct)
        .delete('/api/productos/borrar/:id', productController.deleteProduct)
    
    return router
        
}