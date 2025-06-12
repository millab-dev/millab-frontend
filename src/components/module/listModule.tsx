"use client";

import { Download, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import cloud from "@/assets/cloudPattern.svg";
import Image from "next/image";
import rabbit from "@/assets/rabbitBook.svg";
import { useRouter } from "next/navigation";
import Navbar from "../core/Navbar";

export default function ListModule() {
    const router = useRouter();

    // Mock data for the modules
    const modules = [
        { id: 1, title: "Pengantar Literasi Media & Informasi", progress: 20 },
        { id: 2, title: "Pengantar Literasi Media & Informasi", progress: 20 },
        { id: 3, title: "Pengantar Literasi Media & Informasi", progress: 20 },
    ];

    const handleModuleClick = (id: number) => {
        router.push(`/module/${id}`);
    };

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
                        </h1>
                        <p className="text-white/90 mb-4">14 Modul</p>
                        <Button
                            variant="secondary"
                            className="flex items-center gap-2"
                        >
                            <Download size={18} />
                            Download All
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
                    </h2>

                    {/* Module List */}
                    <div className="space-y-4">
                        {modules.map((module) => (
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
                                    </div>
                                    <div className="w-full">
                                        <h3 className="font-semibold text-primary max-sm:text-sm">
                                            {module.id}. {module.title}
                                        </h3>
                                        <div className="h-2 bg-gray-200 rounded-full mt-2">
                                            <div
                                                className="h-2 bg-pink-500 rounded-full"
                                                style={{
                                                    width: `${module.progress}%`,
                                                }}
                                            ></div>
                                        </div>
                                        <div className="text-xs text-gray-500 mt-1">
                                            {module.progress}%
                                        </div>
                                    </div>
                                </div>

                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="text-primary hover:text-primary/80 hover:bg-primary/10 rounded-lg cursor-pointer"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        // Handle download functionality here
                                    }}
                                >
                                    <Download size={20} />
                                </Button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}
