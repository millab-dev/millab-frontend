"use client"
import { Globe, Package } from 'lucide-react'
import {
  Card,
  CardContent,
} from "@/components/ui/card"
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { SectionProps, guidelinesTranslations } from './types'

// Define type for guideline item keys - must match keys in translations
type GuidelineItemKey = 'website' | 'offlineProduct';

type GuidelineItem = {
  id: number;
  key: GuidelineItemKey; // Use the specific type
  icon: React.ReactNode;
};

type GuidelinesSectionProps = SectionProps;

const GuidelinesSection = ({ language = 'id' }: GuidelinesSectionProps) => {
  // Get translations based on language
  const t = guidelinesTranslations[language];
  
  // Define guidelines with properly typed keys
  const guidelines: GuidelineItem[] = [
    {
      id: 1,
      key: 'website',
      icon: <Globe className="text-white w-6 h-6" />,
    },
    {
      id: 2,
      key: 'offlineProduct',
      icon: <Package className="text-white w-6 h-6" />,
    }
  ]

  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 })

  return (
    <div className="w-full " ref={sectionRef}>
      <motion.h2 
        className="text-xl md:text-2xl font-bold mb-4 px-1 text-primary"
        initial={{ opacity: 0, y: -10 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -10 }}
        transition={{ duration: 0.5 }}
      >
        {t.title}
      </motion.h2>
      
      <motion.div 
        className="grid grid-cols-2 md:grid-cols-4 gap-4"
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        {guidelines.map((item, index) => (
          <motion.div
            key={item.id}
            id={`guide-${item.key}`}
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.5, delay: 0.1 * index }}
            whileHover={{ y: -5, transition: { duration: 0.2 } }}
          >
            <Card className="shadow-sm hover:shadow transition-all duration-300 p-0">
              <CardContent className="p-4 flex items-center gap-3">
                <div className="rounded-lg w-12 h-12 flex items-center justify-center flex-shrink-0 overflow-hidden">
                  <div
                    style={{ background: 'linear-gradient(to right, #0077D4, #4CB0FF)' }} 
                    className="w-full h-full flex items-center justify-center"
                  >
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.2 }}
                    >
                      {item.icon}
                    </motion.div>
                  </div>
                </div>
                <span className="font-bold text-primary">{t.items[item.key]}</span>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}

export default GuidelinesSection
