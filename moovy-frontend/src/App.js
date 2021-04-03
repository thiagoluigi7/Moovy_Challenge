import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import React, { useState } from 'react';

import Dashboard from './components/Dashboard/Dashboard';
import Login from './components/Login/Login';
import CreateUser from './components/CreateUser/CreateUser';

import useToken from './components/App/useToken';
import useUser from './components/App/useUser';

const USER_API = "https://localhost:3000/user";
const MOVIE_API ="https://localhost:3000/movies";
const REVIEW_API ="https://localhost:3000/review";
const IMDB_API = "http://www.omdbapi.com/?apikey=39c17bb5&";

function App() {

  const { token, setToken } = useToken();
  const { user, setUser } = useUser();

  if(!token) {
    return (
      <div className="login-wrapper">
        <Login setToken={setToken} />
        <CreateUser />
      </div>
    );

  }

  return (
    <div className="page-wrapper">
      <h1>Application</h1>
      <BrowserRouter>
        <Switch>
          <Route>
            <Dashboard setUser={setUser} />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
