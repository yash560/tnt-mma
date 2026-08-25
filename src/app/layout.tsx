import type { Metadata, Viewport } from 'next';
import './globals.css';
import SmoothScroll from '@/components/providers/SmoothScroll';

export const metadata: Metadata = {
  title: 'TNT MMA & Fitness Academy | Best Combat & CrossFit Gym in Bhopal (4.9★)',
  description: 'Bhopal’s #1 Rated MMA, Brazilian Jiu-Jitsu (BJJ), Muay Thai Kickboxing, CrossFit, Calisthenics & Kids Self-Defense Academy. Led by certified Head Coach Vikalp across Nizamuddin Rd (Ayodhya Nagar) & Govind Garden.',
  keywords: [
    'TNT MMA Bhopal',
    'MMA Gym in Bhopal',
    'Best CrossFit in Bhopal',
    'BJJ Bhopal',
    'Brazilian Jiu Jitsu Bhopal',
    'Kickboxing Bhopal',
    'Kids Self Defense Bhopal',
    'Calisthenics Gym Bhopal',
    'TNT MMA Fitness Academy',
    'Coach Vikalp MMA'
  ],
  authors: [{ name: 'TNT MMA Fitness Academy' }, { name: 'TheWebVale' }],
  openGraph: {
    title: 'TNT MMA & Fitness Academy | Bhopal (4.9★)',
    description: 'Transform your body with Mixed Martial Arts, BJJ, Kickboxing, CrossFit, and Kids Self-Defense. Claim your free 1-day pass.',
    url: 'https://tntmma.thewebvale.com',
    siteName: 'TNT MMA Fitness Academy',
    locale: 'en_IN',
    type: 'website',
  },
  icons: {
    icon: '/favicon.ico',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: '#09090b',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link 
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,400;1,700&display=swap" 
          rel="stylesheet" 
        />
      </head>
      <body className="bg-zinc-950 text-zinc-100 antialiased selection:bg-orange-500 selection:text-white">
        <SmoothScroll>
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
