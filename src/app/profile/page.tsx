import React from 'react';
import ProfilePage from '@/components/profile';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Profile - Millab',
  description: 'View and manage your Millab profile',
};

// Define props type for the Page component
type PageProps = {
  searchParams?: { section?: string }
}

export default async function Page({ searchParams }: PageProps) {
  // Use optional chaining to safely access the section property
  const section = searchParams?.section || 'settings';
  return (
    <ProfilePage section={section} />
  );
}
