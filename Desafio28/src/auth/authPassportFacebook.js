const passport = require("passport");
const FacebookStrategy = require("passport-facebook").Strategy;
const userFacebookModel = require("../dao/models/userFacebookMongoose");

/*Para chquear si ingresamos FACEBOK CLIENT Y SU PASS */
let FACEBOOK_CLIENT_ID;
let FACEBOOK_CLIENT_SECRET;
process.argv.forEach((val, index) => {
  console.log(`${index} => ${val}`);
  if (index === 3) {
    FACEBOOK_CLIENT_ID = val;
    console.log(`Facebook Client ID: ${FACEBOOK_CLIENT_ID}`);
  }
  if (index === 4) {
    FACEBOOK_CLIENT_SECRET = val;
    console.log(`Facebook Client Secret: ${FACEBOOK_CLIENT_SECRET}`);
  }
});

passport.use(
  "facebook",
  new FacebookStrategy(
    {
      clientID:
        FACEBOOK_CLIENT_ID == undefined
          ? "138891381738652"
          : FACEBOOK_CLIENT_ID,
      clientSecret:
        FACEBOOK_CLIENT_SECRET == undefined
          ? "db9d209060ae641820e5ba5c0f4be87b"
          : FACEBOOK_CLIENT_SECRET,
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
