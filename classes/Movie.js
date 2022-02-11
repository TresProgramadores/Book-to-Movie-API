'use strict';

class Movie {
  constructor(movie) {
    this.title = movie?.title ?? 'no title available';
    this.description = movie?.overview ?? 'no description available';
    this.image = movie?.poster_path ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`: "https://bie.ala.org.au/assets/noImage-4aa1f329a2a32717ac0528cd12feffcc.jpg";
  }
}

module.exports = Movie;