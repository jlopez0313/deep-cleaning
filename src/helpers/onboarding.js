export const setUser = ( user ) => {
    return localStorage.setItem('onboarding', JSON.stringify( user ))
}

export const getUser = () => {
    return JSON.parse(localStorage.getItem('onboarding'))
}