'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  UserCircle2, 
  QrCode, 
  Calendar, 
  Award, 
  DollarSign, 
  Flame, 
  ArrowLeft, 
  Clock, 
  ShieldCheck, 
  FileSignature, 
  CheckCircle2, 
  AlertTriangle,
  Download,
  Share2,
  TrendingUp
} from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import WaiverCertificateModal from '@/components/waiver/WaiverCertificateModal';
import { Member, TransactionInvoice } from '@/lib/types';
import { getMembers, getTransactions, getWaiverById } from '@/lib/dataStore';

export default function MemberPortalPage() {
  const [members] = useState<Member[]>(() => getMembers());
  const [selectedMemberId, setSelectedMemberId] = useState<string>(() => members[0]?.id || 'mem-101');
  const [transactions] = useState<TransactionInvoice[]>(() => getTransactions());
  
  const [viewingWaiver, setViewingWaiver] = useState<any>(null);
  const [isWaiverModalOpen, setIsWaiverModalOpen] = useState(false);

  const activeMember = members.find((m) => m.id === selectedMemberId) || members[0];
  const memberTxns = transactions.filter((t) => t.memberId === activeMember?.id);

  // Compute days remaining
  const daysRemaining = activeMember ? Math.max(0, Math.ceil((new Date(activeMember.expiryDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))) : 0;

  const handleOpenWaiver = () => {
    if (activeMember?.waiverId) {
      const doc = getWaiverById(activeMember.waiverId);
      if (doc) {
        setViewingWaiver(doc);
        setIsWaiverModalOpen(true);
        return;
      }
    }
    alert('No signed waiver record found on file. Please sign your mandatory waiver on /waiver.');
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-white flex flex-col justify-between selection:bg-orange-500 selection:text-white">
      <Navbar />

      <main className="flex-1 pt-28 pb-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto w-full space-y-8">
        
        {/* Top Header & Fast Switcher */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <Link
            href="/"
            className="text-xs text-zinc-400 hover:text-orange-400 flex items-center gap-1 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Academy Home</span>
          </Link>

          {/* Persona Switcher Dropdown */}
          <div className="flex items-center gap-2">
            <span className="text-xs text-zinc-400">Switch Account:</span>
            <select
              value={selectedMemberId}
              onChange={(e) => setSelectedMemberId(e.target.value)}
              className="px-3 py-1.5 rounded-xl bg-zinc-900 border border-zinc-700 text-xs text-white outline-none focus:border-orange-500"
            >
              {members.map((m) => (
                <option key={m.id} value={m.id}>
                  {m.name} ({m.isMinor ? 'Parent Portal' : 'Fighter'})
                </option>
              ))}
            </select>
          </div>
        </div>

        {activeMember && (
          <div className="space-y-8">
            
            {/* Top Athlete Banner Card */}
            <div className="rounded-3xl bg-gradient-to-r from-zinc-900 via-zinc-900 to-orange-950/30 border border-zinc-800 p-6 sm:p-8 flex flex-col md:flex-row items-center md:items-start justify-between gap-6 shadow-2xl">
              
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 text-center sm:text-left">
                <div className="w-20 h-20 rounded-2xl overflow-hidden border-2 border-orange-500 shadow-xl shrink-0">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={activeMember.avatarUrl}
                    alt={activeMember.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="space-y-1.5">
                  <div className="flex items-center justify-center sm:justify-start gap-2 flex-wrap">
                    <h1 className="text-2xl font-black text-white">{activeMember.name}</h1>
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-orange-500/20 text-orange-400 border border-orange-500/30">
                      {activeMember.batch} BATCH
                    </span>
                  </div>

                  <p className="text-xs text-orange-400 font-mono font-bold">
                    {activeMember.beltRank}
                  </p>

                  <div className="flex items-center justify-center sm:justify-start gap-4 text-xs text-zinc-400 pt-1">
                    <span>Phone: <strong className="text-zinc-200">{activeMember.phone}</strong></span>
                    <span>Blood: <strong className="text-orange-400">{activeMember.bloodGroup}</strong></span>
                  </div>
                </div>
              </div>

              {/* Status Badge & Days Left */}
              <div className="p-4 rounded-2xl bg-zinc-950 border border-zinc-800 text-center space-y-1 min-w-[160px]">
                <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase border ${
                  activeMember.status === 'ACTIVE'
                    ? 'bg-green-500/10 text-green-400 border-green-500/30'
                    : 'bg-amber-500/10 text-amber-400 border-amber-500/30'
                }`}>
                  ● {activeMember.status}
                </span>
                <p className="text-2xl font-black text-white">{daysRemaining} Days</p>
                <p className="text-[10px] text-zinc-500">Membership validity</p>
              </div>

            </div>

            {/* Main Portal 2-Column Grid */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
              
              {/* Left Column: Digital Member Pass (5 cols) */}
              <div className="md:col-span-5 rounded-3xl bg-gradient-to-b from-zinc-900 via-orange-950/20 to-zinc-950 border-2 border-orange-500/50 p-6 sm:p-7 space-y-6 shadow-2xl text-center relative overflow-hidden">
                
                {/* Pass Header */}
                <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-orange-500 flex items-center justify-center text-white">
                      <Flame className="w-5 h-5" />
                    </div>
                    <span className="font-bold text-white text-xs uppercase tracking-wider">
                      TNT ATHLETE PASS
                    </span>
                  </div>
                  <span className="font-mono text-xs text-orange-400 font-bold">
                    {activeMember.id}
                  </span>
                </div>

                {/* QR Code */}
                <div className="p-4 rounded-2xl bg-white text-black inline-block shadow-2xl border-2 border-orange-500">
                  <QRCodeSVG
                    value={`TNT-MEMBER:${activeMember.id}:${activeMember.name}:${activeMember.expiryDate}`}
                    size={160}
                    level="H"
                  />
                </div>

                <div className="space-y-1 text-xs">
                  <p className="font-bold text-white text-sm">{activeMember.planName}</p>
                  <p className="text-zinc-400 text-[11px]">Valid Until: <strong className="text-zinc-200">{activeMember.expiryDate}</strong></p>
                  <p className="text-[10px] text-green-400 font-semibold pt-1">
                    ● Scan at reception scanner for contactless mat entry
                  </p>
                </div>

                {/* Quick Check-in Stats */}
                <div className="grid grid-cols-2 gap-2 pt-3 border-t border-zinc-800 text-xs">
                  <div className="p-2.5 rounded-xl bg-zinc-900 border border-zinc-800">
                    <p className="text-[10px] text-zinc-500 uppercase font-bold">Streak</p>
                    <p className="text-lg font-black text-orange-400">{activeMember.attendanceStreak} Days</p>
                  </div>
                  <div className="p-2.5 rounded-xl bg-zinc-900 border border-zinc-800">
                    <p className="text-[10px] text-zinc-500 uppercase font-bold">Total Check-Ins</p>
                    <p className="text-lg font-black text-white">{activeMember.totalCheckIns}</p>
                  </div>
                </div>

              </div>

              {/* Right Column: Documents & Invoices (7 cols) */}
              <div className="md:col-span-7 space-y-6">
                
                {/* Legal Waiver Card */}
                <div className="rounded-3xl bg-zinc-900/80 border border-zinc-800 p-6 space-y-4 shadow-xl">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <FileSignature className="w-5 h-5 text-orange-400" />
                      <div>
                        <h3 className="font-bold text-white text-sm">
                          Legal Liability & Health Waiver
                        </h3>
                        <p className="text-[11px] text-zinc-400">
                          Official indemnity contract for training clearance.
                        </p>
                      </div>
                    </div>

                    {activeMember.waiverSigned ? (
                      <span className="px-2.5 py-1 rounded bg-green-500/10 text-green-400 text-[10px] font-bold border border-green-500/30">
                        ✓ VERIFIED
                      </span>
                    ) : (
                      <span className="px-2.5 py-1 rounded bg-red-500/10 text-red-400 text-[10px] font-bold border border-red-500/30">
                        MISSING
                      </span>
                    )}
                  </div>

                  {activeMember.waiverSigned ? (
                    <div className="p-4 rounded-2xl bg-zinc-950 border border-zinc-800 flex items-center justify-between text-xs">
                      <div>
                        <p className="text-zinc-400 text-[11px]">Verification Code:</p>
                        <p className="font-mono font-bold text-white">{activeMember.waiverId}</p>
                      </div>
                      <button
                        onClick={handleOpenWaiver}
                        className="px-4 py-2 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
                      >
                        <Download className="w-3.5 h-3.5" />
                        <span>View / Print Certificate</span>
                      </button>
                    </div>
                  ) : (
                    <div className="p-4 rounded-2xl bg-red-950/30 border border-red-500/40 text-xs space-y-2">
                      <p className="text-red-300 font-bold">
                        ⚠️ You have not signed your mandatory liability waiver yet.
                      </p>
                      <Link
                        href="/waiver"
                        className="inline-block px-3 py-1.5 rounded-lg bg-orange-500 text-white font-bold text-xs hover:bg-orange-600"
                      >
                        Sign Digital Waiver Now →
                      </Link>
                    </div>
                  )}
                </div>

                {/* Fee Payments & Invoices */}
                <div className="rounded-3xl bg-zinc-900/80 border border-zinc-800 p-6 space-y-4 shadow-xl">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <DollarSign className="w-5 h-5 text-green-400" />
                      <h3 className="font-bold text-white text-sm">
                        Fee Receipts & Billing History
                      </h3>
                    </div>
                    <span className="text-xs text-zinc-400">
                      {memberTxns.length} records
                    </span>
                  </div>

                  {memberTxns.length > 0 ? (
                    <div className="space-y-2">
                      {memberTxns.map((txn) => (
                        <div
                          key={txn.id}
                          className="p-3.5 rounded-2xl bg-zinc-950 border border-zinc-800 flex items-center justify-between text-xs"
                        >
                          <div>
                            <p className="font-bold text-white">{txn.planName}</p>
                            <p className="font-mono text-[10px] text-zinc-400">
                              {txn.invoiceNumber} • {txn.date}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="font-bold text-green-400 text-sm">
                              ₹{txn.totalAmount.toLocaleString('en-IN')}
                            </p>
                            <span className="text-[9px] text-zinc-500 font-mono uppercase">
                              {txn.paymentMode} ({txn.status})
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="p-4 text-center text-zinc-500 text-xs">
                      No invoices recorded under this profile yet.
                    </div>
                  )}
                </div>

                {/* Emergency Contact Summary */}
                <div className="rounded-3xl bg-zinc-900/80 border border-zinc-800 p-5 flex items-center justify-between text-xs">
                  <div className="space-y-0.5">
                    <p className="text-[10px] text-zinc-500 font-bold uppercase">Emergency Contact on File</p>
                    <p className="font-bold text-white">{activeMember.emergencyContact.name} ({activeMember.emergencyContact.relationship})</p>
                    <p className="text-[11px] text-zinc-400">{activeMember.emergencyContact.phone}</p>
                  </div>
                  <a
                    href={`tel:${activeMember.emergencyContact.phone}`}
                    className="px-3 py-1.5 rounded-xl bg-zinc-800 text-orange-400 hover:text-white text-xs font-semibold"
                  >
                    Call Contact
                  </a>
                </div>

              </div>

            </div>

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
