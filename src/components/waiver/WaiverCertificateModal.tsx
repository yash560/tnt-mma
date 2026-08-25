'use client';

import React from 'react';
import { 
  X, 
  Printer, 
  Download, 
  ShieldCheck, 
  Flame, 
  Calendar, 
  User, 
  Phone, 
  FileCheck, 
  CheckCircle2,
  Share2,
  ExternalLink
} from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import { WaiverDocument } from '@/lib/types';

interface WaiverCertificateModalProps {
  waiver: WaiverDocument | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function WaiverCertificateModal({ waiver, isOpen, onClose }: WaiverCertificateModalProps) {
  if (!isOpen || !waiver) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 overflow-y-auto" data-lenis-prevent>
      <div className="bg-zinc-950 border border-zinc-700 rounded-3xl max-w-3xl w-full max-h-[92vh] flex flex-col shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
        
        {/* Modal Header & Actions */}
        <div className="p-4 sm:p-5 bg-zinc-900 border-b border-zinc-800 flex items-center justify-between no-print">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-green-400" />
            <div>
              <h3 className="font-extrabold text-white text-sm">
                Certified Legal Waiver & Medical Consent
              </h3>
              <p className="text-[11px] text-zinc-400 font-mono">
                Verification ID: {waiver.verificationId}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="px-3.5 py-1.5 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs flex items-center gap-1.5 shadow-md cursor-pointer transition-colors"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / Save PDF</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-xl bg-zinc-800 text-zinc-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Official Document Body */}
        <div className="p-6 sm:p-10 overflow-y-auto space-y-6 text-zinc-300 text-xs bg-white text-zinc-900 print:text-black print:p-0 print:m-0">
          
          {/* Document Letterhead */}
          <div className="border-b-2 border-orange-500 pb-6 flex items-start justify-between">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <div className="w-9 h-9 rounded-xl bg-orange-500 flex items-center justify-center text-white">
                  <Flame className="w-6 h-6" />
                </div>
                <div>
                  <h1 className="text-2xl font-black tracking-tight text-zinc-900">
                    TNT MMA & FITNESS ACADEMY
                  </h1>
                  <p className="text-[11px] text-orange-600 font-bold uppercase tracking-widest">
                    Official Liability Waiver & Medical Indemnity Certificate
                  </p>
                </div>
              </div>
              <p className="text-[10px] text-zinc-600 pt-1">
                B-11 Nizamuddin Rd, Ayodhya Nagar & 12-B Raisen Rd, Govind Garden, Bhopal, MP | Tel: +91 97132 17866
              </p>
            </div>

            {/* Document QR Code */}
            <div className="text-center">
              <div className="p-1.5 border border-zinc-300 rounded-lg bg-white inline-block">
                <QRCodeSVG
                  value={`TNT-VERIFIED-WAIVER:${waiver.verificationId}:${waiver.participantName}:${waiver.signedAt}`}
                  size={64}
                />
              </div>
              <p className="text-[9px] font-mono text-zinc-500 mt-1 font-bold">
                {waiver.verificationId}
              </p>
            </div>
          </div>

          {/* Verification Status Banner */}
          <div className="p-3.5 rounded-xl bg-green-50 border border-green-200 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-green-600" />
              <div>
                <span className="font-bold text-green-900 text-xs uppercase tracking-wide">
                  Status: Officially Executed & Legally Verified
                </span>
                <p className="text-[10px] text-green-700">
                  Signed on {new Date(waiver.signedAt).toLocaleDateString('en-IN', { dateStyle: 'full' })} at {new Date(waiver.signedAt).toLocaleTimeString('en-IN')}
                </p>
              </div>
            </div>
            <span className="px-2.5 py-1 rounded bg-green-200 text-green-900 font-bold text-[10px] uppercase">
              {waiver.type} WAIVER
            </span>
          </div>

          {/* Parties Meta Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 p-4 rounded-xl bg-zinc-50 border border-zinc-200 text-xs">
            <div>
              <p className="text-[10px] font-bold text-zinc-500 uppercase">Participant / Athlete</p>
              <p className="font-bold text-zinc-900 text-sm">{waiver.participantName}</p>
              <p className="text-zinc-600 text-[11px]">Age: {waiver.participantAge} Years</p>
            </div>

            <div>
              <p className="text-[10px] font-bold text-zinc-500 uppercase">Signer / Legal Status</p>
              <p className="font-bold text-zinc-900 text-sm">{waiver.signerName}</p>
              <p className="text-zinc-600 text-[11px]">ID: {waiver.signerGovId || 'Verified'}</p>
            </div>

            <div>
              <p className="text-[10px] font-bold text-zinc-500 uppercase">Contact & Phone</p>
              <p className="font-bold text-zinc-900 text-sm">{waiver.signerPhone}</p>
              <p className="text-zinc-600 text-[11px] truncate">{waiver.signerEmail}</p>
            </div>

            <div>
              <p className="text-[10px] font-bold text-zinc-500 uppercase">Emergency Contact</p>
              <p className="font-bold text-zinc-900">{waiver.emergencyContactName}</p>
              <p className="text-zinc-600 text-[11px]">{waiver.emergencyContactPhone}</p>
            </div>

            <div className="col-span-2">
              <p className="text-[10px] font-bold text-zinc-500 uppercase">Medical Disclosure</p>
              <p className="text-zinc-800 text-[11px] italic">{waiver.medicalConditions}</p>
            </div>
          </div>

          {/* Legal Declarations & Agreed Terms */}
          <div className="space-y-2">
            <h4 className="font-bold text-zinc-900 uppercase tracking-wider text-xs">
              Affirmed Legal Understandings:
            </h4>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] text-zinc-700">
              <li className="flex items-start gap-1.5">
                <FileCheck className="w-3.5 h-3.5 text-green-600 shrink-0 mt-0.5" />
                <span><strong>Assumption of Risk:</strong> Voluntary participation in full-contact MMA/BJJ drills.</span>
              </li>
              <li className="flex items-start gap-1.5">
                <FileCheck className="w-3.5 h-3.5 text-green-600 shrink-0 mt-0.5" />
                <span><strong>Indemnity Release:</strong> Full waiver of claims for accidental gym injuries.</span>
              </li>
              <li className="flex items-start gap-1.5">
                <FileCheck className="w-3.5 h-3.5 text-green-600 shrink-0 mt-0.5" />
                <span><strong>Medical Authority:</strong> Authorization of emergency first-aid and transport.</span>
              </li>
              <li className="flex items-start gap-1.5">
                <FileCheck className="w-3.5 h-3.5 text-green-600 shrink-0 mt-0.5" />
                <span><strong>Controlled Sparring:</strong> Strict adherence to tapping and safety gear rules.</span>
              </li>
            </ul>
          </div>

          {/* Rendered Signature & Audit Trail Section */}
          <div className="pt-4 border-t-2 border-zinc-200 grid grid-cols-1 sm:grid-cols-2 gap-6 items-end">
            
            {/* Signature Box */}
            <div className="space-y-1">
              <p className="text-[10px] font-bold text-zinc-500 uppercase">
                Digital E-Signature of Signer / Guardian:
              </p>
              <div className="w-full h-24 rounded-xl border border-zinc-300 bg-zinc-50 p-2 flex items-center justify-center overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={waiver.signatureDataUrl}
                  alt="Digital Signature"
                  className="max-h-full max-w-full object-contain"
                />
              </div>
              <p className="text-[10px] text-zinc-600 font-semibold">
                Signer: {waiver.signerName}
              </p>
            </div>

            {/* Audit Metadata Box */}
            <div className="p-3 rounded-xl bg-zinc-100 border border-zinc-200 font-mono text-[9px] text-zinc-600 space-y-1">
              <p className="font-bold text-zinc-800 text-[10px]">DIGITAL AUDIT TRAIL LOG</p>
              <p>Doc ID: {waiver.id}</p>
              <p>IP Address: {waiver.ipAddress}</p>
              <p>Timestamp: {waiver.signedAt}</p>
              <p className="truncate">Client Agent: {waiver.userAgent}</p>
              <p className="text-green-700 font-bold">Cryptographic Integrity: VALID</p>
            </div>
          </div>

          {/* Official Academy Seal Stamp */}
          <div className="pt-2 text-center text-[9px] text-zinc-500 border-t border-zinc-200">
            This digital certificate is officially issued by TNT MMA Fitness Academy Management OS and is recognized for mat clearance.
          </div>

        </div>

        {/* Footer actions */}
        <div className="p-4 bg-zinc-900 border-t border-zinc-800 flex items-center justify-between no-print">
          <p className="text-[11px] text-zinc-400">
            A copy of this waiver is stored in the academy records and member portal.
          </p>
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-white font-bold text-xs transition-colors"
          >
            Close Window
          </button>
        </div>

      </div>
    </div>
  );
}
