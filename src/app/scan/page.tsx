import type { Metadata } from 'next';
import ScanPage from '@/components/scan';
import BottomNavbar from '@/components/core/BottomNavbar';
import { Language } from '@/components/scan/types';
import { getLanguage } from '@/actions/core.get-lang';

export const metadata: Metadata = {
  title: 'Scan QR Code - Gemalar Indonesia',
  description: 'Scan QR codes quickly and easily to access Gemalar Indonesia content',
  openGraph: {
    title: 'Scan QR Code - Gemalar Indonesia',
    description: 'Scan QR codes quickly and easily to access Gemalar Indonesia content',
  },
};

export default async function Page() {
  // Setting Indonesian as the default language
  const language = await getLanguage();
  
  return (
    <main className="pb-20">
      <ScanPage language={language} />
    </main>
  );
}