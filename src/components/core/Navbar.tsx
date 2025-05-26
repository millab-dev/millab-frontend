"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import authLogo from "@/assets/authLogo.svg";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
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

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Module", path: "/module" },
    { name: "Final Quiz", path: "/final-quiz" },
    { name: "Profile", path: "/profile" },
  ];

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <motion.nav 
        className={`fixed top-0 left-0 right-0 z-50 bg-white py-4 px-4 md:px-6 transition-all duration-300 ${scrolled ? 'shadow-md' : 'border-b border-gray-200'} font-jakarta`}
        // initial={{ y: -100 }}
        // animate={{ y: 0 }}
        // transition={{ type: 'spring', stiffness: 100, damping: 15 }}
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
        <div className="md:hidden bg-white py-2 px-4 border-b border-gray-200">
          <div className="flex flex-col space-y-4 py-2">
            {navItems.map((item) => (
              <Link
                href={item.path}
                key={item.name}
                className={`block px-3 py-2 rounded-md text-base font-medium ${pathname === item.path ? "text-primary bg-gray-50" : "text-gray-700 hover:text-primary hover:bg-gray-50"} transition-colors duration-200`}
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      )}
      </AnimatePresence>
      
      {/* Spacer for fixed navbar */}
      <div className="h-20"></div>
    </>
  );
};

export default Navbar;