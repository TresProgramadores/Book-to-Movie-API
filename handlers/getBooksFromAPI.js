'use strict';

const axios = require('axios');
const Book = require('../classes/Book.js');

let getBooksFromAPI = async (req, res) => {

  try {
    const userQuery = req.query.q;
    const apiUrl = `https://www.googleapis.com/books/v1/volumes?q=intitle:${userQuery}&key=${process.env.BOOK_API_KEY}&orderBy=relevance&printType=books`;
    let booksFromAPI = await axios(apiUrl);
    const booksArray = booksFromAPI?.data?.items?.map(book => new Book(book));
    if (booksArray) res.status(200).send(booksArray);
    else res.status(404).send('no books found');
  } catch (err) {
    console.error(err);
    res.status(500).send('server error');
  }
}

module.exports = getBooksFromAPI;

