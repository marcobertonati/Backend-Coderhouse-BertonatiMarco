const passport = require("passport");
const FacebookStrategy = require("passport-facebook").Strategy;
const userFacebookModel = require("../dao/models/userFacebookMongoose");


/*Para chquear si ingresamos FACEBOOK CLIENT Y SU PASS */
let consoleFacebookId;
let consoleFacebookSecret;
process.argv.forEach((val, index) => {
  console.log(`${index} => ${val}`);
  if (index === 3) {
    consoleFacebookId = val;
    console.log(`Facebook Client ID: ${consoleFacebookId}`);
  }
  if (index === 4) {
    consoleFacebookSecret = val;
    console.log(`Facebook Client Secret: ${consoleFacebookSecret}`);
  }
});

/*Sino vamos a usar las variables de entorno */
const FACEBOOK_CLIENT_ID = process.env.FACEBOOK_CLIENT_ID;
const FACEBOOK_CLIENT_SECRET = process.env.FACEBOOK_CLIENT_SECRET;

passport.use(
  "facebook",
  new FacebookStrategy(
    {
      clientID:
        consoleFacebookId == undefined
          ? FACEBOOK_CLIENT_ID
          : consoleFacebookId,
      clientSecret:
        consoleFacebookSecret == undefined
          ? FACEBOOK_CLIENT_SECRET
          : consoleFacebookSecret,
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
