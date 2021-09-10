const cartModel = require ('../dao/models/cartMongoose');

module.exports = class {

    async createCart(cart) {
        return await cartModel.create(cart);
    }

    async getProductOnCart(idCart) {
        return await cartModel.findById(idCart);
    }

    async deleteProductOnCart(id) {
        return await cartModel.delete(id);
    }
    
}