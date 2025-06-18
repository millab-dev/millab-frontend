'use client'

import React, { useState, useEffect, useCallback, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { SectionProps, awardSectionTranslations } from './types'
import Image from 'next/image'
import useEmblaCarousel from 'embla-carousel-react'

// Recognition media data - using placeholder images for now
const recognitionMedia = [
  {
    imageUrl: '/documentation-1.jpg', 
    alt: 'UNESCO Youth Hackathon 2024 Award'
  },
  {
    imageUrl: '/documentation-2.JPG', 
    alt: 'MIL Lab UNESCO Youth Hackathon 2024 Award'
  },
]

const AwardSection: React.FC<SectionProps> = ({ language = 'id' }) => {
  const t = awardSectionTranslations[language];
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });
  
  const scrollPrev = useCallback(
    () => emblaApi && emblaApi.scrollPrev(),
    [emblaApi]
  );
  
  const scrollNext = useCallback(
    () => emblaApi && emblaApi.scrollNext(),
    [emblaApi]
  );

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on('select', onSelect);
    return () => {
      emblaApi.off('select', onSelect);
    };
  }, [emblaApi, onSelect]);

  return (
    <div className="py-12 px-4 md:px-8 max-w-7xl mx-auto" ref={sectionRef}>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
        {/* Text Content - First on mobile, second on desktop (order changes) */}
        <motion.div
          className="flex flex-col items-start order-1 md:order-2 md:col-span-2"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ delay: 0.3, duration: 0.7 }}
        >
          <motion.h2 
            className="text-2xl md:text-4xl font-bold mb-3 md:mb-4"
            initial={{ opacity: 0, y: -15 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -15 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            {t.title}
          </motion.h2>
          
          <motion.div 
            className="text-gray-600 mb-6 md:mb-0"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ delay: 0.6, duration: 0.7 }}
          >
            <p className="text-lg text-justify">{t.description}</p>
          </motion.div>
        </motion.div>
        
        {/* Carousel - Second on mobile, first on desktop (order changes) */}
        <motion.div 
          className="relative order-2 md:order-1 md:col-span-1"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
          transition={{ delay: 0.2, duration: 0.7 }}
        >
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex">
              {recognitionMedia.map((item, index) => (
                <motion.div 
                  key={index} 
                  className="min-w-full"
                  initial={{ opacity: 0 }}
                  animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                  transition={{ delay: 0.4 + index * 0.1, duration: 0.5 }}
                >
                  <div className="rounded-xl overflow-hidden">
                    <div className="relative w-full h-72">
                      <Image 
                        src={item.imageUrl}
                        alt={item.alt}
                        fill
                        className="object-cover"
                      />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
          
          {/* Navigation controls */}
          <motion.button 
            onClick={scrollPrev} 
            className="absolute top-1/2 left-1 -translate-y-1/2 p-1.5 bg-primary text-white rounded-full hover:bg-primary/90 transition-colors z-10"
            aria-label="Previous slide"
            initial={{ opacity: 0, x: 10 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 10 }}
            transition={{ delay: 0.7, duration: 0.5 }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 18l-6-6 6-6"/>
            </svg>
          </motion.button>
          
          <motion.button 
            onClick={scrollNext} 
            className="absolute top-1/2 right-1 -translate-y-1/2 p-1.5 bg-primary text-white rounded-full hover:bg-primary/90 transition-colors z-10"
            aria-label="Next slide"
            initial={{ opacity: 0, x: -10 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
            transition={{ delay: 0.7, duration: 0.5 }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 18l6-6-6-6"/>
            </svg>
          </motion.button>
          
          {/* Carousel indicators */}
          <motion.div 
            className="absolute bottom-3 left-0 right-0 flex justify-center gap-2"
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
            transition={{ delay: 0.8, duration: 0.5 }}
          >
            {recognitionMedia.map((_, idx) => (
              <motion.button
                key={idx}
                onClick={() => emblaApi?.scrollTo(idx)}
                className={`w-2.5 h-2.5 rounded-full transition-colors ${selectedIndex === idx ? 'bg-primary' : 'bg-gray-300'}`}
                aria-label={`Go to slide ${idx + 1}`}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0.8, opacity: 0 }}
                transition={{ delay: 0.9 + idx * 0.1, duration: 0.4 }}
              />
            ))}
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}

export default AwardSection
