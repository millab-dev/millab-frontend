"use client";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

interface IntroductionSectionProps {
    language?: "id" | "en";
}

const introductionTranslations = {
    id: {
        title: "Tentang Kami",
        description: "Gemalar Indonesia (formerly MIL Lab Indonesia) adalah ruang belajar yang dipimpin pemuda sejak 2024, tempat anak muda berekspresi, bertumbuh, dan menjadi bagian dari generasi cerdas serta kreatif. Sebagai laboratorium ide dan pusat kolaborasi, kami mendorong literasi media partisipatif dan inovatif untuk melawan disinformasi, kekerasan digital, dan bias informasi.",
        supportedBy: "Didukung Oleh",
        moreInfo: "Info Lengkap"
    },
    en: {
        title: "About Us",
        description: "Gemalar Indonesia (formerly MIL Lab Indonesia) is a youth-led learning space since 2024, where young people express themselves, grow, and become part of a smart and creative generation. As an idea laboratory and collaboration center, we encourage participatory and innovative media literacy to combat disinformation, digital violence, and information bias.",
        supportedBy: "Supported By",
        moreInfo: "More Info"
    }
};

const IntroductionSection = ({ language = 'id' }: IntroductionSectionProps) => {
    const t = introductionTranslations[language];

    return (
        <motion.div 
            className="w-full bg-white"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
        >
            {/* About Us Section */}
            <div className="mb-8">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl md:text-2xl font-bold text-[#0077D4]">
                        {t.title}
                    </h2>
                    <Link 
                        href="/about-us"
                        className="flex items-center gap-2 text-gray-500 hover:text-[#0077D4] transition-colors text-sm md:text-base"
                    >
                        {t.moreInfo}
                        <svg 
                            className="w-4 h-4" 
                            fill="none" 
                            stroke="currentColor" 
                            viewBox="0 0 24 24"
                        >
                            <path 
                                strokeLinecap="round" 
                                strokeLinejoin="round" 
                                strokeWidth={2} 
                                d="M9 5l7 7-7 7" 
                            />
                        </svg>
                    </Link>
                </div>
                
                <p className="text-gray-700 leading-relaxed text-sm md:text-base">
                    {t.description}
                </p>
            </div>

            {/* Supported By Section */}
            <div>
                <h3 className="text-xl md:text-2xl font-bold text-[#0077D4] mb-6">
                    {t.supportedBy}
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
                    {/* Social Media 4 Peace */}
                    <motion.div 
                        className="flex justify-center items-center"
                    >
                        <Image
                            src="/socialmedia4peace.png"
                            alt="Social Media 4 Peace"
                            width={200}
                            height={100}
                            className="w-full h-auto max-h-[150px] object-contain"
                        />
                    </motion.div>

                    {/* UNESCO */}
                    <motion.div 
                        className="flex justify-center items-center"
                    >
                        <Image
                            src="/unesco.png"
                            alt="UNESCO"
                            width={200}
                            height={100}
                            className="w-full h-auto max-h-[150px] object-contain"
                        />
                    </motion.div>

                    {/* European Union */}
                    <motion.div 
                        className="flex justify-center items-center"
                    >
                        <Image
                            src="/europeunion.jpg"
                            alt="Funded by the European Union"
                            width={200}
                            height={100}
                            className="w-full h-auto max-h-[150px] object-contain"
                        />
                    </motion.div>
                </div>
            </div>
        </motion.div>
    );
};

export default IntroductionSection;
