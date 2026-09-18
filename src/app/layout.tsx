import type { Metadata } from 'next';
import { Analytics } from '@vercel/analytics/react';
import './globals.css';

export const metadata: Metadata = {
  title: 'SetupForge | Minimalist Workspace & PC Studio',
  description: 'Plan your dream ergonomic workspace, customize PC builds, estimate wattage, calculate total setup budget, and find curated gear recommendations.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen bg-[#09090b] text-zinc-100 antialiased selection:bg-zinc-100 selection:text-zinc-950">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
