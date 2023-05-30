import router from '@/router'

import {baseApi} from './api';
const module = '/carrusel'

export const getCarrusel = async( params ) => {
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

export const findCarrusel = async( id ) => {
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

export const newCarrusel = async( data ) => {
    let formData = new FormData();

    Object.keys( data ).forEach( key => {
        formData.append( key, data[key] )
    })
    
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

export const updateCarrusel = async( data ) => {
    let formData = new FormData();

    Object.keys( data ).forEach( key => {
        formData.append( key, data[key] )
    })
    
    formData.append('_method', 'PUT')

    return await baseApi.post(module + '/update/' + data.id, formData)
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

export const removeCarrusel = async( ids ) => {
    return await baseApi.post(module + '/delete', {ids})
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