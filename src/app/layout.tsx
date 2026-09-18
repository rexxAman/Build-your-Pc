import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'SetupForge | Productivity Setup Checklist & Custom PC Builder',
  description: 'Plan your dream ergonomic workspace, customize PC builds, estimate wattage, calculate total setup budget, and find curated gear recommendations.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen bg-[#090d16] text-slate-100 antialiased selection:bg-indigo-500/30 selection:text-indigo-200">
        {children}
      </body>
    </html>
  );
}
