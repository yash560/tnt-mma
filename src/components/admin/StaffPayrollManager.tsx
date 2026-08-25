'use client';

import React, { useState, useEffect } from 'react';
import { 
  Users, 
  Award, 
  DollarSign, 
  Plus, 
  Phone, 
  Mail, 
  ShieldCheck, 
  Sparkles,
  X
} from 'lucide-react';
import { StaffMember } from '@/lib/types';
import { getStaffMembers, saveStaffMember } from '@/lib/dataStore';
import confetti from 'canvas-confetti';

export default function StaffPayrollManager() {
  const [staff, setStaff] = useState<StaffMember[]>(() => getStaffMembers());
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // Form states
  const [name, setName] = useState('');
  const [role, setRole] = useState<'HEAD_COACH' | 'TRAINER' | 'DIETICIAN' | 'FRONT_DESK'>('TRAINER');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [baseSalary, setBaseSalary] = useState<number>(30000);
  const [ptCommission, setPtCommission] = useState<number>(5000);
  const [specialties, setSpecialties] = useState('CrossFit, Kickboxing, HIIT');

  useEffect(() => {
    const handleSync = () => setStaff(getStaffMembers());
    window.addEventListener('tnt_datastore_sync', handleSync);
    return () => window.removeEventListener('tnt_datastore_sync', handleSync);
  }, []);

  const handleCreateStaff = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone) return;
    const newStaff: StaffMember = {
      id: `st-${Date.now()}`,
      name,
      role,
      phone,
      email,
      baseSalary: Number(baseSalary),
      ptCommission: Number(ptCommission),
      status: 'ACTIVE',
      specialties: specialties.split(',').map(s => s.trim()),
      joinedDate: new Date().toISOString().split('T')[0],
    };
    saveStaffMember(newStaff);
    setStaff(getStaffMembers());
    setIsAddModalOpen(false);
    setName('');
    setPhone('');
    setEmail('');
    confetti({ particleCount: 50 });
  };

  const totalMonthlyPayroll = staff.reduce((acc, s) => acc + s.baseSalary + s.ptCommission, 0);

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-xl font-black text-slate-900 dark:text-white flex items-center gap-2">
            <span>Staff & Trainer Payroll Hub</span>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-blue-100 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400 font-bold">GymBook Standard</span>
          </h3>
          <p className="text-xs text-slate-500 dark:text-zinc-400">
            Manage coaches, dieticians, frontdesk staff, salaries, and PT commission incentives.
          </p>
        </div>

        <button
          onClick={() => setIsAddModalOpen(true)}
          className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white font-bold text-xs uppercase tracking-wider shadow-md flex items-center gap-1.5 cursor-pointer self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Add Staff Member</span>
        </button>
      </div>

      {/* Metric */}
      <div className="p-4 rounded-2xl bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 shadow-sm flex items-center justify-between">
        <div>
          <p className="text-[10px] uppercase font-bold text-slate-500 dark:text-zinc-400">Total Monthly Coaching Payroll</p>
          <p className="text-2xl font-black text-slate-900 dark:text-white">₹{totalMonthlyPayroll.toLocaleString('en-IN')}</p>
        </div>
        <div className="text-right text-xs text-slate-500 dark:text-zinc-400">
          <p><strong>{staff.length}</strong> Active Team Members</p>
          <p className="text-[11px] text-green-600 dark:text-green-400 font-bold">● All on-duty</p>
        </div>
      </div>

      {/* Staff List */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {staff.map((s) => (
          <div
            key={s.id}
            className="rounded-3xl bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 p-6 space-y-4 hover:border-orange-500/40 shadow-sm transition-all"
          >
            <div className="flex items-center justify-between">
              <div className="w-12 h-12 rounded-2xl bg-orange-100 dark:bg-orange-500/20 text-orange-600 dark:text-orange-400 font-black text-base flex items-center justify-center">
                {s.name.charAt(0)}
              </div>
              <span className="text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded bg-orange-100 dark:bg-orange-500/10 text-orange-600 dark:text-orange-400 border border-orange-200 dark:border-orange-500/20">
                {s.role}
              </span>
            </div>

            <div className="space-y-1">
              <h4 className="font-bold text-slate-900 dark:text-white text-base">{s.name}</h4>
              <p className="text-xs text-slate-500 dark:text-zinc-400">{s.phone}</p>
            </div>

            <div className="space-y-1 text-xs pt-2 border-t border-slate-100 dark:border-zinc-800">
              <p className="text-[10px] uppercase font-bold text-slate-400">Specialties</p>
              <div className="flex flex-wrap gap-1">
                {s.specialties.map((spec, i) => (
                  <span key={i} className="text-[10px] px-2 py-0.5 rounded bg-slate-100 dark:bg-zinc-800 text-slate-700 dark:text-zinc-300 font-medium">
                    {spec}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 dark:border-zinc-800 flex items-center justify-between text-xs">
              <div>
                <p className="text-[10px] text-slate-400 font-bold uppercase">Salary + PT</p>
                <p className="font-black text-slate-900 dark:text-white text-sm">
                  ₹{(s.baseSalary + s.ptCommission).toLocaleString('en-IN')}/mo
                </p>
              </div>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-green-100 dark:bg-green-500/10 text-green-700 dark:text-green-400 font-bold">
                ● {s.status}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Modal: Add Staff */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-700 rounded-3xl max-w-md w-full p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-zinc-800">
              <h3 className="font-bold text-slate-900 dark:text-white text-base">
                Onboard New Coach / Staff
              </h3>
              <button onClick={() => setIsAddModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateStaff} className="space-y-3 text-xs">
              <div className="space-y-1">
                <label className="font-bold text-slate-700 dark:text-zinc-300">Staff Name</label>
                <input
                  type="text"
                  required
                  placeholder="Full Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-zinc-950 border border-slate-200 dark:border-zinc-800 outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-bold text-slate-700 dark:text-zinc-300">Role</label>
                  <select
                    value={role}
                    onChange={(e) => setRole(e.target.value as any)}
                    className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-zinc-950 border border-slate-200 dark:border-zinc-800 outline-none"
                  >
                    <option value="TRAINER">Trainer</option>
                    <option value="HEAD_COACH">Head Coach</option>
                    <option value="DIETICIAN">Dietician</option>
                    <option value="FRONT_DESK">Front Desk</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="font-bold text-slate-700 dark:text-zinc-300">Phone</label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-zinc-950 border border-slate-200 dark:border-zinc-800 outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-bold text-slate-700 dark:text-zinc-300">Base Salary (₹)</label>
                  <input
                    type="number"
                    value={baseSalary}
                    onChange={(e) => setBaseSalary(Number(e.target.value))}
                    className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-zinc-950 border border-slate-200 dark:border-zinc-800 outline-none"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-bold text-slate-700 dark:text-zinc-300">PT Commission (₹)</label>
                  <input
                    type="number"
                    value={ptCommission}
                    onChange={(e) => setPtCommission(Number(e.target.value))}
                    className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-zinc-950 border border-slate-200 dark:border-zinc-800 outline-none"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-700 dark:text-zinc-300">Specialties (comma-separated)</label>
                <input
                  type="text"
                  placeholder="e.g. Muay Thai, BJJ, Weightlifting"
                  value={specialties}
                  onChange={(e) => setSpecialties(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-zinc-950 border border-slate-200 dark:border-zinc-800 outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs uppercase tracking-wider shadow-md cursor-pointer"
              >
                Save Staff Record
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
