import React, { useEffect, useState } from 'react';
import App from '../App/App';
import MOVIE_API from '../App/App';
import REVIEW_API from '../App/App';
import IMDB_API from '../App/App';
import USER_API from '../App/App';
import jsonWebTokenService from 'jsonwebtoken';

function Logout() {
    sessionStorage.clear();
    window.location.href = '/';
}

async function fetchUser(id: string, token: string) {

    return fetch(USER_API+'/'+id, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
     .then(data => data.json());

}

export default function Dashboard() {

    const userId = sessionStorage.getItem('user');
    const token = sessionStorage.getItem('token');
    if (userId != null && token != null) {
        const handleUserFetch = async (e: { preventDefault: () => void; }) => {
            // e.preventDefault();
            var user = await fetchUser(userId, token);

            console.log(user);

            return (
                <div>
                    <div>
                        <button onClick={Logout}>Logout</button>
                    </div>
                    <div>
                        <h2>Dashboard</h2>
                        {user.movies.map((movie: Movie) => (
                            <Movie />
                        ))}
                    </div>
                </div>
        
            );

        }


    } else {
        <div> Error </div>
    }

    // return (
    //     <div>
    //         <div>
    //             <button onClick={Logout}>Logout</button>
    //         </div>
    //         <div>
    //             <h2>Dashboard</h2>
    //             {user.movies.map((movie) => (
    //             <Movie />
    //             ))}
    //         </div>
    //     </div>

    // );
}