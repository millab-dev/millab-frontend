import type { Metadata } from 'next';
import ScanPage from '@/components/scan';
import BottomNavbar from '@/components/core/BottomNavbar';
import { Language } from '@/components/scan/types';

export const metadata: Metadata = {
  title: 'Scan QR Code - Millab',
  description: 'Scan QR codes quickly and easily to access Millab content',
  openGraph: {
    title: 'Scan QR Code - Millab',
    description: 'Scan QR codes quickly and easily to access Millab content',
  },
};

export default function Page() {
  // Setting Indonesian as the default language
  const defaultLanguage: Language = 'id';
  
  return (
    <main className="pb-20">
      <ScanPage language={defaultLanguage} />
    </main>
  );
}