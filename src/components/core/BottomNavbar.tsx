"use client";

import {usePathname } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { SectionProps, bottomNavbarTranslations } from "./types";

const BottomNavbar = ({ language = 'id' }: SectionProps) => {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);
  const [isHovering, setIsHovering] = useState("");
  const navbarRef = useRef<HTMLDivElement>(null);
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

  const navItems = [
    {
      name: t.navItems[0].name, // Home
      path: "/app",
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
      icon: "/person-fill.svg",
      activeIcon: "/person-fill-active.svg"
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
      <div className="grid h-full max-w-lg grid-cols-3 gap-4 mx-auto px-8 md:px-4 transition-all duration-300 ease-in-out">
        {navItems.map((item) => (
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
            {item.isPrimary ? (
                <div className="relative w-full h-full flex justify-center" id="scan">
                  <div 
                    id="nav-container-scan" 
                    className="bg-primary flex flex-col items-center justify-between py-4 absolute bottom-0 
                      w-28 h-32 rounded-t-full shadow-lg
                      transition-all duration-300 ease-in-out hover:h-36 hover:shadow-xl"
                  >
                    <div className="flex flex-col items-center justify-center gap-2 h-full transition-all duration-300 ease-in-out hover:translate-y-[-8px]">
                      <Image 
                        src={item.scanIcon} 
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
            )}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default BottomNavbar;