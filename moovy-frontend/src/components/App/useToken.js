import { useState } from 'react';

export default function useToken() {

    const getToken = () => {
        const tokenString = sessionStorage.getItem('token');
        if (tokenString != null) {
            const userToken = JSON.parse(tokenString);
            return userToken?.access_token
        } else {
            console.log("getToken error");
        }
        
    };

    const [token, setToken] = useState(getToken());

    const saveToken = (userToken) => {
        sessionStorage.setItem('token', JSON.stringify(userToken));
        setToken(userToken.access_token);
    };

    return {
        setToken: saveToken,
        token
    }
}