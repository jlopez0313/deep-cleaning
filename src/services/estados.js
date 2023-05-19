import router from '@/router'

import {baseApi} from './api';
const module = '/estados'

export const getEstados = async() => {
    return await baseApi.get(module + '/all')
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