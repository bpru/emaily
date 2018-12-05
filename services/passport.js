const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const mongoose = require("mongoose");

const keys = require("../config/keys");

// pull out User model (collection) from mongoDB database
const User = mongoose.model("users");

// define a serialization function and pass to serializeUser
passport.serializeUser((user, done) => {
  // given a user, return back user.id as serialzation
  done(null, user.id);
});

// define a deserialization function and pass to deserializeUser
passport.deserializeUser((id, done) => {
  User.findById(id).then(user => {
    done(null, user);
  });
});

passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: "/auth/google/callback"
    },
    (accessToken, refreshToken, profile, done) => {
      // console.log("accessToken", accessToken);
      // console.log("refreshToken", refreshToken);
      // console.log("profile", profile);

      // done() is a callback given back from google auth to tell
      // passport that we have finished our jobs
      User.findOne({ googleId: profile.id }).then(existingUser => {
        if (existingUser) {
          done(null, existingUser); // done(errorObject, userRecord)
        } else {
          new User({ googleId: profile.id }).save().then(user => {
            done(null, user);
          });
        }
      });
    }
  )
);
