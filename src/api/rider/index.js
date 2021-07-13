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
