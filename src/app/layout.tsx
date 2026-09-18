import type { Metadata } from 'next';
import { Analytics } from '@vercel/analytics/next';
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
    <html lang="en">
      <body className="min-h-screen bg-cream text-olive antialiased">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
