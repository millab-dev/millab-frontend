"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { toast } from "sonner";
import QuizQuestion from "./QuizQuestion";
import QuizSummary from "./QuizSummary";
import QuizNavigation from "./QuizNavigation";
import axiosClient from "@/lib/axios.client";
import { awardQuizRewards } from "@/utils/progressionApi";
import cloud from "@/assets/cloudPatternBlue.svg";
import { 
    QuizOption,
    QuizQuestionData,
    QuizAnswer,
    DatabaseQuizQuestion,
    Module,
    ModuleSection,
    ModuleQuiz,
    UserProgress,
    QuizView,
    SectionProps,
    quizTranslations,
    Language
} from "./types";

interface QuizProps extends SectionProps {}

export default function Quiz({ language }: QuizProps) {
    const router = useRouter();
    const params = useParams();
    const moduleId = params.id as string;    // Get translations based on language with fallback to Indonesian
    const t = quizTranslations[language || 'id'];    const [module, setModule] = useState<Module | null>(null);
    const [loading, setLoading] = useState(true);
    const [currentView, setCurrentView] = useState<QuizView>("question");
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [answers, setAnswers] = useState<QuizAnswer[]>([]);
    const [hasLoaded, setHasLoaded] = useState(false);
    const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
    const [showResults, setShowResults] = useState(false);

    useEffect(() => {
        if (moduleId) {
            fetchModuleData();
        }
    }, [moduleId]);    const fetchModuleData = async () => {
        try {
            const response = await axiosClient.get(`/api/v1/modules/${moduleId}`);
            const data = response.data;

            if (data.success) {
                setModule(data.data);
                
                // Check if quiz is already completed
                if (data.data.progress?.quizCompleted) {
                    toast.info(t.quizCompletedAlready);
                }
            } else {
                toast.error(data.error || t.fetchError);
                router.push(`/module/${moduleId}`);
            }
        } catch (error) {
            console.error("Error fetching module:", error);
            toast.error(t.fetchErrorGeneric);
            router.push(`/module/${moduleId}`);
        } finally {
            setLoading(false);
        }
    };// Transform database quiz questions into UI format
    const transformQuizQuestions = (dbQuestions: DatabaseQuizQuestion[]): QuizQuestionData[] => {
        return dbQuestions
            .sort((a, b) => a.order - b.order)
            .map((dbQuestion, index) => ({
                id: index + 1,
                question: dbQuestion.question,
                points: 1,
                explanation: dbQuestion.explanation,
                options: dbQuestion.options.map((option, optionIndex) => ({
                    id: String.fromCharCode(65 + optionIndex), // A, B, C, D
                    text: option,
                    isCorrect: optionIndex === dbQuestion.correctAnswer
                }))
            }));
    };

    // Use quiz data from module or fallback to mock data
    const quizData: QuizQuestionData[] = module?.quiz?.questions 
        ? transformQuizQuestions(module.quiz.questions)
        : [
        {
            id: 1,
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
            id: 2,
            question: "Which of the following is NOT a characteristic of reliable news sources?",
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
            id: 3,
            question: "What is the best way to verify information found online?",
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
    ];    const currentQuestion = quizData[currentQuestionIndex];
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
        if (moduleId) {
            const saved = localStorage.getItem(`quiz-answers-${moduleId}`);
            if (saved) {
                setAnswers(JSON.parse(saved));
            }
            setHasLoaded(true);
        }
    }, [moduleId]);

    // Save answers to localStorage whenever they change
    useEffect(() => {
        if (!hasLoaded || !moduleId) return; // Don't save until after loading
        localStorage.setItem(
            `quiz-answers-${moduleId}`,
            JSON.stringify(answers)
        );
    }, [answers, moduleId, hasLoaded]);const submitQuizScore = async (score: number) => {
        try {
            // Submit score to existing endpoint
            const response = await axiosClient.post(`/api/v1/modules/${moduleId}/progress/quiz`, {
                score: score,
                completed: true
            });

            const data = response.data;

            if (data.success) {
                // Update module progress locally
                if (module) {
                    setModule({
                        ...module,
                        progress: data.data
                    });
                }

                // Award XP and points through progression system
                if (module?.quiz?.id && module?.difficulty) {
                    const correctAnswers = answers.filter(a => a.isCorrect).length;
                    const attemptNumber = (module.progress?.quizAttempts || 0) + 1;
                    const isFirstAttempt = attemptNumber === 1;

                    const progressionResult = await awardQuizRewards(
                        module.quiz.id,
                        module.difficulty,
                        correctAnswers, // Use correct answers instead of percentage for points
                        totalQuestions,
                        attemptNumber,
                        isFirstAttempt
                    );                    if (progressionResult.success && progressionResult.message) {
                        toast.success(progressionResult.message, {
                            duration: 4000,
                        });
                    } else {
                        toast.success(`${t.quizCompleted} ${score}%`, {
                            duration: 3000,
                        });
                    }
                } else {
                    toast.success(`${t.quizCompleted} ${score}%`, {
                        duration: 3000,
                    });
                }
            } else {
                toast.error(data.error || t.submitError);
            }
        } catch (error) {
            console.error("Error submitting quiz score:", error);
            toast.error(t.submitErrorGeneric);
        }
    };

    const handleAnswerSelect = (optionId: string) => {
        if (!showResults) {
            setSelectedAnswer(optionId);
        }
    };    const handleCheckAnswer = () => {
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
    };    const handleNextQuestion = async () => {
        if (currentQuestionIndex < totalQuestions - 1) {
            setCurrentQuestionIndex((prev) => prev + 1);
        } else {
            // Calculate final score and submit
            const finalScore = Math.round((totalPoints / totalQuestions) * 100);
            await submitQuizScore(finalScore);
            
            // Clear localStorage after completion
            localStorage.removeItem(`quiz-answers-${moduleId}`);
            
            // Add delay to show the success toast before transitioning
            setTimeout(() => {
                setCurrentView("summary");
            }, 2000); // 2 second delay
        }
    };

    const handlePrevQuestion = () => {
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex((prev) => prev - 1);
        }
    };

    const handleBackToModule = () => {
        router.push(`/module/${moduleId}`);
    };

    const handleShowNavigation = () => {
        setCurrentView("navigation");
    };    const handleNavigateToQuestion = (questionIndex: number) => {
        setCurrentQuestionIndex(questionIndex);
        setCurrentView("question");
    };

    const handleRetakeQuiz = () => {
        setCurrentView("question");
        setCurrentQuestionIndex(0);
        setAnswers([]);
        setSelectedAnswer(null);
        setShowResults(false);
        // Clear localStorage when retaking quiz
        localStorage.removeItem(`quiz-answers-${moduleId}`);
    };    if (loading) {
        return (
            <div 
                className="min-h-screen bg-[#F8F8F8] sm:p-4 font-jakarta bg-repeat bg-[length:600px] lg:bg-[length:800px]"
                style={{
                    backgroundImage: `url(${cloud.src})`,
                }}
            >
                <div className="max-w-2xl mx-auto">
                    {/* Header Skeleton */}
                    <div className="flex justify-between items-center mb-8 max-sm:p-4 animate-pulse">
                        <div className="w-12 h-12 bg-gray-200 rounded-2xl"></div>
                        <div className="w-32 h-8 bg-gray-200 rounded-xl"></div>
                    </div>

                    {/* Quiz Card Skeleton */}
                    <div className="bg-white rounded-xl p-4 sm:p-8 animate-pulse">
                        {/* Question Number Skeleton */}
                        <div className="flex justify-center mb-8">
                            <div className="w-16 h-16 bg-gray-200 rounded-full"></div>
                        </div>
                        
                        {/* Question Text Skeleton */}
                        <div className="mb-12 space-y-3">
                            <div className="h-6 bg-gray-200 rounded w-3/4 mx-auto"></div>
                            <div className="h-6 bg-gray-200 rounded w-1/2 mx-auto"></div>
                        </div>
                        
                        {/* Options Skeleton */}
                        <div className="space-y-4 mb-12">
                            {[1, 2, 3, 4].map((item) => (
                                <div key={item} className="flex items-center gap-4 p-4 border-2 border-gray-200 rounded-2xl">
                                    <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
                                    <div className="flex-1 h-4 bg-gray-200 rounded"></div>
                                </div>
                            ))}
                        </div>
                        
                        {/* Buttons Skeleton */}
                        <div className="flex gap-4">
                            <div className="flex-1 h-12 bg-gray-200 rounded-lg"></div>
                            <div className="flex-1 h-12 bg-gray-200 rounded-lg"></div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    if (!module) {
        return (
            <div className="min-h-screen bg-primary flex items-center justify-center">
                <div className="text-white text-xl">{t.moduleNotFound}</div>
            </div>
        );
    }

    if (!module.quiz.isActive) {
        return (
            <div className="min-h-screen bg-primary flex items-center justify-center">
                <div className="text-white text-center">
                    <h2 className="text-2xl font-bold mb-4">{t.quizNotActiveTitle}</h2>
                    <p className="mb-4">{t.quizNotActiveMessage}</p>
                    <button 
                        onClick={handleBackToModule}
                        className="bg-white text-primary px-6 py-2 rounded-lg font-medium"
                    >
                        {t.backToModule}
                    </button>
                </div>
            </div>
        );
    }    if (currentView === "navigation") {
        return (
            <QuizNavigation                totalQuestions={totalQuestions}
                answeredQuestions={answers.map((a) => a.questionId)}
                onNavigateToQuestion={handleNavigateToQuestion}
                onBack={() => setCurrentView("question")}
                language={language || 'id'}
            />
        );
    }

    if (currentView === "summary") {
        return (            <QuizSummary
                quizData={quizData}
                answers={answers}
                totalPoints={totalPoints}
                onBackToModule={handleBackToModule}
                onRetakeQuiz={handleRetakeQuiz}
                language={language || 'id'}
            />
        );
    }

    return (
        <QuizQuestion
            question={currentQuestion}
            currentQuestionNumber={currentQuestionIndex + 1}
            totalQuestions={totalQuestions}
            selectedAnswer={selectedAnswer}
            showResults={showResults}
            onAnswerSelect={handleAnswerSelect}
            onCheckAnswer={handleCheckAnswer}
            onNextQuestion={handleNextQuestion}            onPrevQuestion={handlePrevQuestion}
            onBackToModule={handleBackToModule}
            canGoNext={showResults}
            canGoPrev={currentQuestionIndex > 0}
            onShowNavigation={handleShowNavigation}
            language={language || 'id'}
        />
    );
}