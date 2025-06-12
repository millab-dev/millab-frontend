"use client"

import { ChevronRight, FileText } from 'lucide-react'
import {
  Card,
  CardContent,
} from "@/components/ui/card"
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import {
  ModuleCategory,
  BaseModule,
  SectionProps,
  continueReadingTranslations
} from './types'

// Use BaseModule for the modules
type Module = BaseModule;

// Use SectionProps for component props
type ContinueReadingSectionProps = SectionProps;

const ContinueReadingSection = ({ language = 'id' }: ContinueReadingSectionProps) => {
  // Get translations based on language
  const t = continueReadingTranslations[language];
  // Mock data for modules in progress
  const inProgressModules: Module[] = [
    {
      id: 1,
      title: "1. Pengantar Literasi Media",
      progress: 20,
      category: "beginner"
    },
    {
      id: 2,
      title: "2. Memahami Berbagai Media",
      progress: 35,
      category: "intermediate"
    }
  ]

  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 })

  return (
    <div className="w-full" ref={sectionRef}>
      <motion.div 
        className="flex justify-between items-center mb-4 px-1"
        initial={{ opacity: 0, y: -10 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -10 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-xl md:text-2xl font-bold text-primary">{t.title}</h2>
        <motion.a 
          href="/history" 
          className="text-gray-500 flex items-center hover:text-primary transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {t.seeAll} <ChevronRight className="h-4 w-4 ml-1" />
        </motion.a>
      </motion.div>
      
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 gap-4"
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        {inProgressModules.map((module, index) => (
          <motion.div
            key={module.id}
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.5, delay: 0.1 * index }}
            whileHover={{ y: -5, transition: { duration: 0.2 } }}
          >
            <Card className="shadow-sm hover:shadow transition-all duration-300 p-0">
              <CardContent className="p-4 flex items-center gap-4">
                <div className="rounded-lg w-20 h-20 flex items-center justify-center flex-shrink-0 overflow-hidden">
                  <div 
                    style={{ background: 'linear-gradient(to right, #0077D4, #4CB0FF)' }} 
                    className="w-full h-full flex items-center justify-center"
                  >
                    <FileText className="text-white w-10 h-10" />
                  </div>
                </div>
                
                <div className="flex flex-col flex-1">
                  {/* Level badge */}
                  <div className="mb-1.5">
                    <span 
                      className="text-xs py-1 px-2.5 rounded-md text-white"
                      style={{ 
                        backgroundColor: 
                          module.category === "beginner" ? "#218E44" : 
                          module.category === "intermediate" ? "#FBAD18" : "#EF5BA1" 
                      }}
                    >
                      {t.categories[module.category as ModuleCategory]}
                    </span>
                  </div>
                  
                  <h3 className="text-sm md:text-base font-semibold text-primary mb-2 truncate">{module.title}</h3>
                  <div className="flex items-center gap-2">
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
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}

export default ContinueReadingSection
