'use strict';

const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(process.env.MONGODB_URI);

const Movie = require('./models/movieModel');

const seed = async () => {
  const myMovie = new Movie({
    title: 'Harry Potter',
    description: 'wands and magic',
    status: 'available',
    email: 'sergey.otryshko@gmail.com'
  });
  myMovie.save(function (err) {
    if (err) console.log(err);
    else console.log('saved Harry Potter');
  });

  try {
    await Movie.create({
      title: 'Lord of the Rings',
      description: 'hobbits and orcs',
      status: 'not available',
      email: 'sergey.otryshko@gmail.com'
    })
    console.log('saved Lord of the Rings');
  } catch (err) {
    console.log(err);
  }

  try {
    await Movie.create({
      title: 'Forgotten Realms',
      description: 'elves and dwarves',
      status: 'available',
      email: 'sergey.otryshko@gmail.com'
    })
    console.log('saved Forgotten Realms');
  } catch (err) {
    console.log(err);
  }

  mongoose.disconnect();
}

seed();