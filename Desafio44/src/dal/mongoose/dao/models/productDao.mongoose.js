const { productModelMongoose } = require("../../schemas/productsMongoose");
const DTOmongoose = require("../../dto/dto.mongoose");

module.exports = class {
  constructor() {
    this.products = productModelMongoose;
  }

  async create(product) {
    return this.products.create(product);
  }

  async findById(id) {
    console.log(id);
    const result = await this.products.findById(id);
    console.log(result);
    const productsDTOmongoose = DTOmongoose.geyById(result);
    return await productsDTOmongoose;
  }

  async find() {
    const result = await this.products.find();
    const productsDTOmemory = DTOmongoose.getAllProducts(result);
    return productsDTOmemory;
  }

  async findByIdAndUpdate(id, productUpdated) {
    return this.products.findByIdAndUpdate(id, productUpdated, { new: true });
  }

  async findByIdAndDelete(id) {
    return this.products.findByIdAndDelete(id);
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
