import React, { useState } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Header } from '../Header';
import { Watchlist } from '../Watchlist';
import { Add } from "../Add";
import  Login from '../Login/Login';
import  CreateUser from '../CreateUser/CreateUser';

import useToken from './useToken';
import { GlobalProvider } from '../../context/GlobalState';

import "../../lib/font-awesome/css/all.min.css";
import './App.css';

const USER_LOGIN_API = "https://moovy-backend.herokuapp.com/auth/login";
const USER_API = "https://moovy-backend.herokuapp.com/user";
const MOVIE_API ="https://moovy-backend.herokuapp.com/movies";
const REVIEW_API ="https://moovy-backend.herokuapp.com/review";
const IMDB_API = "http://www.omdbapi.com/?apikey=39c17bb5&";

function App() {

  const { token, setToken } = useToken();

  if(!token) {
    return (
      <div className="login-wrapper">
        <Login setToken={setToken} />
        <CreateUser />
      </div>
    );

  }

  return (
    <GlobalProvider>
      <div className="page-wrapper">
        <h1>Application</h1>
        <BrowserRouter>
          <Header />

          <Switch>
            <Route exact path='/'>
              <Watchlist />
            </Route>
            <Route path="/add">
              <Add />
            </Route>
          </Switch>
        </BrowserRouter>
      </div>
    </GlobalProvider>
  );
}

export default App;
