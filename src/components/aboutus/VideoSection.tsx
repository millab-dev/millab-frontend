"use client"

import React, { useRef } from 'react'
import { SectionProps, videoSectionTranslations } from './types'
import { motion, useInView } from 'framer-motion'

const VideoSection: React.FC<SectionProps> = ({ language = 'id' }) => {
  // Get translations based on language
  const t = videoSectionTranslations[language];
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  // YouTube video ID extracted from https://youtu.be/prUruw1eHbQ
  const videoId = "prUruw1eHbQ";

  return (
    <div className="py-12 px-4 md:px-8 max-w-7xl mx-auto" ref={sectionRef}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
        {/* Video container - First on mobile, second on desktop (order changes) */}
        <motion.div 
          className="relative order-1 md:order-2"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
          transition={{ delay: 0.2, duration: 0.7 }}
        >
          <div className="rounded-xl overflow-hidden shadow-lg">
            <div className="relative pb-[56.25%] h-0">
              <iframe
                title={t.videoTitle}
                src={`https://www.youtube.com/embed/${videoId}`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="absolute top-0 left-0 w-full h-full rounded-xl"
              />
            </div>
          </div>
        </motion.div>
        
        {/* Text Content - Second on mobile, first on desktop (order changes) */}
        <motion.div
          className="flex flex-col items-start justify-center md:justify-start order-2 md:order-1"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ delay: 0.3, duration: 0.7 }}
        >
          <motion.h2 
            className="text-2xl md:text-4xl font-bold mb-3 md:mb-4"
            initial={{ opacity: 0, y: -15 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -15 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            {t.title}
          </motion.h2>
          
          <motion.div 
            className="text-gray-600 mb-6 md:mb-0"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ delay: 0.6, duration: 0.7 }}
          >
            <p className="text-base md:text-lg">{t.description}</p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}

export default VideoSection
