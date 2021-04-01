import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './Login.css';

const USER_LOGIN_API = "localhost:3000/auth/login";

async function loginUser(credentials) {

    return fetch(USER_LOGIN_API, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials)
    })
     .then(data => data.json());

}

export default function Login({ setToken }) {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [alert, setAlert] = useState(false);

    const handleLoginSubmit = async e => {
        e.preventDefault();
        const token = await loginUser({
            email,
            password
        });
        if (token.statusCode == 401) {
            //console.log(token);
            setAlert(true);
        } else {
            setToken(token);
            //console.log(token);
        }

    }

    return (

        <div className="login-wrapper">
            <h1>Log in</h1>
            <form onSubmit={handleLoginSubmit}>
                <label>
                    <p>email</p>
                    <input type="email" onChange={e => setEmail(e.target.value)}/>
                </label>
                <label>
                    <p>password</p>
                    <input type="password" onChange={e => setPassword(e.target.value)} />
                </label>
                <div>
                    <button type="submit">submit</button>
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