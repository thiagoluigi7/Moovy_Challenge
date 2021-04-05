import React, { createContext, useReducer, useEffect } from 'react';
import AppReducer from './AppReducer';

const MOVIE_API ="https://moovy-backend.herokuapp.com/movies";

function addMovieToDB(movie) {
    var user = sessionStorage.getItem('user');
    var token = sessionStorage.getItem('token');
    token = JSON.parse(token);
    token = token.access_token;
    // console.log(movie);
    var movieID = movie.imdbID;
    var body = {
        userId: user,
        movieId: movieID
    }
    // console.log(body);
    fetch(MOVIE_API, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    });
    // console.log(localStorage.getItem('watchlist'));
}

function removeMovieFromDB(id) {
    var user = sessionStorage.getItem('user');
    var token = sessionStorage.getItem('token');
    token = JSON.parse(token);
    token = token.access_token;
    //console.log(movie);
    var movieID = id;
    var body = {
        userId: user,
        movieId: movieID
    }
    fetch(MOVIE_API, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    });
}

const initialState = {
    watchlist: localStorage.getItem('watchlist')
    ? JSON.parse(localStorage.getItem('watchlist'))
    : [],
};

export const GlobalContext = createContext(initialState);

export const GlobalProvider = (props) => {
    const [state, dispatch] = useReducer(AppReducer, initialState);

    useEffect(() => {
        localStorage.setItem('watchlist', JSON.stringify(state.watchlist));
    }, [state]);

    const addMovieToWatchlist = (movie) => {
        dispatch({ type: 'ADD_MOVIE_TO_WATCHLIST', payload: movie });
        addMovieToDB(movie);
    };
    
    const removeMovieFromWatchlist = (id) => {
        dispatch({ type: 'REMOVE_MOVIE_FROM_WATCHLIST', payload: id });
        removeMovieFromDB(id);
    };

    return (
        <GlobalContext.Provider
         value={{
             watchlist: state.watchlist,
             addMovieToWatchlist,
             removeMovieFromWatchlist,
         }}
        >
            {props.children}
        </GlobalContext.Provider>
    );
};

