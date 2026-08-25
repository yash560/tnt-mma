'use client';

import React from 'react';
import Link from 'next/link';
import { 
  Flame, 
  Sparkles, 
  FileSignature, 
  CalendarDays, 
  Star, 
  ShieldCheck, 
  Trophy, 
  Users, 
  ChevronRight,
  ArrowUpRight
} from 'lucide-react';

interface HeroSectionProps {
  onOpenTrialModal: () => void;
}

export default function HeroSection({ onOpenTrialModal }: HeroSectionProps) {
  return (
    <section className="relative min-h-[92vh] flex items-center justify-center pt-28 pb-16 overflow-hidden bg-radial-gradient">
      {/* Background Combat Texture & Gradients */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(249,115,22,0.18),rgba(255,255,255,0))] pointer-events-none" />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-orange-600/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/2 left-10 w-72 h-72 bg-red-600/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Copy & Actions */}
          <div className="lg:col-span-7 space-y-7 text-center lg:text-left">
            
            {/* Top Pill Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-900/90 border border-orange-500/40 shadow-lg shadow-orange-500/10 backdrop-blur-md">
              <span className="flex h-2 w-2 rounded-full bg-orange-500 animate-ping" />
              <span className="text-xs font-bold text-orange-400 uppercase tracking-widest flex items-center gap-1">
                <Flame className="w-3.5 h-3.5" /> Bhopal’s #1 MMA & CrossFit Academy
              </span>
              <span className="text-zinc-600">•</span>
              <span className="text-xs font-bold text-amber-400 flex items-center gap-0.5">
                <Star className="w-3 h-3 fill-amber-400" /> 4.9★
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-6xl xl:text-7xl font-black text-white tracking-tight leading-[1.08]">
              FORGE <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-red-500 to-amber-400">DISCIPLINE.</span>
              <br />
              MASTER COMBAT.
              <br />
              <span className="text-zinc-200">OWN THE CAGE.</span>
            </h1>

            {/* Subheading */}
            <p className="text-base sm:text-lg text-zinc-300 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal">
              Train in professional <span className="text-orange-400 font-semibold">Mixed Martial Arts (MMA)</span>, <span className="text-orange-400 font-semibold">Brazilian Jiu-Jitsu (BJJ)</span>, <span className="text-orange-400 font-semibold">Muay Thai Kickboxing</span>, <span className="text-orange-400 font-semibold">Calisthenics & Stunts</span>, and <span className="text-orange-400 font-semibold">CrossFit</span>. Specialized batches for Adults, Pro Fighters, and Kids Self-Defense under certified Head Coach Vikalp.
            </p>

            {/* CTA Action Cluster */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <button
                onClick={onOpenTrialModal}
                className="w-full sm:w-auto px-7 py-4 rounded-2xl bg-gradient-to-r from-orange-500 via-red-600 to-orange-600 hover:from-orange-600 hover:to-red-700 text-white font-extrabold text-sm uppercase tracking-wider shadow-xl shadow-orange-500/30 hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer group"
              >
                <Sparkles className="w-4 h-4 text-amber-200 group-hover:rotate-12 transition-transform" />
                <span>Claim Free 1-Day Trial Pass</span>
                <ChevronRight className="w-4 h-4" />
              </button>

              <Link
                href="/waiver"
                className="w-full sm:w-auto px-6 py-4 rounded-2xl bg-zinc-900/90 border border-zinc-700 hover:border-orange-500/50 hover:bg-zinc-800 text-orange-400 font-bold text-sm tracking-wide flex items-center justify-center gap-2 transition-all group"
              >
                <FileSignature className="w-4 h-4" />
                <span>Sign Digital Waiver</span>
                <ArrowUpRight className="w-4 h-4 text-zinc-500 group-hover:text-orange-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </Link>
            </div>

            {/* Feature Highlights Row */}
            <div className="grid grid-cols-3 gap-3 sm:gap-6 pt-4 border-t border-zinc-800/80 max-w-xl mx-auto lg:mx-0">
              <div className="space-y-1">
                <div className="flex items-center gap-1.5 text-white font-black text-xl sm:text-2xl">
                  <Trophy className="w-4 h-4 text-amber-400" />
                  <span>5+ Yrs</span>
                </div>
                <p className="text-[11px] sm:text-xs text-zinc-400">Leading Combat Academy</p>
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-1.5 text-white font-black text-xl sm:text-2xl">
                  <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                  <span>4.9★</span>
                </div>
                <p className="text-[11px] sm:text-xs text-zinc-400">100+ Google Reviews</p>
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-1.5 text-white font-black text-xl sm:text-2xl">
                  <ShieldCheck className="w-4 h-4 text-orange-400" />
                  <span>2 Branches</span>
                </div>
                <p className="text-[11px] sm:text-xs text-zinc-400">Ayodhya Nagar & Govind Garden</p>
              </div>
            </div>

          </div>

          {/* Right Column: Dynamic Visual Card & Quick Kiosk Entry */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Outer decorative ring */}
              <div className="absolute -inset-1.5 bg-gradient-to-r from-orange-500 via-red-600 to-amber-500 rounded-3xl blur-lg opacity-40 animate-pulse" />
              
              {/* Main Card */}
              <div className="relative rounded-3xl bg-zinc-950 border border-zinc-800 p-6 sm:p-8 space-y-6 shadow-2xl">
                
                {/* Card Header */}
                <div className="flex items-center justify-between pb-4 border-b border-zinc-800">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center shadow-lg shadow-orange-500/20">
                      <Flame className="w-7 h-7 text-white" />
                    </div>
                    <div>
                      <h2 className="font-extrabold text-white text-lg">TNT Fight Pass</h2>
                      <p className="text-xs text-orange-400 font-medium">Bhopal Mat Access</p>
                    </div>
                  </div>
                  <span className="px-2.5 py-1 rounded-full bg-green-500/10 text-green-400 text-[10px] font-bold border border-green-500/20 uppercase tracking-wider">
                    ● Admissions Open
                  </span>
                </div>

                {/* Combat Disciplines Grid Badges */}
                <div className="space-y-3">
                  <p className="text-xs font-bold text-zinc-400 uppercase tracking-wider">
                    Featured Disciplines & Batches
                  </p>
                  <div className="grid grid-cols-2 gap-2.5 text-xs">
                    <div className="p-2.5 rounded-xl bg-zinc-900/90 border border-zinc-800 flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-red-500" />
                      <span className="font-semibold text-zinc-200">MMA & Cage Fight</span>
                    </div>
                    <div className="p-2.5 rounded-xl bg-zinc-900/90 border border-zinc-800 flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-blue-500" />
                      <span className="font-semibold text-zinc-200">BJJ Grappling</span>
                    </div>
                    <div className="p-2.5 rounded-xl bg-zinc-900/90 border border-zinc-800 flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-amber-500" />
                      <span className="font-semibold text-zinc-200">Kickboxing & Stunts</span>
                    </div>
                    <div className="p-2.5 rounded-xl bg-zinc-900/90 border border-zinc-800 flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-orange-500" />
                      <span className="font-semibold text-zinc-200">CrossFit & Rig</span>
                    </div>
                    <div className="p-2.5 rounded-xl bg-zinc-900/90 border border-zinc-800 flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-emerald-500" />
                      <span className="font-semibold text-zinc-200">Calisthenics Power</span>
                    </div>
                    <div className="p-2.5 rounded-xl bg-zinc-900/90 border border-zinc-800 flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-purple-500" />
                      <span className="font-semibold text-zinc-200">Kids Anti-Bullying</span>
                    </div>
                  </div>
                </div>

                {/* Instant Front-Desk Kiosk Action */}
                <div className="p-4 rounded-2xl bg-gradient-to-br from-orange-950/40 via-zinc-900 to-zinc-950 border border-orange-500/30 space-y-3">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-white flex items-center gap-1.5">
                      <FileSignature className="w-4 h-4 text-orange-400" />
                      Front-Desk Fast Check-in
                    </span>
                    <span className="text-[10px] text-zinc-400 font-mono">100% Digital</span>
                  </div>
                  <p className="text-[11px] text-zinc-300 leading-normal">
                    Stepping on the mats today? Fill the official legal waiver on your mobile before your session.
                  </p>
                  <Link
                    href="/waiver"
                    className="block w-full py-2.5 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs text-center uppercase tracking-wider shadow-md transition-colors"
                  >
                    Open Digital Waiver Form →
                  </Link>
                </div>

                {/* Coach Endorsement Footer */}
                <div className="flex items-center justify-between pt-2 text-xs text-zinc-400">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full bg-orange-500/20 border border-orange-500/40 flex items-center justify-center text-orange-400 font-bold text-xs">
                      V
                    </div>
                    <span className="text-zinc-300 font-medium">Head Coach: Vikalp</span>
                  </div>
                  <Link href="#timetable" className="text-orange-400 hover:underline flex items-center gap-1">
                    <CalendarDays className="w-3.5 h-3.5" />
                    <span>View Schedule</span>
                  </Link>
                </div>

              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
