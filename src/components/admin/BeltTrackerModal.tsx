'use client';

import React, { useState } from 'react';
import { 
  X, 
  Award, 
  ShieldCheck, 
  Flame, 
  Star, 
  CheckCircle2, 
  ChevronRight,
  TrendingUp
} from 'lucide-react';
import { Member } from '@/lib/types';
import { getMembers, saveMember } from '@/lib/dataStore';
import confetti from 'canvas-confetti';

interface BeltTrackerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUpdate: () => void;
}

export default function BeltTrackerModal({ isOpen, onClose, onUpdate }: BeltTrackerModalProps) {
  const [members, setMembers] = useState<Member[]>(() => getMembers());
  const [selectedMember, setSelectedMember] = useState<Member | null>(null);
  const [newRank, setNewRank] = useState('');
  const [evalNotes, setEvalNotes] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  if (!isOpen) return null;

  const bjjRanks = [
    'BJJ White Belt (0 Stripes)',
    'BJJ White Belt (1 Stripe)',
    'BJJ White Belt (2 Stripes)',
    'BJJ White Belt (3 Stripes)',
    'BJJ White Belt (4 Stripes)',
    'BJJ Blue Belt',
    'BJJ Blue Belt (2 Stripes)',
    'BJJ Purple Belt',
    'BJJ Brown Belt',
    'BJJ Black Belt',
  ];

  const strikingRanks = [
    'Striking Level 1 (Novice Fundamentals)',
    'Striking Level 2 (Intermediate Combinations)',
    'Striking Level 3 (Sparring Certified)',
    'Striking Level 4 (Advanced Kickboxing / Fight Camp)',
    'Striking Level 5 (Pro Fighter)',
  ];

  const kidsRanks = [
    'Kids White Belt',
    'Kids Yellow-White Belt',
    'Kids Solid Yellow Belt',
    'Kids Orange Belt',
    'Kids Green-White Belt',
    'Kids Junior Black Belt Candidate',
  ];

  const handlePromote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedMember || !newRank) return;

    selectedMember.beltRank = newRank;
    saveMember(selectedMember);
    setMembers(getMembers());
    setSuccessMsg(`Fighter ${selectedMember.name} promoted to ${newRank}!`);

    confetti({ particleCount: 100, spread: 70, origin: { y: 0.5 } });
    onUpdate();
    setTimeout(() => setSuccessMsg(''), 4000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 overflow-y-auto" data-lenis-prevent>
      <div className="bg-zinc-950 border border-zinc-700 rounded-3xl max-w-4xl w-full max-h-[92vh] flex flex-col shadow-2xl overflow-hidden">
        
        {/* Header */}
        <div className="p-5 bg-zinc-900 border-b border-zinc-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-orange-500/10 border border-orange-500/30 flex items-center justify-center text-orange-400">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-black text-white">
                Combat Belt & Skill Rank Progression Tracker
              </h3>
              <p className="text-xs text-zinc-400">
                Evaluate student skill development across Brazilian Jiu-Jitsu, Muay Thai Striking, and Kids MMA.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-zinc-800 text-zinc-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 overflow-y-auto space-y-6 text-xs text-zinc-300">
          
          {successMsg && (
            <div className="p-4 rounded-xl bg-green-950/80 border border-green-500/40 text-green-300 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-green-400" />
              <span>{successMsg}</span>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
            
            {/* Student Directory List (5 cols) */}
            <div className="md:col-span-5 rounded-2xl bg-zinc-900 border border-zinc-800 p-4 space-y-3">
              <h4 className="font-bold text-white text-xs uppercase tracking-wider">
                Select Athlete for Grading
              </h4>

              <div className="max-h-96 overflow-y-auto space-y-2 pr-1">
                {members.map((m) => (
                  <div
                    key={m.id}
                    onClick={() => {
                      setSelectedMember(m);
                      setNewRank(m.beltRank);
                    }}
                    className={`p-3 rounded-xl border transition-all cursor-pointer ${
                      selectedMember?.id === m.id
                        ? 'bg-orange-950/40 border-orange-500 text-white shadow-md'
                        : 'bg-zinc-950 border-zinc-800 hover:border-zinc-700 text-zinc-300'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <p className="font-bold text-xs">{m.name}</p>
                      <span className="text-[10px] font-bold text-orange-400">
                        {m.discipline}
                      </span>
                    </div>
                    <p className="text-[11px] text-zinc-400 mt-1 font-mono">
                      Rank: <strong className="text-zinc-200">{m.beltRank}</strong>
                    </p>
                    <div className="flex items-center gap-3 text-[10px] text-zinc-500 mt-1">
                      <span>Total Check-ins: {m.totalCheckIns}</span>
                      <span>Streak: {m.attendanceStreak} days</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Evaluation & Promotion Panel (7 cols) */}
            <div className="md:col-span-7 rounded-2xl bg-zinc-900 border border-zinc-800 p-6 space-y-6">
              {selectedMember ? (
                <form onSubmit={handlePromote} className="space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
                    <div>
                      <h4 className="font-black text-white text-base">{selectedMember.name}</h4>
                      <p className="text-xs text-orange-400 font-semibold">{selectedMember.planName}</p>
                    </div>
                    <span className="px-2.5 py-1 rounded-full bg-zinc-800 text-zinc-300 font-mono text-[10px]">
                      {selectedMember.batch} BATCH
                    </span>
                  </div>

                  <div className="space-y-1.5">
                    <label className="font-bold text-zinc-300">Select New Belt / Skill Rank *</label>
                    <select
                      value={newRank}
                      onChange={(e) => setNewRank(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-zinc-950 border border-zinc-800 focus:border-orange-500 text-white outline-none font-bold"
                    >
                      <optgroup label="Brazilian Jiu-Jitsu (BJJ) Belts">
                        {bjjRanks.map((r) => (
                          <option key={r} value={r}>{r}</option>
                        ))}
                      </optgroup>
                      <optgroup label="Striking / Kickboxing Levels">
                        {strikingRanks.map((r) => (
                          <option key={r} value={r}>{r}</option>
                        ))}
                      </optgroup>
                      <optgroup label="Kids MMA Ranks">
                        {kidsRanks.map((r) => (
                          <option key={r} value={r}>{r}</option>
                        ))}
                      </optgroup>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="font-bold text-zinc-300">Coach Evaluation Notes</label>
                    <textarea
                      rows={3}
                      placeholder="e.g. Excellent guard retention, sharp roundhouse kicks, consistent mat attendance and positive attitude."
                      value={evalNotes}
                      onChange={(e) => setEvalNotes(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl bg-zinc-950 border border-zinc-800 focus:border-orange-500 text-white outline-none resize-none"
                    />
                  </div>

                  <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-800 text-[11px] text-zinc-400 space-y-1">
                    <p className="font-bold text-white">Grading Requirements Checklist:</p>
                    <p>✓ Minimum 30 recorded check-ins for stripe promotion</p>
                    <p>✓ Sparring etiquette & safety rules mastery</p>
                    <p>✓ Current fee compliance & valid signed waiver</p>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 rounded-xl bg-gradient-to-r from-orange-500 via-red-600 to-orange-600 hover:from-orange-600 hover:to-red-700 text-white font-extrabold text-xs uppercase tracking-wider shadow-lg shadow-orange-500/25 transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <TrendingUp className="w-4 h-4" />
                    <span>Authorize Belt Promotion</span>
                  </button>
                </form>
              ) : (
                <div className="py-16 text-center text-zinc-500 space-y-2">
                  <Award className="w-8 h-8 text-zinc-700 mx-auto" />
                  <p className="font-semibold">Select an athlete from the left list to evaluate rank.</p>
                </div>
              )}
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
