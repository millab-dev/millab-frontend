"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import QuizQuestion from "./QuizQuestion";

import QuizSummary from "./QuizSummary";
import QuizNavigation from "./QuizNavigation";
import { Quiz as QuizType } from "@/actions/quiz.service";
import { addUserScore } from "@/actions/userScore.add-score";
import { awardFinalQuizRewards, checkQuizAttemptStatus } from "@/utils/progressionApi";
import { toast } from "sonner";
import { AxiosError } from "axios";
import { Language, quizMessagesTranslations } from "./types";

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
    isFirstAttempt?: boolean; // Track if this is the first attempt
    language?: Language;
    difficulty?: 'easy' | 'intermediate' | 'advanced'; // Quiz difficulty for points calculation
}

export default function Quiz({ quiz, userId, urlBase, isFirstAttempt = true, language = 'id', difficulty = 'intermediate' }: QuizProps) {
    const router = useRouter();

    // Get translations based on language
    const qm = quizMessagesTranslations[language];

    // Map questions to add id and points if not present (for compatibility)
    const quizData = quiz.questions.map((q, idx) => ({
        id: idx + 1,
        question: q.question,
        options: q.options.map((opt, oidx) => ({
            id: String.fromCharCode(65 + oidx), // 'A', 'B', ...
            text: opt.option,
            isCorrect: opt.isCorrect,
        })),
        pointView: {
            easy: 1,
            intermediate: 2,
            advanced: 3,
        }[difficulty],
        points: 1 // Default to 1 point per question, adjust if needed
    }));

    const [currentView, setCurrentView] = useState<QuizView>("question");
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [answers, setAnswers] = useState<QuizAnswer[]>([]);
    const [hasLoaded, setHasLoaded] = useState(false);    const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
    const [showResults, setShowResults] = useState(false);
    const [actualIsFirstAttempt, setActualIsFirstAttempt] = useState<boolean | null>(null);
    const [showFinishConfirm, setShowFinishConfirm] = useState(false);
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
    }, [currentQuestionIndex, answers, currentAnswer]);    // Load answers from localStorage on mount
    useEffect(() => {
        const saved = localStorage.getItem(`quiz-answers-${quiz.id}`);
        if (saved) {
            setAnswers(JSON.parse(saved));
        }
        setHasLoaded(true);
        checkFirstAttemptStatus();
    }, [quiz.id]);

    const checkFirstAttemptStatus = async () => {
        try {
            const response = await checkQuizAttemptStatus('final_quiz', quiz.id);
            if (response.success && response.data) {
                setActualIsFirstAttempt(response.data.isFirstAttempt);
            }
        } catch (error) {
            console.error('Error checking first attempt status:', error);
            // Default to true if we can't check
            setActualIsFirstAttempt(true);
        }
    };

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
            points: isCorrect ? currentQuestion.pointView : 0,
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
    };    const handleNextQuestion = async () => {
        if (currentQuestionIndex < totalQuestions - 1) {
            setCurrentQuestionIndex((prev) => prev + 1);
        } else {
            // Show confirmation before finishing quiz
            setShowFinishConfirm(true);
        }
    };

    const handleFinishQuiz = async () => {
        setShowFinishConfirm(false);
        
        localStorage.removeItem(`quiz-answers-${quiz.id}`);
        try {
            // Add score to existing system
            addUserScore(userId as string, totalPoints);                // Award XP and points through progression system
            const progressionResult = await awardFinalQuizRewards(
                quiz.id,
                totalPoints,
                totalQuestions,
                actualIsFirstAttempt ?? isFirstAttempt,
                difficulty
            );            if (progressionResult.success && progressionResult.message) {
                toast.success(progressionResult.message, {
                    duration: 4000,
                });
            } else {
                toast.success(qm.earnedPoints.replace('{points}', totalPoints.toString()));
            }

            setCurrentView("summary");
        } catch (error: unknown) {
            console.error("Error submitting final quiz:", error);
            if (language === 'id') {
                toast.error("Gagal menambahkan skor", {
                    description: error instanceof AxiosError ? error.response?.data.message : "Terjadi kesalahan",
                });
            } else {
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
                language={language}
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
                language={language}
            />
        );
    }    return (
        <>
            {/* Finish Quiz Confirmation Dialog */}
            {showFinishConfirm && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">                    <div className="bg-white rounded-lg p-6 max-w-md mx-4">
                        <h3 className="text-xl font-bold mb-4">
                            {actualIsFirstAttempt ? qm.finishQuizConfirm : qm.finishQuizRetake}
                        </h3>
                        <p className="text-gray-600 mb-6">
                            {actualIsFirstAttempt 
                                ? qm.finishQuizFirstAttempt
                                : qm.finishQuizNoPoints
                            }
                        </p>
                        <div className="flex justify-end space-x-3">
                            <button
                                onClick={() => setShowFinishConfirm(false)}
                                className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50"
                            >
                                {qm.cancel}
                            </button>
                            <button
                                onClick={handleFinishQuiz}
                                className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90"
                            >
                                {qm.finishQuiz}
                            </button>
                        </div>
                    </div>
                </div>            )}

            {/* First Attempt Warning Banner */}
            {actualIsFirstAttempt !== null && (
                <div className={`mb-4 p-3 rounded-lg border-l-4 ${
                    actualIsFirstAttempt 
                        ? 'bg-blue-50 border-blue-400 text-blue-700' 
                        : 'bg-yellow-50 border-yellow-400 text-yellow-700'
                }`}>
                    <div className="flex items-center">
                        <div className="text-sm font-medium">
                            {actualIsFirstAttempt ? qm.firstAttemptWarning : qm.retakeWarning}
                        </div>
                    </div>
                </div>
            )}

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
                language={language}
            />
        </>
    );
}