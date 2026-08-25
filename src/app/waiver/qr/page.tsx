'use client';

import React from 'react';
import Link from 'next/link';
import { 
  Flame, 
  QrCode, 
  FileSignature, 
  ShieldCheck, 
  ArrowLeft, 
  Printer, 
  Sparkles,
  Smartphone
} from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';

export default function WaiverQrStandeePage() {
  const currentUrl = typeof window !== 'undefined' 
    ? `${window.location.origin}/waiver` 
    : 'https://tntmma.thewebvale.com/waiver';

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-white flex flex-col items-center justify-center p-4 sm:p-8">
      
      {/* Navigation Top Controls (Hidden on print) */}
      <div className="max-w-md w-full flex items-center justify-between mb-6 no-print">
        <Link
          href="/waiver"
          className="text-xs text-zinc-400 hover:text-orange-400 flex items-center gap-1 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Waiver Portal</span>
        </Link>

        <button
          onClick={handlePrint}
          className="px-3.5 py-1.5 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs flex items-center gap-1.5 shadow-md cursor-pointer transition-colors"
        >
          <Printer className="w-3.5 h-3.5" />
          <span>Print Reception Standee</span>
        </button>
      </div>

      {/* Printable High-Impact Standee Poster Card */}
      <div className="max-w-md w-full rounded-3xl bg-gradient-to-b from-zinc-900 via-zinc-900 to-black border-2 border-orange-500/60 p-8 text-center space-y-7 shadow-2xl relative overflow-hidden print:border-4 print:border-black print:p-6 print:m-0">
        
        {/* Glow Element (Screen only) */}
        <div className="absolute -top-16 left-1/2 -translate-x-1/2 w-48 h-48 bg-orange-500/20 rounded-full blur-[80px] pointer-events-none no-print" />

        {/* Standee Header */}
        <div className="space-y-3 relative z-10">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center mx-auto shadow-lg shadow-orange-500/30">
            <Flame className="w-8 h-8 text-white" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white uppercase">
              TNT MMA ACADEMY
            </h1>
            <p className="text-xs font-bold text-orange-400 tracking-widest uppercase mt-0.5">
              Bhopal Front Desk Kiosk
            </p>
          </div>
        </div>

        {/* Action Title */}
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-orange-500/20 text-orange-400 text-[11px] font-bold uppercase tracking-wider border border-orange-500/30">
            <FileSignature className="w-3.5 h-3.5" />
            Mandatory Mat Clearance
          </div>
          <h2 className="text-xl font-extrabold text-white">
            Scan to Sign Digital Waiver
          </h2>
          <p className="text-xs text-zinc-400 max-w-xs mx-auto">
            Point your phone camera below to sign the liability waiver & health consent in 30 seconds.
          </p>
        </div>

        {/* QR Code Container */}
        <div className="p-5 rounded-3xl bg-white text-black inline-block shadow-2xl mx-auto border-4 border-orange-500">
          <QRCodeSVG
            value={currentUrl}
            size={190}
            level="H"
            includeMargin={true}
          />
        </div>

        {/* Instructions */}
        <div className="grid grid-cols-2 gap-3 text-left text-xs bg-zinc-950 p-4 rounded-2xl border border-zinc-800">
          <div className="flex items-start gap-2">
            <Smartphone className="w-4 h-4 text-orange-400 shrink-0 mt-0.5" />
            <span className="text-zinc-300 text-[11px]">
              <strong className="text-white block">Step 1:</strong> Scan QR code with phone camera
            </span>
          </div>
          <div className="flex items-start gap-2">
            <ShieldCheck className="w-4 h-4 text-green-400 shrink-0 mt-0.5" />
            <span className="text-zinc-300 text-[11px]">
              <strong className="text-white block">Step 2:</strong> Sign canvas & show coach
            </span>
          </div>
        </div>

        {/* Standee Footer */}
        <div className="pt-2 border-t border-zinc-800 text-[10px] text-zinc-500 font-mono">
          <p>Ayodhya Nagar & Govind Garden Facilities • Tel: +91 97132 17866</p>
          <p className="text-orange-400/80 font-bold mt-0.5">tntmma.thewebvale.com/waiver</p>
        </div>

      </div>

    </div>
  );
}
