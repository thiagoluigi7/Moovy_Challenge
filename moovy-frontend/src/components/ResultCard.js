import React, { useContext } from 'react';
import Moment from 'react-moment';
import { GlobalContext } from '../context/GlobalState';

export const ResultCard = ({ movie }) => {
    const {
        addMovieToWatchlist,
        watchlist,
    } = useContext(GlobalContext);

    let storedMovie = watchlist.find((o) => o.imdbID === movie.imdbID);

    const watchlistDisabled = storedMovie
     ? true
     : false;

    return (
        <div className='result-card'>
            <div className='poster-wrapper'>
                {movie.Poster ? (
                    <img
                     src={movie.Poster}
                     alt={`${movie.Title} Poster`}
                    />
                ) : (
                    <div className='filler-poster' />
                )}
            </div>

            <div className='info'>
                <div className='header'>
                    <h3 className='title'>{movie.Title}</h3>
                    <h4 className='release-date'>
                        <Moment format='YYYY'>{movie.Year}</Moment>
                    </h4>
                </div>

                <div className='controls'>
                    <button
                     className='btn'
                     disabled={watchlistDisabled}
                     onClick={() => addMovieToWatchlist(movie)}
                    >
                        Add to My Library
                    </button>
                </div>
            </div>
        </div>
    );
};