'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  UserCircle2, 
  Flame, 
  ArrowLeft, 
  LogOut, 
  Sparkles,
  ShieldCheck,
  Award,
  GraduationCap,
  Dumbbell
} from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import WaiverCertificateModal from '@/components/waiver/WaiverCertificateModal';
import AthleteDashboard from '@/components/portal/AthleteDashboard';
import ParentDashboard from '@/components/portal/ParentDashboard';
import TrainerDashboard from '@/components/portal/TrainerDashboard';
import { Member, WaiverDocument } from '@/lib/types';
import { getMembers, getWaiverById } from '@/lib/dataStore';
import { useAuth } from '@/context/AuthContext';
import { UserRole } from '@/lib/auth';

export default function MemberPortalPage() {
  const { user, logout, switchPersona } = useAuth();
  const [members, setMembers] = useState<Member[]>(() => getMembers());
  const [viewingWaiver, setViewingWaiver] = useState<WaiverDocument | null>(null);
  const [isWaiverModalOpen, setIsWaiverModalOpen] = useState(false);

  const refreshMembers = () => {
    setMembers(getMembers());
  };

  useEffect(() => {
    const handleSync = () => {
      setMembers(getMembers());
    };
    window.addEventListener('tnt_datastore_sync', handleSync);
    return () => window.removeEventListener('tnt_datastore_sync', handleSync);
  }, []);

  // Match active member to logged-in user or fallback to first member
  const activeMember = members.find(
    (m) => m.id === user?.memberId || m.name.toLowerCase().includes(user?.name.toLowerCase() || '')
  ) || members[0];

  const handleOpenWaiver = (waiver: any) => {
    setViewingWaiver(waiver);
    setIsWaiverModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-zinc-950 text-slate-900 dark:text-white flex flex-col justify-between selection:bg-orange-500 selection:text-white">
      <Navbar />

      <main className="flex-1 pt-28 pb-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto w-full space-y-8">
        
        {/* Top Header & Fast Role Switcher */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <Link
            href="/"
            className="text-xs text-slate-500 dark:text-zinc-400 hover:text-orange-600 dark:hover:text-orange-400 flex items-center gap-1 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Academy Site</span>
          </Link>

          {user && (
            <div className="flex flex-wrap items-center gap-3">
              {/* Persona Switcher Buttons for Quick Demo */}
              <div className="flex items-center gap-1 p-1 rounded-xl bg-slate-200/80 dark:bg-zinc-900 border border-slate-300/60 dark:border-zinc-800 text-[11px]">
                <button
                  onClick={() => switchPersona('MEMBER')}
                  className={`px-2.5 py-1 rounded-lg font-bold transition-all cursor-pointer ${
                    user.role === 'MEMBER'
                      ? 'bg-white dark:bg-zinc-800 text-orange-600 dark:text-orange-400 shadow-sm'
                      : 'text-slate-600 dark:text-zinc-400 hover:text-slate-900'
                  }`}
                  title="Switch to Fighter Persona"
                >
                  🥋 Fighter
                </button>
                <button
                  onClick={() => switchPersona('PARENT')}
                  className={`px-2.5 py-1 rounded-lg font-bold transition-all cursor-pointer ${
                    user.role === 'PARENT'
                      ? 'bg-white dark:bg-zinc-800 text-orange-600 dark:text-orange-400 shadow-sm'
                      : 'text-slate-600 dark:text-zinc-400 hover:text-slate-900'
                  }`}
                  title="Switch to Parent Persona"
                >
                  👨‍👦 Parent
                </button>
                <button
                  onClick={() => switchPersona('TRAINER')}
                  className={`px-2.5 py-1 rounded-lg font-bold transition-all cursor-pointer ${
                    user.role === 'TRAINER'
                      ? 'bg-white dark:bg-zinc-800 text-orange-600 dark:text-orange-400 shadow-sm'
                      : 'text-slate-600 dark:text-zinc-400 hover:text-slate-900'
                  }`}
                  title="Switch to Trainer Persona"
                >
                  🏋️ Trainer
                </button>
                <Link
                  href="/admin"
                  className="px-2.5 py-1 rounded-lg font-bold text-slate-600 dark:text-zinc-400 hover:text-orange-600"
                  title="Switch to Super Admin Hub"
                >
                  👑 Admin Hub
                </Link>
              </div>

              <button
                onClick={logout}
                className="px-3 py-1.5 rounded-xl bg-slate-200 dark:bg-zinc-800 text-slate-700 dark:text-zinc-300 hover:text-red-600 font-bold text-xs flex items-center gap-1 transition-colors cursor-pointer"
                title="Sign Out"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Sign Out</span>
              </button>
            </div>
          )}
        </div>

        {!user ? (
          /* Sign In Gate */
          <div className="max-w-md mx-auto my-12 p-8 rounded-3xl bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 shadow-2xl text-center space-y-6">
            <div className="w-14 h-14 rounded-2xl bg-orange-100 dark:bg-orange-950/60 border border-orange-200 dark:border-orange-500/40 text-orange-600 dark:text-orange-400 flex items-center justify-center mx-auto">
              <UserCircle2 className="w-7 h-7" />
            </div>

            <div className="space-y-1">
              <h2 className="text-2xl font-black text-slate-900 dark:text-white">
                TNT Academy Access Portal
              </h2>
              <p className="text-xs text-slate-500 dark:text-zinc-400">
                Access your training schedule, digital fighter pass, belt rank grading, and fee invoices.
              </p>
            </div>

            <div className="space-y-3 pt-2">
              <button
                onClick={() => switchPersona('MEMBER')}
                className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white font-extrabold text-xs uppercase tracking-wider shadow-lg shadow-orange-500/25 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>⚡ 1-Click Login: Aarav Sharma (Fighter Dashboard)</span>
              </button>

              <button
                onClick={() => switchPersona('PARENT')}
                className="w-full py-3 rounded-2xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer"
              >
                <span>⚡ 1-Click Login: Sanjay Patel (Parent of Reyansh)</span>
              </button>

              <button
                onClick={() => switchPersona('TRAINER')}
                className="w-full py-3 rounded-2xl bg-slate-900 dark:bg-zinc-800 hover:bg-slate-800 text-white font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer"
              >
                <span>⚡ 1-Click Login: Coach Rohit (Trainer Hub)</span>
              </button>

              <Link
                href="/login"
                className="block w-full py-2.5 rounded-2xl bg-slate-100 dark:bg-zinc-800 hover:bg-slate-200 dark:hover:bg-zinc-700 text-slate-800 dark:text-zinc-200 font-bold text-xs transition-colors"
              >
                Sign In with Custom Email & Password →
              </Link>
            </div>
          </div>
        ) : (
          /* Role-Specific Dashboard Views */
          <div className="space-y-8">
            
            {/* Top Athlete / User Banner Card */}
            <div className="rounded-3xl bg-white dark:bg-gradient-to-r dark:from-zinc-900 dark:via-zinc-900 dark:to-orange-950/30 border border-slate-200 dark:border-zinc-800 p-6 sm:p-8 flex flex-col md:flex-row items-center md:items-start justify-between gap-6 shadow-xl">
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 text-center sm:text-left">
                <div className="w-20 h-20 rounded-2xl overflow-hidden border-2 border-orange-500 shadow-xl shrink-0">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={user.avatarUrl || activeMember.avatarUrl}
                    alt={user.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="space-y-1.5">
                  <div className="flex items-center justify-center sm:justify-start gap-2 flex-wrap">
                    <h1 className="text-2xl font-black text-slate-900 dark:text-white">{user.name}</h1>
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-orange-100 dark:bg-orange-500/20 text-orange-600 dark:text-orange-400 border border-orange-200 dark:border-orange-500/30">
                      {user.role} DASHBOARD
                    </span>
                  </div>

                  <p className="text-xs text-orange-600 dark:text-orange-400 font-mono font-bold">
                    {user.beltRank || activeMember.beltRank}
                  </p>

                  <div className="flex items-center justify-center sm:justify-start gap-4 text-xs text-slate-500 dark:text-zinc-400 pt-1">
                    <span>Phone: <strong className="text-slate-800 dark:text-zinc-200">{user.phone}</strong></span>
                    <span>Discipline: <strong className="text-orange-600 dark:text-orange-400">{user.discipline || activeMember.discipline}</strong></span>
                  </div>
                </div>
              </div>

              {/* Status Pill */}
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-zinc-950 border border-slate-200 dark:border-zinc-800 text-center space-y-1 min-w-[170px]">
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase border bg-green-100 dark:bg-green-500/10 text-green-700 dark:text-green-400 border-green-200 dark:border-green-500/30">
                  ● ACTIVE STATUS
                </span>
                <p className="text-xl font-black text-slate-900 dark:text-white">
                  {user.role === 'MEMBER' && `${activeMember.attendanceStreak} Day Streak`}
                  {user.role === 'PARENT' && 'Kids Batch (4 PM)'}
                  {user.role === 'TRAINER' && 'On Mat Today'}
                </p>
                <p className="text-[10px] text-slate-400 dark:text-zinc-500">Live Academy Synced</p>
              </div>
            </div>

            {/* Render Role-Specific Component */}
            {user.role === 'MEMBER' && (
              <AthleteDashboard
                member={activeMember}
                onOpenWaiverModal={handleOpenWaiver}
                onRefreshMember={refreshMembers}
              />
            )}

            {user.role === 'PARENT' && (
              <ParentDashboard
                member={activeMember}
                onOpenWaiverModal={handleOpenWaiver}
                onRefreshMember={refreshMembers}
              />
            )}

            {user.role === 'TRAINER' && (
              <TrainerDashboard
                onRefresh={refreshMembers}
              />
            )}

            {user.role === 'ADMIN' && (
              <div className="p-8 rounded-3xl bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 text-center space-y-4 shadow-xl">
                <ShieldCheck className="w-12 h-12 text-orange-500 mx-auto" />
                <h2 className="text-2xl font-black text-slate-900 dark:text-white">
                  Super Admin Management Engine
                </h2>
                <p className="text-xs text-slate-500 dark:text-zinc-400 max-w-md mx-auto">
                  Access the full CRM directory, fee ledger, GST invoicing, broadcast messaging, and frontdesk scanner.
                </p>
                <Link
                  href="/admin"
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-gradient-to-r from-orange-500 to-red-600 text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-orange-500/25"
                >
                  <span>Open Full Admin Command Hub →</span>
                </Link>
              </div>
            )}

          </div>
        )}

      </main>

      {/* Certificate Modal */}
      <WaiverCertificateModal
        waiver={viewingWaiver}
        isOpen={isWaiverModalOpen}
        onClose={() => setIsWaiverModalOpen(false)}
      />

      <Footer />
    </div>
  );
}
