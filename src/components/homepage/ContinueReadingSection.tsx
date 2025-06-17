"use client"

import { ChevronRight, FileText } from 'lucide-react'
import {
  Card,
  CardContent,
} from "@/components/ui/card"
import { motion, useInView } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'
import {
  ModuleCategory,
  BaseModule,
  SectionProps,
  continueReadingTranslations
} from './types'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'

// Backend module interface
interface BackendModule {
  id: string;
  title: string;
  description: string;
  difficulty: 'Easy' | 'Intermediate' | 'Advanced';
  order: number;
  sections: any[];
  quiz: any;
  isActive: boolean;
  progress?: {
    completionPercentage: number;
  };
}

// Use BaseModule for the modules but extend it
type Module = BaseModule & {
  description?: string;
  sections?: any[];
  quiz?: any;
};

// Use SectionProps for component props
type ContinueReadingSectionProps = SectionProps;

const ContinueReadingSection = ({ language = 'id' }: ContinueReadingSectionProps) => {
  const router = useRouter();
  
  // Get translations based on language
  const t = continueReadingTranslations[language];
  
  const [modules, setModules] = useState<Module[]>([]);
  const [loading, setLoading] = useState(true);
  const [hasStartedReading, setHasStartedReading] = useState(false);
  
  // Fetch user's last accessed modules
  useEffect(() => {
    fetchUserReadingState();
  }, []);

  const fetchUserReadingState = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080"}/api/v1/reading-state`,
        {
          credentials: "include",
        }
      );

      const data = await response.json();      if (data.success && data.data.length > 0) {
        // Transform backend modules to frontend format
        const transformedModules: Module[] = data.data.map((state: any) => ({
          id: state.module.id, // Keep as string to avoid NaN
          title: `Modul ${state.module.order}: ${state.module.title}`,
          progress: state.module.progress?.completionPercentage || 0,
          category: state.module.difficulty === 'Easy' ? 'beginner' : 
                   state.module.difficulty === 'Intermediate' ? 'intermediate' : 'advanced',
          description: state.module.description,
          sections: state.module.sections,
          quiz: state.module.quiz
        }));
        setModules(transformedModules);
        setHasStartedReading(true);      } else {
        // User hasn't started reading any modules or not authenticated
        if (data.error === "Authentication required") {
          console.log("User not authenticated for reading state");
        }
        setHasStartedReading(false);
      }
    } catch (error) {
      console.error("Error fetching user reading state:", error);
      setHasStartedReading(false);
    } finally {
      setLoading(false);
    }
  };

  const handleModuleClick = (moduleId: string | number) => {
    router.push(`/module/${moduleId}`);
  };
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 })

  // Show loading state
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
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          {/* Loading skeleton */}
          {[1, 2].map((index) => (
            <div key={index} className="animate-pulse">
              <Card className="shadow-sm p-0">
                <CardContent className="p-4 flex items-center gap-4">
                  <div className="rounded-lg w-20 h-20 bg-gray-200 flex-shrink-0"></div>
                  <div className="flex flex-col flex-1 space-y-2">
                    <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                    <div className="h-2 bg-gray-200 rounded w-full"></div>
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </motion.div>
      </div>
    );
  }

  // Show empty state if user hasn't started reading
  if (!hasStartedReading) {
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
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <img 
            src="/pet-chill.png" 
            alt="Empty reading state" 
            className="w-32 h-32 mb-4 opacity-60"
          />
          <p className="text-gray-500 text-sm md:text-base">
            Kamu belum mulai baca modul kami
          </p>
          <p className="text-gray-400 text-xs md:text-sm mt-2">
            Mulai belajar dengan mengeksplorasi modul-modul yang tersedia
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
        <h2 className="text-xl md:text-2xl font-bold text-primary">{t.title}</h2>
        <motion.a 
          href="/history" 
          className="text-gray-500 flex items-center hover:text-primary transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {t.seeAll} <ChevronRight className="h-4 w-4 ml-1" />
        </motion.a>
      </motion.div>
      
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 gap-4"
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        {modules.map((module, index) => (
          <motion.div
            key={module.id}
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.5, delay: 0.1 * index }}
            whileHover={{ y: -5, transition: { duration: 0.2 } }}
            onClick={() => handleModuleClick(module.id)}
            className="cursor-pointer"
          >
            <Card className="shadow-sm hover:shadow transition-all duration-300 p-0">
              <CardContent className="p-4 flex items-center gap-4">
                <div className="rounded-lg w-20 h-20 flex items-center justify-center flex-shrink-0 overflow-hidden">
                  <div 
                    style={{ background: 'linear-gradient(to right, #0077D4, #4CB0FF)' }} 
                    className="w-full h-full flex items-center justify-center"
                  >
                    <FileText className="text-white w-10 h-10" />
                  </div>
                </div>
                
                <div className="flex flex-col flex-1">
                  {/* Level badge */}
                  <div className="mb-1.5">
                    <span 
                      className="text-xs py-1 px-2.5 rounded-md text-white"
                      style={{ 
                        backgroundColor: 
                          module.category === "beginner" ? "#218E44" : 
                          module.category === "intermediate" ? "#FBAD18" : "#EF5BA1" 
                      }}
                    >
                      {t.categories[module.category as ModuleCategory]}
                    </span>
                  </div>
                  
                  <h3 className="text-sm md:text-base font-semibold text-primary mb-2 truncate">{module.title}</h3>
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
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}

export default ContinueReadingSection
