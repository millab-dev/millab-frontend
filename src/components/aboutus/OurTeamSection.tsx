'use client'

import React from 'react'
import { motion } from 'framer-motion'

// Team member data
const teamMembers = [
  { name: 'Member Name', role: 'Role', image: 'https://randomuser.me/api/portraits/men/1.jpg' },
  { name: 'Member Name', role: 'Role', image: 'https://randomuser.me/api/portraits/women/2.jpg' },
  { name: 'Member Name', role: 'Role', image: 'https://randomuser.me/api/portraits/men/3.jpg' },
  { name: 'Member Name', role: 'Role', image: 'https://randomuser.me/api/portraits/women/4.jpg' },
  { name: 'Member Name', role: 'Role', image: 'https://randomuser.me/api/portraits/men/5.jpg' },
  { name: 'Member Name', role: 'Role', image: 'https://randomuser.me/api/portraits/women/6.jpg' },
  { name: 'Member Name', role: 'Role', image: 'https://randomuser.me/api/portraits/men/7.jpg' },
  { name: 'Member Name', role: 'Role', image: 'https://randomuser.me/api/portraits/women/8.jpg' },
  { name: 'Member Name', role: 'Role', image: 'https://randomuser.me/api/portraits/men/9.jpg' },
]

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

const OurTeamSection: React.FC = () => {
  return (
    <div className="pt-4 pb-10 md:pt-8 md:pb-8 px-4 md:px-8 max-w-7xl mx-auto">
      <motion.h2 
        className="text-3xl md:text-4xl font-bold text-center mb-3"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Our Team
      </motion.h2>
      
      <motion.p 
        className="text-center md:text-lg text-gray-600 mb-10 max-w-3xl mx-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam posuere sollicitudin nunc. Vestibulum vel pretium erat. 
        Aenean euismod finibus leo, quis semper dolor. Nulla vulputate nulla eget arci lobortis, vitae egestas erat sodales.
      </motion.p>
      
      <div className="flex flex-wrap justify-center gap-x-2 gap-y-6 sm:gap-x-6 sm:gap-y-8 md:gap-x-8 md:gap-y-10 mx-auto">
        {teamMembers.map((member, index) => (
          <motion.div
            key={index}
            className="bg-white rounded-xl shadow-md p-5 flex flex-col items-center transition-all duration-300 hover:shadow-lg hover:-translate-y-1 hover:bg-blue-50/30 group w-[45%] sm:w-[160px] md:w-48 lg:w-52"
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={index}
            whileHover={{ scale: 1.03 }}
          >
            <div className="h-24 w-24 md:h-32 md:w-32 mb-4 overflow-hidden rounded-full">
              <img
                src={member.image}
                alt={member.name}
                className="w-full h-full object-cover"
              />
            </div>
            <h3 className="font-semibold text-base sm:text-lg text-center">{member.name}</h3>
            <p className="text-gray-500 text-xs sm:text-sm text-center">{member.role}</p>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

export default OurTeamSection
