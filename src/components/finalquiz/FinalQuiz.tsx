"use client";

import { Gamepad2 } from "lucide-react";
import beginnerIcon from "@/assets/beginnerIcon.svg";
import intermediateIcon from "@/assets/intermediateIcon.svg";
import advancedIcon from "@/assets/advancedIcon.svg";
import Image from "next/image";
import star from "@/assets/star.svg";
import cloud from "@/assets/cloudPatternBlue.svg";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { UserScore } from "@/actions/userScore.get-score";
import Link from "next/link";
import { motion } from "framer-motion";
import { Language, finalQuizTranslations } from "./types";

export interface FinalQuizProps {
    userScore: UserScore;
    language?: Language;
}

export default function FinalQuiz({ userScore, language = 'id' } : FinalQuizProps) {
    // Get translations based on language
    const t = finalQuizTranslations[language];
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
                delayChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { 
            opacity: 0, 
            y: 30,
            scale: 0.95
        },
        visible: { 
            opacity: 1, 
            y: 0,
            scale: 1,
            transition: {
                duration: 0.6,
                ease: "easeOut"
            }
        }
    };

    const cardVariants = {
        hidden: { 
            opacity: 0, 
            x: -20,
            scale: 0.98
        },
        visible: { 
            opacity: 1, 
            x: 0,
            scale: 1,
            transition: {
                duration: 0.5,
                ease: "easeOut"
            }
        },
        hover: {
            scale: 1.02,
            transition: {
                duration: 0.2,
                ease: "easeInOut"
            }
        }
    };

    const scoreVariants = {
        hidden: { 
            opacity: 0, 
            scale: 0.8,
            rotateX: -15
        },
        visible: { 
            opacity: 1, 
            scale: 1,
            rotateX: 0,
            transition: {
                duration: 0.8,
                ease: "easeOut"
            }
        }
    };

    return (
        <div className="min-h-screen p-4 font-jakarta py-12 bg-[#F8F8F8] bg-repeat bg-[length:600px] lg:bg-[length:800px]"
             style={{
                 backgroundImage: `url(${cloud.src})`,
             }}>
            <motion.div 
                className="max-w-4xl mx-auto"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                {/* Header */}
                <motion.h1 
                    className="text-4xl font-bold text-center text-primary mb-8"
                    variants={itemVariants as any}
                >
                    {t.readyToPlay}
                </motion.h1>

                {/* Score Section */}
                <motion.div 
                    className="bg-gradient-to-r from-primary to-blue-400 rounded-2xl p-8 mb-6 text-white relative overflow-hidden"
                    variants={scoreVariants as any}
                >
                    {/* Decorative stars/elements */}
                    <motion.div 
                        className="absolute top-4 right-8 opacity-20"
                        initial={{ rotate: -180, scale: 0 }}
                        animate={{ rotate: 0, scale: 1 }}
                        transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
                    >
                        <Image src={star} alt="star" className="w-30 h-30" />
                    </motion.div>

                    <div className="relative z-10">
                        <motion.p 
                            className="text-lg mb-2 opacity-90"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 0.9, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.3 }}
                        >
                            {t.youveScored}
                        </motion.p>
                        <motion.h2 
                            className="text-5xl font-bold mb-3"
                            initial={{ opacity: 0, scale: 0.5 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ 
                                duration: 0.8, 
                                delay: 0.5,
                                type: "spring",
                                bounce: 0.4
                            }}
                        >
                            {userScore.score} {t.points}
                        </motion.h2>
                        <motion.p 
                            className="text-lg opacity-90 mb-6"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 0.9, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.7 }}
                        >
                            {t.beatRecord}
                        </motion.p>

                        {/* How to Play Button with Modal */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.9 }}
                        >
                            <Dialog>
                                <DialogTrigger asChild>
                                    <motion.button 
                                        className="bg-white text-primary font-semibold px-8 py-3 rounded-lg hover:bg-gray-100 transition-colors 
                                        duration-200 flex items-center gap-2 w-full justify-center text-lg cursor-pointer"
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                    >
                                        <Gamepad2 className="w-6 h-6" />
                                        {t.howToPlay}
                                    </motion.button>
                                </DialogTrigger>
                                <DialogContent className="max-w-md w-full rounded-2xl p-8 font-jakarta">
                                    <DialogHeader>
                                        <DialogTitle className="text-3xl font-bold text-center mb-6">{t.howToPlay}</DialogTitle>
                                    </DialogHeader>
                                    <div className="space-y-4 mb-6">
                                        {t.steps.map((step, idx) => (
                                            <motion.div 
                                                key={idx} 
                                                className="flex items-center gap-4"
                                                initial={{ opacity: 0, x: -20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ duration: 0.4, delay: idx * 0.1 }}
                                            >
                                                <div className="w-10 h-10 flex items-center justify-center rounded-full bg-blue-100 text-primary font-bold text-lg">
                                                    {idx + 1}
                                                </div>
                                                <div className="text-base font-medium text-gray-800 flex-1">
                                                    {step}
                                                </div>
                                            </motion.div>
                                        ))}
                                    </div>
                                    <DialogClose asChild>
                                        <Button className="w-full mt-2" variant="default">{t.understand}</Button>
                                    </DialogClose>
                                </DialogContent>
                            </Dialog>
                        </motion.div>
                    </div>
                </motion.div>

                {/* Difficulty Levels */}
                <motion.div 
                    className="space-y-4"
                    variants={itemVariants as any}
                >
                    {/* Beginner */}
                    <motion.div 
                        className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-200 cursor-pointer group"
                        variants={cardVariants as any}
                        whileHover="hover"
                    >
                        <Link href="/final-quiz/beginner">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <motion.div 
                                        className="p-2 bg-primary rounded-xl flex items-center justify-center flex-shrink-0"
                                        whileHover={{ rotate: 5 }}
                                        transition={{ duration: 0.2 }}
                                    >
                                        <Image src={beginnerIcon} alt="beginner" className="w-5 h-5" />
                                    </motion.div>
                                    <div>
                                        <h3 className="text-xl font-semibold text-primary mb-1">
                                            {t.levels.beginner.title}
                                        </h3>
                                        <p className="text-gray-600">
                                            {t.levels.beginner.description}
                                        </p>
                                    </div>
                                </div>
                                <motion.div 
                                    className="text-gray-400 group-hover:text-gray-600 transition-colors"
                                    whileHover={{ x: 3 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <svg
                                        className="w-6 h-6"
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
                                </motion.div>
                            </div>
                        </Link>
                    </motion.div>

                    {/* Intermediate */}
                    <motion.div 
                        className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-200 cursor-pointer group"
                        variants={cardVariants as any}
                        whileHover="hover"
                    >
                        <Link href="/final-quiz/intermediate">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <motion.div 
                                        className="p-2 bg-primary rounded-xl flex items-center justify-center flex-shrink-0"
                                        whileHover={{ rotate: 5 }}
                                        transition={{ duration: 0.2 }}
                                    >
                                        <Image src={intermediateIcon} alt="intermediate" className="w-5 h-5" />
                                    </motion.div>
                                    <div>
                                        <h3 className="text-xl font-semibold text-primary mb-1">
                                            {t.levels.intermediate.title}
                                        </h3>
                                        <p className="text-gray-600">
                                            {t.levels.intermediate.description}
                                        </p>
                                    </div>
                                </div>
                                <motion.div 
                                    className="text-gray-400 group-hover:text-gray-600 transition-colors"
                                    whileHover={{ x: 3 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <svg
                                        className="w-6 h-6"
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
                                </motion.div>
                            </div>
                        </Link>
                    </motion.div>

                    {/* Advanced */}
                    <motion.div 
                        className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-200 cursor-pointer group"
                        variants={cardVariants as any}
                        whileHover="hover"
                    >
                        <Link href="/final-quiz/advanced">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <motion.div 
                                        className="p-2 bg-primary rounded-xl flex items-center justify-center flex-shrink-0"
                                        whileHover={{ rotate: 5 }}
                                        transition={{ duration: 0.2 }}
                                    >
                                        <Image src={advancedIcon} alt="advanced" className="w-5 h-5" />
                                    </motion.div>
                                    <div>
                                        <h3 className="text-xl font-semibold text-primary mb-1">
                                            {t.levels.advanced.title}
                                        </h3>
                                        <p className="text-gray-600">
                                            {t.levels.advanced.description}
                                        </p>
                                    </div>
                                </div>
                                <motion.div 
                                    className="text-gray-400 group-hover:text-gray-600 transition-colors"
                                    whileHover={{ x: 3 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <svg
                                        className="w-6 h-6"
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
                                </motion.div>
                            </div>
                        </Link>
                    </motion.div>
                </motion.div>
            </motion.div>
        </div>
    );
}