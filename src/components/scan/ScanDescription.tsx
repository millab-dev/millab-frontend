"use client";

import { useState, useEffect } from "react";
import { Language, scanPageTranslations } from "./types";

interface ScanDescriptionProps {
  language?: Language;
}

const ScanDescription = ({ language = 'id' }: ScanDescriptionProps) => {
  // Get translations based on language
  const t = scanPageTranslations[language];
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Animate the entire component on mount
    setIsVisible(true);
  }, []);

  const steps = [
    t.steps.tapStartCamera,
    t.steps.allowAccess,
    t.steps.positionDevice,
    t.steps.holdSteady
  ];

  return (
    <div 
      className={`bg-white/90 backdrop-blur-sm rounded-lg p-4 md:p-6 lg:p-8 mt-6 transition-all duration-500 ease-in-out transform 
        ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}
        hover:shadow-lg md:mt-8 lg:mt-10`}
    >
      <div className="flex items-start gap-3 md:gap-4 lg:gap-5">
        <div className="flex-shrink-0 mt-0.5 md:mt-1">
          <div className="bg-primary/20 backdrop-blur-sm rounded-full p-1 md:p-2 lg:p-3 transition-transform duration-300 hover:scale-110 hover:rotate-12 shadow-md">
            <img 
              src="/ask-question.svg" 
              alt="Ask Question Icon"
              className="h-5 w-5 md:h-6 md:w-6 lg:h-7 lg:w-7" 
            />
          </div>
        </div>
        <div className="flex-1">
          <h4 className="text-base md:text-lg lg:text-xl font-semibold text-primary transition-all duration-300 ease-in-out">
            {t.howToUse}
          </h4>
          <ol className="text-sm md:text-base lg:text-lg text-gray-700 mt-2 md:mt-3 space-y-2 md:space-y-3 list-none">
            {steps.map((step, index) => (
              <li 
                key={index} 
                className={`flex items-center transition-all duration-500 ease-in-out transform 
                  ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-5 opacity-0'}
                  hover:translate-x-2
                `}
                style={{ transitionDelay: '300ms' }}
              >
                <span className="flex-shrink-0 flex items-center justify-center h-5 w-5 md:h-6 md:w-6 rounded-full bg-primary/20 text-primary mr-2 md:mr-3 text-xs md:text-sm font-medium transition-all duration-300 hover:bg-primary/30 shadow-sm">
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
