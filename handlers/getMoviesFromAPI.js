'use strict';

const axios = require('axios');
const Movie = require('../classes/Movie.js');

let getMoviesFromAPI = async (req, res) => {
  try {
    const userQuery = req.query.q;
    const apiUrl = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&query=${userQuery}`;
    let moviesFromAPI = await axios(apiUrl);
    const moviesArray = moviesFromAPI?.data?.results.map(movie => new Movie(movie));
    if (moviesFromAPI) res.status(200).send(moviesArray);
    else res.status(404).send('no books found');
  } catch (err) {
    console.error(err);
    res.status(500).send('server error');
  }
}


module.exports = getMoviesFromAPI;