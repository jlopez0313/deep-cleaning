import {baseApi} from './api';

const module = '/categorias'

export const getCategorias = async() => {
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


export const findCategoria = async( id ) => {
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

export const newCategoria = async( formData ) => {
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

export const updateCategoria = async( formData ) => {
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