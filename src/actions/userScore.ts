import axiosServer from "@/lib/axios.server";

export interface UserScore {
    userId: string;
    score: number;
    createdAt: Date;
    updatedAt: Date;
}

export async function getUserScore(userId: string): Promise<UserScore> {
    try {
        const response = await axiosServer.get(`/api/v1/user-scores/${userId}`);
        return response.data.data as UserScore;
    } catch (error) {
        throw error;
    }
}