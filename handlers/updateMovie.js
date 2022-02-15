'use strict';
const verifyUser = require('../auth.js')

const mongoose = require('mongoose');
const Movie = require("../models/movieModel");
mongoose.connect(process.env.MONGODB_URI);

let updateMovie = async (req, res) => {
  verifyUser(req, async (err, user) => {
    if (err) {
      res.send('invalid token');
    } else {
      try {
        const movie = await Movie.findOne({ _id: req.params.id, email: user.email })
        if (!movie) res.status(400).send('unable to update movie');
        else {
          const updatedMovie = await Movie.findByIdAndUpdate(req.params.id, { ...req.body, email: user.email }, { new: true, overwrite: true });
          res.status(201).send(updatedMovie);
        }
      } catch (err) {
        console.error(err);
        res.status(500).send('server error');
      }
    }
  })
}

module.exports = updateMovie;