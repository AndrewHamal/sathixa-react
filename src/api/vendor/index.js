import authClient from '../../services/auth'

export function submitPackage(data)
{
    return authClient
        .post('package', data)
        .then(res => res ).catch(err => { throw err.response} )
}

export function getPackages(search, page, type)
{
    return authClient
        .get(`package?page=${page}&search=${search}&type=${type}`)
        .then(res => res ).catch(err => { throw err.response } )
}

export function getLocations()
{
    return authClient
        .get('location')
        .then(res => res ).catch(err => { throw err.response } )
}

export function storeLocation(data)
{
       return authClient
        .post('location', data)
        .then(res => res ).catch(err => { throw err.response })
}

export function getPackage(id) 
{
    return authClient
    .get(`package/${id}`)
    .then(res => res ).catch(err => { throw err.response })
}