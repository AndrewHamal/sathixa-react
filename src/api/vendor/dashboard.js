import authClient from '../../services/auth'

export function apiUser() {
    return authClient.get('/')
        .then( res => res ).catch( err => { throw err })
}

export function updateProfile(formData){
    return authClient
    .post(`update-vendor`, formData)
    .then(res => res).catch(err => { throw err })
}

export function apiCategory() {
    return authClient.get('/categories')
        .then( res => res ).catch( err => { throw err } )
}

export function logout()
{
    return authClient
    .post(`logout`)
    .then(res => res).catch(err => { throw err })

}