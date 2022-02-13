'use strict';

const mongoose = require('mongoose');
const Movie = require("../models/movieModel");
mongoose.connect(process.env.MONGODB_URI);
const verifyUser = require('../auth.js')

let deleteMovie = async (req, res) => {
  verifyUser(req, async (err, user) => {
    if (err) {
      res.send('invalid token');
    } else {
      const id = req.params.id;
      try {
        const movie = await Movie.findOne({ _id: id, email: user.email });
        if (!movie) res.status(400).send('unable to delete movie');
        else {
          await Movie.findByIdAndDelete(id);
          res.status(202).send('Movie has been deleted')
        }
      } catch (error) {
        console.log(error);
        res.status(404).send('Unable to delete movie')
      }
    }
  })
}

module.exports = deleteMovie;