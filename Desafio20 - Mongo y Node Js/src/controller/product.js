const ProductService = require("../services/products");
const product = new ProductService();

exports.createProduct = async (req, res, next) => {
  console.log("Ingresó a createProduct");

  try {
    const productCreated = await product.createProduct(req.body);
    // res.json({ msg: "Product Created!", product: productCreated });
    // res.render('./pages/agregar')
    res.redirect('/productos/agregar');
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
