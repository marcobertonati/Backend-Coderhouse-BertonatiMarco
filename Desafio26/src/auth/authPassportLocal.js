const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const modelUser = require("../dao/models/userMongoose");

// module.exports = () => {
  passport.use(
    'login',
    new LocalStrategy(
      {
        passReqToCallback: true,
      },
      function (req, email, password, done) {
        /*ACA DENTRO VA TODA LA LOGICA */
        console.log('working!')

        const userFinded = modelUser.findOne({ email: req.body.email });
        console.log(userFinded);

        if (!userFinded) {
          console.log(`Usuario con email ${req.body.email} no encontrado`);
          return done(
            null,
            false,
            console.log("mensaje", "usuario no encontrado")
          );
        }

        return done(null, userFinded);

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
  

  passport.deserializeUser(function(id, done) {
    modelUser.findById(id, function (err, user) {
        done(err, user);
    })
      
  })

  module.exports = passport;
// };
