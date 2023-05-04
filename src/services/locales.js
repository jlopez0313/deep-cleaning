import {baseApi} from './api';

const module = '/locales'

export const getAllLocales = async() => {
    return await baseApi.get( module + '/all' )
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

export const getLocales = async() => {
    return await baseApi.get( module )
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


export const findLocal = async( id ) => {
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

export const newLocal = async( formData ) => {
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

export const updateLocal = async( formData ) => {
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