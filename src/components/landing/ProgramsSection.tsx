'use client';

import React, { useState } from 'react';
import { 
  Swords, 
  ShieldCheck, 
  Zap, 
  Dumbbell, 
  Activity, 
  GraduationCap, 
  Apple, 
  CheckCircle2, 
  ChevronRight,
  Flame,
  ArrowRight
} from 'lucide-react';
import Link from 'next/link';

interface ProgramsSectionProps {
  onOpenTrialModal: (discipline?: string) => void;
}

export default function ProgramsSection({ onOpenTrialModal }: ProgramsSectionProps) {
  const [activeTab, setActiveTab] = useState<string>('ALL');

  const programs = [
    {
      id: 'mma',
      category: 'COMBAT',
      title: 'Mixed Martial Arts (MMA)',
      tagline: 'The Ultimate Combat System: Cage Control, Striking & Ground-and-Pound',
      description: 'Comprehensive octagon fighting integrating freestyle striking, Olympic takedowns, fence work, and submission control. Structured for beginners to pro fighters competing at state & national circuits.',
      icon: Swords,
      color: 'from-orange-500 to-red-600',
      badge: 'Pro Octagon Cage',
      curriculum: [
        'Cage wrestling & wall walk defense',
        'Striking-to-grappling transitions',
        'Ground-and-pound mechanics & guard passing',
        'Controlled sparring under head coach supervision',
      ],
      batches: 'Mon, Wed, Fri (Evening 06:00 PM & Pro 07:30 PM)',
      coach: 'Coach Vikalp',
    },
    {
      id: 'bjj',
      category: 'COMBAT',
      title: 'Brazilian Jiu-Jitsu (BJJ)',
      tagline: 'The Gentle Art: Gi & No-Gi Submission Grappling',
      description: 'Master positional dominance, sweeps, chokes, arm locks, and leverage-based ground fighting where technique triumphs over raw strength. Includes formal belt and stripe grading progression.',
      icon: ShieldCheck,
      color: 'from-blue-500 to-indigo-600',
      badge: 'Belt Progression',
      curriculum: [
        'Positional hierarchy (Mount, Back control, Side control)',
        'Guard retention & submission escapes',
        'Leg locks, Kimura, Guillotine, and RNC mastery',
        'IBJJF / ADCC rules competition prep',
      ],
      batches: 'Tue, Thu, Sat (Evening 07:30 PM - 09:00 PM)',
      coach: 'Coach Vikalp (Brown Belt)',
    },
    {
      id: 'kickboxing',
      category: 'COMBAT',
      title: 'Muay Thai & Kickboxing',
      tagline: 'The Art of 8 Limbs: Explosive Strikes, Kicks & Clinch Work',
      description: 'High-calorie burning striking system utilizing punches, elbows, knees, and kicks. Heavy bag drills, Dutch combination sparring, and explosive pad work.',
      icon: Zap,
      color: 'from-amber-500 to-red-500',
      badge: 'Cardio & Power',
      curriculum: [
        'Speed punching & Dutch kickboxing combinations',
        'Muay Thai clinch & plum control',
        'Defensive parries, slips, and checking kicks',
        'High-intensity heavy bag intervals',
      ],
      batches: 'Daily (Morning 07:30 AM & Evening 06:00 PM)',
      coach: 'Coach Vikalp',
    },
    {
      id: 'crossfit',
      category: 'FITNESS',
      title: 'CrossFit & High-Intensity Conditioning',
      tagline: 'Explosive Stamina, Tyre Flips & Functional Strength Rig',
      description: 'Functional movement performed at high intensity. Includes Olympic barbell lifting, kettlebell circuits, battle ropes, tyre flips, and sprint conditioning.',
      icon: Dumbbell,
      color: 'from-emerald-500 to-teal-600',
      badge: 'Fat Loss & Strength',
      curriculum: [
        'Daily WOD (Workout of the Day) variations',
        'Olympic lifting form & kettlebell power',
        'Tyre flips, plyometrics & sledgehammer drills',
        'VO2 max & stamina enhancement',
      ],
      batches: 'Daily (Morning 06:00 AM - 07:30 AM & Evening 05:00 PM)',
      coach: 'Coach Rohit',
    },
    {
      id: 'calisthenics',
      category: 'FITNESS',
      title: 'Calisthenics & Bodyweight Stunts',
      tagline: 'Gymnastic Ring Control, Muscle-Ups & Dynamic Flips',
      description: 'Master strict muscle-ups, handstands, human flags, and gymnastic ring sequences to build immense tendon resilience and core power.',
      icon: Activity,
      color: 'from-purple-500 to-pink-600',
      badge: 'Gymnastic Rings',
      curriculum: [
        'Strict pull-up, dip, and muscle-up progressions',
        'Handstand balance & planche mechanics',
        'Explosive bar tricks & parkour roll safety',
        'Grip strength and shoulder girdle stability',
      ],
      batches: 'Tue, Thu, Sat (Morning 08:30 AM & Evening 07:00 PM)',
      coach: 'Coach Rohit',
    },
    {
      id: 'kids',
      category: 'KIDS',
      title: 'Kids MMA & Anti-Bullying Academy',
      tagline: 'Ages 5-14 Confidence, Bully Defense & Motor Skills',
      description: 'Non-violent martial arts coaching focused on situational awareness, de-escalation, self-defense escapes, athletic coordination, and building self-respect.',
      icon: GraduationCap,
      color: 'from-rose-500 to-orange-500',
      badge: 'Ages 5 - 14',
      curriculum: [
        'Anti-bullying verbal boundary setting',
        'Takedown defense & safe breakfalls',
        'Positional control without striking back',
        'Focus games, agility ladders & discipline',
      ],
      batches: 'Mon to Fri (Evening 04:00 PM - 05:30 PM)',
      coach: 'Coach Anjali & Coach Vikalp',
    },
    {
      id: 'nutrition',
      category: 'NUTRITION',
      title: 'Sports Dietetics & Nutrition Planning',
      tagline: 'Targeted Meal Plans for Weight Cut, Muscle Gain & Fat Loss',
      description: '1-on-1 sports nutritionist consultation. Customized Indian macro plans tailored for fighters cutting weight, working professionals losing belly fat, or athletes gaining lean mass.',
      icon: Apple,
      color: 'from-green-500 to-emerald-600',
      badge: 'Certified Dietician',
      curriculum: [
        'Personalized InBody body composition analysis',
        'Custom Indian meal plans (Veg & Non-Veg)',
        'Fighter weight category management',
        'Hydration, electrolyte & recovery science',
      ],
      batches: 'By Appointment (Weekly Review)',
      coach: 'Dietician Consultation Desk',
    },
  ];

  const filteredPrograms = activeTab === 'ALL' 
    ? programs 
    : programs.filter((p) => p.category === activeTab);

  return (
    <section id="programs" className="py-24 bg-white dark:bg-zinc-950/60 border-t border-slate-200 dark:border-zinc-800/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-600 dark:text-orange-400 text-xs font-bold uppercase tracking-wider">
              <Flame className="w-3.5 h-3.5" />
              <span>World-Class Combat Disciplines</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
              Elite Training Programs
            </h2>
            <p className="text-slate-600 dark:text-zinc-400 text-sm sm:text-base max-w-2xl">
              Whether your goal is competing in the cage, sculpting elite functional conditioning, or enrolling your child in anti-bullying self-defense, our academy has a dedicated syllabus.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
            {['ALL', 'COMBAT', 'FITNESS', 'KIDS', 'NUTRITION'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all whitespace-nowrap cursor-pointer ${
                  activeTab === tab
                    ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/25 font-extrabold'
                    : 'bg-slate-100 dark:bg-zinc-900 text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-zinc-800 border border-slate-200 dark:border-zinc-800'
                }`}
              >
                {tab === 'ALL' ? 'All Disciplines' : tab}
              </button>
            ))}
          </div>
        </div>

        {/* Mobile Swipe Hint (< md) */}
        <div className="flex md:hidden items-center justify-between text-xs text-slate-500 dark:text-zinc-400 px-1 font-semibold">
          <span>👉 Swipe horizontally ({filteredPrograms.length} programs)</span>
          <Link href="/programs" className="text-orange-500 font-bold flex items-center gap-0.5">
            <span>View All</span>
            <ArrowRight className="w-3 h-3" />
          </Link>
        </div>

        {/* 1. Mobile View: Horizontal Swipe Snap Carousel (< md) */}
        <div className="flex md:hidden overflow-x-auto snap-x snap-mandatory scrollbar-none pb-4 -mx-4 px-4 gap-4">
          {filteredPrograms.map((prog) => {
            const Icon = prog.icon;
            return (
              <div
                key={prog.id}
                className="w-[84vw] max-w-[330px] shrink-0 snap-center rounded-3xl bg-slate-50 dark:bg-zinc-900/70 border border-slate-200 dark:border-zinc-800/80 p-5 space-y-4 flex flex-col justify-between shadow-sm"
              >
                <div className="space-y-3">
                  <div className="flex items-start justify-between">
                    <div className={`w-11 h-11 rounded-2xl bg-gradient-to-br ${prog.color} flex items-center justify-center text-white shadow-md`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-white dark:bg-zinc-800 text-slate-700 dark:text-zinc-300 border border-slate-200 dark:border-zinc-700">
                      {prog.badge}
                    </span>
                  </div>

                  <div className="space-y-0.5">
                    <h3 className="text-lg font-black text-slate-900 dark:text-white">
                      {prog.title}
                    </h3>
                    <p className="text-xs font-semibold text-orange-600 dark:text-orange-400/90">
                      {prog.tagline}
                    </p>
                  </div>

                  <p className="text-xs text-slate-600 dark:text-zinc-400 leading-relaxed line-clamp-3">
                    {prog.description}
                  </p>

                  <ul className="space-y-1 text-xs text-slate-600 dark:text-zinc-400 pt-1">
                    {prog.curriculum.slice(0, 3).map((item, idx) => (
                      <li key={idx} className="flex items-start gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-orange-500 shrink-0 mt-0.5" />
                        <span className="truncate">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-3 border-t border-slate-200 dark:border-zinc-800 space-y-2">
                  <p className="text-[10px] text-slate-500 dark:text-zinc-400">Coach: <strong className="text-slate-800 dark:text-zinc-200">{prog.coach}</strong></p>
                  <button
                    onClick={() => onOpenTrialModal(prog.title)}
                    className="w-full py-2.5 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-1 shadow-md shadow-orange-500/20"
                  >
                    <span>Claim Free Trial</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* 2. Desktop View: Pristine 3-Column Responsive Grid (md+) */}
        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPrograms.map((prog) => {
            const Icon = prog.icon;
            return (
              <div
                key={prog.id}
                className="rounded-3xl bg-slate-50 dark:bg-zinc-900/70 border border-slate-200 dark:border-zinc-800/80 hover:border-orange-500/50 p-6 sm:p-7 space-y-6 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl shadow-sm group"
              >
                <div className="space-y-4">
                  {/* Card Header & Icon */}
                  <div className="flex items-start justify-between">
                    <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${prog.color} flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-white dark:bg-zinc-800 text-slate-700 dark:text-zinc-300 border border-slate-200 dark:border-zinc-700">
                      {prog.badge}
                    </span>
                  </div>

                  {/* Title & Tagline */}
                  <div className="space-y-1">
                    <h3 className="text-xl font-black text-slate-900 dark:text-white group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors">
                      {prog.title}
                    </h3>
                    <p className="text-xs font-semibold text-orange-600 dark:text-orange-400/90">
                      {prog.tagline}
                    </p>
                  </div>

                  {/* Description */}
                  <p className="text-xs text-slate-600 dark:text-zinc-400 leading-relaxed">
                    {prog.description}
                  </p>

                  {/* Syllabus Bulletpoints */}
                  <div className="space-y-2 pt-2 border-t border-slate-200 dark:border-zinc-800/60">
                    <p className="text-[11px] font-bold text-slate-800 dark:text-zinc-300 uppercase tracking-wider">
                      Key Highlights:
                    </p>
                    <ul className="space-y-1.5 text-xs text-slate-600 dark:text-zinc-400">
                      {prog.curriculum.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-orange-500 shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Card Footer: Timings & CTA */}
                <div className="pt-4 border-t border-slate-200 dark:border-zinc-800 space-y-3">
                  <div className="text-[11px] text-slate-500 dark:text-zinc-400 flex items-center justify-between">
                    <span>Coach: <strong className="text-slate-800 dark:text-zinc-200 font-semibold">{prog.coach}</strong></span>
                  </div>
                  
                  <button
                    onClick={() => onOpenTrialModal(prog.title)}
                    className="w-full py-2.5 rounded-xl bg-white dark:bg-zinc-800 hover:bg-orange-500 dark:hover:bg-orange-500 text-slate-800 dark:text-zinc-200 hover:text-white dark:hover:text-white font-bold text-xs uppercase tracking-wider border border-slate-200 dark:border-zinc-700 hover:border-transparent transition-all flex items-center justify-center gap-1.5 group-hover:bg-orange-500 group-hover:text-white group-hover:border-transparent cursor-pointer shadow-sm"
                  >
                    <span>Book Trial in this Batch</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
