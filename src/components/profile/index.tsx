import React from 'react';
import ProfileHeader from './ProfileHeader';
import SettingSection from './SettingSection';
import Navbar from '../core/Navbar';
import { getProfileData } from '@/actions/profile.get-profile-data';
import { notFound } from 'next/navigation';

const ProfilePage = async () => {
  const { data } = await getProfileData()
  if(!data){
    return notFound()
  }
  return (
    <div className="min-h-screen pb-20">
      {/* Navbar only visible on md screens and above */}
      <div className="hidden md:block">
        <Navbar />
      </div>
      <div className="mx-auto px-4 py-6 max-w-3xl">
        {/* Profile Header Component */}
        <ProfileHeader user={data} />
        
        {/* Settings Section (always shown) */}
        <SettingSection user={data}/>
      </div>
    </div>
  );
};

export default ProfilePage;