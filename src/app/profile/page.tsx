import React from 'react';
import ProfilePage from '@/components/profile';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Profile - Millab',
  description: 'View and manage your Millab profile',
};

export default async function Page({
  searchParams,
}: {
  searchParams?: {
    section?: string;
  };
}) {
  // Get section from searchParams
  const section = searchParams?.section || 'settings';
  return (
    <ProfilePage section={section} />
  );
}
