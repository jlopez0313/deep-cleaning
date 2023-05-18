import {baseApi} from './api';

const module = '/roles'

export const getRoles = async() => {
    return await baseApi.get(module + '/all')
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