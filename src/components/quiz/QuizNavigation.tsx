"use client";

import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Language, quizNavigationTranslations } from "./types";

interface QuizNavigationProps {
    totalQuestions: number;
    answeredQuestions: number[];
    onNavigateToQuestion: (questionIndex: number) => void;
    onBack: () => void;
    language: Language;
}

export default function QuizNavigation({
    totalQuestions,
    answeredQuestions,
    onNavigateToQuestion,
    onBack,
    language,
}: QuizNavigationProps) {
    const questions = Array.from({ length: totalQuestions }, (_, i) => i + 1);
    const t = quizNavigationTranslations[language || 'id'];

    return (
        <div className="min-h-screen bg-gray-50 font-jakarta">
            {/* Header */}
            <div className="bg-blue-500 p-6 text-white">
                <div className="flex items-center gap-4 max-w-2xl mx-auto">
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={onBack}
                        className="text-white hover:bg-blue-600 w-10 h-10"
                    >
                        <ArrowLeft size={20} />
                    </Button>
                    <h1 className="text-xl font-bold">{t.questionNavigation}</h1>
                </div>
            </div>

            {/* Question Grid */}
            <div className="p-6 max-w-2xl mx-auto">
                <div className="grid grid-cols-4 gap-4">
                    {Array.from({ length: Math.ceil(totalQuestions / 4) }, (_, rowIndex) => (
                        <div key={rowIndex} className="contents">
                            {questions.slice(rowIndex * 4, (rowIndex + 1) * 4).map((questionNumber) => {
                                const questionIndex = questionNumber - 1;
                                const isAnswered = answeredQuestions.includes(questionNumber);
                                
                                return (
                                    <Button
                                        key={questionNumber}
                                        onClick={() => onNavigateToQuestion(questionIndex)}
                                        className={`
                                            h-12 w-12 rounded-xl font-bold text-lg transition-all duration-200
                                            ${isAnswered 
                                                ? 'bg-green-500 hover:bg-green-600 text-white' 
                                                : 'bg-white hover:bg-gray-100 text-blue-500 border-2 border-blue-500'
                                            }
                                        `}
                                        variant="ghost"
                                    >
                                        {questionNumber}
                                    </Button>
                                );
                            })}
                        </div>
                    ))}
                </div>

                {/* Legend */}
                <div className="mt-8 flex flex-wrap gap-6 justify-center">
                    <div className="flex items-center gap-2">
                        <div className="w-4 h-4 bg-green-500 rounded"></div>
                        <span className="text-sm text-gray-600">{t.answered}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-4 h-4 bg-white border-2 border-blue-500 rounded"></div>
                        <span className="text-sm text-gray-600">{t.unanswered}</span>
                    </div>
                </div>
            </div>
        </div>
    );
} 