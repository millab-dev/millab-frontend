'use client'

import React, { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { aboutUsTranslations } from './types'

interface AboutUsHeaderProps {
  language?: 'id' | 'en'
}

const AboutUsHeader: React.FC<AboutUsHeaderProps> = ({ language = 'id' }) => {
  const t = aboutUsTranslations[language]
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.6 })
  
  return (
    <div className="h-[8rem] w-full" ref={ref}>
      <div className="h-full flex items-center justify-center">
        <motion.h1
          className="text-4xl md:text-5xl font-bold text-white text-center"
          initial={{ opacity: 0, y: -30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -30 }}
          transition={{
            duration: 0.8,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          {t.pageTitle}
        </motion.h1>
      </div>
    </div>
  )
}

export default AboutUsHeader
