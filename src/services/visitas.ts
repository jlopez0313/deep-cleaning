import { baseApi } from "./api";
import { getUser } from '@/helpers/onboarding';

const module = '/visitas'

export const myJob = async () => {
    const {user} = getUser();
    const { get } = baseApi();

    return new Promise( async(resolve, reject) => {
        try {
            resolve( await get( module + '/para-hoy/' + 'attended_by/' + user?.id ) )
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

export const findVisita = async( id: number ) => {
    const { get } = baseApi();

    return new Promise( async(resolve, reject) => {
        try {
            resolve( await get(module + '/show/' + id) )
        } catch( error: any ) {
            if (error.response) {
                reject(error.response.data.message)
            } else if (error.request) {
                reject(error.request)
            } else {
                reject(error.message)
            }
        }
    });
}

export const finishVisita = async (data: any) => {
    const { post } = baseApi();

    const tmpData = {...data, checklist:[...data.checklist]}

    tmpData.checklist = tmpData.checklist.map( (item: any) => {
        return {
            ...item,
            evidencia: blobToFile ( item.evidencia )
        }
    })

    let formData = new FormData();
    
    Object.keys(tmpData).forEach(key => {
        if ( key === 'checklist' ) {
            for (const file of tmpData[key]) {
                formData.append('evidencia[]', file.evidencia) // appending every file to formdata
            }
        } else {
            formData.append( key, tmpData[key] )
        }
    });

    formData.set('checklist', JSON.stringify( tmpData.checklist ) )

    return new Promise( async(resolve, reject) => {
        try {
            resolve( await post(module + '/finalizar/' + tmpData.id, formData, { "Content-type": "multipart/form-data" }) )
        } catch( error: any ) {
            if (error.response) {
                reject(error.response.data.message)
            } else if (error.request) {
                reject(error.request)
            } else {
                reject(error.message)
            }
        }
    });
}


export const blobToFile = ( dataUrl: any ) => {
    // return new File([theBlob], 'fileName.jpeg', { lastModified: new Date().getTime(), type: 'image/jpeg' })
    let arr = dataUrl.split(','),
    mime = arr[0].match(/:(.*?);/)[1],
    bstr = atob(arr[arr.length - 1]), 
    n = bstr.length, 
    u8arr = new Uint8Array(n);
    
    while( n-- ) {
        u8arr[n] = bstr.charCodeAt(n);
    }

    return new File([u8arr], 'fileName.jpeg', {type:mime});
}