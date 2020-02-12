const { Schema } = require("mongoose");
const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/booksProject");
const bookModel = new Schema({
  bookName: {
    type: String,
    required: true
  },
  authorName: {
    type: String,
    required: true
  },
  yearOfPublishment: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model("books", bookModel);
