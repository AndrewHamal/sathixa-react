import axios from "axios";

const authClient = axios.create({
    baseURL: process.env.REACT_APP_API_URL + 'api/rider/',
})

authClient.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('_riderToken');
        if (token) {
            config.headers.authorization = `Bearer ${token}`;
        }
        config.headers["acccept"] = "application/json";
        config.headers["content-type"] = "application/json";
        config.headers["Access-Control-Allow-Origin"] = "*";
        config.headers["Access-Control-Allow-Methods"] = ["DELETE, POST, GET, OPTIONS"]
        config.headers["Access-Control-Allow-Headers"] = ["Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With"]
        return config;
    },
    (error) => Promise.reject(error),
);

export default authClient