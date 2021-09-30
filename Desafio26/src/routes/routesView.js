/*Requiero controladores de productos */
const ProductService = require("../services/productService");
const product = new ProductService();

/*Controladores de Auth */
const { auth } = require("../auth/auth");
const passportFacebook = require("../auth/authPassportFacebook");
const passport = require("../auth/authPassportLocal");

const checkAuthentication = (req,res, next) => {
  if (req.isAuthenticated()) {
    const user = req.user;
    console.log('Usuario Logueado')
    next();
  } else {
    console.log('Usuario NO Logueado')
    res.redirect('/login')
  }
}




module.exports = (router) => {
  router
    .get("/productos/vista", async (req, res, next) => {
      console.log("Entro a /productos/lista");
      const products = await product.getAllProducts();
      res.render("./pages/lista", { products });
    })

    .get("/productos/agregar", (req, res, next) => {
      console.log("Ingresaron a pagina agregar producto");
      res.render("./pages/agregar");
    })

    .get("/chat-view", (req, res, next) => {
      console.log("Ingresaron a pagina de chat");
      res.render("./websocket");
    })

    .get("/login", (req, res, next) => {
      console.log("Ingresaron a pagina de login");
      res.render("./pages/login");
    })
    .get("/auth/facebook", passportFacebook.authenticate("facebook"))

    .get("/welcome", checkAuthentication, (req, res, next) => {
      console.log("Ingresaron a pagina de welcome");
      const data = { user: req.session.user };
      res.render("./pages/welcome", { data });
    })

    .get("/goodbye", (req, res, next) => {
      res.render("./pages/goodbye");
    });
  return router;
};
