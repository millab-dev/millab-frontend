"use client"
// Using SVG icon from public folder
import {
  Card,
  CardContent,
} from "@/components/ui/card"
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

const ListOfModuleSection = () => {
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
        List of Modules
      </motion.h2>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <motion.div
          whileHover={{ y: -5, boxShadow: "0px 8px 16px rgba(0, 0, 0, 0.1)" }}
          transition={{ duration: 0.2 }}
          className="w-full"
        >
          <Card className="shadow-sm transition-all duration-300 p-0 overflow-hidden">
            <CardContent className="p-4 flex items-start gap-4">
            {/* Custom SVG icon */}
            <div className="rounded-lg w-16 h-16 flex items-center justify-center flex-shrink-0 overflow-hidden">
              <div 
                style={{ background: 'linear-gradient(to right, #0077D4, #4CB0FF)' }} 
                className="w-full h-full flex items-center justify-center"
              >
                <motion.img 
                  src="/file-stack.svg" 
                  alt="Modules" 
                  className="w-8 h-8" 
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.2 }}
                />
              </div>
            </div>
            
            <div className="flex flex-col">
              <h3 className="text-lg md:text-xl font-bold text-primary">Modules</h3>
              <p className="text-sm md:text-base text-gray-500">
                Discover the full list of modules and unlock a world full of knowledge!
              </p>
            </div>
          </CardContent>
        </Card>
        </motion.div>
      </motion.div>
    </div>
  )
}

export default ListOfModuleSection