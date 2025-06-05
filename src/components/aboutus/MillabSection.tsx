"use client"
import React from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import authLogo from "@/assets/authLogo.svg"

const MillabSection = () => {
  return (
    <div className="w-full pb-10 md:pb-12 pt-8 md:pt-6">
      <div className="flex flex-col md:flex-row items-center justify-between gap-8">
        {/* Text content */}
        <motion.div 
          className="md:w-7/12 pr-4"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <div className="md:hidden flex justify-center mb-4">
            <Image src={authLogo} alt="Mill Lab Logo" width={120} height={40} className="h-16 w-auto" />
          </div>
          <h2 className="text-2xl md:text-3xl font-bold mb-4 hidden md:block">MIL Lab Indonesia</h2>
          <p className="text-base md:text-lg text-gray-700 mb-6">
            <span className="md:hidden font-bold">Millab Indonesia </span> adalah Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam posuere 
            sollicitudin nunc. Vestibulum vel pretium erat. Aenean euismod finibus leo, quis 
            semper dolor. Nulla vulputate nulla eget orci lobortis, vitae egestas erat sodales. 
            Sed accumsan commodo pulvinar. Nunc et eros nec ante condimentum posuere.
          </p>
          <p className="text-base md:text-lg text-gray-700">
            Suspendisse ac risus at ante finibus feugiat quis vel massa. Quisque venenatis, felis 
            ac suscipit viverra, nisi sem aliquam enim, ac scelerisque lorem nulla ac mi. Sed et 
            ante eu orci tincidunt lobortis. Morbi consequat, urna vel tempor porta, metus felis 
            mattis leo, faucibus viverra justo arcu ut ligula. Donec rhoncus accumsan nunc.
          </p>
        </motion.div>
        
        {/* Image - hidden on mobile */}
        <motion.div 
          className="hidden md:block md:w-5/12 mt-6 md:mt-0 flex-shrink-0"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <div className="relative w-full h-64 md:h-80 flex justify-end">
            <Image 
              src="/pet-ask.png" 
              alt="MIL Lab Assistant" 
              width={400}
              height={400}
              className="object-contain"
              style={{ maxHeight: '100%' }}
            />
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default MillabSection