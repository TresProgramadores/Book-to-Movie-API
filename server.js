
   
'use strict';

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const getBooks = require('./handlers/getBooks');
const getMovies = require('./handlers/getMovies');
const addBook = require('./handlers/addBook');
const addMovie = require('./handlers/addMovie');
const deleteBook = require('./handlers/deleteBook');
const deleteMovie = require('./handlers/deleteMovie');
const updateBook = require('./handlers/updateBook');
const updateMovie = require('./handlers/updateMovie');
// const getUser = require('./handlers/getUser');
const getBooksFromAPI = require('./handlers/getBooksFromAPI');
const getMoviesFromAPI = require('./handlers/getMoviesFromAPI');


const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3002;

// making a database called books-database
mongoose.connect(process.env.MONGODB_URI, {useNewUrlParser: true, useUnifiedTopology: true});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('Mongoose is connected')
});

app.get('/searchBooks', getBooksFromAPI)
app.get('/searchMovies', getMoviesFromAPI)
app.get('/books', getBooks);
app.get('/movies', getMovies);
app.post('/books', addBook);
app.post('/movies', addMovie);
app.delete('/books/:id', deleteBook);
app.delete('/movies/:id', deleteMovie);
app.put('/books/:id', updateBook)
app.put('/movies/:id', updateMovie)
// app.get('/user', getUser)

app.listen(PORT, () => console.log(`listening on ${PORT}`));