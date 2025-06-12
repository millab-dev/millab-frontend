"use client";

import React from 'react';
import ScanCamera from './ScanCamera';
import ScanDescription from './ScanDescription';
import BottomNavbar from '../core/BottomNavbar';

const ScanPage = () => {
  return (
    <div className="container mx-auto px-4 py-6  max-w-4xl transition-all duration-300 ease-in-out md:py-10 lg:py-12">
      <div className="text-center mb-4 md:mb-8 lg:mb-10">
        <h1 className="text-2xl font-bold md:text-3xl transition-all duration-300 ease-in-out">Scan QR Code</h1>
        <p className="text-gray-600 text-base md:text-lg mt-2 transition-all duration-300 ease-in-out">
          Point your camera at a QR code to access content instantly.
        </p>
      </div>
      
      <div className="space-y-6 md:space-y-8 lg:space-y-10 transition-all duration-300 ease-in-out">
        <ScanCamera />
        <ScanDescription />
      </div>
      <BottomNavbar/>
    </div>
  );
};

export default ScanPage;
