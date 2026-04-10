import type { Metadata } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import 'katex/dist/katex.min.css';
import './globals.css';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { SiteProviders } from '@/components/providers/SiteProviders';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
});

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
      <body className={`${inter.variable} ${jetbrainsMono.variable} min-h-screen flex flex-col`}>
        <SiteProviders>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </SiteProviders>
      </body>
    </html>
  );
}
