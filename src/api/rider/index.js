import authClient from "@/services/rider/auth";

export function storeRiderLocation(lat, long)
{
    return authClient.post('/tracking', {
        lat : lat,
        long : long
    })
    .then(res => res)
    .catch(err => { throw err })
}

export function getAllVendorLocation()
{
    return authClient.get('allVendorLocation')
    .then(res => res)
    .catch(err => { throw err })
}

export function acceptPackage(id)
{
    return authClient.get(`accept_package/${id}`)
    .then(res => res)
    .catch(err => { throw err })
}

export function onGoingPackage() {
    return authClient.get('ongoing')
    .then(res => res)
    .catch(err => { throw err })
}

export function historyPackage() {
    return authClient.get('history')
    .then(res => res)
    .catch(err => { throw err })
}