const { productService } = require("../services");
const productController = require("./productController");


module.exports = {
  productController: productController(productService),
};
