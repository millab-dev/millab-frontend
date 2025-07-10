"use client";

import { Button } from "@/components/ui/button";
import React, { useState, useEffect } from "react";
import cloud from "@/assets/cloudPattern.svg";
import Image from "next/image";
import owlRead from "/public/owl-read.png";
import owlVibe from "/public/owl-vibe.png";
import owlWave from "/public/owl-wave.png";
import owlHappy from "/public/owl-happy.png";
import { useRouter, useParams } from "next/navigation";
import { Check, ArrowRight } from "lucide-react";
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
    description: string;
    order: number;
    difficulty: "Easy" | "Intermediate" | "Advanced";
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

interface SectionModuleProps extends SectionProps {}

export default function SectionModule({ language = 'id' }: SectionModuleProps) {
    const router = useRouter();
    const params = useParams();
    const moduleId = params.id as string;
    const sectionId = params.section as string;

    // Get translations based on language
    const t = sectionModuleTranslations[language];const [module, setModule] = useState<Module | null>(null);
    const [currentSection, setCurrentSection] = useState<ModuleSection | null>(
        null
    );
    const [loading, setLoading] = useState(true);
    const [isMarkedAsDone, setIsMarkedAsDone] = useState(false);
    const [isNavigating, setIsNavigating] = useState(false);

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
                    // Check if section is already completed
                    setIsMarkedAsDone(
                        data.data.progress?.completedSections.includes(
                            sectionId
                        ) || false
                    );                } else {
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
        try {
            // Mark section as completed in existing system
            const response = await axiosClient.post(
                `/api/v1/modules/${moduleId}/sections/${sectionId}/complete`
            );
            const data = response.data;

            if (data.success) {
                setIsMarkedAsDone(true);

                // Update the module progress locally
                if (module) {
                    setModule({
                        ...module,
                        progress: data.data,
                    });
                } // Award XP through progression system
                if (module?.difficulty) {
                    console.log(
                        "Attempting to award XP for section:",
                        sectionId,
                        "difficulty:",
                        module.difficulty
                    );
                    try {
                        const progressionResult = await awardSectionXP(
                            sectionId,
                            module.difficulty
                        );
                        console.log("Progression result:", progressionResult);                        if (progressionResult.success) {
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
                    console.log(
                        "No module difficulty found, skipping XP award"
                    );
                    toast.success(t.sectionCompleted);
                }
            } else {
                toast.error(
                    data.error || t.completionError
                );
            }
        } catch (error) {
            console.error("Error marking section as completed:", error);
            toast.error(t.completionError);
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
    };if (loading) {
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
        <div className="bg-primary min-h-screen font-jakarta sm:px-24 lg:px-50 mx-auto flex flex-col">
            {/* Header with section number and title */}
            <div
                className="bg-primary text-white p-6"
                style={{
                    backgroundImage: `url(${cloud.src})`,
                    backgroundRepeat: "repeat",
                    backgroundSize: "600px",
                }}
            >
                <div className="flex items-center gap-2 my-5">
                    <div className="bg-white text-primary w-8 h-8 rounded-full flex items-center justify-center font-bold shrink-0">
                        {currentSection.order}
                    </div>
                    <h1 className="text-xl font-bold">
                        {currentSection.title}
                    </h1>
                </div>
            </div>

            {/* Content Section */}
            <div className="p-6 bg-white rounded-t-4xl flex-grow flex flex-col">
                <div className="mb-8">                    {/* Illustrations */}
                    <div className="rounded-xl py-6 px-4 mb-4 flex justify-between sm:justify-center items-end sm:gap-6 bg-gradient-to-b from-orange-unesco to-white [x">
                        <Image 
                            src={owlRead} 
                            alt="owl-read" 
                            className="w-1/4 h-auto" 
                        />
                        <Image
                            src={owlVibe}
                            alt="owl-vibe"
                            className="w-1/4 h-auto"
                        />
                        <Image
                            src={owlWave}
                            alt="owl-wave"
                            className="w-1/4 h-auto"
                        />
                        <Image
                            src={owlHappy}
                            alt="owl-happy"
                            className="w-1/4 h-auto"
                        />
                    </div>

                    {/* Section Content */}
                    <div
                        className="text-sm mb-4 prose prose-sm max-w-none"
                        dangerouslySetInnerHTML={{
                            __html: currentSection.content,
                        }}
                    />
                </div>

                {/* Navigation Buttons */}
                <div className="flex flex-wrap flex-row-reverse gap-4 justify-between pt-6 md:px-6 border-t mt-auto items-center">                    <Button
                        className={`px-8 flex items-center gap-2 cursor-pointer transition-all duration-300 ${
                            isMarkedAsDone
                                ? " text-primary ring-1 ring-primary bg-white hover:bg-primary hover:text-white"
                                : "bg-primary hover:bg-primary/90 text-white"
                        } ${isNavigating ? 'opacity-50' : ''}`}
                        onClick={isMarkedAsDone ? handleNext : handleMarkAsDone}
                        disabled={(!isMarkedAsDone && loading) || isNavigating}
                    >
                        <span>{isNavigating ? t.loading : (isMarkedAsDone ? t.nextSection : t.markAsDone)}</span>
                        {!isNavigating && (isMarkedAsDone ? (
                            <ArrowRight className="w-5 h-5" />
                        ) : (
                            <Check className="w-5 h-5" />
                        ))}
                    </Button>                    <Button
                        variant="outline"
                        className="px-6 cursor-pointer"
                        onClick={() => router.push(`/module/${moduleId}`)}
                    >
                        {t.backToModule}
                    </Button>
                </div>
            </div>
        </div>
    );
}
