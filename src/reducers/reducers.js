import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    token : localStorage.getItem('_token') ? true : false,
    loaded : false,
    categories : [],
    packages : [],
    locations : [],
    user : [],
    packageForm:[]
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
        },
        
        storePackageForm(state, action) {
            state.packageForm = action.payload
        },
    }
})


export const { packageStore, token, loaded , category, locationStoreVendor, userStore, storePackageForm } = tokenSlice.actions

export const vendorAuth = state => state.reducers.token

export const getCategories = state => state.reducers.categories;

export const getPackage = state => state.reducers.packages;

export const getLocationsVendor = state => state.reducers.locations;

export const getUser = state => state.reducers.user;

export const getPackageForm = state => state.reducers.packageForm;

export default tokenSlice.reducer