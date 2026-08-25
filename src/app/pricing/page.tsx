'use client';

import React, { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import PricingCalculator from '@/components/landing/PricingCalculator';
import FreeTrialModal from '@/components/landing/FreeTrialModal';
import { Tag } from 'lucide-react';

export default function PricingPage() {
  const [isTrialModalOpen, setIsTrialModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<string | undefined>(undefined);

  const handleSelectPlan = (planName: string) => {
    setSelectedPlan(planName);
    setIsTrialModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-zinc-950 text-slate-900 dark:text-white flex flex-col justify-between selection:bg-orange-500 selection:text-white">
      <Navbar />

      <main className="flex-1 pt-28 pb-20 space-y-12">
        {/* Page Banner */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-600 dark:text-orange-400 text-xs font-bold uppercase tracking-wider">
            <Tag className="w-3.5 h-3.5" />
            Transparent Pricing
          </div>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-slate-900 dark:text-white">
            Membership Plans & Combat Passes
          </h1>
          <p className="text-sm sm:text-base text-slate-600 dark:text-zinc-400 max-w-2xl mx-auto">
            Zero hidden charges or locking contracts. All memberships include locker amenities, shower facilities, and personal coach orientation.
          </p>
        </div>

        {/* Pricing Calculator Component */}
        <PricingCalculator onSelectPlan={handleSelectPlan} />
      </main>

      <Footer onOpenTrialModal={() => handleSelectPlan('General Enrolment')} />

      <FreeTrialModal
        isOpen={isTrialModalOpen}
        onClose={() => setIsTrialModalOpen(false)}
        defaultDiscipline={selectedPlan}
      />
    </div>
  );
}
