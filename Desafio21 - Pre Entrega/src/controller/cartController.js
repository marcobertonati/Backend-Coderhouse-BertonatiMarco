const CartService = require('../services/cartService');
const cart = new CartService();

exports.createCart = async (req,res,next) => {
    console.log('Entró a cartController => createCart');

    try {
        const cartBody = req.body;
        console.log(cartBody);
        const cartCreated = await cart.createCart(cartBody);
        res.json(cartCreated)

    } catch (error) {
        console.log(error)
    }

}

exports.getProductOnCart = async (req,res,next) => {
    console.log('Entró a cartController => getProductOnCart');

    try {
        const idCart = req.query.idCart;
        const idProduct = req.query.idProduct;
        console.log(idCart);
        console.log(idProduct);
        const productsOnCart = await cart.getProductOnCart(idCart);

        if (idProduct) {
            const productFinded = productsOnCart.product.find(product=> product.code == idProduct);
            console.log(productFinded);           
            res.json(productFinded);
        } else {
            console.log(productsOnCart);
            res.json(productsOnCart);
        }
        
    } catch (error) {
        console.log(error)
    }

}

exports.deleteProductOnCart = async (req,res,next) => {
    console.log('Entró a cartController => deleteProductOnCart');

    try {

        res.send('Working!')

    } catch (error) {
        console.log(error)
    }

}