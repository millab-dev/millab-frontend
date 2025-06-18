import axiosClient from "@/lib/axios.client";
import { UserScore } from "./userScore.get-score";

export async function addUserScore(userId: string, score: number): Promise<UserScore> {
    try {
        const response = await axiosClient.post(`/api/v1/user-scores/${userId}/add`, { score });
        return response.data.data as UserScore;
    } catch (error) {
        throw error;
    }
}