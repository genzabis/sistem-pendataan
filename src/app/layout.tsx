import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Portal Desa Sukamulya",
  description: "Sistem Informasi Manajemen Kependudukan Desa Sukamulya, Kecamatan Langkaplancar, Kabupaten Pangandaran",
  icons: {
    icon: "/fav icon.png",
  },
};

import { NextAuthProvider } from "@/components/providers/NextAuthProvider";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} antialiased`}
    >
      <body className="min-h-dvh w-full flex flex-col bg-gray-50/30">
        <svg width="0" height="0" className="absolute w-0 h-0 invisible">
          <filter id="white-stroke" x="-20%" y="-20%" width="140%" height="140%">
            <feMorphology in="SourceAlpha" operator="dilate" radius="2.5" result="DILATE" />
            <feFlood floodColor="white" floodOpacity="1" result="FLOOD" />
            <feComposite in="FLOOD" in2="DILATE" operator="in" result="STROKE" />
            <feMerge>
              <feMergeNode in="STROKE" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </svg>
        <NextAuthProvider>
          {children}
        </NextAuthProvider>
      </body>
    </html>
  );
}
