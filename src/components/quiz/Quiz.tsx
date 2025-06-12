"use client";

import { useState } from "react";
import { useRouter, useParams } from "next/navigation";
import QuizQuestion from "./QuizQuestion";

import QuizSummary from "./QuizSummary";
import QuizNavigation from "./QuizNavigation";

export interface QuizOption {
    id: string;
    text: string;
    isCorrect: boolean;
}

export interface QuizQuestionData {
    id: number;
    question: string;
    options: QuizOption[];
    points: number;
}

export interface QuizAnswer {
    questionId: number;
    selectedOptionId: string;
    isCorrect: boolean;
    points: number;
}

type QuizView = "question" | "results" | "summary" | "navigation";

export default function Quiz() {
    const router = useRouter();
    const params = useParams();
    const moduleId = params.id as string;

    // Mock quiz data - in real app this would come from API
    const quizData: QuizQuestionData[] = [
        {
            id: 1,
            question:
                "Who among the following doesn't have the record of playing the most World Cup?",
            points: 1,
            options: [
                {
                    id: "A",
                    text: "Online video is delivered over the internet to computers or mobile devices, it's inherently digital.",
                    isCorrect: false,
                },
                {
                    id: "B",
                    text: "Online video is delivered over the internet to computers or mobile devices, it's inherently digital.",
                    isCorrect: false,
                },
                {
                    id: "C",
                    text: "Online video is delivered over the internet to computers or mobile devices, it's inherently digital.",
                    isCorrect: false,
                },
                {
                    id: "D",
                    text: "Online video is delivered over the internet to computers or mobile devices, it's inherently digital.",
                    isCorrect: true,
                },
            ],
        },
        {
            id: 2,
            question: "What is the main purpose of media literacy?",
            points: 1,
            options: [
                {
                    id: "A",
                    text: "To learn how to use social media platforms effectively.",
                    isCorrect: false,
                },
                {
                    id: "B",
                    text: "To develop critical thinking skills about media content.",
                    isCorrect: true,
                },
                {
                    id: "C",
                    text: "To become a professional journalist or media creator.",
                    isCorrect: false,
                },
                {
                    id: "D",
                    text: "To understand technical aspects of media production.",
                    isCorrect: false,
                },
            ],
        },
        {
            id: 3,
            question:
                "Which of the following is NOT a characteristic of reliable news sources?",
            points: 1,
            options: [
                {
                    id: "A",
                    text: "Clear authorship and publication date",
                    isCorrect: false,
                },
                {
                    id: "B",
                    text: "Sensational headlines designed to get clicks",
                    isCorrect: true,
                },
                {
                    id: "C",
                    text: "Multiple sources and fact-checking",
                    isCorrect: false,
                },
                {
                    id: "D",
                    text: "Editorial transparency and corrections policy",
                    isCorrect: false,
                },
            ],
        },
        {
            id: 4,
            question:
                "What is the best way to verify information found online?",
            points: 1,
            options: [
                {
                    id: "A",
                    text: "Check if it has many likes and shares",
                    isCorrect: false,
                },
                {
                    id: "B",
                    text: "Cross-reference with multiple reliable sources",
                    isCorrect: true,
                },
                {
                    id: "C",
                    text: "Look for emotional language in the content",
                    isCorrect: false,
                },
                {
                    id: "D",
                    text: "Check if it confirms your existing beliefs",
                    isCorrect: false,
                },
            ],
        },
    ];

    const [currentView, setCurrentView] = useState<QuizView>("question");
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [answers, setAnswers] = useState<QuizAnswer[]>([]);
    const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
    const [showResults, setShowResults] = useState(false);
    const currentQuestion = quizData[currentQuestionIndex];
    const totalQuestions = quizData.length;
    const totalPoints = answers.reduce((sum, a) => sum + a.points, 0);
    const handleAnswerSelect = (optionId: string) => {
        if (!showResults) {
            setSelectedAnswer(optionId);
        }
    };

    const handleCheckAnswer = () => {
        if (!selectedAnswer) return;

        const correctOption = currentQuestion.options.find(
            (opt) => opt.isCorrect
        );
        const isCorrect = selectedAnswer === correctOption?.id;

        const answer: QuizAnswer = {
            questionId: currentQuestion.id,
            selectedOptionId: selectedAnswer,
            isCorrect,
            points: isCorrect ? currentQuestion.points : 0,
        };

        setAnswers((prev) => [...prev, answer]);
        setShowResults(true);
    };

    const handleNextQuestion = () => {
        if (currentQuestionIndex < totalQuestions - 1) {
            setCurrentQuestionIndex((prev) => prev + 1);
            setSelectedAnswer(null);
            setShowResults(false);
        } else {
            setCurrentView("summary");
        }
    };

    const handlePrevQuestion = () => {
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex((prev) => prev - 1);
            setSelectedAnswer(null);
            setShowResults(false);
            // Remove the last answer if going back
            setAnswers((prev) => prev.slice(0, -1));
        }
    };

    const handleBackToModule = () => {
        router.push(`/module/${moduleId}`);
    };

    const handleShowNavigation = () => {
        setCurrentView("navigation");
    };

    const handleNavigateToQuestion = (questionIndex: number) => {
        setCurrentQuestionIndex(questionIndex);
        setCurrentView("question");
        setSelectedAnswer(null);
        setShowResults(false);
    };

    const handleRetakeQuiz = () => {
        setCurrentView("question");
        setCurrentQuestionIndex(0);
        setAnswers([]);
        setSelectedAnswer(null);
        setShowResults(false);
    };

    if (currentView === "navigation") {
        return (
            <QuizNavigation
                totalQuestions={totalQuestions}
                answeredQuestions={answers.map((a) => a.questionId)}
                onNavigateToQuestion={handleNavigateToQuestion}
                onBack={() => setCurrentView("question")}
            />
        );
    }

    if (currentView === "summary") {
        return (
            <QuizSummary
                quizData={quizData}
                answers={answers}
                totalPoints={totalPoints}
                onBackToModule={handleBackToModule}
                onRetakeQuiz={handleRetakeQuiz}
                onShowNavigation={handleShowNavigation}
            />
        );
    }

    return (
        <>
            <QuizQuestion
                question={currentQuestion}
                currentQuestionNumber={currentQuestionIndex + 1}
                totalQuestions={totalQuestions}
                selectedAnswer={selectedAnswer}
                showResults={showResults}
                onAnswerSelect={handleAnswerSelect}
                onCheckAnswer={handleCheckAnswer}
                onNextQuestion={handleNextQuestion}
                onPrevQuestion={handlePrevQuestion}
                onBackToModule={handleBackToModule}
                canGoNext={showResults}
                canGoPrev={currentQuestionIndex > 0}
            />
        </>
    );
}
