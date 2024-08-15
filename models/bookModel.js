const mongoose = require("mongoose");
const BookSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    publisher: {
      type: String,
      required: true,
    },
    summary: {
      type: String,
      required: true,
    },
    pageCount: {
      type: Number,
    },
    price: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);


  // "title": "libro maravilloso",
  // "author": "autora",
  // "publisher": "libreria",
  // "summary": "resumen del libro",
  // "pageCount": 300,
  // "price": 200000

const Book = mongoose.model("Book", BookSchema);

module.exports = Book;
