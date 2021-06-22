import authClient from '../../services/auth'

export function submitPackage(data)
{
    return authClient()
        .post('package', data)
        .then(res => res ).catch(err => err.response )
}

export function getPackages(search, page)
{
    return authClient()
        .get(`package?type=&page=${page}&search=${search}`)
        .then(res => res ).catch(err => err.response )
}

export function getLocations()
{
    return authClient()
        .get('location')
        .then(res => res ).catch(err => err.response )
}

export function storeLocation(data)
{
    console.log(data)

    return authClient()
        .post('location', data)
        .then(res => res ).catch(err => err.response)
}