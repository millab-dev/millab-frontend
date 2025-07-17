"use client";

import { Button } from "@/components/ui/button";
import React, { useState, useEffect, useRef } from "react";
import cloud from "@/assets/cloudPattern.svg";
import Image from "next/image";
import owlRead from "/public/owl-read.png";
import owlVibe from "/public/owl-vibe.png";
import owlWave from "/public/owl-wave.png";
import owlHappy from "/public/owl-happy.png";
import { useRouter, useParams } from "next/navigation";
import { Check, ArrowRight, Volume2, VolumeX, Pause, Play } from "lucide-react";
import { toast } from "sonner";
import axiosClient from "@/lib/axios.client";
import { awardSectionXP } from "@/utils/progressionApi";
import { 
    SectionProps, 
    sectionModuleTranslations,  
} from "./types";

interface Module {
    id: string;
    title: string;
    titleEn?: string;
    description: string;
    descriptionEn?: string;
    order: number;
    difficulty: "Easy" | "Intermediate" | "Advanced";
    pdfUrl?: string;
    pdfUrlEn?: string;
    sections: ModuleSection[];
    quiz: ModuleQuiz;
    isActive: boolean;
    progress?: UserProgress;
}

interface ModuleSection {
    id: string;
    title: string;
    titleEn?: string;
    content: string;
    contentEn?: string;
    duration: string;
    order: number;
    isActive: boolean;
}

interface ModuleQuiz {
    id: string;
    title: string;
    titleEn?: string;
    description: string;
    descriptionEn?: string;
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

interface SectionModuleProps extends SectionProps {}

export default function SectionModule({ language = 'id' }: SectionModuleProps) {
    const router = useRouter();
    const params = useParams();
    const moduleId = params.id as string;
    const sectionId = params.section as string;

    // Get translations based on language
    const t = sectionModuleTranslations[language];
    
    // Existing state
    const [module, setModule] = useState<Module | null>(null);
    const [currentSection, setCurrentSection] = useState<ModuleSection | null>(
        null
    );
    const [loading, setLoading] = useState(true);
    const [isMarkedAsDone, setIsMarkedAsDone] = useState(false);
    const [isNavigating, setIsNavigating] = useState(false);
    
    // TTS state
    const [isSpeaking, setIsSpeaking] = useState(false);
    const [isPaused, setIsPaused] = useState(false);
    const [isIntentionalStop, setIsIntentionalStop] = useState(false);
    const speechRef = useRef<SpeechSynthesisUtterance | null>(null);
    const contentRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (moduleId && sectionId) {
            fetchModuleData();
        }
    }, [moduleId, sectionId]);

    const fetchModuleData = async () => {
        try {
            const response = await axiosClient.get(
                `/api/v1/modules/${moduleId}`
            );
            const data = response.data;

            if (data.success) {
                setModule(data.data);

                // Find the current section
                const section = data.data.sections.find(
                    (s: ModuleSection) => s.id === sectionId
                );
                if (section) {
                    setCurrentSection(section);
                    
                    // Check if section is already completed based on server data
                    const isCompleted = data.data.progress?.completedSections?.includes(sectionId) || false;
                    setIsMarkedAsDone(isCompleted);
                } else {
                    toast.error(t.sectionNotFound);
                    router.push(`/module/${moduleId}`);
                }
            } else {
                toast.error(data.error || t.fetchModuleError);
                router.push("/module");
            }
        } catch (error) {
            console.error("Error fetching module:", error);
            toast.error(t.fetchModuleErrorGeneric);
            router.push("/module");
        } finally {
            setLoading(false);
        }
    };

    const markSectionAsCompleted = async () => {
        // Prevent duplicate completion attempts
        if (isMarkedAsDone) {
            toast.info("This section is already completed");
            return;
        }

        try {
            const response = await axiosClient.post(
                `/api/v1/modules/${moduleId}/sections/${sectionId}/complete`
            );
            const data = response.data;

            if (data.success) {
                // Update state based on server response
                setIsMarkedAsDone(true);

                // Update the module progress with fresh server data
                if (module) {
                    setModule({
                        ...module,
                        progress: data.data,
                    });
                }

                // Award XP through progression system
                if (module?.difficulty) {
                    try {
                        const progressionResult = await awardSectionXP(
                            sectionId,
                            module.difficulty
                        );

                        if (progressionResult.success) {
                            if (progressionResult.message) {
                                toast.success(progressionResult.message, {
                                    duration: 4000,
                                });
                            } else {
                                toast.success(t.sectionCompleted);
                            }
                        } else {
                            console.error(
                                "XP award failed:",
                                progressionResult.error
                            );
                            toast.warning(
                                progressionResult.error || t.pointsError
                            );
                        }
                    } catch (xpError) {
                        console.error("Error awarding XP:", xpError);
                        toast.warning(t.pointsError);
                    }
                } else {
                    toast.success(t.sectionCompleted);
                }
            } else {
                // Handle server-side validation errors
                toast.error(data.error || t.completionError);
            }
        } catch (error: any) {
            console.error("Error marking section as completed:", error);
            
            // Handle specific error cases from backend validation
            if (error.response?.status === 400) {
                const errorMessage = error.response.data?.error;
                if (errorMessage?.includes("already completed")) {
                    toast.info("This section is already marked as completed");
                    setIsMarkedAsDone(true); // Update UI state
                } else if (errorMessage?.includes("not found")) {
                    toast.error("Section not found or is not available");
                } else {
                    toast.error(errorMessage || t.completionError);
                }
            } else {
                toast.error(t.completionError);
            }
        }
    };

    const handleMarkAsDone = () => {
        markSectionAsCompleted();
    };

    const getNextSectionId = (): string | null => {
        if (!module || !currentSection) return null;

        const activeSections = module.sections
            .filter((s) => s.isActive)
            .sort((a, b) => a.order - b.order);

        const currentIndex = activeSections.findIndex(
            (s) => s.id === currentSection.id
        );
        return currentIndex < activeSections.length - 1
            ? activeSections[currentIndex + 1].id
            : null;
    };    const handleNext = () => {
        setIsNavigating(true);
        const nextSectionId = getNextSectionId();
        if (nextSectionId) {
            router.push(`/module/${moduleId}/${nextSectionId}`);
        } else {
            // If no next section, go to quiz or back to module
            if (module?.quiz.isActive) {
                router.push(`/module/${moduleId}/quiz`);
            } else {
                router.push(`/module/${moduleId}`);
            }
        }
    };

    // TTS Functions
    const getTextContent = () => {
        if (!currentSection) return '';
        
        // Extract clean text from HTML
        const tempDiv = document.createElement('div');
        const displayContent = language === 'en' && currentSection.contentEn ? currentSection.contentEn : currentSection.content;
        tempDiv.innerHTML = displayContent;
        return tempDiv.textContent || tempDiv.innerText || '';
    };

    const startSpeaking = () => {
        if ('speechSynthesis' in window) {
            // Stop any ongoing speech
            setIsIntentionalStop(true);
            window.speechSynthesis.cancel();
            setIsIntentionalStop(false);
            
            const text = getTextContent();
            if (!text) return;
            
            speechRef.current = new SpeechSynthesisUtterance(text);
            speechRef.current.lang = language === 'id' ? 'id-ID' : 'en-US';
            speechRef.current.rate = 0.9;
            speechRef.current.pitch = 1;
            
            speechRef.current.onstart = () => {
                setIsSpeaking(true);
                setIsPaused(false);
            };
            
            speechRef.current.onend = () => {
                setIsSpeaking(false);
                setIsPaused(false);
            };
            
            speechRef.current.onerror = () => {
                setIsSpeaking(false);
                setIsPaused(false);
                
            };
            
            window.speechSynthesis.speak(speechRef.current);
        } else {
            toast.error(t.aria.browserNotSupported);
        }
    };

    const pauseSpeaking = () => {
        if (window.speechSynthesis.speaking && !window.speechSynthesis.paused) {
            window.speechSynthesis.pause();
            setIsPaused(true);
        }
    };

    const resumeSpeaking = () => {
        if (window.speechSynthesis.paused) {
            window.speechSynthesis.resume();
            setIsPaused(false);
        }
    };

    const stopSpeaking = () => {
        setIsIntentionalStop(true);
        window.speechSynthesis.cancel();
        setIsSpeaking(false);
        setIsPaused(false);
        // Reset flag after a brief delay to ensure error handler has processed
        setTimeout(() => setIsIntentionalStop(false), 100);
    };

    const toggleSpeech = () => {
        if (isSpeaking && !isPaused) {
            pauseSpeaking();
        } else if (isPaused) {
            resumeSpeaking();
        } else {
            startSpeaking();
        }
    };

    // Keyboard navigation
    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            // Alt + P: Toggle speech
            if (event.altKey && event.key === 'p') {
                event.preventDefault();
                toggleSpeech();
            }
            
            // Alt + S: Stop speech
            if (event.altKey && event.key === 's') {
                event.preventDefault();
                stopSpeaking();
            }
            
            // Alt + N: Next section (if marked as done)
            if (event.altKey && event.key === 'n' && isMarkedAsDone) {
                event.preventDefault();
                handleNext();
            }
            
            // Alt + M: Mark as done
            if (event.altKey && event.key === 'm' && !isMarkedAsDone) {
                event.preventDefault();
                handleMarkAsDone();
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isMarkedAsDone, isSpeaking, isPaused]);

    // Cleanup speech on unmount
    useEffect(() => {
        return () => {
            if (window.speechSynthesis) {
                window.speechSynthesis.cancel();
            }
        };
    }, []);

    if (loading) {
        return (
            <div className="bg-primary min-h-screen">
                {/* Header Section Skeleton */}
                <div className="px-4 py-6 relative">
                    <div className="absolute top-0 left-0 w-full h-full">
                        <Image
                            src={cloud}
                            alt="cloud pattern"
                            fill
                            className="object-cover"
                        />
                    </div>
                    <div className="relative z-10 flex items-center gap-3 animate-pulse">
                        <div className="w-12 h-12 bg-white/20 rounded-full"></div>
                        <div className="space-y-2">
                            <div className="h-6 bg-white/20 rounded w-48"></div>
                        </div>
                    </div>
                </div>

                {/* Content Section Skeleton */}
                <div className="p-6 bg-white rounded-t-4xl flex-grow flex flex-col animate-pulse">
                    <div className="mb-8">
                        {/* Illustrations area skeleton */}
                        <div className="rounded-xl py-6 px-4 mb-4 bg-gradient-to-b from-gray-200 to-gray-100 h-32">
                            <div className="flex justify-between sm:justify-center items-end sm:gap-12">
                                <div className="w-16 h-20 bg-gray-300 rounded"></div>
                                <div className="w-14 h-18 bg-gray-300 rounded"></div>
                                <div className="w-16 h-20 bg-gray-300 rounded"></div>
                            </div>
                        </div>

                        {/* Content skeleton */}
                        <div className="space-y-3">
                            <div className="h-4 bg-gray-200 rounded w-full"></div>
                            <div className="h-4 bg-gray-200 rounded w-11/12"></div>
                            <div className="h-4 bg-gray-200 rounded w-4/5"></div>
                            <div className="h-4 bg-gray-200 rounded w-full"></div>
                            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                            <div className="h-4 bg-gray-200 rounded w-full"></div>
                            <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                            <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                        </div>
                    </div>

                    {/* Navigation Buttons Skeleton */}
                    <div className="flex flex-wrap flex-row-reverse gap-4 justify-between pt-6 md:px-6 border-t mt-auto items-center">
                        <div className="h-10 bg-gray-200 rounded px-8 w-32"></div>
                        <div className="h-10 bg-gray-200 rounded px-6 w-28"></div>
                    </div>
                </div>
            </div>
        );
    }    if (!module || !currentSection) {
        return (
            <div className="bg-primary min-h-screen flex items-center justify-center">
                <div className="text-white text-xl">{t.sectionNotFound}</div>
            </div>
        );
    }
    return (
        <div 
            className="bg-primary min-h-screen font-jakarta sm:px-24 lg:px-50 mx-auto flex flex-col"
            role="main"
            aria-label={`${t.aria.moduleMain}: ${language === 'en' && currentSection.titleEn ? currentSection.titleEn : currentSection.title}`}
        >
            {/* Skip to content link for keyboard users */}
            <a 
                href="#main-content" 
                className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-white text-primary px-4 py-2 rounded z-50"
            >
                {t.aria.skipToContent}
            </a>
            
            {/* Header with section number and title */}
            <header
                className="bg-primary text-white p-6"
                style={{
                    backgroundImage: `url(${cloud.src})`,
                    backgroundRepeat: "repeat",
                    backgroundSize: "600px",
                }}
                role="banner"
            >
                <div className="flex items-center gap-2 my-5">
                    <div 
                        className="bg-white text-primary w-8 h-8 rounded-full flex items-center justify-center font-bold shrink-0"
                        aria-label={`${t.aria.sectionNumber} ${currentSection.order}`}
                    >
                        {currentSection.order}
                    </div>
                    <h1 className="text-xl font-bold">
                        {language === 'en' && currentSection.titleEn ? currentSection.titleEn : currentSection.title}
                    </h1>
                </div>
                
                {/* TTS Controls */}
                <div className="flex items-center gap-2 mt-4">
                    <Button
                        onClick={toggleSpeech}
                        variant="outline"
                        size="sm"
                        className="bg-white/10 border-white/30 text-white hover:bg-white/20"
                        aria-label={
                            isSpeaking 
                                ? (isPaused ? t.aria.resumeTTS : t.aria.pauseTTS)
                                : t.aria.playTTS
                        }
                        aria-describedby="tts-instructions"
                    >
                        {isSpeaking ? (
                            isPaused ? <Play className="w-4 h-4" /> : <Pause className="w-4 h-4" />
                        ) : (
                            <Volume2 className="w-4 h-4" />
                        )}
                        <span className="ml-2">
                            {isSpeaking ? (isPaused ? t.resumeText : t.pauseText) : t.readText}
                        </span>
                    </Button>
                    
                    {isSpeaking && (
                        <Button
                            onClick={stopSpeaking}
                            variant="outline"
                            size="sm"
                            className="bg-white/10 border-white/30 text-white hover:bg-white/20"
                            aria-label={t.aria.stopTTS}
                        >
                            <VolumeX className="w-4 h-4" />
                            <span className="ml-2">Stop</span>
                        </Button>
                    )}
                </div>
                
                {/* Hidden instructions for screen readers */}
                <div id="tts-instructions" className="sr-only">
                    {t.aria.keyboardInstructions}
                </div>
            </header>

            {/* Content Section */}
            <main 
                className="p-6 bg-white rounded-t-4xl flex-grow flex flex-col"
                id="main-content"
                role="main"
            >
                <div className="mb-8">
                    {/* Illustrations - Hidden from screen readers as they're decorative */}
                    <div 
                        className="rounded-xl py-6 px-4 mb-4 flex justify-between sm:justify-center items-end sm:gap-6 bg-gradient-to-b from-orange-unesco to-white"
                        aria-hidden="true"
                        role="img"
                        aria-label={t.aria.decorativeIllustration}
                    >
                        <Image 
                            src={owlRead} 
                            alt=""
                            className="w-1/4 h-auto" 
                            role="presentation"
                        />
                        <Image
                            src={owlVibe}
                            alt=""
                            className="w-1/4 h-auto"
                            role="presentation"
                        />
                        <Image
                            src={owlWave}
                            alt=""
                            className="w-1/4 h-auto"
                            role="presentation"
                        />
                        <Image
                            src={owlHappy}
                            alt=""
                            className="w-1/4 h-auto"
                            role="presentation"
                        />
                    </div>

                    {/* Section Content */}
                    <div
                        ref={contentRef}
                        className="text-sm mb-4 prose prose-sm max-w-none"
                        dangerouslySetInnerHTML={{
                            __html: language === 'en' && currentSection.contentEn ? currentSection.contentEn : currentSection.content,
                        }}
                        role="article"
                        aria-labelledby="section-title"
                        tabIndex={0}
                        aria-describedby="content-instructions"
                    />
                    
                    <div id="content-instructions" className="sr-only">
                        {t.aria.contentInstructions}
                    </div>
                </div>

                {/* Navigation Buttons */}
                <nav 
                    className="flex flex-wrap flex-row-reverse gap-4 justify-between pt-6 md:px-6 border-t mt-auto items-center"
                    role="navigation"
                    aria-label={t.aria.navigationMain}
                >
                    <Button
                        className={`px-8 flex items-center gap-2 cursor-pointer transition-all duration-300 ${
                            isMarkedAsDone
                                ? " text-primary ring-1 ring-primary bg-white hover:bg-primary hover:text-white"
                                : "bg-primary hover:bg-primary/90 text-white"
                        } ${isNavigating ? 'opacity-50' : ''}`}
                        onClick={isMarkedAsDone ? handleNext : handleMarkAsDone}
                        disabled={(!isMarkedAsDone && loading) || isNavigating}
                        aria-label={
                            isMarkedAsDone 
                                ? t.aria.nextSectionButton
                                : t.aria.markAsDoneButton
                        }
                        aria-describedby="primary-button-desc"
                    >
                        <span>{isNavigating ? t.loading : (isMarkedAsDone ? t.nextSection : t.markAsDone)}</span>
                        {!isNavigating && (isMarkedAsDone ? (
                            <ArrowRight className="w-5 h-5" aria-hidden="true" />
                        ) : (
                            <Check className="w-5 h-5" aria-hidden="true" />
                        ))}
                    </Button>

                    <Button
                        variant="outline"
                        className="px-6 cursor-pointer"
                        onClick={() => router.push(`/module/${moduleId}`)}
                        aria-label={t.aria.backToModuleButton}
                    >
                        {t.backToModule}
                    </Button>
                    
                    <div id="primary-button-desc" className="sr-only">
                        {isMarkedAsDone 
                            ? t.aria.primaryButtonDescNext
                            : t.aria.primaryButtonDesc
                        }
                    </div>
                </nav>
            </main>
        </div>
    );
}
