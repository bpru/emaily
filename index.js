const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cookieSession = require("cookie-session");
const passport = require("passport");

const keys = require("./config/keys");

// set up schemas
require("./models/User");
require("./models/Survey");

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

// parse incoming request body and store in req.body
app.use(bodyParser.json());

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
require("./routes/billingRoutes")(app);
require("./routes/surveyRoutes")(app);

if (process.env.NODE_ENV === "production") {
  // Express will serve up production assets, like main.js or main.css
  app.use(express.static("client/build"));

  // Express will serve index.html if it doesnt recognize the route
  const path = require("path");
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
    // The path.resolve() method resolves a sequence of paths or path segments into an absolute path.
  });
}

const PORT = process.env.PORT || 5000;

app.listen(PORT);
