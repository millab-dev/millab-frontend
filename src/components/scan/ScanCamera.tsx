"use client";

import React, { useState, useEffect } from 'react';
import { Camera, X } from 'lucide-react';
import { IDetectedBarcode, Scanner as QrScanner } from '@yudiel/react-qr-scanner';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { Language, buttonTranslations, errorTranslations } from './types';

interface ScanCameraProps {
  isActive: boolean;
  setIsActive: React.Dispatch<React.SetStateAction<boolean>>;
  language?: Language;
}

const ScanCamera = ({ isActive, setIsActive, language = 'id' }: ScanCameraProps) => {
  // Get translations based on language
  const t = buttonTranslations[language];
  const errorT = errorTranslations[language];
  // Use the props instead of local state
  const [mounted, setMounted] = useState(false);
  const [scanResult, setScanResult] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  // Animation on component mount
  useEffect(() => {
    setMounted(true);
  }, []);

  const handleStartCamera = () => {
    setIsActive(true);
    setError('');
    setScanResult(''); // Reset scan result to prevent infinite loading
  };

  // Handle successful scan
  const onScanSuccess = (decodedText: IDetectedBarcode[]) => {
    // Ensure we have at least one detected barcode
    if (decodedText && decodedText.length > 0) {
      const qrValue = decodedText[0].rawValue;
      setScanResult(qrValue);
      
      try {
        // Check if QR value contains a domain structure with /module/
        // This regex checks for various URL formats with or without protocol
        const urlRegex = /^(https?:\/\/)?([a-zA-Z0-9-]+\.)+[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*(\/[^\s]*)?$/;
        const modulePathRegex = /\/module\/([a-zA-Z0-9_-]+)/;
        
        // Check if it looks like a URL (with or without http/https)
        if (urlRegex.test(qrValue)) {
          console.log('QR is a URL:', qrValue);
          
          // Ensure URL has protocol
          let normalizedUrl = qrValue;
          if (!qrValue.startsWith('http://') && !qrValue.startsWith('https://')) {
            normalizedUrl = 'https://' + qrValue;
          }
          
          // Try to extract moduleId from URL
          const url = new URL(normalizedUrl);
          const pathParts = url.pathname.split('/');
          
          // Check if it's a known module URL pattern
          // Example: https://bit.ly/millab-module-123 or https://millab.id/module/123
          const moduleIdIndex = pathParts.findIndex(part => 
            part === 'module' || part.includes('millab-module')
          );
          
          if (moduleIdIndex !== -1 && moduleIdIndex < pathParts.length - 1) {
            // Extract the module ID from the path
            const moduleId = pathParts[moduleIdIndex + 1];
            console.log(`QR Code URL detected, extracted module ID: ${moduleId}`);
            router.push(`/module/${moduleId}`);
          } else if (url.searchParams.has('moduleId')) {
            // Check if the URL has a moduleId query parameter
            const moduleId = url.searchParams.get('moduleId');
            console.log(`QR Code URL with query param detected, extracted module ID: ${moduleId}`);
            router.push(`/module/${moduleId}`);
          } else {
            // If we can't extract moduleId from the URL, show error toast
            toast.error('Tidak dapat menemukan ID modul dari QR code URL');
            setIsActive(false);
            setError('QR code URL tidak dikenal');
          }
        } else {
          // Check for direct pattern of /module/ID without full URL
          const modulePathMatch = qrValue.match(modulePathRegex);
          if (modulePathMatch && modulePathMatch[1]) {
            // Extract module ID directly from the path pattern
            const moduleId = modulePathMatch[1];
            console.log(`QR Code module path detected, extracted module ID: ${moduleId}`);
            router.push(`/module/${moduleId}`);
          } else {
            // Assume QR value is a direct module ID
            console.log(`QR Code detected, assuming direct module ID: ${qrValue}`);
            router.push(`/module/${qrValue}`);
          }
        }
      } catch (error) {
        console.error('Error processing QR code:', error);
        toast.error('Format QR code tidak valid');
        setIsActive(false);
        setError('Format QR code tidak valid');
      }
    }
  };

  // Handle scan errors
  const onScanError = (errorMessage: any) => {
    console.error('QR scan error:', errorMessage);
    let errorText = errorT.cameraError;
    
    // Check if it's an Error object with message property
    if (errorMessage instanceof Error) {
      errorText = `Camera error: ${errorMessage.message}`;
    }
    
    // Display toast error
    toast.error(errorText);
    setError(errorText);
  };

  return (
    <>
      {!isActive ? (
        <div 
          className={`rounded-lg p-6 md:p-8 lg:p-10 mx-auto transition-all duration-500 ease-in-out transform
            ${mounted ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}
            min-h-[280px] md:min-h-[320px] lg:min-h-[360px] flex flex-col justify-center`}
        >
          <div className="flex flex-col items-center justify-center space-y-8 md:space-y-12 lg:space-y-16 py-4 md:py-6 lg:py-8">
            <div className="w-28 h-28 bg-primary/20 md:w-30 md:h-30 rounded-full flex items-center justify-center transition-all duration-300 ease-in-out hover:bg-primary/30 hover:scale-105 shadow-md mx-auto backdrop-blur-sm">
              <Camera className="w-20 h-20 md:w-24 md:h-24 lg:w-24 lg:h-24 text-primary transition-transform duration-300 ease-in-out" />
            </div>
            <button
              onClick={handleStartCamera}
              className="w-full max-w-xs md:max-w-sm mx-auto bg-primary text-white py-3 md:py-4 lg:py-5 rounded-lg text-base md:text-lg lg:text-xl font-medium 
                transition-all duration-300 ease-in-out hover:bg-primary/80 hover:shadow-lg 
                active:transform active:scale-95 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50"
            >
              {t.startCamera}
            </button>
          </div>
        </div>
      ) : error ? (
        <div className="w-full max-w-md mx-auto aspect-square bg-white/90 backdrop-blur-sm rounded-lg flex flex-col items-center justify-center transition-all duration-300 ease-in-out min-h-[280px] md:min-h-[320px] lg:min-h-[360px] shadow-lg">
          <div className="text-center p-4">
            <p className="text-red-500 text-base md:text-lg">{error}</p>
            <button 
              onClick={() => setIsActive(false)}
              className="mt-4 px-5 py-3 bg-primary text-white rounded-md hover:bg-primary/90 transition-all duration-200 font-medium shadow-md"
            >
              {t.tryAgain}
            </button>
          </div>
        </div>
      ) : scanResult ? (
        <div className="w-full md:max-w-sm mx-auto aspect-square bg-white/90 backdrop-blur-sm rounded-lg flex flex-col items-center justify-center transition-all duration-300 ease-in-out shadow-lg">
          <div className="animate-spin rounded-full h-14 w-14 border-3 border-primary border-t-transparent"></div>
        </div>
      ) : (
        <div className="w-full md:max-w-sm mx-auto aspect-square bg-white/95 rounded-lg overflow-hidden shadow-lg relative backdrop-blur-sm">
          {/* Close button */}
          <button 
            onClick={() => setIsActive(false)}
            className="absolute top-3 right-3 z-10 bg-white/80 backdrop-blur-sm rounded-full p-1.5 shadow-lg hover:bg-white transition-all duration-200 ease-in-out"
            aria-label="Close scanner"
          >
            <X className="h-6 w-6 text-primary" />
          </button>

          <QrScanner
            sound={false}
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
