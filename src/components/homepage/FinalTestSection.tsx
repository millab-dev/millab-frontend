"use client"
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import Link from 'next/link'
import { SectionProps, finalTestTranslations } from './types'

type FinalTestSectionProps = SectionProps;

const FinalTestSection = ({ language = 'id' }: FinalTestSectionProps) => {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 })
  
  // Get translations based on language
  const t = finalTestTranslations[language];
  
  return (
    <div className="w-full " ref={sectionRef}>
      <motion.h2 
        className="text-xl md:text-2xl font-bold mb-4 px-1 text-primary"
        initial={{ opacity: 0, y: -10 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -10 }}
        transition={{ duration: 0.5 }}
      >
        {t.title}
      </motion.h2>
      
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
