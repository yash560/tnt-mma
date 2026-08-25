'use client';

import React, { useState, useMemo } from 'react';
import { 
  Camera, 
  MapPin, 
  Sparkles, 
  ExternalLink, 
  Maximize2, 
  X, 
  Flame, 
  Users, 
  Dumbbell, 
  Swords, 
  Search,
  ChevronLeft,
  ChevronRight,
  ArrowRight
} from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import Link from 'next/link';

interface MediaItem {
  id: string;
  title: string;
  category: 'TEAM' | 'SPARRING' | 'CROSSFIT' | 'BAGS';
  categoryLabel: string;
  src: string;
  location: string;
  caption: string;
  tags: string[];
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
    tags: ['LakeRun', 'Endurance', 'TeamTNT', 'CoachVikalp', 'Outdoor'],
  },
  {
    id: 'm-2',
    title: 'CrossFit Pull-Up Rig & Calisthenics Zone',
    category: 'CROSSFIT',
    categoryLabel: 'CrossFit & Rig',
    src: '/images/real/tnt_calisthenics_rig.jpg',
    location: 'Nizamuddin Road Branch',
    caption: 'Athlete performing strict gymnastic pull-ups and core toes-to-bar on the heavy-duty CrossFit multi-station rig under coach supervision.',
    tags: ['CrossFit', 'Calisthenics', 'PullUpRig', 'Strength'],
  },
  {
    id: 'm-3',
    title: 'Fighter Balance & Medicine Ball Core Stability',
    category: 'SPARRING',
    categoryLabel: 'MMA & Conditioning',
    src: '/images/real/tnt_balance_conditioning.jpg',
    location: 'Ayodhya Nagar Academy',
    caption: 'Pro fighter executing MMA balance posture drills on medicine balls to develop takedown defense equilibrium and isometric core stability.',
    tags: ['Balance', 'CoreStability', 'FighterConditioning', 'MMA'],
  },
  {
    id: 'm-4',
    title: 'Striking Padwork & Defensive Footwork',
    category: 'SPARRING',
    categoryLabel: 'Padwork & Sparring',
    src: '/images/real/tnt_sparring_brucelee.jpg',
    location: 'Combat Floor Mat Zone',
    caption: 'Coach Vikalp holding Thai pads for sharp jab-cross combinations, slipping counters, and angle pivots in front of the iconic Bruce Lee wall.',
    tags: ['BruceLeeWall', 'MuayThai', 'Striking', 'CoachVikalp', 'Padwork'],
  },
  {
    id: 'm-5',
    title: 'Heavy Bag Row & Dutch Kickboxing Combinations',
    category: 'BAGS',
    categoryLabel: 'Heavy Bags',
    src: '/images/real/tnt_heavybag_kickboxing.jpg',
    location: 'Raisen Road / Govind Garden Branch',
    caption: 'Athletes working on the 6-bag heavy punching row for continuous 3-minute striking power rounds and low kick conditioning.',
    tags: ['HeavyBags', 'Kickboxing', 'DutchCombinations', 'GovindGarden'],
  },
  {
    id: 'm-6',
    title: 'TNT MMA Bhopal Academy Interior & Mat Layout',
    category: 'TEAM',
    categoryLabel: 'Gym Interior',
    src: '/images/real/tnt_gym_interior_training.jpg',
    location: 'Main Academy Facility',
    caption: 'Padded high-density combat mats, mirrors, Olympic barbells, kettlebells, and functional strength turf at the Bhopal academy.',
    tags: ['MatLayout', 'GymInterior', 'OlympicLifting', 'AyodhyaNagar'],
  },
  {
    id: 'm-7',
    title: 'TNT Fight Team & Coaching Staff',
    category: 'TEAM',
    categoryLabel: 'Coaches & Athletes',
    src: '/images/real/tnt_team_pose.jpg',
    location: 'TNT Training Floor',
    caption: 'Coach Vikalp with academy fight champions and senior students after evening combat sparring sessions.',
    tags: ['FightTeam', 'CoachVikalp', 'Champions', 'EveningBatch'],
  },
];

export default function RealPhotoGallery({ isFullPage = false }: { isFullPage?: boolean }) {
  const { t } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeModalIndex, setActiveModalIndex] = useState<number | null>(null);

  const categories = [
    { id: 'ALL', label: t.gallery_all, icon: Camera },
    { id: 'TEAM', label: t.gallery_lake, icon: Users },
    { id: 'SPARRING', label: t.gallery_mma, icon: Swords },
    { id: 'CROSSFIT', label: t.gallery_crossfit, icon: Dumbbell },
    { id: 'BAGS', label: t.gallery_bags, icon: Flame },
  ];

  // Filtered media by Category and Search Query / Tag
  const filteredItems = useMemo(() => {
    return REAL_MEDIA_ITEMS.filter((item) => {
      const matchesCat = selectedCategory === 'ALL' || item.category === selectedCategory;
      const query = searchQuery.toLowerCase().trim();
      if (!query) return matchesCat;

      const matchesSearch = 
        item.title.toLowerCase().includes(query) ||
        item.location.toLowerCase().includes(query) ||
        item.caption.toLowerCase().includes(query) ||
        item.tags.some(tag => tag.toLowerCase().includes(query));

      return matchesCat && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  const activeItem = activeModalIndex !== null ? filteredItems[activeModalIndex] : null;

  const handleNext = () => {
    if (activeModalIndex !== null && activeModalIndex < filteredItems.length - 1) {
      setActiveModalIndex(activeModalIndex + 1);
    } else {
      setActiveModalIndex(0);
    }
  };

  const handlePrev = () => {
    if (activeModalIndex !== null && activeModalIndex > 0) {
      setActiveModalIndex(activeModalIndex - 1);
    } else {
      setActiveModalIndex(filteredItems.length - 1);
    }
  };

  return (
    <section className={`py-12 sm:py-16 ${isFullPage ? 'bg-transparent' : 'bg-slate-50/50 dark:bg-zinc-950/60 border-y border-slate-200/60 dark:border-zinc-800/60'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 sm:space-y-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-600 dark:text-orange-400 text-xs font-bold uppercase tracking-wider">
              <Camera className="w-3.5 h-3.5" />
              <span>{t.gallery_title}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-slate-900 dark:text-white">
              Authentic Bhopal Mats &amp; Fight Camp Moments
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-zinc-400 max-w-2xl">
              {t.gallery_subtitle}
            </p>
          </div>

          {/* Search / Photos Lookup Input */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search photos, tags, coach..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-8 py-2 text-xs rounded-2xl bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 text-slate-900 dark:text-white outline-none focus:border-orange-500 shadow-sm"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-white"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex items-center justify-between gap-3 overflow-x-auto pb-1 scrollbar-none -mx-4 px-4 md:mx-0 md:px-0">
          <div className="flex items-center gap-2 shrink-0">
            {categories.map((cat) => {
              const Icon = cat.icon;
              const isActive = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-3 py-1.5 rounded-xl font-bold text-xs flex items-center gap-1.5 transition-all whitespace-nowrap cursor-pointer ${
                    isActive
                      ? 'bg-orange-500 text-white shadow-md shadow-orange-500/20'
                      : 'bg-white dark:bg-zinc-900 text-slate-700 dark:text-zinc-300 border border-slate-200 dark:border-zinc-800 hover:border-orange-500/50'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{cat.label}</span>
                </button>
              );
            })}
          </div>

          <span className="hidden sm:block text-[11px] font-bold text-slate-500 dark:text-zinc-400 shrink-0">
            {filteredItems.length} Photos
          </span>
        </div>

        {/* Mobile Swipe Hint */}
        <div className="flex sm:hidden items-center justify-between text-[11px] text-slate-400 dark:text-zinc-500 px-1 font-semibold">
          <span>👉 Swipe photos horizontally ({filteredItems.length})</span>
          <span className="text-orange-500 font-bold">Tap to view</span>
        </div>

        {/* Bento Grid Gallery: Swipeable on Mobile (<sm), Grid on Desktop (sm+) */}
        {filteredItems.length === 0 ? (
          <div className="p-8 text-center rounded-3xl bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 space-y-3">
            <Camera className="w-7 h-7 text-slate-400 mx-auto" />
            <p className="text-xs font-bold text-slate-700 dark:text-zinc-300">No photos matching &quot;{searchQuery}&quot;</p>
            <button 
              onClick={() => { setSearchQuery(''); setSelectedCategory('ALL'); }}
              className="text-xs font-bold text-orange-500 hover:underline"
            >
              Clear Filters
            </button>
          </div>
        ) : (
          <div className="flex sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 overflow-x-auto snap-x snap-mandatory scrollbar-none pb-4 -mx-4 px-4 sm:mx-0 sm:px-0">
            {filteredItems.map((item, idx) => (
              <div
                key={item.id}
                onClick={() => setActiveModalIndex(idx)}
                className="w-[82vw] max-w-[310px] shrink-0 snap-center sm:w-auto sm:shrink group relative rounded-3xl overflow-hidden bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800/80 shadow-md hover:shadow-xl hover:border-orange-500/50 transition-all duration-300 cursor-pointer flex flex-col justify-between"
              >
                {/* Image Aspect */}
                <div className="relative h-48 sm:h-56 w-full overflow-hidden bg-slate-950">
                  <img
                    src={item.src}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  
                  {/* Category Pill Over Image */}
                  <div className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-white text-[9px] sm:text-[10px] font-bold uppercase tracking-wider flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-orange-500" />
                    <span>{item.categoryLabel}</span>
                  </div>

                  {/* Zoom Action */}
                  <div className="absolute top-2.5 right-2.5 p-1.5 rounded-full bg-black/60 backdrop-blur-md text-white opacity-0 group-hover:opacity-100 transition-opacity">
                    <Maximize2 className="w-3.5 h-3.5" />
                  </div>
                </div>

                {/* Caption & Location Card */}
                <div className="p-3.5 sm:p-4 space-y-1.5">
                  <div className="flex items-center gap-1 text-[10px] sm:text-[11px] font-semibold text-orange-600 dark:text-orange-400">
                    <MapPin className="w-3 h-3 shrink-0" />
                    <span className="truncate">{item.location}</span>
                  </div>
                  <h3 className="font-black text-slate-900 dark:text-white text-xs sm:text-sm group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors line-clamp-1">
                    {item.title}
                  </h3>
                  <p className="text-[11px] sm:text-xs text-slate-600 dark:text-zinc-400 line-clamp-2 leading-relaxed">
                    {item.caption}
                  </p>

                  {/* Tags */}
                  <div className="pt-1 flex flex-wrap gap-1">
                    {item.tags.slice(0, 3).map((tg, tIdx) => (
                      <span 
                        key={tIdx}
                        onClick={(e) => {
                          e.stopPropagation();
                          setSearchQuery(tg);
                        }}
                        className="text-[9px] font-semibold px-1.5 py-0.2 rounded bg-slate-100 dark:bg-zinc-800 text-slate-600 dark:text-zinc-300 hover:bg-orange-50 hover:text-orange-600 transition-colors"
                      >
                        #{tg}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>

      {/* Interactive Lightbox Modal */}
      {activeItem && (
        <div 
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-xl flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-200"
          onClick={() => setActiveModalIndex(null)}
        >
          <div 
            className="relative max-w-4xl w-full bg-zinc-950 border border-zinc-800 rounded-3xl overflow-hidden shadow-2xl space-y-3 sm:space-y-4 max-h-[90vh] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setActiveModalIndex(null)}
              className="absolute top-3 right-3 z-20 p-2 rounded-full bg-black/70 hover:bg-red-600 text-white transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Navigation Arrows */}
            <button
              onClick={handlePrev}
              className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-20 p-2 sm:p-3 rounded-full bg-black/70 hover:bg-orange-500 text-white transition-all cursor-pointer"
              title="Previous Photo"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <button
              onClick={handleNext}
              className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-20 p-2 sm:p-3 rounded-full bg-black/70 hover:bg-orange-500 text-white transition-all cursor-pointer"
              title="Next Photo"
            >
              <ChevronRight className="w-5 h-5" />
            </button>

            {/* Large Image Frame */}
            <div className="relative flex-1 min-h-0 flex items-center justify-center bg-black p-2">
              <img
                src={activeItem.src}
                alt={activeItem.title}
                className="max-h-[55vh] sm:max-h-[65vh] w-auto max-w-full object-contain"
              />
            </div>

            {/* Metadata Footer */}
            <div className="p-4 sm:p-6 space-y-2 bg-zinc-900/90 border-t border-zinc-800">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5">
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-orange-500/20 text-orange-400 border border-orange-500/30">
                      {activeItem.categoryLabel}
                    </span>
                    <span className="text-[11px] sm:text-xs text-zinc-400 flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-orange-500" />
                      <span>{activeItem.location}</span>
                    </span>
                  </div>
                  <h3 className="text-sm sm:text-lg font-black text-white">{activeItem.title}</h3>
                </div>

                <a
                  href="https://www.google.com/search?q=tnt+mma"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 rounded-xl bg-zinc-800 hover:bg-orange-500 text-white font-bold text-xs flex items-center gap-1.5 self-start sm:self-auto transition-colors"
                >
                  <span>Google Photos &amp; Maps</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>

              <p className="text-[11px] sm:text-xs text-zinc-300 leading-relaxed line-clamp-3 sm:line-clamp-none">
                {activeItem.caption}
              </p>
            </div>

          </div>
        </div>
      )}

    </section>
  );
}
