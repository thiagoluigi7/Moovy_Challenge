import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
//import USER_LOGIN_API from '../App/App';
import jsonWebTokenService from 'jsonwebtoken';

import { Button, Input } from '@material-ui/core';
import { GlobalContext } from '../../context/GlobalState'

import './Login.css';

const USER_LOGIN_API = "https://moovy-backend.herokuapp.com/auth/login";
const MOVIE_API ="https://moovy-backend.herokuapp.com/movies";
const IMDB_API = "http://www.omdbapi.com/?apikey=39c17bb5&";

function fetchMovie(id) {
    fetch(`${IMDB_API}i=${id}`, {
        method: 'GET'
    }) 
    .then ((res) => res.json())
    .then ((data) => {
        const {
            addMovieToWatchlist,
            watchlist,
        } = useContext(GlobalContext);

        console.log(data);

        addMovieToWatchlist(data);
        // var dataString = JSON.stringify(data);
        // localStorage.setItem('watchlist', dataString);
        // console.log(localStorage.getItem('watchlist'));
        // if (data.Response === 'True') {
        //     setResults(data.Search);
        // } else {
        //     setResults([]);
        // }
    });
    // localStorage.setItem('watchlist', data);
}

async function getMoviesFromDB() {
    var user = sessionStorage.getItem('user');
    var token = sessionStorage.getItem('token');
    token = JSON.parse(token);
    token = token.access_token;
    //console.log(token);
    //console.log(movie);
    fetch(`${MOVIE_API}/${user}`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        }})
         .then((res) => res.json())
         .then((data) => {
             data.map((data) => (
                 fetchMovie(data)
             ))
            //  localStorage.setItem('watchlist', data);
         })
}

async function loginUser(credentials) {

    // @ts-ignore
    return fetch(USER_LOGIN_API, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials)
    })
     .then(data => data.json());

}

// @ts-ignore
export default function Login({ setToken }) {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [alert, setAlert] = useState(false);

    const handleLoginSubmit = async (e) => {
        e.preventDefault();
        const token = await loginUser({
            // @ts-ignore
            email, password
        });
        if (token.statusCode == 401) {
            //console.log(token);
            setAlert(true);
        } else {
            setToken(token);
            // @ts-ignore
            // console.log(token.access_token);
            // console.log(jsonWebTokenService.decode(token.access_token));
            var user = jsonWebTokenService.decode(token.access_token).sub;
            // console.log(user);
            if (user != null) {
            sessionStorage.setItem('user', user);
            // await getMoviesFromDB();
            //console.log(token);
            } else {
                console.log('User null');
            }
        }

    }

    return (

        <div className="login-wrapper">
            <h1>Log in</h1>
            <form onSubmit={handleLoginSubmit}>
                <label>
                    <p>email</p>
                    
                    <Input type="email" onChange={e => setEmail(e.target.value)}/>
                </label>
                <label>
                    <p>password</p>
                    
                    <Input type="password" onChange={e => setPassword(e.target.value)} />
                </label>
                <div>
                    <Button type="submit">submit</Button>
                </div>
                <div>
                    {alert && <h3> Login failed! </h3>}
                </div>
            </form>
        </div>

        
    );
}

Login.propTypes = {
    setToken: PropTypes.func.isRequired
}