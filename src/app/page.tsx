'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import HeroSection from '@/components/landing/HeroSection';
import ProgramsSection from '@/components/landing/ProgramsSection';
import InteractiveTimetable from '@/components/landing/InteractiveTimetable';
import PricingCalculator from '@/components/landing/PricingCalculator';
import GoogleReviewsMarquee from '@/components/landing/GoogleReviewsMarquee';
import GoogleReviewsSection from '@/components/landing/GoogleReviewsSection';
import FacilityGallery from '@/components/landing/FacilityGallery';
import RealPhotoGallery from '@/components/landing/RealPhotoGallery';
import LocationContact from '@/components/landing/LocationContact';
import FreeTrialModal from '@/components/landing/FreeTrialModal';
import { 
  Flame, 
  ArrowRight, 
  FileSignature, 
  CalendarDays, 
  Tag, 
  ShieldCheck, 
  Sparkles,
  Trophy
} from 'lucide-react';

export default function HomePage() {
  const [isTrialModalOpen, setIsTrialModalOpen] = useState(false);
  const [selectedDisciplineForTrial, setSelectedDisciplineForTrial] = useState<string | undefined>(undefined);

  const handleOpenTrialModal = (discipline?: string) => {
    setSelectedDisciplineForTrial(discipline);
    setIsTrialModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-zinc-950 text-slate-900 dark:text-zinc-100 flex flex-col justify-between selection:bg-orange-500 selection:text-white">
      {/* Sticky Header with Mega Menu */}
      <Navbar />

      <main className="flex-1 space-y-4">
        {/* Hero Banner with Free Trial Pass Callout */}
        <HeroSection onOpenTrialModal={() => handleOpenTrialModal()} />

        {/* Quick Multi-Page Route Jump Cards */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Link
              href="/programs"
              className="p-5 rounded-2xl bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 hover:border-orange-500/50 shadow-md hover:shadow-xl transition-all group flex flex-col justify-between"
            >
              <div className="flex items-center justify-between pb-3">
                <div className="w-10 h-10 rounded-xl bg-orange-100 dark:bg-orange-950/60 text-orange-600 dark:text-orange-400 flex items-center justify-center font-bold">
                  <Flame className="w-5 h-5" />
                </div>
                <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-orange-600 group-hover:translate-x-1 transition-all" />
              </div>
              <div className="space-y-0.5">
                <h3 className="font-bold text-slate-900 dark:text-white text-sm">7 Combat Disciplines</h3>
                <p className="text-[11px] text-slate-500 dark:text-zinc-400">MMA, BJJ, Muay Thai & CrossFit</p>
              </div>
            </Link>

            <Link
              href="/schedule"
              className="p-5 rounded-2xl bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 hover:border-orange-500/50 shadow-md hover:shadow-xl transition-all group flex flex-col justify-between"
            >
              <div className="flex items-center justify-between pb-3">
                <div className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold">
                  <CalendarDays className="w-5 h-5" />
                </div>
                <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
              </div>
              <div className="space-y-0.5">
                <h3 className="font-bold text-slate-900 dark:text-white text-sm">Mat Timetable</h3>
                <p className="text-[11px] text-slate-500 dark:text-zinc-400">Morning & Evening Slots</p>
              </div>
            </Link>

            <Link
              href="/pricing"
              className="p-5 rounded-2xl bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 hover:border-orange-500/50 shadow-md hover:shadow-xl transition-all group flex flex-col justify-between"
            >
              <div className="flex items-center justify-between pb-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold">
                  <Tag className="w-5 h-5" />
                </div>
                <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-emerald-600 group-hover:translate-x-1 transition-all" />
              </div>
              <div className="space-y-0.5">
                <h3 className="font-bold text-slate-900 dark:text-white text-sm">Membership Plans</h3>
                <p className="text-[11px] text-slate-500 dark:text-zinc-400">From ₹2,000/month</p>
              </div>
            </Link>

            <Link
              href="/waiver"
              className="p-5 rounded-2xl bg-gradient-to-br from-orange-500 to-red-600 text-white shadow-lg shadow-orange-500/20 hover:shadow-xl hover:scale-[1.02] transition-all group flex flex-col justify-between"
            >
              <div className="flex items-center justify-between pb-3">
                <div className="w-10 h-10 rounded-xl bg-white/20 text-white flex items-center justify-center font-bold">
                  <FileSignature className="w-5 h-5" />
                </div>
                <ArrowRight className="w-4 h-4 text-white/80 group-hover:translate-x-1 transition-all" />
              </div>
              <div className="space-y-0.5">
                <h3 className="font-bold text-white text-sm">Digital Legal Waiver</h3>
                <p className="text-[11px] text-white/80">Sign Online in 30 Seconds</p>
              </div>
            </Link>
          </div>
        </section>

        {/* Combat & Fitness Disciplines Section */}
        <ProgramsSection onOpenTrialModal={handleOpenTrialModal} />

        {/* Interactive Weekly Class Timetable Section */}
        <InteractiveTimetable onOpenTrialModal={handleOpenTrialModal} />

        {/* Membership Plans & Pricing Section */}
        <PricingCalculator onSelectPlan={(planName) => handleOpenTrialModal(planName)} />

        {/* 4.9★ Google Reviews Section with Breakdown & Search */}
        <GoogleReviewsSection isFullPage={false} />

        {/* 4.9★ Google Reviews Continuous Marquee & Coach Credentials */}
        <GoogleReviewsMarquee />

        {/* Real Google Photos & Video Training Gallery */}
        <RealPhotoGallery isFullPage={false} />

        {/* Arena & Facility Highlights */}
        <FacilityGallery />

        {/* Bhopal Branch Locations & Direct Frontdesk Contact */}
        <LocationContact />
      </main>

      {/* 4-Tier Luxury Footer */}
      <Footer onOpenTrialModal={() => handleOpenTrialModal()} />

      {/* Free 1-Day Trial Modal */}
      <FreeTrialModal
        isOpen={isTrialModalOpen}
        onClose={() => setIsTrialModalOpen(false)}
        defaultDiscipline={selectedDisciplineForTrial}
      />
    </div>
  );
}
