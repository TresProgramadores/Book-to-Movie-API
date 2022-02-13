'use strict';
const verifyUser = require('../auth.js')

const mongoose = require('mongoose');
const Movie = require("../models/movieModel");
mongoose.connect(process.env.MONGODB_URI);

let getMovies = async (req, res) => {

  verifyUser(req, async (err, user) => {
    if (err) {
      res.send('invalid token');
    } else {
      try {
        //let booksFromDB = await Book.find({}); find all objects
        let moviesFromDB = await Movie.find({ email: user.email });
        if (moviesFromDB) res.status(200).send(moviesFromDB);
        else res.status(404).send('no movies found');
      } catch (err) {
        console.error(err);
        res.status(500).send('server error');
      }
    }
  })
}

module.exports = getMovies;