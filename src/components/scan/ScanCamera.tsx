"use client";

import React, { useState, useEffect } from 'react';
import { Camera, X } from 'lucide-react';
import { IDetectedBarcode, Scanner as QrScanner } from '@yudiel/react-qr-scanner';
import { useRouter } from 'next/navigation';

const ScanCamera = () => {
  const [cameraActive, setCameraActive] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [scanResult, setScanResult] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  // Animation on component mount
  useEffect(() => {
    setMounted(true);
  }, []);

  const handleStartCamera = () => {
    setCameraActive(true);
    setError('');
  };

  // Handle successful scan
  const onScanSuccess = (decodedText: IDetectedBarcode[]) => {
    // Ensure we have at least one detected barcode
    if (decodedText && decodedText.length > 0) {
      const qrValue = decodedText[0].rawValue;
      setScanResult(qrValue);
      
      // Navigate to module page with QR code ID
      console.log(`QR Code detected, navigating to: /module/${qrValue}`);
      router.push(`/module/${qrValue}`);
    }
  };

  // Handle scan errors
  const onScanError = (errorMessage: any) => {
    console.error('QR scan error:', errorMessage);
    let errorText = 'Failed to access camera. Please check permissions or try a different browser.';
    
    // Check if it's an Error object with message property
    if (errorMessage instanceof Error) {
      errorText = `Camera error: ${errorMessage.message}`;
    }
    
    setError(errorText);
  };

  return (
    <>
      {!cameraActive ? (
        <div 
          className={`bg-white rounded-lg p-6 md:p-8 lg:p-10 mx-auto transition-all duration-500 ease-in-out transform
            ${mounted ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}
            hover:shadow-md border border-blue-100 min-h-[280px] md:min-h-[320px] lg:min-h-[360px] flex flex-col justify-center`}
        >
          <div className="flex flex-col items-center justify-center space-y-8 md:space-y-12 lg:space-y-16 py-4 md:py-6 lg:py-8">
            <div className="w-28 h-28 bg-primary/10 md:w-30 md:h-30 rounded-full flex items-center justify-center transition-all duration-300 ease-in-out hover:bg-blue-100 hover:scale-105 shadow-sm mx-auto">
              <Camera className="w-20 h-20 md:w-24 md:h-24 lg:w-24 lg:h-24 text-primary transition-transform duration-300 ease-in-out" />
            </div>
            <button
              onClick={handleStartCamera}
              className="w-full max-w-xs md:max-w-sm mx-auto bg-primary text-white py-3 md:py-4 lg:py-5 rounded-lg text-base md:text-lg lg:text-xl font-medium 
                transition-all duration-300 ease-in-out hover:bg-primary/80 hover:shadow-lg 
                active:transform active:scale-95 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50"
            >
              Start Camera
            </button>
          </div>
        </div>
      ) : error ? (
        <div className="w-full max-w-md mx-auto aspect-square bg-white rounded-lg flex flex-col items-center justify-center transition-all duration-300 ease-in-out border border-gray-200 min-h-[280px] md:min-h-[320px] lg:min-h-[360px] shadow-sm">
          <div className="text-center p-4">
            <p className="text-red-500 text-base md:text-lg">{error}</p>
            <button 
              onClick={() => setCameraActive(false)}
              className="mt-4 px-4 py-2 bg-primary/80 text-white rounded-md"
            >
              Try Again
            </button>
          </div>
        </div>
      ) : scanResult ? (
        <div className="w-full md:max-w-sm mx-auto aspect-square bg-white rounded-lg flex flex-col items-center justify-center transition-all duration-300 ease-in-out border border-gray-200 shadow-sm">
          <div className="animate-spin rounded-full h-12 w-12 border-2 border-primary border-t-transparent"></div>
        </div>
      ) : (
        <div className="w-full md:max-w-sm mx-auto aspect-square bg-white rounded-lg overflow-hidden shadow-sm relative">
          {/* Close button */}
          <button 
            onClick={() => setCameraActive(false)}
            className="absolute top-3 right-3 z-10 bg-white rounded-full p-1 shadow-md hover:bg-gray-100 transition-all duration-200 ease-in-out"
            aria-label="Close scanner"
          >
            <X className="h-6 w-6 text-gray-700" />
          </button>

          <QrScanner
            onScan={onScanSuccess}
            onError={onScanError}
            styles={{
              container: {
                width: '100%',
                height: '100%',
                padding: 0,
                margin: 0,
                borderRadius: '0.5rem'
              },
              video: {
                width: '100%',
                height: '100%',
                objectFit: 'cover'
              },
            }}
            components={{
              finder: false
            }}
            scanDelay={500}
          />
          
          {/* Custom finder overlay dengan animasi */}
          <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
            <div className="w-64 h-64 md:w-56 md:h-56 relative">
              {/* Top-left corner */}
              <div className="absolute top-0 left-0 w-10 h-10 border-t-4 border-l-4 border-primary rounded-tl-sm"></div>
              {/* Top-right corner */}
              <div className="absolute top-0 right-0 w-10 h-10 border-t-4 border-r-4 border-primary rounded-tr-sm"></div>
              {/* Bottom-left corner */}
              <div className="absolute bottom-0 left-0 w-10 h-10 border-b-4 border-l-4 border-primary rounded-bl-sm"></div>
              {/* Bottom-right corner */}
              <div className="absolute bottom-0 right-0 w-10 h-10 border-b-4 border-r-4 border-primary rounded-br-sm"></div>
              
              {/* Tidak ada garis scan sesuai permintaan */}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ScanCamera;
