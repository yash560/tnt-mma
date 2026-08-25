'use client';

import React, { useState } from 'react';
import { 
  MapPin, 
  Phone, 
  Clock, 
  Mail, 
  ExternalLink, 
  Send, 
  CheckCircle2,
  Flame,
  FileSignature
} from 'lucide-react';
import { saveEnquiryLead } from '@/lib/dataStore';

export default function LocationContact() {
  const [inquiryName, setInquiryName] = useState('');
  const [inquiryPhone, setInquiryPhone] = useState('');
  const [inquiryMessage, setInquiryMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleInquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inquiryName || !inquiryPhone) return;

    saveEnquiryLead({
      id: `lead-contact-${Date.now()}`,
      name: inquiryName,
      phone: inquiryPhone,
      source: 'WEBSITE',
      status: 'HOT',
      notes: inquiryMessage || 'Direct website contact form inquiry.',
      assignedCoach: 'Coach Vikalp',
      createdAt: new Date().toISOString().split('T')[0],
    });

    setSubmitted(true);
  };

  return (
    <section id="contact" className="py-24 bg-slate-50 dark:bg-zinc-950/90 border-t border-slate-200 dark:border-zinc-800/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-600 dark:text-orange-400 text-xs font-bold uppercase tracking-wider">
            <MapPin className="w-3.5 h-3.5" />
            Visit Our Bhopal Facilities
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
            Two Prime Academy Locations in Bhopal
          </h2>
          <p className="text-slate-600 dark:text-zinc-400 text-sm sm:text-base">
            Conveniently accessible with dedicated parking, showers, lockers, and pro fight equipment.
          </p>
        </div>

        {/* Locations & Contact Form Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start">
          
          {/* Branch Cards (7 Cols) - Swipeable on mobile */}
          <div className="lg:col-span-7 flex lg:flex-col gap-4 sm:gap-6 overflow-x-auto snap-x snap-mandatory scrollbar-none pb-2 -mx-4 px-4 sm:mx-0 sm:px-0">
            
            {/* Branch 1: Nizamuddin Rd */}
            <div className="w-[84vw] max-w-[340px] shrink-0 snap-center lg:w-auto lg:shrink rounded-3xl bg-white dark:bg-zinc-900/80 border border-slate-200 dark:border-zinc-800 p-5 sm:p-7 space-y-3 sm:space-y-4 hover:border-orange-500/50 transition-all shadow-md">
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-orange-100 dark:bg-orange-500/20 text-orange-600 dark:text-orange-400 border border-orange-200 dark:border-orange-500/30">
                    Main Academy Branch
                  </span>
                  <h3 className="text-xl font-black text-slate-900 dark:text-white mt-1">
                    Ayodhya Nagar & Nizamuddin Road
                  </h3>
                </div>
                <a
                  href="https://maps.google.com/?q=TNT+MMA+Fitness+Academy+Bhopal+Nizamuddin+Road"
                  target="_blank"
                  rel="noreferrer"
                  className="p-2.5 rounded-xl bg-slate-100 dark:bg-zinc-800 hover:bg-orange-500 text-slate-600 dark:text-zinc-300 hover:text-white transition-colors"
                  title="Open in Google Maps"
                >
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>

              <p className="text-xs text-slate-600 dark:text-zinc-300 leading-relaxed">
                <strong className="text-slate-900 dark:text-white">Address:</strong> B-11, Nizamuddin Rd, near Kanta Shravan Colony, above Klub Fox showroom, Narela Shankari, Kiran Nagar, Ayodhya Nagar, Bhopal, MP 462022
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs text-slate-500 dark:text-zinc-400">
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-orange-500 shrink-0" />
                  <a href="tel:+919713217866" className="hover:text-orange-600 dark:hover:text-white font-semibold">
                    +91 97132 17866
                  </a>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-orange-500 shrink-0" />
                  <span>06:00 AM - 10:00 PM</span>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 dark:border-zinc-800 flex items-center justify-between">
                <span className="text-[11px] text-slate-400 dark:text-zinc-500">Facilities: Octagon Cage, BJJ Mats, CrossFit Rig, Lockers</span>
                <a
                  href="https://maps.google.com/?q=TNT+MMA+Fitness+Academy+Bhopal+Nizamuddin+Road"
                  target="_blank"
                  rel="noreferrer"
                  className="text-xs font-bold text-orange-600 dark:text-orange-400 hover:underline flex items-center gap-1"
                >
                  <span>Get Directions</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>

            {/* Branch 2: Govind Garden */}
            <div className="w-[84vw] max-w-[340px] shrink-0 snap-center lg:w-auto lg:shrink rounded-3xl bg-white dark:bg-zinc-900/80 border border-slate-200 dark:border-zinc-800 p-5 sm:p-7 space-y-3 sm:space-y-4 hover:border-orange-500/50 transition-all shadow-md">
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-amber-100 dark:bg-amber-500/20 text-amber-700 dark:text-amber-400 border border-amber-200 dark:border-amber-500/30">
                    Govindpura Branch
                  </span>
                  <h3 className="text-xl font-black text-slate-900 dark:text-white mt-1">
                    Govind Garden (Raisen Road)
                  </h3>
                </div>
                <a
                  href="https://maps.google.com/?q=TNT+MMA+Fitness+Academy+Govind+Garden+Bhopal"
                  target="_blank"
                  rel="noreferrer"
                  className="p-2.5 rounded-xl bg-slate-100 dark:bg-zinc-800 hover:bg-orange-500 text-slate-600 dark:text-zinc-300 hover:text-white transition-colors"
                  title="Open in Google Maps"
                >
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>

              <p className="text-xs text-slate-600 dark:text-zinc-300 leading-relaxed">
                <strong className="text-slate-900 dark:text-white">Address:</strong> 12-B, Raisen Road, Govind Garden, Govindpura, Bhopal, Madhya Pradesh 462023
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs text-slate-500 dark:text-zinc-400">
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-orange-500 shrink-0" />
                  <a href="tel:+919713217866" className="hover:text-orange-600 dark:hover:text-white font-semibold">
                    +91 97132 17866
                  </a>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-orange-500 shrink-0" />
                  <span>06:00 AM - 10:00 PM</span>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 dark:border-zinc-800 flex items-center justify-between">
                <span className="text-[11px] text-slate-400 dark:text-zinc-500">Facilities: Heavy Bag Row, Calisthenics Zone, Stunts Floor</span>
                <a
                  href="https://maps.google.com/?q=TNT+MMA+Fitness+Academy+Govind+Garden+Bhopal"
                  target="_blank"
                  rel="noreferrer"
                  className="text-xs font-bold text-orange-600 dark:text-orange-400 hover:underline flex items-center gap-1"
                >
                  <span>Get Directions</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>

          </div>

          {/* Quick Inquiry Form (5 Cols) */}
          <div className="lg:col-span-5 rounded-3xl bg-white dark:bg-gradient-to-b dark:from-zinc-900 dark:to-zinc-950 border border-slate-200 dark:border-zinc-800 p-6 sm:p-8 space-y-6 shadow-xl">
            <div className="space-y-2">
              <h3 className="text-xl font-black text-slate-900 dark:text-white">
                Direct Front Desk Inquiry
              </h3>
              <p className="text-xs text-slate-500 dark:text-zinc-400">
                Have specific questions about training fees, kids admission, or coach consultation? Drop your message.
              </p>
            </div>

            {!submitted ? (
              <form onSubmit={handleInquirySubmit} className="space-y-4 text-xs">
                <div className="space-y-1.5">
                  <label className="font-bold text-slate-700 dark:text-zinc-300">Name</label>
                  <input
                    type="text"
                    required
                    placeholder="Your Name"
                    value={inquiryName}
                    onChange={(e) => setInquiryName(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 focus:border-orange-500 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-zinc-500 outline-none"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="font-bold text-slate-700 dark:text-zinc-300">WhatsApp / Phone</label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 98260 XXXXX"
                    value={inquiryPhone}
                    onChange={(e) => setInquiryPhone(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 focus:border-orange-500 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-zinc-500 outline-none"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="font-bold text-slate-700 dark:text-zinc-300">Message / Program of Interest</label>
                  <textarea
                    rows={3}
                    placeholder="e.g. Inquiring about Kids batch timings and fee concession..."
                    value={inquiryMessage}
                    onChange={(e) => setInquiryMessage(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 focus:border-orange-500 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-zinc-500 outline-none resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white font-extrabold text-xs uppercase tracking-wider shadow-lg shadow-orange-500/25 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Send Message to Front Desk</span>
                </button>
              </form>
            ) : (
              <div className="p-6 rounded-2xl bg-green-50 dark:bg-zinc-900 border border-green-200 dark:border-green-500/30 text-center space-y-3">
                <div className="w-10 h-10 rounded-full bg-green-100 dark:bg-green-500/20 text-green-600 dark:text-green-400 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h4 className="font-bold text-slate-900 dark:text-white text-sm">Message Sent!</h4>
                <p className="text-xs text-slate-600 dark:text-zinc-400">
                  Thank you, <strong className="text-slate-900 dark:text-white">{inquiryName}</strong>. Our front desk team will call or WhatsApp you within 2 hours.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="text-xs text-orange-600 dark:text-orange-400 font-bold hover:underline"
                >
                  Send another inquiry
                </button>
              </div>
            )}

            {/* Direct Phone Call Button */}
            <div className="pt-4 border-t border-slate-100 dark:border-zinc-800 flex items-center justify-between text-xs">
              <span className="text-slate-500 dark:text-zinc-400">Instant Help:</span>
              <a
                href="tel:+919713217866"
                className="text-orange-600 dark:text-orange-400 font-bold hover:underline flex items-center gap-1.5"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>+91 97132 17866</span>
              </a>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
