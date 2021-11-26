const service = require("../services");
const productController = require("./productController");

module.exports = {
  productController: productController(service),
};
