'use strict';

const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(process.env.DB_URI);
const Book = require('./models/bookModel')

const clear = async () => {
  try {
    await Book.deleteMany({});
    console.log('books cleared');
  } catch (err) {
    console.log(err);
  } finally {
    mongoose.disconnect();
  }
}

clear();