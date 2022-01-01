const { productService } = require("./index");

module.exports = class {
  async addProductsToSession(cart, session) {

    /*
    
    El codigo de arriba se tiene que ejecutar solo si no hay session. Si no hay session tenemos que chequear los items que tiene esas session.
    
    */

    if (!session.cartSession) {
      const cartCompleted = [];

      for (let i = 0; i < cart.length; i++) {
        let [productFinded] = await productService.getProduct(cart[i].id);
        cartCompleted.push({
          product: productFinded,
          quantity: cart[i].quantity,
        });
      }


      
      session.cartSession = {
        email: session.passport.user.email,
        timestamp: new Date().toLocaleDateString(),
        products: cartCompleted,
        address: session.passport.user.address,
      };

      return session.cartSession;
    } else {


      for (let i = 0; i < cart.length; i++) {
        let [productFinded] = await productService.getProduct(cart[i].id);
        cartCompleted.push({
          product: productFinded,
          quantity: cart[i].quantity,
        });
      }
      // for (let i = 0; i < session.cartSession.products.length; i++) {
      //   if (session.cartSession.products[i]._id === cart.id) {
      //     session.cartSession.products[i].quantity =
      //       session.cartSession.products[i].quantity + cart.quantity;

      //     newCart.push(session.cartSession.products[i]);
      //   }
      // }

      // session.cartSession = [...session.cartSession, ...cart];
      return session.cartSession;
    }
  }

  getProductsFromSession = (productsOnCart) => {
    if (!productsOnCart) {
      return "No hay productos";
    } else {
      return productsOnCart;
    }
  };
};
