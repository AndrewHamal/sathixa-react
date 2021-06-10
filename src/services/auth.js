import React from 'react';
import axios from "axios";

const authClient = (token) => axios.create({
        baseURL: process.env.REACT_APP_API_URL + 'vendor/',
        headers: {
            'Accept': 'application/json',
            'content-type': 'application/json',
            'Authorization': isNaN(token) ? 'Bearer ' + localStorage.getItem('_token') : 'Bearer ' + token
        }
    })

export default authClient