'use client';

import React, { useState } from 'react';
import { 
  Camera, 
  MapPin, 
  Sparkles, 
  ExternalLink, 
  Maximize2, 
  X, 
  Play, 
  Flame, 
  Users, 
  Dumbbell, 
  Swords, 
  Award 
} from 'lucide-react';
import Image from 'next/image';

interface MediaItem {
  id: string;
  title: string;
  category: 'TEAM' | 'SPARRING' | 'CROSSFIT' | 'BAGS';
  categoryLabel: string;
  src: string;
  location: string;
  caption: string;
  isVideo?: boolean;
}

const REAL_MEDIA_ITEMS: MediaItem[] = [
  {
    id: 'm-1',
    title: 'TNT Athlete Team & Lake Conditioning Run',
    category: 'TEAM',
    categoryLabel: 'Team & Outdoor',
    src: '/images/real/tnt_team_outdoor_lake.jpg',
    location: 'Upper Lake Bhopal (VIP Road Trail)',
    caption: 'Head Coach Vikalp leading the Sunday 10K endurance lake run and outdoor mobility drills with the athlete squad.',
  },
  {
    id: 'm-2',
    title: 'CrossFit Pull-Up Rig & Calisthenics Zone',
    category: 'CROSSFIT',
    categoryLabel: 'CrossFit & Rig',
    src: '/images/real/tnt_calisthenics_rig.jpg',
    location: 'Nizamuddin Road Branch',
    caption: 'Athlete performing strict gymnastic pull-ups and core toes-to-bar on the heavy-duty CrossFit multi-station rig under coach supervision.',
  },
  {
    id: 'm-3',
    title: 'Fighter Balance & Medicine Ball Core Stability',
    category: 'SPARRING',
    categoryLabel: 'MMA & Conditioning',
    src: '/images/real/tnt_balance_conditioning.jpg',
    location: 'Ayodhya Nagar Academy',
    caption: 'Pro fighter executing MMA balance posture drills on medicine balls to develop takedown defense equilibrium and isometric core stability.',
  },
  {
    id: 'm-4',
    title: 'Striking Padwork & Defensive Footwork',
    category: 'SPARRING',
    categoryLabel: 'Padwork & Sparring',
    src: '/images/real/tnt_sparring_brucelee.jpg',
    location: 'Combat Floor Mat Zone',
    caption: 'Coach Vikalp holding Thai pads for sharp jab-cross combinations, slipping counters, and angle pivots in front of the iconic Bruce Lee wall.',
  },
  {
    id: 'm-5',
    title: 'Heavy Bag Row & Dutch Kickboxing Combinations',
    category: 'BAGS',
    categoryLabel: 'Heavy Bags',
    src: '/images/real/tnt_heavybag_kickboxing.jpg',
    location: 'Raisen Road / Govind Garden Branch',
    caption: 'Athletes working on the 6-bag heavy punching row for continuous 3-minute striking power rounds and low kick conditioning.',
  },
  {
    id: 'm-6',
    title: 'TNT MMA Bhopal Academy Interior & Mat Layout',
    category: 'TEAM',
    categoryLabel: 'Gym Interior',
    src: '/images/real/tnt_gym_interior_training.jpg',
    location: 'Main Academy Facility',
    caption: 'Padded high-density combat mats, mirrors, Olympic barbells, kettlebells, and functional strength turf at the Bhopal academy.',
  },
  {
    id: 'm-7',
    title: 'TNT Fight Team & Coaching Staff',
    category: 'TEAM',
    categoryLabel: 'Coaches & Athletes',
    src: '/images/real/tnt_team_pose.jpg',
    location: 'TNT Training Floor',
    caption: 'Coach Vikalp with academy fight champions and senior students after evening combat sparring sessions.',
  },
];

export default function RealPhotoGallery({ isFullPage = false }: { isFullPage?: boolean }) {
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [activeModalItem, setActiveModalItem] = useState<MediaItem | null>(null);

  const filteredMedia = selectedCategory === 'ALL'
    ? REAL_MEDIA_ITEMS
    : REAL_MEDIA_ITEMS.filter(m => m.category === selectedCategory);

  return (
    <section id="gallery" className={`py-20 ${isFullPage ? 'pt-28' : 'bg-white dark:bg-zinc-950/80 border-t border-slate-200 dark:border-zinc-800'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-600 dark:text-orange-400 text-xs font-bold uppercase tracking-wider">
            <Camera className="w-3.5 h-3.5" />
            100% Authentic Gym Photos & Videos
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
            Real Mat Action at TNT MMA Bhopal
          </h2>
          <p className="text-slate-600 dark:text-zinc-400 text-sm sm:text-base">
            No stock AI models. Experience our real fighters, Head Coach Vikalp, morning lake runs, CrossFit rigs, and heavy bag rows.
          </p>
        </div>

        {/* Filter Categories */}
        <div className="flex items-center justify-center flex-wrap gap-2 text-xs">
          {[
            { id: 'ALL', label: 'All Photos & Action', icon: Sparkles },
            { id: 'TEAM', label: 'Team & Outdoor Lake Runs', icon: Users },
            { id: 'SPARRING', label: 'MMA & Padwork', icon: Swords },
            { id: 'CROSSFIT', label: 'CrossFit & Calisthenics Rig', icon: Dumbbell },
            { id: 'BAGS', label: 'Heavy Punching Bags', icon: Flame },
          ].map((cat) => {
            const Icon = cat.icon;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2.5 rounded-2xl font-bold uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer ${
                  selectedCategory === cat.id
                    ? 'bg-orange-500 text-white shadow-md shadow-orange-500/25 scale-105'
                    : 'bg-slate-100 dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-zinc-800'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>

        {/* Responsive Bento Media Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMedia.map((item, index) => {
            const isFeatured = item.id === 'm-1' || item.id === 'm-6';

            return (
              <div
                key={item.id}
                onClick={() => setActiveModalItem(item)}
                className={`group relative rounded-3xl overflow-hidden bg-slate-900 border border-slate-200 dark:border-zinc-800 shadow-lg cursor-pointer transition-all duration-300 hover:shadow-2xl hover:scale-[1.02] hover:border-orange-500/60 ${
                  isFeatured ? 'sm:col-span-2 lg:col-span-2' : ''
                }`}
              >
                {/* Image Frame */}
                <div className={`relative w-full ${isFeatured ? 'h-72 sm:h-96' : 'h-72'} overflow-hidden bg-zinc-950`}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={item.src}
                    alt={item.title}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
                </div>

                {/* Overlay Badge */}
                <div className="absolute top-4 left-4 flex items-center gap-2">
                  <span className="px-3 py-1 rounded-full bg-black/70 backdrop-blur-md border border-white/20 text-orange-400 text-[10px] font-extrabold uppercase tracking-wider">
                    {item.categoryLabel}
                  </span>
                </div>

                <div className="absolute top-4 right-4 p-2 rounded-xl bg-black/60 backdrop-blur-md text-white opacity-0 group-hover:opacity-100 transition-opacity">
                  <Maximize2 className="w-4 h-4" />
                </div>

                {/* Caption Footer */}
                <div className="absolute bottom-0 inset-x-0 p-5 space-y-1.5 text-white">
                  <div className="flex items-center gap-1.5 text-[11px] text-orange-400 font-semibold">
                    <MapPin className="w-3.5 h-3.5 shrink-0" />
                    <span>{item.location}</span>
                  </div>
                  <h3 className="text-base sm:text-lg font-black leading-tight text-white group-hover:text-orange-300 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs text-zinc-300 line-clamp-2 leading-relaxed">
                    {item.caption}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Google Maps Photos Direct Citation Card */}
        <div className="p-6 sm:p-8 rounded-3xl bg-slate-50 dark:bg-gradient-to-r dark:from-zinc-900 dark:to-orange-950/20 border border-slate-200 dark:border-zinc-800 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-md">
          <div className="space-y-1 text-center sm:text-left">
            <h4 className="text-lg font-black text-slate-900 dark:text-white flex items-center justify-center sm:justify-start gap-2">
              <span>Verified 4.9★ Google Business Profile</span>
              <span className="text-xs px-2 py-0.5 rounded bg-orange-100 dark:bg-orange-500/20 text-orange-600 dark:text-orange-400 font-bold">100+ Reviews</span>
            </h4>
            <p className="text-xs text-slate-600 dark:text-zinc-400">
              Browse 70+ high-resolution photos, member reviews, and videos on our verified Google Maps listing.
            </p>
          </div>

          <a
            href="https://www.google.com/search?q=tnt+mma&oq=tnt+mma&gs_lcrp=EgZjaHJvbWUqBwgAEAAYgAQyBwgAEAAYgAQyDQgBEC4YrwEYxwEYgAQyBwgCEAAYgAQyBwgDEAAYgAQyBwgEEAAYgAQyBggFEEUYPDIGCAYQRRg8MgYIBxBFGDzSAQgxODUwajBqN6gCALACAA&sourceid=chrome&source=chrome.ob&ie=UTF-8#lpg=cid:CgIgAQ%3D%3D,ik:CAoSHENJQUJJaEJ3anFoV1JyVVRRa25RdGwwbkNGN00%3D"
            target="_blank"
            rel="noreferrer"
            className="px-5 py-3 rounded-2xl bg-orange-500 hover:bg-orange-600 text-white font-extrabold text-xs uppercase tracking-wider shadow-md flex items-center gap-2 shrink-0 transition-transform active:scale-95"
          >
            <span>View All Google Photos & Reviews</span>
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>

      </div>

      {/* Lightbox Modal */}
      {activeModalItem && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-zinc-950 border border-zinc-800 rounded-3xl max-w-3xl w-full overflow-hidden shadow-2xl space-y-4">
            
            {/* Modal Header */}
            <div className="p-4 sm:p-5 flex items-center justify-between border-b border-zinc-800 text-white">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-orange-400">
                  {activeModalItem.categoryLabel}
                </span>
                <h3 className="text-base sm:text-lg font-black text-white">{activeModalItem.title}</h3>
              </div>
              <button
                onClick={() => setActiveModalItem(null)}
                className="p-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Image */}
            <div className="relative w-full max-h-[60vh] h-80 sm:h-[420px] bg-black flex items-center justify-center overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={activeModalItem.src}
                alt={activeModalItem.title}
                className="max-w-full max-h-full object-contain"
              />
            </div>

            {/* Modal Info Footer */}
            <div className="p-5 space-y-2 text-white border-t border-zinc-800 text-xs">
              <div className="flex items-center gap-2 text-orange-400 font-bold">
                <MapPin className="w-4 h-4" />
                <span>{activeModalItem.location}</span>
              </div>
              <p className="text-zinc-300 leading-relaxed text-xs sm:text-sm">
                {activeModalItem.caption}
              </p>
            </div>

          </div>
        </div>
      )}

    </section>
  );
}
