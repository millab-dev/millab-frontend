"use client";

import { Button } from "@/components/ui/button";
import React from "react";
import cloud from "@/assets/cloudPattern.svg";
import Image from "next/image";
import bear from "@/assets/bear.svg";
import squirrel from "@/assets/squirrel.svg";
import rabbit from "@/assets/rabbitBook.svg";

import { Check } from "lucide-react";

export default function SectionModule() {
    // You would typically fetch this content from an API
    // This is mockup data based on the image
    const moduleContent = {
        id: 1,
        title: "Memahami Literasi Media & Informasi",
        content: [
            {
                sectionTitle: "Peranan Media yang Beragam",
                description:
                    "Pertama, jika kita berbicara tentang berbagai peran media, kita tidak akan lepas dari media berita yang didefinisikan sebagai sumber informasi terkini yang dapat diandalkan. Informasi yang mereka berikan dibuat melalui proses jurnalistik yang menghargai akuntabilitas redaksi. Tulisan ini mengakui bahwa terkadang media mungkin tidak memenuhi standar ini, seperti ketika mereka menyebarkan misinformasi atau propaganda. Batasan antara media tradisional dan penyedia konten lainnya semakin kabur. Peran media tidak terbatas hanya pada penyediaan informasi, tetapi juga:",
                bulletPoints: [
                    {
                        title: "Menginformasikan:",
                        description:
                            "Menyediakan informasi tentang peristiwa dan isu",
                    },
                    {
                        title: "Mendidik:",
                        description:
                            "Menawarkan kesempatan untuk belajar dan memperoleh pengetahuan",
                    },
                    {
                        title: "Menghibur:",
                        description:
                            "Menyediakan konten untuk bersantai dan bersenang-senang",
                    },
                    {
                        title: "Mempengaruhi dan Membujuk:",
                        description: "Membentuk opini dan perilaku",
                    },
                    {
                        title: "Bertindak sebagai Forum Publik:",
                        description:
                            "Memfasilitasi diskusi dan debat tentang topik-topik penting",
                    },
                ],
            },
        ],
    };

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
                    <div className="bg-white text-primary w-8 h-8 rounded-full flex items-center justify-center font-bold">
                        {moduleContent.id}
                    </div>
                    <h1 className="text-xl font-bold">{moduleContent.title}</h1>
                </div>
            </div>

            {/* Content Section */}
            <div className="p-6 bg-white rounded-t-4xl flex-grow flex flex-col">
                {moduleContent.content.map((section, index) => (
                    <div key={index} className="mb-8">
                        {/* Illustrations */}
                        <div className="rounded-xl py-6 px-4 mb-4 flex justify-between sm:justify-center items-end sm:gap-12 bg-gradient-to-b from-[#FFB9DA] to-white">
                            <Image src={bear} alt="bear" className="w-22 h-auto"/>
                            <Image src={rabbit} alt="rabbit" className="w-18 h-auto"/>
                            <Image src={squirrel} alt="squirrel" className="w-22 h-auto" />
                        </div>

                        {/* Section Title and Content */}
                        <h2 className="text-lg font-bold mb-3">
                            {section.sectionTitle}
                        </h2>
                        <p className="text-sm mb-4">{section.description}</p>

                        {/* Bullet Points */}
                        <ul className="space-y-2">
                            {section.bulletPoints.map((point, idx) => (
                                <li key={idx} className="flex gap-2">
                                    <span className="text-sm">•</span>
                                    <div>
                                        <span className="font-semibold text-sm">
                                            {point.title}
                                        </span>
                                        <span className="text-sm">
                                            {" "}
                                            {point.description}
                                        </span>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
                {/* Navigation Buttons */}
                <div className="flex justify-between pt-6 px-6 border-t mt-auto items-center">
                    <Button variant="outline" className="px-8">
                        Prev
                    </Button>
                    <Button className="bg-primary text-white px-8 flex items-center gap-2">
                        <span>Mark as Done</span>
                        <Check className="w-5 h-5" />
                    </Button>
                </div>
            </div>
        </div>
    );
}
