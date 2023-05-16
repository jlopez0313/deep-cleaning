import { getUser } from '@/helpers/onboarding';
import { CapacitorHttp, HttpHeaders } from '@capacitor/core';

/*
import axios from "axios";

export const baseApi = axios.create({
    baseURL: import.meta.env.VITE_BASE_API
})

baseApi.interceptors.request.use((config) => {
    const user = getUser();
    config.headers.Authorization =  user ? `Bearer ${user.token}` : '';
    return config;
})

*/


export const baseApi = () => {
    
    const baseURL = import.meta.env.VITE_BASE_API;
    
    const headers = () => {
        const user = getUser();
        const Authorization =  user?.token ? `Bearer ${user.token}` : '';
        return { 
            Authorization,
        };
    }

    const get = async (url: string, customHeaders: HttpHeaders = {}) => {
        const options = {
            url: `${baseURL}${url}`,
            headers: { 
                ...headers(),
                ...customHeaders
            },
        };

        return await CapacitorHttp.get(options);
    };
    
    const post = async (url: string, formData: any, customHeaders: HttpHeaders = {}) => {
        const options = {
            url: `${baseURL}${url}`,
            headers: { 
                ...headers(),
                ...customHeaders
            },
            data: formData
        };

        return await CapacitorHttp.post( options )
    }


    const put = async (url: string, formData: any, customHeaders: HttpHeaders = {}) => {
        const options = {
            url: `${baseURL}${url}`,
            headers: { 
                ...headers(),
                ...customHeaders
            },
            data: formData
        };

        return await CapacitorHttp.put( options )
    };

    const remove = async (url: string, formData: any, customHeaders: HttpHeaders = {}) => {
        const options = {
            url: `${baseURL}${url}`,
            headers: { 
                ...headers(),
                ...customHeaders
            },
            data: formData
        };

        return await CapacitorHttp.delete( options )
    }

    return { get, post, put, remove }

}