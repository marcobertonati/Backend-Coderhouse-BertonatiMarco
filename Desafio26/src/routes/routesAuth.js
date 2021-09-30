/* Rutas de Autenticación, Autorización y Registro */

/* Requiero controladores de ruta */
const { signUp, logIn, logOut } = require("../controller/authController");

// const passport = require("passport");
const passport = require("../auth/authPassportLocal");

module.exports = (router) => {
  router
    // .post('/api/signup', signUp)
    // .get('/api/login', logIn)
    // .post('/api/logout', logOut)

    .post(
      "/api/signup",
      passport.authenticate("signup-local", { failureRedirect: "/failsignup" }),
      (req, res, next) => {
        console.log("Usuario Creado");
        res.redirect("/welcome");
      }
    )
    .get("/failsignup", (req, res, next) => {
      res.status(400).send({ error: "Usuario ya creado con ese mail" });
    })

    .post(
      "/api/login",
      passport.authenticate("local-login"),
      (req, res, next) => {
        console.log("Paso autenticación");
        res.redirect("/welcome");
      }
    )
    .get("/faillogin", (req, res, next) => {
      res.status(400).send({ error: "usuario o contraseña invalida" });
    })

    .post("/api/logout", logOut);

  return router;
};
