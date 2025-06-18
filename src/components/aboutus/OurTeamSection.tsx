'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { SectionProps, teamSectionTranslations } from './types'

// Animation variants for team member cards
const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.4,
      ease: 'easeOut'
    }
  })
}

const OurTeamSection: React.FC<SectionProps> = ({ language = 'id' }) => {
  // Get translations based on language
  const t = teamSectionTranslations[language];

  return (
    <section className="py-12 px-4 max-w-screen-xl mx-auto">
      <motion.h2 
        className="text-2xl md:text-4xl font-bold mb-12 text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {t.title}
      </motion.h2>
      
      <div className="grid grid-cols-2 md:grid-cols-3 gap-8 md:gap-12 md:px-8">
        {t.teamMembers.map((member, index) => (
          <motion.div
            key={index}
            className="group relative flex flex-col items-center transition-all duration-300"
            variants={cardVariants as any}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            custom={index}
            whileHover={{ y: -5 }}
          >
            <div className="h-40 w-40 sm:h-48 sm:w-48 mb-6 overflow-hidden rounded-full transition-all duration-300">
              <motion.img
                src={member.imageUrl}
                alt={member.name}
                className="w-full h-full object-cover"
                whileHover={{ scale: 1.15 }}
                transition={{ type: "spring", stiffness: 300, damping: 15 }}
              />
            </div>
            <h3 className="font-semibold text-lg text-center transition-colors duration-300 group-hover:text-primary">{member.name}</h3>
            <p className="text-gray-600 text-sm md:text-base text-center mb-1">{member.role}</p>
            
            {/* Description that appears on hover */}
            <div className="overflow-hidden max-h-0 group-hover:max-h-96 transition-all duration-500 ease-in-out">
              <p className="text-gray-700 text-center text-sm max-w-[250px] opacity-0 group-hover:opacity-100 transition-opacity duration-200 delay-100 mt-2 mb-4">
                {member.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

export default OurTeamSection
