const express = require("express");
const mongoose = require("mongoose");

const keys = require("./config/keys");

// connect to mongoDB
mongoose
  .connect(
    keys.mongoURL,
    { useNewUrlParser: true }
  )
  .then(() => console.log("MongoDB connected!"))
  .catch(err => console.log(err));

const app = express();

// set up passport for google authentication
require("./services/passport");

// set up routes
require("./routes/authRoutes")(app);

const PORT = process.env.PORT || 5000;

app.listen(PORT);
