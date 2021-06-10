import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    location : {}
}

const locationSlicer = createSlice({
    name : 'location',
    initialState,
    reducers : {
        location(state, action) {
            state.location = action.payload
        }
    }
})

export const { location } = locationSlicer.actions
export const getLocation = state => state.locateReducer.location

export default locationSlicer.reducer