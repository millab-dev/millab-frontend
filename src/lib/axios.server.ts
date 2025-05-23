import axios, { AxiosRequestConfig } from "axios";
import { headers } from 'next/headers';

const getAxiosServerInstance = async () => {
    // Get all headers from the incoming request
    const requestHeaders = await headers();
    const headerObj: Record<string, string> = {};
    
    // Copy all headers from the request
    requestHeaders.forEach((value, key) => {
        // Avoid setting certain headers that axios will set automatically
        if (!['content-length', 'host'].includes(key.toLowerCase())) {
            headerObj[key] = value;
        }
    });
    
    // Cookie sudah termasuk dalam headers yang diambil dari request
    // Tidak perlu menambahkan cookie secara manual
    
    return axios.create({
        baseURL: process.env.NEXT_PUBLIC_API_URL,
        withCredentials: true,
        headers: headerObj
    });
};

const axiosServer = {
    get: async (url: string, config?: AxiosRequestConfig) => {
        const instance = await getAxiosServerInstance();
        return instance.get(url, config);
    },
    post: async (url: string, data?: any, config?: AxiosRequestConfig) => {
        const instance = await getAxiosServerInstance();
        return instance.post(url, data, config);
    },
    put: async (url: string, data?: any, config?: AxiosRequestConfig) => {
        const instance = await getAxiosServerInstance();
        return instance.put(url, data, config);
    },
    delete: async (url: string, config?: AxiosRequestConfig) => {
        const instance = await getAxiosServerInstance();
        return instance.delete(url, config);
    }
};

export default axiosServer;
