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
      scope: ["email"],
    },
    async function (accessToken, refreshToken, profile, done) {
      console.log("Entro a Facebook Login");
      const profileFacebook = {
        id_facebook: profile.id,
        firstName: profile.name.givenName,
        lastName: profile.name.familyName,
        email: profile.emails[0].value,
        photo: profile._json.picture.data.url,
      };

      // await userFacebookModel.create(profileFacebook)

      try {
        await userFacebookModel.findOrCreate(
          { id_facebook: profile.id },
          profileFacebook,
          function (err, data) {
            if (err) {
              console.log(err);
            } else {
              console.log("esto viene en data");
              console.log(data);
              done(null, data);
            }
          }
        );
      } catch (error) {
        console.log(error);
      }
    }
  )
);

passport.serializeUser(function (user, done) {
  console.log("Serealize");
  done(null, user);
});

passport.deserializeUser(async function (id, done) {
  console.log("Deserealize");
  try {
    const userFinded = await userFacebookModel.findById(id);
    return done(null, userFinded);
  } catch (err) {
    console.log(err);
  }
});

module.exports = passport;
