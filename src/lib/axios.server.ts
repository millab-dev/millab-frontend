import axios, { AxiosRequestConfig } from "axios";
import { headers, cookies } from 'next/headers';

const getAxiosServerInstance = async () => {
    const headerObj: Record<string, string> = {};
    try {
        const requestHeaders = await headers();
        requestHeaders.forEach((value, key) => {
            if (!['content-length', 'host'].includes(key.toLowerCase())) {
                headerObj[key] = value;
            }
        });
    } catch {
        // Aman: abaikan jika dipanggil dari context middleware
    }
    try {
        const cookieStore = await cookies();
        const cookieString = cookieStore.toString();
        if (cookieString) {
            headerObj['cookie'] = cookieString;
        }
    } catch {
        // Aman: abaikan jika dipanggil dari context middleware
    }
    const apiBaseUrl = process.env.INTERNAL_API_URL || 'http://127.0.0.1:8080';
    return axios.create({
        baseURL: apiBaseUrl,
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
