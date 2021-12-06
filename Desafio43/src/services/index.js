// const dao = require("../dao/models/productsMongoose");
const ProductService = require('./productService')
// const product = new productService();


module.exports = {
    productService: new ProductService()
}
