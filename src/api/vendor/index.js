import authClient from '../../services/auth'

export function submitPackage(data)
{
    return authClient()
        .post('package', data)
        .then(res => res ).catch(err => err.response )
}

export function getPackages()
{
    return authClient()
        .get('package')
        .then(res => res ).catch(err => err.response )
}