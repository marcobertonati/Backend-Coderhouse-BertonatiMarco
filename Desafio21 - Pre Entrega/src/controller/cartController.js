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
    
        res.send('Working!')
        
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