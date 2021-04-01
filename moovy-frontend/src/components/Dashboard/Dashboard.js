import React from 'react';
import Movie from '../Movie/Movie';
import App from '../../App';

// const MOVIE_API ="https://localhost:3000/movies";
// const REVIEW_API ="https://localhost:3000/review";
// const IMDB_API = "http://www.omdbapi.com/?apikey=39c17bb5&";

function Logout() {
    sessionStorage.clear();
    window.location.href = '/';
}

export default function Dashboard() {
    const movies = ['1', '2', '3'];
    return (
        <div>
            <div>
                <button onClick={Logout}>Logout</button>
            </div>
            <div>
                <h2>Dashboard</h2>
                {movies.map((movie) => (
                <Movie />
                ))}
            </div>
        </div>

    );
}