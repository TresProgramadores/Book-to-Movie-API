'use strict';
const verifyUser = require('../auth.js')

const mongoose = require('mongoose');
const Book = require("../models/bookModel");
mongoose.connect(process.env.DB_URI);

let updateBook = async (req, res) => {
  verifyUser(req, async (err, user) => {
    if (err) {
      res.send('invalid token');
    } else {
      try {
        const book = await Book.findOne({ _id: req.params.id, email: user.email })
        if (!book) res.status(400).send('unable to update book');
        else {
          const updatedBook = await Book.findByIdAndUpdate(req.params.id, { ...req.body, email: user.email }, { new: true, overwrite: true });
          res.status(201).send(updatedBook);
        }
      } catch (err) {
        console.error(err);
        res.status(500).send('server error');
      }
    }
  })
}

module.exports = updateBook;