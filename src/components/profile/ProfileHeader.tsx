"use client"
import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Card, CardContent } from "@/components/ui/card";
import { User } from '@/types/user';

type Props = {
    user: Partial<User>
}

const ProfileHeader = ({user}: Props) => {
  return (
    <div className="w-full max-w-5xl mx-auto">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="w-full"
      >
      <Card 
        className="shadow-md p-0 border border-gray-200 hover:shadow-lg transition-all duration-300 relative overflow-hidden"
      >
        {/* Cloud Background Elements */}
        <div className="absolute left-0 top-4 md:hidden">
          <Image 
            src="/cloud-left.svg" 
            alt="" 
            width={80} 
            height={80}
          />
        </div>
        <div className="absolute right-0 bottom-0 md:hidden">
          <Image 
            src="/cloud-right.svg" 
            alt="" 
            width={80} 
            height={80}
          />
        </div>
        <div className="absolute left-0 top-6 hidden md:flex">
          <Image 
            src="/cloud-left.svg" 
            alt="" 
            width={130} 
            height={130}
          />
        </div>
        <div className="absolute right-0 -bottom-2 hidden md:flex">
          <Image 
            src="/cloud-right.svg" 
            alt="" 
            width={130} 
            height={130}
          />
        </div>
        <CardContent className="p-4 md:p-6">
          {/* Logo at top-center */}
          <motion.div 
            className="flex justify-center mb-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ 
              duration: 0.3,
              delay: 0.1
            }}
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Image 
                src={"/millab-logo.svg"} 
                alt="" 
                width={80} 
                height={80} 
                className='hidden md:flex'
                priority
              />
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Image 
                src={"/millab-logo.svg"} 
                alt="" 
                width={60} 
                height={60} 
                className='flex md:hidden'
                priority
              />
            </motion.div>
          </motion.div>
          <div className="flex flex-row">
            {/* Image and DOB */}
            <div className="flex flex-col items-center mr-4 md:mr-6">
              {/* Image Placeholder */}
              <motion.div 
                className="w-[90px] bg-white h-[120px] md:w-[119px] md:h-[159px] relative overflow-hidden border border-[#D9D9D9]"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ 
                  duration: 0.3,
                  delay: 0.2
                }}
                whileHover={{ 
                  boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
                  y: -2,
                  transition: { 
                    duration: 0.2,
                    ease: [0.4, 0, 0.2, 1]
                  }
                }}
              >
                <Image 
                  src="/kelinci.png" 
                  alt="Profile character" 
                  fill 
                  className="object-cover" 
                  priority
                />
              </motion.div>
              {/* Date of Birth */}
              <div className="mt-2 text-center">
                <p className="text-xs md:text-sm font-semibold">{user.birthdate}</p>
              </div>
            </div>
            
            {/* Profile Info */}
            <div className="flex-1">
              {/* NAME */}
              <div className="mb-3">
                <p className="text-[10px] md:text-xs text-gray-500 uppercase">NAME</p>
                <p className="text-xs md:text-lg font-semibold">{user.name}</p>
              </div>
              
              {/* Two-column layout for smaller info */}
              <div className="grid grid-cols-2 gap-x-2 gap-y-2">
                {/* BIRTHPLACE */}
                <div>
                  <p className="text-[10px] md:text-xs text-gray-500 uppercase">BIRTHPLACE</p>
                  <p className="text-xs md:text-lg font-semibold">{user.birthplace}</p>
                </div>
                
                {/* PHONE */}
                <div>
                  <p className="text-[10px] md:text-xs text-gray-500 uppercase">PHONE</p>
                  <p className="text-xs md:text-lg font-semibold">{user.phoneNumber}</p>
                </div>
                
                {/* GENDER */}
                <div>
                  <p className="text-[10px] md:text-xs text-gray-500 uppercase">GENDER</p>
                  <p className="text-xs md:text-lg font-semibold">{user.gender}</p>
                </div>
                
                {/* SCHOOL */}
                <div>
                  <p className="text-[10px] md:text-xs text-gray-500 uppercase">SCHOOL</p>
                  <p className="text-xs md:text-lg font-semibold">{user.socializationLocation}</p>
                </div>
              </div>
              
              {/* EMAIL - Single column below the grid */}
              <div className="mt-4 col-span-2">
                <p className="text-[10px] md:text-xs text-gray-500 uppercase">EMAIL</p>
                <p className="text-xs md:text-lg font-semibold">{user.email}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      </motion.div>
    </div>
  );
};

export default ProfileHeader;