"use client"

import { ChevronRight, Search, Volume2, VolumeX, Pause, Play } from 'lucide-react'
import {
  Card,
  CardContent,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { motion, useInView } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'
import { Input } from "@/components/ui/input"
import { toast } from "sonner"
import {
  ModuleCategory,
  SectionProps,
  discoverTranslations,
  BackendModule,
  HomepageModulesData,
  Module
} from './types'
import { TTSContextType } from './index'
import { useRouter } from 'next/navigation'
import owlSad from '/public/owl-sad.png'
import { 
  getModuleTitle, 
  getModuleDescription, 
  getLanguageVersionBadge,
  hasEnglishVersion 
} from '@/utils/moduleLanguageUtils'


// Use SectionProps for component props but extend with initialModulesData
interface DiscoverSectionProps extends SectionProps {
  initialModulesData?: HomepageModulesData;
  ttsContext: TTSContextType;
}

const DiscoverSection = ({ language = 'id', initialModulesData, ttsContext }: DiscoverSectionProps) => {
  const router = useRouter();
  // Get translations based on language
  const t = discoverTranslations[language];
  
  const [modules, setModules] = useState<Module[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  // Use centralized TTS context
  const { isSpeaking, isPaused, currentSpeakingId, toggleSpeech, stopSpeaking } = ttsContext;

  // Process server-provided modules data
  useEffect(() => {
    if (initialModulesData) {
      processModulesData();
    } else {
      setLoading(false);
    }
  }, [initialModulesData]);

  // Single TTS for entire DiscoverSection - read all module titles
  const handleSectionTTS = () => {
    const moduleTitles = filteredModules.map(module => module.title).join(', ');
    const sectionText = `${t.title}. ${language === 'id' ? 'Modul-modul yang tersedia:' : 'Available modules:'} ${moduleTitles}.`;
    toggleSpeech(sectionText, 'discover-section');
  };

  // Keyboard navigation removed per user request

  // No need cleanup - handled by parent component

  const processModulesData = () => {
    try {
      if (initialModulesData && initialModulesData.success && initialModulesData.data) {
        // Transform backend modules to frontend format with language support
        const transformedModules: Module[] = initialModulesData.data.map((module: BackendModule) => ({
          id: module.id,
          title: getModuleTitle(module, language, t.modulePrefix, module.order),
          progress: module.progress?.completionPercentage || 0,
          category: module.difficulty === 'Easy' ? 'beginner' : 
                   module.difficulty === 'Intermediate' ? 'intermediate' : 'advanced',
          description: getModuleDescription(module, language),
          sections: module.sections,
          quiz: module.quiz,
          // Add language version info
          hasEnglishVersion: hasEnglishVersion(module),
          languageInfo: getLanguageVersionBadge(module, language)
        }));
        setModules(transformedModules);
      }
    } catch (error) {
      console.error("Error processing modules data:", error);
    } finally {
      setLoading(false);
    }
  };
  const handleModuleClick = (moduleId: string | number) => {
    router.push(`/module/${moduleId}`);
  };
  
  // Priority module orders (1, 5, 11)
  const priorityOrders = [1, 5, 11];
  
  // Filter and prioritize modules based on search query
  const filteredModules = modules.filter(module => {
    // If there's a search query, show all modules that match the query
    if (searchQuery) {
      return module.title.toLowerCase().includes(searchQuery.toLowerCase());
    }
    
    // If no search query, only show priority modules (orders 1, 5, and 11)
    // Extract the order number from the module title
    // Format: "Modul X: Title" (Indonesian) or "Module X: Title" (English)
    const orderMatch = module.title.match(/(?:Modul|Module) (\d+):/i);
    if (!orderMatch) return false;
    
    const orderNum = parseInt(orderMatch[1], 10);
    return priorityOrders.includes(orderNum);
  });
    const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 })

  // Show loading state
  if (loading) {
    return (
      <section 
        className="w-full" 
        ref={sectionRef}
        role="main"
        aria-label={language === 'id' ? 'Bagian Temukan Modul' : 'Discover Modules Section'}
      >
        {/* Skip to content link for screen readers */}
        <a 
          href="#module-list" 
          className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 bg-primary text-white px-4 py-2 rounded-md"
        >
          {language === 'id' ? 'Langsung ke daftar modul' : 'Skip to module list'}
        </a>

    

        <motion.div
          className="relative mb-4"
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
          transition={{ duration: 0.5 }}
          id="discover-section"
        >
          <div className="relative">
            <Search className="absolute left-3 md:left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" aria-hidden="true" />
            <Input
              type="text"
              placeholder={t.searchPlaceholder}
              className="pl-10 md:pl-12 pr-4 py-2 md:py-6 w-full rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm md:text-base"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              aria-label={language === 'id' ? 'Cari modul pembelajaran' : 'Search learning modules'}
              aria-describedby="search-help"
            />
            <div id="search-help" className="sr-only">
              {language === 'id' ? 'Ketik untuk mencari modul. Gunakan Alt+F untuk fokus ke pencarian.' : 'Type to search modules. Use Alt+F to focus search.'}
            </div>
          </div>
        </motion.div>
        
        <motion.div 
          className="flex justify-between items-start mb-4 px-1 gap-2"
          initial={{ opacity: 0, y: -10 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -10 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <motion.a 
            href="/module" 
            className="text-gray-500 flex items-center pl-4 
                    hover:text-primary transition-colors whitespace-nowrap flex-shrink-0"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            aria-label={language === 'id' ? 'Lihat semua modul pembelajaran' : 'See all learning modules'}
          >
            {t.seeAll} <ChevronRight className="h-4 w-4 ml-1" aria-hidden="true" />
          </motion.a>
        </motion.div>
        
        <motion.div
          id="module-list"
          className="flex overflow-x-auto gap-4 -mx-4 px-4"
          style={{ 
            scrollbarWidth: 'none',
            msOverflowStyle: 'none', 
            WebkitOverflowScrolling: 'touch'
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          role="list"
          aria-label={language === 'id' ? `Daftar ${filteredModules.length} modul pembelajaran` : `List of ${filteredModules.length} learning modules`}
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
      </section>
    );
  }

  return (
    <section 
      className="w-full" 
      ref={sectionRef}
      role="main"
      aria-label={language === 'id' ? 'Bagian Temukan Modul' : 'Discover Modules Section'}
    >
      {/* Skip to content link for screen readers */}
      <a 
        href="#module-list" 
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 bg-primary text-white px-4 py-2 rounded-md"
      >
        {language === 'id' ? 'Langsung ke daftar modul' : 'Skip to module list'}
      </a>

      {/* Keyboard help overlay removed per user request */}

      <motion.div
        className="relative mb-4"
        initial={{ opacity: 0, y: 10 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
        transition={{ duration: 0.5 }}
        id="discover-section"
      >
        <div className="relative">
          <Search className="absolute left-3 md:left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" aria-hidden="true" />
          <Input
            type="text"
            placeholder={t.searchPlaceholder}
            className="pl-10 md:pl-12 pr-4 py-2 md:py-6 w-full rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm md:text-base"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            aria-label={language === 'id' ? 'Cari modul pembelajaran' : 'Search learning modules'}
          />
        </div>
      </motion.div>
      
      <motion.div 
        className="flex justify-between items-start mb-4 px-1 gap-2"
        initial={{ opacity: 0, y: -10 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -10 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <div className="flex items-center gap-2">
          <h2 className="text-xl md:text-2xl font-bold text-primary">{t.title}</h2>
          
          {/* Single TTS button for entire section */}
          <Button
            variant="ghost"
            size="sm"
            onClick={handleSectionTTS}
            aria-label={language === 'id' ? 'Baca section temukan modul' : 'Read discover modules section'}
            className="text-gray-500 hover:text-primary"
          >
            {currentSpeakingId === 'discover-section' && isSpeaking ? (
              isPaused ? <Play className="h-4 w-4" /> : <Pause className="h-4 w-4" />
            ) : (
              <Volume2 className="h-4 w-4" />
            )}
          </Button>
          
          {/* Keyboard button removed per user request */}
        </div>
        <motion.a 
          href="/module" 
          className="text-gray-500 flex items-center pl-4 
                  hover:text-primary transition-colors whitespace-nowrap flex-shrink-0"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          aria-label={language === 'id' ? 'Lihat semua modul pembelajaran' : 'See all learning modules'}
        >
          {t.seeAll} <ChevronRight className="h-4 w-4 ml-1" aria-hidden="true" />
        </motion.a>
      </motion.div>
      
      <motion.div
        id="module-list"
        className="flex overflow-x-auto gap-4 -mx-4 px-4"
        style={{ 
          scrollbarWidth: 'none',
          msOverflowStyle: 'none', 
          WebkitOverflowScrolling: 'touch'
        }}
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        role="list"
        aria-label={language === 'id' ? `Daftar ${filteredModules.length} modul pembelajaran` : `List of ${filteredModules.length} learning modules`}
      >
        {filteredModules.length > 0 ? (
          filteredModules.map((module, index) => (
            <motion.div
              key={module.id}
              className="w-[260px] md:w-[280px] flex-shrink-0 flex-grow-0"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
              role="listitem"
            >
              <Card 
                className="shadow-sm hover:shadow transition-all duration-300 p-0 flex flex-col overflow-hidden h-full cursor-pointer focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-2"
                role="article"
                aria-labelledby={`module-title-${module.id}`}
                aria-describedby={`module-progress-${module.id}`}
              >
                <CardContent className="p-0 flex flex-col flex-1 w-full">
                  {/* Module card content */}
                  <div className="flex flex-col h-full p-4">
                    <div className="space-y-3 flex-shrink-0">
                      {/* Level badge and language version indicator */}
                      <div className="flex items-center justify-between gap-2">
                        <span 
                          className="text-xs py-1 px-2.5 rounded-md text-white"
                          style={{ 
                            backgroundColor: 
                              module.category === "beginner" ? "#218E44" : 
                              module.category === "intermediate" ? "#FBAD18" : "#DC2626" 
                          }}
                          aria-label={`${language === 'id' ? 'Tingkat kesulitan' : 'Difficulty level'}: ${t.categories[module.category as ModuleCategory]}`}
                        >
                          {t.categories[module.category as ModuleCategory]}
                        </span>
                        
                        {/* Language version indicator with ID fallback */}
                        {(() => {
                          // First try to show language version indicator
                          if (module.languageInfo && module.languageInfo.badge) {
                            return (
                              <span 
                                className={`text-xs py-1 px-2 rounded-md text-white ${
                                  module.languageInfo.fallback 
                                    ? 'bg-orange-500' 
                                    : language === 'en' 
                                      ? 'bg-blue-500' 
                                      : 'bg-green-600'
                                }`}
                                title={module.languageInfo.fallback 
                                  ? `Content shown in fallback language` 
                                  : `Content available in ${language === 'en' ? 'English' : 'Indonesian'}`
                                }
                              >
                                {module.languageInfo.badge}
                              </span>
                            );
                          }
                          
                          // Fallback to showing module ID
                          return (
                            <span 
                              className="text-xs py-1 px-2 rounded-md text-white bg-gray-500"
                              title="Module ID"
                            >
                              ID: {module.id}
                            </span>
                          );
                        })()}
                      </div>
                      
                      {/* Icon contained within the card with rounded corners */}
                      <div className="w-full relative">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleModuleClick(module.id);
                          }}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter' || e.key === ' ') {
                              e.preventDefault();
                              e.stopPropagation();
                              handleModuleClick(module.id);
                            }
                          }}
                          className="w-full focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-2xl"
                          aria-label={`${language === 'id' ? 'Buka modul' : 'Open module'}: ${module.title}`}
                        >
                          <div className="aspect-square rounded-2xl overflow-hidden">
                            <div 
                              style={{ background: 'linear-gradient(to right, #0077D4, #4CB0FF)' }} 
                              className="w-full h-full flex items-center justify-center"
                            >
                              <motion.img 
                                src="/scroll-text.svg" 
                                alt="" 
                                className="w-16 h-16" 
                                whileHover={{ scale: 1.1 }}
                                transition={{ duration: 0.2 }}
                                aria-hidden="true"
                              />
                            </div>
                          </div>
                        </button>
                        {/* Removed individual TTS buttons per module */}
                      </div>
                    </div>
                    
                    {/* Title and progress information */}
                    <div className="mt-3 flex flex-col h-full">
                      <h3 
                        id={`module-title-${module.id}`}
                        className="text-sm md:text-base font-semibold text-primary mb-2 line-clamp-2"
                      >
                        {module.title}
                      </h3>
                      <div className="mt-auto">
                        <div className="flex items-center gap-2" id={`module-progress-${module.id}`}>
                          <div 
                            className="h-2 flex-1 bg-gray-200 rounded-full overflow-hidden"
                            role="progressbar"
                            aria-valuenow={module.progress}
                            aria-valuemin={0}
                            aria-valuemax={100}
                            aria-label={`${language === 'id' ? 'Progress pembelajaran' : 'Learning progress'}: ${module.progress}%`}
                          >
                            <motion.div 
                              className="h-full" 
                              style={{ backgroundColor: '#EF5BA1' }}
                              initial={{ width: 0 }}
                              animate={isInView ? { width: `${module.progress}%` } : { width: 0 }}
                              transition={{ duration: 0.8, delay: 0.2 + (0.1 * index) }}
                            />
                          </div>
                          <span className="text-xs text-gray-500" aria-hidden="true">{module.progress}%</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))
        )
        : searchQuery ? (
          <motion.div 
            className="w-full flex flex-col items-center justify-center py-8 px-4 text-center"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <img 
              src={owlSad.src} 
              alt={language === 'id' ? 'Tidak ditemukan' : 'Not found'} 
              className="w-64 h-64 mb-4 opacity-60"
              aria-describedby="not-found-description"
            />
            <div id="not-found-description">
              <p className="text-gray-500 text-sm md:text-base">
                {t.notFound}
              </p>
              <p className="text-gray-400 text-xs md:text-sm mt-2">
                {t.tryAnotherKeyword}
              </p>
            </div>
          </motion.div>
        ) : null}
      </motion.div>
      
      {/* Accessibility instructions */}
      <div className="sr-only" aria-live="polite">
        {language === 'id' ? 'Gunakan Alt+H untuk bantuan keyboard, Alt+F untuk fokus pencarian, Alt+S untuk berhenti membaca' : 'Use Alt+H for keyboard help, Alt+F to focus search, Alt+S to stop speech'}
      </div>
    </section>
  )
}

export default DiscoverSection