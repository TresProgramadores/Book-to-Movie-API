'use strict';

class Book {
  constructor(book) {
    console.log(book.volumeInfo);
    this.title = book?.volumeInfo?.title || 'no title available';
    this.description = book?.volumeInfo?.description || 'no description available';
    this.image = book?.volumeInfo?.imageLinks?.thumbnail || 'https://bie.ala.org.au/assets/noImage-4aa1f329a2a32717ac0528cd12feffcc.jpg';
    this.email = '';
    this.notes = '';
  }
}

module.exports = Book;