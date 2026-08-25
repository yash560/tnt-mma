'use client';

import React from 'react';
import { Flame, ShieldCheck, Sparkles, Trophy, Camera } from 'lucide-react';
import Link from 'next/link';

export default function FacilityGallery() {
  const facilityHighlights = [
    {
      title: 'CrossFit Rig & Pull-Up Stations',
      description: 'Heavy-duty multi-station pull-up rig, gymnastic rings, and functional strength turf for conditioning at the Bhopal academy.',
      image: '/images/real/tnt_calisthenics_rig.jpg',
      badge: 'Bhopal Facility',
    },
    {
      title: 'MMA Sparring & Bruce Lee Floor',
      description: 'Padded floor combat arena for takedown entries, striking padwork, and technical sparring led by Head Coach Vikalp.',
      image: '/images/real/tnt_sparring_brucelee.jpg',
      badge: 'Coach Vikalp Mat',
    },
    {
      title: 'Heavy Bag Row & Dutch Striking',
      description: 'Full row of heavy tear-drop and cylinder punching bags for high-volume Muay Thai kick combinations and punch power.',
      image: '/images/real/tnt_heavybag_kickboxing.jpg',
      badge: 'Striking Row',
    },
    {
      title: 'Fighter Core & Balance Conditioning',
      description: 'Medicine ball balance drills, takedown center of gravity training, and explosive isometric core development.',
      image: '/images/real/tnt_balance_conditioning.jpg',
      badge: 'Fighter Balance',
    },
  ];

  return (
    <section className="py-24 bg-white dark:bg-zinc-950 border-t border-slate-200 dark:border-zinc-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-2 border-b border-slate-100 dark:border-zinc-800">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-600 dark:text-orange-400 text-xs font-bold uppercase tracking-wider">
              <Camera className="w-3.5 h-3.5" />
              Real Gym Photos (Bhopal)
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
              Real Arena & Training Floor
            </h2>
            <p className="text-slate-600 dark:text-zinc-400 text-sm sm:text-base max-w-2xl">
              Authentic photos from our Ayodhya Nagar & Govind Garden facilities in Bhopal.
            </p>
          </div>

          <Link
            href="/gallery"
            className="px-5 py-2.5 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs uppercase tracking-wider transition-all shadow-md shrink-0 self-start md:self-auto"
          >
            Explore Full Gallery →
          </Link>
        </div>

        {/* Facility Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {facilityHighlights.map((item, idx) => (
            <div
              key={idx}
              className="rounded-3xl bg-slate-50 dark:bg-zinc-900/80 border border-slate-200 dark:border-zinc-800 overflow-hidden flex flex-col justify-between hover:border-orange-500/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl shadow-sm group"
            >
              {/* Image Banner */}
              <div className="relative h-56 w-full overflow-hidden bg-slate-900">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-black/70 backdrop-blur-md border border-white/20 text-[10px] font-bold uppercase tracking-wider text-orange-400">
                  {item.badge}
                </div>
              </div>

              {/* Content */}
              <div className="p-5 space-y-2">
                <h3 className="text-base font-black text-slate-900 dark:text-white group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs text-slate-600 dark:text-zinc-400 leading-relaxed">
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
