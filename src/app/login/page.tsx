'use client';

import React, { useState, useEffect } from 'react';
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
  ArrowLeft,
  AlertCircle
} from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { useAuth } from '@/context/AuthContext';
import { UserRole, DEMO_ACCOUNTS } from '@/lib/auth';
import confetti from 'canvas-confetti';

export default function LoginPage() {
  const router = useRouter();
  const { loginWithEmail, loginWithGoogle, switchPersona, user, logout } = useAuth();
  
  const [email, setEmail] = useState('aarav.sharma@gmail.com');
  const [password, setPassword] = useState('fighter123');
  const [errorMsg, setErrorMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  // If already logged in, allow instant redirection
  const isAlreadyLoggedIn = !!user;

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setIsLoading(true);

    const res = await loginWithEmail(email, password);
    setIsLoading(false);

    if (res.success) {
      confetti({ particleCount: 70, origin: { y: 0.6 } });
      const target = email.includes('admin') || email.includes('vikalp') ? '/admin' : '/portal';
      router.push(target);
    } else {
      setErrorMsg(res.error || 'Authentication failed. Please check credentials.');
    }
  };

  const handleGoogleLogin = async () => {
    setGoogleLoading(true);
    setErrorMsg('');
    
    // Call Google OAuth login
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
      setErrorMsg(res.error || 'Google login failed.');
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

      <main className="flex-1 pt-28 pb-20 px-4 sm:px-6 lg:px-8 max-w-md mx-auto w-full space-y-6">
        
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
            TNT MMA Universal Sign In
          </h1>
          <p className="text-xs text-slate-500 dark:text-zinc-400 max-w-sm mx-auto">
            Sign in with your email or Google account to access your digital fighter pass or admin hub.
          </p>
        </div>

        {/* If Already Logged In */}
        {isAlreadyLoggedIn && (
          <div className="p-5 rounded-3xl bg-white dark:bg-zinc-900 border-2 border-orange-500/50 shadow-xl text-center space-y-4">
            <div className="flex items-center justify-center gap-3">
              <img
                src={user.avatarUrl}
                alt={user.name}
                className="w-12 h-12 rounded-full object-cover border-2 border-orange-500"
              />
              <div className="text-left">
                <p className="text-sm font-bold text-slate-900 dark:text-white">{user.name}</p>
                <p className="text-xs text-slate-500 dark:text-zinc-400">{user.email} ({user.role})</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <Link
                href={user.role === 'ADMIN' || user.role === 'TRAINER' ? '/admin' : '/portal'}
                className="py-2.5 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs uppercase tracking-wider text-center"
              >
                Go to Dashboard
              </Link>
              <button
                onClick={logout}
                className="py-2.5 rounded-xl bg-slate-100 dark:bg-zinc-800 text-slate-700 dark:text-zinc-300 font-bold text-xs hover:bg-red-50 hover:text-red-600"
              >
                Switch Account
              </button>
            </div>
          </div>
        )}

        {/* Main Sign In Card */}
        <div className="rounded-3xl bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 p-6 sm:p-8 space-y-5 shadow-xl">
          
          {/* Google Login Button */}
          <button
            type="button"
            onClick={handleGoogleLogin}
            disabled={googleLoading}
            className="w-full py-3 rounded-2xl bg-white dark:bg-zinc-950 border border-slate-200 dark:border-zinc-800 hover:border-orange-500/50 text-slate-800 dark:text-zinc-200 font-bold text-xs flex items-center justify-center gap-3 shadow-sm hover:shadow-md transition-all cursor-pointer"
          >
            {/* Google Multicolored Icon */}
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z"/>
              <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24z"/>
              <path fill="#FBBC05" d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.99 0 12s.45 3.82 1.25 5.42l4.03-3.15z"/>
              <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"/>
            </svg>
            <span>{googleLoading ? 'Connecting to Google...' : 'Continue with Google'}</span>
          </button>

          <div className="flex items-center gap-3">
            <div className="flex-1 h-px bg-slate-100 dark:bg-zinc-800" />
            <span className="text-[10px] uppercase font-bold text-slate-400">or sign in with email</span>
            <div className="flex-1 h-px bg-slate-100 dark:bg-zinc-800" />
          </div>

          {errorMsg && (
            <div className="p-3 rounded-xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800/60 text-red-600 dark:text-red-400 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Email / Password Form */}
          <form onSubmit={handleEmailLogin} className="space-y-4 text-xs">
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

            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <label className="font-bold text-slate-700 dark:text-zinc-300">Password</label>
                <Link
                  href="/forgot-password"
                  className="text-[11px] text-orange-600 dark:text-orange-400 hover:underline font-semibold"
                >
                  Forgot Password?
                </Link>
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 dark:bg-zinc-950 border border-slate-200 dark:border-zinc-800 text-slate-900 dark:text-white outline-none focus:border-orange-500"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white font-extrabold text-xs uppercase tracking-wider shadow-lg shadow-orange-500/25 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>{isLoading ? 'Authenticating...' : 'Sign In'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Quick Demo Personas */}
          <div className="space-y-2 pt-3 border-t border-slate-100 dark:border-zinc-800">
            <p className="text-[10px] uppercase font-bold text-slate-400 text-center">
              ⚡ Instant 1-Click Demo Accounts:
            </p>
            <div className="grid grid-cols-3 gap-1.5 text-[10px]">
              <button
                type="button"
                onClick={() => {
                  setEmail('vikalp@tntmma.com');
                  setPassword('admin123');
                  handleQuickDemo('ADMIN');
                }}
                className="p-2 rounded-xl bg-slate-100 dark:bg-zinc-950 border border-slate-200 dark:border-zinc-800 hover:border-orange-500 font-bold text-slate-800 dark:text-zinc-200 text-center cursor-pointer"
              >
                👑 Coach Vikalp (Admin)
              </button>

              <button
                type="button"
                onClick={() => {
                  setEmail('aarav.sharma@gmail.com');
                  setPassword('fighter123');
                  handleQuickDemo('MEMBER');
                }}
                className="p-2 rounded-xl bg-slate-100 dark:bg-zinc-950 border border-slate-200 dark:border-zinc-800 hover:border-orange-500 font-bold text-slate-800 dark:text-zinc-200 text-center cursor-pointer"
              >
                🥋 Aarav (Fighter)
              </button>

              <button
                type="button"
                onClick={() => {
                  setEmail('sanjay.patel@gmail.com');
                  setPassword('parent123');
                  handleQuickDemo('PARENT');
                }}
                className="p-2 rounded-xl bg-slate-100 dark:bg-zinc-950 border border-slate-200 dark:border-zinc-800 hover:border-orange-500 font-bold text-slate-800 dark:text-zinc-200 text-center cursor-pointer"
              >
                👨‍👦 Sanjay (Parent)
              </button>
            </div>
          </div>

          <div className="text-center pt-2">
            <p className="text-xs text-slate-500 dark:text-zinc-400">
              Don&apos;t have an account yet?{' '}
              <Link href="/signup" className="text-orange-600 dark:text-orange-400 font-bold hover:underline">
                Register as Member →
              </Link>
            </p>
          </div>

        </div>

      </main>

      <Footer />
    </div>
  );
}
