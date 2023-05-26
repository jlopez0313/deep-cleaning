import {baseApi} from './api';
import { HttpHeaders } from '@capacitor/core';

export const login = async( formData: {} ) => {

    return new Promise( async (resolve, reject) => {
        const { post } = baseApi();

        const headers: HttpHeaders = {};
        headers['Content-Type'] = 'application/json';
    
        try {
            resolve ( await post('/login', formData, headers) )
        } catch( error: any ) {
            if (error.response) {
                reject(error.response)
            } else if (error.request) {
                reject(error.request)
            } else {
                reject(error)
            }
        }    
    })
    
}
