const Book = require('../models/bookModel')
// const bcryptsjs = require('bcryptsjs')
// const jwt = require('jsonwebtoken')

exports.createBook = async (req, res) => {
    const { title, author, publisher, summary, pageCount, price } = req.body;
    try {
        const newBook = await Book.create({ title, author, publisher, summary, pageCount, price })
        res.json(newBook)
    } catch (error) {
        res.status(500).json({
            msg: "There was an error creating the book",
            error: error.message
        })
    }
};

exports.getAllBooks = async (req, res) => {
    try {
        const books = await Book.find({});
        res.json({books}) 
    } catch (error) {
        res.status(500).json({
            msg: "There was an error while trying to get the books",
            error
        })
    }
}