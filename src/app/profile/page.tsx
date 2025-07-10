import React from 'react';
import ProfilePage from '@/components/profile';
import { Metadata } from 'next';
import { getLanguage } from '@/actions/core.get-lang';

export const metadata: Metadata = {
  title: 'Profile - Millab',
  description: 'View and manage your Millab profile',
};

export default async function Page(props: {
  searchParams: Promise<{
    section?: string;
  }>;
}) {
  // In Next.js 15 we need to await the params
  const searchParams = await props.searchParams;
  const language = await getLanguage();
  
  // Get section from searchParams
  const section = searchParams?.section || 'settings';
  return (
    <ProfilePage section={section} language={language} />
  );
}
