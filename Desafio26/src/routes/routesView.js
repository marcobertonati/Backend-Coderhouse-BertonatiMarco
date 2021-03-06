/*Requiero controladores de productos */
const ProductService = require("../services/productService");
const product = new ProductService();


/*Controladores de Auth */
const { auth } = require("../auth/auth");
const passportFacebook = require("../auth/authPassportFacebook");
const passport = require("../auth/authPassportLocal");

const checkAuthentication = (req, res, next) => {
  if (req.isAuthenticated()) {
    const user = req.user;
    console.log("Usuario Logueado");
    next();
  } else {
    console.log("Usuario NO Logueado");
    res.redirect("/login");
  }
};

module.exports = (router) => {
  router
    .get("/productos/vista", checkAuthentication, async (req, res, next) => {
      console.log("Entro a /productos/lista");
      const products = await product.getAllProducts();
      console.log(products)
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
        successRedirect: "http://www.google.com/",
        failureRedirect: "/login",
      })
    )
    .get("/signup", (req, res, next) => {
      console.log("Ingresaron a la página /signup");
      res.render("./pages/signup");
    })

    .get("/welcome", checkAuthentication, (req, res, next) => {
      console.log("Ingresaron a pagina de welcome");
      console.log(req.session.passport.user);
      const data = { user: req.session.passport.user };
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
