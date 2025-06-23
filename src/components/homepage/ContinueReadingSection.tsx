"use client"

import { ChevronRight } from 'lucide-react'
import {
  Card,
  CardContent,
} from "@/components/ui/card"
import { motion, useInView } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'
import {
  ModuleCategory,
  SectionProps,
  continueReadingTranslations,
  Module
} from './types'
import { useRouter } from 'next/navigation'
import owlSad from '/public/owl-sad.png'
import scrollText from '/public/scroll-text.svg'


// Use SectionProps for component props but extend with initialReadingStateData
import { ReadingStateData } from './types';

interface ContinueReadingSectionProps extends SectionProps {
  initialReadingStateData?: ReadingStateData;
}

const ContinueReadingSection = ({ language = 'id', initialReadingStateData }: ContinueReadingSectionProps) => {
  const router = useRouter();
  
  // Get translations based on language
  const t = continueReadingTranslations[language];
  
  const [modules, setModules] = useState<Module[]>([]);
  const [loading, setLoading] = useState(true);
  const [hasStartedReading, setHasStartedReading] = useState(false);
  const [expectedModuleCount, setExpectedModuleCount] = useState(3); // Track expected number of modules
  
  // Process initial data or fetch if not provided
  useEffect(() => {
    if (initialReadingStateData) {
      processReadingStateData(initialReadingStateData);
    } else {
      fetchUserReadingState();
    }
  }, [initialReadingStateData]);
  // Process reading state data from server
  const processReadingStateData = (data: ReadingStateData) => {
    try {
      let accessedModules: Module[] = [];
      if (data.success && data.data.length > 0) {
        // Transform backend modules to frontend format
        accessedModules = data.data.map((state: any) => ({
          id: state.module.id, // Keep as string to avoid NaN
          title: `Modul ${state.module.order}: ${state.module.title}`,
          progress: state.module.progress?.completionPercentage || 0,
          category: state.module.difficulty === 'Easy' ? 'beginner' : 
                  state.module.difficulty === 'Intermediate' ? 'intermediate' : 'advanced',
          description: state.module.description,
          sections: state.module.sections,
          quiz: state.module.quiz
        }));
        setHasStartedReading(true);
      }
      
      // Only show modules from user's reading history, no homepage supplements
      const finalCount = Math.min(accessedModules.length, 3);
      setExpectedModuleCount(finalCount);
      setModules(accessedModules.slice(0, 3));
      
      if (accessedModules.length > 0) {
        setHasStartedReading(true);
      } else {
        // User hasn't started reading any modules or not authenticated
        if (data.error === "Authentication required") {
          console.log("User not authenticated for reading state");
        }
        setHasStartedReading(false);
      }
    } catch (error) {
      console.error("Error processing reading state data:", error);
      setHasStartedReading(false);
    } finally {
      setLoading(false);
    }
  };

  // Fallback client-side fetch in case server data is not provided
  const fetchUserReadingState = async () => {
    try {      
      console.log("Falling back to client-side fetch for reading state");
      const response = await fetch(
        `/api/v1/reading-state/last-accessed`,
        {
          credentials: "include",
        }
      );

      const data = await response.json();
      processReadingStateData(data);
    } catch (error) {
      console.error("Error fetching user reading state:", error);
      setHasStartedReading(false);
      setLoading(false);
    }
  };

  const handleModuleClick = (moduleId: string | number) => {
    router.push(`/module/${moduleId}`);
  };
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 })  // Show loading state
  if (loading) {
    return (
      <div className="w-full" ref={sectionRef}>
        <motion.div 
          className="flex justify-between items-center mb-4 px-1"
          initial={{ opacity: 0, y: -10 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -10 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-xl md:text-2xl font-bold text-primary">{t.title}</h2>
        </motion.div>
        <motion.div 
          className="flex overflow-x-auto gap-4 -mx-4 px-4"
          style={{ 
            scrollbarWidth: 'none',
            msOverflowStyle: 'none', 
            WebkitOverflowScrolling: 'touch'
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >          {/* Loading skeleton - dynamic count based on expected modules */}          {Array.from({ length: expectedModuleCount }, (_, index) => (
            <div key={index + 1} className="w-[260px] md:w-[280px] flex-shrink-0 flex-grow-0 animate-pulse">
              <Card className="shadow-sm p-0 flex flex-col overflow-hidden h-full">
                <CardContent className="p-0 flex flex-col flex-1 w-full">
                  <div className="flex flex-col h-full p-4">
                    <div className="space-y-3 flex-shrink-0">
                      <div className="h-6 bg-gray-200 rounded w-1/3"></div>
                      <div className="w-full aspect-square rounded-2xl bg-gray-200"></div>
                    </div>
                    <div className="mt-3 flex flex-col h-full">
                      <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
                      <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                      <div className="mt-auto">
                        <div className="h-2 bg-gray-200 rounded w-full"></div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </motion.div>
      </div>
    );
  }
  // Show empty state if no modules available
  if (!hasStartedReading || modules.length === 0) {
    return (
      <div className="w-full" ref={sectionRef}>
        <motion.div 
          className="flex justify-between items-center mb-4 px-1"
          initial={{ opacity: 0, y: -10 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -10 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-xl md:text-2xl font-bold text-primary">{t.title}</h2>
        </motion.div>
        
        <motion.div 
          className="flex flex-col items-center justify-center py-8 px-4 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: 0.1 }}        >          <img 
            src={owlSad.src} 
            alt="Empty reading state" 
            className="w-64 h-64 mb-4 opacity-60"
          />          <p className="text-gray-500 text-sm md:text-base">
            {t.emptyStateTitle}
          </p>
          <p className="text-gray-400 text-xs md:text-sm mt-2">
            {t.emptyStateSubtitle}
          </p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="w-full" ref={sectionRef}>
      <motion.div 
        className="flex justify-between items-center mb-4 px-1"
        initial={{ opacity: 0, y: -10 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -10 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-xl md:text-2xl font-bold text-primary">{t.title}</h2>        <motion.a 
          href="/module" 
          className="text-gray-500 flex items-center hover:text-primary transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {t.seeAll} <ChevronRight className="h-4 w-4 ml-1" />
        </motion.a>
      </motion.div>
        <motion.div 
        className="flex overflow-x-auto gap-4 -mx-4 px-4"
        style={{ 
          scrollbarWidth: 'none',
          msOverflowStyle: 'none', 
          WebkitOverflowScrolling: 'touch'
        }}
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >        {modules.map((module, index) => (
          <motion.div
            key={module.id}
            className="w-[260px] md:w-[280px] flex-shrink-0 flex-grow-0 cursor-pointer"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.5, delay: 0.1 * index }}
            whileHover={{ y: -5, transition: { duration: 0.2 } }}
            onClick={() => handleModuleClick(module.id)}
          >
            <Card className="shadow-sm hover:shadow transition-all duration-300 p-0 flex flex-col overflow-hidden h-full cursor-pointer">
              <CardContent className="p-0 flex flex-col flex-1 w-full">
                {/* Module card content */}
                <div className="flex flex-col h-full p-4">
                  <div className="space-y-3 flex-shrink-0">
                    {/* Level badge */}
                    <div>
                      <span 
                        className="text-xs py-1 px-2.5 rounded-md text-white"                        style={{ 
                          backgroundColor: 
                            module.category === "beginner" ? "#218E44" : 
                            module.category === "intermediate" ? "#FBAD18" : "#DC2626" 
                        }}
                      >                        {t.difficulty[
                          module.category === "beginner" ? "Easy" : 
                          module.category === "intermediate" ? "Intermediate" : "Advanced"
                        ]}
                      </span>
                    </div>
                    
                    {/* Icon contained within the card with rounded corners */}
                    <div className="w-full">
                      <div className="aspect-square rounded-2xl overflow-hidden">
                        <div 
                          style={{ background: 'linear-gradient(to right, #0077D4, #4CB0FF)' }} 
                          className="w-full h-full flex items-center justify-center"
                        >                          <motion.img 
                            src={scrollText.src} 
                            alt="Module" 
                            className="w-16 h-16" 
                            whileHover={{ scale: 1.1 }}
                            transition={{ duration: 0.2 }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Title and progress information */}
                  <div className="mt-3 flex flex-col h-full">
                    <h3 className="text-sm md:text-base font-semibold text-primary mb-2 line-clamp-2">{module.title}</h3>
                    <div className="mt-auto">
                      <div className="flex items-center gap-2">
                        <div className="h-2 flex-1 bg-gray-200 rounded-full overflow-hidden">
                          <motion.div 
                            className="h-full" 
                            style={{ backgroundColor: '#EF5BA1' }}
                            initial={{ width: 0 }}
                            animate={isInView ? { width: `${module.progress}%` } : { width: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 + (0.1 * index) }}
                          />
                        </div>
                        <span className="text-xs text-gray-500">{module.progress}%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}

export default ContinueReadingSection
