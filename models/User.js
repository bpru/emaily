const mongoose = require("mongoose");
const { Schema } = mongoose;

// create a user schema
const userSchema = new Schema({
  googleId: String
});

// create a collection using userSchema
mongoose.model('users', userSchema);
