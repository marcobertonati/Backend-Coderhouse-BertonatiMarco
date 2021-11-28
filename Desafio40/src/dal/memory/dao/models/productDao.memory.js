const mockProduct = require("../../../../../__test__/mock/products.mock.js");

module.exports = class {
  constructor() {
    this.products = mockProduct;
  }

  async create(product) {
    return await this.products.push(product);
  }

  async findById(id) {
    const result = this.products.filter((product) => product.id == id);
    return await result;
  }

  async find() {
    return await this.products;
  }

  async findByIdAndUpdate(id, productUpdated) {
    this.products.forEach((e) => {
      if (e.id == id) {
        e = { ...productUpdated };
      }
    });
    return `producto ${id} updateado`;
  }

  async findByIdAndDelete(id) {
    const results = this.products.filter((product) => product.id !== id);
    await results;
  }

  //   async getProductByTitle(title) {
  //     console.log("Ingresó a productService => getProductByTitle");
  //     return await productModel.find({ title: title });
  //   }

  //   async getProductByCode(code) {
  //     console.log("Ingresó a productService => getProductByCode");
  //     return await productModel.find({ code: code });
  //   }

  //   async getProductByPrice(pricemin, pricemax) {
  //     return await productModel
  //       .find({
  //         $and: [{ price: { $gte: pricemin } }, { price: { $lte: pricemax } }],
  //       })
  //       .lean();
  //   }

  //   async getProductByStock(stockmin, stockmax) {
  //     console.log("Ingresó a productService => getProductByStock");
  //     return await productModel.find({
  //       $and: [{ stock: { $gte: stockmin } }, { stock: { $lte: stockmax } }],
  //     });
  //   }
};
