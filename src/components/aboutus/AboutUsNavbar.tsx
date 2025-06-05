"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import authLogo from "@/assets/authLogo.svg";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const AboutUsNavbar = () => {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  
  // Handle scroll effect for sticky navbar
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

  // Simple navigation with just Home and Login
  const navItems = [
    { name: "Home", path: "/" },
    { name: "Login", path: "/sign-in" },
  ];

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <motion.nav 
        className={`fixed top-0 left-0 right-0 z-50 bg-white py-4 px-4 md:px-6 transition-all duration-300 ${scrolled ? 'shadow-md' : 'border-b border-gray-200'} font-jakarta`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/">
              <Image src={authLogo} alt="Mill Lab Logo" width={150} height={50} className="h-12 w-auto" />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center">
            <div className="flex items-center space-x-8 border border-gray-200 rounded-md px-6 py-2 shadow-sm">
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

          {/* Mobile menu button - only shown when menu is closed */}
          <div className="md:hidden">
            {!isMenuOpen && (
              <button
                onClick={toggleMenu}
                className="text-gray-700 hover:text-gray-900 focus:outline-none"
                aria-label="Toggle menu"
              >
                <Menu size={24} />
              </button>
            )}
          </div>
        </div>
      </motion.nav>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            className="fixed inset-0 bg-white z-[100] md:hidden"
            initial={{ opacity: 0, y: "-100%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "-100%" }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex flex-col h-full">
              {/* Mobile menu header */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
                <div className="flex items-center space-x-2">
                  <Image src={authLogo} alt="Mill Lab Logo" width={120} height={40} className="h-10 w-auto" />
                </div>
                <button
                  onClick={() => setIsMenuOpen(false)}
                  className="text-gray-700 hover:text-gray-900 focus:outline-none rounded-full p-2 hover:bg-gray-100"
                  aria-label="Close menu"
                >
                  <X size={20} />
                </button>
              </div>
              
              {/* Navigation links */}
              <div className="flex flex-col p-6 space-y-1">
                {navItems.map((item) => (
                  <Link
                    href={item.path}
                    key={item.name}
                    className={`px-4 py-4 rounded-md text-lg font-medium ${pathname === item.path 
                      ? "text-primary bg-blue-50" 
                      : "text-gray-700 hover:text-primary hover:bg-blue-50"} 
                      transition-colors duration-200 flex items-center`}
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
      
      {/* Spacer for fixed navbar */}
      <div className="h-20"></div>
    </>
  );
};

export default AboutUsNavbar;
