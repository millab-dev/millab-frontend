'use client';

import React from 'react';
import Image from 'next/image';

const ProfileHeader = () => {
  return (
    <div className="w-full max-w-5xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
      <div className="relative p-6 flex">
        {/* Background design with light blue swirls */}
        <div className="absolute top-0 right-0 left-0 bottom-0 bg-blue-50 opacity-30">
          <div className="absolute top-0 right-0 w-24 h-24 bg-blue-100 rounded-full -mr-12 -mt-12"></div>
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-blue-100 rounded-full -ml-16 -mb-16"></div>
        </div>
        
        {/* Logo */}
        <div className="absolute top-4 right-6">
          <div className="text-blue-600 font-bold text-xl">CILL LAB</div>
        </div>

        {/* Character Illustration */}
        <div className="relative w-1/3 flex items-center justify-center">
          <div className="w-40 h-40 relative">
            {/* Placeholder for character illustration */}
            <div className="w-full h-full bg-blue-100 rounded-full flex items-center justify-center overflow-hidden">
              <div className="text-blue-500 text-4xl">🐰</div>
            </div>
          </div>
        </div>

        {/* Profile Information */}
        <div className="relative w-2/3 pl-4">
          {/* Profile Details */}
          <div className="grid grid-cols-2 gap-y-2 gap-x-4">
            {/* Left Column */}
            <div>
              <div className="mb-4">
                <p className="text-gray-500 text-sm uppercase">NAME</p>
                <p className="text-gray-800 font-semibold">Dien Fitriani Azzahra Dien Fitriani</p>
              </div>
              
              <div className="mb-4">
                <p className="text-gray-500 text-sm uppercase">BIRTHPLACE</p>
                <p className="text-gray-800 font-semibold">Kalimantan</p>
              </div>
              
              <div className="mb-4">
                <p className="text-gray-500 text-sm uppercase">GENDER</p>
                <p className="text-gray-800 font-semibold">Female</p>
              </div>
            </div>
            
            {/* Right Column */}
            <div>
              <div className="mb-4">
                <p className="text-gray-500 text-sm uppercase">USERNAME</p>
                <p className="text-gray-800 font-semibold">@dien.fitriani.azzahr2</p>
              </div>
              
              <div className="mb-4">
                <p className="text-gray-500 text-sm uppercase">SCHOOL</p>
                <p className="text-gray-800 font-semibold">SMAN 1 Depok</p>
              </div>
            </div>
          </div>
          
          {/* Date of Birth */}
          <div className="absolute bottom-0 left-4">
            <p className="text-gray-600 text-sm">09-04-2005</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;