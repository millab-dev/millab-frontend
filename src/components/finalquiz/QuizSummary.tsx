"use client";

import { ArrowLeft, RotateCcw} from "lucide-react";
import { Button } from "@/components/ui/button";
import { QuizQuestionData, QuizAnswer } from "./Quiz";
import cloud from "@/assets/cloudPatternBlue.svg";
import { Language, quizSummaryTranslations } from "./types";

interface QuizSummaryProps {
    quizData: QuizQuestionData[];
    answers: QuizAnswer[];
    totalPoints: number;
    onBackToModule: () => void;
    onRetakeQuiz: () => void;
    language?: Language;
}

export default function QuizSummary({
    quizData,
    answers,
    totalPoints,
    onBackToModule,
    onRetakeQuiz,
    language = 'id',
}: QuizSummaryProps) {
    // Get translations based on language
    const t = quizSummaryTranslations[language];
    const totalQuestions = quizData.length;
    const correctAnswers = answers.filter(a => a.isCorrect).length;
    const percentage = Math.round((correctAnswers / totalQuestions) * 100);
    
    const getPerformanceLevel = () => {
        if (percentage >= 80) return t.performanceLevels.expert;
        if (percentage >= 60) return t.performanceLevels.intermediate;
        if (percentage >= 40) return t.performanceLevels.beginner;
        return t.performanceLevels.needsPractice;
    };

    const getPerformanceMessage = () => {
        if (percentage >= 80) return t.performanceMessages.excellent;
        if (percentage >= 60) return t.performanceMessages.good;
        if (percentage >= 40) return t.performanceMessages.fair;
        return t.performanceMessages.needsImprovement;
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
                            <div className="text-sm text-gray-600">{t.stats.correct}</div>
                        </div>
                        <div>
                            <div className="text-2xl font-bold text-gray-800">{percentage}%</div>
                            <div className="text-sm text-gray-600">{t.stats.score}</div>
                        </div>
                        <div>
                            <div className="text-2xl font-bold text-gray-800">{totalPoints}</div>
                            <div className="text-sm text-gray-600">{t.stats.points}</div>
                        </div>
                    </div>
                </div>

                {/* Question Breakdown */}
                <h2 className="text-lg font-bold mb-3 mt-10">{t.questionResults}</h2>
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
                                    <div className="flex-1">
                                        <div className="flex items-center justify-between mb-2">
                                            <span className="text-sm text-blue-600 font-medium">
                                                {points} point{points !== 1 ? 's' : ''}
                                            </span>
                                        </div>
                                        <h3 className="font-medium text-gray-800 mb-3 text-sm">
                                            {question.question}
                                        </h3>
                                        
                                        {/* Answer Options */}
                                        <div className="space-y-2">
                                            {question.options.map((option) => {
                                                const isSelected = answer?.selectedOptionId === option.id;
                                                const isCorrectOption = option.isCorrect;
                                                
                                                let labelText = "";
                                                let bgColor = "";
                                                let textColor = "";
                                                let iconText = "";

                                                if (isSelected && isCorrectOption) {
                                                    // User selected the correct answer
                                                    labelText = t.answerLabels.selectedCorrect;
                                                    bgColor = "bg-green-500";
                                                    textColor = "text-white";
                                                    iconText = "✓";
                                                } else if (isSelected && !isCorrectOption) {
                                                    // User selected a wrong answer
                                                    labelText = t.answerLabels.selectedWrong;
                                                    bgColor = "bg-red-500";
                                                    textColor = "text-white";
                                                    iconText = "✗";
                                                } else if (!isSelected && isCorrectOption) {
                                                    // The correct answer that wasn't selected
                                                    labelText = t.answerLabels.correctAnswer;
                                                    bgColor = "bg-green-100";
                                                    textColor = "text-green-700";
                                                    iconText = "✓";
                                                } else {
                                                    // An incorrect answer that wasn't selected
                                                    labelText = t.answerLabels.unselected;
                                                    bgColor = "bg-gray-100";
                                                    textColor = "text-gray-500";
                                                    iconText = "";
                                                }

                                                return (
                                                    <div key={option.id}>
                                                        <div className="text-xs text-gray-600 mb-1">
                                                            {labelText} {iconText}
                                                        </div>
                                                        <div className={`p-3 rounded-lg ${bgColor} ${textColor} text-sm`}>
                                                            <div className="flex items-center gap-2">
                                                                <span className="font-semibold">{option.id}</span>
                                                                <span>{option.text}</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                );
                                            })}
                                        </div>
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
                        {t.actions.retakeQuiz}
                    </Button>
                    <Button
                        onClick={onBackToModule}
                        className="flex-1 h-12 bg-blue-500 hover:bg-blue-600 text-white font-medium"
                    >
                        {t.actions.goBack}
                    </Button>
                </div>
            </div>
        </div>
    );
} 