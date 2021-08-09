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
        .then(res => res).catch(err => { throw err.response } )
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

export function getChat(id) 
{
    return authClient
    .get(`chat/${id}`)
    .then(res => res ).catch(err => { throw err.response })
}

export function storeChat(formData) 
{
    return authClient
    .post(`chat`, formData)
    .then(res => res ).catch(err => { throw err.response })
}

export function storeTicket(formData) 
{
    return authClient
    .post(`ticket`, formData)
    .then(res => res ).catch(err => { throw err.response })
}


export function getTicket(type) 
{
    return authClient
    .get(`ticket?type=${type}`)
    .then(res => res ).catch(err => { throw err.response })
}

export function removePan($id)
{
    return authClient
    .post(`pan/destroy/${$id}`)
    .then(res => res).catch(err => { throw err })

}

export function removeId($id)
{
    return authClient
    .post(`id-proof/destroy/${$id}`)
    .then(res => res).catch(err => { throw err })

}

export function removeTax($id)
{
    return authClient
    .post(`tax/destroy/${$id}`)
    .then(res => res).catch(err => { throw err })

}

export function ticket($id)
{
    return authClient
    .get(`ticket/${$id}`)
    .then(res => res).catch(err => { throw err })

}

export function ticketChat($id)
{
    return authClient
    .get(`ticket-chat/${$id}`)
    .then(res => res).catch(err => { throw err })

}

export function storeChatVendor(id, formData)
{
    return authClient
    .post(`ticket-chat/${id}`, formData)
    .then(res => res).catch(err => { throw err })

}

export function countInbox()
{
    return authClient
    .get(`count-vendor-inbox`)
    .then(res => res).catch(err => { throw err })

}

export function seenChat(id)
{
    return authClient
    .get(`seen-chat/${id}`)
    .then(res => res).catch(err => { throw err })

}













