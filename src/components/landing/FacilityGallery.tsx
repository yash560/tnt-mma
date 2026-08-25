'use client';

import React from 'react';
import { Flame, ShieldCheck, Sparkles, Trophy } from 'lucide-react';

export default function FacilityGallery() {
  const facilityHighlights = [
    {
      title: 'Pro Competition Octagon Cage',
      description: 'Full-gauge steel combat cage with padded floor for realistic MMA fence-work, takedown transitions, and pro sparring.',
      image: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=600&auto=format&fit=crop&q=80',
      badge: 'Championship Spec',
    },
    {
      title: 'Seamless High-Density Grappling Mats',
      description: 'Anti-microbial, high-shock absorption tatami mats designed for safe BJJ throws, sweeps, and submissions.',
      image: 'https://images.unsplash.com/photo-1549476464-37392f717541?w=600&auto=format&fit=crop&q=80',
      badge: 'IBJJF Standards',
    },
    {
      title: 'Heavy Bag Row & Muay Thai Pads',
      description: 'Multi-weight Fairtex and heavy tear-drop punching bags for power development, low kicks, and combination drills.',
      image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=600&auto=format&fit=crop&q=80',
      badge: 'Striking Power',
    },
    {
      title: 'CrossFit Rig & Olympic Barbell Arena',
      description: 'Commercial pull-up rigs, gymnastic rings, bumper plates, battle ropes, and giant tractor tyres for gladiator conditioning.',
      image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=600&auto=format&fit=crop&q=80',
      badge: 'Functional Rig',
    },
  ];

  return (
    <section className="py-24 bg-zinc-950 border-t border-zinc-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-xs font-bold uppercase tracking-wider">
            <Trophy className="w-3.5 h-3.5" />
            Arena & Equipment
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
            Built for Serious Combat Fitness
          </h2>
          <p className="text-zinc-400 text-sm sm:text-base">
            Every inch of our Bhopal academies is engineered with athlete safety, hygiene, and championship equipment in mind.
          </p>
        </div>

        {/* Facility Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {facilityHighlights.map((item, idx) => (
            <div
              key={idx}
              className="rounded-3xl bg-zinc-900/80 border border-zinc-800 overflow-hidden flex flex-col justify-between hover:border-orange-500/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl group"
            >
              {/* Image Banner */}
              <div className="relative h-48 w-full overflow-hidden bg-zinc-950">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent" />
                <span className="absolute top-3 right-3 text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full bg-black/80 text-orange-400 border border-orange-500/30 backdrop-blur-md">
                  {item.badge}
                </span>
              </div>

              {/* Copy */}
              <div className="p-5 space-y-2">
                <h3 className="text-base font-bold text-white group-hover:text-orange-400 transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs text-zinc-400 leading-relaxed">
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
