import axiosService from "@/lib/axios.server";

export interface Quiz {
    id: string;
    title: string;
    isModule: boolean;
    isFinalQuiz: boolean;
    moduleId: string | undefined;
    difficulty: string | undefined;
    questions: Question[];
}

export interface Question {
    question: string;
    options: Option[];
}

export interface Option {
    option: string;
    isCorrect: boolean;
}

class QuizService { 
    async getQuizByDifficulty(difficulty: string) : Promise<Quiz> {
        try {
            const response = await axiosService.get(`/api/v1/quizzes/difficulty/${difficulty}`);
            return response.data.data[0] as Quiz;
        } catch (error) {
            throw error;
        }
    }
}

export const quizService = new QuizService();

