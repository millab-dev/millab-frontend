"use client";

import { Download, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import cloud from "@/assets/cloudPattern.svg";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import Navbar from "../core/Navbar";
import axiosClient from "@/lib/axios.client";
import { downloadAllPdf } from "@/utils/settingsApi";
import owlComputer from "/public/owl-computer.png";
import { 
    Module, 
    ModuleSection,
    ModuleQuiz,
    UserProgress,
    SectionProps, 
    listModuleTranslations,
    Language 
} from "./types";

interface ListModuleProps extends SectionProps {}

export default function ListModule({ language = 'id' }: ListModuleProps) {
    const router = useRouter();
    const [modules, setModules] = useState<Module[]>([]);
    const [loading, setLoading] = useState(true);
    const [navigatingModuleId, setNavigatingModuleId] = useState<string | null>(null);

    // Get translations based on language
    const t = listModuleTranslations[language];

    useEffect(() => {
        fetchModules();
    }, []);    const fetchModules = async () => {
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
    };    const handleModuleClick = (id: string) => {
        setNavigatingModuleId(id);
        router.push(`/module/${id}`);
    };const downloadAllModules = async () => {
        try {
            const success = await downloadAllPdf();
            if (!success) {
                toast.info(t.downloadNotConfigured);
            }
        } catch (error) {
            console.error("Error downloading all modules:", error);
            toast.error(t.downloadError);
        }
    };if (loading) {
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
           
            <div
                className="mx-auto font-jakarta bg-primary sm:px-24 lg:px-40 min-h-screen flex flex-col 
                bg-repeat bg-[length:600px] lg:bg-[length:900px]"
                style={{
                    backgroundImage: `url(${cloud.src})`,
                }}
            >                {/* Header Section with blue background */}
                <div className="p-8 flex justify-between items-center relative overflow-hidden">
                    <div className="z-0">
                        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-2">
                            {t.pageTitle}
                        </h1>
                        <p className="text-white/90 mb-4">{modules.length} {t.moduleCount}</p>
                        <Button
                            variant="secondary"
                            className="flex items-center gap-2"
                            onClick={downloadAllModules}
                        >
                            <Download size={18} />
                            {t.downloadAll}
                        </Button>                        <Image
                            src={owlComputer}
                            alt="owl-computer"
                            width={156}
                            height={156}
                            className="absolute top-10 right-5"
                        />
                    </div>
                </div>                {/* Content Section with white background */}
                <div className="bg-white rounded-t-4xl p-6 sm:p-8 shadow-md flex-grow">
                    <h2 className="text-xl font-bold text-primary mb-6">
                        {t.moduleList}
                    </h2>
                    {/* Module List */}
                    <div className="space-y-4">
                        {modules.length === 0 ? (
                            <div className="text-center py-8">
                                <p className="text-gray-500">{t.noModules}</p>
                            </div>
                        ) : (
                            modules.map((module) => {
                                const progress = module.progress?.completionPercentage || 0;
                                return (                                    <div
                                        key={module.id}
                                        className={`border rounded-xl p-4 flex items-center justify-between gap-4 cursor-pointer shadow-md hover:bg-gray-50 transition-all duration-100 ${
                                            navigatingModuleId === module.id ? 'opacity-50 pointer-events-none' : ''
                                        }`}
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
                                                    </h3>                                                    <span
                                                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                                                            module.difficulty === "Easy"
                                                                ? "bg-green-100 text-green-800"
                                                                : module.difficulty === "Intermediate"
                                                                ? "bg-yellow-100 text-yellow-800"
                                                                : "bg-red-100 text-red-800"
                                                        }`}
                                                    >
                                                        {t.difficulty[module.difficulty]}
                                                    </span>
                                                </div>
                                                <div 
                                                    className="text-gray-600 text-sm mt-1 max-sm:text-xs prose prose-sm max-w-none line-clamp-2"
                                                    dangerouslySetInnerHTML={{ 
                                                        __html: module.description.length > 150 
                                                            ? module.description.substring(0, 150) + '...' 
                                                            : module.description 
                                                    }}
                                                />                                                <div className="flex items-center gap-2 mt-2 text-xs text-gray-500">
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
                                                <div className="h-2 bg-gray-200 rounded-full mt-2">
                                                    <div
                                                        className="h-2 bg-pink-500 rounded-full transition-all duration-300"
                                                        style={{
                                                            width: `${progress}%`,
                                                        }}
                                                    ></div>
                                                </div>                                                <div className="text-xs text-gray-500 mt-1">
                                                    {progress}% {t.completed}
                                                </div>
                                            </div>
                                        </div>                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            className="text-primary hover:text-primary/80 hover:bg-primary/10 rounded-lg cursor-pointer"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                if (module.pdfUrl) {
                                                    window.open(module.pdfUrl, '_blank');                                                } else {
                                                    toast.info(t.noPdfAvailable);
                                                }
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
