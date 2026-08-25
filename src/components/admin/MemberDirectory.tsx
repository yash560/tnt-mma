'use client';

import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  User, 
  Phone, 
  Calendar, 
  ShieldCheck, 
  MessageSquare, 
  FileSignature, 
  DollarSign, 
  Trash2, 
  RefreshCw, 
  CheckCircle2, 
  AlertTriangle,
  ExternalLink,
  ChevronRight,
  UserCheck,
  X
} from 'lucide-react';
import { Member, MembershipStatus } from '@/lib/types';
import { getMembers, saveMember, deleteMember, getWaiverById } from '@/lib/dataStore';
import WaiverCertificateModal from '@/components/waiver/WaiverCertificateModal';

interface MemberDirectoryProps {
  onUpdate: () => void;
}

export default function MemberDirectory({ onUpdate }: MemberDirectoryProps) {
  const [members, setMembers] = useState<Member[]>(() => getMembers());
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('ALL');
  const [batchFilter, setBatchFilter] = useState<string>('ALL');
  
  const [selectedMember, setSelectedMember] = useState<Member | null>(null);
  const [viewingWaiver, setViewingWaiver] = useState<any>(null);
  const [isWaiverModalOpen, setIsWaiverModalOpen] = useState(false);

  const refreshList = () => {
    setMembers(getMembers());
    onUpdate();
  };

  const filteredMembers = members.filter((m) => {
    const matchesSearch = 
      m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.phone.includes(searchQuery) ||
      m.beltRank.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = statusFilter === 'ALL' || m.status === statusFilter;
    const matchesBatch = batchFilter === 'ALL' || m.batch === batchFilter;

    return matchesSearch && matchesStatus && matchesBatch;
  });

  const handleDelete = (id: string, name: string) => {
    if (confirm(`Are you sure you want to remove member ${name} from TNT MMA directory?`)) {
      deleteMember(id);
      refreshList();
      setSelectedMember(null);
    }
  };

  const handleRenew = (member: Member) => {
    const currentExp = new Date(member.expiryDate);
    currentExp.setMonth(currentExp.getMonth() + 1);
    member.expiryDate = currentExp.toISOString().split('T')[0];
    member.status = 'ACTIVE';
    member.balanceDue = 0;
    saveMember(member);
    refreshList();
    alert(`Membership for ${member.name} successfully extended by 1 month!`);
  };

  const handleViewWaiver = (member: Member) => {
    if (member.waiverId) {
      const waiverDoc = getWaiverById(member.waiverId);
      if (waiverDoc) {
        setViewingWaiver(waiverDoc);
        setIsWaiverModalOpen(true);
        return;
      }
    }
    alert(`No signed digital waiver record found for ${member.name}. Please ask them to sign on /waiver.`);
  };

  const generateWhatsAppReminder = (member: Member) => {
    const msg = encodeURIComponent(
      `*TNT MMA & FITNESS ACADEMY BHOPAL*\n\n` +
      `Dear ${member.name},\n` +
      `This is Coach Vikalp from TNT MMA. Your membership for *${member.planName}* is due for renewal.\n` +
      `• Expiry Date: ${member.expiryDate}\n` +
      `• Outstanding Due: ₹${member.balanceDue.toLocaleString('en-IN')}\n\n` +
      `Please clear your renewal at the front desk or via UPI to maintain uninterrupted mat access.\n\n` +
      `📍 Ayodhya Nagar & Govind Garden Facilities\n` +
      `📞 +91 97132 17866`
    );
    const cleanPhone = member.phone.replace(/\D/g, '');
    return `https://wa.me/${cleanPhone}?text=${msg}`;
  };

  return (
    <div className="space-y-6">
      
      {/* Search & Filter Controls */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
        <div className="md:col-span-6 relative">
          <Search className="w-4 h-4 text-zinc-500 absolute left-3 top-3.5" />
          <input
            type="text"
            placeholder="Search by athlete name, phone, belt rank, or discipline..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-3 rounded-2xl bg-zinc-900 border border-zinc-800 focus:border-orange-500 text-white outline-none text-xs"
          />
        </div>

        <div className="md:col-span-3">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-full px-4 py-3 rounded-2xl bg-zinc-900 border border-zinc-800 focus:border-orange-500 text-white outline-none text-xs"
          >
            <option value="ALL">All Statuses</option>
            <option value="ACTIVE">Active Only</option>
            <option value="EXPIRING_SOON">Expiring Soon</option>
            <option value="EXPIRED">Expired & Overdue</option>
            <option value="TRIAL">Trial Guests</option>
          </select>
        </div>

        <div className="md:col-span-3">
          <select
            value={batchFilter}
            onChange={(e) => setBatchFilter(e.target.value)}
            className="w-full px-4 py-3 rounded-2xl bg-zinc-900 border border-zinc-800 focus:border-orange-500 text-white outline-none text-xs"
          >
            <option value="ALL">All Training Batches</option>
            <option value="MORNING">Morning CrossFit & Calisthenics</option>
            <option value="EVENING">Evening Combat & BJJ</option>
            <option value="KIDS">Kids MMA Batch</option>
            <option value="PRO_FIGHTER">Pro Fighter Camp</option>
          </select>
        </div>
      </div>

      {/* CRM Table */}
      <div className="rounded-3xl border border-zinc-800 overflow-hidden shadow-2xl bg-zinc-950">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-zinc-900/90 text-zinc-400 font-bold uppercase tracking-wider text-[10px] border-b border-zinc-800">
              <tr>
                <th className="p-4">Fighter / Student</th>
                <th className="p-4">Discipline & Rank</th>
                <th className="p-4">Batch</th>
                <th className="p-4">Status & Validity</th>
                <th className="p-4">Waiver</th>
                <th className="p-4">Fee Due</th>
                <th className="p-4 text-right">Direct Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800/80">
              {filteredMembers.map((member) => (
                <tr
                  key={member.id}
                  className="hover:bg-zinc-900/60 transition-colors group cursor-pointer"
                  onClick={() => setSelectedMember(member)}
                >
                  {/* Athlete Info */}
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full overflow-hidden border border-zinc-700 bg-zinc-900 shrink-0">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={member.avatarUrl}
                          alt={member.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <p className="font-bold text-white text-sm group-hover:text-orange-400 transition-colors">
                          {member.name} {member.isMinor && <span className="text-[10px] text-amber-400 font-mono">(Child)</span>}
                        </p>
                        <p className="text-[11px] text-zinc-400">{member.phone}</p>
                      </div>
                    </div>
                  </td>

                  {/* Discipline & Rank */}
                  <td className="p-4">
                    <p className="font-semibold text-zinc-200">{member.discipline}</p>
                    <p className="text-[11px] text-orange-400 font-mono">{member.beltRank}</p>
                  </td>

                  {/* Batch */}
                  <td className="p-4">
                    <span className="px-2.5 py-1 rounded-md bg-zinc-900 border border-zinc-800 text-zinc-300 text-[10px] font-bold uppercase">
                      {member.batch}
                    </span>
                  </td>

                  {/* Status & Validity */}
                  <td className="p-4">
                    <div className="space-y-1">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase border ${
                        member.status === 'ACTIVE'
                          ? 'bg-green-500/10 text-green-400 border-green-500/30'
                          : member.status === 'EXPIRING_SOON'
                          ? 'bg-amber-500/10 text-amber-400 border-amber-500/30'
                          : member.status === 'TRIAL'
                          ? 'bg-blue-500/10 text-blue-400 border-blue-500/30'
                          : 'bg-red-500/10 text-red-400 border-red-500/30'
                      }`}>
                        ● {member.status.replace('_', ' ')}
                      </span>
                      <p className="text-[10px] text-zinc-500 font-mono">
                        Exp: {member.expiryDate}
                      </p>
                    </div>
                  </td>

                  {/* Waiver */}
                  <td className="p-4">
                    {member.waiverSigned ? (
                      <span 
                        onClick={(e) => {
                          e.stopPropagation();
                          handleViewWaiver(member);
                        }}
                        className="inline-flex items-center gap-1 text-green-400 font-bold hover:underline cursor-pointer"
                        title="Click to view signed PDF waiver"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Signed</span>
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-red-400 font-bold">
                        <AlertTriangle className="w-3.5 h-3.5" />
                        <span>Missing</span>
                      </span>
                    )}
                  </td>

                  {/* Fee Due */}
                  <td className="p-4">
                    {member.balanceDue > 0 ? (
                      <span className="font-bold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/30">
                        Due: ₹{member.balanceDue.toLocaleString('en-IN')}
                      </span>
                    ) : (
                      <span className="text-zinc-500 font-medium">Clear (₹0)</span>
                    )}
                  </td>

                  {/* Direct Actions */}
                  <td className="p-4 text-right" onClick={(e) => e.stopPropagation()}>
                    <div className="flex items-center justify-end gap-2">
                      <a
                        href={generateWhatsAppReminder(member)}
                        target="_blank"
                        rel="noreferrer"
                        className="p-2 rounded-xl bg-green-950/60 border border-green-500/40 text-green-400 hover:bg-green-600 hover:text-white transition-colors"
                        title="Send 1-Click WhatsApp Fee/Event Reminder"
                      >
                        <MessageSquare className="w-4 h-4" />
                      </a>

                      <button
                        onClick={() => handleRenew(member)}
                        className="p-2 rounded-xl bg-zinc-900 border border-zinc-700 text-orange-400 hover:bg-orange-500 hover:text-white transition-colors"
                        title="Renew Plan (Extend 1 Month)"
                      >
                        <RefreshCw className="w-4 h-4" />
                      </button>

                      <button
                        onClick={() => handleDelete(member.id, member.name)}
                        className="p-2 rounded-xl bg-zinc-900 border border-zinc-700 text-zinc-400 hover:bg-red-600 hover:text-white transition-colors"
                        title="Delete Member"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Member Details Modal */}
      {selectedMember && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4" data-lenis-prevent>
          <div className="bg-zinc-950 border border-zinc-700 rounded-3xl max-w-lg w-full p-6 sm:p-8 space-y-6 shadow-2xl relative">
            <button
              onClick={() => setSelectedMember(null)}
              className="absolute top-5 right-5 p-2 rounded-xl bg-zinc-900 text-zinc-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl overflow-hidden border-2 border-orange-500 shrink-0">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={selectedMember.avatarUrl}
                  alt={selectedMember.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h3 className="text-xl font-black text-white">{selectedMember.name}</h3>
                <p className="text-xs text-orange-400 font-mono font-bold">{selectedMember.beltRank}</p>
                <p className="text-[11px] text-zinc-400">{selectedMember.phone} • {selectedMember.email}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 p-4 rounded-2xl bg-zinc-900 border border-zinc-800 text-xs">
              <div>
                <p className="text-[10px] font-bold text-zinc-500 uppercase">Enrolled Plan</p>
                <p className="font-bold text-white">{selectedMember.planName}</p>
              </div>
              <div>
                <p className="text-[10px] font-bold text-zinc-500 uppercase">Batch & Timing</p>
                <p className="font-bold text-white">{selectedMember.batch}</p>
              </div>
              <div>
                <p className="text-[10px] font-bold text-zinc-500 uppercase">Validity Expiry</p>
                <p className="font-bold text-white">{selectedMember.expiryDate}</p>
              </div>
              <div>
                <p className="text-[10px] font-bold text-zinc-500 uppercase">Blood Group</p>
                <p className="font-bold text-orange-400">{selectedMember.bloodGroup}</p>
              </div>
              <div>
                <p className="text-[10px] font-bold text-zinc-500 uppercase">Emergency Contact</p>
                <p className="font-bold text-white">{selectedMember.emergencyContact.name}</p>
                <p className="text-[10px] text-zinc-400">{selectedMember.emergencyContact.phone}</p>
              </div>
              <div>
                <p className="text-[10px] font-bold text-zinc-500 uppercase">Check-In Streak</p>
                <p className="font-bold text-green-400">{selectedMember.attendanceStreak} Days ({selectedMember.totalCheckIns} total)</p>
              </div>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => handleViewWaiver(selectedMember)}
                className="flex-1 py-3 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-orange-400 border border-orange-500/40 font-bold text-xs flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <FileSignature className="w-4 h-4" />
                <span>View Signed Waiver</span>
              </button>

              <a
                href={generateWhatsAppReminder(selectedMember)}
                target="_blank"
                rel="noreferrer"
                className="flex-1 py-3 rounded-xl bg-green-600 hover:bg-green-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <MessageSquare className="w-4 h-4" />
                <span>WhatsApp Notice</span>
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Certificate Modal */}
      <WaiverCertificateModal
        waiver={viewingWaiver}
        isOpen={isWaiverModalOpen}
        onClose={() => setIsWaiverModalOpen(false)}
      />

    </div>
  );
}
