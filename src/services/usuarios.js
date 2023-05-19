import router from '@/router'

import {baseApi} from './api';
const module = '/users'

export const allUsers = async() => {
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

export const getUsuarios = async( params ) => {
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

export const allByRol = async( roles ) => {
    return await baseApi.post(module + '/byRol', {roles: roles} )
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

export const findUser = async( id ) => {
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

export const newUser = async( formData ) => {
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

export const updateUser = async( data ) => {
    let formData = new FormData();

    Object.keys( data ).forEach( key => {
        formData.append( key, data[key] )
    })
    
    formData.append('_method', 'PUT')

    return await baseApi.post(module + '/' + data.id, formData)
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

export const removeUser = async( id ) => {
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