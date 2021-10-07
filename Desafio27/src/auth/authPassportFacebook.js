const passport = require("passport");
const FacebookStrategy = require("passport-facebook").Strategy;
const userFacebookModel = require("../dao/models/userFacebookMongoose");

passport.use(
  "facebook",
  new FacebookStrategy(
    {
      clientID: "138891381738652",
      clientSecret: "db9d209060ae641820e5ba5c0f4be87b",
      callbackURL: "http://localhost:8080/auth/facebook/callback" /*Tiene que ser una vista del Frontend */,
    },
    function (accessToken, refreshToken, profile, done) {
      console.log("Entro a Facebook Login");
      console.log(profile);
      const id = { id: profile.id }
      
      userFacebookModel.findOrCreate(profile.id, function (err, user) {
        if (err) {
          return done(err);
        }
        done(null, user);
      });
    }
  )
);

module.exports = passport;
