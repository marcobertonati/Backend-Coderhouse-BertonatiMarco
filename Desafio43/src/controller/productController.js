const {
  loggerWarn,
  loggerTrace,
  loggerDefault,
  loggerError,
} = require("../logger/log4js");

const productController = (service) => {
  console.log("Esto trae service de productController:");
  console.log(service);
  return {
    createProduct: async (req, res, next) => {
      loggerTrace.trace("Ingresó a createProduct");

      /* Si el usuario se olvidó de agregar un stock aparecerá un WARN y se le dirá que se le puso stock 0 para evitar que se vendan productos, pero si que se visutalicen */

      if (req.body.stock === "") {
        loggerWarn.warn(
          `El usuario ingresó ${req.body.stock} como valor de stock. Se seteará en 0.`
        );

        req.body.stock = 0;
      }

      /*Agrego la hora en que se agregó el producto */
      const timestamp = new Date().toLocaleString();
      req.body.timestamp = timestamp;

      /*Chequeo el producto que agregamos */
      loggerDefault.info(req.body);

      try {
        loggerTrace.trace("Ingresó al try");
        const productCreated = await service.createProduct(req.body);
        res.json({ msg: "Product Created!", product: productCreated });
        // res.render('./pages/agregar')
        // res.redirect("/productos/agregar");
      } catch (error) {
        loggerTrace.trace("Ingresó al catch");
        loggerError.error(error);
        res.json(error);
      }
    },

    findAll: async (req, res, next) => {
      loggerTrace.trace("Ingresó a findAll");

      try {
        const products = await service.getAllProducts();

        //Para SSR
        // res.render("./pages/lista", { products });

        //Para ReactJS
        res.json(products);
      } catch (error) {
        loggerError.error(error);
        res.json(error);
      }
    },

    getOne: async (req, res, next) => {
      loggerTrace.trace("Ingresó a getOne");

      try {
        const id = req.params.id;
        loggerDefault.info(`El id ingresado es ${id}`);
        const productRetrieved = await service.getProduct(id);
        res.json(productRetrieved);
      } catch (error) {
        const errorMsg = {
          message: "No se encontraron productos",
          productFinded: false,
        };
        loggerError.error(error);
        res.json(errorMsg);
      }
    },

    updateProduct: async (req, res, next) => {
      loggerTrace.trace("Ingresó a updateProduct");

      try {
        const body = req.body;
        const id = req.params.id;
        const updateProduct = await service.updateProduct(id, body);
        loggerDefault.info(
          "El producto actualizado quedó de la siguiente manera: " +
            updateProduct
        );
        res.json(updateProduct);
      } catch (error) {
        loggerError.error(error);
        const errorMsg = {
          message: "No se encontraron productos",
          productFinded: false,
        };
        res.json(errorMsg);
      }
    },

    deleteOne: async (req, res, next) => {
      loggerTrace.trace("Ingresó a deleteOne");

      try {
        const id = req.params.id;
        loggerDefault.info(`El id ingresado es ${id}`);
        await service.deleteProduct(id);
        res.json({ msg: "Product deleted!" });
      } catch (error) {
        loggerError.error(error);
        const errorMsg = {
          message: "No se encontraron productos",
          productFinded: false,
        };
        res.json(errorMsg);
      }
    },

    getByName: async (req, res, next) => {
      loggerTrace.trace("Ingreso a getOneByName");

      try {
        const title = req.params.title;
        loggerDefault.info(`El nombre del producto ingresado es ${title}`);

        const productsRetrieved = await service.getProductByTitle(title);
        res.json(productsRetrieved);
      } catch (error) {
        loggerError.error(error);
        res.json(error);
      }
    },

    getByCode: async (req, res, next) => {
      loggerTrace.trace("Ingreso a getOneByCode");

      try {
        const code = req.params.code;
        loggerDefault.info(`El codigo del producto ingresado es ${code}`);

        const productsRetrieved = await service.getProductByCode(code);
        res.json(productsRetrieved);
      } catch (error) {
        loggerError.error(error);
        res.json(error);
      }
    },

    getByPrice: async (req, res, next) => {
      try {
        loggerDefault.info(
          `El usuario quiere productos entre precio: ${req.query.minvalue} y ${req.query.maxvalue}`
        );

        loggerDefault.info(req.query);

        if (
          req.query.minvalue === undefined ||
          req.query.maxvalue === undefined
        ) {
          res.render("./pages/search-products");
        } else {
          const pricemin = parseInt(req.query.minvalue);
          const pricemax = parseInt(req.query.maxvalue);
          const productsRetrieved = await service.getProductByPrice(
            pricemin,
            pricemax
          );
          res.render("./pages/products-finded", { productsRetrieved });
        }
      } catch (error) {
        loggerError.error(error);
        res.json(error);
      }
    },

    getByStock: async (req, res, next) => {
      loggerTrace.trace("Ingreso a getOneByStock");

      try {
        const stockmin = parseInt(req.query.stockmin);
        const stockmax = parseInt(req.query.stockmax);
        loggerDefault.info(
          `El usuario quiere productos entre stock: ${stockmin} y ${stockmax}`
        );
        const productsRetrieved = await service.getProductByStock(
          stockmin,
          stockmax
        );
        res.json(productsRetrieved);
      } catch (error) {
        loggerError.error(error);
        res.json(error);
      }
    },
  };
};

module.exports = productController;
