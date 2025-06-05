"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Card, CardContent } from "@/components/ui/card";
import { ChevronRight, Loader2 } from "lucide-react";
import { motion } from 'framer-motion';
import ChangePasswordPopup from './ChangePasswordPopup';
import EditProfilePopup from './EditProfilePopup';
import { User } from '@/types/user';
import { logout } from '@/actions/auth.logout';

interface SettingSectionProps {
    user: Partial<User>
}

const SettingSection = ({ user }: SettingSectionProps) => {
    const router = useRouter();
    const [isChangePasswordOpen, setIsChangePasswordOpen] = useState(false);
    const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);
    const [isLoggingOut, setIsLoggingOut] = useState(false);
    const [logoutError, setLogoutError] = useState<string | null>(null);
    return (
        <div className="w-full max-w-5xl mx-auto mt-4">
            {/* Settings Header */}
            {/* <motion.h2 
                className="text-base md:text-lg font-semibold mb-4 md:hidden"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3, delay: 0.1 }}
            >
                Settings
            </motion.h2> */}
            
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="space-y-3"
            >
                {/* Edit Profile Option */}
                <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.1 }}
                    whileHover={{ y: -4, boxShadow: "0 10px 25px rgba(0,0,0,0.1)", transition: { type: "spring", stiffness: 400, damping: 15 } }}
                    className="w-full"
                >
                    <div 
                        className="block cursor-pointer" 
                        onClick={() => setIsEditProfileOpen(true)}
                    >
                        <Card className="hover:shadow-md p-0 transition-shadow duration-200">
                            <CardContent className="px-4 py-6 flex items-center justify-between">
                                <div className="flex items-center">
                                    <div className="flex items-center justify-center mr-4">
                                        <Image src="/profile.svg" width={24} height={24} alt="Edit Profile" />
                                    </div>
                                    <span className="font-medium text-base">Edit Profile</span>
                                </div>
                                <ChevronRight className="text-primary" size={20} />
                            </CardContent>
                        </Card>
                    </div>
                </motion.div>
                
                {/* Edit Profile Popup */}
                <EditProfilePopup
                    open={isEditProfileOpen}
                    onOpenChange={setIsEditProfileOpen}
                    userData={user}
                />

                {/* Change Password Option */}
                <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.2 }}
                    whileHover={{ y: -4, boxShadow: "0 10px 25px rgba(0,0,0,0.1)", transition: { type: "spring", stiffness: 400, damping: 15 } }}
                    className="w-full"
                >
                    <div 
                        className="block cursor-pointer" 
                        onClick={() => setIsChangePasswordOpen(true)}
                    >
                        <Card className="hover:shadow-md p-0 transition-shadow duration-200">
                            <CardContent className="px-4 py-6 flex items-center justify-between">
                                <div className="flex items-center">
                                    <div className="flex items-center justify-center mr-4">
                                        <Image src="/change-password.svg" width={24} height={24} alt="Change Password" />
                                    </div>
                                    <span className="font-medium text-base">Change Password</span>
                                </div>
                                <ChevronRight className="text-primary" size={20} />
                            </CardContent>
                        </Card>
                    </div>
                </motion.div>
                
                {/* Change Password Popup */}
                <ChangePasswordPopup
                    open={isChangePasswordOpen}
                    onOpenChange={setIsChangePasswordOpen}
                />

                {/* Logout Option */}
                <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.3 }}
                    whileHover={{ y: -4, boxShadow: "0 10px 25px rgba(0,0,0,0.1)", transition: { type: "spring", stiffness: 400, damping: 15 } }}
                    className="w-full"
                >
                    <div 
                        className="block cursor-pointer" 
                        onClick={async () => {
                            if (isLoggingOut) return;
                            
                            try {
                                setIsLoggingOut(true);
                                setLogoutError(null);
                                
                                const result = await logout();
                                
                                if (result.success) {
                                    // Just refresh the page, middleware will handle redirect to signin
                                    router.refresh();
                                } else {
                                    // Handle logout error
                                    setLogoutError('error' in result ? result.error : 'Failed to logout');
                                    setIsLoggingOut(false);
                                    
                                    // Auto-clear error after 5 seconds
                                    setTimeout(() => {
                                        setLogoutError(null);
                                    }, 5000);
                                }
                            } catch (error) {
                                console.error('Logout error:', error);
                                setLogoutError('An unexpected error occurred');
                                setIsLoggingOut(false);
                                
                                // Auto-clear error after 5 seconds
                                setTimeout(() => {
                                    setLogoutError(null);
                                }, 5000);
                            }
                        }}
                    >
                        <Card className="hover:shadow-md p-0 transition-shadow duration-200">
                            <CardContent className="px-4 py-6 flex items-center justify-between">
                                <div className="flex items-center">
                                    <div className="flex items-center justify-center mr-4">
                                        <Image src="/logout.svg" width={24} height={24} alt="Logout" />
                                    </div>
                                    <span className="font-medium text-base">
                                        {isLoggingOut ? (
                                            <div className="flex items-center">
                                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                                Logging out...
                                            </div>
                                        ) : (
                                            'Logout'
                                        )}
                                    </span>
                                </div>
                                <ChevronRight className="text-primary" size={20} />
                            </CardContent>
                        </Card>
                    </div>
                </motion.div>
                
                {/* Logout Error Message */}
                {logoutError && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-2 bg-red-50 text-red-700 p-3 rounded-md text-sm flex items-center gap-2"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="12" cy="12" r="10"></circle>
                            <line x1="12" y1="8" x2="12" y2="12"></line>
                            <line x1="12" y1="16" x2="12.01" y2="16"></line>
                        </svg>
                        {logoutError}
                    </motion.div>
                )}
            </motion.div>
        </div>
    );
};

export default SettingSection;