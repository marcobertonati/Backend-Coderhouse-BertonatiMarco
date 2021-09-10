const {productModel} = require('../dao/models/productsMongoose');

module.exports = class {

    async createProduct(product) {
        return await productModel.create(product);
    }

    async getProduct(id){
        return await productModel.findById(id);
    }

    async getAllProducts() {
        return await productModel.find();
    }

    async updateProduct(id, productUpdated) {
        const productToUpdate = await productModel.findByIdAndUpdate(id, productUpdated, {
            new: true,
        });

        return productToUpdate;
    }

    async deleteProduct(id) {
        await productModel.findByIdAndDelete(id);
    }

    async getProductByTitle (title) {
        return await productModel.find({title: title});
    }

    async getProductByCode (code) {
        return await productModel.find({code: code});
    }

    async getProductByPrice (pricemin, pricemax) {
        return await productModel.find({$and: [{price: {$gt:pricemin}}, {price: {$lt: pricemax}}]});
    }

    async getProductByStock (stockmin, stockmax) {
        return await productModel.find({$and: [{stock: {$gt:stockmin}}, {stock: {$lt: stockmax}}]});
    }
}

