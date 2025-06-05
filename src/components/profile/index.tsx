import React from 'react';
import ProfileHeader from './ProfileHeader';
import SettingSection from './SettingSection';
import AchievementSection from './AchievementSection';
import Navbar from '../core/Navbar';
import { getProfileData } from '@/actions/profile.get-profile-data';
import { notFound } from 'next/navigation';
import TabBar from './TabBar';

interface ProfilePageProps {
  section?: string;
}

const ProfilePage = async ({ section = 'settings' }: ProfilePageProps) => {
  const { data } = await getProfileData()
  if(!data){
    return notFound()
  }
  
  // Determine active tab
  const activeTab = section === 'achievements' ? 'achievements' : 'settings';
  
  return (
    <>
      {/* Navbar only visible on md screens and above - outside main container */}
      <div className="hidden md:block">
        <Navbar/>
      </div>
      
      <div className="min-h-screen pb-20 bg-background relative overflow-x-hidden">
        {/* Mobile background */}
        <div className="absolute inset-0 bg-primary md:hidden z-0">
          <img src="/cloud-group.svg" 
               className="w-full object-contain h-auto max-h-[16rem] mt-8 scale-[120%]" 
               alt="Cloud background"/>
        </div>
        
        {/* Desktop background */}
        <div className="fixed inset-0 bg-primary hidden md:block z-0"
          style={{
            backgroundImage: "url('/cloud-background.svg')",
            backgroundRepeat: "repeat",
            backgroundSize: "auto auto",
            backgroundPosition: "top center"
          }}
        />
      <div className="mx-auto px-4 py-6 relative z-10">
        {/* Mobile Tab Navigation - Only visible on mobile */}
        <div className="md:hidden">
          {/* Profile Header Component - Mobile */}
          <ProfileHeader user={data} />
          
          {/* Client-side TabBar component */}
          <TabBar activeTab={activeTab} />
          
          {/* Mobile: Show active section based on tab */}
          {activeTab === 'settings' ? (
            <SettingSection user={data} />
          ) : (
            <AchievementSection />
          )}
        </div>
        
        {/* Desktop: Two column layout */}
        <div className="hidden md:grid md:grid-cols-2 md:gap-8 md:max-w-7xl md:mx-auto">
          {/* Column 1: Profile and Settings */}
          <div className="space-y-6">
            <ProfileHeader user={data} />
            <div className="mt-4">
              <SettingSection user={data} />
            </div>
          </div>
          
          {/* Column 2: Achievements */}
          <div>
            <AchievementSection />
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default ProfilePage;