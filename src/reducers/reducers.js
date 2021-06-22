import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    token : '',
    loaded : false,
    categories : [],
    packages : [],
    locations : [],
    user : []
}

const tokenSlice = createSlice({
    name: 'token',
    initialState,
    reducers: {
        token(state, action) {
            const token = action.payload
            state.token = token
        },
        loaded(state, action) {
            state.loaded = action.payload
        },
        category(state, action) {
            state.categories = action.payload
        },
        packageStore(state, action) {
            state.packages = action.payload
        },

        locationStoreVendor(state, action) {
            state.locations = action.payload
        },

        userStore(state, action) {
            state.user = action.payload
        }
    }
})


export const { packageStore, token, loaded , category, locationStoreVendor, userStore } = tokenSlice.actions

export const getCategories = state => state.reducers.categories;

export const getPackage = state => state.reducers.packages;

export const getLocationsVendor = state => state.reducers.locations;

export const getUser = state => state.reducers.user;

export default tokenSlice.reducer