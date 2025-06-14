"use client";

import { Download, FileText, CheckCircle, HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import cloud from "@/assets/cloudPattern.svg";
import { useRouter, useParams } from "next/navigation";
import { useState, useEffect } from "react";
import { toast } from "sonner";

interface Module {
    id: string;
    title: string;
    description: string;
    difficulty: 'Easy' | 'Intermediate' | 'Advanced';
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

export default function DetailModule() {
    const router = useRouter();
    const params = useParams();
    const id = params.id as string;
    
    const [module, setModule] = useState<Module | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (id) {
            fetchModule();
        }
    }, [id]);    const fetchModule = async () => {
        try {
            const response = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080"}/api/v1/modules/${id}`,
                {
                    credentials: "include",
                }
            );

            const data = await response.json();

            if (data.success) {
                setModule(data.data);
                // Module access is automatically tracked on the backend when fetching module details
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
    };

    const isSectionCompleted = (sectionId: string): boolean => {
        return module?.progress?.completedSections.includes(sectionId) || false;
    };

    const getCompletedSectionsCount = (): number => {
        return module?.progress?.completedSections.length || 0;
    };

    const getTotalSectionsCount = (): number => {
        return module?.sections.filter(section => section.isActive).length || 0;
    };

    const isQuizCompleted = (): boolean => {
        return module?.progress?.quizCompleted || false;
    };

    const getQuizScore = (): number | undefined => {
        return module?.progress?.quizScore;
    };

    const getProgressPercentage = (): number => {
        return module?.progress?.completionPercentage || 0;
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-primary flex items-center justify-center">
                <div className="text-white text-xl">Loading module...</div>
            </div>
        );
    }

    if (!module) {
        return (
            <div className="min-h-screen bg-primary flex items-center justify-center">
                <div className="text-white text-xl">Module not found</div>
            </div>
        );
    }

    return (
        <div
            className="mx-auto font-jakarta bg-primary min-h-screen sm:px-24 lg:px-40 flex flex-col bg-repeat bg-[length:600px] lg:bg-[length:900px]"
            style={{
                backgroundImage: `url(${cloud.src})`,
            }}
        >

            {/* Content Section */}
            <div className="bg-white rounded-t-4xl p-6 sm:p-8 shadow-md relative flex-grow mt-30 flex flex-col">
                <div className="relative -top-24 flex flex-col gap-6">
                    {/* Card */}
                    <div className=" bg-white rounded-3xl shadow-lg p-6 w-max flex flex-col gap-2 self-center">
                        <div className="flex items-center justify-between">                            <div className="flex items-center gap-3">
                                <div className="bg-primary p-2 rounded-lg">
                                    <FileText className="text-white" size={28} />
                                </div>
                                <span className="text-primary text-md font-bold">
                                    Module {module.order}
                                </span>
                            </div>
                            <Button
                                variant="ghost"
                                size="icon"
                                className="text-primary"                                onClick={() => {
                                    // TODO: Implement download functionality
                                    toast.info("Fitur unduh segera hadir!");
                                }}
                            >
                                <Download size={22} />
                            </Button>
                        </div>                        <div className="mt-2">
                            <div className="flex items-center gap-2 mb-2">
                                <div className="text-md sm:text-xl font-semibold text-primary">
                                    {module.title}
                                </div>
                                <span
                                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                                        module.difficulty === "Easy"
                                            ? "bg-green-100 text-green-800"
                                            : module.difficulty === "Intermediate"
                                            ? "bg-yellow-100 text-yellow-800"
                                            : "bg-red-100 text-red-800"
                                    }`}
                                >
                                    {module.difficulty === "Easy" ? "Mudah" : 
                                     module.difficulty === "Intermediate" ? "Menengah" : "Sulit"}
                                </span>
                            </div>
                            <div className="text-gray-400 text-sm mt-1">
                                Bagian {getCompletedSectionsCount()}/{getTotalSectionsCount()} | Kuis {isQuizCompleted() ? "1/1" : "0/1"}
                            </div>
                            <div className="flex items-center gap-2 mt-2">
                                <div className="flex-1 h-2 bg-gray-200 rounded-full">
                                    <div
                                        className="h-2 bg-pink-500 rounded-full transition-all duration-300"
                                        style={{ width: `${getProgressPercentage()}%` }}
                                    />
                                </div>
                                <span className="text-primary font-semibold text-sm ml-2">
                                    {getProgressPercentage()}%
                                </span>
                            </div>
                        </div>
                    </div>                    {/* Module Description */}
                    <div className="bg-white rounded-xl shadow-sm p-6">
                        <h2 className="text-lg font-bold text-primary mb-3">
                            Deskripsi Modul
                        </h2>
                        <div 
                            className="text-gray-700 prose prose-sm max-w-none leading-relaxed"
                            dangerouslySetInnerHTML={{ __html: module.description }}
                        />
                    </div>

                    {/* Sections Heading */}
                    <h2 className="text-xl font-bold text-primary">
                        Materi
                    </h2>
                    <div className="relative flex flex-col gap-3">
                        {/* Vertical line */}
                        <div className="absolute left-[14px] top-0 bottom-0 w-1 bg-gray-200 z-0 rounded-full" />
                        {/* Stepper + Cards */}
                        {module.sections
                            .filter(section => section.isActive)
                            .sort((a, b) => a.order - b.order)
                            .map((section, idx) => (
                            <div
                                key={section.id}
                                className="flex items-center relative z-10"
                            >
                                {/* Stepper Icon */}
                                <div className="w-8 flex justify-center items-center">
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
                                    <div
                                        className="bg-white border rounded-xl p-3 flex items-center justify-between cursor-pointer hover:bg-gray-50 transition shadow-md"
                                        onClick={() =>
                                            router.push(`/module/${id}/${section.id}`)
                                        }
                                    >
                                        <div>
                                            <div className="text-primary font-medium">
                                                {idx + 1}. {section.title}
                                            </div>
                                            <div className="text-xs text-gray-400">
                                                {section.duration}
                                            </div>
                                        </div>
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            className="text-primary hover:text-primary/80 hover:bg-primary/10 rounded-lg cursor-pointer"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                if (section.pdfUrl) {
                                                    window.open(section.pdfUrl, '_blank');
                                                } else {
                                                    toast.info("No PDF available for this section");
                                                }
                                            }}
                                        >
                                            <Download size={20} />
                                        </Button>
                                    </div>
                                </div>
                            </div>                        ))}                        {/* Quiz row */}
                        {module.quiz.isActive && (
                            <div key={`quiz-${module.quiz.id}`} className="flex items-center mt-2 relative z-10">
                                <div className="w-8 flex justify-center items-center">
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
                                    <div
                                        className="bg-gradient-to-r shadow-md from-primary to-blue-400 text-white rounded-xl p-3 flex items-center justify-between cursor-pointer hover:opacity-90 transition"
                                        onClick={() =>
                                            router.push(`/module/${id}/quiz`)
                                        }
                                    >
                                        <div>
                                            <div className="font-semibold">
                                                {module.quiz.title}
                                            </div>
                                            <div className="text-xs">
                                                {module.quiz.duration} • {module.quiz.totalQuestions} questions
                                                {isQuizCompleted() && getQuizScore() !== undefined && (
                                                    <span> • Score: {getQuizScore()}%</span>
                                                )}
                                            </div>
                                        </div>
                                        <FileText
                                            className="text-white opacity-60"
                                            size={28}
                                        />
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
