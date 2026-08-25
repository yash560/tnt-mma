'use client';

import React, { useState, useEffect } from 'react';
import { 
  Dumbbell, 
  Users, 
  Award, 
  CheckCircle2, 
  AlertTriangle, 
  Scan, 
  Flame, 
  Sparkles, 
  Check, 
  Clock,
  Plus
} from 'lucide-react';
import { Member, ScheduleClass, BeltProgress } from '@/lib/types';
import { 
  getMembers, 
  getSchedule, 
  logAttendance, 
  getAttendanceRecords, 
  getBeltProgress, 
  updateBeltProgress,
  awardKidsBadge 
} from '@/lib/dataStore';
import confetti from 'canvas-confetti';

interface TrainerDashboardProps {
  onRefresh: () => void;
}

export default function TrainerDashboard({ onRefresh }: TrainerDashboardProps) {
  const [activeTab, setActiveTab] = useState<'ROSTER' | 'GRADING' | 'ATTENDANCE'>('ROSTER');
  const [members, setMembers] = useState<Member[]>(() => getMembers());
  const [schedule] = useState<ScheduleClass[]>(() => getSchedule());
  const [attendance, setAttendance] = useState(() => getAttendanceRecords());
  const [selectedBatch, setSelectedBatch] = useState<string>('EVENING');

  useEffect(() => {
    const handleSync = () => {
      setMembers(getMembers());
      setAttendance(getAttendanceRecords());
    };
    window.addEventListener('tnt_datastore_sync', handleSync);
    return () => window.removeEventListener('tnt_datastore_sync', handleSync);
  }, []);

  const handleMarkPresent = (member: Member) => {
    logAttendance({
      id: `att-${Date.now()}`,
      memberId: member.id,
      memberName: member.name,
      discipline: member.discipline,
      batch: member.batch,
      timestamp: new Date().toLocaleTimeString(),
      date: new Date().toISOString().split('T')[0],
      verifiedWaiver: member.waiverSigned,
      verifiedFee: member.status === 'ACTIVE',
    });
    setAttendance(getAttendanceRecords());
    setMembers(getMembers());
    onRefresh();
    confetti({ particleCount: 40, origin: { y: 0.7 } });
  };

  const handleAwardStripe = (member: Member) => {
    const current = getBeltProgress(member.id);
    if (!current) return;
    const nextStripes = Math.min(4, current.stripes + 1);
    const updated: BeltProgress = {
      ...current,
      stripes: nextStripes,
      coachNotes: `Coach awarded stripe #${nextStripes} for outstanding mat performance.`,
      lastGradingDate: new Date().toISOString().split('T')[0],
    };
    updateBeltProgress(updated);
    setMembers(getMembers());
    onRefresh();
    confetti({ particleCount: 70, spread: 70 });
    alert(`🥋 Stripe Awarded!\n${member.name} now has ${nextStripes} Stripes on ${current.currentBelt}.`);
  };

  const filteredMembers = selectedBatch === 'ALL'
    ? members
    : members.filter(m => m.batch === selectedBatch);

  return (
    <div className="space-y-6">
      
      {/* Sub-Tabs */}
      <div className="flex items-center gap-1.5 p-1.5 rounded-2xl bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 shadow-sm overflow-x-auto scrollbar-none">
        <button
          onClick={() => setActiveTab('ROSTER')}
          className={`px-4 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer ${
            activeTab === 'ROSTER'
              ? 'bg-orange-500 text-white shadow-md shadow-orange-500/20 font-extrabold'
              : 'text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-zinc-800'
          }`}
        >
          <Users className="w-4 h-4" />
          <span>Class Roster & Check-In</span>
        </button>

        <button
          onClick={() => setActiveTab('GRADING')}
          className={`px-4 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer ${
            activeTab === 'GRADING'
              ? 'bg-orange-500 text-white shadow-md shadow-orange-500/20 font-extrabold'
              : 'text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-zinc-800'
          }`}
        >
          <Award className="w-4 h-4" />
          <span>Fighter Belt Grading</span>
        </button>
      </div>

      {/* TAB 1: ROSTER & CHECK-IN */}
      {activeTab === 'ROSTER' && (
        <div className="rounded-3xl bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 p-6 sm:p-8 space-y-6 shadow-md">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100 dark:border-zinc-800">
            <div>
              <h3 className="text-xl font-black text-slate-900 dark:text-white">
                Today’s Class Roll Call & Mat Check-In
              </h3>
              <p className="text-xs text-slate-500 dark:text-zinc-400">
                Mark athletes present on the mats. System automatically checks waiver and fee clearance.
              </p>
            </div>

            {/* Batch Filter */}
            <div className="flex items-center gap-1.5 text-xs">
              {['ALL', 'MORNING', 'KIDS', 'EVENING', 'PRO_FIGHTER'].map((b) => (
                <button
                  key={b}
                  onClick={() => setSelectedBatch(b)}
                  className={`px-3 py-1.5 rounded-xl font-bold uppercase tracking-wider transition-all cursor-pointer ${
                    selectedBatch === b
                      ? 'bg-orange-500 text-white shadow-sm'
                      : 'bg-slate-100 dark:bg-zinc-800 text-slate-600 dark:text-zinc-400 hover:bg-slate-200'
                  }`}
                >
                  {b}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            {filteredMembers.map((m) => {
              const isCheckedInToday = attendance.some(a => a.memberId === m.id && a.date === new Date().toISOString().split('T')[0]);

              return (
                <div
                  key={m.id}
                  className="p-4 rounded-2xl bg-slate-50 dark:bg-zinc-950 border border-slate-200 dark:border-zinc-800 flex items-center justify-between gap-4 text-xs hover:border-orange-500/40 transition-all"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl overflow-hidden border border-orange-500/40 shrink-0">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={m.avatarUrl} alt={m.name} className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-slate-900 dark:text-white text-sm">{m.name}</span>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-orange-100 dark:bg-orange-500/20 text-orange-600 dark:text-orange-400">
                          {m.batch}
                        </span>
                      </div>
                      <p className="text-slate-500 dark:text-zinc-400 text-[11px]">
                        Rank: <strong className="text-slate-800 dark:text-zinc-200">{m.beltRank}</strong> • Waiver: {m.waiverSigned ? '✓ Signed' : '❌ Missing'}
                      </p>
                    </div>
                  </div>

                  <div>
                    {isCheckedInToday ? (
                      <span className="px-3 py-1.5 rounded-xl bg-green-100 dark:bg-green-500/10 text-green-700 dark:text-green-400 font-bold flex items-center gap-1">
                        <Check className="w-4 h-4" /> Marked On Mat
                      </span>
                    ) : (
                      <button
                        onClick={() => handleMarkPresent(m)}
                        className="px-4 py-2 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs uppercase tracking-wider shadow-sm transition-colors cursor-pointer"
                      >
                        + Mark Present
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB 2: BELT GRADING */}
      {activeTab === 'GRADING' && (
        <div className="rounded-3xl bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 p-6 sm:p-8 space-y-6 shadow-md">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-zinc-800">
            <div>
              <h3 className="text-xl font-black text-slate-900 dark:text-white">
                Fighter Stripe Evaluation & Belt Promotion
              </h3>
              <p className="text-xs text-slate-500 dark:text-zinc-400">
                Award stripes or upgrade fighter belt ranking upon satisfying curriculum milestones.
              </p>
            </div>
          </div>

          <div className="space-y-4">
            {members.map((m) => (
              <div
                key={m.id}
                className="p-5 rounded-2xl bg-slate-50 dark:bg-zinc-950 border border-slate-200 dark:border-zinc-800 flex items-center justify-between gap-4 text-xs"
              >
                <div className="flex items-center gap-3.5">
                  <div className="w-12 h-12 rounded-xl overflow-hidden border border-orange-500 shrink-0">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={m.avatarUrl} alt={m.name} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 dark:text-white text-sm">{m.name}</h4>
                    <p className="text-orange-600 dark:text-orange-400 font-semibold">{m.beltRank}</p>
                    <p className="text-[11px] text-slate-400">Mat Attendance: {m.totalCheckIns} Sessions ({m.attendanceStreak} Day Streak)</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleAwardStripe(m)}
                    className="px-4 py-2 rounded-xl bg-slate-900 dark:bg-zinc-800 hover:bg-orange-500 dark:hover:bg-orange-500 text-white font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer flex items-center gap-1.5"
                  >
                    <Award className="w-4 h-4 text-amber-400" />
                    <span>Award Stripe +1</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
}
