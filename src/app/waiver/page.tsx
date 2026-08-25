'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  FileSignature, 
  User, 
  GraduationCap, 
  Search, 
  ShieldCheck, 
  Flame, 
  QrCode, 
  ArrowLeft,
  CheckCircle2,
  AlertTriangle
} from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import AdultWaiverForm from '@/components/waiver/AdultWaiverForm';
import MinorParentWaiverForm from '@/components/waiver/MinorParentWaiverForm';
import WaiverCertificateModal from '@/components/waiver/WaiverCertificateModal';
import { WaiverDocument } from '@/lib/types';
import { getWaivers, getWaiverById } from '@/lib/dataStore';

export default function WaiverPage() {
  const [activeTab, setActiveTab] = useState<'ADULT' | 'MINOR' | 'LOOKUP'>('ADULT');
  const [completedWaiver, setCompletedWaiver] = useState<WaiverDocument | null>(null);
  const [isCertModalOpen, setIsCertModalOpen] = useState(false);

  // Lookup state
  const [lookupQuery, setLookupQuery] = useState('');
  const [lookupResult, setLookupResult] = useState<WaiverDocument | null>(null);
  const [lookupAttempted, setLookupAttempted] = useState(false);

  const handleWaiverSuccess = (waiver: WaiverDocument) => {
    setCompletedWaiver(waiver);
    setIsCertModalOpen(true);
  };

  const handleLookup = (e: React.FormEvent) => {
    e.preventDefault();
    setLookupAttempted(true);
    if (!lookupQuery.trim()) return;

    const all = getWaivers();
    const queryClean = lookupQuery.trim().toLowerCase();
    const phoneClean = lookupQuery.replace(/\D/g, '');

    const found = all.find((w) => 
      w.verificationId.toLowerCase() === queryClean ||
      (phoneClean.length >= 6 && w.signerPhone.replace(/\D/g, '').includes(phoneClean)) ||
      w.participantName.toLowerCase().includes(queryClean) ||
      w.signerName.toLowerCase().includes(queryClean)
    );

    setLookupResult(found || null);
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-white flex flex-col justify-between selection:bg-orange-500 selection:text-white">
      <Navbar />

      <main className="flex-1 pt-28 pb-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto w-full space-y-8">
        
        {/* Top Breadcrumb & Kiosk Link */}
        <div className="flex items-center justify-between">
          <Link
            href="/"
            className="text-xs text-zinc-400 hover:text-orange-400 flex items-center gap-1 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Academy Home</span>
          </Link>

          <Link
            href="/waiver/qr"
            className="text-xs font-bold px-3 py-1.5 rounded-xl bg-orange-950/40 text-orange-400 border border-orange-500/30 hover:bg-orange-900/40 flex items-center gap-1.5 transition-all"
          >
            <QrCode className="w-3.5 h-3.5" />
            <span>Front-Desk QR Standee View</span>
          </Link>
        </div>

        {/* Page Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-xs font-bold uppercase tracking-wider">
            <FileSignature className="w-4 h-4" />
            Official Academy Clearance
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
            Digital Legal Liability & Medical Waiver
          </h1>
          <p className="text-zinc-400 text-xs sm:text-sm max-w-2xl mx-auto">
            Mandatory clearance required for all adult athletes, youth students, and trial visitors prior to stepping onto the combat mats or inside the cage.
          </p>
        </div>

        {/* Form Selector Tabs */}
        <div className="grid grid-cols-3 gap-2 p-1.5 rounded-2xl bg-zinc-900 border border-zinc-800">
          <button
            onClick={() => setActiveTab('ADULT')}
            className={`py-3 rounded-xl font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer ${
              activeTab === 'ADULT'
                ? 'bg-gradient-to-r from-orange-500 to-red-600 text-white shadow-lg shadow-orange-500/25'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            <User className="w-4 h-4" />
            <span className="hidden sm:inline">Adult Waiver</span> (18+)
          </button>

          <button
            onClick={() => setActiveTab('MINOR')}
            className={`py-3 rounded-xl font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer ${
              activeTab === 'MINOR'
                ? 'bg-gradient-to-r from-orange-500 to-amber-600 text-white shadow-lg shadow-orange-500/25'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            <GraduationCap className="w-4 h-4" />
            <span className="hidden sm:inline">Minor / Parent</span> (&lt;18)
          </button>

          <button
            onClick={() => setActiveTab('LOOKUP')}
            className={`py-3 rounded-xl font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer ${
              activeTab === 'LOOKUP'
                ? 'bg-zinc-800 text-white border border-zinc-700 shadow-md'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            <Search className="w-4 h-4" />
            <span>Lookup Pass</span>
          </button>
        </div>

        {/* Form Container */}
        <div className="rounded-3xl bg-zinc-900/80 border border-zinc-800 p-6 sm:p-10 shadow-2xl relative">
          {activeTab === 'ADULT' && (
            <AdultWaiverForm onSuccess={handleWaiverSuccess} />
          )}

          {activeTab === 'MINOR' && (
            <MinorParentWaiverForm onSuccess={handleWaiverSuccess} />
          )}

          {activeTab === 'LOOKUP' && (
            <div className="space-y-6">
              <div className="space-y-2">
                <h3 className="text-lg font-bold text-white">
                  Find & Verify Signed Waiver Certificate
                </h3>
                <p className="text-xs text-zinc-400">
                  Search by your Verification ID (e.g. <span className="font-mono text-orange-400">TNT-WVR-2026-1048</span>), mobile number, or participant name.
                </p>
              </div>

              <form onSubmit={handleLookup} className="flex gap-2">
                <input
                  type="text"
                  placeholder="Enter Phone Number or Verification ID..."
                  value={lookupQuery}
                  onChange={(e) => setLookupQuery(e.target.value)}
                  className="flex-1 px-4 py-3 rounded-xl bg-zinc-950 border border-zinc-800 focus:border-orange-500 text-white text-xs outline-none"
                />
                <button
                  type="submit"
                  className="px-6 py-3 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer"
                >
                  Search
                </button>
              </form>

              {lookupAttempted && (
                <div className="pt-4">
                  {lookupResult ? (
                    <div className="p-5 rounded-2xl bg-zinc-950 border border-green-500/40 space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <CheckCircle2 className="w-5 h-5 text-green-400" />
                          <div>
                            <p className="font-bold text-white text-sm">
                              {lookupResult.participantName} ({lookupResult.type} Waiver)
                            </p>
                            <p className="text-[11px] font-mono text-orange-400">
                              ID: {lookupResult.verificationId}
                            </p>
                          </div>
                        </div>
                        <span className="px-2.5 py-1 rounded bg-green-500/10 text-green-400 text-[10px] font-bold border border-green-500/30">
                          VERIFIED & ACTIVE
                        </span>
                      </div>

                      <div className="grid grid-cols-2 gap-2 text-xs text-zinc-400 pt-2 border-t border-zinc-800">
                        <p>Signer: <strong className="text-zinc-200">{lookupResult.signerName}</strong></p>
                        <p>Phone: <strong className="text-zinc-200">{lookupResult.signerPhone}</strong></p>
                        <p>Signed: <strong className="text-zinc-200">{new Date(lookupResult.signedAt).toLocaleDateString('en-IN')}</strong></p>
                        <p>Emergency: <strong className="text-zinc-200">{lookupResult.emergencyContactPhone}</strong></p>
                      </div>

                      <button
                        onClick={() => {
                          setCompletedWaiver(lookupResult);
                          setIsCertModalOpen(true);
                        }}
                        className="w-full py-2.5 rounded-xl bg-zinc-800 hover:bg-orange-500 text-white font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer"
                      >
                        View & Print Official Signed Certificate →
                      </button>
                    </div>
                  ) : (
                    <div className="p-6 rounded-2xl bg-zinc-950 border border-zinc-800 text-center space-y-2 text-xs text-zinc-400">
                      <AlertTriangle className="w-6 h-6 text-amber-400 mx-auto" />
                      <p className="font-bold text-white">No Matching Signed Waiver Found</p>
                      <p>
                        No active waiver was found matching &ldquo;{lookupQuery}&rdquo;. Please submit a new waiver form above.
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>

      </main>

      {/* Official Certificate Modal */}
      <WaiverCertificateModal
        waiver={completedWaiver}
        isOpen={isCertModalOpen}
        onClose={() => setIsCertModalOpen(false)}
      />

      <Footer />
    </div>
  );
}
