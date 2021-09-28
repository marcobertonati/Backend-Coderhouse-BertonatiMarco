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

    .post("/api/signup", signUp)
    .post(
      "/api/login",
      passport.authenticate("local-login"),
      (req, res, next) => {
        console.log("Paso autenticación");
        res.json(req.body);
      }
    )
    .post("/api/logout", logOut);

  return router;
};
