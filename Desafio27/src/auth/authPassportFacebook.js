const passport = require("passport");
const FacebookStrategy = require("passport-facebook").Strategy;
const userFacebookModel = require("../dao/models/userFacebookMongoose");

passport.use(
  "facebook",
  new FacebookStrategy(
    {
      clientID: "138891381738652",
      clientSecret: "db9d209060ae641820e5ba5c0f4be87b",
      callbackURL:
        "http://localhost:8080/auth/facebook/callback" /*Tiene que ser una vista del Frontend */,
      profileFields: ["id", "name", "photos", "email"],
      scope: ['email']
    },
    function (accessToken, refreshToken, profile, done) {
      console.log("Entro a Facebook Login");
      // console.log(profile);
      // const id = { id: profile.id };

      done(null,profile)

      // userFacebookModel.findOrCreate(id, function (err, user) {
      //   if (err) {
      //     return done(err);
      //   }
      //   console.log(user)
      //   done(null, user);
      // });
    }
  )
);

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(async function (id, done) {

  try {
    const userFinded = userModel.findById(id);
    return done(null, userFinded);
  } catch (err) {
    console.log(err);
  }
});

module.exports = passport;
