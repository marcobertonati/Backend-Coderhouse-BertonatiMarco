const { productService } = require("./index");
const chalk = require("chalk");

module.exports = class {
  async addProductsToSession(cart, session) {
    console.log(chalk.bold.red("PRIMERA AGREGADA A CARRITO: Esto trae CART:"));
    console.log(cart);

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
        // console.log("ESTO ES EL ELSE");
        // console.log("esto ingresa por carrt");
        // console.log(cart);
        // console.log("Esto trae el newCart");
        // console.log(newCart);
        // console.log(newCart.length);

        // for (let i = 0; i < cart.length; i++) {
        //   for (let j = 0; j < newCart.length; j++) {
        //     console.log("For de J");
        //     console.log(newCart[j]);
        //     if (cart[i].id == newCart[j].product._id) {
        //       console.log("Ingreso al if");
        //       newCart[j].quantity = newCart[j].quantity + cart[i].quantity;
        //     } else {
        //       console.log("Ingreso al else");

        //       let [productFinded] = await productService.getProduct(cart[i].id);
        //       console.log("Producto encontrado: " + productFinded);
        //       newProductsFinded.push({
        //         product: productFinded,
        //         quantity: cart[i].quantity,
        //       });
        //     }
        //   }
        // }

        // console.log(
        //   chalk.bold.underline.red("PROXIMAS AGREGADAS A CARRITO: Esto trae CART:")
        // );
        // console.log(cart);

        // console.log(chalk.bold.red("Esto trae CART SESSION:"));
        // console.log(session.cartSession);

        // console.log(chalk.bold.red("Esto trae CART SESSION:"));
        // console.log(session.cartSession.products[0]);

        // console.log("Esto viene en cart");
        // console.log(cart);
        // console.log("Y esto viene en cartSession");
        // console.log(session.cartSession.products);

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


        // for (let i = 0; i < cart.length; i++) {
        //   let [productFinded] = await productService.getProduct(cart[i].id);
        //   cartCompleted.push({
        //     product: productFinded,
        //     quantity: cart[i].quantity,
        //   });

        // }
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
