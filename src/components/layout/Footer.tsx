'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Flame, 
  Phone, 
  MapPin, 
  Clock, 
  ShieldAlert, 
  Award, 
  HeartHandshake, 
  Star, 
  FileSignature, 
  X,
  ExternalLink
} from 'lucide-react';

interface FooterProps {
  onOpenTrialModal?: () => void;
}

export default function Footer({ onOpenTrialModal }: FooterProps) {
  const [activeLegalModal, setActiveLegalModal] = useState<'WAIVER' | 'TERMS' | 'PRIVACY' | null>(null);

  return (
    <>
      <footer className="bg-slate-900 dark:bg-black border-t border-slate-800 dark:border-zinc-800/80 pt-16 pb-12 relative overflow-hidden text-slate-300 dark:text-zinc-400">
        {/* Ambient background glow */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-48 bg-orange-600/10 blur-[120px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 relative z-10">
          
          {/* Tier 3 Banner (Call to Action Bar) */}
          <div className="rounded-3xl bg-gradient-to-r from-slate-800 via-slate-850 to-slate-800 dark:from-zinc-900 dark:via-orange-950/40 dark:to-zinc-900 border border-orange-500/30 p-8 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl">
            <div className="space-y-2 text-center md:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/20 text-orange-400 text-xs font-bold uppercase tracking-wider border border-orange-500/30">
                <Flame className="w-3.5 h-3.5 animate-pulse" />
                Step On The Mat Today
              </div>
              <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                Ready to Unleash Your Inner Warrior?
              </h3>
              <p className="text-sm text-slate-300 dark:text-zinc-400 max-w-xl">
                Experience Bhopal’s most comprehensive combat sports & functional fitness academy. Claim your free pass or sign your digital waiver online.
              </p>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-3">
              {onOpenTrialModal ? (
                <button
                  onClick={onOpenTrialModal}
                  className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white font-bold text-sm uppercase tracking-wider shadow-lg shadow-orange-500/30 hover:scale-105 transition-all cursor-pointer"
                >
                  Book Free 1-Day Trial
                </button>
              ) : (
                <Link
                  href="/schedule"
                  className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white font-bold text-sm uppercase tracking-wider shadow-lg shadow-orange-500/30 hover:scale-105 transition-all"
                >
                  Book Free 1-Day Trial
                </Link>
              )}
              <Link
                href="/waiver"
                className="px-6 py-3.5 rounded-xl bg-slate-800 dark:bg-zinc-900 border border-slate-700 dark:border-zinc-700 hover:border-orange-500/50 hover:bg-slate-700 dark:hover:bg-zinc-800 text-orange-400 font-bold text-sm tracking-wider flex items-center gap-2 transition-all"
              >
                <FileSignature className="w-4 h-4" />
                <span>Sign Digital Waiver</span>
              </Link>
            </div>
          </div>

          {/* Tier 2: Credibility Bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-6 border-y border-slate-800 dark:border-zinc-800">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-orange-400">
                <Star className="w-5 h-5 fill-orange-400 text-orange-400" />
              </div>
              <div>
                <p className="text-base font-bold text-white">4.9 ★ Rating</p>
                <p className="text-xs text-slate-400 dark:text-zinc-400">100+ Verified Google Reviews</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-400">
                <Award className="w-5 h-5" />
              </div>
              <div>
                <p className="text-base font-bold text-white">5+ Years</p>
                <p className="text-xs text-slate-400 dark:text-zinc-400">Pioneer Combat Academy</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
                <ShieldAlert className="w-5 h-5" />
              </div>
              <div>
                <p className="text-base font-bold text-white">100% Safety</p>
                <p className="text-xs text-slate-400 dark:text-zinc-400">Padded Mats & Certified Coaches</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-green-500/10 border border-green-500/20 flex items-center justify-center text-green-400">
                <HeartHandshake className="w-5 h-5" />
              </div>
              <div>
                <p className="text-base font-bold text-white">Kids & Adults</p>
                <p className="text-xs text-slate-400 dark:text-zinc-400">Ages 5 to 55+ Welcome</p>
              </div>
            </div>
          </div>

          {/* Tier 1: Main Sitemap & Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
            {/* Column 1: Brand & Narrative */}
            <div className="lg:col-span-2 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center text-white">
                  <Flame className="w-5 h-5" />
                </div>
                <span className="text-xl font-black text-white">TNT MMA & Fitness Academy</span>
              </div>
              <p className="text-sm text-slate-300 dark:text-zinc-400 leading-relaxed pr-4">
                Bhopal’s highest-rated mixed martial arts, Brazilian Jiu-Jitsu, kickboxing, calisthenics, and CrossFit facility. Dedicated to building world-class athletes, confident children, and empowering functional fitness.
              </p>
              <div className="space-y-2 pt-2 text-xs text-slate-300 dark:text-zinc-300">
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-orange-400" />
                  <a href="tel:+919713217866" className="hover:text-orange-400 transition-colors font-medium">
                    +91 97132 17866
                  </a>
                </div>
                <div className="flex items-start gap-2">
                  <Clock className="w-4 h-4 text-orange-400 shrink-0 mt-0.5" />
                  <span>
                    Mon - Sat: 06:00 AM - 10:00 AM & 05:00 PM - 10:00 PM<br/>
                    (Kids Batch: 04:00 PM - 05:30 PM | Sun: Closed/Seminars)
                  </span>
                </div>
              </div>
            </div>

            {/* Column 2: Disciplines */}
            <div className="space-y-3">
              <h4 className="text-sm font-bold text-white tracking-wide uppercase">Disciplines</h4>
              <ul className="space-y-2 text-xs text-slate-400 dark:text-zinc-400">
                <li><Link href="/programs#mma" className="hover:text-orange-400 transition-colors">Mixed Martial Arts (MMA)</Link></li>
                <li><Link href="/programs#bjj" className="hover:text-orange-400 transition-colors">Brazilian Jiu-Jitsu (BJJ)</Link></li>
                <li><Link href="/programs#kickboxing" className="hover:text-orange-400 transition-colors">Muay Thai & Kickboxing</Link></li>
                <li><Link href="/programs#crossfit" className="hover:text-orange-400 transition-colors">CrossFit & Conditioning</Link></li>
                <li><Link href="/programs#calisthenics" className="hover:text-orange-400 transition-colors">Calisthenics & Stunts</Link></li>
                <li><Link href="/programs#kids" className="hover:text-orange-400 transition-colors">Kids Anti-Bullying Academy</Link></li>
              </ul>
            </div>

            {/* Column 3: Quick Links & Portals */}
            <div className="space-y-3">
              <h4 className="text-sm font-bold text-white tracking-wide uppercase">Platform & Portals</h4>
              <ul className="space-y-2 text-xs text-slate-400 dark:text-zinc-400">
                <li><Link href="/gallery" className="text-orange-400 font-semibold hover:underline flex items-center gap-1"><span>Real Photo & Video Gallery</span></Link></li>
                <li><Link href="/waiver" className="hover:text-orange-400 transition-colors">Sign Digital Waiver</Link></li>
                <li><Link href="/waiver/qr" className="hover:text-orange-400 transition-colors">Front-Desk Kiosk QR</Link></li>
                <li><Link href="/login" className="hover:text-orange-400 transition-colors">Universal Sign In Portal</Link></li>
                <li><Link href="/portal" className="hover:text-orange-400 transition-colors">Member / Parent Pass</Link></li>
                <li><Link href="/admin" className="hover:text-orange-400 transition-colors">Admin Command OS</Link></li>
                <li><Link href="/schedule" className="hover:text-orange-400 transition-colors">Live Schedule Timetable</Link></li>
                <li><Link href="/pricing" className="hover:text-orange-400 transition-colors">Membership Pricing</Link></li>
              </ul>
            </div>

            {/* Column 4: Bhopal Branches */}
            <div className="space-y-3">
              <h4 className="text-sm font-bold text-white tracking-wide uppercase">Bhopal Locations</h4>
              <div className="space-y-3 text-xs text-slate-400 dark:text-zinc-400">
                <div className="border border-slate-800 dark:border-zinc-800 p-2.5 rounded-xl bg-slate-950 dark:bg-zinc-950">
                  <p className="font-bold text-slate-200 dark:text-zinc-200 flex items-center gap-1.5 mb-1">
                    <MapPin className="w-3.5 h-3.5 text-orange-400" />
                    Ayodhya Nagar Branch
                  </p>
                  <p className="text-[11px] text-slate-400 dark:text-zinc-400 leading-tight">
                    B-11, Nizamuddin Rd, near Kanta Shravan Colony, above Klub Fox showroom, Bhopal 462022
                  </p>
                </div>
                <div className="border border-slate-800 dark:border-zinc-800 p-2.5 rounded-xl bg-slate-950 dark:bg-zinc-950">
                  <p className="font-bold text-slate-200 dark:text-zinc-200 flex items-center gap-1.5 mb-1">
                    <MapPin className="w-3.5 h-3.5 text-orange-400" />
                    Govind Garden Branch
                  </p>
                  <p className="text-[11px] text-slate-400 dark:text-zinc-400 leading-tight">
                    12-B, Raisen Road, Govind Garden, Govindpura, Bhopal 462023
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Tier 4: Legal Modals, Copyright & Attribution */}
          <div className="pt-8 border-t border-slate-800 dark:border-zinc-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 dark:text-zinc-500">
            <div className="flex flex-wrap items-center gap-4">
              <button 
                onClick={() => setActiveLegalModal('WAIVER')} 
                className="hover:text-slate-300 dark:hover:text-zinc-300 transition-colors underline cursor-pointer"
              >
                Liability Waiver Policy
              </button>
              <button 
                onClick={() => setActiveLegalModal('TERMS')} 
                className="hover:text-slate-300 dark:hover:text-zinc-300 transition-colors underline cursor-pointer"
              >
                Academy Rules & Code of Conduct
              </button>
              <button 
                onClick={() => setActiveLegalModal('PRIVACY')} 
                className="hover:text-slate-300 dark:hover:text-zinc-300 transition-colors underline cursor-pointer"
              >
                Privacy Policy
              </button>
            </div>

            <div className="text-center sm:text-right space-y-1">
              <p>© {new Date().getFullYear()} TNT MMA Fitness Academy Bhopal. All Rights Reserved.</p>
              <p className="text-[11px] text-slate-600 dark:text-zinc-600">
                Engineered with high standards by <a href="https://thewebvale.com" target="_blank" rel="noreferrer" className="text-orange-400/80 hover:text-orange-400 transition-colors font-medium">TheWebVale</a>
              </p>
            </div>
          </div>
        </div>
      </footer>

      {/* Legal Modals */}
      {activeLegalModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4" data-lenis-prevent>
          <div className="bg-slate-900 dark:bg-zinc-900 border border-slate-700 dark:border-zinc-700 rounded-3xl max-w-2xl w-full max-h-[85vh] flex flex-col shadow-2xl text-slate-200 dark:text-zinc-300">
            <div className="p-6 border-b border-slate-800 dark:border-zinc-800 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <ShieldAlert className="w-5 h-5 text-orange-400" />
                <h3 className="text-lg font-bold text-white">
                  {activeLegalModal === 'WAIVER' && 'TNT MMA Official Liability & Health Declaration'}
                  {activeLegalModal === 'TERMS' && 'Academy Rules & Sparring Code of Conduct'}
                  {activeLegalModal === 'PRIVACY' && 'Privacy Policy & Student Data Protection'}
                </h3>
              </div>
              <button 
                onClick={() => setActiveLegalModal(null)}
                className="p-1.5 rounded-lg bg-slate-800 dark:bg-zinc-800 text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto space-y-4 text-xs text-slate-300 dark:text-zinc-300 leading-relaxed">
              {activeLegalModal === 'WAIVER' && (
                <>
                  <p className="font-semibold text-white">1. Assumption of Risk in Combat Sports:</p>
                  <p>I acknowledge that Mixed Martial Arts (MMA), Brazilian Jiu-Jitsu (BJJ), Muay Thai Kickboxing, Boxing, Wrestling, and CrossFit are full-contact activities that involve inherent risks of injury, including bruises, sprains, fractures, and rare severe injuries. I voluntarily choose to participate.</p>
                  
                  <p className="font-semibold text-white">2. Medical Declaration:</p>
                  <p>I declare that I (or my enrolled child) am physically fit and possess no undisclosed cardiovascular, neurological, or spinal conditions that prevent safe engagement in strenuous martial arts.</p>
                  
                  <p className="font-semibold text-white">3. Minor Guardian Authorization:</p>
                  <p>For participants under 18 years of age, the parent or legal guardian consents to medical emergency treatment if needed and approves participation in age-appropriate training.</p>
                </>
              )}

              {activeLegalModal === 'TERMS' && (
                <>
                  <p className="font-semibold text-white">1. Mat Hygiene & Gear Policy:</p>
                  <p>Clean rashguards/Gi, trimmed fingernails/toenails, and mouthguards are mandatory during contact sparring drills. No outdoor shoes permitted on the combat mats.</p>
                  
                  <p className="font-semibold text-white">2. Controlled Sparring & Mutual Respect:</p>
                  <p>Ego-driven training or intentional infliction of injury is strictly forbidden. Any strike or submission must immediately release upon tapping (`Tap early, tap often`).</p>
                  
                  <p className="font-semibold text-white">3. Timely Fee Compliance:</p>
                  <p>Membership dues must be settled on or before the monthly due date to ensure continuous booking access and insurance coverage.</p>
                </>
              )}

              {activeLegalModal === 'PRIVACY' && (
                <>
                  <p className="font-semibold text-white">1. Information We Collect:</p>
                  <p>We collect student contact details, emergency medical contacts, and digital signatures solely for academy administration, safety verification, and fee invoicing.</p>
                  
                  <p className="font-semibold text-white">2. Zero Data Selling:</p>
                  <p>TNT MMA Fitness Academy and TheWebVale do not sell, rent, or trade student records to third parties.</p>
                </>
              )}
            </div>

            <div className="p-4 border-t border-slate-800 dark:border-zinc-800 flex justify-end">
              <button
                onClick={() => setActiveLegalModal(null)}
                className="px-5 py-2 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs"
              >
                Close & Return
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
