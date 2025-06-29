import type { Metadata } from "next";
import { Geist, Geist_Mono, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import NextTopLoader from "nextjs-toploader";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

const plusJakartaSans = Plus_Jakarta_Sans({
    variable: "--font-plus-jakarta-sans",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "MILBoard",
    description: "Created by MILLab for Media Literacy",
  icons: {
    icon: '/icon.png',
  },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body
                className={`${geistSans.variable} ${geistMono.variable} ${plusJakartaSans.variable} bg-background antialiased font-jakarta`}
            >
                <NextTopLoader showSpinner={false} />
                <Toaster position="top-center" richColors />
                {children}
            </body>
        </html>
    );
}
