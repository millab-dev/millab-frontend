'use client'

import React, { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { SectionProps, connectWithUsSectionTranslations } from './types'
import { FaInstagram, FaLinkedin, FaEnvelope } from 'react-icons/fa'

const ConnectWithUsSection: React.FC<SectionProps> = ({ language = 'id' }) => {
  const t = connectWithUsSectionTranslations[language]
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })

  const contactItems = [
    {
      label: t.labels.instagram,
      value: t.contactInfo.instagram,
      icon: <FaInstagram className="text-[#E1306C] text-5xl" />,
      link: `https://instagram.com/${t.contactInfo.instagram.replace('@', '')}`
    },
    {
      label: t.labels.linkedin,
      value: t.contactInfo.linkedin,
      icon: <FaLinkedin className="text-[#0077B5] text-5xl" />,
      link: `https://www.linkedin.com/company/mil-lab-indonesia`
    },
    {
      label: t.labels.email,
      value: t.contactInfo.email,
      icon: <FaEnvelope className="text-gray-400 text-5xl" />,
      link: `mailto:${t.contactInfo.email}`
    }
  ]

  return (
    <div className="py-8 md:py-12" ref={ref}>
      <motion.h2 
        className="text-2xl md:text-4xl font-bold mb-8 text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
        transition={{ duration: 0.7 }}
      >
        {t.title}
      </motion.h2>

      <div className="max-w-3xl mx-auto bg-white rounded-lg overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-3 ">
          {contactItems.map((item, index) => (
            <motion.div 
              key={item.label}
              className="p-6 flex flex-col items-center text-center"
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ delay: isInView ? 0.3 + 0.2 * index : 0, duration: 0.6 }}
            >
              <a 
                href={item.link}
                target="_blank" 
                rel="noopener noreferrer"
                className="flex flex-col items-center"
              >
                <div className="mb-3">
                  {item.icon}
                </div>
                
                <div className="text-primary hover:text-primary/80 transition-colors text-sm md:text-base font-semibold hover:underline mt-2">
                  {item.value}
                </div>
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default ConnectWithUsSection
