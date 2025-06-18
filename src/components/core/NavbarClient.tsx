"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import authLogo from "@/assets/authLogo.svg";
import { Menu, X, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { navbarTranslations } from "./types";



interface NavbarClientProps {
  isLoggedIn: boolean;
  language?: 'id' | 'en';
}

const NavbarClient = ({ isLoggedIn, language = 'id' }: NavbarClientProps) => {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  
  // Get translations based on language
  const t = navbarTranslations[language];
  
  const isAboutUsPage = pathname === "/about-us";
  const [isMilboardMenuOpen, setIsMilboardMenuOpen] = useState(false);
  const [isMilboardMobileMenuOpen, setIsMilboardMobileMenuOpen] = useState(false);
  const milboardMenuRef = useRef<HTMLDivElement>(null);
  const milboardMobileMenuRef = useRef<HTMLDivElement>(null);

  // Dropdown items for MilBoard based on login status
  const milboardItems = isLoggedIn
    ? [
        { name: t.navItems[0].name, path: t.navItems[0].path }, // Home
        { name: t.navItems[1].name, path: t.navItems[1].path }, // Module
        { name: t.navItems[2].name, path: t.navItems[2].path }, // Final Quiz
        { name: t.navItems[3].name, path: t.navItems[3].path }, // Profile
      ]
    : [
        { name: t.navItems[5].name, path: t.navItems[5].path }, // Sign In
        { name: t.navItems[6].name, path: t.navItems[6].path }, // Sign Up
      ];

  // Filter navigation items based on login status and current page
  // On about-us page, don't show any regular nav items (only "Tentang Kami" and "MilBoard" will be shown separately)
  const navItems = isAboutUsPage
    ? [] // No regular items on about-us page
    : isLoggedIn
      ? [
          { name: t.navItems[0].name, path: t.navItems[0].path }, // Home
          { name: t.navItems[1].name, path: t.navItems[1].path }, // Module
          { name: t.navItems[2].name, path: t.navItems[2].path }, // Final Quiz
          { name: t.navItems[3].name, path: t.navItems[3].path }, // Profile
          { name: t.navItems[4].name, path: t.navItems[4].path }, // About Us
        ]
      : [
          { name: t.navItems[4].name, path: t.navItems[4].path }, // About Us
          { name: t.navItems[5].name, path: t.navItems[5].path }, // Sign In
          { name: t.navItems[6].name, path: t.navItems[6].path }, // Sign Up
        ];
  
  // Handle scroll effect for navbar shrinking
  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      if (offset > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    
    const handleClickOutside = (event: MouseEvent) => {
      if (milboardMenuRef.current && !milboardMenuRef.current.contains(event.target as Node)) {
        setIsMilboardMenuOpen(false);
      }
      if (milboardMobileMenuRef.current && !milboardMobileMenuRef.current.contains(event.target as Node)) {
        setIsMilboardMobileMenuOpen(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    document.addEventListener('mousedown', handleClickOutside);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  
  // Close MilBoard menus when changing routes
  useEffect(() => {
    setIsMilboardMenuOpen(false);
    setIsMilboardMobileMenuOpen(false);
  }, [pathname]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    setIsMilboardMenuOpen(false); // Close milboard menu if mobile menu is toggled
    setIsMilboardMobileMenuOpen(false);
  };

  const toggleMilboardMenu = () => {
    setIsMilboardMenuOpen(!isMilboardMenuOpen);
  };
  
  const toggleMilboardMobileMenu = () => {
    setIsMilboardMobileMenuOpen(!isMilboardMobileMenuOpen);
  };

  return (
    <>
      <motion.nav 
        className={`fixed top-0 left-0 right-0 z-50 bg-white transition-all duration-300 ${scrolled ? 'shadow-md' : 'border-b border-gray-200'} font-jakarta`}
        initial={{ height: 72 }}
        animate={{ 
          height: scrolled ? 60 : 72,
          paddingTop: scrolled ? '0.5rem' : '1rem',
          paddingBottom: scrolled ? '0.5rem' : '1rem'
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        style={{ paddingLeft: '1rem', paddingRight: '1rem' }}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo */}
          <div className="flex-shrink-0 transition-all duration-300">
            <Link href="/">
              <Image 
                src="/millab-logo.svg" 
                alt="Mill Lab Logo" 
                width={150} 
                height={50} 
                className={`transition-all duration-300 ${scrolled ? 'h-10' : 'h-12'} w-auto`} 
              />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center">
            <div className={`flex items-center space-x-6 border border-gray-200 rounded-md px-6 ${scrolled ? 'py-1.5' : 'py-2'} shadow-sm transition-all duration-300`}>
              {/* Either show regular navigation OR about-us specific navigation */}
              {isAboutUsPage ? (
                <>
                  {/* Only "Tentang Kami" and "MilBoard" on about-us page */}
                  <Link
                    href="/about-us"
                    className="text-sm font-medium text-primary transition-colors duration-200"
                  >
                    {t.navItems[4].name}
                  </Link>
                  
                  {/* MilBoard dropdown */}
                  <div className="relative" ref={milboardMenuRef}>
                    <button 
                      onClick={toggleMilboardMenu}
                      className="flex items-center space-x-1 text-sm font-medium text-gray-700 hover:text-primary transition-colors duration-200"
                    >
                      <span>MilBoard</span>
                      <ChevronDown size={14} className={`transition-transform duration-200 ${isMilboardMenuOpen ? 'rotate-180' : ''}`} />
                    </button>
                    
                    {/* Dropdown Menu */}
                    <AnimatePresence>
                      {isMilboardMenuOpen && (
                        <motion.div 
                          className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 border border-gray-100"
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          transition={{ duration: 0.2 }}
                        >
                          {milboardItems.map((item) => (
                            <Link
                              key={item.name}
                              href={item.path}
                              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-primary"
                            >
                              {item.name}
                            </Link>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </>
              ) : (
                /* Regular navigation items for non-about-us pages */
                navItems.map((item) => (
                  <Link
                    href={item.path}
                    key={item.name}
                    className={`text-sm font-medium ${pathname === item.path ? "text-primary" : "text-gray-700 hover:text-primary"} transition-colors duration-200`}
                  >
                    {item.name}
                  </Link>
                ))
              )}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-gray-700 hover:text-gray-900 focus:outline-none"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isMenuOpen && (
        <motion.div 
          className="md:hidden fixed left-0 right-0 bg-white z-40 shadow-lg"
          initial={{ opacity: 0, y: -20 }}
          animate={{ 
            opacity: 1, 
            y: 0,
            top: scrolled ? '60px' : '72px' // Adjust menu position based on navbar height
          }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.2 }}
        >
          <div className="flex flex-col p-4 max-h-[80vh] overflow-y-auto">
            {/* Navigation links - different content based on current page */}
            <div className="flex flex-col space-y-2 py-2">
              {isAboutUsPage ? (
                // About-us page: show only "Tentang Kami" and MilBoard options
                <>
                  <Link
                    href="/about-us"
                    className="block px-4 py-3 rounded-md text-base font-medium text-primary bg-gray-50 transition-colors duration-200"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {t.navItems[4].name}
                  </Link>
                  
                  {/* MilBoard dropdown for mobile */}
                  <div className="relative" ref={milboardMobileMenuRef}>
                    <button 
                      onClick={toggleMilboardMobileMenu}
                      className="flex items-center justify-between w-full px-4 py-3 rounded-md text-base font-medium text-gray-700 hover:text-primary transition-colors duration-200 mt-2"
                    >
                      <span>MilBoard</span>
                      <ChevronDown 
                        size={16} 
                        className={`transition-transform duration-200 ${isMilboardMobileMenuOpen ? 'rotate-180' : ''}`} 
                      />
                    </button>
                    
                    {/* Mobile Dropdown Menu */}
                    <AnimatePresence>
                      {isMilboardMobileMenuOpen && (
                        <motion.div 
                          className="bg-gray-50 rounded-md mt-1 overflow-hidden"
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          {milboardItems.map((item) => (
                            <Link
                              href={item.path}
                              key={item.name}
                              className="block px-6 py-3 text-base font-medium text-gray-700 hover:text-primary hover:bg-gray-100 transition-colors duration-200"
                              onClick={() => {
                                setIsMenuOpen(false);
                                setIsMilboardMobileMenuOpen(false);
                              }}
                            >
                              {item.name}
                            </Link>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </>
              ) : (
                // Regular pages: show normal navigation
                navItems.map((item) => (
                  <Link
                    href={item.path}
                    key={item.name}
                    className={`block px-4 py-3 rounded-md text-base font-medium ${pathname === item.path ? "text-primary bg-gray-50" : "text-gray-700 hover:text-primary hover:bg-gray-50"} transition-colors duration-200`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))
              )}
            </div>
          </div>
        </motion.div>
      )}
      </AnimatePresence>
      
      {/* Spacer for fixed navbar that adapts to navbar height */}
      <div className={`transition-all duration-300 ${scrolled ? 'h-16' : 'h-20'}`}></div>
    </>
  );
};

export default NavbarClient;
