'use client';

import React, { useState, useEffect } from 'react';
import { 
  UserPlus, 
  Flame, 
  Phone, 
  Calendar, 
  CheckCircle2, 
  Trash2, 
  Plus, 
  Search, 
  Filter, 
  MessageSquare, 
  ArrowRight,
  TrendingUp,
  X,
  Sparkles
} from 'lucide-react';
import { EnquiryLead, LeadStatus, LeadSource, DisciplineType, BatchType } from '@/lib/types';
import { getEnquiryLeads, saveEnquiryLead, deleteEnquiryLead, convertLeadToMember } from '@/lib/dataStore';
import confetti from 'canvas-confetti';

export default function EnquiryLeadManager() {
  const [leads, setLeads] = useState<EnquiryLead[]>(() => getEnquiryLeads());
  const [selectedStatus, setSelectedStatus] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // Form states
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [source, setSource] = useState<LeadSource>('WALK_IN');
  const [status, setStatus] = useState<LeadStatus>('HOT');
  const [discipline, setDiscipline] = useState<DisciplineType>('MMA');
  const [batch, setBatch] = useState<BatchType>('EVENING');
  const [notes, setNotes] = useState('');
  const [followUpDate, setFollowUpDate] = useState(new Date().toISOString().split('T')[0]);
  const [coach, setCoach] = useState('Coach Vikalp');

  useEffect(() => {
    const handleSync = () => setLeads(getEnquiryLeads());
    window.addEventListener('tnt_datastore_sync', handleSync);
    return () => window.removeEventListener('tnt_datastore_sync', handleSync);
  }, []);

  const handleCreateLead = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone) return;
    const newLead: EnquiryLead = {
      id: `lead-${Date.now()}`,
      name,
      phone,
      email,
      source,
      status,
      interestDiscipline: discipline,
      preferredBatch: batch,
      notes,
      followUpDate,
      assignedCoach: coach,
      createdAt: new Date().toISOString().split('T')[0],
    };
    saveEnquiryLead(newLead);
    setLeads(getEnquiryLeads());
    setIsAddModalOpen(false);
    setName('');
    setPhone('');
    setEmail('');
    setNotes('');
    confetti({ particleCount: 50, origin: { y: 0.7 } });
  };

  const handleConvertToMember = (lead: EnquiryLead) => {
    if (confirm(`Convert "${lead.name}" to Active TNT MMA Member? This will create their athlete pass and generate an initial invoice.`)) {
      convertLeadToMember(lead.id, '1-Month Fighter Kickstart', 3000);
      setLeads(getEnquiryLeads());
      confetti({ particleCount: 100, spread: 80 });
      alert(`🎉 Congratulations!\n${lead.name} has been enrolled as an Active Member!`);
    }
  };

  const handleDelete = (id: string) => {
    if (confirm('Delete this enquiry record?')) {
      deleteEnquiryLead(id);
      setLeads(getEnquiryLeads());
    }
  };

  const filteredLeads = leads.filter((l) => {
    const matchesStatus = selectedStatus === 'ALL' || l.status === selectedStatus;
    const matchesSearch = searchQuery === '' || 
      l.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      l.phone.includes(searchQuery) ||
      l.notes.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const hotCount = leads.filter(l => l.status === 'HOT').length;
  const warmCount = leads.filter(l => l.status === 'WARM').length;
  const convertedCount = leads.filter(l => l.status === 'CONVERTED').length;

  return (
    <div className="space-y-6">
      
      {/* Header & Quick Metric Badges */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-xl font-black text-slate-900 dark:text-white flex items-center gap-2">
            <span>Enquiry & Walk-In Leads CRM</span>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-orange-100 dark:bg-orange-500/20 text-orange-600 dark:text-orange-400 font-bold">GymBook Standard</span>
          </h3>
          <p className="text-xs text-slate-500 dark:text-zinc-400">
            Track walk-ins, phone inquiries, schedule follow-ups, and convert leads into paying athletes.
          </p>
        </div>

        <button
          onClick={() => setIsAddModalOpen(true)}
          className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white font-bold text-xs uppercase tracking-wider shadow-md flex items-center gap-1.5 cursor-pointer self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Walk-In Lead</span>
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-4 rounded-2xl bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-[10px] uppercase font-bold text-red-500">Hot Leads (Ready to Join)</p>
            <p className="text-2xl font-black text-slate-900 dark:text-white">{hotCount}</p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-red-100 dark:bg-red-500/20 text-red-500 flex items-center justify-center font-bold">
            🔥
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-[10px] uppercase font-bold text-amber-500">Warm Inquiries</p>
            <p className="text-2xl font-black text-slate-900 dark:text-white">{warmCount}</p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-amber-100 dark:bg-amber-500/20 text-amber-500 flex items-center justify-center font-bold">
            ☀️
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-[10px] uppercase font-bold text-green-500">Converted Members</p>
            <p className="text-2xl font-black text-green-600 dark:text-green-400">{convertedCount}</p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-green-100 dark:bg-green-500/20 text-green-600 flex items-center justify-center font-bold">
            ✓
          </div>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-1.5 flex-wrap text-xs">
          {['ALL', 'HOT', 'WARM', 'COLD', 'CONVERTED'].map((st) => (
            <button
              key={st}
              onClick={() => setSelectedStatus(st)}
              className={`px-3 py-1.5 rounded-xl font-bold uppercase tracking-wider transition-all cursor-pointer ${
                selectedStatus === st
                  ? 'bg-orange-500 text-white shadow-sm'
                  : 'bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 text-slate-600 dark:text-zinc-400 hover:bg-slate-100 dark:hover:bg-zinc-800'
              }`}
            >
              {st}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-64">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search leads by name/phone..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 rounded-xl bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 text-xs outline-none focus:border-orange-500"
          />
        </div>
      </div>

      {/* Leads Table / Cards */}
      <div className="space-y-3">
        {filteredLeads.map((lead) => {
          const statusBadge = 
            lead.status === 'HOT' ? 'bg-red-100 dark:bg-red-500/20 text-red-600 dark:text-red-400 border-red-200' :
            lead.status === 'WARM' ? 'bg-amber-100 dark:bg-amber-500/20 text-amber-600 dark:text-amber-400 border-amber-200' :
            lead.status === 'CONVERTED' ? 'bg-green-100 dark:bg-green-500/20 text-green-600 dark:text-green-400 border-green-200' :
            'bg-slate-100 dark:bg-zinc-800 text-slate-600 dark:text-zinc-400 border-slate-200';

          const whatsappUrl = `https://wa.me/${lead.phone.replace(/\D/g, '')}?text=Hi%20${encodeURIComponent(lead.name)},%20Coach%20Vikalp%20from%20TNT%20MMA%20Bhopal%20following%20up%20on%20your%20inquiry%20for%20${lead.interestDiscipline}%20training.`;

          return (
            <div
              key={lead.id}
              className="p-5 rounded-2xl bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 hover:border-orange-500/40 shadow-sm transition-all space-y-3"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-orange-100 dark:bg-orange-500/20 text-orange-600 dark:text-orange-400 font-bold flex items-center justify-center text-sm">
                    {lead.name.charAt(0)}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-bold text-slate-900 dark:text-white text-sm">{lead.name}</h4>
                      <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded border ${statusBadge}`}>
                        {lead.status}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 dark:text-zinc-400">
                      {lead.phone} • Source: <strong className="text-slate-800 dark:text-zinc-200">{lead.source}</strong> • Batch: <strong>{lead.preferredBatch}</strong>
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="px-3 py-1.5 rounded-xl bg-green-500 hover:bg-green-600 text-white font-bold text-xs flex items-center gap-1 shadow-sm"
                    title="Send WhatsApp Follow-up"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>WhatsApp</span>
                  </a>

                  {lead.status !== 'CONVERTED' && (
                    <button
                      onClick={() => handleConvertToMember(lead)}
                      className="px-3.5 py-1.5 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs uppercase tracking-wider shadow-sm flex items-center gap-1 cursor-pointer"
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Convert to Member</span>
                    </button>
                  )}

                  <button
                    onClick={() => handleDelete(lead.id)}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-red-500 transition-colors"
                    title="Delete lead"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Notes & Follow-up row */}
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-zinc-950 text-xs text-slate-600 dark:text-zinc-400 space-y-1">
                <p><strong>Notes:</strong> {lead.notes}</p>
                <div className="flex items-center justify-between text-[11px] text-slate-400 dark:text-zinc-500 pt-1 border-t border-slate-200/60 dark:border-zinc-800/60">
                  <span>Follow Up Scheduled: <strong className="text-orange-600 dark:text-orange-400">{lead.followUpDate}</strong></span>
                  <span>Assigned: <strong>{lead.assignedCoach}</strong></span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Modal: Add New Lead */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-700 rounded-3xl max-w-md w-full p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-zinc-800">
              <h3 className="font-bold text-slate-900 dark:text-white text-base">
                Log Walk-In / Phone Lead
              </h3>
              <button onClick={() => setIsAddModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateLead} className="space-y-3 text-xs">
              <div className="space-y-1">
                <label className="font-bold text-slate-700 dark:text-zinc-300">Athlete Name</label>
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
                  <label className="font-bold text-slate-700 dark:text-zinc-300">WhatsApp / Phone</label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 98260 XXXXX"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-zinc-950 border border-slate-200 dark:border-zinc-800 outline-none"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-bold text-slate-700 dark:text-zinc-300">Lead Source</label>
                  <select
                    value={source}
                    onChange={(e) => setSource(e.target.value as any)}
                    className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-zinc-950 border border-slate-200 dark:border-zinc-800 outline-none"
                  >
                    <option value="WALK_IN">Walk-In</option>
                    <option value="GOOGLE">Google Search / Maps</option>
                    <option value="INSTAGRAM">Instagram</option>
                    <option value="REFERRAL">Member Referral</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-bold text-slate-700 dark:text-zinc-300">Lead Status</label>
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value as any)}
                    className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-zinc-950 border border-slate-200 dark:border-zinc-800 outline-none"
                  >
                    <option value="HOT">🔥 Hot (Ready)</option>
                    <option value="WARM">☀️ Warm (Interested)</option>
                    <option value="COLD">❄️ Cold (Browsing)</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="font-bold text-slate-700 dark:text-zinc-300">Discipline</label>
                  <select
                    value={discipline}
                    onChange={(e) => setDiscipline(e.target.value as any)}
                    className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-zinc-950 border border-slate-200 dark:border-zinc-800 outline-none"
                  >
                    <option value="MMA">MMA</option>
                    <option value="BJJ">BJJ</option>
                    <option value="KICKBOXING">Muay Thai</option>
                    <option value="CROSSFIT">CrossFit</option>
                    <option value="KIDS_MMA">Kids MMA</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-700 dark:text-zinc-300">Conversation Notes</label>
                <textarea
                  rows={2}
                  placeholder="e.g. Inquired about weight loss dietician plans..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-zinc-950 border border-slate-200 dark:border-zinc-800 outline-none resize-none"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-700 dark:text-zinc-300">Follow-Up Date</label>
                <input
                  type="date"
                  value={followUpDate}
                  onChange={(e) => setFollowUpDate(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-zinc-950 border border-slate-200 dark:border-zinc-800 outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs uppercase tracking-wider shadow-md cursor-pointer"
              >
                Save to CRM Pipeline
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
