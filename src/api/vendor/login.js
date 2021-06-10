import apiClient from "../../services/api";

export function apiLogin(data) {
    return apiClient.get('sanctum/csrf-cookie')
        .then(response => {
            return apiClient.post('vendor/login', data)
                .then(response => response)
                .catch(err => err.response)
        })
}

export function apiGoogleRedirect(){
    return apiClient.get('vendor/redirect')
        .then(response => response).catch(err => err.response)
}

export function apiGoogleCallback(token){
    return apiClient.get('vendor/callback?access_token=' + token)
        .then(response => response).catch(err => err.response)
}