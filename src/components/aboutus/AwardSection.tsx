'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { SectionProps, awardSectionTranslations } from './types'

// Award data
const awards = [
  {
    name: 'Award Name',
    description: 'Description of the award. Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
  },
  {
    name: 'Award Name',
    description: 'Description of the award. Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
  },
  {
    name: 'Award Name',
    description: 'Description of the award. Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
  }
]

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: 'easeOut'
    }
  }
}

const AwardSection: React.FC<SectionProps> = ({ language = 'id' }) => {
  // Get translations based on language
  const t = awardSectionTranslations[language];
  return (
    <div className="py-12 px-4 md:px-8 max-w-7xl mx-auto">
      <motion.h2 
        className="text-3xl md:text-4xl font-bold text-center mb-3"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {t.title}
      </motion.h2>
      
      <motion.p 
        className="text-center md:text-lg text-gray-600 mb-10 max-w-3xl mx-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        {t.description}
      </motion.p>
      
      <motion.div 
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {awards.map((award, index) => (
          <motion.div 
            key={index}
            className="bg-white rounded-xl shadow-md p-6 flex flex-col items-center transition-all duration-300 hover:shadow-lg hover:-translate-y-1 hover:bg-blue-50/30 group"
            variants={itemVariants}
            whileHover={{ scale: 1.03 }}
          >
            <div className="w-32 h-32 mb-4 flex items-center justify-center">
              <img
                src="/pet-chill.png"
                alt={award.name}
                className="w-full h-auto object-contain"
              />
            </div>
            <h3 className="font-semibold text-lg text-center">{award.name}</h3>
            <p className="text-gray-500 text-sm text-center mt-2">{award.description}</p>
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}

export default AwardSection
