import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    token : localStorage.getItem('_riderToken') ? true : false,
    location: [],
    packageDetail : null,
    packageAlert: null,
    user: null
}

const tokenSlice = createSlice({
    name: 'token',
    initialState,
    reducers: {
        setToken(state, action) {
            state.token = action.payload
        },

        storeUser(state, action){
            state.user = action.payload
        },

        storeVendorLocation(state, action){
            state.location = action.payload
        },

        storePackageDetail(state, action) {
            state.packageDetail = action.payload
        },

        storePackageAlert(state, action) {
            state.packageAlert = action.payload
        }
    }
})

export const { setToken, storeVendorLocation, storePackageDetail, storePackageAlert, storeUser } = tokenSlice.actions

export const isAuthRider = (state) => state.riderReducer.token

export const getUser = (state) => state.riderReducer.user

export const allVendorLocation = (state) => state.riderReducer.location

export const packageDetail = (state) => state.riderReducer.packageDetail

export const packageAlertData = (state) => state.riderReducer.packageAlert

export default tokenSlice.reducer