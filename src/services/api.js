import axios from 'axios';
import { getUser } from '@/helpers/onboarding';

export const baseApi = axios.create({
    baseURL: import.meta.env.VITE_BASE_API
})

baseApi.interceptors.request.use((config) => {
    const user = getUser();
    config.headers.Authorization =  user ? `Bearer ${user.token}` : '';
    return config;
})