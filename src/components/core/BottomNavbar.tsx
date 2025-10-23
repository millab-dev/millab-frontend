"use client";

import {usePathname, useRouter } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { SectionProps, bottomNavbarTranslations } from "./types";

const BottomNavbar = ({ language = 'id' }: SectionProps) => {
  const pathname = usePathname();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [isHovering, setIsHovering] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const navbarRef = useRef<HTMLDivElement>(null);
  const popupRef = useRef<HTMLDivElement>(null);
  const isMobileRef = useRef(false);
  
  // Animation on component mount
  useEffect(() => {
    setMounted(true);
    
    // Check if device is mobile (< md breakpoint)
    const checkMobile = () => {
      isMobileRef.current = window.innerWidth < 768; // 768px is Tailwind's md breakpoint
    };
    
    checkMobile(); // Initial check
    window.addEventListener('resize', checkMobile);
    
    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  // Handle click outside popup to close it
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (popupRef.current && !popupRef.current.contains(event.target as Node)) {
        setShowPopup(false);
      }
    };

    if (showPopup) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showPopup]);
  
  // Handle keyboard visibility with Visual Viewport API (only on mobile)
  useEffect(() => {
    if (!isMobileRef.current || typeof window === 'undefined') return;
    
    // Safety check for Visual Viewport API support
    const visualViewport = window.visualViewport;
    if (!visualViewport) return;
    
    const onVisualViewportChange = () => {
      if (!navbarRef.current) return;
      
      const keyboardHeight = window.innerHeight - visualViewport.height;
      if (keyboardHeight > 150) { // Threshold to detect keyboard
        // Hide the navbar when keyboard is open
        navbarRef.current.style.display = 'none';
      } else {
        // Show the navbar when keyboard is closed
        navbarRef.current.style.display = '';
      }
    };
    
    visualViewport.addEventListener('resize', onVisualViewportChange);
    visualViewport.addEventListener('scroll', onVisualViewportChange);
    
    return () => {
      visualViewport.removeEventListener('resize', onVisualViewportChange);
      visualViewport.removeEventListener('scroll', onVisualViewportChange);
    };
  }, []);

  // Get translations based on language
  const t = bottomNavbarTranslations[language];

  // Language change handler
  const handleLanguageChange = async () => {
    const newLanguage = language === 'id' ? 'en' : 'id';
    try {
      await fetch('/api/language', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ language: newLanguage }),
      });
      setShowPopup(false);
      // Refresh from server to get new language
      router.refresh();
    } catch (error) {
      console.error('Failed to update language:', error);
    }
  };

  const navItems = [
    {
      name: t.navItems[0].name, // Home
      path: "/",
      icon: "/book-half.svg",
      activeIcon: "/book-half-active.svg"
    },
    {
      name: t.navItems[1].name, // Scan
      path: "/scan",
      icon: "/scan-button.svg",
      isPrimary: true,
      scanIcon: "/scan-button.svg"
    },
    {
      name: t.navItems[2].name, // Profile
      path: "/profile",
      icon: "/user-round-cog.svg",
      activeIcon: "/person-fill-active.svg",
      hasPopup: true
    },
  ];

  return (
    <div 
      ref={navbarRef}
      className={`fixed bottom-0 left-0 z-50 w-full h-[5.625rem] bg-white min-w-0 border-t border-gray-200 
        transition-all duration-500 ease-in-out transform 
        ${mounted ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'} 
        md:fixed md:bottom-0 md:left-0 md:right-0 md:mx-auto md:max-w-4xl md:py-0 
        md:border-t md:border-l md:border-r md:border-gray-200 md:rounded-t-2xl md:h-20 
        shadow-[0_-8px_12px_-2px_rgba(0,0,0,0.1)]`}>
      {/* Mobile Navbar */}
      <div className="grid h-full max-w-lg grid-cols-3 gap-4 mx-auto px-8 md:px-4 transition-all duration-300 ease-in-out relative">
        {navItems.map((item) => {
          const content = item.isPrimary ? (
            <div className="relative w-full h-full flex justify-center" id="scan">
              <div 
                id="nav-container-scan" 
                className="bg-primary flex flex-col items-center justify-between py-4 absolute bottom-0 
                  w-28 h-32 rounded-t-full shadow-lg
                  transition-all duration-300 ease-in-out hover:h-36 hover:shadow-xl"
              >
                <div className="flex flex-col items-center justify-center gap-2 h-full transition-all duration-300 ease-in-out hover:translate-y-[-8px]">
                  <Image 
                    src={item.scanIcon || ""} 
                    alt="Scan" 
                    width={70} 
                    height={70}
                    className="transition-transform duration-300 ease-in-out"
                  />
                  <span className={cn(
                    "text-sm", "text-white", "font-semibold"
                  )}>
                    {item.name}
                  </span>
                </div>
              </div>
            </div>
          ) : (
            <div className={`group flex flex-col items-center justify-center transition-all duration-300 ease-in-out ${isHovering === item.name ? 'scale-110' : 'scale-100'}`}>
              <div className="relative">
                <Image 
                  src={item.icon}
                  alt={item.name}
                  width={30}
                  height={30}
                  className="mb-1 transition-all duration-300 ease-in-out group-hover:opacity-0 group-hover:rotate-12"
                />
                <Image 
                  src={item.activeIcon || ""}
                  alt={`${item.name} Active`}
                  width={30}
                  height={30}
                  className={`mb-1 transition-all duration-300 ease-in-out absolute top-0 left-0 
                    ${pathname === item.path ? 'opacity-100' : 'opacity-0 group-hover:opacity-100 group-hover:rotate-0'}
                    ${isHovering === item.name && pathname !== item.path ? 'scale-110' : 'scale-100'}`}
                />
              </div>
              <p className={`text-sm transition-all duration-300 ease-in-out ${isHovering === item.name ? 'font-medium' : ''}`}>
                {item.name}
              </p>
            </div>
          );

          return item.hasPopup ? (
            <button
              key={item.name}
              onClick={() => setShowPopup(!showPopup)}
              type="button"
              className={cn(
                "flex flex-col items-center justify-center group transition-all duration-300 ease-in-out", 
                pathname === item.path ? "text-primary" : "text-gray-500 hover:text-primary hover:font-semibold"
              )}
              onMouseEnter={() => setIsHovering(item.name)}
              onMouseLeave={() => setIsHovering("")}
            >
              {content}
            </button>
          ) : (
            <Link
              key={item.name}
              href={item.path}
              className={cn(
                "flex flex-col items-center justify-center group transition-all duration-300 ease-in-out", 
                pathname === item.path ? "text-primary" : "text-gray-500 hover:text-primary hover:font-semibold"
              )}
              onMouseEnter={() => setIsHovering(item.name)}
              onMouseLeave={() => setIsHovering("")}
            >
              {content}
            </Link>
          );
        })}

        {/* Popup Menu */}
        {showPopup && (
          <div 
            ref={popupRef}
            className="absolute bottom-full right-4 mb-4 w-72 bg-white rounded-xl shadow-2xl border border-gray-200 overflow-hidden z-50 animate-in fade-in slide-in-from-bottom-2 duration-200"
          >
            {/* Popup Header */}
            <div className="px-5 py-3 border-b border-gray-200">
              <h3 className="text-base font-semibold text-gray-900">{t.popup.title}</h3>
            </div>
            
            {/* Popup Content */}
            <div className="py-2">
              {/* Profile Link */}
              <Link
                href="/profile"
                onClick={() => setShowPopup(false)}
                className="flex items-center gap-3 px-5 py-3 hover:bg-gray-50 transition-colors duration-150"
              >
                <div className="w-5 h-5 flex items-center justify-center">
                  <svg 
                    width="20" 
                    height="20" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                    className="text-gray-700"
                  >
                    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                    <circle cx="12" cy="7" r="4" />
                  </svg>
                </div>
                <span className="text-sm text-gray-700 font-medium">{t.popup.profile}</span>
              </Link>

              {/* Language Switch */}
              <button
                onClick={handleLanguageChange}
                className="flex items-center gap-3 px-5 py-3 hover:bg-gray-50 transition-colors duration-150 w-full text-left"
              >
                <div className="w-5 h-5 flex items-center justify-center">
                  <svg 
                    width="20" 
                    height="20" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                    className="text-gray-700"
                  >
                    <path d="m5 8 6 6" />
                    <path d="m4 14 6-6 2-3" />
                    <path d="M2 5h12" />
                    <path d="M7 2h1" />
                    <path d="m22 22-5-10-5 10" />
                    <path d="M14 18h6" />
                  </svg>
                </div>
                <span className="text-sm text-gray-700 font-medium">{t.popup.languageSwitch}</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BottomNavbar;