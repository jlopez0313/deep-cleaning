import {baseApi} from './api';

const module = '/users'

export const getUsuarios = async( params ) => {
    const queryParams = new URLSearchParams(params).toString();
    
    return await baseApi.get( module + '?' + queryParams )
    .catch((error) => {
        if (error.response) {
            throw new Error(error.response.data.message)
        } else if (error.request) {
            throw new Error(error.request)
        } else {
            throw new Error(error.message)
        }
    })
}

export const allByRol = async( rol ) => {
    return await baseApi.get(module + '/byRol/' + rol)
    .catch((error) => {
        if (error.response) {
            throw new Error(error.response.data.message)
        } else if (error.request) {
            throw new Error(error.request)
        } else {
            throw new Error(error.message)
        }
    })
}

export const findUser = async( id ) => {
    return await baseApi.get(module + '/' + id)
    .catch((error) => {
        if (error.response) {
            throw new Error(error.response.data.message)
        } else if (error.request) {
            throw new Error(error.request)
        } else {
            throw new Error(error.message)
        }
    })
}

export const newUser = async( formData ) => {
    return await baseApi.post(module, formData)
    .catch((error) => {
        if (error.response) {
            throw new Error(error.response.data.message)
        } else if (error.request) {
            throw new Error(error.request)
        } else {
            throw new Error(error.message)
        }
    })
}

export const updateUser = async( formData ) => {
    return await baseApi.put(module + '/' + formData.id, formData)
    .catch((error) => {
        if (error.response) {
            throw new Error(error.response.data.message)
        } else if (error.request) {
            throw new Error(error.request)
        } else {
            throw new Error(error.message)
        }
    })
}