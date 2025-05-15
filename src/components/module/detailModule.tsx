"use client";

import { Download, FileText, CheckCircle, HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import cloud from "@/assets/cloudPattern.svg";

export default function DetailModule() {
    // Mock data for the materi/steps
    const materi = [
        {
            id: 1,
            title: "Memahami Literasi Media & Informasi",
            duration: "2 min",
            done: true,
        },
        {
            id: 2,
            title: "Memahami Literasi Media & Informasi",
            duration: "2 min",
            done: false,
        },
        {
            id: 3,
            title: "Memahami Literasi Media & Informasi",
            duration: "2 min",
            done: false,
        },
        {
            id: 4,
            title: "Memahami Literasi Media & Informasi",
            duration: "2 min",
            done: false,
        },
    ];

    return (
        <div className="mx-auto font-jakarta bg-primary min-h-screen sm:px-24 lg:px-50">
            {/* Header Section with blue background and clouds */}
            <div className="bg-primary p-8 relative overflow-hidden h-[150px]">
                {/* Clouds as background pattern */}
                <div
                    className="absolute inset-0 z-0"
                    style={{
                        backgroundImage: `url(${cloud.src})`,
                        backgroundRepeat: "repeat",
                        backgroundSize: "600px",
                    }}
                />
            </div>

            {/* Content Section */}
            <div className="bg-white rounded-t-4xl p-6 sm:p-8 shadow-md relative min-h-screen">
                {/* Card */}
                <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-white rounded-3xl shadow-lg p-6 w-max flex flex-col gap-2">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="bg-primary p-2 rounded-lg">
                                <FileText className="text-white" size={28} />
                            </div>
                            <span className="text-primary text-md font-bold">
                                Modul 1
                            </span>
                        </div>
                        <Button
                            variant="ghost"
                            size="icon"
                            className="text-primary"
                        >
                            <Download size={22} />
                        </Button>
                    </div>
                    <div className="mt-2">
                        <div className="text-md sm:text-xl font-semibold text-primary">
                            Pengantar Literasi Media & Informasi
                        </div>
                        <div className="text-gray-400 text-sm mt-1">
                            Rangkuman 1/4 | Quiz 0/1
                        </div>
                        <div className="flex items-center gap-2 mt-2">
                            <div className="flex-1 h-2 bg-gray-200 rounded-full">
                                <div
                                    className="h-2 bg-pink-500 rounded-full"
                                    style={{ width: "20%" }}
                                />
                            </div>
                            <span className="text-primary font-semibold text-sm ml-2">
                                20%
                            </span>
                        </div>
                    </div>
                </div>
                <h2 className="text-xl font-bold text-primary mt-32 mb-6">Materi</h2>
                <div className="flex">
                    {/* Stepper */}
                    <div className="flex flex-col items-center mr-4">
                        {materi.map((item, idx) => (
                            <div
                                key={item.id}
                                className="flex flex-col items-center"
                            >
                                {item.done ? (
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
                                {idx < materi.length - 1 && (
                                    <div className="w-1 h-8 bg-gray-200" />
                                )}
                            </div>
                        ))}
                        {/* Quiz step */}
                        <div className="flex flex-col items-center">
                            <HelpCircle
                                className="text-primary bg-white rounded-full border-2 border-primary"
                                size={28}
                            />
                        </div>
                    </div>
                    {/* Materi List */}
                    <div className="flex-1 space-y-3">
                        {materi.map((item, idx) => (
                            <div
                                key={item.id}
                                className="bg-white border rounded-xl p-3 flex items-center justify-between shadow-sm"
                            >
                                <div>
                                    <div className="text-primary font-medium">
                                        {idx + 1}. {item.title}
                                    </div>
                                    <div className="text-xs text-gray-400">
                                        {item.duration}
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
                        {/* Quiz Section */}
                        <div className="mt-4">
                            <div className="bg-gradient-to-r from-primary to-blue-400 text-white rounded-xl p-3 flex items-center justify-between shadow">
                                <div>
                                    <div className="font-semibold">
                                        Quiz 1: Pengantar Literasi Media
                                    </div>
                                    <div className="text-xs">2 min</div>
                                </div>
                                <FileText
                                    className="text-white opacity-60"
                                    size={28}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
