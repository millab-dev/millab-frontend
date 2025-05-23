import axiosServer from "@/lib/axios.server"
import { User } from "@/types/user"

export const getProfileData = async () => {
    try {
        const response = await axiosServer.get("/api/v1/auth/me")
        const data = response.data
        return data as {
            success: boolean
            error: string | undefined
            data: Partial<User> | undefined
        } 
    } catch (error:any) {
        return {
            success: false,
            error: error.message || (error.response?.data?.error) || "Failed to fetch profile data",
            data: undefined
        }
    }
}