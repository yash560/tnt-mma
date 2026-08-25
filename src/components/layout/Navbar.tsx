'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Flame, 
  Menu, 
  X, 
  FileSignature, 
  ShieldCheck, 
  UserCircle2, 
  Phone, 
  ChevronDown,
  Sparkles,
  CalendarDays,
  Swords,
  Dumbbell,
  GraduationCap,
  Activity,
  Zap,
  MapPin,
  Star,
  Sun,
  Moon,
  LogOut,
  ArrowRight,
  Camera
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

export default function Navbar() {
  const pathname = usePathname();
  const { user, theme, toggleTheme, logout } = useAuth();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // Dropdown states
  const [programsDropdownOpen, setProgramsDropdownOpen] = useState(false);
  const [academyDropdownOpen, setAcademyDropdownOpen] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 15);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close dropdowns on outside click or route change
  useEffect(() => {
    setProgramsDropdownOpen(false);
    setAcademyDropdownOpen(false);
    setMobileMenuOpen(false);
  }, [pathname]);

  const combatPrograms = [
    { title: 'Mixed Martial Arts (MMA)', desc: 'Pro Octagon cage work, wrestling & strikes', href: '/programs#mma', icon: Swords, color: 'text-orange-500' },
    { title: 'Brazilian Jiu-Jitsu (BJJ)', desc: 'Gi & No-Gi submission grappling & belt grading', href: '/programs#bjj', icon: ShieldCheck, color: 'text-blue-500' },
    { title: 'Muay Thai Kickboxing', desc: 'Heavy bag drills, Dutch striking & clinch', href: '/programs#kickboxing', icon: Zap, color: 'text-amber-500' },
    { title: 'CrossFit & Conditioning', desc: 'Olympic lifting, tyre flips & stamina rig', href: '/programs#crossfit', icon: Dumbbell, color: 'text-emerald-500' },
    { title: 'Calisthenics & Stunts', desc: 'Muscle-ups, gymnastic rings & acrobatics', href: '/programs#calisthenics', icon: Activity, color: 'text-purple-500' },
    { title: 'Kids MMA & Anti-Bullying', desc: 'Ages 5-14 confidence, motor skills & safety', href: '/programs#kids', icon: GraduationCap, color: 'text-orange-400' },
  ];

  const academyLinks = [
    { title: 'Weekly Mat Timetable', desc: 'Morning, afternoon kids & evening fight slots', href: '/schedule', icon: CalendarDays },
    { title: 'Real Photo & Video Gallery', desc: 'Authentic photos from Bhopal mats & lake runs', href: '/gallery', icon: Camera },
    { title: 'Arena & Facilities Tour', desc: 'Octagon cage, grappling mats & heavy bags', href: '/about#facilities', icon: Flame },
    { title: 'Coaching Staff & Founders', desc: 'Head Coach Vikalp & certified trainers', href: '/about#coaches', icon: UserCircle2 },
    { title: '4.9★ Google Reviews', desc: '100+ verified Bhopal athlete reviews', href: '/about#reviews', icon: Star },
    { title: 'Bhopal Branches Locator', desc: 'Ayodhya Nagar & Govind Garden facilities', href: '/contact', icon: MapPin },
  ];

  return (
    <>
      <header
        ref={navRef}
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          scrolled
            ? 'bg-white/95 dark:bg-black/90 backdrop-blur-xl border-b border-slate-200/80 dark:border-zinc-800 py-3 shadow-lg shadow-slate-200/40 dark:shadow-orange-950/20'
            : 'bg-white/80 dark:bg-black/70 backdrop-blur-md border-b border-slate-200/40 dark:border-zinc-800/40 py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          
          {/* Brand Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500 via-red-600 to-amber-500 flex items-center justify-center shadow-md shadow-orange-500/30 group-hover:scale-105 transition-transform">
              <Flame className="w-6 h-6 text-white animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-xl sm:text-2xl font-black tracking-tight text-slate-900 dark:text-white group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors">
                  TNT<span className="text-orange-500">.</span>MMA
                </span>
                <span className="text-[10px] uppercase font-bold tracking-widest px-1.5 py-0.5 rounded bg-orange-500/10 text-orange-600 dark:text-orange-400 border border-orange-500/20">
                  BHOPAL
                </span>
              </div>
              <p className="text-[10px] text-slate-500 dark:text-zinc-400 font-medium tracking-wider uppercase">
                Combat & CrossFit Academy
              </p>
            </div>
          </Link>

          {/* Desktop Navigation Links with Mega Menus */}
          <nav className="hidden lg:flex items-center gap-6">
            
            {/* Mega Menu 1: Disciplines */}
            <div 
              className="relative"
              onMouseEnter={() => setProgramsDropdownOpen(true)}
              onMouseLeave={() => setProgramsDropdownOpen(false)}
            >
              <button
                className={`text-sm font-semibold flex items-center gap-1.5 py-2 transition-colors cursor-pointer ${
                  pathname.startsWith('/programs')
                    ? 'text-orange-600 dark:text-orange-400 font-bold'
                    : 'text-slate-700 dark:text-zinc-300 hover:text-orange-600 dark:hover:text-orange-400'
                }`}
              >
                <span>Disciplines</span>
                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${programsDropdownOpen ? 'rotate-180 text-orange-500' : ''}`} />
              </button>

              {/* Mega Dropdown Panel */}
              {programsDropdownOpen && (
                <div className="absolute top-full left-0 -ml-12 w-[480px] p-4 rounded-3xl bg-white dark:bg-zinc-950 border border-slate-200 dark:border-zinc-800 shadow-2xl shadow-slate-300/50 dark:shadow-black/80 animate-in fade-in zoom-in-95 duration-150 grid grid-cols-2 gap-2 z-50">
                  {combatPrograms.map((prog, idx) => {
                    const Icon = prog.icon;
                    return (
                      <Link
                        key={idx}
                        href={prog.href}
                        className="p-3 rounded-2xl hover:bg-orange-50 dark:hover:bg-zinc-900 transition-colors group flex items-start gap-3"
                      >
                        <div className="p-2 rounded-xl bg-slate-100 dark:bg-zinc-900 group-hover:bg-white dark:group-hover:bg-zinc-800 border border-slate-200 dark:border-zinc-800 shrink-0">
                          <Icon className={`w-4 h-4 ${prog.color}`} />
                        </div>
                        <div className="space-y-0.5">
                          <p className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-orange-600 dark:group-hover:text-orange-400">
                            {prog.title}
                          </p>
                          <p className="text-[10px] text-slate-500 dark:text-zinc-400 leading-tight">
                            {prog.desc}
                          </p>
                        </div>
                      </Link>
                    );
                  })}
                  <div className="col-span-2 pt-2 border-t border-slate-100 dark:border-zinc-800 flex items-center justify-between text-[11px] px-2">
                    <span className="text-slate-500 dark:text-zinc-400">All batches guided by Coach Vikalp</span>
                    <Link href="/programs" className="text-orange-600 dark:text-orange-400 font-bold hover:underline flex items-center gap-1">
                      <span>View Full Curriculum</span>
                      <ArrowRight className="w-3 h-3" />
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* Mega Menu 2: Academy & Timetable */}
            <div 
              className="relative"
              onMouseEnter={() => setAcademyDropdownOpen(true)}
              onMouseLeave={() => setAcademyDropdownOpen(false)}
            >
              <button
                className={`text-sm font-semibold flex items-center gap-1.5 py-2 transition-colors cursor-pointer ${
                  pathname === '/schedule' || pathname === '/about' || pathname === '/contact'
                    ? 'text-orange-600 dark:text-orange-400 font-bold'
                    : 'text-slate-700 dark:text-zinc-300 hover:text-orange-600 dark:hover:text-orange-400'
                }`}
              >
                <span>Academy & Schedule</span>
                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${academyDropdownOpen ? 'rotate-180 text-orange-500' : ''}`} />
              </button>

              {/* Dropdown Panel */}
              {academyDropdownOpen && (
                <div className="absolute top-full left-0 -ml-10 w-[380px] p-4 rounded-3xl bg-white dark:bg-zinc-950 border border-slate-200 dark:border-zinc-800 shadow-2xl shadow-slate-300/50 dark:shadow-black/80 animate-in fade-in zoom-in-95 duration-150 space-y-1.5 z-50">
                  {academyLinks.map((item, idx) => {
                    const Icon = item.icon;
                    return (
                      <Link
                        key={idx}
                        href={item.href}
                        className="p-2.5 rounded-2xl hover:bg-orange-50 dark:hover:bg-zinc-900 transition-colors group flex items-center gap-3"
                      >
                        <div className="p-2 rounded-xl bg-slate-100 dark:bg-zinc-900 group-hover:bg-white dark:group-hover:bg-zinc-800 border border-slate-200 dark:border-zinc-800 text-orange-600 dark:text-orange-400 shrink-0">
                          <Icon className="w-4 h-4" />
                        </div>
                        <div className="space-y-0.5">
                          <p className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-orange-600 dark:group-hover:text-orange-400">
                            {item.title}
                          </p>
                          <p className="text-[10px] text-slate-500 dark:text-zinc-400">
                            {item.desc}
                          </p>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Direct Links */}
            <Link
              href="/pricing"
              className={`text-sm font-semibold transition-colors ${
                pathname === '/pricing'
                  ? 'text-orange-600 dark:text-orange-400 font-bold'
                  : 'text-slate-700 dark:text-zinc-300 hover:text-orange-600 dark:hover:text-orange-400'
              }`}
            >
              Pricing Plans
            </Link>

            <Link
              href="/waiver"
              className={`text-sm font-semibold flex items-center gap-1.5 px-3 py-1 rounded-xl transition-all ${
                pathname.startsWith('/waiver')
                  ? 'bg-orange-500 text-white font-bold shadow-sm'
                  : 'bg-orange-50 dark:bg-orange-950/40 text-orange-600 dark:text-orange-400 border border-orange-200 dark:border-orange-500/30 hover:bg-orange-100'
              }`}
            >
              <FileSignature className="w-3.5 h-3.5" />
              <span>Digital Waiver</span>
            </Link>
          </nav>

          {/* Right Controls: Theme Toggle + Unified Access Button */}
          <div className="hidden sm:flex items-center gap-3">
            
            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              className="p-2.5 rounded-xl bg-slate-100 dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 text-slate-600 dark:text-zinc-300 hover:text-orange-600 dark:hover:text-orange-400 transition-colors cursor-pointer"
              title={`Switch to ${theme === 'light' ? 'Dark' : 'Light'} Mode`}
              aria-label="Toggle Theme"
            >
              {theme === 'light' ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4 text-amber-400" />}
            </button>

            {/* Unified Access / User Account Button */}
            {user ? (
              <div className="flex items-center gap-2">
                <Link
                  href={user.role === 'ADMIN' ? '/admin' : '/portal'}
                  className="px-4 py-2 rounded-xl bg-slate-900 dark:bg-zinc-800 text-white font-bold text-xs flex items-center gap-2 hover:bg-orange-600 dark:hover:bg-orange-500 transition-all shadow-md"
                >
                  <UserCircle2 className="w-4 h-4 text-orange-400" />
                  <span className="max-w-[120px] truncate">{user.name.split(' ')[0]}</span>
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-orange-500/20 text-orange-300 font-mono">
                    {user.role}
                  </span>
                </Link>
                <button
                  onClick={logout}
                  className="p-2 rounded-xl bg-slate-100 dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 text-slate-500 hover:text-red-600 transition-colors cursor-pointer"
                  title="Logout"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <Link
                href="/login"
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white font-bold text-xs uppercase tracking-wider shadow-md shadow-orange-500/20 hover:scale-105 active:scale-95 transition-all flex items-center gap-1.5"
              >
                <UserCircle2 className="w-4 h-4" />
                <span>Sign In / Portal</span>
              </Link>
            )}

          </div>

          {/* Mobile Menu Toggle */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-xl bg-slate-100 dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 text-slate-600 dark:text-zinc-300"
            >
              {theme === 'light' ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4 text-amber-400" />}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl bg-slate-100 dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 text-slate-900 dark:text-zinc-200"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </header>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 bg-white/98 dark:bg-black/95 backdrop-blur-2xl lg:hidden flex flex-col pt-20 px-6 pb-8 animate-in fade-in duration-200 overflow-y-auto">
          <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-zinc-800">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-orange-500 flex items-center justify-center text-white">
                <Flame className="w-5 h-5" />
              </div>
              <span className="font-black text-slate-900 dark:text-white">TNT MMA Bhopal</span>
            </div>
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 rounded-lg bg-slate-100 dark:bg-zinc-900 text-slate-600 dark:text-zinc-400"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="py-6 space-y-2 text-sm font-semibold">
            <Link
              href="/"
              onClick={() => setMobileMenuOpen(false)}
              className="block p-3 rounded-xl hover:bg-slate-100 dark:hover:bg-zinc-900 text-slate-900 dark:text-white"
            >
              Home
            </Link>
            <Link
              href="/programs"
              onClick={() => setMobileMenuOpen(false)}
              className="block p-3 rounded-xl hover:bg-slate-100 dark:hover:bg-zinc-900 text-slate-900 dark:text-white"
            >
              Combat Disciplines & Curriculum
            </Link>
            <Link
              href="/schedule"
              onClick={() => setMobileMenuOpen(false)}
              className="block p-3 rounded-xl hover:bg-slate-100 dark:hover:bg-zinc-900 text-slate-900 dark:text-white"
            >
              Weekly Class Schedule
            </Link>
            <Link
              href="/pricing"
              onClick={() => setMobileMenuOpen(false)}
              className="block p-3 rounded-xl hover:bg-slate-100 dark:hover:bg-zinc-900 text-slate-900 dark:text-white"
            >
              Membership Plans & Pricing
            </Link>
            <Link
              href="/about"
              onClick={() => setMobileMenuOpen(false)}
              className="block p-3 rounded-xl hover:bg-slate-100 dark:hover:bg-zinc-900 text-slate-900 dark:text-white"
            >
              About Coaches & Facilities
            </Link>
            <Link
              href="/waiver"
              onClick={() => setMobileMenuOpen(false)}
              className="block p-3 rounded-xl bg-orange-50 dark:bg-orange-950/40 text-orange-600 dark:text-orange-400 border border-orange-200 dark:border-orange-500/30"
            >
              Digital Legal Waiver
            </Link>
            <Link
              href="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className="block p-3 rounded-xl hover:bg-slate-100 dark:hover:bg-zinc-900 text-slate-900 dark:text-white"
            >
              Bhopal Locations & Contact
            </Link>
          </div>

          <div className="pt-4 border-t border-slate-200 dark:border-zinc-800 space-y-3">
            {user ? (
              <div className="space-y-2">
                <Link
                  href={user.role === 'ADMIN' ? '/admin' : '/portal'}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block w-full py-3.5 rounded-xl bg-orange-500 text-white font-bold text-center text-xs uppercase"
                >
                  Open {user.role === 'ADMIN' ? 'Admin Hub' : 'Member Portal'}
                </Link>
                <button
                  onClick={() => {
                    logout();
                    setMobileMenuOpen(false);
                  }}
                  className="block w-full py-2.5 rounded-xl bg-slate-100 dark:bg-zinc-900 text-slate-600 dark:text-zinc-400 font-semibold text-center text-xs"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <Link
                href="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="block w-full py-3.5 rounded-xl bg-gradient-to-r from-orange-500 to-red-600 text-white font-bold text-center text-xs uppercase tracking-wider shadow-lg"
              >
                Sign In to Member / Admin Portal
              </Link>
            )}
            <a
              href="tel:+919713217866"
              className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-slate-100 dark:bg-zinc-900 text-slate-700 dark:text-zinc-300 font-semibold text-xs border border-slate-200 dark:border-zinc-800"
            >
              <Phone className="w-4 h-4 text-orange-500" />
              <span>Call Front Desk: +91 97132 17866</span>
            </a>
          </div>
        </div>
      )}
    </>
  );
}
