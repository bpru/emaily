const express = require("express");
const mongoose = require("mongoose");
const cookieSession = require("cookie-session");
const passport = require("passport");

const keys = require("./config/keys");

// set up user schema
require("./models/User");

// set up passport for google authentication
require("./services/passport");

// connect to mongoDB
mongoose
  .connect(
    keys.mongoURL,
    { useNewUrlParser: true }
  )
  .then(() => console.log("MongoDB connected!"))
  .catch(err => console.log(err));

const app = express();

// add middlewares for handling
app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKeys]
    // cookieSession accept multiple keys and randomely choose one to encrypt
  })
);

app.use(passport.initialize());
app.use(passport.session());

// set up routes
require("./routes/authRoutes")(app);

const PORT = process.env.PORT || 5000;

app.listen(PORT);
