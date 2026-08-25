'use client';

import React from 'react';
import { Flame, ShieldCheck, Sparkles, Trophy, Camera, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function FacilityGallery() {
  const facilityHighlights = [
    {
      title: 'CrossFit Rig & Pull-Up Stations',
      description: 'Heavy-duty multi-station pull-up rig, gymnastic rings, and functional strength turf for conditioning.',
      image: '/images/real/tnt_calisthenics_rig.jpg',
      badge: 'Bhopal Facility',
    },
    {
      title: 'MMA Sparring & Bruce Lee Floor',
      description: 'Padded floor combat arena for takedown entries, striking padwork, and technical sparring led by Coach Vikalp.',
      image: '/images/real/tnt_sparring_brucelee.jpg',
      badge: 'Coach Vikalp Mat',
    },
    {
      title: 'Heavy Bag Row & Dutch Striking',
      description: 'Full row of heavy tear-drop and cylinder punching bags for high-volume Muay Thai kick combinations.',
      image: '/images/real/tnt_heavybag_kickboxing.jpg',
      badge: 'Striking Row',
    },
    {
      title: 'Fighter Core & Balance Drills',
      description: 'Medicine ball balance drills, takedown center of gravity training, and explosive isometric core development.',
      image: '/images/real/tnt_balance_conditioning.jpg',
      badge: 'Fighter Balance',
    },
  ];

  return (
    <section className="py-16 sm:py-24 bg-white dark:bg-zinc-950 border-t border-slate-200 dark:border-zinc-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-2 border-b border-slate-100 dark:border-zinc-800">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-600 dark:text-orange-400 text-xs font-bold uppercase tracking-wider">
              <Camera className="w-3.5 h-3.5" />
              <span>Real Gym Photos (Bhopal)</span>
            </div>
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
              Real Arena &amp; Training Floor
            </h2>
            <p className="text-slate-600 dark:text-zinc-400 text-xs sm:text-base max-w-2xl">
              Authentic photos from our Ayodhya Nagar &amp; Govind Garden facilities in Bhopal.
            </p>
          </div>

          <Link
            href="/gallery"
            className="px-4 py-2 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs uppercase tracking-wider transition-all shadow-md shrink-0 self-start md:self-auto flex items-center gap-1.5"
          >
            <span>Explore Full Gallery</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Mobile Swipe Hint */}
        <div className="flex md:hidden items-center justify-between text-[11px] text-slate-400 dark:text-zinc-500 px-1 font-semibold">
          <span>👉 Swipe to view facility areas</span>
          <span className="text-orange-500 font-bold">4 photos</span>
        </div>

        {/* Facility: Horizontal Swipe on Mobile (<md), Grid on Desktop (md+) */}
        <div className="flex md:grid md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 overflow-x-auto snap-x snap-mandatory scrollbar-none pb-4 -mx-4 px-4 md:mx-0 md:px-0">
          {facilityHighlights.map((item, idx) => (
            <div
              key={idx}
              className="w-[78vw] max-w-[280px] shrink-0 snap-center md:w-auto md:shrink rounded-3xl bg-slate-50 dark:bg-zinc-900/80 border border-slate-200 dark:border-zinc-800 overflow-hidden flex flex-col justify-between hover:border-orange-500/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl shadow-sm group"
            >
              {/* Image Banner */}
              <div className="relative h-44 sm:h-52 w-full overflow-hidden bg-slate-900">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-2.5 right-2.5 px-2 py-0.5 rounded-full bg-black/70 backdrop-blur-md border border-white/20 text-[9px] sm:text-[10px] font-bold uppercase tracking-wider text-orange-400">
                  {item.badge}
                </div>
              </div>

              {/* Content */}
              <div className="p-4 space-y-1.5">
                <h3 className="text-sm sm:text-base font-black text-slate-900 dark:text-white group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors line-clamp-1">
                  {item.title}
                </h3>
                <p className="text-[11px] sm:text-xs text-slate-600 dark:text-zinc-400 leading-relaxed line-clamp-2">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
