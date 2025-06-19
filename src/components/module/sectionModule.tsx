"use client";

import { Button } from "@/components/ui/button";
import React, { useState, useEffect } from "react";
import cloud from "@/assets/cloudPattern.svg";
import Image from "next/image";
import bear from "@/assets/bear.svg";
import squirrel from "@/assets/squirrel.svg";
import rabbit from "@/assets/rabbitBook.svg";
import { useRouter, useParams } from "next/navigation";
import { Check, ArrowRight } from "lucide-react";
import { toast } from "sonner";
import axiosClient from "@/lib/axios.client";

interface Module {
    id: string;
    title: string;
    description: string;
    order: number;
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
    pdfUrl?: string;
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

export default function SectionModule() {
    const router = useRouter();
    const params = useParams();
    const moduleId = params.id as string;
    const sectionId = params.section as string;
    
    const [module, setModule] = useState<Module | null>(null);
    const [currentSection, setCurrentSection] = useState<ModuleSection | null>(null);
    const [loading, setLoading] = useState(true);
    const [isMarkedAsDone, setIsMarkedAsDone] = useState(false);

    useEffect(() => {
        if (moduleId && sectionId) {
            fetchModuleData();
        }
    }, [moduleId, sectionId]);

    const fetchModuleData = async () => {
        try {
            const response = await axiosClient.get(`/api/v1/modules/${moduleId}`);
            const data = response.data;

            if (data.success) {
                setModule(data.data);
                
                // Find the current section
                const section = data.data.sections.find((s: ModuleSection) => s.id === sectionId);
                if (section) {
                    setCurrentSection(section);
                    // Check if section is already completed
                    setIsMarkedAsDone(data.data.progress?.completedSections.includes(sectionId) || false);
                } else {
                    toast.error("Section not found");
                    router.push(`/module/${moduleId}`);
                }
            } else {
                toast.error(data.error || "Failed to fetch module");
                router.push("/module");
            }
        } catch (error) {
            console.error("Error fetching module:", error);
            toast.error("Failed to fetch module");
            router.push("/module");
        } finally {
            setLoading(false);
        }
    };    const markSectionAsCompleted = async () => {
        try {
            const response = await axiosClient.post(`/api/v1/modules/${moduleId}/sections/${sectionId}/complete`);
            const data = response.data;

            if (data.success) {
                setIsMarkedAsDone(true);
                toast.success("Section completed successfully!");
                
                // Update the module progress locally
                if (module) {
                    setModule({
                        ...module,
                        progress: data.data
                    });
                }
            } else {
                toast.error(data.error || "Failed to mark section as completed");
            }
        } catch (error) {
            console.error("Error marking section as completed:", error);
            toast.error("Failed to mark section as completed");
        }
    };

    const handleMarkAsDone = () => {
        markSectionAsCompleted();
    };

    const getNextSectionId = (): string | null => {
        if (!module || !currentSection) return null;
        
        const activeSections = module.sections
            .filter(s => s.isActive)
            .sort((a, b) => a.order - b.order);
        
        const currentIndex = activeSections.findIndex(s => s.id === currentSection.id);
        return currentIndex < activeSections.length - 1 ? activeSections[currentIndex + 1].id : null;
    };

    const handleNext = () => {
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

    if (loading) {
        return (
            <div className="bg-primary min-h-screen flex items-center justify-center">
                <div className="text-white text-xl">Loading section...</div>
            </div>
        );
    }

    if (!module || !currentSection) {
        return (
            <div className="bg-primary min-h-screen flex items-center justify-center">
                <div className="text-white text-xl">Section not found</div>
            </div>
        );
    }    return (
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
                    <div className="bg-white text-primary w-8 h-8 rounded-full flex items-center justify-center font-bold">
                        {currentSection.order}
                    </div>
                    <h1 className="text-xl font-bold">{currentSection.title}</h1>
                </div>
            </div>

            {/* Content Section */}
            <div className="p-6 bg-white rounded-t-4xl flex-grow flex flex-col">
                <div className="mb-8">
                    {/* Illustrations */}
                    <div className="rounded-xl py-6 px-4 mb-4 flex justify-between sm:justify-center items-end sm:gap-12 bg-gradient-to-b from-[#FFB9DA] to-white">
                        <Image
                            src={bear}
                            alt="bear"
                            className="w-22 h-auto"
                        />
                        <Image
                            src={rabbit}
                            alt="rabbit"
                            className="w-18 h-auto"
                        />
                        <Image
                            src={squirrel}
                            alt="squirrel"
                            className="w-22 h-auto"
                        />
                    </div>

                    {/* Section Content */}
                    <div 
                        className="text-sm mb-4 prose prose-sm max-w-none"
                        dangerouslySetInnerHTML={{ __html: currentSection.content }}
                    />
                </div>

                {/* Navigation Buttons */}
                <div className="flex justify-between pt-6 px-6 border-t mt-auto items-center">
                    <Button
                        variant="outline"
                        className="px-8 cursor-pointer"
                        onClick={() => router.push(`/module/${moduleId}`)}
                    >
                        Back to Module
                    </Button>

                    <Button
                        className={`px-8 flex items-center gap-2 cursor-pointer transition-all duration-300 ${
                            isMarkedAsDone
                                ? " text-primary ring-1 ring-primary bg-white hover:bg-primary hover:text-white"
                                : "bg-primary hover:bg-primary/90 text-white"
                        }`}
                        onClick={isMarkedAsDone ? handleNext : handleMarkAsDone}
                        disabled={!isMarkedAsDone && loading}
                    >
                        <span>{isMarkedAsDone ? "Next" : "Mark as Done"}</span>
                        {isMarkedAsDone ? (
                            <ArrowRight className="w-5 h-5" />
                        ) : (
                            <Check className="w-5 h-5" />
                        )}
                    </Button>
                </div>
            </div>
        </div>
    );
}
