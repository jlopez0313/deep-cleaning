import { baseApi } from "./api";
import { getUser } from '@/helpers/onboarding';

const module = '/visitas'

export const myJob = async () => {
    const {user} = getUser();
    const { get } = baseApi();

    return await get( module + '/para-hoy/' + 'attended_by/' + user?.id )
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

export const findVisita = async( id: number ) => {
    const { get } = baseApi();

    return await get(module + '/show/' + id)
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