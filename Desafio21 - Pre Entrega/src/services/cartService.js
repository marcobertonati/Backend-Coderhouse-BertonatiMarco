const cartModel = require ('../dao/models/cartMongoose');

module.exports = class {

    async createCart(cart) {
        console.log('Ingresó a cartService => createCart');
        return await cartModel.create(cart);
    }

    async getProductOnCart(idCart) {
        console.log('Ingresó a cartService => getProductOnCart');
        return await cartModel.findById(idCart);
    }

    async deleteProductOnCart({idCart, idProduct}) {
        console.log('Ingresó a cartService => deleteProductOnCart');
        return await cartModel.findOneAndUpdate({_id: idCart}, {$pull: { product: {code: idProduct}}})
    }
    
}