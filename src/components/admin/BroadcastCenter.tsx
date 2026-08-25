'use client';

import React, { useState } from 'react';
import { 
  X, 
  Megaphone, 
  Send, 
  Mail, 
  MessageSquare, 
  Users, 
  CheckCircle2, 
  Clock, 
  Sparkles, 
  ExternalLink,
  Flame,
  Filter
} from 'lucide-react';
import { BroadcastMessage, Member, BatchType } from '@/lib/types';
import { getBroadcasts, saveBroadcast, getMembers } from '@/lib/dataStore';
import confetti from 'canvas-confetti';

interface BroadcastCenterProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function BroadcastCenter({ isOpen, onClose }: BroadcastCenterProps) {
  const [broadcasts, setBroadcasts] = useState<BroadcastMessage[]>(() => getBroadcasts());
  const [members] = useState<Member[]>(() => getMembers());

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [targetBatch, setTargetBatch] = useState<'ALL' | BatchType | 'EXPIRED_MEMBERS' | 'ACTIVE_MEMBERS'>('ALL');
  const [sendEmail, setSendEmail] = useState(true);
  const [sendWhatsApp, setSendWhatsApp] = useState(true);
  const [sendInApp, setSendInApp] = useState(true);
  const [statusMsg, setStatusMsg] = useState('');

  if (!isOpen) return null;

  // Filter recipient members
  const recipientMembers = members.filter((m) => {
    if (targetBatch === 'ALL') return true;
    if (targetBatch === 'EXPIRED_MEMBERS') return m.status === 'EXPIRED' || m.status === 'EXPIRING_SOON';
    if (targetBatch === 'ACTIVE_MEMBERS') return m.status === 'ACTIVE';
    return m.batch === targetBatch;
  });

  const handleSendBroadcast = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !content) return;

    const channels: ('EMAIL' | 'WHATSAPP' | 'IN_APP')[] = [];
    if (sendEmail) channels.push('EMAIL');
    if (sendWhatsApp) channels.push('WHATSAPP');
    if (sendInApp) channels.push('IN_APP');

    const newBroadcast: BroadcastMessage = {
      id: `bc-${Date.now()}`,
      title,
      content,
      targetBatch,
      channels,
      sentAt: new Date().toISOString(),
      sentBy: 'Head Coach Vikalp',
      recipientCount: recipientMembers.length,
      status: 'SENT',
    };

    saveBroadcast(newBroadcast);
    setBroadcasts(getBroadcasts());
    setTitle('');
    setContent('');
    setStatusMsg(`Broadcast sent to ${recipientMembers.length} recipients across selected channels!`);

    confetti({ particleCount: 80, origin: { y: 0.6 } });
    setTimeout(() => setStatusMsg(''), 4000);
  };

  const generateWhatsAppLink = (member: Member) => {
    const rawText = content || title || 'Important update from TNT MMA Academy Bhopal';
    const customizedText = rawText
      .replace(/{name}/g, member.name)
      .replace(/{plan}/g, member.planName)
      .replace(/{expiry_date}/g, member.expiryDate)
      .replace(/{due_amount}/g, `₹${member.balanceDue.toLocaleString('en-IN')}`);

    const message = encodeURIComponent(`*TNT MMA & FITNESS ACADEMY BHOPAL*\n\nDear ${member.name},\n\n${customizedText}\n\nFor inquiries call +91 97132 17866 or visit tntmma.thewebvale.com`);
    const cleanPhone = member.phone.replace(/\D/g, '');
    return `https://wa.me/${cleanPhone}?text=${message}`;
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 overflow-y-auto" data-lenis-prevent>
      <div className="bg-zinc-950 border border-zinc-700 rounded-3xl max-w-4xl w-full max-h-[92vh] flex flex-col shadow-2xl overflow-hidden">
        
        {/* Header */}
        <div className="p-5 bg-zinc-900 border-b border-zinc-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-orange-500/10 border border-orange-500/30 flex items-center justify-center text-orange-400">
              <Megaphone className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-black text-white">
                Multi-Channel Broadcast Hub
              </h3>
              <p className="text-xs text-zinc-400">
                Send official announcements, fee reminders & seminar invites via WhatsApp, Email & In-App.
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
        <div className="p-6 overflow-y-auto space-y-8 text-xs text-zinc-300">
          
          {/* Status Message */}
          {statusMsg && (
            <div className="p-4 rounded-xl bg-green-950/80 border border-green-500/40 text-green-300 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-green-400" />
              <span>{statusMsg}</span>
            </div>
          )}

          {/* Composer Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Compose Form (7 cols) */}
            <form onSubmit={handleSendBroadcast} className="lg:col-span-7 space-y-4">
              <div className="space-y-1.5">
                <label className="font-bold text-zinc-300">Announcement Title / Subject *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. 🥋 Sunday BJJ Promotion Seminar / Fee Renewal Notice"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-zinc-900 border border-zinc-800 focus:border-orange-500 text-white outline-none"
                />
              </div>

              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="font-bold text-zinc-300">Message Body *</label>
                  <span className="text-[10px] text-zinc-500 font-mono">
                    Tags: <code className="text-orange-400">{'{name}'}</code>, <code className="text-orange-400">{'{due_amount}'}</code>, <code className="text-orange-400">{'{expiry_date}'}</code>
                  </span>
                </div>
                <textarea
                  rows={4}
                  required
                  placeholder="Dear {name}, this is a reminder regarding your TNT MMA membership expiring on {expiry_date}..."
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-zinc-900 border border-zinc-800 focus:border-orange-500 text-white outline-none resize-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="font-bold text-zinc-300">Target Audience Segment</label>
                <select
                  value={targetBatch}
                  onChange={(e) => setTargetBatch(e.target.value as any)}
                  className="w-full px-4 py-3 rounded-xl bg-zinc-900 border border-zinc-800 focus:border-orange-500 text-white outline-none"
                >
                  <option value="ALL">All Enrolled Academy Members ({members.length})</option>
                  <option value="ACTIVE_MEMBERS">Active Members Only ({members.filter(m => m.status === 'ACTIVE').length})</option>
                  <option value="EXPIRED_MEMBERS">Expired & Overdue Members (Win-Back Fee Notice) ({members.filter(m => m.status === 'EXPIRED' || m.status === 'EXPIRING_SOON').length})</option>
                  <option value="KIDS">Kids MMA Batch Parents ({members.filter(m => m.batch === 'KIDS').length})</option>
                  <option value="MORNING">Morning CrossFit & Calisthenics Batch ({members.filter(m => m.batch === 'MORNING').length})</option>
                  <option value="EVENING">Evening Combat & BJJ Batch ({members.filter(m => m.batch === 'EVENING').length})</option>
                  <option value="PRO_FIGHTER">Pro Fighter Sparring Camp ({members.filter(m => m.batch === 'PRO_FIGHTER').length})</option>
                </select>
              </div>

              {/* Delivery Channels */}
              <div className="space-y-2 pt-2 border-t border-zinc-800">
                <p className="font-bold text-zinc-300">Dispatch Channels:</p>
                <div className="flex flex-wrap gap-4 text-xs">
                  <label className="flex items-center gap-2 text-zinc-200 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={sendWhatsApp}
                      onChange={(e) => setSendWhatsApp(e.target.checked)}
                      className="w-4 h-4 accent-green-500 rounded"
                    />
                    <span className="flex items-center gap-1">
                      <MessageSquare className="w-3.5 h-3.5 text-green-400" />
                      1-Click WhatsApp Direct
                    </span>
                  </label>

                  <label className="flex items-center gap-2 text-zinc-200 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={sendEmail}
                      onChange={(e) => setSendEmail(e.target.checked)}
                      className="w-4 h-4 accent-orange-500 rounded"
                    />
                    <span className="flex items-center gap-1">
                      <Mail className="w-3.5 h-3.5 text-orange-400" />
                      Email Notice
                    </span>
                  </label>

                  <label className="flex items-center gap-2 text-zinc-200 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={sendInApp}
                      onChange={(e) => setSendInApp(e.target.checked)}
                      className="w-4 h-4 accent-amber-500 rounded"
                    />
                    <span className="flex items-center gap-1">
                      <Megaphone className="w-3.5 h-3.5 text-amber-400" />
                      In-App Noticeboard
                    </span>
                  </label>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-4 rounded-xl bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white font-extrabold text-xs uppercase tracking-wider shadow-lg shadow-orange-500/25 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Send className="w-4 h-4" />
                <span>Send Broadcast to {recipientMembers.length} Members</span>
              </button>
            </form>

            {/* Recipient Preview & 1-Click WhatsApp Deep Links (5 cols) */}
            <div className="lg:col-span-5 rounded-2xl bg-zinc-900 border border-zinc-800 p-5 space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="font-bold text-white text-xs flex items-center gap-1.5">
                  <Users className="w-3.5 h-3.5 text-orange-400" />
                  Target Audience ({recipientMembers.length})
                </h4>
                <span className="text-[10px] text-zinc-400">1-Click WhatsApp Quick Fire</span>
              </div>

              <div className="max-h-72 overflow-y-auto space-y-2 pr-1">
                {recipientMembers.map((m) => (
                  <div
                    key={m.id}
                    className="p-2.5 rounded-xl bg-zinc-950 border border-zinc-800 flex items-center justify-between gap-3 text-xs"
                  >
                    <div>
                      <p className="font-bold text-white text-xs">{m.name}</p>
                      <p className="text-[10px] text-zinc-400">{m.phone} • {m.batch}</p>
                    </div>

                    <a
                      href={generateWhatsAppLink(m)}
                      target="_blank"
                      rel="noreferrer"
                      className="px-2.5 py-1 rounded-lg bg-green-950 border border-green-500/40 text-green-400 hover:bg-green-600 hover:text-white font-bold text-[10px] flex items-center gap-1 transition-colors"
                      title="Open prefilled WhatsApp chat"
                    >
                      <MessageSquare className="w-3 h-3" />
                      <span>Send</span>
                    </a>
                  </div>
                ))}
              </div>

              <div className="p-3 rounded-xl bg-zinc-950 border border-zinc-800/80 text-[10px] text-zinc-400 leading-relaxed">
                💡 <strong>Coach Tip:</strong> Clicking &ldquo;Send&rdquo; opens official WhatsApp Web directly with dynamic athlete name and fee details pre-filled without any per-message API costs.
              </div>
            </div>

          </div>

          {/* Past Broadcast History */}
          <div className="space-y-4 pt-6 border-t border-zinc-800">
            <h4 className="font-bold text-white text-sm flex items-center gap-2">
              <Clock className="w-4 h-4 text-orange-400" />
              Past Broadcast History
            </h4>

            <div className="space-y-3">
              {broadcasts.map((bc) => (
                <div
                  key={bc.id}
                  className="p-4 rounded-2xl bg-zinc-900 border border-zinc-800 space-y-2 text-xs"
                >
                  <div className="flex items-center justify-between">
                    <h5 className="font-bold text-white text-sm">{bc.title}</h5>
                    <span className="font-mono text-[10px] text-zinc-400">
                      {new Date(bc.sentAt).toLocaleDateString('en-IN')}
                    </span>
                  </div>

                  <p className="text-zinc-300 leading-relaxed text-xs">
                    {bc.content}
                  </p>

                  <div className="pt-2 border-t border-zinc-800 flex items-center justify-between text-[10px] text-zinc-400">
                    <span>Sent By: <strong className="text-zinc-200">{bc.sentBy}</strong></span>
                    <span>Recipients: <strong className="text-orange-400">{bc.recipientCount} Athletes</strong></span>
                    <span className="flex items-center gap-1 text-green-400 font-semibold">
                      <CheckCircle2 className="w-3 h-3" />
                      Delivered
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
