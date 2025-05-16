"use client";

import { useState, useEffect } from "react";

const ScanDescription = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeStep, setActiveStep] = useState(-1);

  useEffect(() => {
    // Animate on mount
    setIsVisible(true);

    // Animate steps sequentially
    const timer = setTimeout(() => {
      const interval = setInterval(() => {
        setActiveStep(prev => {
          if (prev < 3) return prev + 1;
          clearInterval(interval);
          return prev;
        });
      }, 500);

      return () => clearInterval(interval);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  const steps = [
    "Tap Start Camera",
    "Allow camera access when prompted",
    "Position your device so the QR code is visible in the frame",
    "Hold steady and wait for the scan to complete"
  ];

  return (
    <div 
      className={`bg-blue-50 rounded-lg p-4 md:p-6 lg:p-8 mt-6 transition-all duration-500 ease-in-out transform 
        ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}
        hover:shadow-md border border-blue-100 md:mt-8 lg:mt-10`}
    >
      <div className="flex items-start gap-3 md:gap-4 lg:gap-5">
        <div className="flex-shrink-0 mt-0.5 md:mt-1">
          <div className="bg-green-100 rounded-full p-1 md:p-2 lg:p-3 transition-transform duration-300 hover:scale-110 hover:rotate-12">
            <img 
              src="/ask-question.svg" 
              alt="Ask Question Icon"
              className="h-5 w-5 md:h-6 md:w-6 lg:h-7 lg:w-7" 
            />
          </div>
        </div>
        <div className="flex-1">
          <h4 className="text-base md:text-lg lg:text-xl font-semibold text-green-800 transition-all duration-300 ease-in-out">
            How to use scan page?
          </h4>
          <ol className="text-base md:text-lg lg:text-lg text-gray-600 mt-2 md:mt-3 space-y-2 md:space-y-3 list-none">
            {steps.map((step, index) => (
              <li 
                key={index} 
                className={`flex items-center text-black transition-all duration-500 ease-in-out transform 
                  ${index <= activeStep ? 'translate-x-0 opacity-100' : 'translate-x-5 opacity-0'}
                  hover:translate-x-2
                `}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                <span className="flex-shrink-0 flex items-center justify-center h-5 w-5 md:h-6 md:w-6 rounded-full bg-green-100 text-green-800 mr-2 md:mr-3 text-xs md:text-sm font-medium transition-all duration-300 hover:bg-green-200">
                  {index + 1}
                </span>
                <span className="transition-all duration-300 ease-in-out">{step}</span>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
};

export default ScanDescription;
