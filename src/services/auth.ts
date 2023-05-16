import {baseApi} from './api';
import { HttpHeaders } from '@capacitor/core';

export const login = async( formData: {} ) => {
    const { post } = baseApi();

    const headers: HttpHeaders = {};
    headers['Content-Type'] = 'application/json';

    return await post('/login', formData, headers)
    .catch((error) => {
        console.log( 'wrong:', error );

        if (error.response) {
            throw new Error(error.response.data.message)
        } else if (error.request) {
            throw new Error(error.request)
        } else {
            throw new Error(error.message)
        }
    })
}