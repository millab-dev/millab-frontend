"use client";

import { Download, FileText, CheckCircle, HelpCircle, Play, Pause, Square } from "lucide-react";
import { Button } from "@/components/ui/button";
import cloud from "@/assets/cloudPattern.svg";
import { useRouter, useParams } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { toast } from "sonner";
import axiosClient from "@/lib/axios.client";
import { 
    SectionProps, 
    detailModuleTranslations, 
    Language 
} from "./types";

interface Module {
    id: string;
    title: string;
    description: string;
    difficulty: "Easy" | "Intermediate" | "Advanced";
    order: number;
    pdfUrl?: string;
    sections: ModuleSection[];
    quiz: ModuleQuiz;
    isActive: boolean;
    progress?: UserProgress;
}

interface ModuleSection {
    id: string;
    title: string;
    content: string;
    duration: string;
    order: number;
    isActive: boolean;
}

interface ModuleQuiz {
    id: string;
    title: string;
    description: string;
    duration: string;
    totalQuestions: number;
    isActive: boolean;
}

interface UserProgress {
    id: string;
    userId: string;
    moduleId: string;
    completedSections: string[];
    quizCompleted: boolean;
    quizScore?: number;
    quizAttempts: number;
    completionPercentage: number;
    lastAccessedAt: string;
}

interface DetailModuleProps extends SectionProps {}

export default function DetailModule({ language = 'id' }: DetailModuleProps) {
    const router = useRouter();
    const params = useParams();
    const id = params.id as string;

    // Get translations based on language
    const t = detailModuleTranslations[language];    const [module, setModule] = useState<Module | null>(null);
    const [loading, setLoading] = useState(true);
    const [navigatingSectionId, setNavigatingSectionId] = useState<string | null>(null);
    const [navigatingToQuiz, setNavigatingToQuiz] = useState(false);

    // TTS state
    const [isSpeaking, setIsSpeaking] = useState(false);
    const [isPaused, setIsPaused] = useState(false);
    const [isIntentionalStop, setIsIntentionalStop] = useState(false);
    const speechRef = useRef<SpeechSynthesisUtterance | null>(null);

    useEffect(() => {
        if (id) {
            fetchModule();
        }
    }, [id]);
    const fetchModule = async () => {
        try {
            const response = await axiosClient.get(`/api/v1/modules/${id}`);
            const data = response.data;            
            if (data.success) {
                setModule(data.data);
                // Module access is automatically tracked on the backend when fetching module details
            } else {
                toast.error(data.error || t.fetchModuleError);
                router.push("/module");
            }
        } catch (error) {
            console.error("Error fetching module:", error);
            toast.error(t.fetchModuleError);
            router.push("/module");
        } finally {
            setLoading(false);
        }
    };

    const isSectionCompleted = (sectionId: string): boolean => {
        return module?.progress?.completedSections.includes(sectionId) || false;
    };

    const getCompletedSectionsCount = (): number => {
        return module?.progress?.completedSections.length || 0;
    };

    const getTotalSectionsCount = (): number => {
        return (
            module?.sections.filter((section) => section.isActive).length || 0
        );
    };

    const isQuizCompleted = (): boolean => {
        return module?.progress?.quizCompleted || false;
    };

    const getQuizScore = (): number | undefined => {
        return module?.progress?.quizScore;
    };    const getProgressPercentage = (): number => {
        return module?.progress?.completionPercentage || 0;
    };    const handleSectionClick = (sectionId: string) => {
        setNavigatingSectionId(sectionId);
        router.push(`/module/${id}/${sectionId}`);
    };

    const handleQuizClick = () => {
        setNavigatingToQuiz(true);
        router.push(`/module/${id}/quiz`);
    };

    // TTS Helper Functions
    const cleanTextForSpeech = (html: string): string => {
        // Remove HTML tags and clean up text for TTS
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = html;
        return tempDiv.textContent || tempDiv.innerText || '';
    };

    const startSpeaking = () => {
        if (!module) return;
        
        if (!window.speechSynthesis) {
            toast.error(t.aria.browserNotSupported);
            return;
        }

        // Build complete text content including description, sections, and quiz
        let fullText = '';
        
        // Add module description
        if (module.description) {
            fullText += `${t.moduleDescription}: ${cleanTextForSpeech(module.description)}. `;
        }
        
        // Add sections information
        const activeSections = module.sections
            .filter(section => section.isActive)
            .sort((a, b) => a.order - b.order);
            
        if (activeSections.length > 0) {
            fullText += `${t.materials}: `;
            activeSections.forEach((section, idx) => {
                const status = isSectionCompleted(section.id) ? t.aria.completedSection : t.aria.availableSection;
                fullText += `${idx + 1}. ${section.title}, ${status}, ${section.duration}. `;
            });
        }
        
        // Add quiz information
        if (module.quiz.isActive) {
            const quizStatus = isQuizCompleted() ? t.aria.completedQuiz : t.aria.availableQuiz;
            fullText += `${t.quiz}: ${module.quiz.title}, ${quizStatus}, ${module.quiz.duration}, ${module.quiz.totalQuestions} ${t.questions}`;
            
            if (isQuizCompleted() && getQuizScore() !== undefined) {
                fullText += `, ${t.score}: ${getQuizScore()}%`;
            }
            fullText += '. ';
        }

        if (!fullText.trim()) return;

        const utterance = new SpeechSynthesisUtterance(fullText);
        utterance.lang = language === 'en' ? 'en-US' : 'id-ID';
        utterance.rate = 0.9;
        utterance.pitch = 1;

        utterance.onstart = () => {
            setIsSpeaking(true);
            setIsPaused(false);
            setIsIntentionalStop(false);
        };

        utterance.onend = () => {
            if (!isIntentionalStop) {
                setIsSpeaking(false);
                setIsPaused(false);
            }
        };

        utterance.onerror = () => {
            if (!isIntentionalStop) {
                setIsSpeaking(false);
                setIsPaused(false);
            }
        };

        speechRef.current = utterance;
        window.speechSynthesis.speak(utterance);
    };

    const pauseSpeaking = () => {
        if (window.speechSynthesis && isSpeaking) {
            window.speechSynthesis.pause();
            setIsPaused(true);
        }
    };

    const resumeSpeaking = () => {
        if (window.speechSynthesis && isPaused) {
            window.speechSynthesis.resume();
            setIsPaused(false);
        }
    };

    const stopSpeaking = () => {
        setIsIntentionalStop(true);
        if (window.speechSynthesis) {
            window.speechSynthesis.cancel();
        }
        setIsSpeaking(false);
        setIsPaused(false);
    };

    const toggleSpeech = () => {
        if (isSpeaking) {
            if (isPaused) {
                resumeSpeaking();
            } else {
                pauseSpeaking();
            }
        } else {
            startSpeaking();
        }
    };

    // Keyboard shortcuts
    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.altKey) {
                switch (event.code) {
                    case 'KeyP':
                        event.preventDefault();
                        toggleSpeech();
                        break;
                    case 'KeyS':
                        event.preventDefault();
                        stopSpeaking();
                        break;
                    default:
                        break;
                }
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, []);

    // Cleanup on unmount
    useEffect(() => {
        return () => {
            if (window.speechSynthesis) {
                window.speechSynthesis.cancel();
            }
        };
    }, []);

    if (loading) {
        return (
            <div
                className="mx-auto font-jakarta bg-primary min-h-screen sm:px-24 lg:px-40 flex flex-col bg-repeat bg-[length:600px] lg:bg-[length:900px]"
                style={{
                    backgroundImage: `url(${cloud.src})`,
                }}
                role="main"
                aria-label={t.aria.moduleMain}
                aria-live="polite"
                aria-busy="true"
            >
                {/* Skip to content link for keyboard users */}
                <a 
                    href="#main-content" 
                    className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-white text-primary px-4 py-2 rounded z-50"
                >
                    {t.aria.skipToContent}
                </a>

                {/* Content Section Skeleton */}
                <div 
                    className="bg-white rounded-t-4xl p-6 sm:p-8 shadow-md relative flex-grow mt-30 flex flex-col"
                    id="main-content"
                    aria-label="Loading module content..."
                >
                    <div className="relative -top-24 flex flex-col gap-6 animate-pulse">
                        {/* Module Card Skeleton */}
                        <div className="bg-white rounded-3xl shadow-lg p-6 lg:w-2xl flex flex-col gap-2 self-center">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="bg-gray-200 p-2 rounded-lg w-12 h-12"></div>
                                    <div className="h-5 bg-gray-200 rounded w-20"></div>
                                </div>
                                <div className="w-8 h-8 bg-gray-200 rounded"></div>
                            </div>
                            <div className="mt-2 space-y-3">
                                <div className="flex items-center gap-2">
                                    <div className="h-6 bg-gray-200 rounded w-48"></div>
                                    <div className="h-6 bg-gray-200 rounded w-16"></div>
                                </div>
                                <div className="h-4 bg-gray-200 rounded w-40"></div>
                                <div className="flex items-center gap-2">
                                    <div className="flex-1 h-2 bg-gray-200 rounded-full"></div>
                                    <div className="h-4 bg-gray-200 rounded w-8"></div>
                                </div>
                            </div>
                        </div>

                        {/* Description Skeleton */}
                        <div className="space-y-3">
                            <div className="h-6 bg-gray-200 rounded w-32"></div>
                            <div className="space-y-2">
                                <div className="h-4 bg-gray-200 rounded w-full"></div>
                                <div className="h-4 bg-gray-200 rounded w-11/12"></div>
                                <div className="h-4 bg-gray-200 rounded w-4/5"></div>
                            </div>
                        </div>

                        {/* Sections Skeleton */}
                        <div className="space-y-4">
                            <div className="h-6 bg-gray-200 rounded w-24"></div>
                            {[1, 2, 3].map((item) => (
                                <div key={item} className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
                                            <div className="space-y-2">
                                                <div className="h-5 bg-gray-200 rounded w-32"></div>
                                                <div className="h-3 bg-gray-200 rounded w-20"></div>
                                            </div>
                                        </div>
                                        <div className="w-6 h-6 bg-gray-200 rounded-full"></div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Quiz Skeleton */}
                        <div className="space-y-4">
                            <div className="h-6 bg-gray-200 rounded w-16"></div>
                            <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
                                        <div className="space-y-2">
                                            <div className="h-5 bg-gray-200 rounded w-28"></div>
                                            <div className="h-3 bg-gray-200 rounded w-24"></div>
                                        </div>
                                    </div>
                                    <div className="w-6 h-6 bg-gray-200 rounded-full"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }    if (!module) {
        return (
            <div className="min-h-screen bg-primary flex items-center justify-center">
                <div className="text-white text-xl">{t.moduleNotFound}</div>
            </div>
        );
    }

    return (
        <div
            className="mx-auto font-jakarta bg-primary min-h-screen sm:px-24 lg:px-40 flex flex-col bg-repeat bg-[length:600px] lg:bg-[length:900px]"
            style={{
                backgroundImage: `url(${cloud.src})`,
            }}
            role="main"
            aria-label={t.aria.moduleMain}
        >
            {/* Skip to content link for keyboard users */}
            <a 
                href="#main-content" 
                className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-white text-primary px-4 py-2 rounded z-50"
            >
                {t.aria.skipToContent}
            </a>

            {/* Content Section */}
            <main 
                className="bg-white rounded-t-4xl p-6 sm:p-8 shadow-md relative flex-grow mt-30 flex flex-col"
                id="main-content"
            >
                <div className="relative -top-24 flex flex-col gap-6">
                    {/* Card */}
                    <article 
                        className="bg-white rounded-3xl shadow-lg p-6 lg:w-2xl flex flex-col gap-2 self-center"
                        aria-labelledby="module-title"
                        aria-describedby="module-info"
                        role="article"
                    >
                        <header className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div 
                                    className="bg-primary p-2 rounded-lg"
                                    aria-hidden="true"
                                >
                                    <FileText
                                        className="text-white"
                                        size={28}
                                    />
                                </div>
                                <span className="text-primary text-md font-bold">
                                    Module {module.order}
                                </span>
                            </div>
                            <div className="flex items-center gap-2">
                                {/* TTS Controls */}
                                <div className="flex items-center gap-1">
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="text-primary hover:text-primary/80 hover:bg-primary/10"
                                        onClick={toggleSpeech}
                                        aria-label={
                                            isSpeaking 
                                                ? (isPaused ? t.aria.resumeTTS : t.aria.pauseTTS)
                                                : t.aria.playTTS
                                        }
                                        title={
                                            isSpeaking 
                                                ? (isPaused ? t.aria.resumeTTS : t.aria.pauseTTS)
                                                : t.aria.playTTS
                                        }
                                    >
                                        {isSpeaking && !isPaused ? (
                                            <Pause size={20} />
                                        ) : (
                                            <Play size={20} />
                                        )}
                                    </Button>
                                    
                                    {isSpeaking && (
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            className="text-primary hover:text-primary/80 hover:bg-primary/10"
                                            onClick={stopSpeaking}
                                            aria-label={t.aria.stopTTS}
                                            title={t.aria.stopTTS}
                                        >
                                            <Square size={20} />
                                        </Button>
                                    )}
                                </div>
                                
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="text-primary"
                                    onClick={() => {
                                        if (module.pdfUrl) {
                                            window.open(module.pdfUrl, "_blank");
                                        } else {
                                            toast.info(t.noPdfAvailable);
                                        }
                                    }}
                                    aria-label={`${t.aria.downloadModule}: ${module.title}`}
                                    title={t.aria.downloadModule}
                                >
                                    <Download size={22} />
                                </Button>
                            </div>
                        </header>
                        
                        <div className="mt-2" id="module-info">
                            <div className="flex items-center gap-2 mb-2">
                                <h1 
                                    className="text-md sm:text-xl font-semibold text-primary"
                                    id="module-title"
                                >
                                    {module.title}
                                </h1>
                                <span
                                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                                        module.difficulty === "Easy"
                                            ? "bg-green-100 text-green-800"
                                            : module.difficulty === "Intermediate"
                                            ? "bg-yellow-100 text-yellow-800"
                                            : "bg-red-100 text-red-800"
                                    }`}
                                    aria-label={`${t.aria.difficultyBadge}: ${t.difficulty[module.difficulty]}`}
                                >
                                    {t.difficulty[module.difficulty]}
                                </span>
                            </div>
                            <div className="text-gray-400 text-sm mt-1">
                                {t.sections} {getCompletedSectionsCount()}/
                                {getTotalSectionsCount()} | {t.quiz}{" "}
                                {isQuizCompleted() ? "1/1" : "0/1"}
                            </div>
                            <div className="flex items-center gap-2 mt-2">
                                <div 
                                    className="flex-1 h-2 bg-gray-200 rounded-full"
                                    role="progressbar"
                                    aria-valuenow={getProgressPercentage()}
                                    aria-valuemin={0}
                                    aria-valuemax={100}
                                    aria-label={`${t.aria.moduleProgress}: ${getProgressPercentage()}%`}
                                >
                                    <div
                                        className="h-2 bg-pink-500 rounded-full transition-all duration-300"
                                        style={{
                                            width: `${getProgressPercentage()}%`,
                                        }}
                                    />
                                </div>
                                <span className="text-primary font-semibold text-sm ml-2">
                                    {getProgressPercentage()}%
                                </span>
                            </div>
                        </div>
                    </article>

                    {/* Module Description */}
                    <section className="bg-white rounded-xl shadow-sm p-6">
                        <h2 className="text-lg font-bold text-primary mb-3">
                            {t.moduleDescription}
                        </h2>
                        <div
                            className="text-gray-700 prose prose-sm max-w-none leading-relaxed"
                            dangerouslySetInnerHTML={{
                                __html: module.description,
                            }}
                            role="article"
                            aria-labelledby="module-description-title"
                        />
                    </section>

                    {/* Hidden keyboard instructions for screen readers */}
                    <div className="sr-only">
                        {t.aria.keyboardInstructions}
                    </div>

                    {/* Sections Heading */}
                    <h2 className="text-xl font-bold text-primary">{t.materials}</h2>
                    
                    {/* Hidden navigation instructions for screen readers */}
                    <div className="sr-only">
                        {t.aria.navigationInstructions}
                    </div>
                    
                    <nav 
                        className="relative flex flex-col gap-3"
                        aria-label={t.aria.sectionList}
                        role="navigation"
                    >
                        {/* Vertical line */}
                        <div className="absolute left-[14px] top-0 bottom-0 w-1 bg-gray-200 z-0 rounded-full" aria-hidden="true" />
                        
                        {/* Stepper + Cards */}
                        {module.sections
                            .filter((section) => section.isActive)
                            .sort((a, b) => a.order - b.order)
                            .map((section, idx) => (
                                <div
                                    key={section.id}
                                    className="flex items-center relative z-10"
                                >
                                    {/* Stepper Icon */}
                                    <div 
                                        className="w-8 flex justify-center items-center"
                                        aria-hidden="true"
                                    >
                                        {isSectionCompleted(section.id) ? (
                                            <CheckCircle
                                                className="text-green-500 bg-white rounded-full border-2 border-green-500"
                                                size={28}
                                            />
                                        ) : (
                                            <FileText
                                                className="text-gray-400 bg-white rounded-full border-2 border-gray-300"
                                                size={28}
                                            />
                                        )}
                                    </div>

                                    {/* Section Card */}
                                    <div className="flex-1 ml-2">
                                        <button
                                            className={`w-full bg-white border rounded-xl p-3 flex items-center justify-between cursor-pointer hover:bg-gray-50 transition-all duration-200 shadow-md text-left ${
                                                navigatingSectionId === section.id ? 'opacity-50 pointer-events-none' : ''
                                            }`}
                                            onClick={() => handleSectionClick(section.id)}
                                            aria-label={`${t.aria.sectionButton} ${idx + 1}: ${section.title}. ${
                                                isSectionCompleted(section.id) ? t.aria.completedSection : t.aria.availableSection
                                            }. ${section.duration}`}
                                            disabled={navigatingSectionId === section.id}
                                        >
                                            <div>
                                                <div className="text-primary font-medium">
                                                    {idx + 1}. {section.title}
                                                </div>
                                                <div className="text-xs text-gray-400">
                                                    {section.duration}
                                                </div>
                                            </div>
                                            <div aria-hidden="true">
                                                <FileText className="text-primary mr-2" size={16} />
                                            </div>
                                        </button>
                                    </div>
                                </div>
                            ))}

                        {/* Quiz row */}
                        {module.quiz.isActive && (
                            <div
                                key={`quiz-${module.quiz.id}`}
                                className="flex items-center mt-2 relative z-10"
                            >
                                <div 
                                    className="w-8 flex justify-center items-center"
                                    aria-hidden="true"
                                >
                                    {isQuizCompleted() ? (
                                        <CheckCircle
                                            className="text-green-500 bg-white rounded-full border-2 border-green-500"
                                            size={28}
                                        />
                                    ) : (
                                        <HelpCircle
                                            className="text-primary bg-white rounded-full border-2 border-primary"
                                            size={28}
                                        />
                                    )}
                                </div>
                                
                                <div className="flex-1 ml-2">
                                    <button
                                        className={`w-full bg-gradient-to-r shadow-md from-primary to-blue-400 text-white rounded-xl p-3 flex items-center justify-between cursor-pointer hover:opacity-90 transition text-left ${
                                            navigatingToQuiz ? 'opacity-50 pointer-events-none' : ''
                                        }`}
                                        onClick={handleQuizClick}
                                        aria-label={`${t.aria.quizButton}: ${module.quiz.title}. ${
                                            isQuizCompleted() ? t.aria.completedQuiz : t.aria.availableQuiz
                                        }. ${module.quiz.duration}, ${module.quiz.totalQuestions} ${t.questions}${
                                            isQuizCompleted() && getQuizScore() !== undefined 
                                                ? `. ${t.score}: ${getQuizScore()}%` 
                                                : ''
                                        }`}
                                        disabled={navigatingToQuiz}
                                    >
                                        <div>
                                            <div className="font-semibold">
                                                {module.quiz.title}
                                            </div>
                                            <div className="text-xs">
                                                {module.quiz.duration} •{" "}
                                                {module.quiz.totalQuestions}{" "}
                                                {t.questions}
                                                {isQuizCompleted() &&
                                                    getQuizScore() !== undefined && (
                                                        <span>
                                                            {" "}
                                                            • {t.score}:{" "}
                                                            {getQuizScore()}%
                                                        </span>
                                                    )}
                                            </div>
                                        </div>
                                        <div aria-hidden="true">
                                            <FileText
                                                className="text-white opacity-60"
                                                size={28}
                                            />
                                        </div>
                                    </button>
                                </div>
                            </div>
                        )}
                    </nav>
                </div>
            </main>
        </div>
    );
}
