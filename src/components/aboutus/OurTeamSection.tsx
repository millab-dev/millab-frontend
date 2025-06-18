'use client'

import React, { useState } from 'react'
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
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  
  // Toggle function - if clicking the same member, deactivate it
  const toggleDescription = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="pt-16 pb-20 md:pt-20 md:pb-24 px-4 max-w-screen-xl mx-auto">
      <motion.h2 
        className="text-2xl md:text-4xl font-bold mb-12 text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {t.title}
      </motion.h2>
      
      <div className="grid grid-cols-2 md:grid-cols-3 gap-10 md:gap-16 md:px-8">
        {t.teamMembers.map((member, index) => (
          <motion.div
            key={index}
            className="group relative flex flex-col items-center transition-all duration-300 cursor-pointer"
            variants={cardVariants as any}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            custom={index}
            whileHover={{ y: -5 }}
            onClick={() => toggleDescription(index)}
          >
            <div className="h-auto mb-6 transition-all duration-300" style={{ maxWidth: "180px" }}>
              <motion.img
                src={member.imageUrl}
                alt={member.name}
                className={`w-full aspect-[300/280] object-cover transition-all duration-300 
                  ${activeIndex === index ? 'grayscale-0' : 'grayscale'}
                  group-hover:grayscale-0`}
                whileHover={{ scale: 1.15 }}
                transition={{ type: "spring", stiffness: 300, damping: 15 }}
              />
            </div>
            <h3 className={`font-semibold text-lg text-center transition-colors duration-300 
              ${activeIndex === index ? 'text-primary' : ''}
              group-hover:text-primary`}>{member.name}</h3>
            <p className="text-gray-600 text-sm md:text-base text-center mb-1">{member.role}</p>
            

            
            {/* Description that appears on hover or click */}
            <div 
              className={`overflow-hidden transition-all duration-500 ease-in-out
                ${activeIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'} 
                group-hover:max-h-96 group-hover:opacity-100`}
            >
              <p className="text-gray-700 text-center text-sm max-w-[250px] mt-4 mb-6 px-3 py-2 bg-gray-50 rounded-md">
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
