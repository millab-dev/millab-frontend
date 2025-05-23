import React from 'react';
import ProfilePage from '@/components/profile';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Profile - Millab',
  description: 'View and manage your Millab profile',
};

export default function Page() {
  return (
    <ProfilePage />
  );
}
