"use client"
import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const FeaturedImageSection = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })
  
  return (
    <motion.div 
      ref={ref}
      className="w-full mb-6 md:mb-8"
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.7 }}
    >
      <img 
        src="/mil-founder.svg" 
        alt="Founder" 
        className="w-full md:hidden mx-auto h-auto rounded-2xl"
      />
      <img 
        src="/mil-founder-md.svg" 
        alt="Founder" 
        className="w-full hidden md:block mx-auto h-auto rounded-2xl"
      />
    </motion.div>
  )
}

export default FeaturedImageSection
