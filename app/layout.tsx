// Root layout component for HuntFlow that sets global metadata and applies base styles and fonts across the app.

import '@/app/ui/global.css';
import { inter } from '@/app/ui/fonts';
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    template: "%s | Huntflow",
    default: "Huntflow",
  },
  description: "A Job Tracking System built with Next.js",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>{children}</body>
    </html>
  );
}