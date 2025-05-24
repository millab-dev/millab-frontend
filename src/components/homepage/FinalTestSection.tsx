"use client"
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

const FinalTestSection = () => {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 })
  
  return (
    <div className="w-full py-4" ref={sectionRef}>
      <motion.h2 
        className="text-xl md:text-2xl font-bold mb-4 px-1 text-primary"
        initial={{ opacity: 0, y: -10 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -10 }}
        transition={{ duration: 0.5 }}
      >
        Final Quiz
      </motion.h2>
      
      {/* Clickable quiz banner with responsive images */}
      <motion.a 
        href="#" 
        className="block w-full relative overflow-hidden rounded-lg"
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        whileHover={{
          scale: 1.02,
          transition: { duration: 0.3 }
        }}
        whileTap={{ scale: 0.98 }}
      >
        {/* Mobile image */}
        <img 
          src="/final-quiz-link.svg" 
          alt="Final Quiz - Ready to test your skill?" 
          className="w-full h-auto rounded-lg md:hidden"
        />
        
        {/* Desktop image */}
        <img 
          src="/final-quiz-link-desktop.svg" 
          alt="Final Quiz - Ready to test your skill?" 
          className="w-full h-auto rounded-lg hidden md:block"
        />
      </motion.a>
    </div>
  )
}

export default FinalTestSection
