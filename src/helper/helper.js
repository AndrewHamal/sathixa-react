

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

export const dataURLtoFile = (dataurl, filename) => {

    var arr = dataurl.split(','),
        mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]),
        n = bstr.length,
        u8arr = new Uint8Array(n);

    while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
    }

    return new File([u8arr], filename, { type: mime });
}

export const iOS = () => {
    return [
      'iPad Simulator',
      'iPhone Simulator',
      'iPod Simulator',
      'iPad',
      'iPhone',
      'iPod'
    ].includes(navigator.platform)
    // iPad on iOS 13 detection
    || (navigator.userAgent.includes("Mac") && "ontouchend" in document)
  }