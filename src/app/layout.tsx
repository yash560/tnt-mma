import type { Metadata, Viewport } from 'next';
import './globals.css';
import SmoothScroll from '@/components/providers/SmoothScroll';
import { AuthProvider } from '@/context/AuthContext';

export const metadata: Metadata = {
  title: 'TNT MMA & Fitness Academy | Bhopal’s #1 Combat & CrossFit Gym (4.9★)',
  description: 'Bhopal’s premier Mixed Martial Arts, Brazilian Jiu-Jitsu, Kickboxing, CrossFit, Calisthenics & Kids Self-Defense Academy. Led by certified Head Coach Vikalp across Nizamuddin Rd (Ayodhya Nagar) & Govind Garden.',
  keywords: [
    'TNT MMA Bhopal',
    'MMA Gym in Bhopal',
    'Best CrossFit in Bhopal',
    'BJJ Bhopal',
    'Kickboxing Bhopal',
    'Kids Self Defense Bhopal',
    'Coach Vikalp MMA'
  ],
  authors: [{ name: 'TNT MMA Fitness Academy' }, { name: 'TheWebVale' }],
  openGraph: {
    title: 'TNT MMA & Fitness Academy | Bhopal (4.9★)',
    description: 'Transform your body with Mixed Martial Arts, BJJ, Kickboxing, CrossFit, and Kids Self-Defense.',
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
  themeColor: '#ea580c',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link 
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,400;1,700&display=swap" 
          rel="stylesheet" 
        />
      </head>
      <body className="antialiased selection:bg-orange-500 selection:text-white">
        <AuthProvider>
          <SmoothScroll>
            {children}
          </SmoothScroll>
        </AuthProvider>
      </body>
    </html>
  );
}
