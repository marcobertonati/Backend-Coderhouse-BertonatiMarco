/* PERSISTENCE: dependiendo de como se inicie el servidor tomará: mongoDB o memory */

const { PERSISTENCE } = require("../config/globals");
const persistenceFactory = require("../dal/factory");
let { persistenceProduct } = persistenceFactory.newPersistence(PERSISTENCE);

module.exports = class {
  constructor() {
    this.productModel = persistenceProduct;
  }
  async createProduct(product) {
    return await this.productModel.create(product);
  }

  async getProduct(id) {
    const data = await this.productModel.findById(id);
    return data;
  }

  async getAllProducts() {
    return await this.productModel.find();
  }

  async updateProduct(id, productUpdated) {
    return await this.productModel.findByIdAndUpdate(id, productUpdated);
  }

  async deleteProduct(id) {
    return await this.productModel.findByIdAndDelete(id);
  }

  async getByCategory(category) {
    return await this.productModel.findByCategory(category);
  }

  /* Los siguientes métodos no tienen un uso real en el cliente */

  async getProductByTitle(title) {
    return await this.productModel.getProductByTitle(title);
  }

  async getProductByCode(code) {
    return await this.productModel.getProductByCode(code);
  }

  async getProductByPrice(pricemin, pricemax) {
    return await this.productModel.getProductByPrice(pricemin, pricemax);
  }

  async getProductByStock(stockmin, stockmax) {
    return await this.productModel.find(stockmin, stockmax);
  }
};
