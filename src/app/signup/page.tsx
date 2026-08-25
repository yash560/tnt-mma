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
  Lock, 
  GraduationCap, 
  ShieldCheck, 
  CheckCircle2, 
  Sparkles,
  ArrowLeft,
  AlertCircle
} from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { useAuth } from '@/context/AuthContext';
import { UserRole } from '@/lib/auth';
import confetti from 'canvas-confetti';

export default function SignupPage() {
  const router = useRouter();
  const { signupWithEmail, loginWithGoogle, user } = useAuth();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState<UserRole>('MEMBER');
  const [isMinor, setIsMinor] = useState(false);
  const [guardianName, setGuardianName] = useState('');
  const [discipline, setDiscipline] = useState('MMA');
  const [batch, setBatch] = useState('EVENING');
  const [errorMsg, setErrorMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!name || !phone || !email || !password) {
      setErrorMsg('Please fill in all required fields.');
      return;
    }

    if (password.length < 6) {
      setErrorMsg('Password must be at least 6 characters.');
      return;
    }

    if (password !== confirmPassword) {
      setErrorMsg('Passwords do not match.');
      return;
    }

    setIsLoading(true);
    const res = await signupWithEmail({
      name,
      email,
      phone,
      password,
      role: isMinor ? 'PARENT' : role,
      discipline,
      batch: isMinor ? 'KIDS' : batch,
      isMinor,
      guardianName: isMinor ? guardianName : undefined,
    });
    setIsLoading(false);

    if (res.success) {
      confetti({ particleCount: 100, spread: 80, origin: { y: 0.6 } });
      const target = role === 'ADMIN' ? '/admin' : '/portal';
      router.push(target);
    } else {
      setErrorMsg(res.error || 'Failed to create account.');
    }
  };

  const handleGoogleSignup = async () => {
    setGoogleLoading(true);
    setErrorMsg('');
    const res = await loginWithGoogle({
      name: 'Yash Jain',
      email: 'yashjain.backup.8@gmail.com',
      photoUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
    });
    setGoogleLoading(false);

    if (res.success) {
      confetti({ particleCount: 80, spread: 80 });
      router.push('/portal');
    } else {
      setErrorMsg(res.error || 'Google signup failed.');
    }
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
            Create Your Academy Account
          </h1>
          <p className="text-xs text-slate-500 dark:text-zinc-400 max-w-sm mx-auto">
            Join Bhopal’s premier combat academy. Generate your member ID and access digital passes.
          </p>
        </div>

        {/* Registration Box */}
        <div className="rounded-3xl bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 p-6 sm:p-8 shadow-xl space-y-5">
          
          {/* Google Fast Register Button */}
          <button
            type="button"
            onClick={handleGoogleSignup}
            disabled={googleLoading}
            className="w-full py-3 rounded-2xl bg-white dark:bg-zinc-950 border border-slate-200 dark:border-zinc-800 hover:border-orange-500/50 text-slate-800 dark:text-zinc-200 font-bold text-xs flex items-center justify-center gap-3 shadow-sm hover:shadow-md transition-all cursor-pointer"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z"/>
              <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24z"/>
              <path fill="#FBBC05" d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.99 0 12s.45 3.82 1.25 5.42l4.03-3.15z"/>
              <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"/>
            </svg>
            <span>{googleLoading ? 'Connecting...' : 'Sign Up with Google (1-Click)'}</span>
          </button>

          <div className="flex items-center gap-3">
            <div className="flex-1 h-px bg-slate-100 dark:bg-zinc-800" />
            <span className="text-[10px] uppercase font-bold text-slate-400">or register with email</span>
            <div className="flex-1 h-px bg-slate-100 dark:bg-zinc-800" />
          </div>

          {errorMsg && (
            <div className="p-3 rounded-xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800/60 text-red-600 dark:text-red-400 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            
            {/* Account Type Selector */}
            <div className="space-y-1">
              <label className="font-bold text-slate-700 dark:text-zinc-300">Account Type</label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => { setRole('MEMBER'); setIsMinor(false); }}
                  className={`py-2 rounded-xl font-bold transition-all ${
                    role === 'MEMBER' && !isMinor
                      ? 'bg-orange-500 text-white shadow-sm'
                      : 'bg-slate-100 dark:bg-zinc-950 text-slate-600 dark:text-zinc-400 border border-slate-200 dark:border-zinc-800'
                  }`}
                >
                  🥋 Athlete / Fighter
                </button>
                <button
                  type="button"
                  onClick={() => { setRole('ADMIN'); setIsMinor(false); }}
                  className={`py-2 rounded-xl font-bold transition-all ${
                    role === 'ADMIN'
                      ? 'bg-orange-500 text-white shadow-sm'
                      : 'bg-slate-100 dark:bg-zinc-950 text-slate-600 dark:text-zinc-400 border border-slate-200 dark:border-zinc-800'
                  }`}
                >
                  👑 Coach / Admin
                </button>
              </div>
            </div>

            {/* Minor / Kids Checkbox */}
            <div className="p-3 rounded-xl bg-orange-50 dark:bg-zinc-950 border border-orange-200 dark:border-zinc-800 flex items-center justify-between">
              <label className="flex items-center gap-2 text-slate-800 dark:text-zinc-200 font-bold cursor-pointer">
                <input
                  type="checkbox"
                  checked={isMinor}
                  onChange={(e) => {
                    setIsMinor(e.target.checked);
                    if (e.target.checked) setRole('PARENT');
                  }}
                  className="w-4 h-4 accent-orange-500 rounded"
                />
                <span>Registering on behalf of a Child (Under 18)?</span>
              </label>
            </div>

            {isMinor && (
              <div className="space-y-1">
                <label className="font-bold text-slate-700 dark:text-zinc-300">Parent / Legal Guardian Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Sanjay Patel"
                  value={guardianName}
                  onChange={(e) => setGuardianName(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-zinc-950 border border-slate-200 dark:border-zinc-800 text-slate-900 dark:text-white outline-none focus:border-orange-500"
                />
              </div>
            )}

            {/* Full Name */}
            <div className="space-y-1">
              <label className="font-bold text-slate-700 dark:text-zinc-300">
                {isMinor ? "Child's Full Name (Athlete)" : 'Full Name'}
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  required
                  placeholder={isMinor ? 'Reyansh Patel' : 'Aarav Sharma'}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 dark:bg-zinc-950 border border-slate-200 dark:border-zinc-800 text-slate-900 dark:text-white outline-none focus:border-orange-500"
                />
              </div>
            </div>

            {/* Phone & Email */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="font-bold text-slate-700 dark:text-zinc-300">Phone / WhatsApp</label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="tel"
                    required
                    placeholder="+91 98260 XXXXX"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 dark:bg-zinc-950 border border-slate-200 dark:border-zinc-800 text-slate-900 dark:text-white outline-none focus:border-orange-500"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-700 dark:text-zinc-300">Email Address</label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    required
                    placeholder="name@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 dark:bg-zinc-950 border border-slate-200 dark:border-zinc-800 text-slate-900 dark:text-white outline-none focus:border-orange-500"
                  />
                </div>
              </div>
            </div>

            {/* Password & Confirm */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="font-bold text-slate-700 dark:text-zinc-300">Create Password</label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="password"
                    required
                    placeholder="Min 6 chars"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 dark:bg-zinc-950 border border-slate-200 dark:border-zinc-800 text-slate-900 dark:text-white outline-none focus:border-orange-500"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-700 dark:text-zinc-300">Confirm Password</label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="password"
                    required
                    placeholder="Re-enter password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 dark:bg-zinc-950 border border-slate-200 dark:border-zinc-800 text-slate-900 dark:text-white outline-none focus:border-orange-500"
                  />
                </div>
              </div>
            </div>

            {/* Discipline & Batch */}
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="font-bold text-slate-700 dark:text-zinc-300">Discipline</label>
                <select
                  value={discipline}
                  onChange={(e) => setDiscipline(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-zinc-950 border border-slate-200 dark:border-zinc-800 text-slate-900 dark:text-white outline-none"
                >
                  <option value="MMA">MMA (Cage & Striking)</option>
                  <option value="BJJ">Brazilian Jiu-Jitsu</option>
                  <option value="KICKBOXING">Muay Thai Kickboxing</option>
                  <option value="CROSSFIT">CrossFit Conditioning</option>
                  <option value="KIDS_MMA">Kids Anti-Bullying</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-700 dark:text-zinc-300">Preferred Batch</label>
                <select
                  value={batch}
                  onChange={(e) => setBatch(e.target.value)}
                  disabled={isMinor}
                  className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-zinc-950 border border-slate-200 dark:border-zinc-800 text-slate-900 dark:text-white outline-none disabled:opacity-50"
                >
                  <option value="MORNING">Morning (06:00 AM)</option>
                  <option value="KIDS">Kids Batch (04:00 PM)</option>
                  <option value="EVENING">Evening (06:00 PM)</option>
                  <option value="PRO_FIGHTER">Pro Camp (07:30 PM)</option>
                </select>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white font-extrabold text-xs uppercase tracking-wider shadow-lg shadow-orange-500/25 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>{isLoading ? 'Creating Account...' : 'Complete Registration & Enter'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          <div className="text-center pt-2">
            <p className="text-xs text-slate-500 dark:text-zinc-400">
              Already have an account?{' '}
              <Link href="/login" className="text-orange-600 dark:text-orange-400 font-bold hover:underline">
                Sign In →
              </Link>
            </p>
          </div>

        </div>

      </main>

      <Footer />
    </div>
  );
}
