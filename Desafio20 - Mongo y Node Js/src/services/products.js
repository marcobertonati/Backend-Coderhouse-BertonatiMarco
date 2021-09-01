const productModel = require('../dao/models/productsMongoose');

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
}