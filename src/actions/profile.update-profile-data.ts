import axiosClient from "@/lib/axios.client";
import { User } from "@/types/user";

export const updateProfileData = async (data: Partial<User>) => {
    try {
        const response = await axiosClient.post("/api/v1/auth/me", data)
        const result = response.data
        return result as {
            success: boolean
            message: string
        } 
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error:any) {
        return {
            success: false,
            error: error.message || (error.response?.data?.error) 
            || "Failed to update profile data",
        }
    }
}