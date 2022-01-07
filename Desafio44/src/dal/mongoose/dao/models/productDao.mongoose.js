const { productModelMongoose } = require("../../schemas/productsMongoose");
const DTOmongoose = require("../../dto/dto.mongoose");

module.exports = class {
  constructor() {
    this.products = productModelMongoose;
  }

  async create(product) {
    try {
      return this.products.create(product);
    } catch (error) {
      console.log(error);
    }
  }

  async findById(id) {
    try {
      const result = await this.products.findById(id);
      const productsDTOmongoose = DTOmongoose.geyById(result);
      return await productsDTOmongoose;
    } catch (error) {
      console.log(error);
    }
  }

  async find() {
    try {
      const result = await this.products.find();
      const productsDTOmemory = DTOmongoose.getAllProducts(result);
      return productsDTOmemory;
    } catch (error) {
      console.log(error);
    }
  }

  async findByIdAndUpdate(id, productUpdated) {
    try {
      return this.products.findByIdAndUpdate(id, productUpdated, { new: true });
    } catch (error) {
      console.log(error);
    }
  }

  async findByIdAndDelete(id) {
    try {
      return this.products.findByIdAndDelete(id);
    } catch (error) {
      console.log(error);
    }
  }

  async findByCategory(category) {
    try {
      const response = await this.products.find({ category: category }).lean();
      const result = DTOmongoose.getAllProducts(response);
      return result;
    } catch (error) {
      console.log(error);
    }
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
