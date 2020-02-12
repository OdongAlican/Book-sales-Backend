const { Schema } = require("mongoose");
const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/booksProject");
const userSchema = new Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: Number,
    required: true
  }
});

module.exports = mongoose.model("users", userSchema);
