import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    token : localStorage.getItem('_riderToken') ? true : false,
    location: []
}

const tokenSlice = createSlice({
    name: 'token',
    initialState,
    reducers: {
        setToken(state, action) {
            state.token = action.payload
        },

        storeVendorLocation(state, action){
            state.location = action.payload
        }
    }
})

export const { setToken, storeVendorLocation } = tokenSlice.actions

export const isAuthRider = (state) => state.riderReducer.token

export const allVendorLocation = (state) => state.riderReducer.location

export default tokenSlice.reducer