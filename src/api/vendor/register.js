import apiClient from "@/services/api";
import authClient from "@/services/auth";
import axios from "axios";

export const apiRegister = (data) => {
    return apiClient.post('api/vendor/register', data)
        .then(response => {
            return response
        })
        .catch(err => {
            throw err.response
        })
}

export const apiLocation = (lat, long) => {
    return axios.get(`https://us1.locationiq.com/v1/reverse.php?key=pk.8a348dfdf4b7531ca40b1d79c129f995&lat=${lat}&lon=${long}&format=json`)
        .then( res => {
            return res
        })
}

export const apiLocationUpdate = (res) => {
    return authClient.post('/update-vendor-location',res)
        .then(res => {
            return res
    })
}