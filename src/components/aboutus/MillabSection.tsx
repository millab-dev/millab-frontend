"use client"
import React from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import authLogo from "@/assets/authLogo.svg"
import { SectionProps, millabSectionTranslations } from './types'

const MillabSection = ({ language = 'id' }: SectionProps) => {
  // Get translations based on language parameter
  const t = millabSectionTranslations[language];
  return (
    <div className="w-full pb-10 md:pb-12 pt-8 md:pt-6">
      <div className="flex flex-col md:flex-row items-center justify-between gap-8">
        {/* Text content */}
        <motion.div 
          className="md:w-7/12 pr-4"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <div className="md:hidden flex justify-center mb-4">
            <Image src={authLogo} alt={t.logoAlt} width={120} height={40} className="h-16 w-auto" />
          </div>
          <h2 className="text-2xl md:text-4xl font-bold mb-4 hidden md:block">{t.title}</h2>
          <p className="text-base md:text-lg text-gray-700 mb-6">
            <span className="md:hidden font-bold">{t.title} </span> {t.description1}
          </p>
          <p className="text-base md:text-lg text-gray-700">
            {t.description2}
          </p>
        </motion.div>
        
        {/* Image - hidden on mobile */}
        <motion.div 
          className="hidden md:block md:w-5/12 mt-6 md:mt-0 flex-shrink-0"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <div className="relative w-full h-64 md:h-80 flex justify-end">
            <Image 
              src="/pet-ask.png" 
              alt={t.imageAlt} 
              width={400}
              height={400}
              className="object-contain"
              style={{ maxHeight: '100%' }}
            />
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default MillabSection