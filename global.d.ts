declare namespace Movie {
  export interface Short {
    Title: string; // 'As Above, So Below';
    Year: string; // '2014';
    Poster: string; // 'https://m.media-amazon.com/images/M/MV5BMTQzNzg0NDI2MF5BMl5BanBnXkFtZTgwMzgxNzY2MTE@._V1_SX300.jpg';
    imdbID: string; // 'tt2870612';
  }

  export interface Full extends Short {
    Rated: string; // 'R';
    Released: string; // '29 Aug 2014';
    Runtime: string; // '93 min';
    Genre: string; // 'Horror, Mystery, Thriller';
    Director: string; // 'John Erick Dowdle';
    Writer: string; // 'John Erick Dowdle, Drew Dowdle';
    Actors: string; // 'Perdita Weeks, Ben Feldman, Edwin Hodge';

    Plot: string; // 'Miles of twisting catacombs lie beneath the streets of Paris, the eternal home to countless souls. When a team of explorers ventures into the uncharted maze of bones, they uncover the dark secret that lies within this city of the dead. A journey into madness and terror, As Above, So Below reaches deep into the human psyche to reveal the personal demons that come back to haunt us all.';

    Language: string; // 'English, French, Latin, Persian';
    Country: string; // 'United States, France';
    Awards: string; // '1 win & 6 nominations';

    Ratings: { Source: string; Value: string }[];
    // Ratings: [
    //   { Source: 'Internet Movie Database'; Value: '6.2/10' },
    //   { Source: 'Rotten Tomatoes'; Value: '28%' },
    //   { Source: 'Metacritic'; Value: '39/100' },
    // ];

    Metascore: string; // '39';
    imdbRating: string; // '6.2';
    imdbVotes: string; // '108,854';
    Type: string; // 'movie';
    DVD: string; // '18 Nov 2014';
    BoxOffice: string; // '$21,321,100';
    Production: string; // 'N/A';
    Website: string; // 'N/A';
    Response: string; // 'True';
  }
}
