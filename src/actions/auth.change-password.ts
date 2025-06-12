import axiosClient from "@/lib/axios.client"

interface ChangePasswordParams {
    currentPassword: string;
    newPassword: string;
}

export const changePassword = async ({ currentPassword, newPassword }: ChangePasswordParams) => {
    try {
        const response = await axiosClient.post("/api/v1/auth/change-password", {
            currentPassword,
            newPassword
        });
        
        const data = response.data;
        return data as {
            success: boolean;
            message: string;
        };
    } catch (error: any) {
        return {
            success: false,
            error: error.message || (error.response?.data?.error) || "Failed to change password"
        };
    }
}
