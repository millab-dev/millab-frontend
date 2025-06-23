
import Quiz from "@/components/finalquiz/Quiz";
import Navbar from "@/components/core/Navbar";
import { quizService } from "@/actions/quiz.service";
import { AxiosError } from "axios";
import { getProfileData } from "@/actions/profile.get-profile-data";
import { User } from "@/types/user";

export const dynamic = "force-dynamic";

export default async function page({
    params,
}: {
    params: Promise<{ difficulty: string }>;
}) {    try {
        const { difficulty } = await params;
        const quiz = await quizService.getQuizByDifficulty(difficulty);
        const user = (await getProfileData()).data as Partial<User>;
        
        // Map difficulty values to expected format
        const normalizedDifficulty = difficulty.toLowerCase() as 'easy' | 'intermediate' | 'advanced';
        
        return (
            <>
                <Navbar />
                <Quiz 
                    quiz={quiz} 
                    userId={user.id as string} 
                    urlBase={`/final-quiz`} 
                    difficulty={normalizedDifficulty}
                />
            </>
        );
    } catch (error: unknown) {
        return (
            <div>
                Error:{" "}
                {error instanceof AxiosError
                    ? error.response?.data.message
                    : "Unknown error"}
            </div>
        );
    }
}
