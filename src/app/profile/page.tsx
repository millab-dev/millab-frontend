import React from 'react';
import ProfilePage from '@/components/profile';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Profile - Millab',
  description: 'View and manage your Millab profile',
};

// Define the correct props type for Next.js App Router
type PageProps = {
  searchParams: { [key: string]: string | string[] | undefined };
};

export default async function Page({ searchParams }: PageProps) {
  // Get section from searchParams
  const section = typeof searchParams.section === 'string' ? searchParams.section : 'settings';
  return (
    <ProfilePage section={section} />
  );
}
