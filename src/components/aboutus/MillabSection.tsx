"use client"
import React from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import owl from "@/assets/owl-2.svg"
import { SectionProps, millabSectionTranslations } from './types'

const MillabSection = ({ language = 'id' }: SectionProps) => {
  // Get translations based on language parameter
  const t = millabSectionTranslations[language];
  return (
    <div className="w-full pb-10 md:pb-12 pt-8 md:pt-6">
      {/* Mobile layout */}
      <div className="md:hidden flex flex-col gap-8">
        {/* Text content for mobile */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <div className="flex justify-center mb-4">
            <Image src={"/millab.svg"} alt={t.logoAlt} width={120} height={40} className="h-16 w-auto" />
          </div>
          <h2 className="text-2xl font-bold mb-3">{t.title}</h2>
          <div 
            className="text-base text-gray-700 mb-4 text-justify"
            dangerouslySetInnerHTML={{ __html: t.description1 }}
          />
          <div 
            className="text-base text-gray-700 text-justify"
            dangerouslySetInnerHTML={{ __html: t.description2 }}
          />
        </motion.div>
      </div>

      {/* Desktop layout - Grid with 3 columns */}
      <div className="hidden md:grid md:grid-cols-3 gap-8">
        {/* First 2 columns: Text content */}
        <motion.div
          className="col-span-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <h2 className="text-4xl font-bold mb-6">{t.title}</h2>
          <div 
            className="text-lg text-gray-700 mb-8 text-justify"
            dangerouslySetInnerHTML={{ __html: t.description1 }}
          />
          <div 
            className="text-lg text-gray-700 text-justify"
            dangerouslySetInnerHTML={{ __html: t.description2 }}
          />
        </motion.div>
        
        {/* 3rd column: Image */}
        <motion.div
          className="flex items-start justify-center"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <div className="relative w-full bg-orange-unesco rounded-3xl overflow-hidden">
            <Image 
              src={owl}
              alt={t.imageAlt} 
              width={400}
              height={400}
              className="object-contain w-full h-auto"
              style={{ display: 'block' }}
            />
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default MillabSection