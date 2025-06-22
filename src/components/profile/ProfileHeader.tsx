"use client"
import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Card, CardContent } from "@/components/ui/card";
import { User } from '@/types/user';
import { ProfileComponentProps, profileHeaderTranslations } from './types';
import profileHeader from '@/assets/profile-header.svg'

type Props = {
    user: Partial<User>
} & ProfileComponentProps;

const ProfileHeader = ({user, language = 'id'}: Props) => {
  // Get translations based on language
  const t = profileHeaderTranslations[language];
  return (
    <div className="w-full max-w-5xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="w-full"
      >
      <Card 
        className="shadow-md p-0 border border-gray-200 hover:shadow-lg transition-all duration-300 relative overflow-hidden"
      >
        {/* Cloud Background Elements */}
        <motion.div 
          className="absolute left-0 top-4 md:hidden"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.2 }}
        >
          <Image 
            src="/cloud-left.svg" 
            alt="" 
            width={80} 
            height={80}
          />
        </motion.div>
        <motion.div 
          className="absolute right-0 bottom-0 md:hidden"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.3 }}
        >
          <Image 
            src="/cloud-right.svg" 
            alt="" 
            width={80} 
            height={80}
          />
        </motion.div>
        <motion.div 
          className="absolute left-0 top-6 hidden md:flex"
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
        >
          <Image 
            src="/cloud-left.svg" 
            alt="" 
            width={130} 
            height={130}
          />
        </motion.div>
        <motion.div 
          className="absolute right-0 -bottom-2 hidden md:flex"
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
        >
          <Image 
            src="/cloud-right.svg" 
            alt="" 
            width={130} 
            height={130}
          />
        </motion.div>
        <CardContent className="p-4 md:p-6">
          {/* Logo at top-center */}
          <motion.div 
            className="flex justify-center mb-4"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ 
              duration: 0.5,
              delay: 0.3,
              type: "spring",
              stiffness: 200
            }}
          >
            <motion.div
              whileHover={{ scale: 1.1, rotate: 5 }}
              whileTap={{ scale: 0.9 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
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
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ 
                  type: "spring",
                  stiffness: 100,
                  damping: 15,
                  delay: 0.4
                }}
                whileHover={{ 
                  y: -5,
                  boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
                  border: '1px solid #FFB020',
                  transition: { 
                    type: "spring",
                    stiffness: 300,
                    damping: 15
                  }
                }}
              >
                <Image 
                  src={profileHeader} 
                  alt="Profile character" 
                  fill 
                  className="object-cover" 
                  priority
                />
              </motion.div>
              {/* Date of Birth */}
              <div className="mt-2 text-center">
                <p className="text-sm md:text-base font-semibold">{user.birthdate}</p>
              </div>
            </div>
            
            {/* Profile Info */}
            <div className="flex-1">
              {/* NAME */}
              <div className="mb-3">
                <p className="text-xs md:text-sm text-gray-500 uppercase">{t.nameLabel}</p>
                <p className="text-sm md:text-xl font-semibold">{user.name}</p>
              </div>
              
              {/* Two-column layout for smaller info */}
              <div className="grid grid-cols-2 gap-x-2 gap-y-2">
                {/* BIRTHPLACE */}
                <div>
                  <p className="text-xs md:text-sm text-gray-500 uppercase">{t.birthplaceLabel}</p>
                  <p className="text-sm md:text-xl font-semibold">{user.birthplace}</p>
                </div>
                
                {/* PHONE */}
                <div>
                  <p className="text-xs md:text-sm text-gray-500 uppercase">{t.usernameLabel}</p>
                  <p className="text-sm md:text-xl font-semibold">{user.username}</p>
                </div>
                
                {/* GENDER */}
                <div>
                  <p className="text-xs md:text-sm text-gray-500 uppercase">{t.genderLabel}</p>
                  <p className="text-sm md:text-xl font-semibold">{user.gender}</p>
                </div>
                
                {/* SCHOOL */}
                <div>
                  <p className="text-xs md:text-sm text-gray-500 uppercase">{t.schoolLabel}</p>
                  <p className="text-sm md:text-xl font-semibold">{user.socializationLocation}</p>
                </div>
              </div>
              
              {/* EMAIL - Single column below the grid */}
              <div className="mt-4 col-span-2">
                <p className="text-xs md:text-sm text-gray-500 uppercase">{t.emailLabel}</p>
                <p className="text-sm md:text-xl font-semibold">{user.email}</p>
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