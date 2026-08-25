'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  GraduationCap, 
  ShieldCheck, 
  Award, 
  CalendarDays, 
  Clock, 
  DollarSign, 
  HeartHandshake, 
  Phone, 
  FileSignature, 
  Download, 
  Star, 
  Sparkles, 
  CreditCard,
  X,
  Check
} from 'lucide-react';
import { Member, KidsBadge, TransactionInvoice, BeltProgress } from '@/lib/types';
import { 
  getKidsBadges, 
  getBeltProgress, 
  getTransactions, 
  payMemberDues, 
  getWaiverById, 
  getAttendanceRecords 
} from '@/lib/dataStore';
import { QRCodeSVG } from 'qrcode.react';
import confetti from 'canvas-confetti';

interface ParentDashboardProps {
  member: Member;
  onOpenWaiverModal: (waiver: any) => void;
  onRefreshMember: () => void;
}

export default function ParentDashboard({ member, onOpenWaiverModal, onRefreshMember }: ParentDashboardProps) {
  const [activeTab, setActiveTab] = useState<'OVERVIEW' | 'BADGES' | 'ATTENDANCE' | 'FEES'>('OVERVIEW');
  const [badges, setBadges] = useState<KidsBadge[]>(() => getKidsBadges(member.id));
  const [beltData, setBeltData] = useState<BeltProgress | null>(() => getBeltProgress(member.id));
  const [transactions, setTransactions] = useState<TransactionInvoice[]>(() => getTransactions().filter(t => t.memberId === member.id));
  const [attendance, setAttendance] = useState(() => getAttendanceRecords().filter(a => a.memberId === member.id));
  const [isPayModalOpen, setIsPayModalOpen] = useState(false);

  useEffect(() => {
    const handleSync = () => {
      setBadges(getKidsBadges(member.id));
      setBeltData(getBeltProgress(member.id));
      setTransactions(getTransactions().filter(t => t.memberId === member.id));
      setAttendance(getAttendanceRecords().filter(a => a.memberId === member.id));
    };
    window.addEventListener('tnt_datastore_sync', handleSync);
    return () => window.removeEventListener('tnt_datastore_sync', handleSync);
  }, [member.id]);

  const handlePayTuition = () => {
    payMemberDues(member.id, member.balanceDue || 2500, 'UPI');
    setTransactions(getTransactions().filter(t => t.memberId === member.id));
    onRefreshMember();
    setIsPayModalOpen(false);
    confetti({ particleCount: 80, spread: 70 });
    alert('Kids Batch tuition fee paid successfully! Invoice receipt generated.');
  };

  return (
    <div className="space-y-6">
      
      {/* Sub-Tabs */}
      <div className="flex items-center gap-1.5 p-1.5 rounded-2xl bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 shadow-sm overflow-x-auto scrollbar-none">
        <button
          onClick={() => setActiveTab('OVERVIEW')}
          className={`px-4 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer ${
            activeTab === 'OVERVIEW'
              ? 'bg-orange-500 text-white shadow-md shadow-orange-500/20 font-extrabold'
              : 'text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-zinc-800'
          }`}
        >
          <GraduationCap className="w-4 h-4" />
          <span>Child Profile & Pass</span>
        </button>

        <button
          onClick={() => setActiveTab('BADGES')}
          className={`px-4 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer ${
            activeTab === 'BADGES'
              ? 'bg-orange-500 text-white shadow-md shadow-orange-500/20 font-extrabold'
              : 'text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-zinc-800'
          }`}
        >
          <Star className="w-4 h-4" />
          <span>Anti-Bullying Badges ({badges.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('ATTENDANCE')}
          className={`px-4 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer ${
            activeTab === 'ATTENDANCE'
              ? 'bg-orange-500 text-white shadow-md shadow-orange-500/20 font-extrabold'
              : 'text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-zinc-800'
          }`}
        >
          <CalendarDays className="w-4 h-4" />
          <span>Class Attendance ({attendance.length})</span>
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
          <span>Tuition & Receipts</span>
        </button>
      </div>

      {/* TAB 1: OVERVIEW */}
      {activeTab === 'OVERVIEW' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left: Child Pass */}
          <div className="lg:col-span-5 rounded-3xl bg-white dark:bg-zinc-900 border-2 border-orange-500/40 p-6 sm:p-7 space-y-6 shadow-xl text-center">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-zinc-800">
              <span className="text-xs font-bold uppercase text-orange-600 dark:text-orange-400">
                TNT KIDS ACADEMY PASS
              </span>
              <span className="font-mono text-xs text-slate-400 font-bold">{member.id}</span>
            </div>

            <div className="p-4 rounded-2xl bg-white text-black inline-block shadow-xl border-2 border-orange-500">
              <QRCodeSVG
                value={`TNT-KIDS:${member.id}:${member.name}:KIDS_MMA`}
                size={150}
                level="H"
              />
            </div>

            <div className="space-y-1 text-xs">
              <p className="font-bold text-slate-900 dark:text-white text-base">{member.name}</p>
              <p className="text-orange-600 dark:text-orange-400 font-semibold">{beltData?.currentBelt || 'Yellow-White Belt'}</p>
              <p className="text-slate-500 dark:text-zinc-400 text-[11px]">Batch: Monday to Friday (04:00 PM - 05:30 PM)</p>
            </div>

            <div className="p-3.5 rounded-2xl bg-orange-50 dark:bg-zinc-950 border border-orange-200 dark:border-zinc-800 text-xs text-left space-y-1">
              <p className="font-bold text-slate-800 dark:text-zinc-200">Parent / Guardian on File:</p>
              <p className="text-slate-600 dark:text-zinc-400">{member.emergencyContact.name} ({member.emergencyContact.phone})</p>
            </div>
          </div>

          {/* Right: Class Alerts & Next Milestone */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Today's Kids Class Status */}
            <div className="rounded-3xl bg-white dark:bg-zinc-900/80 border border-slate-200 dark:border-zinc-800 p-6 space-y-4 shadow-md">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <Clock className="w-5 h-5 text-orange-600 dark:text-orange-400" />
                  <h3 className="font-bold text-slate-900 dark:text-white text-sm">
                    Today’s Kids Training Session
                  </h3>
                </div>
                <span className="px-2.5 py-0.5 rounded-full bg-green-100 dark:bg-green-500/10 text-green-700 dark:text-green-400 text-[10px] font-bold">
                  ● ACTIVE TODAY
                </span>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-zinc-950 border border-slate-200 dark:border-zinc-800 space-y-2 text-xs">
                <div className="flex items-center justify-between font-bold text-slate-900 dark:text-white">
                  <span>Kids MMA & Anti-Bullying Defense</span>
                  <span className="text-orange-600 dark:text-orange-400">04:00 PM - 05:30 PM</span>
                </div>
                <p className="text-slate-500 dark:text-zinc-400 text-[11px]">
                  Coaches: <strong>Coach Anjali & Coach Vikalp</strong> • Padded Mat Zone A
                </p>
                <div className="pt-2 border-t border-slate-200/60 dark:border-zinc-800/60 flex items-center justify-between text-[11px] text-slate-500 dark:text-zinc-400">
                  <span>Pickup time: <strong>05:30 PM sharp</strong></span>
                  <a href="tel:+919713217866" className="text-orange-600 dark:text-orange-400 font-bold hover:underline flex items-center gap-1">
                    <Phone className="w-3 h-3" /> Call Frontdesk
                  </a>
                </div>
              </div>
            </div>

            {/* Guardian Consent Form */}
            <div className="rounded-3xl bg-white dark:bg-zinc-900/80 border border-slate-200 dark:border-zinc-800 p-6 flex items-center justify-between gap-4 shadow-md">
              <div className="flex items-center gap-3">
                <ShieldCheck className="w-6 h-6 text-orange-600 dark:text-orange-400 shrink-0" />
                <div className="space-y-0.5 text-xs">
                  <p className="font-bold text-slate-900 dark:text-white">Minor Guardian Liability Waiver</p>
                  <p className="text-slate-500 dark:text-zinc-400">Signed & certified on file</p>
                </div>
              </div>
              <button
                onClick={() => {
                  const doc = getWaiverById(member.waiverId || 'TNT-WVR-2026-9042');
                  if (doc) onOpenWaiverModal(doc);
                }}
                className="px-3.5 py-2 rounded-xl bg-slate-100 dark:bg-zinc-800 hover:bg-orange-50 dark:hover:bg-zinc-700 text-orange-600 dark:text-orange-400 font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                <span>View Certificate</span>
              </button>
            </div>

          </div>

        </div>
      )}

      {/* TAB 2: ANTI-BULLYING BADGES */}
      {activeTab === 'BADGES' && (
        <div className="rounded-3xl bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 p-6 sm:p-8 space-y-6 shadow-md">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-zinc-800">
            <div>
              <h3 className="text-xl font-black text-slate-900 dark:text-white">
                Child Confidence & Anti-Bullying Badges
              </h3>
              <p className="text-xs text-slate-500 dark:text-zinc-400">
                Milestones awarded by Coach Vikalp and Coach Anjali for character, safety, and focus.
              </p>
            </div>
            <span className="text-xs text-orange-600 dark:text-orange-400 font-bold">
              {badges.length} Badges Earned
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {badges.map((b) => (
              <div
                key={b.id}
                className="p-5 rounded-2xl bg-slate-50 dark:bg-zinc-950 border border-slate-200 dark:border-zinc-800 text-center space-y-3 hover:border-orange-500/40 transition-all shadow-sm"
              >
                <div className="w-14 h-14 rounded-2xl bg-orange-100 dark:bg-orange-950/60 border border-orange-200 dark:border-orange-500/40 text-2xl flex items-center justify-center mx-auto shadow-md">
                  {b.icon}
                </div>
                <div className="space-y-1">
                  <h4 className="font-black text-slate-900 dark:text-white text-sm">{b.badgeName}</h4>
                  <span className="text-[10px] uppercase font-bold text-orange-600 dark:text-orange-400 px-2 py-0.5 rounded bg-orange-50 dark:bg-zinc-900">
                    {b.category}
                  </span>
                </div>
                <p className="text-[11px] text-slate-600 dark:text-zinc-400 leading-relaxed italic">
                  &ldquo;{b.coachComment}&rdquo;
                </p>
                <p className="text-[10px] text-slate-400 dark:text-zinc-500 pt-2 border-t border-slate-200/60 dark:border-zinc-800/60">
                  Awarded by {b.awardedBy} • {b.awardedDate}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: ATTENDANCE */}
      {activeTab === 'ATTENDANCE' && (
        <div className="rounded-3xl bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 p-6 sm:p-8 space-y-6 shadow-md">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-zinc-800">
            <div>
              <h3 className="text-xl font-black text-slate-900 dark:text-white">
                Child Attendance & Mat Hours Log
              </h3>
              <p className="text-xs text-slate-500 dark:text-zinc-400">
                Verified check-ins at reception kiosk when child steps onto the mat.
              </p>
            </div>
            <span className="text-xs font-bold text-green-600 dark:text-green-400">
              95% Monthly Attendance Rate
            </span>
          </div>

          <div className="space-y-2.5">
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-zinc-950 border border-slate-200 dark:border-zinc-800 flex items-center justify-between text-xs">
              <div>
                <p className="font-bold text-slate-900 dark:text-white">Kids MMA & Anti-Bullying Defense</p>
                <p className="text-slate-400 text-[11px]">2026-08-24 • 04:02 PM Check-in</p>
              </div>
              <span className="text-green-600 dark:text-green-400 font-bold">✓ Attended (Coach Anjali)</span>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-zinc-950 border border-slate-200 dark:border-zinc-800 flex items-center justify-between text-xs">
              <div>
                <p className="font-bold text-slate-900 dark:text-white">Kids Agility, Stunts & Coordination</p>
                <p className="text-slate-400 text-[11px]">2026-08-22 • 04:05 PM Check-in</p>
              </div>
              <span className="text-green-600 dark:text-green-400 font-bold">✓ Attended (Coach Vikalp)</span>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-zinc-950 border border-slate-200 dark:border-zinc-800 flex items-center justify-between text-xs">
              <div>
                <p className="font-bold text-slate-900 dark:text-white">Kids Belt Evaluation & Games</p>
                <p className="text-slate-400 text-[11px]">2026-08-19 • 04:00 PM Check-in</p>
              </div>
              <span className="text-green-600 dark:text-green-400 font-bold">✓ Attended (Coach Anjali)</span>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: FEES */}
      {activeTab === 'FEES' && (
        <div className="rounded-3xl bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 p-6 sm:p-8 space-y-6 shadow-md">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-zinc-800">
            <div>
              <h3 className="text-xl font-black text-slate-900 dark:text-white">
                Kids Batch Tuition Invoices & UPI
              </h3>
              <p className="text-xs text-slate-500 dark:text-zinc-400">
                Monthly fee receipts and instant settlement.
              </p>
            </div>
            {member.balanceDue > 0 ? (
              <button
                onClick={() => setIsPayModalOpen(true)}
                className="px-5 py-2.5 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs uppercase tracking-wider shadow-md cursor-pointer"
              >
                Pay Dues (₹{member.balanceDue.toLocaleString('en-IN')})
              </button>
            ) : (
              <span className="px-3 py-1 rounded-full bg-green-100 dark:bg-green-500/10 text-green-700 dark:text-green-400 text-xs font-bold border border-green-200 dark:border-green-500/30">
                ✓ Tuition Paid
              </span>
            )}
          </div>

          <div className="space-y-3">
            {transactions.map((txn) => (
              <div
                key={txn.id}
                className="p-4 rounded-2xl bg-slate-50 dark:bg-zinc-950 border border-slate-200 dark:border-zinc-800 flex items-center justify-between text-xs"
              >
                <div>
                  <p className="font-bold text-slate-900 dark:text-white">{txn.planName}</p>
                  <p className="text-slate-400 text-[11px] font-mono">{txn.invoiceNumber} • {txn.date}</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-green-600 dark:text-green-400 text-base">₹{txn.totalAmount.toLocaleString('en-IN')}</p>
                  <span className="text-[10px] text-green-700 font-bold uppercase">● {txn.status}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Modal: Pay Dues Instant UPI */}
      {isPayModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-700 rounded-3xl max-w-sm w-full p-6 space-y-5 shadow-2xl text-center">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-zinc-800">
              <h3 className="font-bold text-slate-900 dark:text-white text-base">
                Pay Kids Academy Tuition
              </h3>
              <button onClick={() => setIsPayModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-4 rounded-2xl bg-white text-black inline-block border-2 border-orange-500 shadow-xl">
              <QRCodeSVG
                value={`upi://pay?pa=tntmma@okaxis&pn=TNT%20Kids%20Academy&am=${member.balanceDue || 2500}&cu=INR`}
                size={150}
                level="H"
              />
            </div>

            <div className="space-y-1 text-xs">
              <p className="font-bold text-slate-900 dark:text-white text-base">
                Amount Due: ₹{(member.balanceDue || 2500).toLocaleString('en-IN')}
              </p>
              <p className="text-slate-500 dark:text-zinc-400 text-[11px]">
                Scan with Google Pay, PhonePe, Paytm, or BHIM UPI
              </p>
            </div>

            <button
              onClick={handlePayTuition}
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
