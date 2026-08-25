'use client';

import React, { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import GoogleReviewsMarquee from '@/components/landing/GoogleReviewsMarquee';
import FacilityGallery from '@/components/landing/FacilityGallery';
import FreeTrialModal from '@/components/landing/FreeTrialModal';
import { Trophy, Star, ShieldCheck, Flame } from 'lucide-react';

export default function AboutPage() {
  const [isTrialModalOpen, setIsTrialModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-zinc-950 text-slate-900 dark:text-white flex flex-col justify-between selection:bg-orange-500 selection:text-white">
      <Navbar />

      <main className="flex-1 pt-28 pb-20 space-y-16">
        {/* Page Banner */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-600 dark:text-orange-400 text-xs font-bold uppercase tracking-wider">
            <Trophy className="w-3.5 h-3.5" />
            5+ Years of Combat Excellence
          </div>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-slate-900 dark:text-white">
            About TNT MMA Fitness Academy
          </h1>
          <p className="text-sm sm:text-base text-slate-600 dark:text-zinc-400 max-w-2xl mx-auto">
            Founded with the mission to bring world-class mixed martial arts, Brazilian Jiu-Jitsu, and Olympic-grade functional conditioning to Bhopal.
          </p>
        </div>

        {/* Facilities & Arena */}
        <div id="facilities">
          <FacilityGallery />
        </div>

        {/* Reviews & Coaches */}
        <div id="coaches">
          <GoogleReviewsMarquee />
        </div>
      </main>

      <Footer onOpenTrialModal={() => setIsTrialModalOpen(true)} />

      <FreeTrialModal
        isOpen={isTrialModalOpen}
        onClose={() => setIsTrialModalOpen(false)}
      />
    </div>
  );
}
