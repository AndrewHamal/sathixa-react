import apiClient from "@/services/api";

export function apiLogin(data) {
    return apiClient.get('sanctum/csrf-cookie')
        .then(response => {
            return apiClient.post('api/vendor/login', data)
                .then(response => response.data)
                .catch(err => { throw err.response })
        })
}

export function apiGoogleRedirect(){
    return apiClient.get('api/vendor/redirect')
        .then(response => response).catch(err => { throw err.response })
}

export function apiGoogleCallback(token){
    return apiClient.get('api/vendor/callback?access_token=' + token)
        .then(response => response).catch(err => { throw err.response })
}