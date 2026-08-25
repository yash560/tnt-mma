'use client';

import React, { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import HeroSection from '@/components/landing/HeroSection';
import ProgramsSection from '@/components/landing/ProgramsSection';
import InteractiveTimetable from '@/components/landing/InteractiveTimetable';
import PricingCalculator from '@/components/landing/PricingCalculator';
import GoogleReviewsMarquee from '@/components/landing/GoogleReviewsMarquee';
import FacilityGallery from '@/components/landing/FacilityGallery';
import LocationContact from '@/components/landing/LocationContact';
import FreeTrialModal from '@/components/landing/FreeTrialModal';

export default function HomePage() {
  const [isTrialModalOpen, setIsTrialModalOpen] = useState(false);
  const [selectedDisciplineForTrial, setSelectedDisciplineForTrial] = useState<string | undefined>(undefined);

  const handleOpenTrialModal = (discipline?: string) => {
    setSelectedDisciplineForTrial(discipline);
    setIsTrialModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col justify-between selection:bg-orange-500 selection:text-white">
      {/* Sticky Header */}
      <Navbar onOpenTrialModal={() => handleOpenTrialModal()} />

      <main className="flex-1">
        {/* Hero Banner with Free Trial CTA */}
        <HeroSection onOpenTrialModal={() => handleOpenTrialModal()} />

        {/* Combat & Fitness Disciplines */}
        <ProgramsSection onOpenTrialModal={handleOpenTrialModal} />

        {/* Interactive Weekly Class Timetable */}
        <InteractiveTimetable onOpenTrialModal={handleOpenTrialModal} />

        {/* Membership Plans & Pricing */}
        <PricingCalculator onSelectPlan={(planName) => handleOpenTrialModal(planName)} />

        {/* 4.9★ Google Reviews Marquee & Coach Credentials */}
        <GoogleReviewsMarquee />

        {/* Arena & Facility Gallery */}
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
