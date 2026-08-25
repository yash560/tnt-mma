'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  UserPlus, 
  Flame, 
  ArrowRight, 
  Mail, 
  Phone, 
  User, 
  GraduationCap, 
  ShieldCheck, 
  CheckCircle2, 
  Sparkles,
  ArrowLeft
} from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { useAuth } from '@/context/AuthContext';
import confetti from 'canvas-confetti';

export default function SignupPage() {
  const router = useRouter();
  const { signup } = useAuth();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [isMinor, setIsMinor] = useState(false);
  const [discipline, setDiscipline] = useState('MMA');
  const [batch, setBatch] = useState('EVENING');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone) return;

    setIsLoading(true);
    await signup({
      name,
      email: email || `${name.toLowerCase().replace(/\s+/g, '')}@gmail.com`,
      phone,
      role: isMinor ? 'PARENT' : 'MEMBER',
      isMinor,
      discipline,
      batch: isMinor ? 'KIDS' : batch,
    });

    confetti({ particleCount: 100, spread: 80, origin: { y: 0.6 } });
    setIsLoading(false);
    router.push('/portal');
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-zinc-950 text-slate-900 dark:text-white flex flex-col justify-between selection:bg-orange-500 selection:text-white">
      <Navbar />

      <main className="flex-1 pt-28 pb-20 px-4 sm:px-6 lg:px-8 max-w-lg mx-auto w-full space-y-6">
        
        {/* Top Breadcrumb */}
        <Link
          href="/login"
          className="text-xs text-slate-500 dark:text-zinc-400 hover:text-orange-600 dark:hover:text-orange-400 flex items-center gap-1 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Sign In</span>
        </Link>

        {/* Header */}
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center mx-auto shadow-lg shadow-orange-500/20">
            <UserPlus className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-900 dark:text-white">
            Create Your Fighter Account
          </h1>
          <p className="text-xs text-slate-500 dark:text-zinc-400 max-w-sm mx-auto">
            Join Bhopal’s premier combat academy. Generate your member ID and access digital passes.
          </p>
        </div>

        {/* Registration Box */}
        <div className="rounded-3xl bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 p-6 sm:p-8 shadow-xl space-y-6">
          
          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            
            {/* Minor / Kids Student Checkbox */}
            <div className="p-3 rounded-xl bg-orange-50 dark:bg-zinc-950 border border-orange-200 dark:border-zinc-800 flex items-center justify-between">
              <label className="flex items-center gap-2 text-slate-800 dark:text-zinc-200 font-bold cursor-pointer">
                <input
                  type="checkbox"
                  checked={isMinor}
                  onChange={(e) => setIsMinor(e.target.checked)}
                  className="w-4 h-4 accent-orange-500 rounded"
                />
                <span>Registering on behalf of a child (Under 18)?</span>
              </label>
              {isMinor && (
                <span className="text-[10px] font-bold text-orange-600 dark:text-orange-400 uppercase bg-orange-100 dark:bg-orange-950/60 px-2 py-0.5 rounded">
                  Kids Batch
                </span>
              )}
            </div>

            <div className="space-y-1.5">
              <label className="font-bold text-slate-700 dark:text-zinc-300">
                {isMinor ? "Child's Full Name *" : "Full Legal Name *"}
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
                <input
                  type="text"
                  required
                  placeholder="e.g. Rahul Sharma"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full pl-9 pr-4 py-3 rounded-xl bg-slate-50 dark:bg-zinc-950 border border-slate-200 dark:border-zinc-800 focus:border-orange-500 text-slate-900 dark:text-white outline-none"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="font-bold text-slate-700 dark:text-zinc-300">WhatsApp / Mobile Number *</label>
              <div className="relative">
                <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
                <input
                  type="tel"
                  required
                  placeholder="+91 98260 XXXXX"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full pl-9 pr-4 py-3 rounded-xl bg-slate-50 dark:bg-zinc-950 border border-slate-200 dark:border-zinc-800 focus:border-orange-500 text-slate-900 dark:text-white outline-none"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="font-bold text-slate-700 dark:text-zinc-300">Email Address (Optional)</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
                <input
                  type="email"
                  placeholder="name@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-9 pr-4 py-3 rounded-xl bg-slate-50 dark:bg-zinc-950 border border-slate-200 dark:border-zinc-800 focus:border-orange-500 text-slate-900 dark:text-white outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="font-bold text-slate-700 dark:text-zinc-300">Discipline</label>
                <select
                  value={discipline}
                  onChange={(e) => setDiscipline(e.target.value)}
                  className="w-full px-3 py-3 rounded-xl bg-slate-50 dark:bg-zinc-950 border border-slate-200 dark:border-zinc-800 focus:border-orange-500 text-slate-900 dark:text-white outline-none"
                >
                  <option value="MMA">Mixed Martial Arts</option>
                  <option value="BJJ">Brazilian Jiu-Jitsu</option>
                  <option value="KICKBOXING">Muay Thai Kickboxing</option>
                  <option value="CROSSFIT">CrossFit & Rig</option>
                  <option value="CALISTHENICS">Calisthenics</option>
                  <option value="KIDS_MMA">Kids MMA</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="font-bold text-slate-700 dark:text-zinc-300">Preferred Slot</label>
                <select
                  value={batch}
                  onChange={(e) => setBatch(e.target.value)}
                  className="w-full px-3 py-3 rounded-xl bg-slate-50 dark:bg-zinc-950 border border-slate-200 dark:border-zinc-800 focus:border-orange-500 text-slate-900 dark:text-white outline-none"
                >
                  <option value="MORNING">Morning (06:00 - 10:00 AM)</option>
                  <option value="EVENING">Evening (05:00 - 10:00 PM)</option>
                  <option value="KIDS">Kids Batch (04:00 - 05:30 PM)</option>
                  <option value="PRO_FIGHTER">Pro Fighter Camp</option>
                </select>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-4 rounded-xl bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white font-extrabold text-xs uppercase tracking-wider shadow-lg shadow-orange-500/25 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>{isLoading ? 'Creating Account...' : 'Complete Registration & Open Portal'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

        </div>

        <div className="text-center text-xs text-slate-500 dark:text-zinc-400">
          Already registered?{' '}
          <Link href="/login" className="text-orange-600 dark:text-orange-400 font-bold hover:underline">
            Sign In Here
          </Link>
        </div>

      </main>

      <Footer />
    </div>
  );
}
