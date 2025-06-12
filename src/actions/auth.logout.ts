import axiosClient from "@/lib/axios.client"

export const logout = async () => {
    try{
        const response = await axiosClient.post("/api/v1/auth/logout")
        const data = response.data
        return data as {
            success: boolean
            message: string
        } 
    } catch (error:any) {
        return {
            success: false,
            error: error.message || (error.response?.data?.error) 
            || "Failed to logout",
            data: undefined
        }
    }
}