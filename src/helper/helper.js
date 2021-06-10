

import authClient from "../services/auth";

export const hasUpper = (str) => {
    return /[A-Z]/.test(str)
}

export const hasLower = (str) => {
    return /[a-z]/.test(str)
}

export const hasString = (str) => {
    return /[a-zA-Z]/.test(str)
}

export const hasNumber = (str) => {
    return /[0-9]/.test(str)
}

export const hasSpecialCharacter = (str) => {
    return /[@$!%*#?&]/.test(str)
}

export const hasEightString = (str) => {
    return /[a-zA-Z0-9]{8,}/.test(str)
}

export const isValidated = (str) => {
    return /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z])(?=.*[@$!%*#?&])/.test(str)
}

export const errorParse = (res) => {
    return res.data.errors;
}