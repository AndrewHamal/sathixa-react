import authClient from "@/services/rider/auth";
import axios from "axios";

export function profile(){
    return authClient.get('riders')
    .then(res => res)
    .catch(err => {throw err})
}

export function storeRiderLocation(lat, long, heading, package_id)
{
    return authClient.post('/tracking', {
        lat : lat,
        long : long,
        heading : heading,
        package_id : package_id 
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

export function onGoingPackage(page) {
    return authClient.get('ongoing?page='+ page)
    .then(res => res)
    .catch(err => { throw err })
}

export function historyPackage(page) {
    return authClient.get('history?page='+ page)
    .then(res => res)
    .catch(err => { throw err })
}

export function canceledPackage(page) {
    return authClient.get('canceled?page='+ page)
    .then(res => res)
    .catch(err => { throw err })
}

export function getPrackageDetail(id)
{
    return authClient.get('package/'+id)
    .then(res => res)
    .catch(err => {throw err})
}

export function savePackageSignature(formData)
{
    return authClient.post('upload_receipt', formData)
    .then(res => res)
    .catch(err => {throw err})
}

export function updateRiderStatus(id, formData)
{    
    return authClient.post('package-status/'+ id, formData)
    .then(res => res)
    .catch(err => {throw err})
}

export function getCancelReason()
{
    return authClient.get('cancel_reason')
    .then(res => res)
    .catch(err => {throw err})
}

export function saveCancelReason(formData)
{
    return authClient.post('cancel_reason', formData)
    .then(res => res)
    .catch(err => {throw err})
}

export function getChatRider(id) 
{
    return authClient
    .get(`chat/${id}`)
    .then(res => res ).catch(err => { throw err.response })
}

export function storeChatRider(formData) 
{
    return authClient
    .post(`chat`, formData)
    .then(res => res ).catch(err => { throw err.response })
}

export function updateProfile($id, formData)
{
    return authClient
    .post(`riders/${$id}`, formData)
    .then(res => res).catch(err => { throw err })

}

export function removeLicense($id)
{
    return authClient
    .post(`license/destroy/${$id}`)
    .then(res => res).catch(err => { throw err })

}

export function removeID($id)
{
    return authClient
    .post(`photo-proof/destroy/${$id}`)
    .then(res => res).catch(err => { throw err })

}

export function removeInsurance($id)
{
    return authClient
    .post(`insurance/destroy/${$id}`)
    .then(res => res).catch(err => { throw err })

}

export function logout($id)
{
    return authClient
    .post(`logout`)
    .then(res => res).catch(err => { throw err })

}

export function seenChatRider(id)
{
    return authClient
    .get(`seen-chat/${id}`)
    .then(res => res).catch(err => { throw err })

}

