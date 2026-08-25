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
            <span>Visit Our Bhopal Facilities</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
            Two Prime Academy Locations in Bhopal
          </h2>
          <p className="text-slate-600 dark:text-zinc-400 text-sm sm:text-base">
            Conveniently accessible with dedicated parking, showers, lockers, and pro fight equipment.
          </p>
        </div>

        {/* Locations & Contact Form Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Branch Cards (7 Cols) */}
          <div className="lg:col-span-7 flex lg:flex-col gap-6 overflow-x-auto lg:overflow-visible snap-x snap-mandatory scrollbar-none pb-2 -mx-4 px-4 sm:mx-0 sm:px-0">
            
            {/* Branch 1: Nizamuddin Rd */}
            <div className="w-[84vw] max-w-[360px] shrink-0 snap-center lg:w-full rounded-3xl bg-white dark:bg-zinc-900/80 border border-slate-200 dark:border-zinc-800 p-6 sm:p-8 space-y-4 hover:border-orange-500/50 transition-all shadow-md">
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-orange-100 dark:bg-orange-500/20 text-orange-600 dark:text-orange-400 border border-orange-200 dark:border-orange-500/30">
                    Main Academy Branch
                  </span>
                  <h3 className="text-xl font-black text-slate-900 dark:text-white mt-1">
                    Ayodhya Nagar &amp; Nizamuddin Road
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
            <div className="w-[84vw] max-w-[360px] shrink-0 snap-center lg:w-full rounded-3xl bg-white dark:bg-zinc-900/80 border border-slate-200 dark:border-zinc-800 p-6 sm:p-8 space-y-4 hover:border-orange-500/50 transition-all shadow-md">
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
                <strong className="text-slate-900 dark:text-white">Address:</strong> In front of Govind Garden, Near Chetak Bridge, Govindpura, Raisen Road, Bhopal, MP 462023
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
                <span className="text-[11px] text-slate-400 dark:text-zinc-500">Facilities: Heavy Bags Row, MMA Mats, Strength Equipment</span>
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

          {/* Quick Contact Form (5 Cols) */}
          <div className="lg:col-span-5 rounded-3xl bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 p-6 sm:p-8 space-y-6 shadow-xl sticky top-24">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-orange-100 dark:bg-orange-500/20 text-orange-600 dark:text-orange-400 border border-orange-200 dark:border-orange-500/30">
                Direct Frontdesk Support
              </span>
              <h3 className="text-xl font-black text-slate-900 dark:text-white mt-1">
                Send an Inquiry to Coach Vikalp
              </h3>
              <p className="text-xs text-slate-500 dark:text-zinc-400 mt-0.5">
                Have questions regarding batches, kids programs, or personal training?
              </p>
            </div>

            {submitted ? (
              <div className="p-6 rounded-2xl bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-800 text-center space-y-2">
                <CheckCircle2 className="w-10 h-10 text-green-600 dark:text-green-400 mx-auto" />
                <h4 className="font-bold text-slate-900 dark:text-white text-sm">Message Dispatched!</h4>
                <p className="text-xs text-slate-600 dark:text-zinc-400">
                  Coach Vikalp has received your message and will reach out to <strong className="text-slate-900 dark:text-white">{inquiryPhone}</strong> shortly via WhatsApp.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="text-xs text-orange-500 font-bold hover:underline pt-2"
                >
                  Send another inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleInquirySubmit} className="space-y-4 text-xs">
                <div className="space-y-1">
                  <label className="font-bold text-slate-700 dark:text-zinc-300">Your Full Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Aarav Sharma"
                    value={inquiryName}
                    onChange={(e) => setInquiryName(e.target.value)}
                    className="w-full p-3 rounded-xl bg-slate-50 dark:bg-zinc-950 border border-slate-200 dark:border-zinc-800 text-slate-900 dark:text-white outline-none focus:border-orange-500"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-700 dark:text-zinc-300">WhatsApp / Phone Number</label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 98260 XXXXX"
                    value={inquiryPhone}
                    onChange={(e) => setInquiryPhone(e.target.value)}
                    className="w-full p-3 rounded-xl bg-slate-50 dark:bg-zinc-950 border border-slate-200 dark:border-zinc-800 text-slate-900 dark:text-white outline-none focus:border-orange-500"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-700 dark:text-zinc-300">Inquiry Message</label>
                  <textarea
                    rows={3}
                    placeholder="Tell us what martial art or fitness program you are interested in..."
                    value={inquiryMessage}
                    onChange={(e) => setInquiryMessage(e.target.value)}
                    className="w-full p-3 rounded-xl bg-slate-50 dark:bg-zinc-950 border border-slate-200 dark:border-zinc-800 text-slate-900 dark:text-white outline-none focus:border-orange-500 resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-2xl bg-orange-500 hover:bg-orange-600 text-white font-extrabold text-xs uppercase tracking-wider shadow-lg shadow-orange-500/25 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>Send Message to Frontdesk</span>
                </button>
              </form>
            )}

            {/* Direct WhatsApp Callout */}
            <div className="pt-2 border-t border-slate-100 dark:border-zinc-800 text-center">
              <a
                href="https://wa.me/919713217866?text=Hi%20Coach%20Vikalp,%20I%20am%20interested%20in%20joining%20TNT%20MMA%20Bhopal."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs text-emerald-600 dark:text-emerald-400 font-bold hover:underline"
              >
                <span>Or message directly on WhatsApp: +91 97132 17866 →</span>
              </a>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
