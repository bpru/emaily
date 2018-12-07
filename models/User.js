const mongoose = require("mongoose");
const { Schema } = mongoose;

// create a user schema
const userSchema = new Schema({
  googleId: String,
  credit: {
    type: Number,
    default: 0
  }
});

// create a collection using userSchema
mongoose.model("users", userSchema);
