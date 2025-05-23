'use client';

import React from 'react';

const AdditionalInformation = () => {
  return (
    <div className="w-full max-w-5xl mx-auto bg-white rounded-lg shadow-md overflow-hidden mt-4">
      <div className="p-6">
        <h2 className="text-lg font-semibold mb-4">Additional Information</h2>
        
        <div className="space-y-3">
          {/* Email Information */}
          <div className="flex items-center">
            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <span className="text-gray-700">dienfitriani@gmail.com</span>
          </div>
          
          {/* Phone Information */}
          <div className="flex items-center">
            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
            </div>
            <span className="text-gray-700">+628884620475</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdditionalInformation;