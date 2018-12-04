const express = require("express");
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;

const keys = require("./config/keys");

const app = express();

passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: "/auth/google/callback"
    },
    (accessToken, refreshToken, profile) => {
      console.log('accessToken', accessToken);
      console.log('refreshToken', refreshToken);
      console.log('profile', profile);
    }
  )
);

// use passport.authenticate to handle the get request
// the GoogleStrategy has an internal identifier to let passport recognize
// the string 'google' as a sign to use GoogleStrategy for authentication.
app.get(
  "/auth/google",
  passport.authenticate("google", {
    scope: ["profile", "email"]
  })
);

// again, use passport to handle the callback GET request
app.get("/auth/google/callback", passport.authenticate("google"));

const PORT = process.env.PORT || 5000;

app.listen(PORT);
