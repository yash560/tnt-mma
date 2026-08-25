'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  UserCircle2, 
  ShieldCheck, 
  GraduationCap, 
  Dumbbell, 
  Flame, 
  ArrowRight, 
  Lock, 
  Mail, 
  CheckCircle2, 
  Sparkles,
  ArrowLeft
} from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { useAuth } from '@/context/AuthContext';
import { UserRole, DEMO_ACCOUNTS } from '@/lib/auth';
import confetti from 'canvas-confetti';

export default function LoginPage() {
  const router = useRouter();
  const { login, switchPersona, user } = useAuth();
  
  const [activeTab, setActiveTab] = useState<UserRole>('MEMBER');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('tnt2026');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    await login(activeTab, email || DEMO_ACCOUNTS[activeTab].email, password);
    
    confetti({ particleCount: 60, origin: { y: 0.6 } });
    setIsLoading(false);

    if (activeTab === 'ADMIN' || activeTab === 'TRAINER') {
      router.push('/admin');
    } else {
      router.push('/portal');
    }
  };

  const handleQuickDemo = (role: UserRole) => {
    switchPersona(role);
    confetti({ particleCount: 70, origin: { y: 0.6 } });
    if (role === 'ADMIN' || role === 'TRAINER') {
      router.push('/admin');
    } else {
      router.push('/portal');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-zinc-950 text-slate-900 dark:text-white flex flex-col justify-between selection:bg-orange-500 selection:text-white">
      <Navbar />

      <main className="flex-1 pt-28 pb-20 px-4 sm:px-6 lg:px-8 max-w-lg mx-auto w-full space-y-6">
        
        {/* Top Breadcrumb */}
        <Link
          href="/"
          className="text-xs text-slate-500 dark:text-zinc-400 hover:text-orange-600 dark:hover:text-orange-400 flex items-center gap-1 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Academy Home</span>
        </Link>

        {/* Portal Header */}
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center mx-auto shadow-lg shadow-orange-500/20">
            <Flame className="w-7 h-7 text-white" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-900 dark:text-white">
            TNT MMA Access Portal
          </h1>
          <p className="text-xs text-slate-500 dark:text-zinc-400 max-w-sm mx-auto">
            Select your role to sign into your fighter pass, parent portal, or coach command hub.
          </p>
        </div>

        {/* 4-Role Tab Selector */}
        <div className="grid grid-cols-4 gap-1.5 p-1.5 rounded-2xl bg-slate-200/80 dark:bg-zinc-900 border border-slate-300/60 dark:border-zinc-800">
          <button
            type="button"
            onClick={() => {
              setActiveTab('MEMBER');
              setEmail(DEMO_ACCOUNTS.MEMBER.email);
            }}
            className={`py-2.5 rounded-xl font-bold text-[11px] uppercase tracking-wider transition-all flex flex-col items-center gap-1 cursor-pointer ${
              activeTab === 'MEMBER'
                ? 'bg-white dark:bg-zinc-800 text-orange-600 dark:text-orange-400 shadow-md font-extrabold'
                : 'text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <UserCircle2 className="w-4 h-4" />
            <span>Fighter</span>
          </button>

          <button
            type="button"
            onClick={() => {
              setActiveTab('PARENT');
              setEmail(DEMO_ACCOUNTS.PARENT.email);
            }}
            className={`py-2.5 rounded-xl font-bold text-[11px] uppercase tracking-wider transition-all flex flex-col items-center gap-1 cursor-pointer ${
              activeTab === 'PARENT'
                ? 'bg-white dark:bg-zinc-800 text-orange-600 dark:text-orange-400 shadow-md font-extrabold'
                : 'text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <GraduationCap className="w-4 h-4" />
            <span>Parent</span>
          </button>

          <button
            type="button"
            onClick={() => {
              setActiveTab('TRAINER');
              setEmail(DEMO_ACCOUNTS.TRAINER.email);
            }}
            className={`py-2.5 rounded-xl font-bold text-[11px] uppercase tracking-wider transition-all flex flex-col items-center gap-1 cursor-pointer ${
              activeTab === 'TRAINER'
                ? 'bg-white dark:bg-zinc-800 text-orange-600 dark:text-orange-400 shadow-md font-extrabold'
                : 'text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Dumbbell className="w-4 h-4" />
            <span>Trainer</span>
          </button>

          <button
            type="button"
            onClick={() => {
              setActiveTab('ADMIN');
              setEmail(DEMO_ACCOUNTS.ADMIN.email);
            }}
            className={`py-2.5 rounded-xl font-bold text-[11px] uppercase tracking-wider transition-all flex flex-col items-center gap-1 cursor-pointer ${
              activeTab === 'ADMIN'
                ? 'bg-white dark:bg-zinc-800 text-orange-600 dark:text-orange-400 shadow-md font-extrabold'
                : 'text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <ShieldCheck className="w-4 h-4" />
            <span>Admin</span>
          </button>
        </div>

        {/* Login Box */}
        <div className="rounded-3xl bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 p-6 sm:p-8 shadow-xl space-y-6">
          
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-zinc-800 text-xs">
            <div>
              <p className="font-bold text-slate-900 dark:text-white">
                {activeTab === 'MEMBER' && 'Athlete / Member Login'}
                {activeTab === 'PARENT' && 'Kids Batch Parent Portal'}
                {activeTab === 'TRAINER' && 'Coach & Trainer Hub'}
                {activeTab === 'ADMIN' && 'Super Admin Operations (Vikalp)'}
              </p>
              <p className="text-[11px] text-slate-500 dark:text-zinc-400">
                Sign in with verified credentials
              </p>
            </div>
            <span className="px-2 py-0.5 rounded-full bg-orange-100 dark:bg-orange-950/60 text-orange-600 dark:text-orange-400 font-mono text-[10px] font-bold">
              {activeTab} MODE
            </span>
          </div>

          <form onSubmit={handleLogin} className="space-y-4 text-xs">
            <div className="space-y-1.5">
              <label className="font-bold text-slate-700 dark:text-zinc-300">Registered Email / Phone</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
                <input
                  type="email"
                  required
                  value={email || DEMO_ACCOUNTS[activeTab].email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-9 pr-4 py-3 rounded-xl bg-slate-50 dark:bg-zinc-950 border border-slate-200 dark:border-zinc-800 focus:border-orange-500 text-slate-900 dark:text-white outline-none"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="font-bold text-slate-700 dark:text-zinc-300">Password</label>
                <span className="text-[10px] text-slate-400 font-mono">Demo: tnt2026</span>
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-9 pr-4 py-3 rounded-xl bg-slate-50 dark:bg-zinc-950 border border-slate-200 dark:border-zinc-800 focus:border-orange-500 text-slate-900 dark:text-white outline-none"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white font-extrabold text-xs uppercase tracking-wider shadow-lg shadow-orange-500/25 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>{isLoading ? 'Authenticating...' : `Enter ${activeTab === 'ADMIN' ? 'Admin Hub' : 'Member Portal'}`}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Quick Showcase 1-Click Persona Bar */}
          <div className="pt-4 border-t border-slate-100 dark:border-zinc-800 space-y-3">
            <p className="text-[11px] font-bold text-slate-500 dark:text-zinc-400 uppercase tracking-wider text-center flex items-center justify-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              1-Click Client Showcase Switchers
            </p>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => handleQuickDemo('ADMIN')}
                className="p-2 rounded-xl bg-slate-100 dark:bg-zinc-800 hover:bg-orange-50 dark:hover:bg-zinc-700 border border-slate-200 dark:border-zinc-700 text-left transition-colors cursor-pointer"
              >
                <p className="font-bold text-[11px] text-slate-900 dark:text-white">Coach Vikalp</p>
                <p className="text-[10px] text-orange-600 dark:text-orange-400">👑 Super Admin Hub</p>
              </button>

              <button
                type="button"
                onClick={() => handleQuickDemo('MEMBER')}
                className="p-2 rounded-xl bg-slate-100 dark:bg-zinc-800 hover:bg-orange-50 dark:hover:bg-zinc-700 border border-slate-200 dark:border-zinc-700 text-left transition-colors cursor-pointer"
              >
                <p className="font-bold text-[11px] text-slate-900 dark:text-white">Aarav Sharma</p>
                <p className="text-[10px] text-blue-600 dark:text-blue-400">🥋 Adult Fighter Pass</p>
              </button>

              <button
                type="button"
                onClick={() => handleQuickDemo('PARENT')}
                className="p-2 rounded-xl bg-slate-100 dark:bg-zinc-800 hover:bg-orange-50 dark:hover:bg-zinc-700 border border-slate-200 dark:border-zinc-700 text-left transition-colors cursor-pointer"
              >
                <p className="font-bold text-[11px] text-slate-900 dark:text-white">Sanjay Patel</p>
                <p className="text-[10px] text-amber-600 dark:text-amber-400">👨‍👦 Kids Batch Parent</p>
              </button>

              <button
                type="button"
                onClick={() => handleQuickDemo('TRAINER')}
                className="p-2 rounded-xl bg-slate-100 dark:bg-zinc-800 hover:bg-orange-50 dark:hover:bg-zinc-700 border border-slate-200 dark:border-zinc-700 text-left transition-colors cursor-pointer"
              >
                <p className="font-bold text-[11px] text-slate-900 dark:text-white">Coach Rohit</p>
                <p className="text-[10px] text-emerald-600 dark:text-emerald-400">🏋️ Trainer Check-In</p>
              </button>
            </div>
          </div>

        </div>

        {/* Links to Signup & Waiver */}
        <div className="text-center space-y-2 text-xs text-slate-500 dark:text-zinc-400">
          <p>
            New to TNT MMA Academy?{' '}
            <Link href="/signup" className="text-orange-600 dark:text-orange-400 font-bold hover:underline">
              Create New Account & Register
            </Link>
          </p>
          <p>
            Need to sign the legal liability form only?{' '}
            <Link href="/waiver" className="text-slate-700 dark:text-zinc-300 font-semibold hover:underline">
              Open Digital Waiver
            </Link>
          </p>
        </div>

      </main>

      <Footer />
    </div>
  );
}
