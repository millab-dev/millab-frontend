"use client";

import { Download, FileText, Play, Pause, Square } from "lucide-react";
import { Button } from "@/components/ui/button";
import cloud from "@/assets/cloudPattern.svg";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { toast } from "sonner";
import axiosClient from "@/lib/axios.client";
import { downloadAllPdf } from "@/utils/settingsApi";
import owlComputer from "/public/owl-computer.png";
import { 
    Module, 
    SectionProps, 
    listModuleTranslations, 
} from "./types";
import { 
    getModuleTitle, 
    getModuleDescription, 
    getLanguageVersionBadge,
    hasEnglishVersion 
} from '@/utils/moduleLanguageUtils';

interface ListModuleProps extends SectionProps {}

export default function ListModule({ language = 'id' }: ListModuleProps) {
    console.log(language);
    const router = useRouter();
    const [modules, setModules] = useState<Module[]>([]);
    const [loading, setLoading] = useState(true);
    const [navigatingModuleId, setNavigatingModuleId] = useState<string | null>(null);

    // TTS state
    const [isSpeaking, setIsSpeaking] = useState(false);
    const [isPaused, setIsPaused] = useState(false);
    const [isIntentionalStop, setIsIntentionalStop] = useState(false);
    const [currentSpeakingModule, setCurrentSpeakingModule] = useState<string | null>(null);
    const speechRef = useRef<SpeechSynthesisUtterance | null>(null);

    // Get translations based on language
    const t = listModuleTranslations[language];

    useEffect(() => {
        fetchModules();
    }, []);

    // Cleanup TTS on unmount
    useEffect(() => {
        return () => {
            if (window.speechSynthesis) {
                window.speechSynthesis.cancel();
            }
        };
    }, []);

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
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isSpeaking, isPaused, currentSpeakingModule]);

    // TTS Helper Functions
    const cleanTextForSpeech = (html: string): string => {
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = html;
        return tempDiv.textContent || tempDiv.innerText || '';
    };

    const buildModuleContentForSpeech = (module: Module): string => {
        let content = '';
        
        // Module title and difficulty
        const displayTitle = getModuleTitle(module, language, '', module.order);
        content += `${t.aria.moduleTitle}: ${displayTitle}. `;
        content += `${t.aria.difficultyBadge}: ${t.difficulty[module.difficulty]}. `;
        
        // Module description
        const displayDescription = getModuleDescription(module, language);
        const cleanDesc = cleanTextForSpeech(displayDescription);
        if (cleanDesc) {
            content += `Deskripsi: ${cleanDesc}. `;
        }
        
        // Progress information
        const progress = module.progress?.completionPercentage || 0;
        content += `${t.aria.moduleProgress}: ${progress}% ${t.completed}. `;
        
        // Sections information
        content += `${module.sections.length} ${t.sections}. `;
        
        // Quiz information
        content += `${t.quiz}: ${module.quiz.totalQuestions} ${t.questions}. `;
        
        // Quiz score if completed
        if (module.progress?.quizCompleted && module.progress?.quizScore) {
            content += `${t.score}: ${module.progress.quizScore}%. `;
        }
        
        return content;
    };

    const startSpeaking = (module: Module) => {
        if (!window.speechSynthesis) {
            toast.error(t.aria.browserNotSupported);
            return;
        }

        const content = buildModuleContentForSpeech(module);
        if (!content.trim()) return;

        const utterance = new SpeechSynthesisUtterance(content);
        utterance.lang = language === 'en' ? 'en-US' : 'id-ID';
        utterance.rate = 0.9;
        utterance.pitch = 1;

        utterance.onstart = () => {
            setIsSpeaking(true);
            setIsPaused(false);
            setIsIntentionalStop(false);
            setCurrentSpeakingModule(module.id);
        };

        utterance.onend = () => {
            setIsSpeaking(false);
            setIsPaused(false);
            setCurrentSpeakingModule(null);
        };

        utterance.onerror = () => {
            setIsSpeaking(false);
            setIsPaused(false);
            setCurrentSpeakingModule(null);
           
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
        setCurrentSpeakingModule(null);
    };

    const toggleSpeech = () => {
        if (isSpeaking) {
            if (isPaused) {
                resumeSpeaking();
            } else {
                pauseSpeaking();
            }
        } else {
            // Start speaking the first module if no module is currently selected
            if (modules.length > 0) {
                startSpeaking(modules[0]);
            }
        }
    };

    const fetchModules = async () => {
        try {
            const response = await axiosClient.get('/api/v1/modules/');
            const data = response.data;

            if (data.success) {
                setModules(data.data);
            } else {
                toast.error(data.error || t.fetchError);
            }
        } catch (error) {
            console.error("Error fetching modules:", error);
            toast.error(t.fetchError);
        } finally {
            setLoading(false);
        }
    };

    const handleModuleClick = (id: string) => {
        setNavigatingModuleId(id);
        router.push(`/module/${id}`);
    };

    const downloadAllModules = async () => {
        try {
            const success = await downloadAllPdf(language);
            if (!success) {
                toast.info(t.downloadNotConfigured);
            }
        } catch (error) {
            console.error("Error downloading all modules:", error);
            toast.error(t.downloadError);
        }
    };

    if (loading) {
        return (
            <div
                className="mx-auto font-jakarta bg-primary sm:px-24 lg:px-40 min-h-screen flex flex-col 
                bg-repeat bg-[length:600px] lg:bg-[length:900px]"
                style={{
                    backgroundImage: `url(${cloud.src})`,
                }}
            >
                {/* Header Section Skeleton */}
                <div className="p-8 flex justify-between items-center relative overflow-hidden animate-pulse">
                    <div className="z-0 space-y-4">
                        <div className="h-8 bg-white/20 rounded w-64"></div>
                        <div className="h-5 bg-white/20 rounded w-24"></div>
                        <div className="h-10 bg-white/20 rounded w-32"></div>
                    </div>
                    <div className="absolute top-10 right-5 w-16 h-16 bg-white/20 rounded"></div>
                </div>

                {/* Content Section Skeleton */}
                <div className="bg-white rounded-t-4xl p-6 sm:p-8 shadow-md flex-grow">
                    <div className="animate-pulse">
                        <div className="h-6 bg-gray-200 rounded w-32 mb-6"></div>
                        
                        {/* Module List Skeleton */}
                        <div className="space-y-4">
                            {[1, 2, 3, 4, 5].map((item) => (
                                <div
                                    key={item}
                                    className="border rounded-xl p-4 flex items-center justify-between gap-4 shadow-md"
                                >
                                    <div className="flex items-center gap-4 w-full">
                                        <div className="bg-gray-200 p-3 rounded-lg w-12 h-12"></div>
                                        <div className="flex-1 space-y-2">
                                            <div className="flex items-center justify-between">
                                                <div className="space-y-2">
                                                    <div className="h-5 bg-gray-200 rounded w-48"></div>
                                                    <div className="h-4 bg-gray-200 rounded w-32"></div>
                                                </div>
                                                <div className="h-4 bg-gray-200 rounded w-16"></div>
                                            </div>
                                            <div className="space-y-2">
                                                <div className="h-3 bg-gray-200 rounded w-24"></div>
                                                <div className="w-full bg-gray-200 rounded-full h-2"></div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="w-6 h-6 bg-gray-200 rounded"></div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <>
            
            
            {/* Skip to content link for accessibility */}
            <a
                href="#main-content"
                className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:bg-primary focus:text-white focus:px-4 focus:py-2 focus:rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white"
            >
                {t.aria.skipToContent}
            </a>
            
            {/* Hidden instructions for screen readers */}
            <div className="sr-only">
                <p>{t.aria.keyboardInstructions}</p>
                <p>{t.aria.navigationInstructions}</p>
            </div>
            
            <main
                id="main-content"
                role="main"
                aria-label={t.aria.moduleMain}
                className="mx-auto font-jakarta bg-primary sm:px-24 lg:px-40 min-h-screen flex flex-col 
                bg-repeat bg-[length:600px] lg:bg-[length:900px]"
                style={{
                    backgroundImage: `url(${cloud.src})`,
                }}
            >
                {/* Header Section with blue background */}
                <header className="p-8 flex justify-between items-center relative overflow-hidden">
                    <div className="z-0">
                        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-2">
                            {t.pageTitle}
                        </h1>
                        <p className="text-white/90 mb-4">{modules.length} {t.moduleCount}</p>
                        <div className="flex items-center gap-2">
                            <Button
                                variant="secondary"
                                className="flex items-center gap-2"
                                onClick={downloadAllModules}
                                aria-label={t.aria.downloadAllButton}
                            >
                                <Download size={18} />
                                {t.downloadAll}
                            </Button>
                            
                            {/* TTS Controls */}
                            <div className="flex items-center gap-1">
                                <Button
                                    variant="secondary"
                                    size="icon"
                                    onClick={toggleSpeech}
                                    aria-label={
                                        isSpeaking
                                            ? isPaused
                                                ? t.aria.resumeTTS
                                                : t.aria.pauseTTS
                                            : t.aria.playTTS
                                    }
                                    title={
                                        isSpeaking
                                            ? isPaused
                                                ? t.aria.resumeTTS
                                                : t.aria.pauseTTS
                                            : t.aria.playTTS
                                    }
                                >
                                    {isSpeaking ? (
                                        isPaused ? (
                                            <Play size={16} />
                                        ) : (
                                            <Pause size={16} />
                                        )
                                    ) : (
                                        <Play size={16} />
                                    )}
                                </Button>
                                
                                {isSpeaking && (
                                    <Button
                                        variant="secondary"
                                        size="icon"
                                        onClick={stopSpeaking}
                                        aria-label={t.aria.stopTTS}
                                        title={t.aria.stopTTS}
                                    >
                                        <Square size={16} />
                                    </Button>
                                )}
                            </div>
                        </div>
                        
                        <Image
                            src={owlComputer}
                            alt=""
                            aria-hidden="true"
                            width={156}
                            height={156}
                            className="absolute top-10 right-5"
                        />
                    </div>
                </header>

                {/* Content Section with white background */}
                <section className="bg-white rounded-t-4xl p-6 sm:p-8 shadow-md flex-grow">
                    <h2 className="text-xl font-bold text-primary mb-6">
                        {t.moduleList}
                    </h2>
                    
                    {/* Module List */}
                    <div 
                        className="space-y-4"
                        role="region"
                        aria-label={t.aria.moduleListSection}
                    >
                        {modules.length === 0 ? (
                            <div className="text-center py-8" role="status">
                                <p className="text-gray-500" aria-label={t.aria.noModulesMessage}>
                                    {t.noModules}
                                </p>
                            </div>
                        ) : (
                            modules.map((module) => {
                                const progress = module.progress?.completionPercentage || 0;
                                const isCurrentSpeaking = currentSpeakingModule === module.id;
                                
                                return (
                                    <article
                                        key={module.id}
                                        className={`border rounded-xl p-4 shadow-md hover:bg-gray-50 transition-all duration-100 ${
                                            navigatingModuleId === module.id ? 'opacity-50 pointer-events-none' : ''
                                        }`}
                                        role="article"
                                        aria-label={`${t.aria.moduleCard}: ${getModuleTitle(module, language, '', module.order)}`}
                                    >
                                        <div className="flex items-center justify-between gap-4">
                                            <button
                                                className="flex items-center gap-4 w-full text-left cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-lg p-2"
                                                onClick={() => handleModuleClick(module.id)}
                                                disabled={navigatingModuleId === module.id}
                                                aria-label={`${t.aria.moduleItem}: ${getModuleTitle(module, language, '', module.order)}, ${t.difficulty[module.difficulty]}, ${progress}% ${t.completed}`}
                                            >
                                                <div className="bg-gradient-to-r from-primary to-primary/80 p-3 rounded-lg">
                                                    <FileText
                                                        className="text-white"
                                                        size={24}
                                                        aria-hidden="true"
                                                    />
                                                </div>
                                                
                                                <div className="w-full">
                                                    <div className="flex items-center gap-2 mb-1">
                                                        <h3 className="font-semibold text-primary max-sm:text-sm">
                                                            {module.order}. {getModuleTitle(module, language, '', 0).replace(/^\d+\.\s*/, '')}
                                                        </h3>
                                                        
                                                        <div className="flex items-center gap-2">
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
                                                            
                                                            {/* Language version indicator */}
                                                            {/* {(() => {
                                                                const languageInfo = getLanguageVersionBadge(module, language);
                                                                return languageInfo.badge && (
                                                                    <span 
                                                                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                                                                            languageInfo.fallback 
                                                                                ? 'bg-orange-100 text-orange-800' 
                                                                                : language === 'en' 
                                                                                    ? 'bg-blue-100 text-blue-800' 
                                                                                    : 'bg-green-100 text-green-800'
                                                                        }`}
                                                                        title={languageInfo.fallback 
                                                                            ? `Content shown in fallback language` 
                                                                            : `Content available in ${language === 'en' ? 'English' : 'Indonesian'}`
                                                                        }
                                                                    >
                                                                        {languageInfo.badge}
                                                                    </span>
                                                                );
                                                            })()} */}
                                                        </div>
                                                    </div>
                                                    
                                                    <div 
                                                        className="text-gray-600 text-sm mt-1 max-sm:text-xs prose prose-sm max-w-none line-clamp-2"                                                        dangerouslySetInnerHTML={{
                                                            __html: (() => {
                                                                const displayDescription = getModuleDescription(module, language);
                                                                return displayDescription.length > 150 
                                                                    ? displayDescription.substring(0, 150) + '...' 
                                                                    : displayDescription;
                                                            })()
                                                        }}
                                                    />
                                                    
                                                    <div className="flex items-center gap-2 mt-2 text-xs text-gray-500">
                                                        <span>{module.sections.length} {t.sections}</span>
                                                        <span>•</span>
                                                        <span>{t.quiz}: {module.quiz.totalQuestions} {t.questions}</span>
                                                        {module.progress?.quizCompleted && (
                                                            <>
                                                                <span>•</span>
                                                                <span className="text-green-600 font-medium">
                                                                    {t.score}: {module.progress.quizScore}%
                                                                </span>
                                                            </>
                                                        )}
                                                    </div>
                                                    
                                                    <div 
                                                        className="h-2 bg-gray-200 rounded-full mt-2"
                                                        role="progressbar"
                                                        aria-valuenow={progress}
                                                        aria-valuemin={0}
                                                        aria-valuemax={100}
                                                        aria-label={`${t.aria.moduleProgress}: ${progress}% ${t.completed}`}
                                                    >
                                                        <div
                                                            className="h-2 bg-pink-500 rounded-full transition-all duration-300"
                                                            style={{
                                                                width: `${progress}%`,
                                                            }}
                                                        ></div>
                                                    </div>
                                                    
                                                    <div className="text-xs text-gray-500 mt-1">
                                                        {progress}% {t.completed}
                                                    </div>
                                                </div>
                                            </button>
                                            
                                            <div className="flex items-center gap-1">
                                                {/* Individual TTS Controls for this module */}
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        if (isCurrentSpeaking) {
                                                            if (isPaused) {
                                                                resumeSpeaking();
                                                            } else {
                                                                pauseSpeaking();
                                                            }
                                                        } else {
                                                            startSpeaking(module);
                                                        }
                                                    }}
                                                    aria-label={
                                                        isCurrentSpeaking
                                                            ? isPaused
                                                                ? t.aria.resumeTTS
                                                                : t.aria.pauseTTS
                                                            : t.aria.playTTS
                                                    }
                                                    title={
                                                        isCurrentSpeaking
                                                            ? isPaused
                                                                ? t.aria.resumeTTS
                                                                : t.aria.pauseTTS
                                                            : t.aria.playTTS
                                                    }
                                                    className="text-primary hover:text-primary/80 hover:bg-primary/10 rounded-lg"
                                                >
                                                    {isCurrentSpeaking ? (
                                                        isPaused ? (
                                                            <Play size={16} />
                                                        ) : (
                                                            <Pause size={16} />
                                                        )
                                                    ) : (
                                                        <Play size={16} />
                                                    )}
                                                </Button>
                                                
                                                {isCurrentSpeaking && (
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            stopSpeaking();
                                                        }}
                                                        aria-label={t.aria.stopTTS}
                                                        title={t.aria.stopTTS}
                                                        className="text-primary hover:text-primary/80 hover:bg-primary/10 rounded-lg"
                                                    >
                                                        <Square size={16} />
                                                    </Button>
                                                )}
                                                
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    className="text-primary hover:text-primary/80 hover:bg-primary/10 rounded-lg cursor-pointer"
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        if (module.pdfUrl) {
                                                            window.open(module.pdfUrl, '_blank');
                                                        } else {
                                                            toast.info(t.noPdfAvailable);
                                                        }
                                                    }}
                                                    aria-label={`${t.aria.downloadModule}: ${language === 'en' && module.titleEn ? module.titleEn : module.title}`}
                                                >
                                                    <Download size={20} />
                                                </Button>
                                            </div>
                                        </div>
                                    </article>
                                );
                            })
                        )}
                    </div>
                </section>
            </main>
        </>
    );
}
