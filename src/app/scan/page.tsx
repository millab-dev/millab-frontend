import type { Metadata } from 'next';
import ScanPage from '@/components/scan';
import BottomNavbar from '@/components/core/BottomNavbar';

export const metadata: Metadata = {
  title: 'Scan QR Code - Millab',
  description: 'Scan QR codes quickly and easily to access Millab content',
  openGraph: {
    title: 'Scan QR Code - Millab',
    description: 'Scan QR codes quickly and easily to access Millab content',
  },
};

export default function Page() {
  return (
    <main className="pb-20">
      <ScanPage />
    </main>
  );
}