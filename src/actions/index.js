export const signIn = () => {
    return {
        type: 'SIGN_IN'
    }
}

export const signOut = () => {
    return {
        type: 'SIGN_OUT'
    }
}

export const setDisplayMobile = () => {
    return {
        type: 'MOBILE'
    }
}

export const setDisplayDesktop = () => {
    return {
        type: 'DESKTOP'
    }
}

export const setUserInfo = (data) => {
    return {
        type: "SET_USER_INFO",
        data: data
    }
}