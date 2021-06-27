import axios from "axios";

const authClient = axios.create({
    baseURL: process.env.REACT_APP_API_URL + 'api/vendor/',
})

authClient.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('_token');
        if (token) {
            config.headers.authorization = `Bearer ${token}`;
        }
        config.headers["acccept"] = "application/json";
        config.headers["content-type"] = "application/json";
        config.headers["Access-Control-Allow-Origin"] = "*";
        return config;
    },
    (error) => Promise.reject(error),
);

export default authClient