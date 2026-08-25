'use client';

import React, { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import LocationContact from '@/components/landing/LocationContact';
import FreeTrialModal from '@/components/landing/FreeTrialModal';
import { MapPin } from 'lucide-react';

export default function ContactPage() {
  const [isTrialModalOpen, setIsTrialModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-zinc-950 text-slate-900 dark:text-white flex flex-col justify-between selection:bg-orange-500 selection:text-white">
      <Navbar />

      <main className="flex-1 pt-28 pb-20 space-y-12">
        {/* Page Banner */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-600 dark:text-orange-400 text-xs font-bold uppercase tracking-wider">
            <MapPin className="w-3.5 h-3.5" />
            Find Our Facilities
          </div>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-slate-900 dark:text-white">
            Bhopal Academy Locations & Contact
          </h1>
          <p className="text-sm sm:text-base text-slate-600 dark:text-zinc-400 max-w-2xl mx-auto">
            Conveniently located at Nizamuddin Road (Ayodhya Nagar) and Raisen Road (Govind Garden).
          </p>
        </div>

        {/* Location & Frontdesk Contact Component */}
        <LocationContact />
      </main>

      <Footer onOpenTrialModal={() => setIsTrialModalOpen(true)} />

      <FreeTrialModal
        isOpen={isTrialModalOpen}
        onClose={() => setIsTrialModalOpen(false)}
      />
    </div>
  );
}
