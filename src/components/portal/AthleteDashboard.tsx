'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Flame, 
  QrCode, 
  Calendar, 
  CalendarDays, 
  Clock, 
  Award, 
  DollarSign, 
  Dumbbell, 
  FileSignature, 
  CheckCircle2, 
  Plus, 
  TrendingUp, 
  MapPin, 
  Sparkles, 
  Download, 
  CreditCard, 
  X,
  Swords,
  ChevronRight,
  ShieldCheck,
  Check,
  Utensils
} from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import { Member, WorkoutLog, ClassBooking, BeltProgress, TransactionInvoice, DietPlan, WorkoutRoutine } from '@/lib/types';
import { 
  getWorkoutLogs, 
  saveWorkoutLog, 
  getClassBookings, 
  bookClass, 
  cancelClassBooking, 
  getBeltProgress, 
  updateBeltProgress, 
  getTransactions, 
  payMemberDues, 
  getSchedule,
  logAttendance,
  getWaiverById,
  getDietPlan,
  getWorkoutRoutine
} from '@/lib/dataStore';
import confetti from 'canvas-confetti';

interface AthleteDashboardProps {
  member: Member;
  onOpenWaiverModal: (waiver: any) => void;
  onRefreshMember: () => void;
}

export default function AthleteDashboard({ member, onOpenWaiverModal, onRefreshMember }: AthleteDashboardProps) {
  const [activeTab, setActiveTab] = useState<'OVERVIEW' | 'BOOKINGS' | 'BELT' | 'DIET' | 'ROUTINE' | 'WORKOUTS' | 'FEES'>('OVERVIEW');
  
  // Data states
  const [bookings, setBookings] = useState<ClassBooking[]>(() => getClassBookings(member.id));
  const [workouts, setWorkouts] = useState<WorkoutLog[]>(() => getWorkoutLogs(member.id));
  const [beltData, setBeltData] = useState<BeltProgress | null>(() => getBeltProgress(member.id));
  const [transactions, setTransactions] = useState<TransactionInvoice[]>(() => getTransactions().filter(t => t.memberId === member.id));
  const [dietData, setDietData] = useState<DietPlan | null>(() => getDietPlan(member.id) || getDietPlan('mem-101'));
  const [routineData, setRoutineData] = useState<WorkoutRoutine | null>(() => getWorkoutRoutine(member.id) || getWorkoutRoutine('mem-101'));
  const [schedule] = useState(() => getSchedule());

  // Modal states
  const [isWorkoutModalOpen, setIsWorkoutModalOpen] = useState(false);
  const [isPayModalOpen, setIsPayModalOpen] = useState(false);
  const [newLogRounds, setNewLogRounds] = useState(6);
  const [newLogDiscipline, setNewLogDiscipline] = useState<'MMA' | 'BJJ' | 'KICKBOXING' | 'CROSSFIT'>('MMA');
  const [newLogTechnique, setNewLogTechnique] = useState('');
  const [newLogNotes, setNewLogNotes] = useState('');

  // Sync listener
  useEffect(() => {
    const handleSync = () => {
      setBookings(getClassBookings(member.id));
      setWorkouts(getWorkoutLogs(member.id));
      setBeltData(getBeltProgress(member.id));
      setTransactions(getTransactions().filter(t => t.memberId === member.id));
    };
    window.addEventListener('tnt_datastore_sync', handleSync);
    return () => window.removeEventListener('tnt_datastore_sync', handleSync);
  }, [member.id]);

  const handleBookClass = (sch: any) => {
    const newBooking: ClassBooking = {
      id: `bk-${Date.now()}`,
      memberId: member.id,
      memberName: member.name,
      classId: sch.id,
      className: sch.disciplineTitle,
      classTime: sch.time,
      classDate: `${sch.day} Session`,
      discipline: sch.discipline,
      coachName: sch.coachName,
      status: 'CONFIRMED',
      createdAt: new Date().toISOString(),
    };
    bookClass(newBooking);
    setBookings(getClassBookings(member.id));
    confetti({ particleCount: 50, origin: { y: 0.7 } });
  };

  const handleCancelBooking = (id: string) => {
    cancelClassBooking(id);
    setBookings(getClassBookings(member.id));
  };

  const handleSaveWorkout = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newLogTechnique) return;
    const log: WorkoutLog = {
      id: `wlog-${Date.now()}`,
      memberId: member.id,
      memberName: member.name,
      date: new Date().toISOString().split('T')[0],
      discipline: newLogDiscipline,
      roundsSparred: Number(newLogRounds),
      durationMinutes: 75,
      notes: newLogNotes || 'Intense sparring rounds with technical discipline.',
      techniqueMastered: newLogTechnique,
      coachFeedback: 'Logged via Athlete Journal. Coach Vikalp reviewed.',
    };
    saveWorkoutLog(log);
    setWorkouts(getWorkoutLogs(member.id));
    setIsWorkoutModalOpen(false);
    setNewLogTechnique('');
    setNewLogNotes('');
    confetti({ particleCount: 60, spread: 60 });
  };

  const handleSimulateCheckIn = () => {
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
    onRefreshMember();
    confetti({ particleCount: 80, spread: 80, origin: { y: 0.6 } });
    alert(`⚡ Contactless Check-In Verified!\nWelcome to the mats, ${member.name}. Mat streak updated.`);
  };

  const handlePayDues = () => {
    payMemberDues(member.id, member.balanceDue || 3000, 'UPI');
    setTransactions(getTransactions().filter(t => t.memberId === member.id));
    onRefreshMember();
    setIsPayModalOpen(false);
    confetti({ particleCount: 100, spread: 90 });
    alert('Payment confirmed via UPI! Dues cleared and invoice generated.');
  };

  const daysRemaining = Math.max(0, Math.ceil((new Date(member.expiryDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)));

  return (
    <div className="space-y-6">
      
      {/* Navigation Sub-Tabs */}
      <div className="flex items-center gap-1.5 p-1.5 rounded-2xl bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 shadow-sm overflow-x-auto scrollbar-none">
        <button
          onClick={() => setActiveTab('OVERVIEW')}
          className={`px-4 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer ${
            activeTab === 'OVERVIEW'
              ? 'bg-orange-500 text-white shadow-md shadow-orange-500/20 font-extrabold'
              : 'text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-zinc-800'
          }`}
        >
          <QrCode className="w-4 h-4" />
          <span>Fighter Pass & Overview</span>
        </button>

        <button
          onClick={() => setActiveTab('BOOKINGS')}
          className={`px-4 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer ${
            activeTab === 'BOOKINGS'
              ? 'bg-orange-500 text-white shadow-md shadow-orange-500/20 font-extrabold'
              : 'text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-zinc-800'
          }`}
        >
          <CalendarDays className="w-4 h-4" />
          <span>Book Classes ({bookings.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('BELT')}
          className={`px-4 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer ${
            activeTab === 'BELT'
              ? 'bg-orange-500 text-white shadow-md shadow-orange-500/20 font-extrabold'
              : 'text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-zinc-800'
          }`}
        >
          <Award className="w-4 h-4" />
          <span>Belt & Rank Progress</span>
        </button>

        <button
          onClick={() => setActiveTab('DIET')}
          className={`px-4 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer ${
            activeTab === 'DIET'
              ? 'bg-orange-500 text-white shadow-md shadow-orange-500/20 font-extrabold'
              : 'text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-zinc-800'
          }`}
        >
          <Utensils className="w-4 h-4 text-purple-500" />
          <span>Diet & Nutrition</span>
        </button>

        <button
          onClick={() => setActiveTab('ROUTINE')}
          className={`px-4 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer ${
            activeTab === 'ROUTINE'
              ? 'bg-orange-500 text-white shadow-md shadow-orange-500/20 font-extrabold'
              : 'text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-zinc-800'
          }`}
        >
          <Dumbbell className="w-4 h-4 text-blue-500" />
          <span>Combat Workout Plan</span>
        </button>

        <button
          onClick={() => setActiveTab('WORKOUTS')}
          className={`px-4 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer ${
            activeTab === 'WORKOUTS'
              ? 'bg-orange-500 text-white shadow-md shadow-orange-500/20 font-extrabold'
              : 'text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-zinc-800'
          }`}
        >
          <Swords className="w-4 h-4" />
          <span>Sparring Journal ({workouts.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('FEES')}
          className={`px-4 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer ${
            activeTab === 'FEES'
              ? 'bg-orange-500 text-white shadow-md shadow-orange-500/20 font-extrabold'
              : 'text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-zinc-800'
          }`}
        >
          <DollarSign className="w-4 h-4" />
          <span>Fee Invoices & Pay</span>
        </button>
      </div>

      {/* TAB 1: OVERVIEW */}
      {activeTab === 'OVERVIEW' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Digital Pass */}
          <div className="lg:col-span-5 rounded-3xl bg-white dark:bg-gradient-to-b dark:from-zinc-900 dark:via-orange-950/20 dark:to-zinc-950 border-2 border-orange-500/50 p-6 sm:p-7 space-y-6 shadow-xl text-center relative overflow-hidden">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-zinc-800">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-orange-500 flex items-center justify-center text-white">
                  <Flame className="w-5 h-5" />
                </div>
                <span className="font-bold text-slate-900 dark:text-white text-xs uppercase tracking-wider">
                  TNT ATHLETE PASS
                </span>
              </div>
              <span className="font-mono text-xs text-orange-600 dark:text-orange-400 font-bold">
                {member.id}
              </span>
            </div>

            {/* QR Code */}
            <div className="p-4 rounded-2xl bg-white text-black inline-block shadow-2xl border-2 border-orange-500">
              <QRCodeSVG
                value={`TNT-MEMBER:${member.id}:${member.name}:${member.expiryDate}`}
                size={160}
                level="H"
              />
            </div>

            <div className="space-y-1 text-xs">
              <p className="font-bold text-slate-900 dark:text-white text-sm">{member.planName}</p>
              <p className="text-slate-500 dark:text-zinc-400 text-[11px]">Valid Until: <strong className="text-slate-800 dark:text-zinc-200">{member.expiryDate}</strong> ({daysRemaining} days left)</p>
            </div>

            {/* 1-Click Fast Check-in Trigger */}
            <button
              onClick={handleSimulateCheckIn}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white font-extrabold text-xs uppercase tracking-wider shadow-lg shadow-orange-500/25 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-amber-200" />
              <span>1-Click Mat Check-In Today</span>
            </button>

            {/* Quick Metrics */}
            <div className="grid grid-cols-2 gap-2 pt-3 border-t border-slate-100 dark:border-zinc-800 text-xs">
              <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800">
                <p className="text-[10px] text-slate-400 dark:text-zinc-500 uppercase font-bold">Streak</p>
                <p className="text-lg font-black text-orange-600 dark:text-orange-400">{member.attendanceStreak} Days</p>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800">
                <p className="text-[10px] text-slate-400 dark:text-zinc-500 uppercase font-bold">Total Mat Hours</p>
                <p className="text-lg font-black text-slate-900 dark:text-white">{beltData?.hoursOnMat || 45} hrs</p>
              </div>
            </div>
          </div>

          {/* Right Column: Next Class & Quick Cards */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Upcoming Reserved Classes */}
            <div className="rounded-3xl bg-white dark:bg-zinc-900/80 border border-slate-200 dark:border-zinc-800 p-6 space-y-4 shadow-md">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <CalendarDays className="w-5 h-5 text-orange-600 dark:text-orange-400" />
                  <h3 className="font-bold text-slate-900 dark:text-white text-sm">
                    Upcoming Booked Training Sessions
                  </h3>
                </div>
                <button
                  onClick={() => setActiveTab('BOOKINGS')}
                  className="text-xs text-orange-600 dark:text-orange-400 font-bold hover:underline"
                >
                  + Book More Slots
                </button>
              </div>

              {bookings.length > 0 ? (
                <div className="space-y-2.5">
                  {bookings.map((bk) => (
                    <div
                      key={bk.id}
                      className="p-4 rounded-2xl bg-slate-50 dark:bg-zinc-950 border border-slate-200 dark:border-zinc-800 flex items-center justify-between gap-4 text-xs"
                    >
                      <div className="space-y-0.5">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-slate-900 dark:text-white">{bk.className}</span>
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-green-100 dark:bg-green-500/10 text-green-700 dark:text-green-400">
                            {bk.status}
                          </span>
                        </div>
                        <p className="text-slate-500 dark:text-zinc-400 text-[11px]">
                          {bk.classDate} • {bk.classTime} • Coach: <strong>{bk.coachName}</strong>
                        </p>
                      </div>
                      <button
                        onClick={() => handleCancelBooking(bk.id)}
                        className="text-xs text-red-500 hover:text-red-700 font-semibold px-2 py-1 rounded-lg hover:bg-red-50 dark:hover:bg-zinc-900"
                      >
                        Cancel
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-6 rounded-2xl bg-slate-50 dark:bg-zinc-950 border border-slate-200 dark:border-zinc-800 text-center space-y-2 text-xs">
                  <p className="text-slate-500 dark:text-zinc-400">You have no upcoming sessions booked today.</p>
                  <button
                    onClick={() => setActiveTab('BOOKINGS')}
                    className="px-4 py-2 rounded-xl bg-orange-500 text-white font-bold text-xs"
                  >
                    Reserve Mat Slot Now
                  </button>
                </div>
              )}
            </div>

            {/* Legal Waiver Status Banner */}
            <div className="rounded-3xl bg-white dark:bg-zinc-900/80 border border-slate-200 dark:border-zinc-800 p-6 flex items-center justify-between gap-4 shadow-md">
              <div className="flex items-center gap-3">
                <FileSignature className="w-6 h-6 text-orange-600 dark:text-orange-400 shrink-0" />
                <div className="space-y-0.5 text-xs">
                  <p className="font-bold text-slate-900 dark:text-white">Legal Liability & Medical Waiver</p>
                  <p className="text-slate-500 dark:text-zinc-400">
                    {member.waiverSigned ? `Verified on file (${member.waiverId || 'TNT-WVR-2026-VERIFIED'})` : 'Missing signature'}
                  </p>
                </div>
              </div>
              {member.waiverSigned ? (
                <button
                  onClick={() => {
                    const doc = getWaiverById(member.waiverId || '');
                    if (doc) onOpenWaiverModal(doc);
                  }}
                  className="px-3.5 py-2 rounded-xl bg-slate-100 dark:bg-zinc-800 hover:bg-orange-50 dark:hover:bg-zinc-700 text-orange-600 dark:text-orange-400 font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>View PDF</span>
                </button>
              ) : (
                <Link
                  href="/waiver"
                  className="px-4 py-2 rounded-xl bg-orange-500 text-white font-bold text-xs"
                >
                  Sign Waiver
                </Link>
              )}
            </div>

          </div>

        </div>
      )}

      {/* TAB 2: BOOK CLASSES */}
      {activeTab === 'BOOKINGS' && (
        <div className="rounded-3xl bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 p-6 sm:p-8 space-y-6 shadow-md">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-zinc-800">
            <div>
              <h3 className="text-xl font-black text-slate-900 dark:text-white">
                Weekly Class Reservation Engine
              </h3>
              <p className="text-xs text-slate-500 dark:text-zinc-400">
                Reserve your spot in morning CrossFit, evening Muay Thai, or BJJ grappling batches.
              </p>
            </div>
            <span className="text-xs text-orange-600 dark:text-orange-400 font-bold">
              {bookings.length} active slots booked
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {schedule.slice(0, 6).map((sch) => {
              const isAlreadyBooked = bookings.some(b => b.classId === sch.id);
              return (
                <div
                  key={sch.id}
                  className="p-5 rounded-2xl bg-slate-50 dark:bg-zinc-950 border border-slate-200 dark:border-zinc-800 space-y-3 hover:border-orange-500/40 transition-all"
                >
                  <div className="flex items-start justify-between">
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-orange-100 dark:bg-orange-500/20 text-orange-600 dark:text-orange-400">
                      {sch.day} • {sch.batchType}
                    </span>
                    <span className="text-xs font-mono font-bold text-slate-700 dark:text-zinc-300">
                      {sch.time}
                    </span>
                  </div>

                  <div>
                    <h4 className="font-bold text-slate-900 dark:text-white text-sm">
                      {sch.disciplineTitle}
                    </h4>
                    <p className="text-xs text-slate-500 dark:text-zinc-400">
                      Coach: <strong>{sch.coachName}</strong> • {sch.location}
                    </p>
                  </div>

                  <div className="pt-2 flex items-center justify-between border-t border-slate-200/60 dark:border-zinc-800/60">
                    <span className="text-[11px] text-slate-500 dark:text-zinc-400">
                      Capacity: <strong>{sch.enrolled}/{sch.capacity}</strong>
                    </span>
                    {isAlreadyBooked ? (
                      <span className="text-xs font-bold text-green-600 dark:text-green-400 flex items-center gap-1">
                        <Check className="w-4 h-4" /> Booked
                      </span>
                    ) : (
                      <button
                        onClick={() => handleBookClass(sch)}
                        className="px-3.5 py-1.5 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer"
                      >
                        Reserve Spot
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB 3: BELT & RANK PROGRESS */}
      {activeTab === 'BELT' && (
        <div className="rounded-3xl bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 p-6 sm:p-8 space-y-8 shadow-md">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100 dark:border-zinc-800">
            <div>
              <h3 className="text-xl font-black text-slate-900 dark:text-white">
                Fighter Rank & Belt Progression Matrix
              </h3>
              <p className="text-xs text-slate-500 dark:text-zinc-400">
                Official curriculum requirements evaluated by Head Coach Vikalp.
              </p>
            </div>
            <div className="p-3 rounded-2xl bg-orange-50 dark:bg-zinc-950 border border-orange-200 dark:border-orange-500/30 text-center">
              <p className="text-[10px] text-slate-400 uppercase font-bold">Current Rank</p>
              <p className="text-lg font-black text-orange-600 dark:text-orange-400">{beltData?.currentBelt || member.beltRank}</p>
            </div>
          </div>

          {/* Belt Stripes Visualizer */}
          <div className="p-6 rounded-3xl bg-slate-900 text-white space-y-4 shadow-xl">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-orange-400 uppercase tracking-widest">
                Brazilian Jiu-Jitsu (BJJ) Belt Track
              </span>
              <span className="text-xs font-mono text-zinc-400">
                {beltData?.stripes || 2} of 4 Stripes
              </span>
            </div>

            {/* Visual Belt Graphic */}
            <div className="h-12 rounded-xl bg-blue-600 flex items-center justify-end px-6 shadow-inner relative overflow-hidden border-2 border-blue-500">
              {/* Black Bar on BJJ Belt */}
              <div className="w-24 h-full bg-black flex items-center justify-evenly px-2">
                {[...Array(4)].map((_, i) => (
                  <div
                    key={i}
                    className={`w-1.5 h-8 rounded-sm ${
                      i < (beltData?.stripes || 2) ? 'bg-white shadow-sm' : 'bg-zinc-800'
                    }`}
                  />
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between text-xs text-zinc-400 pt-1">
              <span>Current: <strong>{beltData?.currentBelt}</strong></span>
              <span>Next Goal: <strong className="text-orange-400">{beltData?.nextBelt}</strong></span>
            </div>
          </div>

          {/* Requirements Checklist */}
          <div className="space-y-4">
            <h4 className="font-bold text-slate-900 dark:text-white text-sm">
              Requirements for Next Stripe / Belt Grading:
            </h4>
            <div className="space-y-2.5">
              {beltData?.requirements.map((req, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-2xl bg-slate-50 dark:bg-zinc-950 border border-slate-200 dark:border-zinc-800 flex items-center justify-between text-xs"
                >
                  <span className="text-slate-800 dark:text-zinc-200 font-medium">{req.title}</span>
                  {req.completed ? (
                    <span className="px-2 py-0.5 rounded bg-green-100 dark:bg-green-500/10 text-green-700 dark:text-green-400 font-bold flex items-center gap-1 text-[10px]">
                      <Check className="w-3.5 h-3.5" /> CLEARED
                    </span>
                  ) : (
                    <span className="px-2 py-0.5 rounded bg-amber-100 dark:bg-amber-500/10 text-amber-700 dark:text-amber-400 font-bold text-[10px]">
                      IN PROGRESS
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Coach Notes */}
          <div className="p-5 rounded-2xl bg-orange-50 dark:bg-zinc-950 border border-orange-200 dark:border-orange-500/30 space-y-1.5 text-xs">
            <p className="font-bold text-orange-600 dark:text-orange-400 uppercase tracking-wider text-[10px]">
              Head Coach Evaluation & Feedback:
            </p>
            <p className="text-slate-700 dark:text-zinc-300 leading-relaxed italic">
              &ldquo;{beltData?.coachNotes}&rdquo;
            </p>
          </div>
        </div>
      )}

      {/* TAB: DIET & NUTRITION PLAN */}
      {activeTab === 'DIET' && (
        <div className="rounded-3xl bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 p-6 sm:p-8 space-y-6 shadow-md">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100 dark:border-zinc-800">
            <div>
              <div className="flex items-center gap-2">
                <Utensils className="w-5 h-5 text-orange-500" />
                <h3 className="text-xl font-black text-slate-900 dark:text-white">
                  Assigned Combat Nutrition Plan
                </h3>
              </div>
              <p className="text-xs text-slate-500 dark:text-zinc-400">
                Customized by Coach Vikalp (Certified Sports Dietician).
              </p>
            </div>
            <span className="text-xs font-black uppercase px-3 py-1 rounded-full bg-orange-100 dark:bg-orange-500/20 text-orange-600 dark:text-orange-400 border border-orange-200 dark:border-orange-500/30 self-start sm:self-auto">
              Goal: {dietData?.goal || 'FIGHT_CAMP'}
            </span>
          </div>

          {/* Daily Macros Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-zinc-950 border border-slate-200 dark:border-zinc-800 text-center space-y-1">
              <p className="text-[10px] uppercase font-bold text-slate-400">Target Calories</p>
              <p className="text-2xl font-black text-slate-900 dark:text-white font-mono">{dietData?.dailyCalories || 2650}</p>
              <p className="text-[10px] text-slate-500">kcal / day</p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-zinc-950 border border-slate-200 dark:border-zinc-800 text-center space-y-1">
              <p className="text-[10px] uppercase font-bold text-red-500">Protein</p>
              <p className="text-2xl font-black text-red-600 dark:text-red-400 font-mono">{dietData?.proteinGrams || 175}g</p>
              <p className="text-[10px] text-slate-500">Muscle recovery</p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-zinc-950 border border-slate-200 dark:border-zinc-800 text-center space-y-1">
              <p className="text-[10px] uppercase font-bold text-amber-500">Carbohydrates</p>
              <p className="text-2xl font-black text-amber-600 dark:text-amber-400 font-mono">{dietData?.carbsGrams || 280}g</p>
              <p className="text-[10px] text-slate-500">Sparring endurance</p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-zinc-950 border border-slate-200 dark:border-zinc-800 text-center space-y-1">
              <p className="text-[10px] uppercase font-bold text-blue-500">Hydration</p>
              <p className="text-2xl font-black text-blue-600 dark:text-blue-400 font-mono">{dietData?.waterLitres || 4.5}L</p>
              <p className="text-[10px] text-slate-500">Clean water daily</p>
            </div>
          </div>

          {/* Meals Timeline */}
          <div className="space-y-3">
            <h4 className="font-bold text-slate-900 dark:text-white text-sm">
              Daily Meal Breakdown & Timing:
            </h4>
            <div className="space-y-3">
              {dietData?.meals.map((meal, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-2xl bg-slate-50 dark:bg-zinc-950 border border-slate-200 dark:border-zinc-800 space-y-2 text-xs"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-900 dark:text-white text-sm">{meal.mealName}</span>
                    <span className="text-orange-600 dark:text-orange-400 font-bold font-mono text-[11px]">{meal.time}</span>
                  </div>
                  <ul className="space-y-1 text-slate-600 dark:text-zinc-300 text-[11px] list-disc list-inside">
                    {meal.items.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Coach Notes */}
          <div className="p-4 rounded-2xl bg-orange-50 dark:bg-zinc-950 border border-orange-200 dark:border-orange-500/30 text-xs space-y-1">
            <p className="font-bold text-orange-600 dark:text-orange-400 uppercase text-[10px]">Dietician Instructions:</p>
            <p className="text-slate-700 dark:text-zinc-300">{dietData?.coachNotes}</p>
          </div>
        </div>
      )}

      {/* TAB: ASSIGNED WORKOUT ROUTINE */}
      {activeTab === 'ROUTINE' && (
        <div className="rounded-3xl bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 p-6 sm:p-8 space-y-6 shadow-md">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100 dark:border-zinc-800">
            <div>
              <div className="flex items-center gap-2">
                <Dumbbell className="w-5 h-5 text-orange-500" />
                <h3 className="text-xl font-black text-slate-900 dark:text-white">
                  {routineData?.routineTitle || 'MMA & Conditioning Camp'}
                </h3>
              </div>
              <p className="text-xs text-slate-500 dark:text-zinc-400">
                Assigned by {routineData?.assignedBy || 'Coach Vikalp'}.
              </p>
            </div>
            <span className="text-xs font-black uppercase px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400 self-start sm:self-auto">
              Level: {routineData?.level || 'INTERMEDIATE'}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {routineData?.days.map((day, idx) => (
              <div
                key={idx}
                className="p-5 rounded-2xl bg-slate-50 dark:bg-zinc-950 border border-slate-200 dark:border-zinc-800 space-y-3 text-xs flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-black text-orange-600 dark:text-orange-400 text-sm">{day.dayName}</span>
                    <span className="text-[10px] font-bold text-slate-500">{day.focus}</span>
                  </div>
                  <ul className="space-y-2 text-slate-600 dark:text-zinc-300 text-[11px]">
                    {day.exercises.map((ex, i) => (
                      <li key={i} className="p-2 rounded-xl bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800/80 space-y-0.5">
                        <p className="font-bold text-slate-900 dark:text-white">{ex.name}</p>
                        <p className="text-slate-500 text-[10px] font-mono">{ex.sets} sets × {ex.reps} • Rest: {ex.restSeconds}s</p>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: SPARRING & WORKOUT JOURNAL */}
      {activeTab === 'WORKOUTS' && (
        <div className="rounded-3xl bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 p-6 sm:p-8 space-y-6 shadow-md">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-zinc-800">
            <div>
              <h3 className="text-xl font-black text-slate-900 dark:text-white">
                Fighter Sparring & Training Journal
              </h3>
              <p className="text-xs text-slate-500 dark:text-zinc-400">
                Log your sparring rounds, new technique mastery, and coach feedback.
              </p>
            </div>
            <button
              onClick={() => setIsWorkoutModalOpen(true)}
              className="px-4 py-2 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs uppercase tracking-wider shadow-md flex items-center gap-1.5 cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Log Session</span>
            </button>
          </div>

          {/* Timeline of Logs */}
          <div className="space-y-3">
            {workouts.map((log) => (
              <div
                key={log.id}
                className="p-5 rounded-2xl bg-slate-50 dark:bg-zinc-950 border border-slate-200 dark:border-zinc-800 space-y-2.5 hover:border-orange-500/40 transition-all text-xs"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded bg-orange-100 dark:bg-orange-500/20 text-orange-600 dark:text-orange-400 font-bold text-[10px]">
                      {log.discipline}
                    </span>
                    <span className="font-bold text-slate-900 dark:text-white text-sm">
                      {log.techniqueMastered}
                    </span>
                  </div>
                  <span className="font-mono text-slate-400 text-[11px]">{log.date}</span>
                </div>

                <p className="text-slate-600 dark:text-zinc-300 leading-relaxed">
                  {log.notes}
                </p>

                <div className="pt-2 border-t border-slate-200/60 dark:border-zinc-800/60 flex items-center justify-between text-[11px] text-slate-500 dark:text-zinc-400">
                  <span>Sparred: <strong className="text-orange-600 dark:text-orange-400">{log.roundsSparred} Rounds</strong> ({log.durationMinutes} mins)</span>
                  <span>Coach: <strong className="text-slate-800 dark:text-zinc-200">{log.coachFeedback || 'Reviewed'}</strong></span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 5: FEES & INVOICES */}
      {activeTab === 'FEES' && (
        <div className="rounded-3xl bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 p-6 sm:p-8 space-y-8 shadow-md">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100 dark:border-zinc-800">
            <div>
              <h3 className="text-xl font-black text-slate-900 dark:text-white">
                Membership Billing & Invoicing Ledger
              </h3>
              <p className="text-xs text-slate-500 dark:text-zinc-400">
                Official GST invoices and instant UPI dues settlement.
              </p>
            </div>
            {member.balanceDue > 0 ? (
              <button
                onClick={() => setIsPayModalOpen(true)}
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-orange-500 to-red-600 text-white font-bold text-xs uppercase tracking-wider shadow-lg flex items-center gap-2 cursor-pointer"
              >
                <CreditCard className="w-4 h-4" />
                <span>Pay Dues (₹{member.balanceDue.toLocaleString('en-IN')})</span>
              </button>
            ) : (
              <span className="px-3 py-1 rounded-full bg-green-100 dark:bg-green-500/10 text-green-700 dark:text-green-400 text-xs font-bold border border-green-200 dark:border-green-500/30">
                ✓ All Dues Cleared
              </span>
            )}
          </div>

          {/* Historical Invoices */}
          <div className="space-y-3">
            <h4 className="font-bold text-slate-900 dark:text-white text-sm">
              Payment Receipts History:
            </h4>
            {transactions.map((txn) => (
              <div
                key={txn.id}
                className="p-4 rounded-2xl bg-slate-50 dark:bg-zinc-950 border border-slate-200 dark:border-zinc-800 flex items-center justify-between gap-4 text-xs"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-900 dark:text-white">{txn.planName}</span>
                    <span className="font-mono text-[10px] text-slate-400">{txn.invoiceNumber}</span>
                  </div>
                  <p className="text-slate-500 dark:text-zinc-400 text-[11px]">
                    Date: {txn.date} • Mode: <strong className="text-slate-800 dark:text-zinc-200">{txn.paymentMode}</strong> ({txn.transactionRef})
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-green-600 dark:text-green-400 text-base">
                    ₹{txn.totalAmount.toLocaleString('en-IN')}
                  </p>
                  <span className="text-[10px] text-green-700 dark:text-green-400 font-bold uppercase">
                    ● {txn.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Modal: Log Workout */}
      {isWorkoutModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-700 rounded-3xl max-w-md w-full p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-zinc-800">
              <h3 className="font-bold text-slate-900 dark:text-white text-base">
                Log New Sparring / Mat Session
              </h3>
              <button onClick={() => setIsWorkoutModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveWorkout} className="space-y-3.5 text-xs">
              <div className="space-y-1">
                <label className="font-bold text-slate-700 dark:text-zinc-300">Discipline</label>
                <select
                  value={newLogDiscipline}
                  onChange={(e) => setNewLogDiscipline(e.target.value as any)}
                  className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-zinc-950 border border-slate-200 dark:border-zinc-800 text-slate-900 dark:text-white outline-none"
                >
                  <option value="MMA">Mixed Martial Arts (MMA)</option>
                  <option value="BJJ">Brazilian Jiu-Jitsu (BJJ)</option>
                  <option value="KICKBOXING">Muay Thai Kickboxing</option>
                  <option value="CROSSFIT">CrossFit & Conditioning</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-700 dark:text-zinc-300">Rounds Sparred</label>
                <input
                  type="number"
                  value={newLogRounds}
                  onChange={(e) => setNewLogRounds(Number(e.target.value))}
                  className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-zinc-950 border border-slate-200 dark:border-zinc-800 text-slate-900 dark:text-white outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-700 dark:text-zinc-300">Technique Mastered</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Double-Leg Takedown to Mount"
                  value={newLogTechnique}
                  onChange={(e) => setNewLogTechnique(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-zinc-950 border border-slate-200 dark:border-zinc-800 text-slate-900 dark:text-white outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-700 dark:text-zinc-300">Session Notes & Cardio Output</label>
                <textarea
                  rows={3}
                  placeholder="How did sparring feel? Any coach feedback..."
                  value={newLogNotes}
                  onChange={(e) => setNewLogNotes(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-zinc-950 border border-slate-200 dark:border-zinc-800 text-slate-900 dark:text-white outline-none resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs uppercase tracking-wider shadow-md cursor-pointer"
              >
                Save to Fighter Journal
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Modal: Pay Dues Instant UPI */}
      {isPayModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-700 rounded-3xl max-w-sm w-full p-6 space-y-5 shadow-2xl text-center">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-zinc-800">
              <h3 className="font-bold text-slate-900 dark:text-white text-base">
                Pay Academy Dues via UPI
              </h3>
              <button onClick={() => setIsPayModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-4 rounded-2xl bg-white text-black inline-block border-2 border-orange-500 shadow-xl">
              <QRCodeSVG
                value={`upi://pay?pa=tntmma@okaxis&pn=TNT%20MMA%20Academy&am=${member.balanceDue || 3000}&cu=INR`}
                size={160}
                level="H"
              />
            </div>

            <div className="space-y-1 text-xs">
              <p className="font-bold text-slate-900 dark:text-white text-base">
                Amount Due: ₹{(member.balanceDue || 3000).toLocaleString('en-IN')}
              </p>
              <p className="text-slate-500 dark:text-zinc-400 text-[11px]">
                Scan with Google Pay, PhonePe, Paytm, or BHIM UPI
              </p>
            </div>

            <button
              onClick={handlePayDues}
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white font-extrabold text-xs uppercase tracking-wider shadow-lg cursor-pointer"
            >
              Simulate Instant UPI Payment Confirmation
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
