/*Requiero controladores de productos */
const cartController = require("../controller/cartController");

module.exports = (router) => {
  router

    .post("/api/cart/post-session", cartController.postCartSession)
    .get("/api/cart/get-session", cartController.getCartSession)


    // .post("/api/cart/create", cartController.createCart)
    // .get("/api/cart/", cartController.getAllCarts)
    // .get("/api/cart/search", cartController.getProductOnCart)
    // .delete("/api/cart/delete/search", cartController.deleteProductOnCart);
  return router;
};
