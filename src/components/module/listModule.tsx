"use client";

import { Download, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import cloud from "@/assets/cloud.svg";
import Image from "next/image";
import rabbit from "@/assets/rabbitBook.svg";

export default function ListModule() {
    // Mock data for the modules
    const modules = [
        { id: 1, title: "Pengantar Literasi Media & Informasi", progress: 20 },
        { id: 2, title: "Pengantar Literasi Media & Informasi", progress: 20 },
        { id: 3, title: "Pengantar Literasi Media & Informasi", progress: 20 },
        { id: 4, title: "Pengantar Literasi Media & Informasi", progress: 20 },
        { id: 5, title: "Pengantar Literasi Media & Informasi", progress: 20 },
        { id: 6, title: "Pengantar Literasi Media & Informasi", progress: 20 },
    ];

    return (
        <div className="mx-auto font-jakarta bg-primary sm:px-24 lg:px-50">
            {/* Header Section with blue background */}
            <div className="bg-primary p-8 flex justify-between items-center relative overflow-hidden">
                <div className="z-10">
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
                </div>
                <div className="absolute inset-0 z-0">
                    <Image
                        src={rabbit}
                        alt="cloud"
                        className="absolute top-10 right-5"
                    />
                    <Image
                        src={cloud}
                        alt="cloud"
                        className="absolute -top-2 right-0 scale-125"
                    />
                    <Image
                        src={cloud}
                        alt="cloud"
                        className="absolute top-10 left-1/2 -translate-x-1/2 scale-125"
                    />
                    <Image
                        src={cloud}
                        alt="cloud"
                        className="absolute -top-4 left-0 scale-125"
                    />
                    <Image
                        src={cloud}
                        alt="cloud"
                        className="absolute -bottom-6 left-1/4 -translate-x-1/2 scale-125"
                    />
                    <Image
                        src={cloud}
                        alt="cloud"
                        className="absolute -bottom-6 right-1/4 translate-x-1/2 scale-125"
                    />
                </div>
            </div>

            {/* Content Section with white background */}
            <div className="bg-white rounded-t-4xl p-6 sm:p-8 shadow-md ">
                <h2 className="text-xl font-bold text-primary mb-6">
                    Daftar Modul
                </h2>

                {/* Module List */}
                <div className="space-y-4">
                    {modules.map((module) => (
                        <div
                            key={module.id}
                            className="border rounded-xl p-4 flex items-center justify-between gap-4"
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
                                className="text-primary"
                            >
                                <Download size={20} />
                            </Button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
