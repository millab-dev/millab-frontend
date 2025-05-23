import React from 'react';
import ProfileHeader from './ProfileHeader';
import AdditionalInformation from './AdditionalInformation';

const ProfilePage = () => {
  return (
    <div className="min-h-screen pb-20">
      <div className="mx-auto px-4 py-6">
        {/* Profile Header Component */}
        <ProfileHeader />
        
        {/* Additional Information Component */}
        <AdditionalInformation />
      </div>
    </div>
  );
};

export default ProfilePage;