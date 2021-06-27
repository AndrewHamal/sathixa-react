import axios from "axios";

const apiClient = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    headers : {
        'accept' : 'application/json',
        'content-type' : 'application/json',
    }
});

export default apiClient;