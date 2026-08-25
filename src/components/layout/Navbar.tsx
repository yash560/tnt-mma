'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Flame, 
  Menu, 
  X, 
  FileSignature, 
  ShieldCheck, 
  UserCircle2, 
  Phone, 
  ChevronRight,
  Sparkles,
  CalendarDays
} from 'lucide-react';

interface NavbarProps {
  onOpenTrialModal?: () => void;
}

export default function Navbar({ onOpenTrialModal }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          scrolled
            ? 'bg-black/85 backdrop-blur-xl border-b border-orange-500/20 py-3 shadow-2xl shadow-orange-950/20'
            : 'bg-gradient-to-b from-black/90 via-black/50 to-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Brand Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500 via-red-600 to-amber-500 flex items-center justify-center shadow-lg shadow-orange-500/30 group-hover:scale-105 transition-transform">
              <Flame className="w-6 h-6 text-white animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-2xl font-black tracking-tight text-white group-hover:text-orange-400 transition-colors">
                  TNT<span className="text-orange-500">.</span>MMA
                </span>
                <span className="text-[10px] uppercase font-bold tracking-widest px-1.5 py-0.5 rounded bg-orange-500/20 text-orange-400 border border-orange-500/30">
                  BHOPAL
                </span>
              </div>
              <p className="text-[10px] text-zinc-400 font-medium tracking-wider uppercase">
                Combat & CrossFit Academy
              </p>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-7">
            <Link 
              href="/#programs" 
              className="text-sm font-medium text-zinc-300 hover:text-orange-400 transition-colors"
            >
              Disciplines
            </Link>
            <Link 
              href="/#timetable" 
              className="text-sm font-medium text-zinc-300 hover:text-orange-400 transition-colors flex items-center gap-1.5"
            >
              <CalendarDays className="w-4 h-4 text-orange-400" />
              Schedule
            </Link>
            <Link 
              href="/#pricing" 
              className="text-sm font-medium text-zinc-300 hover:text-orange-400 transition-colors"
            >
              Membership Plans
            </Link>
            <Link 
              href="/waiver" 
              className="text-sm font-semibold text-orange-300 hover:text-orange-400 transition-colors flex items-center gap-1.5 bg-orange-950/40 px-2.5 py-1 rounded-lg border border-orange-500/30"
            >
              <FileSignature className="w-4 h-4 text-orange-400" />
              Digital Waiver
            </Link>
            <Link 
              href="/#reviews" 
              className="text-sm font-medium text-zinc-300 hover:text-orange-400 transition-colors"
            >
              Reviews (4.9★)
            </Link>
            <Link 
              href="/#contact" 
              className="text-sm font-medium text-zinc-300 hover:text-orange-400 transition-colors"
            >
              Locations
            </Link>
          </nav>

          {/* Action CTAs & Portal Links */}
          <div className="hidden sm:flex items-center gap-3">
            {/* Quick Portals Switcher */}
            <Link
              href="/portal"
              className="text-xs font-semibold px-3 py-2 rounded-xl bg-zinc-900/90 text-zinc-200 border border-zinc-700 hover:border-orange-500/50 hover:bg-zinc-800 transition-all flex items-center gap-1.5"
              title="Member & Parent Portal"
            >
              <UserCircle2 className="w-3.5 h-3.5 text-zinc-400" />
              <span>Member Portal</span>
            </Link>

            <Link
              href="/admin"
              className="text-xs font-semibold px-3 py-2 rounded-xl bg-zinc-900/90 text-zinc-200 border border-zinc-700 hover:border-amber-500/50 hover:bg-zinc-800 transition-all flex items-center gap-1.5"
              title="Admin Command Hub"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
              <span>Admin Hub</span>
            </Link>

            {/* Trial CTA */}
            {onOpenTrialModal ? (
              <button
                onClick={onOpenTrialModal}
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white font-bold text-xs tracking-wide uppercase shadow-lg shadow-orange-500/25 hover:shadow-orange-500/40 hover:scale-105 active:scale-95 transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Free Trial Pass</span>
              </button>
            ) : (
              <Link
                href="/#trial"
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white font-bold text-xs tracking-wide uppercase shadow-lg shadow-orange-500/25 hover:shadow-orange-500/40 hover:scale-105 active:scale-95 transition-all flex items-center gap-1.5"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Free Trial Pass</span>
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex sm:hidden items-center gap-2">
            <Link
              href="/waiver"
              className="p-2 rounded-lg bg-orange-500/20 text-orange-400 border border-orange-500/30"
              title="Digital Waiver"
            >
              <FileSignature className="w-5 h-5" />
            </Link>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl bg-zinc-900 border border-zinc-700 text-zinc-200"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-2xl lg:hidden flex flex-col pt-20 px-6 pb-8 animate-in fade-in duration-200">
          <div className="flex items-center justify-between pb-6 border-b border-zinc-800">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-orange-500 flex items-center justify-center">
                <Flame className="w-5 h-5 text-white" />
              </div>
              <span className="font-bold text-lg text-white">TNT MMA Bhopal</span>
            </div>
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 rounded-lg bg-zinc-900 text-zinc-400 hover:text-white"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto py-6 space-y-4">
            <Link
              href="/#programs"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-between p-3 rounded-xl bg-zinc-900/50 hover:bg-zinc-800 text-zinc-200 font-medium"
            >
              <span>Disciplines & Programs</span>
              <ChevronRight className="w-4 h-4 text-zinc-500" />
            </Link>
            <Link
              href="/#timetable"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-between p-3 rounded-xl bg-zinc-900/50 hover:bg-zinc-800 text-zinc-200 font-medium"
            >
              <span className="flex items-center gap-2">
                <CalendarDays className="w-4 h-4 text-orange-400" />
                Class Schedule & Timings
              </span>
              <ChevronRight className="w-4 h-4 text-zinc-500" />
            </Link>
            <Link
              href="/#pricing"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-between p-3 rounded-xl bg-zinc-900/50 hover:bg-zinc-800 text-zinc-200 font-medium"
            >
              <span>Membership Plans</span>
              <ChevronRight className="w-4 h-4 text-zinc-500" />
            </Link>
            <Link
              href="/waiver"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-between p-3 rounded-xl bg-orange-950/40 border border-orange-500/30 text-orange-300 font-bold"
            >
              <span className="flex items-center gap-2">
                <FileSignature className="w-4 h-4 text-orange-400" />
                Digital Waiver (Adult & Minor)
              </span>
              <ChevronRight className="w-4 h-4 text-orange-400" />
            </Link>
            <Link
              href="/portal"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-between p-3 rounded-xl bg-zinc-900/50 hover:bg-zinc-800 text-zinc-200 font-medium"
            >
              <span className="flex items-center gap-2">
                <UserCircle2 className="w-4 h-4 text-zinc-400" />
                Member & Parent Portal
              </span>
              <ChevronRight className="w-4 h-4 text-zinc-500" />
            </Link>
            <Link
              href="/admin"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-between p-3 rounded-xl bg-zinc-900/50 hover:bg-zinc-800 text-zinc-200 font-medium"
            >
              <span className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-amber-400" />
                Admin Command Hub
              </span>
              <ChevronRight className="w-4 h-4 text-zinc-500" />
            </Link>
            <Link
              href="/#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-between p-3 rounded-xl bg-zinc-900/50 hover:bg-zinc-800 text-zinc-200 font-medium"
            >
              <span className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-green-400" />
                Contact & Directions
              </span>
              <ChevronRight className="w-4 h-4 text-zinc-500" />
            </Link>
          </div>

          <div className="pt-4 border-t border-zinc-800 space-y-3">
            {onOpenTrialModal ? (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenTrialModal();
                }}
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-orange-500 to-red-600 text-white font-bold text-sm uppercase tracking-wider text-center shadow-lg shadow-orange-500/25"
              >
                Claim Free 1-Day Trial Pass
              </button>
            ) : (
              <Link
                href="/#trial"
                onClick={() => setMobileMenuOpen(false)}
                className="block w-full py-3.5 rounded-xl bg-gradient-to-r from-orange-500 to-red-600 text-white font-bold text-sm uppercase tracking-wider text-center shadow-lg shadow-orange-500/25"
              >
                Claim Free 1-Day Trial Pass
              </Link>
            )}
            <a
              href="tel:+919713217866"
              className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-zinc-900 border border-zinc-700 text-zinc-200 font-semibold text-xs"
            >
              <Phone className="w-4 h-4 text-orange-400" />
              <span>Call Front Desk: +91 97132 17866</span>
            </a>
          </div>
        </div>
      )}
    </>
  );
}
