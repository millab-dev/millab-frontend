'use client';

import axios from "axios";

const axiosClient = axios.create({
    // Gunakan path relatif sehingga request akan dikirim ke domain frontend
    // dan di-proxy oleh Next.js rewrites ke backend
    withCredentials: true,
})
export default axiosClient;