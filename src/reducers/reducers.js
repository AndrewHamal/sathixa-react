import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    token : '',
    loaded : false,
    categories : [],
    packages : []
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
        }
    }
})


export const {packageStore, token, loaded , category} = tokenSlice.actions

export const getCategories = state => state.reducers.categories;

export const getPackage = state => state.reducers.packages;

export default tokenSlice.reducer