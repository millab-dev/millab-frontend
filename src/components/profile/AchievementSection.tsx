"use client"
import React, { useRef } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import Leaderboard from './Leaderboard';
import { motion, useInView } from 'framer-motion';

const AchievementSection = () => {
    const cardRef = useRef(null);
    const isInView = useInView(cardRef, { once: true, amount: 0.3 });
    
    return (
        <div className="w-full md:max-w-5xl md:mx-auto">
            <motion.div
                ref={cardRef}
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
            >
            <Card className="bg-gray-50 border border-gray-200 p-0 mb-4">
                <CardContent className="flex flex-col items-center justify-center px-8 py-6 md:px-12">
                    <h2 className="text-center text-2xl md:text-3xl font-semibold mb-6 text-primary">The Champions</h2>
                    <img src="/champions.png" alt="Champions Trophy" className="" />
                    
                    <div className="grid grid-cols-3 gap-4 w-full">
                        {/* Silver Winner */}
                        <div className="flex flex-col items-center">
                            <div className="text-gray-800 text-sm md:text-lg font-medium text-center line-clamp-2 overflow-hidden">
                                John Doe
                            </div>
                        </div>
                        
                        {/* Gold Winner */}
                        <div className="flex flex-col items-center">
                            <div className="text-gray-800 text-sm md:text-lg font-medium text-center line-clamp-2 overflow-hidden">
                                Muhammad Raflianwar Aziz Dhuhaprasetyo
                            </div>
                        </div>
                        
                        {/* Bronze Winner */}
                        <div className="flex flex-col items-center">
                            <div className="text-gray-800 text-sm md:text-lg font-medium text-center line-clamp-2 overflow-hidden">
                                Sarah Williams
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
            </motion.div>
            <Leaderboard/>
        </div>
    );
};

export default AchievementSection;