'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Users, 
  DollarSign, 
  AlertTriangle, 
  CheckCircle2, 
  Scan, 
  Megaphone, 
  Award, 
  UserPlus, 
  Flame, 
  ArrowLeft, 
  RotateCcw,
  ShieldCheck,
  TrendingUp,
  FileSignature
} from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import MemberDirectory from '@/components/admin/MemberDirectory';
import NewMemberModal from '@/components/admin/NewMemberModal';
import FeeLedgerModal from '@/components/admin/FeeLedgerModal';
import BroadcastCenter from '@/components/admin/BroadcastCenter';
import BeltTrackerModal from '@/components/admin/BeltTrackerModal';
import AttendanceScanner from '@/components/admin/AttendanceScanner';
import { getMembers, getTransactions, getWaivers, getAttendanceRecords, resetToDefaults } from '@/lib/dataStore';

export default function AdminHubPage() {
  const [members, setMembers] = useState(() => getMembers());
  const [transactions, setTransactions] = useState(() => getTransactions());
  const [waivers, setWaivers] = useState(() => getWaivers());
  const [attendance, setAttendance] = useState(() => getAttendanceRecords());

  // Modal controls
  const [isNewMemberOpen, setIsNewMemberOpen] = useState(false);
  const [isFeeLedgerOpen, setIsFeeLedgerOpen] = useState(false);
  const [isBroadcastOpen, setIsBroadcastOpen] = useState(false);
  const [isBeltTrackerOpen, setIsBeltTrackerOpen] = useState(false);
  const [isAttendanceOpen, setIsAttendanceOpen] = useState(false);

  const refreshAll = () => {
    setMembers(getMembers());
    setTransactions(getTransactions());
    setWaivers(getWaivers());
    setAttendance(getAttendanceRecords());
  };

  const handleResetData = () => {
    if (confirm('Reset TNT MMA database to official Bhopal mock dataset?')) {
      resetToDefaults();
      refreshAll();
    }
  };

  // Compute metrics
  const activeMembersCount = members.filter((m) => m.status === 'ACTIVE').length;
  const overdueMembers = members.filter((m) => m.status === 'EXPIRED' || m.balanceDue > 0);
  const totalRevenue = transactions.reduce((acc, t) => acc + (t.status === 'PAID' ? t.totalAmount : 0), 0);
  const totalDueAmount = members.reduce((acc, m) => acc + m.balanceDue, 0);

  return (
    <div className="min-h-screen bg-zinc-950 text-white flex flex-col justify-between selection:bg-orange-500 selection:text-white">
      <Navbar />

      <main className="flex-1 pt-28 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full space-y-8">
        
        {/* Top Breadcrumb & Reset Button */}
        <div className="flex items-center justify-between">
          <Link
            href="/"
            className="text-xs text-zinc-400 hover:text-orange-400 flex items-center gap-1 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Public Academy Site</span>
          </Link>

          <div className="flex items-center gap-3">
            <button
              onClick={handleResetData}
              className="text-xs text-zinc-400 hover:text-orange-400 flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-zinc-900 border border-zinc-800 hover:bg-zinc-800 transition-colors cursor-pointer"
              title="Reset test data"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reseed Demo Data</span>
            </button>
            <span className="px-3 py-1 rounded-full bg-amber-500/10 text-amber-400 text-xs font-bold border border-amber-500/30">
              👑 Head Coach / Super Admin
            </span>
          </div>
        </div>

        {/* Dashboard Title & Quick Actions */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/30 text-orange-400 text-xs font-bold uppercase tracking-wider">
              <ShieldCheck className="w-3.5 h-3.5" />
              TNT Academy Operations OS
            </div>
            <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
              Admin Command & CRM Hub
            </h1>
            <p className="text-xs sm:text-sm text-zinc-400">
              Live management overview for Coach Vikalp & front-desk operations across Bhopal facilities.
            </p>
          </div>

          {/* Quick Action Button Cluster */}
          <div className="flex flex-wrap items-center gap-2.5">
            <button
              onClick={() => setIsNewMemberOpen(true)}
              className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-orange-500/20 flex items-center gap-1.5 cursor-pointer"
            >
              <UserPlus className="w-4 h-4" />
              <span>+ New Admission</span>
            </button>

            <button
              onClick={() => setIsAttendanceOpen(true)}
              className="px-4 py-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-200 border border-zinc-700 font-bold text-xs flex items-center gap-1.5 cursor-pointer"
            >
              <Scan className="w-4 h-4 text-orange-400" />
              <span>Mat Check-In</span>
            </button>

            <button
              onClick={() => setIsFeeLedgerOpen(true)}
              className="px-4 py-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-200 border border-zinc-700 font-bold text-xs flex items-center gap-1.5 cursor-pointer"
            >
              <DollarSign className="w-4 h-4 text-green-400" />
              <span>Fee Ledger & Invoices</span>
            </button>

            <button
              onClick={() => setIsBroadcastOpen(true)}
              className="px-4 py-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-200 border border-zinc-700 font-bold text-xs flex items-center gap-1.5 cursor-pointer"
            >
              <Megaphone className="w-4 h-4 text-amber-400" />
              <span>Broadcast Notice</span>
            </button>

            <button
              onClick={() => setIsBeltTrackerOpen(true)}
              className="px-4 py-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-200 border border-zinc-700 font-bold text-xs flex items-center gap-1.5 cursor-pointer"
            >
              <Award className="w-4 h-4 text-blue-400" />
              <span>Belt Grading</span>
            </button>
          </div>
        </div>

        {/* 6 Executive KPI Metric Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          
          <div className="rounded-2xl bg-zinc-900/80 border border-zinc-800 p-4 space-y-1">
            <div className="flex items-center justify-between text-zinc-400">
              <span className="text-[11px] font-bold uppercase">Active Fighters</span>
              <Users className="w-4 h-4 text-orange-400" />
            </div>
            <p className="text-2xl font-black text-white">{activeMembersCount}</p>
            <p className="text-[10px] text-zinc-500">{members.length} total enrolled</p>
          </div>

          <div className="rounded-2xl bg-zinc-900/80 border border-zinc-800 p-4 space-y-1">
            <div className="flex items-center justify-between text-zinc-400">
              <span className="text-[11px] font-bold uppercase">Total Revenue</span>
              <DollarSign className="w-4 h-4 text-green-400" />
            </div>
            <p className="text-2xl font-black text-green-400">₹{(totalRevenue / 1000).toFixed(1)}k</p>
            <p className="text-[10px] text-zinc-500">Collected in full</p>
          </div>

          <div className="rounded-2xl bg-zinc-900/80 border border-zinc-800 p-4 space-y-1">
            <div className="flex items-center justify-between text-zinc-400">
              <span className="text-[11px] font-bold uppercase">Pending Dues</span>
              <AlertTriangle className="w-4 h-4 text-amber-400" />
            </div>
            <p className="text-2xl font-black text-amber-400">₹{totalDueAmount.toLocaleString('en-IN')}</p>
            <p className="text-[10px] text-zinc-500">{overdueMembers.length} members pending</p>
          </div>

          <div className="rounded-2xl bg-zinc-900/80 border border-zinc-800 p-4 space-y-1">
            <div className="flex items-center justify-between text-zinc-400">
              <span className="text-[11px] font-bold uppercase">Signed Waivers</span>
              <FileSignature className="w-4 h-4 text-blue-400" />
            </div>
            <p className="text-2xl font-black text-white">{waivers.length}</p>
            <p className="text-[10px] text-zinc-500">100% digitally verified</p>
          </div>

          <div className="rounded-2xl bg-zinc-900/80 border border-zinc-800 p-4 space-y-1">
            <div className="flex items-center justify-between text-zinc-400">
              <span className="text-[11px] font-bold uppercase">Check-Ins Today</span>
              <Scan className="w-4 h-4 text-purple-400" />
            </div>
            <p className="text-2xl font-black text-white">{attendance.length}</p>
            <p className="text-[10px] text-zinc-500">Mat sessions recorded</p>
          </div>

          <div className="rounded-2xl bg-zinc-900/80 border border-zinc-800 p-4 space-y-1">
            <div className="flex items-center justify-between text-zinc-400">
              <span className="text-[11px] font-bold uppercase">Rating</span>
              <ShieldCheck className="w-4 h-4 text-amber-400" />
            </div>
            <p className="text-2xl font-black text-amber-400">4.9 ★</p>
            <p className="text-[10px] text-zinc-500">Bhopal #1 Combat Gym</p>
          </div>

        </div>

        {/* Master Member Directory */}
        <div className="space-y-4 pt-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-black text-white">
              Student & Athlete CRM Directory
            </h2>
            <span className="text-xs text-zinc-400">
              Showing {members.length} registered members
            </span>
          </div>

          <MemberDirectory onUpdate={refreshAll} />
        </div>

      </main>

      {/* Modals */}
      <NewMemberModal
        isOpen={isNewMemberOpen}
        onClose={() => setIsNewMemberOpen(false)}
        onMemberAdded={refreshAll}
      />

      <FeeLedgerModal
        isOpen={isFeeLedgerOpen}
        onClose={() => setIsFeeLedgerOpen(false)}
        onUpdate={refreshAll}
      />

      <BroadcastCenter
        isOpen={isBroadcastOpen}
        onClose={() => setIsBroadcastOpen(false)}
      />

      <BeltTrackerModal
        isOpen={isBeltTrackerOpen}
        onClose={() => setIsBeltTrackerOpen(false)}
        onUpdate={refreshAll}
      />

      <AttendanceScanner
        isOpen={isAttendanceOpen}
        onClose={() => setIsAttendanceOpen(false)}
        onUpdate={refreshAll}
      />

      <Footer />
    </div>
  );
}
