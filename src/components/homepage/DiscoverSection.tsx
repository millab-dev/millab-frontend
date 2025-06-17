"use client"

import { ChevronRight, Search } from 'lucide-react'
import {
  Card,
  CardContent,
} from "@/components/ui/card"
import { motion, useInView } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'
import { Input } from "@/components/ui/input"
import {
  ModuleCategory,
  BaseModule,
  SectionProps,
  discoverTranslations
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
type DiscoverSectionProps = SectionProps;

const DiscoverSection = ({ language = 'id' }: DiscoverSectionProps) => {
  const router = useRouter();
  // Get translations based on language
  const t = discoverTranslations[language];
  
  const [modules, setModules] = useState<Module[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Fetch homepage modules (orders 1, 5, 11)
  useEffect(() => {
    fetchHomepageModules();
  }, []);

  const fetchHomepageModules = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080"}/api/v1/modules/homepage`,
        {
          credentials: "include",
        }
      );

      const data = await response.json();      if (data.success) {
        // Transform backend modules to frontend format
        const transformedModules: Module[] = data.data.map((module: BackendModule) => ({
          id: module.id, // Keep as string to avoid NaN
          title: `Modul ${module.order}: ${module.title}`,
          progress: module.progress?.completionPercentage || 0,
          category: module.difficulty === 'Easy' ? 'beginner' : 
                   module.difficulty === 'Intermediate' ? 'intermediate' : 'advanced',
          description: module.description,
          sections: module.sections,
          quiz: module.quiz
        }));
        setModules(transformedModules);      } else {        // If not authenticated, show empty state instead of error
        if (data.error === "Authentication required") {
          console.log("User not authenticated, showing mock data for demo");
          // Add some mock data for demonstration
          const mockModules: Module[] = [
            {
              id: "1",
              title: "Modul 1: Pengantar Literasi Media",
              progress: 0,
              category: "beginner",
              description: "Dasar-dasar literasi media untuk pemula",
              sections: [],
              quiz: {}
            },
            {
              id: "5", 
              title: "Modul 5: Analisis Konten Media",
              progress: 0,
              category: "intermediate",
              description: "Menganalisis berbagai jenis konten media",
              sections: [],
              quiz: {}
            },
            {
              id: "11",
              title: "Modul 11: Media dan Masyarakat",
              progress: 0,
              category: "advanced", 
              description: "Dampak media terhadap masyarakat",
              sections: [],
              quiz: {}
            }
          ];
          setModules(mockModules);
        } else {
          console.error("API Error:", data.error);
          toast.error(data.error || "Failed to fetch modules");
        }
      }    } catch (error) {
      console.error("Error fetching homepage modules:", error);
      // Don't show error toast for network issues, show mock data instead
      console.log("Network error, showing mock data for demo");
      const mockModules: Module[] = [
        {
          id: "1",
          title: "Modul 1: Pengantar Literasi Media",
          progress: 25,
          category: "beginner",
          description: "Dasar-dasar literasi media untuk pemula",
          sections: [],
          quiz: {}
        },
        {
          id: "5", 
          title: "Modul 5: Analisis Konten Media",
          progress: 60,
          category: "intermediate",
          description: "Menganalisis berbagai jenis konten media",
          sections: [],
          quiz: {}
        },
        {
          id: "11",
          title: "Modul 11: Media dan Masyarakat",
          progress: 10,
          category: "advanced", 
          description: "Dampak media terhadap masyarakat",
          sections: [],
          quiz: {}
        }
      ];
      setModules(mockModules);
    } finally {
      setLoading(false);
    }
  };
  const handleModuleClick = (moduleId: string | number) => {
    router.push(`/module/${moduleId}`);
  };
  
  // Filter modules based on search query
  const filteredModules = modules.filter(module => 
    module.title.toLowerCase().includes(searchQuery.toLowerCase())
  );
    const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 })

  // Show loading state
  if (loading) {
    return (
      <div className="w-full" ref={sectionRef}>
        <motion.div
          className="relative mb-4"
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
          transition={{ duration: 0.5 }}
        >
          <div className="relative">
            <Search className="absolute left-3 md:left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <Input
              type="text"
              placeholder={t.searchPlaceholder}
              className="pl-10 md:pl-12 pr-4 py-2 md:py-6 w-full rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm md:text-base"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </motion.div>
        
        <motion.div 
          className="flex justify-between items-center mb-4 px-1"
          initial={{ opacity: 0, y: -10 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -10 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h2 className="text-xl md:text-2xl font-bold text-primary">{t.title}</h2>
          <motion.a 
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
        >
          {/* Loading skeleton */}
          {[1, 2, 3].map((index) => (
            <div key={index} className="w-[260px] md:w-[280px] flex-shrink-0 flex-grow-0 animate-pulse">
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

  return (
    <div className="w-full" ref={sectionRef}>
      <motion.div
        className="relative mb-4"
        initial={{ opacity: 0, y: 10 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
        transition={{ duration: 0.5 }}
      >
        <div className="relative">
          <Search className="absolute left-3 md:left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <Input
            type="text"
            placeholder={t.searchPlaceholder}
            className="pl-10 md:pl-12 pr-4 py-2 md:py-6 w-full rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm md:text-base"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </motion.div>
      
      <motion.div 
        className="flex justify-between items-center mb-4 px-1"
        initial={{ opacity: 0, y: -10 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -10 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <h2 className="text-xl md:text-2xl font-bold text-primary">{t.title}</h2>
        <motion.a 
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
      >        {filteredModules.map((module, index) => (
          <motion.div
            key={module.id}
            className="w-[260px] md:w-[280px] flex-shrink-0 flex-grow-0"
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
                        className="text-xs  py-1 px-2.5 rounded-md text-white"
                        style={{ 
                          backgroundColor: 
                            module.category === "beginner" ? "#218E44" : 
                            module.category === "intermediate" ? "#FBAD18" : "#EF5BA1" 
                        }}
                      >
                        {t.categories[module.category as ModuleCategory]}
                      </span>
                    </div>
                    
                    {/* Icon contained within the card with rounded corners */}
                    <div className="w-full">
                      <div className="aspect-square rounded-2xl overflow-hidden">
                        <div 
                          style={{ background: 'linear-gradient(to right, #0077D4, #4CB0FF)' }} 
                          className="w-full h-full flex items-center justify-center"
                        >
                          <motion.img 
                            src="/scroll-text.svg" 
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

export default DiscoverSection
