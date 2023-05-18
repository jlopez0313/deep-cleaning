import {baseApi} from './api';

export const login = async( formData ) => {
    return await baseApi.post('/login', formData)
    .catch((error) => {
        if( error.response.status == 401 ) {
            throw new Error('error.response.data.message')
        } else if (error.response) {
            throw new Error(error.response.data.message)
        } else if (error.request) {
            throw new Error(error.request)
        } else {
            throw new Error(error.message)
        }
    })
}