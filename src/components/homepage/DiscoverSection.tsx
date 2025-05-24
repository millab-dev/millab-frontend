"use client"

import { ChevronRight } from 'lucide-react'
import {
  Card,
  CardContent,
} from "@/components/ui/card"
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

const DiscoverSection = () => {
  // Mock data for modules
  const modules = [
    {
      id: 1,
      title: "Modul 1: Pengantar Literasi Media & Digital",
      progress: 20,
    },
    {
      id: 2,
      title: "Modul 1: Pengantar Literasi Media & Digital",
      progress: 20,
    }
  ]
  
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 })

  return (
    <div className="w-full py-4" ref={sectionRef}>
      <motion.div 
        className="flex justify-between items-center mb-4 px-1"
        initial={{ opacity: 0, y: -10 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -10 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-xl md:text-2xl font-bold text-primary">Discover Modules</h2>
        <motion.a 
          href="#" 
          className="text-gray-500 flex items-center hover:text-primary transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          See All <ChevronRight className="h-4 w-4 ml-1" />
        </motion.a>
      </motion.div>
      
      <motion.div 
        className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        {modules.map((module, index) => (
          <motion.div
            key={module.id}
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.5, delay: 0.1 * index }}
            whileHover={{ y: -5, transition: { duration: 0.2 } }}
          >
            <Card className="shadow-sm hover:shadow transition-all duration-300 p-0 flex flex-col overflow-hidden">
              <CardContent className="p-0 flex flex-col flex-1 w-full" style={{ aspectRatio: '171/242' }}>
                {/* Module card with fixed aspect ratio */}
                <div className="flex flex-col h-full p-6 sm:p-8">
                  {/* Icon contained within the card with rounded corners */}
                  <div className="w-full mb-auto">
                    <div className="aspect-square rounded-2xl overflow-hidden">
                      <div 
                        style={{ background: 'linear-gradient(to right, #0077D4, #4CB0FF)' }} 
                        className="w-full h-full flex items-center justify-center"
                      >
                        <motion.img 
                          src="/scroll-text.svg" 
                          alt="Module" 
                          className="w-16 h-16" 
                          whileHover={{ scale: 1.1 }}
                          transition={{ duration: 0.2 }}
                        />
                      </div>
                    </div>
                  </div>
                  
                  {/* Title and progress information */}
                  <div className="md:mt-6">
                    <h3 className="text-sm md:text-base font-semibold text-primary mb-3 line-clamp-2">{module.title}</h3>
                    <div className="flex items-center gap-2 mt-4">
                      <div className="h-2 flex-1 bg-gray-200 rounded-full overflow-hidden">
                        <motion.div 
                          className="h-full" 
                          style={{ backgroundColor: '#EF5BA1' }}
                          initial={{ width: 0 }}
                          animate={isInView ? { width: `${module.progress}%` } : { width: 0 }}
                          transition={{ duration: 0.8, delay: 0.2 + (0.1 * index) }}
                        />
                      </div>
                      <span className="text-xs text-gray-500">{module.progress}%</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}

export default DiscoverSection
