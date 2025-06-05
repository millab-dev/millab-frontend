'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent } from "../ui/card"
import MillabSection from './MillabSection'
import OurTeamSection from './OurTeamSection'
import WhatHaveWeMade from './WhatHaveWeMade'
import AwardSection from './AwardSection'

const DesktopCardContent: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="w-full"
    >
      <Card className="p-0">
        <CardContent className="p-8">
          <MillabSection />
          
          <hr className="my-5 border-t-2 border-gray-300" />
          
          <div className="mt-5">
            <OurTeamSection />
          </div>
          
          <hr className="my-5 border-t-2 border-gray-300" />
          
          <div className="mt-5">
            <WhatHaveWeMade />
          </div>
          
          <hr className="my-5 border-t-2 border-gray-300" />
          
          <div className="mt-5">
            <AwardSection />
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

export default DesktopCardContent
