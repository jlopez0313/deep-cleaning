import router from '@/router'

import {baseApi} from './api';
const module = '/visitas'

export const getVisitas = async( formData, params ) => {
    const queryParams = new URLSearchParams(params).toString();

    return await baseApi.get( module + '/' + formData.usuarios_id + '?' + queryParams )
    .catch((error) => {
        if( error.response.status == 401 ) {
            router.push('/login')
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


export const findVisita = async( id ) => {
    return await baseApi.get(module + '/show/' + id)
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

export const newVisita = async( formData ) => {
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

export const updateVisita = async( formData ) => {
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

export const removeVisita = async( id ) => {
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
