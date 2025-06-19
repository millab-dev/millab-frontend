"use client";

import { ArrowLeft, RotateCcw} from "lucide-react";
import { Button } from "@/components/ui/button";
import { QuizQuestionData, QuizAnswer } from "./Quiz";
import cloud from "@/assets/cloudPatternBlue.svg";

interface QuizSummaryProps {
    quizData: QuizQuestionData[];
    answers: QuizAnswer[];
    totalPoints: number;
    onBackToModule: () => void;
    onRetakeQuiz: () => void;
}

export default function QuizSummary({
    quizData,
    answers,
    totalPoints,
    onBackToModule,
    onRetakeQuiz,
}: QuizSummaryProps) {
    const totalQuestions = quizData.length;
    const correctAnswers = answers.filter(a => a.isCorrect).length;
    const percentage = Math.round((correctAnswers / totalQuestions) * 100);
    
    const getPerformanceLevel = () => {
        if (percentage >= 80) return "Expert Level";
        if (percentage >= 60) return "Intermediate Level";
        if (percentage >= 40) return "Beginner Level";
        return "Needs Practice";
    };

    const getPerformanceMessage = () => {
        if (percentage >= 80) return "Outstanding performance! You handled this quiz like a pro!";
        if (percentage >= 60) return "Great job! You have a good understanding of the material.";
        if (percentage >= 40) return "Good effort! Keep practicing to improve your skills.";
        return "Don't worry! Review the material and try again.";
    };

    const getProgressColor = () => {
        if (percentage >= 80) return "bg-green-500";
        if (percentage >= 60) return "bg-blue-500";
        if (percentage >= 40) return "bg-yellow-500";
        return "bg-red-500";
    };

    return (
        <div className="min-h-screen bg-gray-50 p-4 font-jakarta bg-repeat bg-[length:600px] lg:bg-[length:800px]" style={{
            backgroundImage: `url(${cloud.src})`,
        }}>
            <div className="max-w-2xl mx-auto">
                {/* Header */}
                <div className="flex justify-between items-center mb-8">
                    <Button
                        variant="outline"
                        size="icon"
                        onClick={onBackToModule}
                        className="w-12 h-12 rounded-2xl border-2 border-blue-500 text-blue-500 hover:bg-blue-50"
                    >
                        <ArrowLeft size={20} />
                    </Button>

                </div>

                {/* Performance Summary */}
                <div className="bg-white rounded-2xl p-6 mb-6 shadow-sm">
                    <h2 className="text-2xl font-bold text-center mb-2 text-gray-800">
                        {getPerformanceLevel()}
                    </h2>
                    <p className="text-center text-gray-600 mb-4">
                        {getPerformanceMessage()}
                    </p>
                    
                    {/* Progress Bar */}
                    <div className="w-full bg-gray-200 rounded-full h-3 mb-4">
                        <div 
                            className={`h-3 rounded-full transition-all duration-500 ${getProgressColor()}`}
                            style={{ width: `${percentage}%` }}
                        />
                    </div>
                    
                    {/* Stats */}
                    <div className="flex justify-around text-center">
                        <div>
                            <div className="text-2xl font-bold text-gray-800">{correctAnswers}/{totalQuestions}</div>
                            <div className="text-sm text-gray-600">Correct</div>
                        </div>
                        <div>
                            <div className="text-2xl font-bold text-gray-800">{percentage}%</div>
                            <div className="text-sm text-gray-600">Score</div>
                        </div>
                        <div>
                            <div className="text-2xl font-bold text-gray-800">{totalPoints}</div>
                            <div className="text-sm text-gray-600">Points</div>
                        </div>
                    </div>
                </div>

                {/* Question Breakdown */}
                <div className="space-y-4 mb-8">
                    {quizData.map((question, index) => {
                        const answer = answers.find(a => a.questionId === question.id);
                        const points = answer?.points || 0;

                        return (
                            <div key={question.id} className="bg-white rounded-xl p-4 shadow-sm">
                                <div className="flex items-start gap-3">
                                    <div className="flex-shrink-0">
                                        <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                                            {index + 1}
                                        </div>
                                    </div>
                                    <div className="flex-1">                                        <div className="flex items-center justify-between mb-2">
                                            <span className="text-sm text-blue-600 font-medium">
                                                {points} point{points !== 1 ? 's' : ''}
                                            </span>
                                        </div>
                                        <div 
                                            className="font-medium text-gray-800 mb-3 text-sm prose prose-sm max-w-none"
                                            dangerouslySetInnerHTML={{ __html: question.question }}
                                        />
                                          {/* Answer Options */}
                                        <div className="space-y-2">
                                            {question.options.map((option) => {
                                                const isSelected = answer?.selectedOptionId === option.id;
                                                const isCorrectOption = option.isCorrect;
                                                
                                                let labelText = "";
                                                let bgColor = "";
                                                let textColor = "";
                                                let iconText = "";

                                                if (isCorrectOption) {
                                                    labelText = "Selected Correct Answer";
                                                    bgColor = "bg-green-500";
                                                    textColor = "text-white";
                                                    iconText = "✓";
                                                } else if (isSelected) {
                                                    labelText = "Selected Wrong Answer";
                                                    bgColor = "bg-red-500";
                                                    textColor = "text-white";
                                                    iconText = "✗";
                                                } else {
                                                    labelText = "Unselected Answer";
                                                    bgColor = "bg-gray-100";
                                                    textColor = "text-gray-500";
                                                    iconText = "✗";
                                                }

                                                return (
                                                    <div key={option.id}>
                                                        <div className="text-xs text-gray-600 mb-1">
                                                            {labelText} {iconText}
                                                        </div>
                                                        <div className={`p-3 rounded-lg ${bgColor} ${textColor} text-sm`}>
                                                            <div className="flex items-center gap-2">
                                                                <span className="font-semibold">{option.id}</span>
                                                                <div 
                                                                    className="prose prose-sm max-w-none"
                                                                    dangerouslySetInnerHTML={{ __html: option.text }}
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                );
                                            })}
                                        </div>

                                        {/* Explanation */}
                                        {question.explanation && (
                                            <div className="mt-4 p-3 bg-blue-50 border-l-4 border-blue-500 rounded-r-lg">
                                                <div className="flex items-start gap-2">
                                                    <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                                                        <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                                                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                                                        </svg>
                                                    </div>
                                                    <div>
                                                        <h5 className="text-sm font-semibold text-blue-900 mb-1">Explanation</h5>
                                                        <div 
                                                            className="text-sm text-blue-800 prose prose-sm max-w-none"
                                                            dangerouslySetInnerHTML={{ __html: question.explanation }}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4">
                    <Button
                        onClick={onRetakeQuiz}
                        variant="outline"
                        className="flex-1 h-12 text-blue-500 border-blue-500 hover:bg-blue-50 font-medium flex items-center justify-center gap-2"
                    >
                        <RotateCcw size={16} />
                        Retake Quiz
                    </Button>
                    <Button
                        onClick={onBackToModule}
                        className="flex-1 h-12 bg-blue-500 hover:bg-blue-600 text-white font-medium"
                    >
                        Go Back
                    </Button>
                </div>
            </div>
        </div>
    );
} 