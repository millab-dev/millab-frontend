"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import QuizQuestion from "./QuizQuestion";

import QuizSummary from "./QuizSummary";
import QuizNavigation from "./QuizNavigation";
import { Quiz as QuizType } from "@/actions/quiz.service";
import { addUserScore } from "@/actions/userScore.add-score";
import { toast } from "sonner";
import { AxiosError } from "axios";

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

type QuizView = "question" | "summary" | "navigation";

interface QuizProps {
    quiz: QuizType;
    userId: string;
    urlBase: string;
}

export default function Quiz({ quiz, userId, urlBase }: QuizProps) {
    const router = useRouter();

    // Map questions to add id and points if not present (for compatibility)
    const quizData = quiz.questions.map((q, idx) => ({
        id: idx + 1,
        question: q.question,
        options: q.options.map((opt, oidx) => ({
            id: String.fromCharCode(65 + oidx), // 'A', 'B', ...
            text: opt.option,
            isCorrect: opt.isCorrect,
        })),
        points: 1, // Default to 1 point per question, adjust if needed
    }));

    const [currentView, setCurrentView] = useState<QuizView>("question");
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [answers, setAnswers] = useState<QuizAnswer[]>([]);
    const [hasLoaded, setHasLoaded] = useState(false);
    const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
    const [showResults, setShowResults] = useState(false);
    const currentQuestion = quizData[currentQuestionIndex];
    const totalQuestions = quizData.length;
    const totalPoints = answers.reduce((sum, a) => sum + a.points, 0);

    // Find answer for current question
    const currentAnswer = answers.find(
        (a) => a.questionId === currentQuestion.id
    );

    // Sync selectedAnswer and showResults with currentAnswer and currentQuestionIndex
    useEffect(() => {
        if (currentAnswer) {
            setSelectedAnswer(currentAnswer.selectedOptionId);
            setShowResults(true);
        } else {
            setSelectedAnswer(null);
            setShowResults(false);
        }
    }, [currentQuestionIndex, answers, currentAnswer]);

    // Load answers from localStorage on mount
    useEffect(() => {
        const saved = localStorage.getItem(`quiz-answers-${quiz.id}`);
        if (saved) {
            setAnswers(JSON.parse(saved));
        }
        setHasLoaded(true);
    }, [quiz.id]);

    // Save answers to localStorage whenever they change
    useEffect(() => {
        if (!hasLoaded) return; // Don't save until after loading
        localStorage.setItem(
            `quiz-answers-${quiz.id}`,
            JSON.stringify(answers)
        );
    }, [answers, quiz.id, hasLoaded]);

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

        setAnswers((prev) => {
            // Update if already answered, else add
            const existing = prev.find(
                (a) => a.questionId === currentQuestion.id
            );
            if (existing) {
                return prev.map((a) =>
                    a.questionId === currentQuestion.id ? answer : a
                );
            } else {
                return [...prev, answer];
            }
        });
        setShowResults(true);
    };

    const handleNextQuestion = async () => {
        if (currentQuestionIndex < totalQuestions - 1) {
            setCurrentQuestionIndex((prev) => prev + 1);
        } else {
            localStorage.removeItem(`quiz-answers-${quiz.id}`);
            try {
                addUserScore(userId as string, totalPoints);
                toast.success(`You scored ${totalPoints} points!`);
                setCurrentView("summary");
            } catch (error: unknown) {
                toast.error("Failed to add score", {
                    description: error instanceof AxiosError ? error.response?.data.message : "Unknown error",
                });
            }
        }
    };

    const handlePrevQuestion = () => {
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex((prev) => prev - 1);
        }
    };

    const handleBackToModule = () => {
        router.push(urlBase);
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
                onShowNavigation={handleShowNavigation}
            />
        </>
    );
}