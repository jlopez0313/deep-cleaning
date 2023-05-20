import {baseApi} from './api';
import { HttpHeaders } from '@capacitor/core';

export const login = async( formData: {} ) => {
    const { post } = baseApi();

    const headers: HttpHeaders = {};
    headers['Content-Type'] = 'application/json';

    try {
        return await post('/login', formData, headers)
    } catch( error: any ) {
        if (error.response) {
            Promise.reject(error.response.data.message)
        } else if (error.request) {
            Promise.reject(error.request)
        } else {
            Promise.reject(error.message)
        }
    }
}
