'use client';

import React, { useState } from 'react';
import { 
  X, 
  Sparkles, 
  Flame, 
  Calendar, 
  Clock, 
  MapPin, 
  Phone, 
  CheckCircle2, 
  Download, 
  Share2,
  FileSignature
} from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import confetti from 'canvas-confetti';
import { saveTrialBooking, saveEnquiryLead } from '@/lib/dataStore';
import { TrialBooking, DisciplineType } from '@/lib/types';
import Link from 'next/link';

interface FreeTrialModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultDiscipline?: string;
}

export default function FreeTrialModal({ isOpen, onClose, defaultDiscipline }: FreeTrialModalProps) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [discipline, setDiscipline] = useState<DisciplineType>('MMA');
  const [preferredDate, setPreferredDate] = useState(() => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  });
  const [preferredTime, setPreferredTime] = useState('06:00 PM - 07:30 PM');
  const [branch, setBranch] = useState<'Nizamuddin Road (Ayodhya Nagar)' | 'Govind Garden (Raisen Road)'>('Nizamuddin Road (Ayodhya Nagar)');
  
  const [generatedPass, setGeneratedPass] = useState<TrialBooking | null>(null);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone) return;

    const passId = `TNT-PASS-${Math.floor(1000 + Math.random() * 9000)}`;
    const newBooking: TrialBooking = {
      id: `trial-${Date.now()}`,
      bookingPassId: passId,
      name,
      phone,
      email: email || `${name.toLowerCase().replace(/\s+/g, '')}@gmail.com`,
      discipline,
      preferredDate,
      preferredTime,
      branch,
      status: 'CONFIRMED',
      createdAt: new Date().toISOString(),
    };

    saveTrialBooking(newBooking);
    
    // Also save directly into CRM Leads pipeline for Coach / Admin
    saveEnquiryLead({
      id: `lead-trial-${Date.now()}`,
      name,
      phone,
      email: email || `${name.toLowerCase().replace(/\s+/g, '')}@gmail.com`,
      source: 'FREE_TRIAL',
      status: 'HOT',
      interestDiscipline: discipline,
      preferredBatch: preferredTime.includes('06:00 PM') ? 'EVENING' : 'MORNING',
      notes: `Claimed 1-Day Free Trial Pass (${passId}) for ${preferredDate} at ${branch}.`,
      followUpDate: preferredDate,
      assignedCoach: 'Coach Vikalp',
      createdAt: new Date().toISOString().split('T')[0],
    });

    setGeneratedPass(newBooking);

    // Fire Confetti
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
    });
  };

  const handlePrintOrDownload = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto" data-lenis-prevent>
      <div className="bg-zinc-950 border border-zinc-700/80 rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl relative animate-in zoom-in-95 duration-200">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl bg-zinc-900 text-zinc-400 hover:text-white border border-zinc-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {!generatedPass ? (
          /* Form Step */
          <div className="space-y-6">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/30 text-orange-400 text-xs font-bold uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5" />
                1-Day Free Fighter Pass
              </div>
              <h3 className="text-2xl font-black text-white">
                Claim Your Free Mat Trial
              </h3>
              <p className="text-xs text-zinc-400">
                Experience world-class coaching firsthand. Fill your details to generate your digital boarding pass instantly.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div className="space-y-1.5">
                <label className="font-bold text-zinc-300">Your Full Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Rahul Sen / Parent Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-zinc-900 border border-zinc-800 focus:border-orange-500 text-white placeholder-zinc-500 outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="font-bold text-zinc-300">WhatsApp / Mobile *</label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 98260 XXXXX"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-zinc-900 border border-zinc-800 focus:border-orange-500 text-white placeholder-zinc-500 outline-none"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="font-bold text-zinc-300">Email Address (Optional)</label>
                  <input
                    type="email"
                    placeholder="name@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-zinc-900 border border-zinc-800 focus:border-orange-500 text-white placeholder-zinc-500 outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="font-bold text-zinc-300">Discipline</label>
                  <select
                    value={discipline}
                    onChange={(e) => setDiscipline(e.target.value as DisciplineType)}
                    className="w-full px-4 py-3 rounded-xl bg-zinc-900 border border-zinc-800 focus:border-orange-500 text-white outline-none"
                  >
                    <option value="MMA">Mixed Martial Arts (MMA)</option>
                    <option value="BJJ">Brazilian Jiu-Jitsu (BJJ)</option>
                    <option value="KICKBOXING">Muay Thai Kickboxing</option>
                    <option value="CROSSFIT">CrossFit & Conditioning</option>
                    <option value="CALISTHENICS">Calisthenics & Stunts</option>
                    <option value="KIDS_MMA">Kids MMA & Self-Defense</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="font-bold text-zinc-300">Preferred Branch</label>
                  <select
                    value={branch}
                    onChange={(e) => setBranch(e.target.value as any)}
                    className="w-full px-4 py-3 rounded-xl bg-zinc-900 border border-zinc-800 focus:border-orange-500 text-white outline-none"
                  >
                    <option value="Nizamuddin Road (Ayodhya Nagar)">Ayodhya Nagar (Nizamuddin Rd)</option>
                    <option value="Govind Garden (Raisen Road)">Govind Garden (Raisen Rd)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="font-bold text-zinc-300">Preferred Date</label>
                  <input
                    type="date"
                    value={preferredDate}
                    onChange={(e) => setPreferredDate(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-zinc-900 border border-zinc-800 focus:border-orange-500 text-white outline-none"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="font-bold text-zinc-300">Time Slot</label>
                  <select
                    value={preferredTime}
                    onChange={(e) => setPreferredTime(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-zinc-900 border border-zinc-800 focus:border-orange-500 text-white outline-none"
                  >
                    <option value="06:00 AM - 07:30 AM">Morning 06:00 AM - 07:30 AM</option>
                    <option value="07:30 AM - 09:00 AM">Morning 07:30 AM - 09:00 AM</option>
                    <option value="04:00 PM - 05:30 PM (Kids)">Kids Batch 04:00 PM - 05:30 PM</option>
                    <option value="06:00 PM - 07:30 PM">Evening 06:00 PM - 07:30 PM</option>
                    <option value="07:30 PM - 09:00 PM">Evening 07:30 PM - 09:00 PM</option>
                  </select>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-4 rounded-xl bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white font-extrabold text-sm uppercase tracking-wider shadow-lg shadow-orange-500/30 transition-all cursor-pointer"
              >
                Generate My Free Fighter Pass
              </button>
            </form>
          </div>
        ) : (
          /* Generated Digital Boarding Pass Step */
          <div className="space-y-6 text-center">
            <div className="space-y-2">
              <div className="w-12 h-12 rounded-2xl bg-green-500/20 border border-green-500/40 text-green-400 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-7 h-7" />
              </div>
              <h3 className="text-2xl font-black text-white">Trial Pass Confirmed!</h3>
              <p className="text-xs text-zinc-400">
                Your digital 1-day pass is ready. Please present this QR code or Pass ID at the front desk when you arrive.
              </p>
            </div>

            {/* Visual Boarding Pass */}
            <div className="rounded-2xl bg-gradient-to-b from-zinc-900 via-orange-950/30 to-zinc-900 border-2 border-orange-500/60 p-6 space-y-5 text-left relative overflow-hidden shadow-2xl">
              {/* Pass Header */}
              <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-orange-500 flex items-center justify-center text-white">
                    <Flame className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-extrabold text-white text-sm">TNT MMA BHOPAL</h4>
                    <p className="text-[10px] text-orange-400 font-mono">1-DAY FREE MAT PASS</p>
                  </div>
                </div>
                <span className="font-mono text-xs font-bold text-amber-400 bg-amber-500/10 px-2 py-1 rounded border border-amber-500/30">
                  {generatedPass.bookingPassId}
                </span>
              </div>

              {/* Pass Details */}
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div>
                  <p className="text-zinc-500 font-bold uppercase text-[10px]">Fighter / Guest</p>
                  <p className="font-bold text-white text-sm">{generatedPass.name}</p>
                  <p className="text-zinc-400 text-[11px]">{generatedPass.phone}</p>
                </div>
                <div>
                  <p className="text-zinc-500 font-bold uppercase text-[10px]">Discipline</p>
                  <p className="font-bold text-orange-400 text-sm">{generatedPass.discipline}</p>
                </div>
                <div>
                  <p className="text-zinc-500 font-bold uppercase text-[10px]">Date & Time</p>
                  <p className="font-bold text-white">{generatedPass.preferredDate}</p>
                  <p className="text-zinc-400 text-[11px]">{generatedPass.preferredTime}</p>
                </div>
                <div>
                  <p className="text-zinc-500 font-bold uppercase text-[10px]">Branch Location</p>
                  <p className="font-bold text-white text-[11px] leading-tight">{generatedPass.branch}</p>
                </div>
              </div>

              {/* QR Code Center */}
              <div className="pt-3 border-t border-zinc-800 flex items-center justify-between">
                <div className="space-y-1">
                  <p className="text-[10px] text-zinc-400 font-medium">
                    Show at Front Desk for instant verification.
                  </p>
                  <p className="text-[10px] text-orange-400 font-semibold">
                    Coach: Coach Vikalp
                  </p>
                </div>
                <div className="p-2 rounded-xl bg-white">
                  <QRCodeSVG 
                    value={`TNT-MMA-TRIAL:${generatedPass.bookingPassId}:${generatedPass.name}:${generatedPass.discipline}`}
                    size={72}
                  />
                </div>
              </div>
            </div>

            {/* Next Steps: Sign Waiver Banner */}
            <div className="p-4 rounded-xl bg-orange-950/40 border border-orange-500/30 text-xs text-left space-y-2">
              <p className="font-bold text-orange-300 flex items-center gap-1.5">
                <FileSignature className="w-4 h-4 text-orange-400" />
                Mandatory Safety Step:
              </p>
              <p className="text-zinc-300 text-[11px]">
                To save time at the gym, you can sign the mandatory digital safety waiver right now from your phone before coming in.
              </p>
              <Link
                href="/waiver"
                onClick={onClose}
                className="inline-block py-1.5 px-3 rounded-lg bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs"
              >
                Sign Digital Waiver Now →
              </Link>
            </div>

            {/* Pass Actions */}
            <div className="flex gap-3">
              <button
                onClick={handlePrintOrDownload}
                className="flex-1 py-3 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-200 font-bold text-xs flex items-center justify-center gap-2 border border-zinc-700 cursor-pointer"
              >
                <Download className="w-4 h-4" />
                <span>Save / Print Pass</span>
              </button>
              <button
                onClick={onClose}
                className="flex-1 py-3 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs cursor-pointer"
              >
                Done
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
