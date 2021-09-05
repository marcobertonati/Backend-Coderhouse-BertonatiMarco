const ProductService = require("../services/productsMongoose");
const product = new ProductService();

exports.createProduct = async (req, res, next) => {
  console.log("Ingresó a createProduct");
  console.log(req.body);

  try {
    const productCreated = await product.createProduct(req.body);
    res.json({ msg: "Product Created!", product: productCreated });
    // res.render('./pages/agregar')
    // res.redirect('/productos/agregar');
  } catch (error) {
    console.log(error);
  }
};

exports.findAll = async (req, res, next) => {
  console.log("Ingresó a findAll");
  try {
    const allProducts = await product.getAllProducts();
    res.json(allProducts);
  } catch (error) {
    console.log("Entro al Catch");
    console.log(error);
  }
};

exports.getOne = async (req, res, next) => {
  console.log("Ingresó a getOne");

  try {
    const id = req.params.id;
    console.log(id);
    const productRetrieved = await product.getProduct(id);
    res.json(productRetrieved);
  } catch (error) {
    console.log(error);
  }
};

exports.updateProduct = async (req, res, next) => {
  console.log("Ingresó a updateProduct");

  try {
    const body = req.body;
    const id = req.params.id;
    const updateProduct = await product.updateProduct(id, body);
    res.json(updateProduct);
  } catch (error) {
    console.log(error);
  }
};

exports.deleteOne = async (req, res, next) => {
  console.log("Ingresó a deleteOne");

  try {
    const id = req.params.id;
    await product.deleteProduct(id);
    res.json({ msg: "Product deleted!" });
  } catch (error) {
    console.log(error);
  }
};

exports.getByName = async (req, res, next) => {
  console.log("Ingreso a getOneByName");

  try {
    const title = req.params.title;
    const productsRetrieved = await product.getProductByTitle(title);
    res.json(productsRetrieved);
  } catch (error) {
    console.log(error);
  }
};

exports.getByCode = async (req, res, next) => {
  console.log("Ingreso a getOneByCode");

  try {
    const code = req.params.code;
    const productsRetrieved = await product.getProductByCode(code);
    res.json(productsRetrieved);
  } catch (error) {
    console.log(error);
  }
};

exports.getByPrice = async (req, res, next) => {
  console.log("Ingreso a getOneByPrice");

  try {
    const pricemin = parseInt(req.query.pricemin);
    const pricemax = parseInt(req.query.pricemax);
    const productsRetrieved = await product.getProductByPrice(pricemin,pricemax);
    res.json(productsRetrieved);
  } catch (error) {
    console.log(error);
  }


};

exports.getByStock = async (req, res, next) => {
  console.log("Ingreso a getOneByStock");

  try {
    const stockmin = parseInt(req.query.stockmin);
    const stockmax = parseInt(req.query.stockmax);
    console.log(stockmin);
    console.log(stockmax)
    const productsRetrieved = await product.getProductByStock(stockmin,stockmax);
    console.log(productsRetrieved.length)
    res.json(productsRetrieved);
  } catch (error) {
    console.log(error);
  }


}
