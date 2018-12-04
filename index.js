const express = require("express");

const app = express();

// set up passport for google authentication
require("./services/passport");

// set up routes
require("./routes/authRoutes")(app);

const PORT = process.env.PORT || 5000;

app.listen(PORT);
