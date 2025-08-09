"use client"
import { Volume2, Pause, Play } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import Link from 'next/link'
import { SectionProps, finalTestTranslations } from './types'
import { TTSContextType } from './index'

type FinalTestSectionProps = SectionProps & {
  ttsContext: TTSContextType;
};

const FinalTestSection = ({ language = 'id', ttsContext }: FinalTestSectionProps) => {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 })
  
  // Get translations based on language
  const t = finalTestTranslations[language];

  // Use centralized TTS context
  const { isSpeaking, isPaused, currentSpeakingId, toggleSpeech, stopSpeaking } = ttsContext;

  // Single TTS for entire FinalTestSection
  const handleSectionTTS = () => {
    const sectionText = `${t.title}. ${language === 'id' ? 'Ujian akhir tersedia untuk menguji pemahaman Anda.' : 'Final test available to test your understanding.'}`;
    toggleSpeech(sectionText, 'final-test-section');
  };
  
  return (
    <div className="w-full " ref={sectionRef} id="final-quiz">
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
          aria-label={language === 'id' ? 'Baca section ujian akhir' : 'Read final test section'}
          className="text-gray-500 hover:text-primary"
        >
          {currentSpeakingId === 'final-test-section' && isSpeaking ? (
            isPaused ? <Play className="h-4 w-4" /> : <Pause className="h-4 w-4" />
          ) : (
            <Volume2 className="h-4 w-4" />
          )}
        </Button>
      </motion.div>
      
      {/* Clickable quiz banner with responsive images and overlay text */}
      <Link href="/final-quiz">
        <motion.div 
          className="block w-full relative overflow-hidden rounded-lg h-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          whileHover={{
            scale: 1.02,
            transition: { duration: 0.3 }
          }}
          whileTap={{ scale: 0.98 }}
        >
          {/* Banner with image and overlay */}
          <div className="relative">
            {/* Background images */}
            <img 
              src="/final-quiz-link.png" 
              alt="" 
              className="w-full rounded-lg md:hidden"
            />
            
            <img 
              src="/final-quiz-link-desktop.png" 
              alt="" 
              className="w-full rounded-lg hidden md:block"
            />
            
            {/* Overlay content */}
            <div className="absolute inset-0 z-10 flex flex-col justify-center text-white p-6 md:p-8">
              <motion.h3 
                className="text-lg md:text-3xl font-medium mb-2"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                {t.readyText}
              </motion.h3>
              <motion.div 
                className="text-sm md:text-xl hover:underline transition-all"
                initial={{ opacity: 0, y: 10 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                {t.seeMoreText}
              </motion.div>
            </div>
          </div>
        </motion.div>
      </Link>
    </div>
  )
}

export default FinalTestSection
