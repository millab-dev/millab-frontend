'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { SectionProps, projectSectionTranslations } from './types'

// Product data (will always be the same regardless of language)
const products = [
  {
    name: 'Product Name',
    description: 'Description of the product. Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
  },
  {
    name: 'Product Name',
    description: 'Description of the product. Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
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

const WhatHaveWeMade: React.FC<SectionProps> = ({ language = 'id' }) => {
  // Get translations based on language
  const t = projectSectionTranslations[language];
  return (
    <div className="pt-4 pb-10 md:pt-8 md:pb-8 px-4 md:px-8 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row items-center md:items-start gap-8 md:gap-12">
        {/* Mascot image - hidden on mobile */}
        <motion.div 
          className="hidden md:block w-full max-w-xs"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <img 
            src="/pet-hello.png" 
            alt="Mascot" 
            className="w-full h-auto" 
          />
        </motion.div>
        
        {/* Content */}
        <div className="w-full md:flex-1">
          <motion.h2 
            className="text-2xl md:text-3xl font-bold mb-4 text-center md:text-left"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {t.title}
          </motion.h2>
          
          <motion.p 
            className="text-base md:text-lg text-gray-600 mb-6 text-center md:text-left"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            {t.description}
          </motion.p>
          
          {/* Products grid */}
          <motion.div 
            className="grid grid-cols-1 sm:grid-cols-2 gap-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {products.map((product, index) => (
              <motion.div 
                key={index} 
                className="bg-white rounded-xl shadow-md p-4 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 hover:bg-blue-50/30 group"
                variants={itemVariants}
                whileHover={{ scale: 1.03 }}
              >
                <div className="flex flex-col items-center">
                  <div className="w-40 h-40 sm:w-44 sm:h-44 mb-4 flex items-center justify-center">
                    <img
                      src="/pet-book.png"
                      alt={product.name}
                      className="w-full h-auto object-contain"
                    />
                  </div>
                  <h3 className="font-semibold text-lg text-center">{product.name}</h3>
                  <p className="text-gray-500 text-sm text-center mt-2">{product.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default WhatHaveWeMade
