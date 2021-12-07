// /*Elegimos persistencia */
// const { getPersistenceFactory } = require("../dal/factory");
// const persistenceFactory = getPersistenceFactory();

const { PERSISTENCE } = require("../config/globals");
const persistenceFactory = require("../dal/factory");
let productModel = persistenceFactory.newPersistence(PERSISTENCE);

module.exports = class {
  constructor() {
    this.productModel = productModel;
  }
  async createProduct(product) {
    return await this.productModel.create(product);
  }

  async getProduct(id) {
    return await this.productModel.findById(id);
  }

  async getAllProducts() {
    return await this.productModel.find();
  }

  async updateProduct(id, productUpdated) {
    return await this.productModel.findByIdAndUpdate(id, productUpdated);
  }

  async deleteProduct(id) {
    await this.productModel.findByIdAndDelete(id);
  }

  // async getProductByTitle(title) {
  //   console.log("Ingresó a productService => getProductByTitle");
  //   return await productModel.find({ title: title });
  // }

  // async getProductByCode(code) {
  //   console.log("Ingresó a productService => getProductByCode");
  //   return await productModel.find({ code: code });
  // }

  // async getProductByPrice(pricemin, pricemax) {
  //   return await productModel
  //     .find({
  //       $and: [{ price: { $gte: pricemin } }, { price: { $lte: pricemax } }],
  //     })
  //     .lean();
  // }

  // async getProductByStock(stockmin, stockmax) {
  //   console.log("Ingresó a productService => getProductByStock");
  //   return await productModel.find({
  //     $and: [{ stock: { $gte: stockmin } }, { stock: { $lte: stockmax } }],
  //   });
  // }
};
