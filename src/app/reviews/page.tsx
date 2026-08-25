import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import GoogleReviewsSection from '@/components/landing/GoogleReviewsSection';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Google Reviews & Testimonials | TNT MMA Fitness Academy Bhopal (4.9★)',
  description: 'Read 100+ verified 5-star Google reviews for TNT MMA Fitness Academy Bhopal. Member experiences across MMA, BJJ, CrossFit, Kids martial arts, and Coach Vikalp mentorship.',
};

export default function ReviewsPage() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-zinc-950 text-slate-900 dark:text-white flex flex-col justify-between selection:bg-orange-500 selection:text-white">
      <Navbar />
      <main className="flex-1">
        <GoogleReviewsSection isFullPage={true} />
      </main>
      <Footer />
    </div>
  );
}
