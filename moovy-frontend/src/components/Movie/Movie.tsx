import React from 'react';
import IMDB_API from '../../App';

class Movie {
    name: string;
    poster: string;
    rating: number;

    constructor(name, poster, rating) {
        this.name = name;
        this.poster = poster;
        this.rating = rating;
    }

    async fetchMovie(id): Promise<Movie> {

        var movie = await fetch(IMDB_API+`i=${id}`, {
            method: 'GET',
        })
         .then(data => data.json());

         return movie;
         
    }


}
// } (movieId) => (
//     const movie = await fetchMovie(movieId),
//     <div className="movie">
//         This is a movie component
//     </div>
// );

export default Movie;