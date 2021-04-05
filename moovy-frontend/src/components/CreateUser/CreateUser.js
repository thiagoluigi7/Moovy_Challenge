import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './CreateUser.css';
// import USER_API from '../App/App';

import { Button, Input } from '@material-ui/core';

const USER_API = "https://moovy-backend.herokuapp.com/user";

async function createUser(credentials) {

    // @ts-ignore
    return fetch(USER_API, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials)
    })

}

export default function CreateUser() {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [name, setName] = useState();
    const [createdAlert, setCreatedAlert] = useState(false);
    const [notCreatedAlert, setNotCreatedAlert] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const user = await createUser({
            // @ts-ignore
            email,
            // @ts-ignore
            password,
            // @ts-ignore
            name
        })
        if(user) {
            setCreatedAlert(true);
        } else {
            setNotCreatedAlert(true);
        }

    }

    return (

        <div className="login-wrapper">
            <h1>Create User</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    <p>email</p>
                    
                    <Input type="email" onChange={e => setEmail(e.target.value)}/>
                </label>
                <label>
                    <p>password</p>
                    
                    <Input type="password" onChange={e => setPassword(e.target.value)} />
                </label>
                <label>
                    <p>name</p>
                    
                    <Input type="text" onChange={e => setName(e.target.value)} />
                </label>
                <div>
                    <Button type="submit">submit</Button>
                </div>
                <div>
                    {notCreatedAlert && <h3> Creation failed! </h3>}
                    {createdAlert && <h3> Created successfull! Now please log in </h3>}
                </div>
            </form>
        </div>
        
    );
}

// CreateUser.propTypes = {
//     setToken: PropTypes.func.isRequired
// }