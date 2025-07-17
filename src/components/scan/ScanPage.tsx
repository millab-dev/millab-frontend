"use client";

import React, { useState } from 'react';
import ScanCamera from './ScanCamera';
import ScanDescription from './ScanDescription';
import BottomNavbar from '../core/BottomNavbar';
import { SectionProps, scanPageTranslations } from './types';

const ScanPage = ({ language = 'id' }: SectionProps) => {
  const [isCameraActive, setIsCameraActive] = useState(false);
  
  // Get translations based on language
  const t = scanPageTranslations[language];
  return (
    <>


      <div className="min-h-screen pb-20 bg-background relative overflow-x-hidden">
        {/* Mobile background */}
        <div 
          className="fixed inset-0 z-0 bg-primary md:hidden"
          style={{
            backgroundImage: "url('/batik-bg-4.svg')",
            backgroundRepeat: "repeat",
            backgroundSize: "auto auto",
            backgroundPosition: "top left"
          }}
        />
        
        {/* Desktop background with scaling options */}
        <div className="fixed inset-0 z-0 bg-primary hidden md:block">
          <div className="absolute inset-0 w-full h-full overflow-hidden">
            <div 
              className="w-[1536px] h-full mx-auto"
              style={{
                backgroundImage: "url('/batik-bg-4.svg')",
                backgroundRepeat: "repeat",
                backgroundSize: "cover",
                backgroundPosition: "center"
              }}
            />
          </div>
        </div>

        {/* Main content */}
        <div className="mx-auto px-4 py-6 relative z-10 max-w-4xl">
          <div className="text-center mb-6 md:mb-8">
            <h1 className="text-2xl font-bold md:text-3xl text-white">{t.title}</h1>
            <p className="text-gray-200 text-base md:text-lg mt-2">
              {t.subtitle}
            </p>
          </div>
          
          <div className="space-y-6 md:space-y-8 bg-white rounded-lg p-6 shadow-lg">
            <ScanCamera 
              isActive={isCameraActive} 
              setIsActive={setIsCameraActive} 
              language={language}
            />
            {!isCameraActive && <ScanDescription language={language} />}
          </div>

            <BottomNavbar language={language}/>

        </div>
      </div>
    </>
  );
};

export default ScanPage;
