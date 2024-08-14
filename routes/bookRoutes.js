const express = require("express");
const { createBook, getAllBooks, updateBook, deleteBook, readone } = require("../controllers/bookController");
const bookRouter = express.Router();


bookRouter.post("/create", createBook);
bookRouter.get("/readall", getAllBooks);
bookRouter.get("/readone", readone);
bookRouter.put("/update", updateBook);
bookRouter.delete("/delete", deleteBook);

module.exports = bookRouter;