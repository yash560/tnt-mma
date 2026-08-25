'use client';

import React, { useState } from 'react';
import { 
  X, 
  Scan, 
  CheckCircle2, 
  AlertTriangle, 
  ShieldCheck, 
  Clock, 
  User, 
  Flame,
  FileSignature,
  DollarSign
} from 'lucide-react';
import { Member, AttendanceRecord } from '@/lib/types';
import { getMembers, logAttendance, getAttendanceRecords } from '@/lib/dataStore';
import confetti from 'canvas-confetti';

interface AttendanceScannerProps {
  isOpen: boolean;
  onClose: () => void;
  onUpdate: () => void;
}

export default function AttendanceScanner({ isOpen, onClose, onUpdate }: AttendanceScannerProps) {
  const [members] = useState<Member[]>(() => getMembers());
  const [attendanceLogs, setAttendanceLogs] = useState<AttendanceRecord[]>(() => getAttendanceRecords());
  const [searchQuery, setSearchQuery] = useState('');
  const [lastCheckIn, setLastCheckIn] = useState<AttendanceRecord | null>(null);

  if (!isOpen) return null;

  const filteredMembers = members.filter((m) =>
    m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    m.phone.includes(searchQuery)
  );

  const handleCheckIn = (member: Member) => {
    const record: AttendanceRecord = {
      id: `att-${Date.now()}`,
      memberId: member.id,
      memberName: member.name,
      discipline: member.discipline,
      batch: member.batch,
      timestamp: new Date().toLocaleTimeString('en-IN'),
      date: new Date().toISOString().split('T')[0],
      verifiedWaiver: member.waiverSigned,
      verifiedFee: member.status === 'ACTIVE' && member.balanceDue === 0,
    };

    logAttendance(record);
    setAttendanceLogs(getAttendanceRecords());
    setLastCheckIn(record);

    if (record.verifiedWaiver && record.verifiedFee) {
      confetti({ particleCount: 50, origin: { y: 0.7 } });
    }

    onUpdate();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 overflow-y-auto" data-lenis-prevent>
      <div className="bg-zinc-950 border border-zinc-700 rounded-3xl max-w-4xl w-full max-h-[92vh] flex flex-col shadow-2xl overflow-hidden">
        
        {/* Header */}
        <div className="p-5 bg-zinc-900 border-b border-zinc-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-orange-500/10 border border-orange-500/30 flex items-center justify-center text-orange-400">
              <Scan className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-black text-white">
                Front-Desk Mat Check-In & Safety Verification
              </h3>
              <p className="text-xs text-zinc-400">
                1-Click entry with mandatory waiver & fee compliance validation.
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
          
          {/* Last Check-In Banner */}
          {lastCheckIn && (
            <div className={`p-4 rounded-2xl border flex items-center justify-between ${
              lastCheckIn.verifiedWaiver && lastCheckIn.verifiedFee
                ? 'bg-green-950/40 border-green-500/40 text-green-300'
                : 'bg-amber-950/40 border-amber-500/40 text-amber-300'
            }`}>
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-6 h-6 shrink-0" />
                <div>
                  <h4 className="font-bold text-white text-sm">
                    {lastCheckIn.memberName} Checked In for {lastCheckIn.discipline}
                  </h4>
                  <p className="text-[11px] font-mono">
                    Time: {lastCheckIn.timestamp} • Batch: {lastCheckIn.batch}
                  </p>
                </div>
              </div>

              <div className="flex gap-2 text-[10px] font-bold">
                <span className={`px-2 py-1 rounded ${lastCheckIn.verifiedWaiver ? 'bg-green-900/80 text-green-200' : 'bg-red-900/80 text-red-200'}`}>
                  {lastCheckIn.verifiedWaiver ? '✓ Waiver Signed' : '⚠️ Missing Waiver'}
                </span>
                <span className={`px-2 py-1 rounded ${lastCheckIn.verifiedFee ? 'bg-green-900/80 text-green-200' : 'bg-amber-900/80 text-amber-200'}`}>
                  {lastCheckIn.verifiedFee ? '✓ Fees Paid' : '⚠️ Fee Due'}
                </span>
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
            
            {/* Check-In Action List (7 cols) */}
            <div className="md:col-span-7 space-y-4">
              <div className="space-y-1.5">
                <label className="font-bold text-zinc-300">Fast Member Search (Name or Mobile)</label>
                <input
                  type="text"
                  placeholder="Type athlete name, phone, or batch..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-zinc-900 border border-zinc-800 focus:border-orange-500 text-white outline-none text-xs"
                />
              </div>

              <div className="space-y-2 max-h-80 overflow-y-auto pr-1">
                {filteredMembers.map((m) => (
                  <div
                    key={m.id}
                    className="p-3.5 rounded-2xl bg-zinc-900 border border-zinc-800 hover:border-zinc-700 flex items-center justify-between gap-3 transition-colors"
                  >
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-white text-sm">{m.name}</span>
                        <span className="text-[10px] uppercase font-bold text-orange-400">
                          {m.batch}
                        </span>
                      </div>
                      <p className="text-[11px] text-zinc-400">{m.discipline} • {m.beltRank}</p>
                      
                      {/* Safety Badges */}
                      <div className="flex items-center gap-2 pt-1 text-[10px]">
                        <span className={`flex items-center gap-1 ${m.waiverSigned ? 'text-green-400' : 'text-red-400 font-bold'}`}>
                          <FileSignature className="w-3 h-3" />
                          {m.waiverSigned ? 'Waiver OK' : 'No Waiver'}
                        </span>
                        <span className="text-zinc-600">•</span>
                        <span className={`flex items-center gap-1 ${m.balanceDue === 0 ? 'text-green-400' : 'text-amber-400 font-bold'}`}>
                          <DollarSign className="w-3 h-3" />
                          {m.balanceDue === 0 ? 'Fee Clear' : `Due ₹${m.balanceDue}`}
                        </span>
                      </div>
                    </div>

                    <button
                      onClick={() => handleCheckIn(m)}
                      className="px-4 py-2 rounded-xl bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white font-bold text-xs uppercase tracking-wider shadow-md transition-all cursor-pointer whitespace-nowrap"
                    >
                      Check-In
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Today's Mat Attendance Log (5 cols) */}
            <div className="md:col-span-5 rounded-2xl bg-zinc-900 border border-zinc-800 p-5 space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="font-bold text-white text-xs uppercase tracking-wider flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-orange-400" />
                  Today&apos;s Mat Log ({attendanceLogs.length})
                </h4>
              </div>

              {attendanceLogs.length > 0 ? (
                <div className="max-h-72 overflow-y-auto space-y-2 pr-1">
                  {attendanceLogs.map((log) => (
                    <div
                      key={log.id}
                      className="p-2.5 rounded-xl bg-zinc-950 border border-zinc-800/80 flex items-center justify-between text-xs"
                    >
                      <div>
                        <p className="font-bold text-white">{log.memberName}</p>
                        <p className="text-[10px] text-zinc-400">{log.discipline} • {log.batch}</p>
                      </div>
                      <span className="font-mono text-[10px] text-orange-400 bg-zinc-900 px-2 py-0.5 rounded border border-zinc-800">
                        {log.timestamp}
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="py-12 text-center text-zinc-500 text-xs">
                  No check-ins recorded yet today.
                </div>
              )}
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
