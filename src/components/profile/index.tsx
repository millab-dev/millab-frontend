import React from 'react';
import ProfileHeader from './ProfileHeader';
import SettingSection from './SettingSection';
import AchievementSection from './AchievementSection';
import Navbar from '../core/Navbar';
import { getProfileData } from '@/actions/profile.get-profile-data';
import { notFound } from 'next/navigation';
import TabBar from './TabBar';
import { Language } from './types';

interface ProfilePageProps {
  section?: string;
  language?: Language;
}

const ProfilePage = async ({ section = 'settings', language = 'id' }: ProfilePageProps) => {
  const { data } = await getProfileData()
  if(!data){
    return notFound()
  }
  
  // Determine active tab
  const activeTab = section === 'achievements' ? 'achievements' : 'settings';
  
  return (
    <>
      {/* Navbar only visible on md screens and above - outside main container */}
      <div className="block">
        <Navbar/>
      </div>
      
      <div className="min-h-screen pb-20 bg-background relative overflow-x-hidden">
        {/* Mobile background */}
        <div className="fixed inset-0 z-0 bg-primary md:hidden"
                    style={{
                        backgroundImage: "url('/batik-bg-4.svg')",
                        backgroundRepeat: "repeat",
                        backgroundSize: "auto auto",
                        backgroundPosition: "top left"
                    }}
                />
                
                {/* Desktop background with scaling options */}
                <div className="fixed inset-0 z-0 bg-primary hidden md:block">
                    <div className="absolute inset-0 w-full h-full overflow-hidden">
                        <div 
                            className="w-[1536px] h-full mx-auto"
                            style={{
                                backgroundImage: "url('/batik-bg-4.svg')",
                                backgroundRepeat: "repeat",
                                backgroundSize: "cover",
                                backgroundPosition: "center"
                            }}
                        />
                    </div>
                </div>
      <div className="mx-auto px-4 py-6 relative z-10">
        {/* Mobile Tab Navigation - Only visible on mobile */}
        <div className="md:hidden">
          {/* Profile Header Component - Mobile */}
          <ProfileHeader user={data} language={language} />
          
          {/* Client-side TabBar component */}
          <TabBar activeTab={activeTab} language={language} />
          
          {/* Mobile: Show active section based on tab */}
          {activeTab === 'settings' ? (
            <SettingSection user={data} language={language} />
          ) : (
            <AchievementSection language={language} />
          )}
        </div>
        
        {/* Desktop: Two column layout */}
        <div className="hidden md:grid md:grid-cols-2 md:gap-8 md:max-w-7xl md:mx-auto">
          {/* Column 1: Profile and Settings */}
          <div className="space-y-6">
            <ProfileHeader user={data} language={language} />
            <div className="mt-4">
              <SettingSection user={data} language={language} />
            </div>
          </div>
          
          {/* Column 2: Achievements */}
          <div>
            <AchievementSection language={language} />
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default ProfilePage;