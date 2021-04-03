import React, { useEffect, useState } from 'react';
import Movie from '../Movie/Movie';
import App from '../../App';
import MOVIE_API from '../../App';
import REVIEW_API from '../../App';
import IMDB_API from '../../App';
import USER_API from '../../App';

function Logout() {
    sessionStorage.clear();
    window.location.href = '/';
}

async function fetchUser(id, token) {

    return fetch(USER_API+'/'+id, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
     .then(data => data.json());

}

export default function Dashboard({ setUser }) {
    const [ movies, setMovies ] = useState([]);
    const token = sessionStorage.getItem('token');
    const decoded = jwt.verify(token, "Secret");
    const handleUserFetch = async e => {
        e.preventDefault();
        const user = await fetchUser({
            decoded.id,
            token
        });

    }

    return (
        <div>
            <div>
                <button onClick={Logout}>Logout</button>
            </div>
            <div>
                <h2>Dashboard</h2>
                {user.movies.map((movie) => (
                <Movie />
                ))}
            </div>
        </div>

    );
}