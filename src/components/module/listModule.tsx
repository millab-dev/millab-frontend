"use client";

import { Download, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import cloud from "@/assets/cloudPattern.svg";
import Image from "next/image";
import rabbit from "@/assets/rabbitBook.svg";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import Navbar from "../core/Navbar";
import axiosClient from "@/lib/axios.client";

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

export default function ListModule() {
    const router = useRouter();
    const [modules, setModules] = useState<Module[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchModules();
    }, []);

    const fetchModules = async () => {
        try {
            const response = await axiosClient.get('/api/v1/modules/');
            const data = response.data;

            if (data.success) {
                setModules(data.data);
            } else {
                toast.error(data.error || "Failed to fetch modules");
            }
        } catch (error) {
            console.error("Error fetching modules:", error);
            toast.error("Failed to fetch modules");
        } finally {
            setLoading(false);
        }
    };

    const handleModuleClick = (id: string) => {
        router.push(`/module/${id}`);
    };    const downloadAllModules = () => {
        // TODO: Implement download all functionality
        toast.info("Fitur unduh semua segera hadir!");
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-primary flex items-center justify-center">
                <div className="text-white text-xl">Loading modules...</div>
            </div>
        );
    }

    return (
        <>
           
            <div
                className="mx-auto font-jakarta bg-primary sm:px-24 lg:px-40 min-h-screen flex flex-col 
                bg-repeat bg-[length:600px] lg:bg-[length:900px]"
                style={{
                    backgroundImage: `url(${cloud.src})`,
                }}
            >
                {/* Header Section with blue background */}
                <div className="p-8 flex justify-between items-center relative overflow-hidden">
                    <div className="z-0">
                        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-2">
                            Modul Pembelajaran
                        </h1>                        <p className="text-white/90 mb-4">{modules.length} Modul</p>                        <Button
                            variant="secondary"
                            className="flex items-center gap-2"
                            onClick={downloadAllModules}
                        >
                            <Download size={18} />
                            Unduh Semua
                        </Button>
                        <Image
                            src={rabbit}
                            alt="rabbit"
                            className="absolute top-10 right-5"
                        />
                    </div>
                </div>

                {/* Content Section with white background */}
                <div className="bg-white rounded-t-4xl p-6 sm:p-8 shadow-md flex-grow">
                    <h2 className="text-xl font-bold text-primary mb-6">
                        Daftar Modul
                    </h2>                    {/* Module List */}
                    <div className="space-y-4">
                        {modules.length === 0 ? (                            <div className="text-center py-8">
                                <p className="text-gray-500">Tidak ada modul yang tersedia saat ini.</p>
                            </div>
                        ) : (
                            modules.map((module) => {
                                const progress = module.progress?.completionPercentage || 0;
                                return (
                                    <div
                                        key={module.id}
                                        className="border rounded-xl p-4 flex items-center justify-between gap-4 cursor-pointer shadow-md hover:bg-gray-50 transition-all duration-100"
                                        onClick={() => handleModuleClick(module.id)}
                                    >
                                        <div className="flex items-center gap-4 w-full">
                                            <div className="bg-gradient-to-r from-primary to-primary/80 p-3 rounded-lg">
                                                <FileText
                                                    className="text-white"
                                                    size={24}
                                                />
                                            </div>                                            <div className="w-full">
                                                <div className="flex items-center gap-2 mb-1">
                                                    <h3 className="font-semibold text-primary max-sm:text-sm">
                                                        {module.order}. {module.title}
                                                    </h3>
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
                                                <div 
                                                    className="text-gray-600 text-sm mt-1 max-sm:text-xs prose prose-sm max-w-none line-clamp-2"
                                                    dangerouslySetInnerHTML={{ 
                                                        __html: module.description.length > 150 
                                                            ? module.description.substring(0, 150) + '...' 
                                                            : module.description 
                                                    }}
                                                />
                                                <div className="flex items-center gap-2 mt-2 text-xs text-gray-500">
                                                    <span>{module.sections.length} bagian</span>
                                                    <span>•</span>
                                                    <span>Kuis: {module.quiz.totalQuestions} pertanyaan</span>
                                                    {module.progress?.quizCompleted && (
                                                        <>
                                                            <span>•</span>
                                                            <span className="text-green-600 font-medium">
                                                                Skor: {module.progress.quizScore}%
                                                            </span>
                                                        </>
                                                    )}
                                                </div>
                                                <div className="h-2 bg-gray-200 rounded-full mt-2">
                                                    <div
                                                        className="h-2 bg-pink-500 rounded-full transition-all duration-300"
                                                        style={{
                                                            width: `${progress}%`,
                                                        }}
                                                    ></div>
                                                </div>
                                                <div className="text-xs text-gray-500 mt-1">
                                                    {progress}% selesai
                                                </div>
                                            </div>
                                        </div>

                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            className="text-primary hover:text-primary/80 hover:bg-primary/10 rounded-lg cursor-pointer"                                            onClick={(e) => {
                                                e.stopPropagation();
                                                // TODO: Implement individual module download
                                                toast.info("Unduh modul segera hadir!");
                                            }}
                                        >
                                            <Download size={20} />
                                        </Button>
                                    </div>
                                );
                            })
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}
