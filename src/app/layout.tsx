import type { Metadata } from 'next';
import './globals.css';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';

export const metadata: Metadata = {
  title: {
    default: 'ML Learning Hub — PyTorch · Transformers · RL',
    template: '%s | ML Learning Hub',
  },
  description:
    'Project-driven deep learning curriculum for Python engineers. Master PyTorch, Transformers, and Reinforcement Learning through hands-on projects.',
  keywords: ['pytorch', 'transformers', 'reinforcement learning', 'deep learning', 'python'],
  openGraph: {
    type:        'website',
    siteName:    'ML Learning Hub',
    title:       'ML Learning Hub — PyTorch · Transformers · RL',
    description: 'Project-driven deep learning for Python engineers.',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
