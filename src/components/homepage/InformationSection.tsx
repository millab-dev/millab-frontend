"use client"
import { Zap, Gem } from 'lucide-react'
import { motion } from 'framer-motion'
import { SectionProps, informationTranslations } from './types'
import { useState, useEffect } from 'react'
import { UserData } from './types'

interface UserProgression {
  currentExp: number
  level: number
  expForNextLevel: number
  totalExpForNextLevel: number
  dayStreak: number
  progressPercentage: number
  points: number
  rank: number
}

interface User {
  name: string
  username: string
  // other user fields...
}

type InformationSectionProps = SectionProps & {
    userData?: UserData;
};

const InformationSection = ({ language = 'id', userData }: InformationSectionProps) => {
    // Get translations based on language
    const t = informationTranslations[language];
    
    const [user, setUser] = useState<User | null>(null)
    const [progression, setProgression] = useState<UserProgression | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if (userData) {
            processUserData(userData);
        } else {
            fetchUserData();
        }
    }, [userData])

    const processUserData = (data: UserData) => {
        try {
            // Process user progression data
            if (data.progression) {
                setProgression(data.progression)
            }

            // Process user profile data
            if (data.user) {
                setUser(data.user)
            }
        } catch (error) {
            console.error('Error processing user data:', error)
            setDefaultUserData();
        } finally {
            setLoading(false)
        }
    }

    // Set default values for demo purposes or when data is not available
    const setDefaultUserData = () => {
        setUser({ name: 'Mimi', username: 'Mimi' })
        setProgression({
            currentExp: 12,
            level: 1,
            expForNextLevel: 108,
            totalExpForNextLevel: 120,
            dayStreak: 1,
            progressPercentage: 10,
            points: 235,
            rank: 401
        })
    }

    // Fallback client-side fetch in case server data is not provided
    const fetchUserData = async () => {
        try {
            console.log("Falling back to client-side fetch for user data");
            // Fetch user progression data
            const progressionResponse = await fetch(
                `/api/v1/progression/me`,
                { credentials: "include" }
            )
            
            if (progressionResponse.ok) {
                const progressionData = await progressionResponse.json()
                if (progressionData.success) {
                    setProgression(progressionData.data)
                }
            }

            // Fetch user profile data
            const userResponse = await fetch(
                `/api/v1/auth/me`,
                { credentials: "include" }
            )
            
            if (userResponse.ok) {
                const userData = await userResponse.json()
                if (userData.success) {
                    setUser(userData.data)
                }
            }
        } catch (error) {
            console.error('Error fetching user data:', error)
            setDefaultUserData();
        } finally {
            setLoading(false)
        }
    }

    const getUserDisplayName = () => {
        if (loading) return 'Loading...'
        if (!user || !user.username) return 'Mimi!'
        
        // Use username for display in homepage
        return `${user.username}!`
    }

    const getProgressData = () => {
        if (loading || !progression) {
            return {
                level: 1,
                currentExp: 0,
                totalExpForNextLevel: 120,
                progressPercentage: 0,
                dayStreak: 1,
                points: 0
            }
        }
        return progression
    }

    const progressData = getProgressData()

    return (
        <motion.div 
            className="px-4 pt-6 w-full mx-auto max-w-6xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
        >
            {/* Desktop layout (row) with responsive fallback to mobile layout (column) */}
            <motion.div 
                className="flex flex-col md:flex-row md:items-center justify-center md:gap-x-12"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
            >
                {/* Left side: Profile and Welcome text */}
                <motion.div 
                    className="flex items-center gap-3"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                >
                    <motion.div 
                        className="relative flex-shrink-0 w-[4.375rem] h-[4.375rem] md:w-[8.4375rem] md:h-[8.4375rem] rounded-full border-2 border-primary shadow-md overflow-hidden"
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                    >
                        <div className="w-full h-full rounded-full flex items-center justify-center overflow-hidden">
                            <img 
                                src="/owl-profile.png" 
                                alt="Profile" 
                                className="w-full h-full object-cover"
                            />
                        </div>
                    </motion.div>
                    
                    <motion.div 
                        className="text-white"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.5 }}
                    >
                        <p className="text-base md:text-3xl font-semibold">{t.welcomeBack}</p>
                        <h2 className="text-2xl md:text-5xl font-bold">{getUserDisplayName()}</h2>
                    </motion.div>
                </motion.div>

                {/* Right side: Stats and progress (column in mobile, right-aligned column in desktop) */}
                <motion.div 
                    className="mt-6 md:mt-0 md:flex md:flex-col md:items-end"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    id="streak-progress"
                >
                    {/* Streak and Points: row in both mobile and desktop */}
                    <motion.div 
                        className="flex justify-between xmd:justify-end md:gap-4 items-center w-full"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: 0.5 }}
                    >
                        <motion.div 
                            className="flex items-center bg-white rounded-full px-3 py-1 shadow-md"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <Zap size={18} className="text-primary mr-1.5" />
                            <span className="font-semibold text-primary text-sm">
                                {progressData.dayStreak} {t.dayStreak}
                            </span>
                        </motion.div>
                        
                        <motion.div 
                            className="flex items-center text-white ml-4 md:ml-0"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <Gem size={18} className="mr-1" />
                            <span className="font-semibold text-sm">{progressData.points}</span>
                        </motion.div>
                    </motion.div>
                    
                    {/* Progress bar - now part of the right column in desktop */}
                    <motion.div 
                        className="mt-2 md:mt-3 w-full md:w-80 lg:w-[43rem]"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.6 }}
                    >
                        <div className="w-full bg-white/30 rounded-full h-2.5 md:h-3.5 mb-1 overflow-hidden">
                            <motion.div 
                                className="h-full rounded-full" 
                                style={{ 
                                    backgroundColor: '#EF5BA1'
                                }}
                                initial={{ width: '0%' }}
                                animate={{ width: `${progressData.progressPercentage}%` }}
                                transition={{ duration: 1, delay: 0.8 }}
                            />
                        </div>
                        <div className="flex justify-between mt-2 md:mt-3 text-xs md:text-sm">
                            <span className="font-semibold text-white">Level {progressData.level}</span>
                            <span className="font-semibold text-white">
                                {progressData.currentExp}/{progressData.totalExpForNextLevel} xp
                            </span>
                        </div>
                    </motion.div>
                </motion.div>
            </motion.div>
        </motion.div>
    )
}

export default InformationSection