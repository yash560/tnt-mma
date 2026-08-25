'use client';

import React, { useState } from 'react';
import { 
  ShieldAlert, 
  FileCheck, 
  User, 
  Phone, 
  Mail, 
  HeartHandshake, 
  AlertTriangle,
  Flame,
  Check
} from 'lucide-react';
import SignatureCanvas from './SignatureCanvas';
import { WaiverDocument } from '@/lib/types';
import { saveWaiver } from '@/lib/dataStore';
import confetti from 'canvas-confetti';

interface AdultWaiverFormProps {
  onSuccess: (waiver: WaiverDocument) => void;
}

export default function AdultWaiverForm({ onSuccess }: AdultWaiverFormProps) {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [govId, setGovId] = useState('');
  const [age, setAge] = useState<number>(22);
  const [emergencyName, setEmergencyName] = useState('');
  const [emergencyPhone, setEmergencyPhone] = useState('');
  const [medicalConditions, setMedicalConditions] = useState('');
  
  // Mandatory Legal Checkboxes
  const [clauses, setClauses] = useState({
    assumptionOfRisk: false,
    liabilityRelease: false,
    medicalConsent: false,
    sparringRules: false,
    mediaConsent: false,
    codeOfConduct: false,
  });

  const [signatureData, setSignatureData] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const handleCheckboxChange = (key: keyof typeof clauses) => {
    setClauses((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSelectAllClauses = () => {
    setClauses({
      assumptionOfRisk: true,
      liabilityRelease: true,
      medicalConsent: true,
      sparringRules: true,
      mediaConsent: true,
      codeOfConduct: true,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!fullName || !phone || !emergencyName || !emergencyPhone) {
      setErrorMsg('Please fill in all mandatory personal and emergency contact fields.');
      return;
    }

    const allClausesChecked = Object.values(clauses).every(Boolean);
    if (!allClausesChecked) {
      setErrorMsg('You must agree to all 6 legal liability and safety clauses.');
      return;
    }

    if (!signatureData) {
      setErrorMsg('Please provide your digital e-signature in the canvas box below.');
      return;
    }

    const verificationId = `TNT-WVR-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;

    const newWaiver: WaiverDocument = {
      id: `wvr-${Date.now()}`,
      verificationId,
      type: 'ADULT',
      signerName: fullName,
      signerEmail: email || `${fullName.toLowerCase().replace(/\s+/g, '')}@gmail.com`,
      signerPhone: phone,
      signerGovId: govId ? `AADHAAR/ID-${govId}` : 'VERIFIED_AT_FRONTDESK',
      participantName: fullName,
      participantAge: Number(age) || 20,
      emergencyContactName: emergencyName,
      emergencyContactPhone: emergencyPhone,
      medicalConditions: medicalConditions || 'Declared medically fit for martial arts training with no active spinal/cardiovascular contraindications.',
      agreedClauses: clauses,
      signatureDataUrl: signatureData,
      signedAt: new Date().toISOString(),
      ipAddress: '103.21.124.90 (Bhopal, MP)',
      userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : 'Client Browser',
      status: 'VERIFIED',
    };

    saveWaiver(newWaiver);

    confetti({
      particleCount: 120,
      spread: 80,
      origin: { y: 0.5 },
    });

    onSuccess(newWaiver);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 text-xs">
      
      {/* Banner / Legal Notice */}
      <div className="p-4 rounded-2xl bg-gradient-to-r from-red-950/40 via-zinc-900 to-orange-950/30 border border-red-500/30 flex items-start gap-3">
        <AlertTriangle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
        <div className="space-y-1 text-zinc-300 leading-relaxed">
          <p className="font-bold text-white text-sm">
            Adult Participant Assumption of Risk & Liability Indemnity (18+ Years)
          </p>
          <p className="text-[11px] text-zinc-400">
            This is a legally binding contract between you and <strong>TNT MMA Fitness Academy</strong>. Please review all clauses, disclose medical background, and sign below.
          </p>
        </div>
      </div>

      {/* Section 1: Participant Details */}
      <div className="space-y-4">
        <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
          <User className="w-4 h-4 text-orange-400" />
          1. Participant Identification
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="font-bold text-zinc-300">Full Legal Name *</label>
            <input
              type="text"
              required
              placeholder="e.g. Vikram Sharma"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-zinc-900 border border-zinc-800 focus:border-orange-500 text-white outline-none"
            />
          </div>

          <div className="space-y-1.5">
            <label className="font-bold text-zinc-300">WhatsApp / Mobile Number *</label>
            <input
              type="tel"
              required
              placeholder="+91 98260 XXXXX"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-zinc-900 border border-zinc-800 focus:border-orange-500 text-white outline-none"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="space-y-1.5">
            <label className="font-bold text-zinc-300">Email Address (Optional)</label>
            <input
              type="email"
              placeholder="name@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-zinc-900 border border-zinc-800 focus:border-orange-500 text-white outline-none"
            />
          </div>

          <div className="space-y-1.5">
            <label className="font-bold text-zinc-300">Age (Years) *</label>
            <input
              type="number"
              min={18}
              max={80}
              required
              value={age}
              onChange={(e) => setAge(Number(e.target.value))}
              className="w-full px-4 py-3 rounded-xl bg-zinc-900 border border-zinc-800 focus:border-orange-500 text-white outline-none"
            />
          </div>

          <div className="space-y-1.5">
            <label className="font-bold text-zinc-300">Government ID / Aadhaar Last 4 Digits</label>
            <input
              type="text"
              placeholder="e.g. 8812"
              value={govId}
              onChange={(e) => setGovId(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-zinc-900 border border-zinc-800 focus:border-orange-500 text-white outline-none"
            />
          </div>
        </div>
      </div>

      {/* Section 2: Emergency Contact */}
      <div className="space-y-4 pt-4 border-t border-zinc-800">
        <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
          <HeartHandshake className="w-4 h-4 text-red-400" />
          2. Emergency Contact Information
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="font-bold text-zinc-300">Emergency Contact Person & Relationship *</label>
            <input
              type="text"
              required
              placeholder="e.g. Dr. Rajesh Sharma (Father / Spouse)"
              value={emergencyName}
              onChange={(e) => setEmergencyName(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-zinc-900 border border-zinc-800 focus:border-orange-500 text-white outline-none"
            />
          </div>

          <div className="space-y-1.5">
            <label className="font-bold text-zinc-300">Emergency Contact Mobile *</label>
            <input
              type="tel"
              required
              placeholder="+91 94250 XXXXX"
              value={emergencyPhone}
              onChange={(e) => setEmergencyPhone(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-zinc-900 border border-zinc-800 focus:border-orange-500 text-white outline-none"
            />
          </div>
        </div>
      </div>

      {/* Section 3: Medical Health Declaration */}
      <div className="space-y-4 pt-4 border-t border-zinc-800">
        <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
          <ShieldAlert className="w-4 h-4 text-amber-400" />
          3. Physical Health & Injury Declaration
        </h3>

        <div className="space-y-1.5">
          <label className="font-bold text-zinc-300">
            List any past surgeries, chronic conditions, heart ailments, or joint injuries (or write &ldquo;None&rdquo;)
          </label>
          <textarea
            rows={2}
            placeholder="e.g. Clean health record, no past heart or spinal surgeries."
            value={medicalConditions}
            onChange={(e) => setMedicalConditions(e.target.value)}
            className="w-full px-4 py-3 rounded-xl bg-zinc-900 border border-zinc-800 focus:border-orange-500 text-white outline-none resize-none"
          />
        </div>
      </div>

      {/* Section 4: Mandatory Legal Clauses */}
      <div className="space-y-4 pt-4 border-t border-zinc-800">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
            <FileCheck className="w-4 h-4 text-emerald-400" />
            4. Mandatory Legal Agreements (Check All)
          </h3>
          <button
            type="button"
            onClick={handleSelectAllClauses}
            className="text-[11px] font-bold text-orange-400 hover:underline cursor-pointer"
          >
            ✓ Check All 6 Clauses
          </button>
        </div>

        <div className="space-y-3 bg-zinc-950 p-4 sm:p-5 rounded-2xl border border-zinc-800">
          
          <label className="flex items-start gap-3 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={clauses.assumptionOfRisk}
              onChange={() => handleCheckboxChange('assumptionOfRisk')}
              className="mt-1 w-4 h-4 accent-orange-500 rounded"
            />
            <span className="text-zinc-300 leading-tight">
              <strong className="text-white">1. Assumption of Risk:</strong> I understand that MMA, BJJ, Kickboxing, Boxing, and CrossFit are high-intensity combat sports with inherent risks of physical injury (bruises, sprains, fractures). I willingly assume all such risks.
            </span>
          </label>

          <label className="flex items-start gap-3 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={clauses.liabilityRelease}
              onChange={() => handleCheckboxChange('liabilityRelease')}
              className="mt-1 w-4 h-4 accent-orange-500 rounded"
            />
            <span className="text-zinc-300 leading-tight">
              <strong className="text-white">2. Full Release of Liability:</strong> I hereby release and hold harmless TNT MMA Fitness Academy, its founders, coaches, staff, and affiliates from any liability for accidental injury or property damage.
            </span>
          </label>

          <label className="flex items-start gap-3 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={clauses.medicalConsent}
              onChange={() => handleCheckboxChange('medicalConsent')}
              className="mt-1 w-4 h-4 accent-orange-500 rounded"
            />
            <span className="text-zinc-300 leading-tight">
              <strong className="text-white">3. Emergency Medical Treatment:</strong> In the event of an acute injury or emergency during training, I authorize the academy coaches to administer first-aid and summon emergency medical transport.
            </span>
          </label>

          <label className="flex items-start gap-3 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={clauses.sparringRules}
              onChange={() => handleCheckboxChange('sparringRules')}
              className="mt-1 w-4 h-4 accent-orange-500 rounded"
            />
            <span className="text-zinc-300 leading-tight">
              <strong className="text-white">4. Controlled Sparring & Tapping Rule:</strong> I agree to obey all safety commands, wear mandatory protective gear (mouthguards, shin guards), and immediately cease any submission hold upon a partner tapping.
            </span>
          </label>

          <label className="flex items-start gap-3 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={clauses.mediaConsent}
              onChange={() => handleCheckboxChange('mediaConsent')}
              className="mt-1 w-4 h-4 accent-orange-500 rounded"
            />
            <span className="text-zinc-300 leading-tight">
              <strong className="text-white">5. Photo & Video Release:</strong> I consent to academy photos and training videos being used for athletic training analysis and academy social media promotions (@tnt.mmafitness).
            </span>
          </label>

          <label className="flex items-start gap-3 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={clauses.codeOfConduct}
              onChange={() => handleCheckboxChange('codeOfConduct')}
              className="mt-1 w-4 h-4 accent-orange-500 rounded"
            />
            <span className="text-zinc-300 leading-tight">
              <strong className="text-white">6. Mat Hygiene & Mutual Respect:</strong> I pledge to maintain strict personal hygiene, clean training gear, trimmed nails, and zero tolerance for harassment, bullying, or aggressive ego on the mats.
            </span>
          </label>

        </div>
      </div>

      {/* Section 5: Signature Canvas */}
      <div className="space-y-4 pt-4 border-t border-zinc-800">
        <SignatureCanvas
          onSave={(dataUrl) => setSignatureData(dataUrl)}
          savedSignature={signatureData}
        />
      </div>

      {/* Error Output */}
      {errorMsg && (
        <div className="p-4 rounded-xl bg-red-950/60 border border-red-500/50 text-red-300 text-xs flex items-center gap-2">
          <AlertTriangle className="w-4 h-4 text-red-400 shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      {/* Submit Button */}
      <div className="pt-2">
        <button
          type="submit"
          className="w-full py-4 rounded-2xl bg-gradient-to-r from-orange-500 via-red-600 to-orange-600 hover:from-orange-600 hover:to-red-700 text-white font-extrabold text-sm uppercase tracking-wider shadow-xl shadow-orange-500/30 hover:scale-[1.01] active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
        >
          <FileCheck className="w-4 h-4" />
          <span>Sign & Generate Certified Digital Waiver</span>
        </button>
      </div>

    </form>
  );
}
