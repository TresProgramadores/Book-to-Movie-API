'use strict';
const verifyUser = require('../auth.js')

const mongoose = require('mongoose');
const Movie = require("../models/movieModel");
mongoose.connect(process.env.MONGODB_URI);

let addMovie = async (req, res) => {
  verifyUser(req, async (err, user) => {
    if (err) {
      res.send('invalid token')
    } else {
      try {
        const result = await Movie.create(req.body);
        res.status(201).send(result);
      } catch (err) {
        console.error(err);
        res.status(500).send('server error');
      }
    }
  })
}

module.exports = addMovie;