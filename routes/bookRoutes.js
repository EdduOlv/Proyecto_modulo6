const express = require("express");
const { createBook, getAllBooks } = require("../controllers/bookController");
const bookRouter = express.Router();


bookRouter.post("/create", createBook);
bookRouter.get("/readall", getAllBooks);

module.exports = bookRouter;