/*Requiero controladores de productos */
const ProductService = require("../services/productService");
const product = new ProductService();

/*Controladores de Auth */
const passportFacebook = require("../auth/authPassportFacebook");
const passport = require("../auth/authPassportLocal");
const { checkAuthentication } = require("../auth/checkAuth");

module.exports = (router) => {
  router
    .get("/productos/vista", checkAuthentication, async (req, res, next) => {
      console.log("Entro a /productos/lista");
      const products = await product.getAllProducts();
      console.log('ESTO ME TRAE LA BASE DE DATOS:')
      console.log(products);
      res.render("./pages/lista", { products });
    })
    .get("/productos/agregar", checkAuthentication, (req, res, next) => {
      console.log("Ingresaron a pagina agregar producto");
      res.render("./pages/agregar");
    })

    .get("/chat-view", checkAuthentication, (req, res, next) => {
      console.log("Ingresaron a pagina de chat");
      res.render("./websocket");
    })

    .get("/login", (req, res, next) => {
      console.log("Ingresaron a pagina de login");
      res.render("./pages/login");
    })
    .get("/auth/facebook", passportFacebook.authenticate("facebook"))
    .get(
      "/auth/facebook/callback",
      passportFacebook.authenticate("facebook", {
        successRedirect: "/welcome",
        failureRedirect: "/login",
      })
    )
    .get("/signup", (req, res, next) => {
      console.log("Ingresaron a la página /signup");
      res.render("./pages/signup");
    })

    .get("/welcome", checkAuthentication, (req, res, next) => {
      console.log("Ingresaron a pagina de welcome");

      // console.log(req.session.passport.user);
      // const data = { user: req.session.passport.user };
      // console.log(data);
      // res.render("./pages/welcome", { data });

      console.log("esto ingresa a req.session.passport");
      const data = req.session.passport;

      console.log('Esto llega en data')
      console.log(data)

      res.render("./pages/welcome", { data });
    })
    .get("/goodbye", (req, res, next) => {
      res.render("./pages/goodbye");
    })

    .get("/error-login", (req, res, next) => {
      res.render("./pages/error-login");
    })
    .get("/error-signup", (req, res, next) => {
      res.render("./pages/error-signup");
    });
  return router;
};
