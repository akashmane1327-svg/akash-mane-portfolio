import type { Metadata, Viewport } from 'next';
import '@fontsource/space-grotesk/500.css';
import '@fontsource/space-grotesk/600.css';
import '@fontsource/space-grotesk/700.css';
import '@fontsource/inter/400.css';
import '@fontsource/inter/500.css';
import '@fontsource/inter/600.css';
import '@fontsource/inter/700.css';
import '@fontsource/jetbrains-mono/400.css';
import '@fontsource/jetbrains-mono/500.css';
import '@fontsource/jetbrains-mono/600.css';
import './globals.css';
import { Loader } from '@/components/Loader';

export const metadata: Metadata = {
  title: 'Akash Mane | Full Stack Developer',
  description:
    'Portfolio of Akash Mane — Full Stack Developer specializing in React, Django, TypeScript and modern web applications.',
  keywords: [
    'Akash Mane',
    'Full Stack Developer',
    'React',
    'Django',
    'TypeScript',
    'Python',
    'Portfolio',
    'Pune',
  ],
  authors: [{ name: 'Akash Mane' }],
  creator: 'Akash Mane',
  openGraph: {
    type: 'website',
    title: 'Akash Mane | Full Stack Developer',
    description: 'Full Stack Developer specializing in React, Django & modern web applications.',
    locale: 'en_IN',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Akash Mane | Full Stack Developer',
    description: 'Full Stack Developer specializing in React, Django & modern web applications.',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#121212',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body>
        <Loader />
        <div className="grain-layer" aria-hidden="true" />
        <div className="vignette" aria-hidden="true" />
        {children}
      </body>
    </html>
  );
}
