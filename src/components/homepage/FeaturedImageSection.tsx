"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { SectionProps, featuredImageTranslations } from "./types";
import Image from "next/image";
import moonbear from "@/assets/MoonBear-Hello.svg";

const FeaturedImageSection = ({ language = "id" }: SectionProps) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.3 });

    // Get translations based on language
    const t = featuredImageTranslations[language];

    return (
        <motion.div
            ref={ref}
            className="w-full"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.7 }}
            id="fyi"
        >
            {/* Overlay text */}
            <div className="flex justify-between text-white p-6 md:px-8 md:py-20 bg-orange-unesco rounded-3xl relative overflow-hidden">
                <Image src={moonbear} alt="Founder" className="absolute top-0 right-0 z-0 max-md:w-40 max-md:h-40" />
                <div className="flex flex-col justify-center z-10">
                    <motion.h3
                        className="text-base md:text-2xl mb-2"
                        initial={{ opacity: 0, y: 20 }}
                        animate={
                            isInView
                                ? { opacity: 1, y: 0 }
                                : { opacity: 0, y: 20 }
                        }
                        transition={{ duration: 0.6, delay: 0.3 }}
                    >
                        {t.title}
                    </motion.h3>
                    {/* Mobile description */}
                    <div className="md:hidden">
                        {t.descriptionMobile.map((line, index) => (
                            <motion.div
                                key={`mobile-${index}`}
                                className="text-2xl font-medium"
                                initial={{ opacity: 0, y: 10 }}
                                animate={
                                    isInView
                                        ? { opacity: 1, y: 0 }
                                        : { opacity: 0, y: 10 }
                                }
                                transition={{
                                    duration: 0.6,
                                    delay: 0.5 + index * 0.1,
                                }}
                            >
                                {line}
                            </motion.div>
                        ))}
                    </div>
                    {/* Desktop description */}
                    <div className="hidden md:block">
                        {t.descriptionDesktop.map((line, index) => (
                            <motion.div
                                key={`desktop-${index}`}
                                className="text-4xl font-medium"
                                initial={{ opacity: 0, y: 10 }}
                                animate={
                                    isInView
                                        ? { opacity: 1, y: 0 }
                                        : { opacity: 0, y: 10 }
                                }
                                transition={{
                                    duration: 0.6,
                                    delay: 0.5 + index * 0.1,
                                }}
                            >
                                {line}
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default FeaturedImageSection;
