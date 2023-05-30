import { baseApi } from "./api";
const { get } = baseApi();

const module = '/carrusel'

export const all = async () => {
    return new Promise( async(resolve, reject) => {
        try {
            resolve( await get( module + '/all', { "Content-type": "application/json" } ) )
        } catch( error: any ) {
            if (error.response) {
                reject(error.response.data.message)
            } else if (error.request) {
                reject(error.request)
            } else {
                reject(error.message)
            }
        }
    })
}