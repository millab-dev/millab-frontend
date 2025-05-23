
"use client";

import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Mail, Phone } from "lucide-react";
import { motion } from 'framer-motion';

const AdditionalInformation = () => {
  return (
    <motion.div 
      className="w-full max-w-5xl mx-auto mt-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3, delay: 0.15 }}
    >
      <motion.h2 
        className="text-base md:text-lg font-semibold mb-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3, delay: 0.2 }}
      >
        Additional Information
      </motion.h2>
      <motion.div
        initial={{ opacity: 0, y: 5 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.25 }}
      >
        <Card className='p-0'>
          <CardContent className="p-4 md:p-5">
            <div className="space-y-4">
            {/* Email Information */}
            <motion.div 
              className="flex items-center"
              initial={{ opacity: 0, x: -5 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.3 }}
              whileHover={{ x: 3, transition: { duration: 0.2 } }}
            >
              <motion.div
                whileHover={{ scale: 1.1, rotate: 5 }}
                whileTap={{ scale: 0.95 }}
              >
                <Mail className="h-5 w-5 text-primary mr-3" />
              </motion.div>
              <span className="text-gray-700 text-sm md:text-base font-semibold">dienfitriani@gmail.com</span>
            </motion.div>
            
            {/* Phone Information */}
            <motion.div 
              className="flex items-center"
              initial={{ opacity: 0, x: -5 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.4 }}
              whileHover={{ x: 3, transition: { duration: 0.2 } }}
            >
              <motion.div
                whileHover={{ scale: 1.1, rotate: 5 }}
                whileTap={{ scale: 0.95 }}
              >
                <Phone className="h-5 w-5 text-primary mr-3" />
              </motion.div>
              <span className="text-gray-700 text-sm md:text-base font-semibold">+628884620475</span>
            </motion.div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
};

export default AdditionalInformation;