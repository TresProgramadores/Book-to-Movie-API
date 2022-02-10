'use strict';

const mongoose = require('mongoose');
const Book = require("../models/bookModel");
mongoose.connect(process.env.DB_URI);
const verifyUser = require('../auth.js')

let deleteBook = async (req, res) => {
  verifyUser(req, async (err, user) => {
    if (err) {
      res.send('invalid token');
    } else {
      const id = req.params.id;
      try {
        const book = await Book.findOne({ _id: id, email: user.email });
        if (!book) res.status(400).send('unable to delete book');
        else {
          await Book.findByIdAndDelete(id);
          res.status(202).send('Book has been deleted')
        }
      } catch (error) {
        console.log(error);
        res.status(404).send('Unable to delete book')
      }
    }
  })
}

module.exports = deleteBook;