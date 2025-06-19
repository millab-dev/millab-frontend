"use client"
import React, { useRef, useState, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import Leaderboard from './Leaderboard';
import { motion, useInView } from 'framer-motion';
import { ProfileComponentProps, achievementSectionTranslations } from './types';

interface TopThreeUser {
    name: string;
    score: number;
}

const AchievementSection: React.FC<ProfileComponentProps> = ({ language = 'id' }) => {
    // Get translations based on language
    const t = achievementSectionTranslations[language];
    const cardRef = useRef(null);
    const isInView = useInView(cardRef, { once: true, amount: 0.3 });
    
    const [topThree, setTopThree] = useState<TopThreeUser[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchTopThree();
    }, []);    const fetchTopThree = async () => {
        try {
            const response = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080"}/api/v1/progression/leaderboard?limit=3`,
                { credentials: "include" }
            );

            if (response.ok) {
                const result = await response.json();
                if (result.success && result.data && result.data.length > 0) {
                    const topThreeData = result.data.map((entry: any) => ({
                        name: entry.name || `No Username`,
                        score: entry.score
                    }));
                    setTopThree(topThreeData);
                }
                // No else clause - just show whatever data we have
            }
        } catch (error) {
            console.error('Error fetching top three:', error);
            // No fallback to mock data
        } finally {
            setLoading(false);
        }
    };    return (
        <div className="w-full md:max-w-5xl md:mx-auto">
            <motion.div
                ref={cardRef}
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
            >
            <Card className="bg-gray-50 border border-gray-200 p-0 mb-4">
                <CardContent className="flex flex-col items-center justify-center px-8 py-6 md:px-12">
                    <h2 className="text-center text-2xl md:text-3xl font-semibold mb-6 text-primary">{t.title}</h2>
                    <img src="/champions.png" alt="Champions Trophy" className="" />
                    
                    <div className="grid grid-cols-3 gap-4 w-full">
                        {/* Second Place (Silver) */}
                        <div className="flex flex-col items-center">
                            <div className="text-gray-800 text-sm md:text-lg font-medium text-center line-clamp-2 overflow-hidden">
                                {loading ? 'Loading...' : (topThree[1]?.name || 'No data')}
                            </div>
                        </div>
                        
                        {/* First Place (Gold) */}
                        <div className="flex flex-col items-center">
                            <div className="text-gray-800 text-sm md:text-lg font-medium text-center line-clamp-2 overflow-hidden">
                                {loading ? 'Loading...' : (topThree[0]?.name || 'No data')}
                            </div>
                        </div>
                        
                        {/* Third Place (Bronze) */}
                        <div className="flex flex-col items-center">
                            <div className="text-gray-800 text-sm md:text-lg font-medium text-center line-clamp-2 overflow-hidden">
                                {loading ? 'Loading...' : (topThree[2]?.name || 'No data')}
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
            </motion.div>
            <Leaderboard language={language}/>
        </div>
    );
};

export default AchievementSection;