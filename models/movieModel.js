'use strict';

const mongoose = require('mongoose');
const { Schema } = mongoose;

const movieSchema = new Schema( {
  title: String,
  description: String,
  image: String,
  email: String,
  notes: String
} );

const Movie = mongoose.model('Movie', movieSchema);

module.exports = Movie;