"use client"
import { motion } from 'framer-motion'
import MillabSection from './MillabSection'
import OurTeamSection from './OurTeamSection'
import AwardSection from './AwardSection'
import ConnectWithUsSection from './ConnectWithUsSection'
import { SectionProps } from './types'

const BottomSheetSection = ({ language = 'id' }: SectionProps) => {
  return (
    <motion.div 
      className="w-full min-h-[calc(100vh-14.43rem)] md:min-h-[calc(100vh-16.43rem)] rounded-t-4xl bg-background shadow-lg max-w-7xl mx-auto overflow-x-hidden"
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ 
        duration: 0.7, 
        ease: [0.22, 1, 0.36, 1] // Custom ease curve for smooth animation
      }}
    >
      <div className="flex flex-col px-4 pt-4 pb-24 lg:pt-12 lg:pb-12 max-w-6xl mx-auto">
        {/* MIL Lab section */}
        <MillabSection language={language} />
        
        <hr className="my-4 border-t-2 border-gray-300" />
        
        {/* Team section */}
        <div className="">
          <OurTeamSection language={language} />
        </div>
        
        <hr className="my-4 border-t-2 border-gray-300" />
        

        
        {/* Award section */}
        <div className="">
          <AwardSection language={language} />
        </div>
        
        <hr className="my-4 border-t-2 border-gray-300" />
        
        {/* Connect With Us section */}
        <div className="">
          <ConnectWithUsSection language={language} />
        </div>
      </div>
    </motion.div>
  )
}

export default BottomSheetSection