'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent } from "../ui/card"
import MillabSection from './MillabSection'
import OurTeamSection from './OurTeamSection'
import WhatHaveWeMade from './WhatHaveWeMade'
import AwardSection from './AwardSection'
import ConnectWithUsSection from './ConnectWithUsSection'
import { SectionProps } from './types'

const DesktopCardContent: React.FC<SectionProps> = ({ language = 'id' }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="w-full"
    >
      <Card className="p-0">
        <CardContent className="p-8">
          <MillabSection language={language} />
          
          <hr className="my-5 border-t-2 border-gray-300" />
          
          <div className="mt-5">
            <OurTeamSection language={language} />
          </div>
          
          <hr className="my-5 border-t-2 border-gray-300" />
          
          
          <div className="mt-5">
            <AwardSection language={language} />
          </div>
          
          <hr className="my-5 border-t-2 border-gray-300" />
          
          <div className="mt-5">
            <ConnectWithUsSection language={language} />
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

export default DesktopCardContent
