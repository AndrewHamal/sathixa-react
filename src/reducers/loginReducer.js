import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    error:{
        upperError: true,
        lowerError: true,
        numberError: true,
        specialCharacterError: true,
        emailErrorRegister: false,
        passwordError: false,
        eightStringError: true,
        disableSubmit: false,
        emailError : false
    }
}


const errorSlice = createSlice({
    name: 'error',
    initialState,
    reducers: {
        error(state, action) {
            state.error = action.payload
        }
    }
})

export const { error } = errorSlice.actions

export default errorSlice.reducer