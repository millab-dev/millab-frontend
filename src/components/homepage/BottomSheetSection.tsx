"use client"
import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import FeaturedImageSection from './FeaturedImageSection'
import ContinueReadingSection from './ContinueReadingSection'
import DiscoverSection from './DiscoverSection'
import ListOfModuleSection from './ListOfModuleSection'
import GuidelinesSection from './GuidelinesSection'
import FinalTestSection from './FinalTestSection'

const BottomSheetSection = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.1 })
  
  return (
    <motion.div 
      ref={ref}
      className="w-full min-h-[calc(100vh-14.43rem)] md:min-h-[calc(100vh-16.43rem)] rounded-t-4xl bg-background shadow-lg max-w-7xl mx-auto overflow-x-hidden"
      initial={{ y: 100, opacity: 0 }}
      animate={isInView ? { y: 0, opacity: 1 } : { y: 100, opacity: 0 }}
      transition={{ 
        duration: 0.7, 
        ease: [0.22, 1, 0.36, 1] // Custom ease curve for smooth animation
      }}
    >
      <div className="flex flex-col px-4 pt-4 pb-24 lg:pt-12 lg:pb-12 max-w-6xl mx-auto">
        {/* Featured image with animations */}
        <FeaturedImageSection />
        
        {/* Continue Reading section */}
        <ContinueReadingSection />
        
        {/* Discover Modules section */}
        <DiscoverSection />
        
        {/* List of Modules section */}
        <ListOfModuleSection />
        
        {/* Guidelines section */}
        <GuidelinesSection />
        
        {/* Final Test section */}
        <FinalTestSection />
      </div>
    </motion.div>
  )
}

export default BottomSheetSection
