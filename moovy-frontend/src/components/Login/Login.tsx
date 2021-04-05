import React, { useState } from 'react';
import PropTypes from 'prop-types';
import USER_LOGIN_API from '../App/App';
import jsonWebTokenService from 'jsonwebtoken';

import { Button, Input } from '@material-ui/core';

import './Login.css';

async function loginUser(credentials: { email: string; password: string; }) {

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

    const handleLoginSubmit = async (e: { preventDefault: () => void; }) => {
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
            var user = jsonWebTokenService.decode(token).subject;
            if (user != null) {
            sessionStorage.setItem('user', user);
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
                    {/* @ts-ignore */}
                    <Input type="email" onChange={e => setEmail(e.target.value)}/>
                </label>
                <label>
                    <p>password</p>
                    {/* @ts-ignore */}
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