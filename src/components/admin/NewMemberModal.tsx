'use client';

import React, { useState } from 'react';
import { 
  X, 
  UserPlus, 
  Flame, 
  Check, 
  DollarSign, 
  Calendar, 
  ShieldCheck, 
  GraduationCap 
} from 'lucide-react';
import { Member, BatchType, DisciplineType } from '@/lib/types';
import { saveMember, saveTransaction } from '@/lib/dataStore';
import confetti from 'canvas-confetti';

interface NewMemberModalProps {
  isOpen: boolean;
  onClose: () => void;
  onMemberAdded: () => void;
}

export default function NewMemberModal({ isOpen, onClose, onMemberAdded }: NewMemberModalProps) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [isMinor, setIsMinor] = useState(false);
  const [guardianName, setGuardianName] = useState('');
  const [batch, setBatch] = useState<BatchType>('EVENING');
  const [discipline, setDiscipline] = useState<DisciplineType>('MMA');
  const [planName, setPlanName] = useState('6-Month Combat Athlete Camp');
  const [planAmount, setPlanAmount] = useState<number>(15000);
  const [amountPaidNow, setAmountPaidNow] = useState<number>(15000);
  const [paymentMode, setPaymentMode] = useState<'UPI' | 'CASH' | 'CARD'>('UPI');
  const [bloodGroup, setBloodGroup] = useState('O+');
  const [emergencyName, setEmergencyName] = useState('');
  const [emergencyPhone, setEmergencyPhone] = useState('');

  if (!isOpen) return null;

  const handlePlanChange = (plan: string) => {
    setPlanName(plan);
    if (plan.includes('1-Month')) {
      setPlanAmount(3000);
      setAmountPaidNow(3000);
    } else if (plan.includes('3-Month')) {
      setPlanAmount(7500);
      setAmountPaidNow(7500);
    } else if (plan.includes('6-Month') || plan.includes('Kids')) {
      setPlanAmount(13500);
      setAmountPaidNow(13500);
    } else if (plan.includes('Annual')) {
      setPlanAmount(24000);
      setAmountPaidNow(24000);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone) return;

    const memberId = `mem-${Date.now()}`;
    const today = new Date().toISOString().split('T')[0];
    
    // Calculate expiry (default 6 months)
    const expDate = new Date();
    expDate.setMonth(expDate.getMonth() + (planName.includes('Annual') ? 12 : planName.includes('3-Month') ? 3 : planName.includes('1-Month') ? 1 : 6));
    const expiryDate = expDate.toISOString().split('T')[0];

    const balanceDue = Math.max(0, planAmount - amountPaidNow);

    const newMember: Member = {
      id: memberId,
      name,
      email: email || `${name.toLowerCase().replace(/\s+/g, '')}@gmail.com`,
      phone,
      role: isMinor ? 'PARENT' : 'MEMBER',
      batch: isMinor ? 'KIDS' : batch,
      status: balanceDue > 0 ? 'ACTIVE' : 'ACTIVE',
      joinedDate: today,
      expiryDate,
      planId: `plan-${Date.now()}`,
      planName,
      planAmount,
      balanceDue,
      beltRank: discipline === 'BJJ' ? 'BJJ White Belt (0 Stripes)' : 'Striking Level 1 (Novice)',
      discipline,
      isMinor,
      guardianName: isMinor ? guardianName : undefined,
      guardianPhone: isMinor ? phone : undefined,
      emergencyContact: {
        name: emergencyName || guardianName || 'Emergency Desk',
        relationship: isMinor ? 'Parent' : 'Primary Contact',
        phone: emergencyPhone || phone,
      },
      bloodGroup,
      waiverSigned: false,
      avatarUrl: `https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80`,
      attendanceStreak: 0,
      totalCheckIns: 0,
    };

    saveMember(newMember);

    // If payment made, log initial transaction invoice
    if (amountPaidNow > 0) {
      const gst = Math.round((amountPaidNow * 18) / 118);
      const base = amountPaidNow - gst;
      saveTransaction({
        id: `txn-${Date.now()}`,
        invoiceNumber: `TNT-INV-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`,
        memberId,
        memberName: name,
        memberPhone: phone,
        planName,
        amount: base,
        gstAmount: gst,
        totalAmount: amountPaidNow,
        paymentMode,
        transactionRef: `${paymentMode}/POS-${Math.floor(100000 + Math.random() * 900000)}`,
        date: today,
        status: 'PAID',
        notes: 'Initial admission fee payment',
      });
    }

    confetti({ particleCount: 70, origin: { y: 0.6 } });
    onMemberAdded();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto" data-lenis-prevent>
      <div className="bg-zinc-950 border border-zinc-700 rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl relative animate-in zoom-in-95 duration-200">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl bg-zinc-900 text-zinc-400 hover:text-white border border-zinc-800"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="space-y-6">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/30 text-orange-400 text-xs font-bold uppercase tracking-wider">
              <UserPlus className="w-3.5 h-3.5" />
              New Student Admission
            </div>
            <h3 className="text-2xl font-black text-white">
              Enroll New Fighter / Member
            </h3>
            <p className="text-xs text-zinc-400">
              Add new member details, assign membership plan, and log initial fee payment.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            
            {/* Minor Checkbox */}
            <div className="p-3 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-between">
              <label className="flex items-center gap-2.5 text-zinc-300 font-semibold cursor-pointer">
                <input
                  type="checkbox"
                  checked={isMinor}
                  onChange={(e) => setIsMinor(e.target.checked)}
                  className="w-4 h-4 accent-orange-500 rounded"
                />
                <span>Is this student under 18 (Kids Batch)?</span>
              </label>
              {isMinor && (
                <span className="text-[10px] font-bold text-amber-400 uppercase bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/30">
                  Kids Policy Active
                </span>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="font-bold text-zinc-300">
                  {isMinor ? "Child's Full Name *" : "Member Full Name *"}
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Rahul Sharma"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
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

            {isMinor && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-3.5 rounded-xl bg-amber-950/20 border border-amber-500/30">
                <div className="space-y-1.5">
                  <label className="font-bold text-amber-300">Parent / Guardian Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Sanjay Sharma (Father)"
                    value={guardianName}
                    onChange={(e) => setGuardianName(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 focus:border-amber-500 text-white outline-none"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="font-bold text-amber-300">Guardian Contact Phone</label>
                  <input
                    type="tel"
                    placeholder="Same as above or secondary phone"
                    value={emergencyPhone}
                    onChange={(e) => setEmergencyPhone(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 focus:border-amber-500 text-white outline-none"
                  />
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="space-y-1.5">
                <label className="font-bold text-zinc-300">Primary Discipline</label>
                <select
                  value={discipline}
                  onChange={(e) => setDiscipline(e.target.value as DisciplineType)}
                  className="w-full px-4 py-3 rounded-xl bg-zinc-900 border border-zinc-800 focus:border-orange-500 text-white outline-none"
                >
                  <option value="MMA">Mixed Martial Arts (MMA)</option>
                  <option value="BJJ">Brazilian Jiu-Jitsu (BJJ)</option>
                  <option value="KICKBOXING">Muay Thai Kickboxing</option>
                  <option value="CROSSFIT">CrossFit & Rig</option>
                  <option value="CALISTHENICS">Calisthenics</option>
                  <option value="KIDS_MMA">Kids MMA & Defense</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="font-bold text-zinc-300">Training Batch</label>
                <select
                  value={batch}
                  onChange={(e) => setBatch(e.target.value as BatchType)}
                  className="w-full px-4 py-3 rounded-xl bg-zinc-900 border border-zinc-800 focus:border-orange-500 text-white outline-none"
                >
                  <option value="MORNING">Morning (06:00 - 10:00 AM)</option>
                  <option value="EVENING">Evening (05:00 - 10:00 PM)</option>
                  <option value="KIDS">Kids Batch (04:00 - 05:30 PM)</option>
                  <option value="PRO_FIGHTER">Pro Fighter Camp (07:30 PM)</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="font-bold text-zinc-300">Blood Group</label>
                <select
                  value={bloodGroup}
                  onChange={(e) => setBloodGroup(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-zinc-900 border border-zinc-800 focus:border-orange-500 text-white outline-none"
                >
                  <option value="O+">O+</option>
                  <option value="O-">O-</option>
                  <option value="A+">A+</option>
                  <option value="A-">A-</option>
                  <option value="B+">B+</option>
                  <option value="B-">B-</option>
                  <option value="AB+">AB+</option>
                  <option value="AB-">AB-</option>
                </select>
              </div>
            </div>

            {/* Plan & Pricing */}
            <div className="p-4 rounded-2xl bg-zinc-900 border border-zinc-800 space-y-3">
              <p className="font-bold text-white uppercase tracking-wider text-[11px] flex items-center gap-1.5">
                <DollarSign className="w-3.5 h-3.5 text-green-400" />
                Plan & Fee Billing
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="font-bold text-zinc-300">Select Plan</label>
                  <select
                    value={planName}
                    onChange={(e) => handlePlanChange(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-950 border border-zinc-800 focus:border-orange-500 text-white outline-none"
                  >
                    <option value="1-Month Fighter Kickstart">1-Month Kickstart (₹3,000)</option>
                    <option value="3-Month CrossFit & Combat">3-Month CrossFit (₹7,500)</option>
                    <option value="6-Month Combat Athlete Camp">6-Month Combat Camp (₹13,500)</option>
                    <option value="Kids MMA & Anti-Bullying Academy">Kids MMA Academy (₹11,000)</option>
                    <option value="Annual Championship All-Access">Annual Championship Pass (₹24,000)</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="font-bold text-zinc-300">Total Plan Fee (₹)</label>
                  <input
                    type="number"
                    value={planAmount}
                    onChange={(e) => setPlanAmount(Number(e.target.value))}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-950 border border-zinc-800 text-white outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-zinc-800/80">
                <div className="space-y-1.5">
                  <label className="font-bold text-zinc-300">Amount Collected Today (₹)</label>
                  <input
                    type="number"
                    value={amountPaidNow}
                    onChange={(e) => setAmountPaidNow(Number(e.target.value))}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-950 border border-zinc-800 text-green-400 font-bold outline-none"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="font-bold text-zinc-300">Payment Mode</label>
                  <select
                    value={paymentMode}
                    onChange={(e) => setPaymentMode(e.target.value as any)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-950 border border-zinc-800 text-white outline-none"
                  >
                    <option value="UPI">UPI (GPay / PhonePe / QR)</option>
                    <option value="CASH">Cash Frontdesk</option>
                    <option value="CARD">Card Swipe POS</option>
                  </select>
                </div>
              </div>

              {planAmount - amountPaidNow > 0 && (
                <p className="text-[11px] text-amber-400">
                  ⚠️ Remaining balance of ₹{(planAmount - amountPaidNow).toLocaleString('en-IN')} will be logged as Pending Due.
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full py-4 rounded-2xl bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white font-extrabold text-sm uppercase tracking-wider shadow-lg shadow-orange-500/25 transition-all cursor-pointer"
            >
              Confirm Admission & Create Member Pass
            </button>
          </form>
        </div>

      </div>
    </div>
  );
}
