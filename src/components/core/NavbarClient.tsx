"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import authLogo from "@/assets/authLogo.svg";
import { Menu, X } from "lucide-react";
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
  
  // Filter navigation items based on login status
  const navItems = isLoggedIn 
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
    
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
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
            {navItems.map((item) => (
              <Link
                href={item.path}
                key={item.name}
                className={`text-sm font-medium ${pathname === item.path ? "text-primary" : "text-gray-700 hover:text-primary"} transition-colors duration-200`}
              >
                {item.name}
              </Link>
            ))}
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
          className={`md:hidden fixed left-0 right-0 bg-white z-40 shadow-lg`}
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
            {/* Navigation links */}
            <div className="flex flex-col space-y-2 py-2">
              {navItems.map((item) => (
                <Link
                  href={item.path}
                  key={item.name}
                  className={`block px-4 py-3 rounded-md text-base font-medium ${pathname === item.path ? "text-primary bg-gray-50" : "text-gray-700 hover:text-primary hover:bg-gray-50"} transition-colors duration-200`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
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
