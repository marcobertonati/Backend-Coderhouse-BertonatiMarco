const passport = require("passport");
const FacebookStrategy = require("passport-facebook").Strategy;
const modelUser = require("../dao/models/userMongoose");

passport.use(
  "facebook",
  new FacebookStrategy(
    {
      clientID: "858110968231279",
      clientSecret: "8172df4e75d8ed04398ba09e399bd189",
      callbackURL: "http://localhost:8080/auth/facebook" /*Tiene que ser una vista del Frontend */,
    },
    function (accessToken, refreshToken, profile, done) {
      console.log("Entro a FAcebook Login");
      modelUser.create(profile.id, function (err, user) {
        if (err) {
          return done(err);
        }
        done(null, user);
      });
    }
  )
);

module.exports = passport;
