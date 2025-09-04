'use client'

import React, { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { SectionProps, sponsorSectionTranslations } from './types'
import Image from 'next/image'

const SponsorSection: React.FC<SectionProps> = ({ language = 'id' }) => {
  const t = sponsorSectionTranslations[language]
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })

  const sponsors = [
    {
      name: 'Social Media 4 Peace',
      logo: '/socialmedia4peace.png',
      alt: 'Social Media 4 Peace Logo'
    },
    {
      name: 'UNESCO',
      logo: '/unesco.png', 
      alt: 'UNESCO Logo'
    },
    {
      name: 'European Union',
      logo: '/europeunion.jpg',
      alt: 'European Union Logo'
    }
  ]

  return (
    <div className="py-8 md:py-12 px-4 md:px-8 max-w-7xl mx-auto" ref={ref}>
      {/* Title */}
      <motion.h2 
        className="text-2xl md:text-4xl font-bold text-center mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
        transition={{ duration: 0.7 }}
      >
        {t.title}
      </motion.h2>

      {/* Sponsor logos container */}
      <motion.div 
        className="flex flex-wrap items-center justify-center gap-4"
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ delay: 0.2, duration: 0.8 }}
      >
        {sponsors.map((sponsor, index) => (
          <motion.div
            key={sponsor.name}
            className="flex items-center justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ delay: 0.3 + index * 0.1, duration: 0.6 }}
          >
            <div className="relative flex items-center justify-center w-48 md:w-56 lg:w-64">
              <Image
                src={sponsor.logo}
                alt={sponsor.alt}
                width={280}
                height={160}
                className="max-h-24 md:max-h-32 lg:max-h-36 w-full object-contain transition-all duration-300 hover:scale-105"
              />
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}

export default SponsorSection
