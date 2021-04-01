import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import React, { useState } from 'react';

import Dashboard from './components/Dashboard/Dashboard';
import Login from './components/Login/Login';
import CreateUser from './components/CreateUser/CreateUser';

import useToken from './components/App/useToken';

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
    <div className="page-wrapper">
      <h1>Application</h1>
      <BrowserRouter>
        <Switch>
          <Route>
            <Dashboard />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
