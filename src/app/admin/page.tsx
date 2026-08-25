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
  FileSignature,
  Lock,
  ArrowRight,
  LogOut,
  UserCheck,
  Building2,
  TrendingDown,
  Utensils,
  Download,
  CalendarDays,
  Sparkles
} from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import MemberDirectory from '@/components/admin/MemberDirectory';
import NewMemberModal from '@/components/admin/NewMemberModal';
import FeeLedgerModal from '@/components/admin/FeeLedgerModal';
import BroadcastCenter from '@/components/admin/BroadcastCenter';
import BeltTrackerModal from '@/components/admin/BeltTrackerModal';
import AttendanceScanner from '@/components/admin/AttendanceScanner';
import EnquiryLeadManager from '@/components/admin/EnquiryLeadManager';
import ExpenseLedgerManager from '@/components/admin/ExpenseLedgerManager';
import StaffPayrollManager from '@/components/admin/StaffPayrollManager';
import DietWorkoutManager from '@/components/admin/DietWorkoutManager';
import { 
  getMembers, 
  getTransactions, 
  getWaivers, 
  getAttendanceRecords, 
  getGymExpenses, 
  getEnquiryLeads, 
  getStaffMembers, 
  resetToDefaults, 
  generateCSV 
} from '@/lib/dataStore';
import { useAuth } from '@/context/AuthContext';

export default function AdminHubPage() {
  const { user, switchPersona, logout } = useAuth();
  
  const [activeTab, setActiveTab] = useState<'MEMBERS' | 'LEADS' | 'EXPENSES' | 'STAFF' | 'DIET_WORKOUT' | 'BROADCAST' | 'ATTENDANCE'>('MEMBERS');
  const [members, setMembers] = useState(() => getMembers());
  const [transactions, setTransactions] = useState(() => getTransactions());
  const [waivers, setWaivers] = useState(() => getWaivers());
  const [attendance, setAttendance] = useState(() => getAttendanceRecords());
  const [expenses, setExpenses] = useState(() => getGymExpenses());
  const [leads, setLeads] = useState(() => getEnquiryLeads());
  const [staff, setStaff] = useState(() => getStaffMembers());

  // Modal controls
  const [isNewMemberOpen, setIsNewMemberOpen] = useState(false);
  const [isFeeLedgerOpen, setIsFeeLedgerOpen] = useState(false);
  const [isBeltTrackerOpen, setIsBeltTrackerOpen] = useState(false);

  const refreshAll = () => {
    setMembers(getMembers());
    setTransactions(getTransactions());
    setWaivers(getWaivers());
    setAttendance(getAttendanceRecords());
    setExpenses(getGymExpenses());
    setLeads(getEnquiryLeads());
    setStaff(getStaffMembers());
  };

  useEffect(() => {
    const handleSync = () => refreshAll();
    window.addEventListener('tnt_datastore_sync', handleSync);
    return () => window.removeEventListener('tnt_datastore_sync', handleSync);
  }, []);

  const handleResetData = () => {
    if (confirm('Reset TNT MMA database to official Bhopal mock dataset?')) {
      resetToDefaults();
      refreshAll();
    }
  };

  const handleDownloadMembersCSV = () => {
    const csvData = generateCSV('MEMBERS');
    const blob = new Blob([csvData], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `TNT_MMA_Members_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
  };

  // Auth Guard
  const isAuthorized = user && (user.role === 'ADMIN' || user.role === 'TRAINER');

  // Compute metrics
  const activeMembersCount = members.filter((m) => m.status === 'ACTIVE').length;
  const overdueMembers = members.filter((m) => m.status === 'EXPIRED' || m.balanceDue > 0);
  const totalRevenue = transactions.reduce((acc, t) => acc + (t.status === 'PAID' ? t.totalAmount : 0), 0);
  const totalDueAmount = members.reduce((acc, m) => acc + m.balanceDue, 0);
  const totalExpenses = expenses.reduce((acc, e) => acc + e.amount, 0);
  const hotLeadsCount = leads.filter(l => l.status === 'HOT').length;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-zinc-950 text-slate-900 dark:text-white flex flex-col justify-between selection:bg-orange-500 selection:text-white">
      <Navbar />

      <main className="flex-1 pt-28 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full space-y-8">
        
        {/* Top Breadcrumb & Actions */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <Link
            href="/"
            className="text-xs text-slate-500 dark:text-zinc-400 hover:text-orange-600 dark:hover:text-orange-400 flex items-center gap-1 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Academy Site</span>
          </Link>

          <div className="flex flex-wrap items-center gap-3">
            {/* Quick Export CSV */}
            <button
              onClick={handleDownloadMembersCSV}
              className="px-3.5 py-1.5 rounded-xl bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 hover:bg-slate-100 text-slate-700 dark:text-zinc-300 font-bold text-xs flex items-center gap-1.5 shadow-sm transition-colors cursor-pointer"
              title="Export Members CSV"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export CSV</span>
            </button>

            {/* Persona Switcher Buttons */}
            {user && (
              <div className="flex items-center gap-1 p-1 rounded-xl bg-slate-200/80 dark:bg-zinc-900 border border-slate-300/60 dark:border-zinc-800 text-[11px]">
                <button
                  onClick={() => switchPersona('MEMBER')}
                  className="px-2.5 py-1 rounded-lg font-bold text-slate-600 dark:text-zinc-400 hover:text-slate-900"
                  title="Switch to Fighter Persona"
                >
                  🥋 Fighter
                </button>
                <button
                  onClick={() => switchPersona('PARENT')}
                  className="px-2.5 py-1 rounded-lg font-bold text-slate-600 dark:text-zinc-400 hover:text-slate-900"
                  title="Switch to Parent Persona"
                >
                  👨‍👦 Parent
                </button>
                <button
                  onClick={() => switchPersona('TRAINER')}
                  className={`px-2.5 py-1 rounded-lg font-bold ${user.role === 'TRAINER' ? 'bg-white dark:bg-zinc-800 text-orange-600' : 'text-slate-600 dark:text-zinc-400'}`}
                  title="Switch to Trainer Persona"
                >
                  🏋️ Trainer
                </button>
                <button
                  onClick={() => switchPersona('ADMIN')}
                  className={`px-2.5 py-1 rounded-lg font-bold ${user.role === 'ADMIN' ? 'bg-white dark:bg-zinc-800 text-orange-600 shadow-sm' : 'text-slate-600 dark:text-zinc-400'}`}
                  title="Switch to Super Admin Hub"
                >
                  👑 Admin
                </button>
              </div>
            )}

            <button
              onClick={handleResetData}
              className="px-3.5 py-1.5 rounded-xl bg-slate-200 dark:bg-zinc-900 hover:bg-orange-50 dark:hover:bg-zinc-800 text-slate-600 dark:text-zinc-400 hover:text-orange-600 font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
              title="Reset mock store to defaults"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Data</span>
            </button>
          </div>
        </div>

        {!isAuthorized ? (
          /* Auth Lock Card */
          <div className="max-w-md mx-auto my-12 p-8 rounded-3xl bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 shadow-2xl text-center space-y-6">
            <div className="w-14 h-14 rounded-2xl bg-orange-100 dark:bg-orange-950/60 border border-orange-200 dark:border-orange-500/40 text-orange-600 dark:text-orange-400 flex items-center justify-center mx-auto">
              <Lock className="w-7 h-7" />
            </div>

            <div className="space-y-1">
              <h2 className="text-2xl font-black text-slate-900 dark:text-white">
                Admin Command Access
              </h2>
              <p className="text-xs text-slate-500 dark:text-zinc-400">
                You must be authenticated as Coach Vikalp (Super Admin) or Coach Rohit to access the operational command center.
              </p>
            </div>

            <div className="space-y-3 pt-2">
              <button
                onClick={() => switchPersona('ADMIN')}
                className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white font-extrabold text-xs uppercase tracking-wider shadow-lg shadow-orange-500/25 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>⚡ 1-Click Login: Coach Vikalp (Super Admin)</span>
              </button>

              <Link
                href="/login"
                className="block w-full py-2.5 rounded-2xl bg-slate-100 dark:bg-zinc-800 hover:bg-slate-200 dark:hover:bg-zinc-700 text-slate-800 dark:text-zinc-200 font-bold text-xs transition-colors"
              >
                Sign In with Custom Credentials →
              </Link>
            </div>
          </div>
        ) : (
          /* Authorized Admin Operations Hub */
          <div className="space-y-8">
            
            {/* Header Title Bar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-200 dark:border-zinc-800">
              <div className="space-y-1">
                <div className="flex items-center gap-2.5 flex-wrap">
                  <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
                    TNT MMA Academy Operating System
                  </h1>
                  <span className="text-xs px-2.5 py-0.5 rounded-full bg-orange-100 dark:bg-orange-500/20 text-orange-600 dark:text-orange-400 font-bold border border-orange-200 dark:border-orange-500/30">
                    Bhopal HQ • Coach Vikalp
                  </span>
                </div>
                <p className="text-xs text-slate-500 dark:text-zinc-400">
                  Comprehensive GymBook+ ERP: CRM, Walk-in Leads, Expense P&L Ledger, Staff Payroll, Diet Plans, Waivers & WhatsApp Broadcast.
                </p>
              </div>

              {/* Quick Actions */}
              <div className="flex items-center gap-2.5">
                <button
                  onClick={() => setIsNewMemberOpen(true)}
                  className="px-4 py-2.5 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs uppercase tracking-wider shadow-md shadow-orange-500/20 flex items-center gap-1.5 transition-all cursor-pointer"
                >
                  <UserPlus className="w-4 h-4" />
                  <span>+ New Member</span>
                </button>

                <button
                  onClick={() => setIsFeeLedgerOpen(true)}
                  className="px-4 py-2.5 rounded-xl bg-slate-900 dark:bg-zinc-800 hover:bg-slate-800 text-white font-bold text-xs uppercase tracking-wider shadow-md flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <DollarSign className="w-4 h-4 text-emerald-400" />
                  <span>Fee Ledger & UPI</span>
                </button>
              </div>
            </div>

            {/* 6 Master Metric KPI Cards */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              <div className="p-4 rounded-2xl bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 shadow-sm space-y-1">
                <p className="text-[10px] uppercase font-bold text-slate-500 dark:text-zinc-400 flex items-center gap-1">
                  <Users className="w-3.5 h-3.5 text-orange-500" /> Active Athletes
                </p>
                <p className="text-2xl font-black text-slate-900 dark:text-white">{activeMembersCount}</p>
                <p className="text-[10px] text-green-600 dark:text-green-400 font-semibold">{members.length} total enrolled</p>
              </div>

              <div className="p-4 rounded-2xl bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 shadow-sm space-y-1">
                <p className="text-[10px] uppercase font-bold text-slate-500 dark:text-zinc-400 flex items-center gap-1">
                  <Flame className="w-3.5 h-3.5 text-red-500" /> Hot Leads
                </p>
                <p className="text-2xl font-black text-red-600 dark:text-red-400">{hotLeadsCount}</p>
                <p className="text-[10px] text-slate-400 font-semibold">{leads.length} total inquiries</p>
              </div>

              <div className="p-4 rounded-2xl bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 shadow-sm space-y-1">
                <p className="text-[10px] uppercase font-bold text-slate-500 dark:text-zinc-400 flex items-center gap-1">
                  <TrendingUp className="w-3.5 h-3.5 text-emerald-500" /> Revenue (INR)
                </p>
                <p className="text-2xl font-black text-green-600 dark:text-green-400">₹{(totalRevenue / 1000).toFixed(0)}k</p>
                <p className="text-[10px] text-slate-400 font-semibold">{transactions.length} receipts</p>
              </div>

              <div className="p-4 rounded-2xl bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 shadow-sm space-y-1">
                <p className="text-[10px] uppercase font-bold text-slate-500 dark:text-zinc-400 flex items-center gap-1">
                  <TrendingDown className="w-3.5 h-3.5 text-red-500" /> Total Expenses
                </p>
                <p className="text-2xl font-black text-red-600 dark:text-red-400">₹{(totalExpenses / 1000).toFixed(0)}k</p>
                <p className="text-[10px] text-slate-400 font-semibold">{expenses.length} entries</p>
              </div>

              <div className="p-4 rounded-2xl bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 shadow-sm space-y-1">
                <p className="text-[10px] uppercase font-bold text-slate-500 dark:text-zinc-400 flex items-center gap-1">
                  <FileSignature className="w-3.5 h-3.5 text-blue-500" /> Signed Waivers
                </p>
                <p className="text-2xl font-black text-blue-600 dark:text-blue-400">{waivers.length}</p>
                <p className="text-[10px] text-blue-500 font-semibold">100% indemnity</p>
              </div>

              <div className="p-4 rounded-2xl bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 shadow-sm space-y-1">
                <p className="text-[10px] uppercase font-bold text-slate-500 dark:text-zinc-400 flex items-center gap-1">
                  <AlertTriangle className="w-3.5 h-3.5 text-amber-500" /> Overdue Dues
                </p>
                <p className="text-2xl font-black text-amber-600 dark:text-amber-400">₹{(totalDueAmount / 1000).toFixed(0)}k</p>
                <p className="text-[10px] text-amber-600 font-semibold">{overdueMembers.length} members pending</p>
              </div>
            </div>

            {/* Master Navigation Tabs */}
            <div className="flex items-center gap-1.5 p-1.5 rounded-2xl bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 shadow-sm overflow-x-auto scrollbar-none text-xs font-bold">
              <button
                onClick={() => setActiveTab('MEMBERS')}
                className={`px-4 py-2.5 rounded-xl uppercase tracking-wider transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer ${
                  activeTab === 'MEMBERS'
                    ? 'bg-orange-500 text-white shadow-md shadow-orange-500/20 font-extrabold'
                    : 'text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-zinc-800'
                }`}
              >
                <Users className="w-4 h-4" />
                <span>Athletes CRM ({members.length})</span>
              </button>

              <button
                onClick={() => setActiveTab('LEADS')}
                className={`px-4 py-2.5 rounded-xl uppercase tracking-wider transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer ${
                  activeTab === 'LEADS'
                    ? 'bg-orange-500 text-white shadow-md shadow-orange-500/20 font-extrabold'
                    : 'text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-zinc-800'
                }`}
              >
                <Flame className="w-4 h-4 text-red-500" />
                <span>Walk-In Leads ({leads.length})</span>
              </button>

              <button
                onClick={() => setActiveTab('EXPENSES')}
                className={`px-4 py-2.5 rounded-xl uppercase tracking-wider transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer ${
                  activeTab === 'EXPENSES'
                    ? 'bg-orange-500 text-white shadow-md shadow-orange-500/20 font-extrabold'
                    : 'text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-zinc-800'
                }`}
              >
                <DollarSign className="w-4 h-4 text-emerald-500" />
                <span>Expense & P&L Ledger</span>
              </button>

              <button
                onClick={() => setActiveTab('STAFF')}
                className={`px-4 py-2.5 rounded-xl uppercase tracking-wider transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer ${
                  activeTab === 'STAFF'
                    ? 'bg-orange-500 text-white shadow-md shadow-orange-500/20 font-extrabold'
                    : 'text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-zinc-800'
                }`}
              >
                <UserCheck className="w-4 h-4 text-blue-500" />
                <span>Coaches & Payroll ({staff.length})</span>
              </button>

              <button
                onClick={() => setActiveTab('DIET_WORKOUT')}
                className={`px-4 py-2.5 rounded-xl uppercase tracking-wider transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer ${
                  activeTab === 'DIET_WORKOUT'
                    ? 'bg-orange-500 text-white shadow-md shadow-orange-500/20 font-extrabold'
                    : 'text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-zinc-800'
                }`}
              >
                <Utensils className="w-4 h-4 text-purple-500" />
                <span>Diet & Workout Plans</span>
              </button>

              <button
                onClick={() => setActiveTab('BROADCAST')}
                className={`px-4 py-2.5 rounded-xl uppercase tracking-wider transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer ${
                  activeTab === 'BROADCAST'
                    ? 'bg-orange-500 text-white shadow-md shadow-orange-500/20 font-extrabold'
                    : 'text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-zinc-800'
                }`}
              >
                <Megaphone className="w-4 h-4 text-amber-500" />
                <span>Broadcast Center</span>
              </button>

              <button
                onClick={() => setActiveTab('ATTENDANCE')}
                className={`px-4 py-2.5 rounded-xl uppercase tracking-wider transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer ${
                  activeTab === 'ATTENDANCE'
                    ? 'bg-orange-500 text-white shadow-md shadow-orange-500/20 font-extrabold'
                    : 'text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-zinc-800'
                }`}
              >
                <Scan className="w-4 h-4" />
                <span>Mat Check-In Scanner</span>
              </button>
            </div>

            {/* TAB CONTENT */}
            {activeTab === 'MEMBERS' && (
              <MemberDirectory onUpdate={refreshAll} />
            )}

            {activeTab === 'LEADS' && (
              <EnquiryLeadManager />
            )}

            {activeTab === 'EXPENSES' && (
              <ExpenseLedgerManager />
            )}

            {activeTab === 'STAFF' && (
              <StaffPayrollManager />
            )}

            {activeTab === 'DIET_WORKOUT' && (
              <DietWorkoutManager />
            )}

            {activeTab === 'BROADCAST' && (
              <BroadcastCenter isOpen={true} onClose={() => setActiveTab('MEMBERS')} />
            )}

            {activeTab === 'ATTENDANCE' && (
              <AttendanceScanner
                isOpen={true}
                onClose={() => setActiveTab('MEMBERS')}
                onUpdate={refreshAll}
              />
            )}

          </div>
        )}

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

      <BeltTrackerModal
        isOpen={isBeltTrackerOpen}
        onClose={() => setIsBeltTrackerOpen(false)}
        onUpdate={refreshAll}
      />

      <Footer />
    </div>
  );
}
