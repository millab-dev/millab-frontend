"use client"
import { Globe, Package, Volume2, Pause, Play, Info } from 'lucide-react'
import Link from 'next/link'
import {
  Card,
  CardContent,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { SectionProps, guidelinesTranslations } from './types'
import { TTSContextType } from './index'
import { useGuidelinesUrls } from '@/hooks/useGuidelinesUrls'

// Define type for guideline item keys - must match keys in translations
type GuidelineItemKey = 'website' | 'offlineProduct' | 'videoTutorial';

type GuidelineItem = {
  id: number;
  key: GuidelineItemKey; // Use the specific type
  icon: React.ReactNode;
};

type GuidelinesSectionProps = SectionProps & {
  ttsContext: TTSContextType;
};

const GuidelinesSection = ({ language = 'id', ttsContext }: GuidelinesSectionProps) => {
  // Get translations based on language
  const t = guidelinesTranslations[language];

  // Fetch dynamic guidelines URLs from API
  const { urls: guidelinesUrls, loading: urlsLoading } = useGuidelinesUrls(language);

  // Use centralized TTS context
  const { isSpeaking, isPaused, currentSpeakingId, toggleSpeech } = ttsContext;

  // Single TTS for entire GuidelinesSection
  const handleSectionTTS = () => {
    const sectionText = `${t.title}. ${language === 'id' ? 'Terdapat panduan website dan produk offline.' : 'Website and offline product guidelines available.'}`;
    toggleSpeech(sectionText, 'guidelines-section');
  };
  
  // Define guidelines with properly typed keys
  const guidelines: GuidelineItem[] = [
    {
      id: 1,
      key: 'website',
      icon: <Globe className="text-white w-6 h-6" />
    },
    {
      id: 2,
      key: 'offlineProduct',
      icon: <Package className="text-white w-6 h-6" />
    },
    {
      id: 3,
      key: 'videoTutorial',
        icon: <Info className="text-white w-6 h-6" />
    }
  ]

  // Create dynamic URLs mapping, falling back to static translations if API data is not loaded
  const getGuidelineUrl = (key: GuidelineItemKey): string => {
    if (!guidelinesUrls || urlsLoading) {
      // Fallback to static translations while loading
      return t.urls[key];
    }

    // Map API response to guideline keys
    switch (key) {
      case 'website':
        return guidelinesUrls.website;
      case 'offlineProduct':
        return guidelinesUrls.offlineProduct;
      case 'videoTutorial':
        return guidelinesUrls.videoTutorial;
      default:
        return t.urls[key];
    }
  };

  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 })

  return (
    <div className="w-full cursor-pointer" ref={sectionRef}>
      <motion.div 
        className="flex items-center gap-2 mb-4 px-1"
        initial={{ opacity: 0, y: -10 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -10 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-xl md:text-2xl font-bold text-primary">{t.title}</h2>
        
        {/* Single TTS button for entire section */}
        <Button
          variant="ghost"
          size="sm"
          onClick={handleSectionTTS}
          aria-label={language === 'id' ? 'Baca section panduan' : 'Read guidelines section'}
          className="text-gray-500 hover:text-primary"
        >
          {currentSpeakingId === 'guidelines-section' && isSpeaking ? (
            isPaused ? <Play className="h-4 w-4" /> : <Pause className="h-4 w-4" />
          ) : (
            <Volume2 className="h-4 w-4" />
          )}
        </Button>
      </motion.div>
      
      <motion.div 
        className="grid grid-cols-2 md:grid-cols-4 gap-4"
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        {guidelines.map((item, index) => (
          <Link href={getGuidelineUrl(item.key)} key={item.id} target="_blank">
          <motion.div
            key={item.id}
            id={`guide-${item.key}`}
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.5, delay: 0.1 * index }}
            whileHover={{ y: -5, transition: { duration: 0.2 } }}
          >
            <Card className="shadow-sm hover:shadow transition-all duration-300 p-0">
              <CardContent className="p-4 flex items-center gap-3">
                <div className="rounded-lg w-12 h-12 flex items-center justify-center flex-shrink-0 overflow-hidden">
                  <div
                    style={{ background: 'linear-gradient(to right, #0077D4, #4CB0FF)' }} 
                    className="w-full h-full flex items-center justify-center"
                  >
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.2 }}
                    >
                      {item.icon}
                    </motion.div>
                  </div>
                </div>
                <span className="font-bold text-primary">{t.items[item.key]}</span>
              </CardContent>
              </Card>
            </motion.div>
          </Link>
        ))}
      </motion.div>
    </div>
  )
}

export default GuidelinesSection
