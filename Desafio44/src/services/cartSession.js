const { productService } = require("./index");

module.exports = class {
  async addProductsToSession(cart, session) {

    try {
      if (!session.cartSession) {
        const cartCompleted = [];

        for (let i = 0; i < cart.length; i++) {
          let productFinded = await productService.getProduct(cart[i].id);
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

        for (let index = 0; index < cart.length; index++) {
          const productFinded = session.cartSession.products.findIndex(
            (element) => element.product.id == cart[index].id
          );

          if (productFinded > -1) {
            session.cartSession.products[productFinded] = {
              product: session.cartSession.products[productFinded].product,
              quantity: cart[index].quantity,

            };
          } else {
            let productFinded = await productService.getProduct(cart[index].id);
            session.cartSession.products.push({
              product: productFinded,
              quantity: cart[index].quantity,
            });
          }
        }

        const finalCartSession = session.cartSession.products.filter(
          (e) => e.quantity != 0
        );

        session.cartSession = {
          email: session.passport.user.email,
          timestamp: new Date().toLocaleDateString(),
          products: finalCartSession,
          address: session.passport.user.address,
        };
        return session.cartSession;
      }
    } catch (error) {
      console.log(error);
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
