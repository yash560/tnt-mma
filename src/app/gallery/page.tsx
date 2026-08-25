import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import RealPhotoGallery from '@/components/landing/RealPhotoGallery';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Real Photo & Video Gallery | TNT MMA Fitness Academy Bhopal',
  description: 'Explore authentic photos and videos of training sessions, lake conditioning runs, CrossFit rigs, and heavy bag striking at TNT MMA Bhopal with Head Coach Vikalp.',
};

export default function GalleryPage() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-zinc-950 text-slate-900 dark:text-white flex flex-col justify-between selection:bg-orange-500 selection:text-white">
      <Navbar />
      <main className="flex-1">
        <RealPhotoGallery isFullPage={true} />
      </main>
      <Footer />
    </div>
  );
}
