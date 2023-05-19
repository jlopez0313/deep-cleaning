import router from '@/router'

import {baseApi} from './api';
const module = '/categorias'

export const getAllCategories = async() => {
    return await baseApi.get( module + '/all' )
    .catch((error) => {
        if( error.response.status == 401 ) {
            router.push('/login');
            throw new Error('No autenticado.')
        } else if (error.response) {
            throw new Error(error.response.data.message)
        } else if (error.request) {
            throw new Error(error.request)
        } else {
            throw new Error(error.message)
        }
    })
}

export const getCategorias = async(params) => {
    const queryParams = new URLSearchParams(params).toString();

    return await baseApi.get( module + '?' + queryParams )
    .catch((error) => {
        if( error.response.status == 401 ) {
            router.push('/login');
            throw new Error('No autenticado.')
        } else if (error.response) {
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
        if( error.response.status == 401 ) {
            router.push('/login');
            throw new Error('No autenticado.')
        } else if (error.response) {
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
        if( error.response.status == 401 ) {
            router.push('/login');
            throw new Error('No autenticado.')
        } else if (error.response) {
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
        if( error.response.status == 401 ) {
            router.push('/login'); 
            throw new Error('No autenticado.')
        } else if (error.response) {
            throw new Error(error.response.data.message)
        } else if (error.request) {
            throw new Error(error.request)
        } else {
            throw new Error(error.message)
        }
    })
}

export const removeCategoria = async( id ) => {
    return await baseApi.delete(module + '/' + id)
    .catch((error) => {
        if( error.response.status == 401 ) {
            router.push('/login');
            throw new Error('No autenticado.')
        } else if (error.response) {
            throw new Error(error.response.data.message)
        } else if (error.request) {
            throw new Error(error.request)
        } else {
            throw new Error(error.message)
        }
    })
}