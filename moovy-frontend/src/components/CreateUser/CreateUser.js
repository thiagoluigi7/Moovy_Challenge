import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './CreateUser.css';

const USER_API = "https://localhost:3000/user";

async function createUser(credentials) {

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

    const handleSubmit = async e => {
        e.preventDefault();
        const user = await createUser({
            email,
            password,
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
                    <input type="email" onChange={e => setEmail(e.target.value)}/>
                </label>
                <label>
                    <p>password</p>
                    <input type="password" onChange={e => setPassword(e.target.value)} />
                </label>
                <label>
                    <p>name</p>
                    <input type="text" onChange={e => setName(e.target.value)} />
                </label>
                <div>
                    <button type="submit">submit</button>
                </div>
                <div>
                    {notCreatedAlert && <h3> Creation failed! </h3>}
                    {createdAlert && <h3> Created successfull! </h3>}
                </div>
            </form>
        </div>
        
    );
}

// CreateUser.propTypes = {
//     setToken: PropTypes.func.isRequired
// }