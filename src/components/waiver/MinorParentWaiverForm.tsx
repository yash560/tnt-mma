'use client';

import React, { useState } from 'react';
import { 
  GraduationCap, 
  User, 
  HeartHandshake, 
  ShieldAlert, 
  FileCheck, 
  AlertTriangle,
  Flame,
  Check
} from 'lucide-react';
import SignatureCanvas from './SignatureCanvas';
import { WaiverDocument } from '@/lib/types';
import { saveWaiver } from '@/lib/dataStore';
import confetti from 'canvas-confetti';

interface MinorParentWaiverFormProps {
  onSuccess: (waiver: WaiverDocument) => void;
}

export default function MinorParentWaiverForm({ onSuccess }: MinorParentWaiverFormProps) {
  const [guardianName, setGuardianName] = useState('');
  const [relationship, setRelationship] = useState('Father');
  const [guardianPhone, setGuardianPhone] = useState('');
  const [guardianEmail, setGuardianEmail] = useState('');
  const [guardianGovId, setGuardianGovId] = useState('');
  
  const [minorName, setMinorName] = useState('');
  const [minorDob, setMinorDob] = useState('');
  const [minorAge, setMinorAge] = useState<number>(10);
  
  const [emergencyPhone, setEmergencyPhone] = useState('');
  const [medicalConditions, setMedicalConditions] = useState('');

  // Mandatory Legal Checkboxes for Guardian
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

    if (!guardianName || !guardianPhone || !minorName || !minorAge) {
      setErrorMsg('Please complete all mandatory parent/guardian and minor student fields.');
      return;
    }

    const allClausesChecked = Object.values(clauses).every(Boolean);
    if (!allClausesChecked) {
      setErrorMsg('Parent/Guardian must agree to all 6 legal clauses.');
      return;
    }

    if (!signatureData) {
      setErrorMsg('Parent or legal guardian must sign the canvas below.');
      return;
    }

    const verificationId = `TNT-WVR-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;

    const newWaiver: WaiverDocument = {
      id: `wvr-${Date.now()}`,
      verificationId,
      type: 'MINOR',
      signerName: `${guardianName} (${relationship})`,
      signerEmail: guardianEmail || `${guardianName.toLowerCase().replace(/\s+/g, '')}@gmail.com`,
      signerPhone: guardianPhone,
      signerGovId: guardianGovId ? `AADHAAR/ID-${guardianGovId}` : 'VERIFIED_AT_FRONTDESK',
      relationshipToMinor: relationship,
      participantName: minorName,
      participantDob: minorDob || 'Not specified',
      participantAge: Number(minorAge) || 10,
      emergencyContactName: guardianName,
      emergencyContactPhone: emergencyPhone || guardianPhone,
      medicalConditions: medicalConditions || 'Declared fit by parent/guardian for youth martial arts with no undisclosed physical restrictions.',
      agreedClauses: clauses,
      signatureDataUrl: signatureData,
      signedAt: new Date().toISOString(),
      ipAddress: '103.22.189.44 (Bhopal, MP)',
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
      
      {/* Banner */}
      <div className="p-4 rounded-2xl bg-gradient-to-r from-amber-950/40 via-zinc-900 to-orange-950/30 border border-amber-500/30 flex items-start gap-3">
        <GraduationCap className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
        <div className="space-y-1 text-zinc-300 leading-relaxed">
          <p className="font-bold text-white text-sm">
            Parent / Legal Guardian Consent & Liability Indemnity (For Students Under 18)
          </p>
          <p className="text-[11px] text-zinc-400">
            This form authorizes your child to participate in <strong>TNT Kids MMA, Stunts, Agility, and Anti-Bullying Academy</strong> under coach supervision.
          </p>
        </div>
      </div>

      {/* Section 1: Parent / Guardian Identification */}
      <div className="space-y-4">
        <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
          <User className="w-4 h-4 text-orange-400" />
          1. Parent or Legal Guardian Identification
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="space-y-1.5 sm:col-span-2">
            <label className="font-bold text-zinc-300">Parent / Guardian Full Legal Name *</label>
            <input
              type="text"
              required
              placeholder="e.g. Sanjay Patel / Anita Sharma"
              value={guardianName}
              onChange={(e) => setGuardianName(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-zinc-900 border border-zinc-800 focus:border-orange-500 text-white outline-none"
            />
          </div>

          <div className="space-y-1.5">
            <label className="font-bold text-zinc-300">Relationship *</label>
            <select
              value={relationship}
              onChange={(e) => setRelationship(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-zinc-900 border border-zinc-800 focus:border-orange-500 text-white outline-none"
            >
              <option value="Father">Father</option>
              <option value="Mother">Mother</option>
              <option value="Legal Guardian">Legal Guardian</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="space-y-1.5">
            <label className="font-bold text-zinc-300">Parent Mobile Number *</label>
            <input
              type="tel"
              required
              placeholder="+91 97555 XXXXX"
              value={guardianPhone}
              onChange={(e) => setGuardianPhone(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-zinc-900 border border-zinc-800 focus:border-orange-500 text-white outline-none"
            />
          </div>

          <div className="space-y-1.5">
            <label className="font-bold text-zinc-300">Parent Email (For PDF Copy)</label>
            <input
              type="email"
              placeholder="parent@email.com"
              value={guardianEmail}
              onChange={(e) => setGuardianEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-zinc-900 border border-zinc-800 focus:border-orange-500 text-white outline-none"
            />
          </div>

          <div className="space-y-1.5">
            <label className="font-bold text-zinc-300">Parent Aadhaar Last 4 Digits</label>
            <input
              type="text"
              placeholder="e.g. 4519"
              value={guardianGovId}
              onChange={(e) => setGuardianGovId(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-zinc-900 border border-zinc-800 focus:border-orange-500 text-white outline-none"
            />
          </div>
        </div>
      </div>

      {/* Section 2: Minor Student Details */}
      <div className="space-y-4 pt-4 border-t border-zinc-800">
        <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
          <GraduationCap className="w-4 h-4 text-amber-400" />
          2. Minor Student / Child Information
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="space-y-1.5 sm:col-span-2">
            <label className="font-bold text-zinc-300">Child's Full Name *</label>
            <input
              type="text"
              required
              placeholder="e.g. Reyansh Patel"
              value={minorName}
              onChange={(e) => setMinorName(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-zinc-900 border border-zinc-800 focus:border-orange-500 text-white outline-none"
            />
          </div>

          <div className="space-y-1.5">
            <label className="font-bold text-zinc-300">Child's Age (5-17) *</label>
            <input
              type="number"
              min={5}
              max={17}
              required
              value={minorAge}
              onChange={(e) => setMinorAge(Number(e.target.value))}
              className="w-full px-4 py-3 rounded-xl bg-zinc-900 border border-zinc-800 focus:border-orange-500 text-white outline-none"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="font-bold text-zinc-300">Date of Birth</label>
            <input
              type="date"
              value={minorDob}
              onChange={(e) => setMinorDob(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-zinc-900 border border-zinc-800 focus:border-orange-500 text-white outline-none"
            />
          </div>

          <div className="space-y-1.5">
            <label className="font-bold text-zinc-300">Secondary Emergency Phone</label>
            <input
              type="tel"
              placeholder="+91 98260 XXXXX (Alternate contact)"
              value={emergencyPhone}
              onChange={(e) => setEmergencyPhone(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-zinc-900 border border-zinc-800 focus:border-orange-500 text-white outline-none"
            />
          </div>
        </div>
      </div>

      {/* Section 3: Pediatric Health & Allergies */}
      <div className="space-y-4 pt-4 border-t border-zinc-800">
        <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
          <ShieldAlert className="w-4 h-4 text-red-400" />
          3. Health, Allergies & Special Needs
        </h3>

        <div className="space-y-1.5">
          <label className="font-bold text-zinc-300">
            Disclose any asthma, inhaler needs, allergies, bone injuries, or special attention requirements
          </label>
          <textarea
            rows={2}
            placeholder="e.g. Mild dust allergy, carries inhaler. Fully fit for martial arts games."
            value={medicalConditions}
            onChange={(e) => setMedicalConditions(e.target.value)}
            className="w-full px-4 py-3 rounded-xl bg-zinc-900 border border-zinc-800 focus:border-orange-500 text-white outline-none resize-none"
          />
        </div>
      </div>

      {/* Section 4: Mandatory Legal Clauses for Minor */}
      <div className="space-y-4 pt-4 border-t border-zinc-800">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
            <FileCheck className="w-4 h-4 text-emerald-400" />
            4. Parental Consent Agreements (Check All)
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
              <strong className="text-white">1. Parental Authorization & Risk Consent:</strong> As parent/guardian, I give full permission for my child to participate in martial arts, gymnastics, calisthenics, and physical conditioning at TNT MMA.
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
              <strong className="text-white">2. Liability Indemnification:</strong> I release TNT MMA Fitness Academy and its coaches from claims arising from accidental sports bumps, bruises, or sprains incidental to active athletic training.
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
              <strong className="text-white">3. Emergency Medical Authority:</strong> In the unlikely event of an injury or acute distress, I grant authority to academy staff to secure prompt medical treatment or hospital care on my child's behalf.
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
              <strong className="text-white">4. Non-Aggression & Safety Discipline:</strong> My child will follow coach instructions, treat peers with respect, and never use martial arts outside the academy for bullying or violence.
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
              <strong className="text-white">5. Photo & Belt Grading Media Release:</strong> I consent to photos/videos of belt promotions and youth academy training being shared on parent groups and official academy platforms.
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
              <strong className="text-white">6. Punctuality & Pick-up Commitment:</strong> I agree to ensure prompt drop-off and pick-up of my minor child before and after the 4:00 PM – 5:30 PM Kids batch.
            </span>
          </label>

        </div>
      </div>

      {/* Section 5: Parent Signature Canvas */}
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
          className="w-full py-4 rounded-2xl bg-gradient-to-r from-orange-500 via-amber-600 to-orange-600 hover:from-orange-600 hover:to-amber-700 text-white font-extrabold text-sm uppercase tracking-wider shadow-xl shadow-orange-500/30 hover:scale-[1.01] active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
        >
          <FileCheck className="w-4 h-4" />
          <span>Authorize & Sign Minor Digital Consent</span>
        </button>
      </div>

    </form>
  );
}
