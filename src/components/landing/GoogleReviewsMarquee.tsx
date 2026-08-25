'use client';

import React from 'react';
import { Star, ShieldCheck, Flame, Quote, User } from 'lucide-react';
import { GOOGLE_REVIEWS, COACH_PROFILES } from '@/lib/initialData';

export default function GoogleReviewsMarquee() {
  const extendedReviews = [...GOOGLE_REVIEWS, ...GOOGLE_REVIEWS];

  return (
    <section id="reviews" className="py-24 bg-zinc-950/80 border-t border-zinc-800/80 relative overflow-hidden">
      
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-orange-600/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold uppercase tracking-wider">
            <Star className="w-3.5 h-3.5 fill-amber-400" />
            4.9★ Rated on Google (100+ Reviews)
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
            Loved by Bhopal’s Fighters & Parents
          </h2>
          <p className="text-zinc-400 text-sm sm:text-base">
            From complete beginners taking their first punch to competitive BJJ athletes and kids gaining anti-bullying confidence.
          </p>
        </div>

        {/* Marquee Row */}
        <div className="relative w-full overflow-hidden mask-[linear-gradient(to_right,transparent,white_10%,white_90%,transparent)]">
          <div className="animate-marquee-left flex gap-6">
            {extendedReviews.map((rev, idx) => (
              <div
                key={idx}
                className="w-80 sm:w-96 rounded-3xl bg-zinc-900/80 border border-zinc-800 p-6 space-y-4 shrink-0 hover:border-orange-500/40 transition-colors shadow-lg"
              >
                {/* Review Header */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-orange-500/20 text-orange-400 flex items-center justify-center font-bold text-sm">
                      {rev.name.charAt(0)}
                    </div>
                    <div>
                      <h4 className="font-bold text-white text-sm">{rev.name}</h4>
                      <p className="text-[11px] text-zinc-400">{rev.role}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-0.5 text-amber-400">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                    ))}
                  </div>
                </div>

                {/* Review Text */}
                <p className="text-xs text-zinc-300 leading-relaxed italic">
                  &ldquo;{rev.text}&rdquo;
                </p>

                {/* Footer Tag */}
                <div className="pt-2 border-t border-zinc-800/80 flex items-center justify-between text-[10px] text-zinc-500">
                  <span>Verified Google Review</span>
                  <span>{rev.date}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Coaches Showcase */}
        <div className="space-y-8 pt-8 border-t border-zinc-800">
          <div className="text-center space-y-2">
            <h3 className="text-2xl sm:text-3xl font-black text-white">
              Meet Your Championship Coaching Staff
            </h3>
            <p className="text-xs text-zinc-400 max-w-xl mx-auto">
              Our coaches hold verified credentials in Brazilian Jiu-Jitsu, professional Muay Thai, gymnastics, and sports nutrition.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {COACH_PROFILES.map((coach, idx) => (
              <div
                key={idx}
                className="rounded-3xl bg-zinc-900/60 border border-zinc-800 hover:border-orange-500/40 p-6 space-y-4 transition-all hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-2xl overflow-hidden border border-orange-500/30 shrink-0">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img 
                      src={coach.imageUrl} 
                      alt={coach.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-white">{coach.name}</h4>
                    <p className="text-xs font-semibold text-orange-400">{coach.role}</p>
                    <p className="text-[10px] text-zinc-500">{coach.experience}</p>
                  </div>
                </div>

                <p className="text-xs text-zinc-400 leading-relaxed">
                  {coach.bio}
                </p>

                <div className="pt-2 border-t border-zinc-800/80 space-y-1.5">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">Specialties:</p>
                  <div className="flex flex-wrap gap-1.5">
                    {coach.specialties.map((spec, sIdx) => (
                      <span
                        key={sIdx}
                        className="text-[10px] px-2 py-0.5 rounded-md bg-zinc-800 text-zinc-300 border border-zinc-700"
                      >
                        {spec}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
