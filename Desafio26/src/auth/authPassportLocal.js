const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");
const userModel = require("../dao/models/userMongoose");

const saltRounds = 12;

passport.use(
  "local-login",
  new LocalStrategy(
    {
      passReqToCallback: true,
      usernameField:
        "email" /*Esto 3 campos tienen que estar para que funcione */,
      passwordField: "password",
    },
    async function (req, username, password, done) {
      console.log("Entro a Passport Login");
      console.log(req.body);
      try {
        const userFinded = await userModel.findOne({ email: req.body.email });

        if (!userFinded) {
          console.log("No se encontró usuario");
          return done(
            null,
            false,
            console.log("mensaje", "usuario no encontrado")
          );
        }

        if (req.body.password !== userFinded.password) {
          console.log("Contraseña incorrecta");
          return done(
            null,
            false,
            console.log("mensaje", "usuario o contraseña incorrecta")
          );
        }

        return done(null, userFinded);
      } catch (error) {
        console.log(error);
      }
    }
  )
);

passport.use(
  "signup-local",
  new LocalStrategy(
    {
      passReqToCallback: true,
      usernameField:
        "email" /*Esto 3 campos tienen que estar para que funcione */,
      passwordField: "password",
    },
    async function (req, username, password, done) {
      /*NOSE SI EXISTE ESE findOrCreate */
      // userModel.findOrCreate({ username: username }, function (err, user) {
      //   if (err) {
      //     return done(err);
      //   }
      //   if (!user) {
      //     return done(null, false);
      //   }
      //   if (!user.verifyPassword(password)) {
      //     return done(null, false);
      //   }
      //   return done(null, user);
      // });

      try {
        const userFinded = await userModel.findOne({ email: req.body.email });

        if (userFinded) {
          return done(
            null,
            false,
            console.log("mensaje", "Hay un usuario registrado con su mail")
          );
        } else {
          const userToCreate = await userModel.create(req.body);
          return done(null, userToCreate);
        }
      } catch (err) {
        console.log(err);
      }
    }
  )
);

passport.serializeUser(function (user, done) {
  done(null, user._id);
});

passport.deserializeUser(async function (id, done) {
  // userModel.findById(id, function (err, user) {
  //   done(err, user);
  // });

  try {
    const userFinded = userModel.findById(id);
    return done(null, userFinded);
  } catch (err) {
    console.log(err);
  }
});

module.exports = passport;
