const passport = require("passport");

module.exports = app => {
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
};
