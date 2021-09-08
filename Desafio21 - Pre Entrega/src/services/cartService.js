const cartModel = require ('../dao/models/cartMongoose');

module.exports = class {

    async createCart(cart) {
        return await cartModel.create(cart);
    }

    async getProductOnCart(id) {
        return await cartModel.find(cart);
    }

    async deleteProductOnCart(id) {
        return await cartModel.delete(id);
    }
    
}