const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const userModel = require("../dao/models/userMongoose");

const saltRounds = 12;

// module.exports = () => {
passport.use(
  "local-login",
  new LocalStrategy(
    {
      passReqToCallback: true,
      usernameField: 'email', /*Esto 3 campos tienen que estar para que funcione */
      passwordField: 'password'
    },
    async function (req ,username, password, done) {
      /*ACA DENTRO VA TODA LA LOGICA */
      console.log(req.body);

      try {

        const userFinded = await userModel.findOne({ email: req.body.email, password: req.body.password });
  
        if (!userFinded) {
          console.log('No se encontró usuario');
          return done(
            null,
            false,
            console.log("mensaje", "usuario no encontrado")
          );
        }
  
        return done(null, userFinded);
        
      } catch (error) {

        console.log(error);
        
      }

      // modelUser.findOne({ email: email }, function (err, user) {
      //   // if (err) { return done(err); }
      //   // if (!user) { return done(null, false); }
      //   // if (!user.verifyPassword(password)) { return done(null, false); }
      //   return done(null, user);
      // });
    }
  )
);

passport.use(
  "signup",
  new LocalStrategy(function (username, password, done) {
    User.findOne({ username: username }, function (err, user) {
      if (err) {
        return done(err);
      }
      if (!user) {
        return done(null, false);
      }
      if (!user.verifyPassword(password)) {
        return done(null, false);
      }
      return done(null, user);
    });
  })
);

passport.serializeUser(function (user, done) {
  done(null, user._id);
});

passport.deserializeUser(function (id, done) {
  modelUser.findById(id, function (err, user) {
    done(err, user);
  });
});

module.exports = passport;
// };
