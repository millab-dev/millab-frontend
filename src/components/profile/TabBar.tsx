"use client";

import React from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { ProfileComponentProps, tabBarTranslations } from './types';

interface TabBarProps extends ProfileComponentProps {
  activeTab: 'achievements' | 'settings';
}

const TabBar: React.FC<TabBarProps> = ({ activeTab, language = 'id' }) => {
  // Get translations based on language
  const t = tabBarTranslations[language];
  return (
    <motion.div 
      className="mt-3 mb-4 px-0"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      <div className="inline-flex relative">
        <motion.div
          className="relative mr-6"
          whileHover={{ scale: activeTab !== 'achievements' ? 1.05 : 1 }}
          whileTap={{ scale: 0.95 }}
        >
          <Link 
            href="/profile?section=achievements"
            className={cn(
              "py-2 text-base font-medium block transition-colors duration-200",
              activeTab === 'achievements' 
                ? "border-b-2 border-yellow-400 text-white font-bold" 
                : "text-white hover:text-yellow-50"
            )}
          >
            {t.achievements}
          </Link>
          {activeTab === 'achievements' && (
            <motion.div
              className="absolute bottom-0 left-0 h-0.5 bg-yellow-400"
              initial={{ width: 0 }}
              animate={{ width: '100%' }}
              transition={{ duration: 0.2, ease: "easeOut" }}
            />
          )}
        </motion.div>
        <motion.div
          className="relative"
          whileHover={{ scale: activeTab !== 'settings' ? 1.05 : 1 }}
          whileTap={{ scale: 0.95 }}
        >
          <Link 
            href="/profile?section=settings"
            className={cn(
              "py-2 text-base font-medium block transition-colors duration-200",
              activeTab === 'settings' 
                ? "border-b-2 border-yellow-400 text-white font-bold" 
                : "text-white hover:text-yellow-50"
            )}
          >
            {t.settings}
          </Link>
          {activeTab === 'settings' && (
            <motion.div
              className="absolute bottom-0 left-0 h-0.5 bg-yellow-400"
              initial={{ width: 0 }}
              animate={{ width: '100%' }}
              transition={{ duration: 0.2, ease: "easeOut" }}
            />
          )}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default TabBar;