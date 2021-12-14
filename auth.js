const GoogleStrategy = require("passport-google-oauth2").Strategy;
const dotenv = require('dotenv');
const passport = require("passport");

// make sure to specify the correct path

passport.use(
  new GoogleStrategy(
    {
      // Connection Confguration to Google authentication
      clientID: '204539066534-o7lk163cfnndtchlul8lpf0e7df888ml.apps.googleusercontent.com',
      clientSecret: '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',
      callbackURL: "https://calm-springs-55400.herokuapp.com/auth/google/callback",
      passReqToCallback: true,
    },
    // What to do once the user is successfully authenticated
    function (request, accessToken, refreshToken, profile, done) {
        return done(null, profile);
      }
  )
);

passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((user, done) => {
    done(null, user);
});


