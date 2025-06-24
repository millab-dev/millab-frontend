"use client";

import { useState } from "react";
import { ArrowLeft, List, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { QuizQuestionData, QuizOption, Language, quizQuestionTranslations } from "./types";
import cloud from "@/assets/cloudPatternBlue.svg";

interface QuizQuestionProps {
    question: QuizQuestionData;
    currentQuestionNumber: number;
    totalQuestions: number;
    selectedAnswer: string | null;
    showResults: boolean;
    onAnswerSelect: (optionId: string) => void;
    onCheckAnswer: () => void;
    onNextQuestion: () => void;
    onPrevQuestion: () => void;
    onBackToModule: () => void;
    canGoNext: boolean;
    canGoPrev: boolean;
    onShowNavigation: () => void;
    language: Language;
}

export default function QuizQuestion({
    question,
    currentQuestionNumber,
    totalQuestions,
    selectedAnswer,
    showResults,
    onAnswerSelect,
    onCheckAnswer,
    onNextQuestion,
    onPrevQuestion,
    onBackToModule,
    canGoPrev,
    onShowNavigation,
    language,
}: QuizQuestionProps) {
    const [hoveredOption, setHoveredOption] = useState<string | null>(null);
    const t = quizQuestionTranslations[language || 'id'];

    const getOptionStyle = (option: QuizOption) => {
        if (showResults) {
            if (option.isCorrect) {
                return "bg-green-500 text-white border-green-500";
            } else if (selectedAnswer === option.id) {
                return "bg-red-500 text-white border-red-500";
            } else {
                return "bg-gray-100 text-gray-500 border-gray-200";
            }
        } else {
            if (selectedAnswer === option.id) {
                return "bg-blue-100 border-blue-500 text-blue-700";
            } else if (hoveredOption === option.id) {
                return "bg-gray-50 border-gray-300";
            } else {
                return "bg-white border-gray-200 hover:bg-gray-50";
            }
        }
    };

    const getOptionCircleStyle = (option: QuizOption) => {
        if (showResults) {
            if (option.isCorrect) {
                return "bg-green-600";
            } else if (selectedAnswer === option.id) {
                return "bg-red-600";
            } else {
                return "bg-gray-400";
            }
        } else {
            return selectedAnswer === option.id ? "bg-blue-500" : "bg-blue-500";
        }
    };

    return (
        <div
            className="min-h-screen bg-[#F8F8F8] sm:p-4 font-jakarta bg-repeat bg-[length:600px] lg:bg-[length:800px]"
            style={{
                backgroundImage: `url(${cloud.src})`,
            }}
        >
            <div className="max-w-2xl mx-auto">
                {/* Header */}
                <div className="flex justify-between items-center mb-8 max-sm:p-4">
                    <Button
                        variant="outline"
                        size="icon"
                        onClick={onBackToModule}
                        className="w-12 h-12 rounded-2xl border-2 border-blue-500 text-blue-500 hover:bg-blue-50"
                    >
                        <ArrowLeft size={20} />
                    </Button>

                    <div
                        className="bg-blue-500 text-white px-4 py-2 rounded-xl font-medium flex items-center gap-2 cursor-pointer hover:bg-blue-600"
                        onClick={onShowNavigation}
                    >
                        <List size={16} />
                        {currentQuestionNumber} {t.of} {totalQuestions}
                    </div>
                </div>

                <div className="bg-white rounded-xl p-4 sm:p-8">
                    {/* Question Number */}
                    <div className="flex justify-center mb-8">
                        <div className="w-16 h-16 bg-blue-500 text-white rounded-full flex items-center justify-center text-2xl font-bold">
                            {currentQuestionNumber}
                        </div>
                    </div>                    {/* Question */}
                    <div 
                        className="text-xl font-semibold text-center mb-12 text-gray-800 leading-relaxed px-4 prose prose-sm max-w-none"
                        dangerouslySetInnerHTML={{ __html: question.question }}
                    />                    {/* Options */}
                    <div className="space-y-4 mb-12">
                        {question.options.map((option: QuizOption) => (
                            <div key={option.id} className="relative">                                <div
                                    className={`
                                        border-2 rounded-2xl p-4 transition-all duration-200 flex items-center gap-4
                                        ${getOptionStyle(option)}
                                        ${!showResults ? 'cursor-pointer' : 'cursor-default'}
                                    `}
                                    onClick={() => !showResults && onAnswerSelect(option.id)}
                                    onMouseEnter={() =>
                                        !showResults &&
                                        setHoveredOption(option.id)
                                    }
                                    onMouseLeave={() =>
                                        !showResults && setHoveredOption(null)
                                    }
                                >
                                    <div
                                        className={`
                                            w-8 h-8 rounded-full flex items-center justify-center text-white font-semibold text-sm
                                            ${getOptionCircleStyle(option)}
                                        `}
                                    >
                                        {option.id}
                                    </div>
                                    <div 
                                        className="flex-1 prose prose-sm max-w-none"
                                        dangerouslySetInnerHTML={{ __html: option.text }}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Explanation Section */}
                    {showResults && question.explanation && (
                        <div className="mb-8 p-4 bg-blue-50 border-l-4 border-blue-500 rounded-r-lg">
                            <div className="flex items-start gap-3">
                                <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                                    </svg>
                                </div>
                                <div>
                                    <h4 className="font-semibold text-blue-900 mb-2">Explanation</h4>
                                    <div 
                                        className="text-blue-800 prose prose-sm max-w-none"
                                        dangerouslySetInnerHTML={{ __html: question.explanation }}
                                    />
                                </div>
                            </div>
                        </div>
                    )}
                    {/* Navigation Buttons */}
                    <div className="flex gap-4">
                        <Button
                            variant="outline"
                            onClick={onPrevQuestion}
                            disabled={!canGoPrev}
                            className="flex-1 h-12 text-blue-500 border-blue-500 hover:bg-blue-50 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {t.previousQuestion}
                        </Button>

                        {!showResults ? (
                            <Button
                                onClick={onCheckAnswer}
                                disabled={!selectedAnswer}
                                className="flex-1 h-12 bg-blue-500 hover:bg-blue-600 text-white font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <Search size={16} className="mr-2" />
                                {t.checkAnswer}
                            </Button>
                        ) : (
                            <Button
                                onClick={onNextQuestion}
                                className="flex-1 h-12 bg-blue-500 hover:bg-blue-600 text-white font-medium"
                            >                                {currentQuestionNumber === totalQuestions
                                    ? t.finishQuiz
                                    : t.nextQuestion}{" "}
                                →
                            </Button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
