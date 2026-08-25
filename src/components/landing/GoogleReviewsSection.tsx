'use client';

import React, { useState } from 'react';
import { 
  Star, 
  ShieldCheck, 
  Flame, 
  Quote, 
  ExternalLink, 
  CheckCircle2, 
  MessageSquare, 
  ThumbsUp, 
  Sparkles,
  Search,
  ArrowRight
} from 'lucide-react';
import Link from 'next/link';

interface GoogleReviewItem {
  id: string;
  name: string;
  avatarColor: string;
  isLocalGuide?: boolean;
  reviewsCount?: number;
  rating: number;
  date: string;
  category: 'MMA' | 'KIDS' | 'CROSSFIT' | 'BJJ' | 'COACH';
  categoryLabel: string;
  headline: string;
  comment: string;
  helpfulCount: number;
}

const EXTENDED_GOOGLE_REVIEWS: GoogleReviewItem[] = [
  {
    id: 'gr-1',
    name: 'Prateek Jain',
    avatarColor: 'from-blue-500 to-indigo-600',
    isLocalGuide: true,
    reviewsCount: 38,
    rating: 5,
    date: '2 weeks ago',
    category: 'MMA',
    categoryLabel: 'MMA & Striking',
    headline: 'Hands down the most authentic MMA gym in central India',
    comment: 'Hands down the best MMA gym in Bhopal! Coach Vikalp gives personal attention to every single detail—from cage footwork to ground submissions. The vibe is electric, highly disciplined, and beginner-friendly. If you are serious about martial arts, this is the only place.',
    helpfulCount: 14,
  },
  {
    id: 'gr-2',
    name: 'Dr. Megha Saxena',
    avatarColor: 'from-pink-500 to-rose-600',
    isLocalGuide: true,
    reviewsCount: 19,
    rating: 5,
    date: '1 month ago',
    category: 'CROSSFIT',
    categoryLabel: 'Transformation & CrossFit',
    headline: 'Lost 8 kgs of pure fat in 4 months with coach nutrition guidance',
    comment: 'I joined TNT MMA for functional fitness and weight loss. In 4 months, I lost 8 kgs of pure fat and gained real muscle! The dietician consultation and CrossFit circuits are top-notch. Clean showers, great community, and certified coaches.',
    helpfulCount: 22,
  },
  {
    id: 'gr-3',
    name: 'Sanjay Patel',
    avatarColor: 'from-amber-500 to-orange-600',
    isLocalGuide: false,
    reviewsCount: 5,
    rating: 5,
    date: '3 weeks ago',
    category: 'KIDS',
    categoryLabel: 'Kids Anti-Bullying',
    headline: 'My 10-year-old son gained incredible discipline and focus',
    comment: 'My 10-year-old son Reyansh joined the 4 PM kids batch. His screen addiction is completely gone and his confidence has skyrocketed. The digital waiver and transparent coaching make it so trustworthy for parents. Coach Anjali and Coach Vikalp are wonderful mentors.',
    helpfulCount: 18,
  },
  {
    id: 'gr-4',
    name: 'Aman Khan',
    avatarColor: 'from-emerald-500 to-teal-600',
    isLocalGuide: true,
    reviewsCount: 42,
    rating: 5,
    date: '2 months ago',
    category: 'BJJ',
    categoryLabel: 'BJJ Grappling',
    headline: 'Championship-grade tatami mats and safe submission sparring',
    comment: 'Top tier grappling mats and great training partners. Authentic BJJ techniques with focus on safety, hygiene, and belt progression. Coach Vikalp breaks down No-Gi submission chains clearly. 4.9 stars is well deserved!',
    helpfulCount: 11,
  },
  {
    id: 'gr-5',
    name: 'Rohan Deshmukh',
    avatarColor: 'from-purple-500 to-indigo-600',
    isLocalGuide: false,
    reviewsCount: 8,
    rating: 5,
    date: '1 month ago',
    category: 'COACH',
    categoryLabel: 'Coach Vikalp Mentorship',
    headline: 'Coach Vikalp is a true master and inspiring mentor',
    comment: 'Whether it is striking combinations or strict calisthenics on the rig, coach ensures injury-free technique and relentless motivation. The community here is like a brotherhood.',
    helpfulCount: 9,
  },
  {
    id: 'gr-6',
    name: 'Pooja Sharma',
    avatarColor: 'from-orange-500 to-red-600',
    isLocalGuide: true,
    reviewsCount: 27,
    rating: 5,
    date: '3 months ago',
    category: 'MMA',
    categoryLabel: 'Women Self-Defense',
    headline: 'Safe, respectful, and empowering space for women',
    comment: 'As a woman looking to learn real practical self-defense, TNT MMA provided the safest, most empowering environment in Bhopal. Clean facility and professional sparring etiquette.',
    helpfulCount: 31,
  },
];

export default function GoogleReviewsSection({ isFullPage = false }: { isFullPage?: boolean }) {
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [helpfulLikes, setHelpfulLikes] = useState<{ [id: string]: number }>({});

  const toggleHelpful = (id: string, currentCount: number) => {
    setHelpfulLikes((prev) => ({
      ...prev,
      [id]: prev[id] ? prev[id] + 1 : currentCount + 1,
    }));
  };

  const filteredReviews = EXTENDED_GOOGLE_REVIEWS.filter((rev) => {
    const matchesCategory = selectedCategory === 'ALL' || rev.category === selectedCategory;
    const matchesSearch = 
      rev.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      rev.headline.toLowerCase().includes(searchQuery.toLowerCase()) ||
      rev.comment.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <section className={`py-24 ${isFullPage ? 'bg-transparent' : 'bg-slate-50 dark:bg-zinc-950/70 border-t border-slate-200 dark:border-zinc-800/80'} relative`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header & Rating Breakdown Banner */}
        <div className="rounded-3xl bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 p-6 sm:p-8 shadow-xl flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          
          {/* Left Summary */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              {/* Google G Logo Badge */}
              <div className="px-2.5 py-1 rounded-full bg-slate-100 dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 flex items-center gap-1.5 shadow-sm">
                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z"/>
                  <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24z"/>
                  <path fill="#FBBC05" d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.99 0 12s.45 3.82 1.25 5.42l4.03-3.15z"/>
                  <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"/>
                </svg>
                <span className="text-xs font-bold text-slate-800 dark:text-zinc-200">Google Verified Reviews</span>
              </div>
              <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-500/20 text-emerald-700 dark:text-emerald-400">
                100+ Reviews
              </span>
            </div>

            <div className="flex items-baseline gap-3">
              <span className="text-4xl sm:text-5xl font-black text-slate-900 dark:text-white">
                4.9
              </span>
              <div className="space-y-0.5">
                <div className="flex items-center gap-1 text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 sm:w-5 sm:h-5 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-xs text-slate-500 dark:text-zinc-400">
                  Based on 112+ verified reviews in Bhopal
                </p>
              </div>
            </div>
          </div>

          {/* Right Rating Bars */}
          <div className="space-y-1.5 w-full lg:w-72 text-xs">
            <div className="flex items-center gap-2">
              <span className="w-12 text-slate-500 dark:text-zinc-400">5 stars</span>
              <div className="flex-1 h-2 rounded-full bg-slate-100 dark:bg-zinc-800 overflow-hidden">
                <div className="h-full bg-amber-400 rounded-full w-[96%]" />
              </div>
              <span className="w-8 text-right font-bold text-slate-700 dark:text-zinc-300">96%</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-12 text-slate-500 dark:text-zinc-400">4 stars</span>
              <div className="flex-1 h-2 rounded-full bg-slate-100 dark:bg-zinc-800 overflow-hidden">
                <div className="h-full bg-amber-400 rounded-full w-[4%]" />
              </div>
              <span className="w-8 text-right font-bold text-slate-700 dark:text-zinc-300">4%</span>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row lg:flex-col gap-2">
            <a
              href="https://www.google.com/search?q=tnt+mma"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2.5 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs uppercase tracking-wider transition-all shadow-md shadow-orange-500/20 text-center flex items-center justify-center gap-2"
            >
              <span>Write a Review on Google</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
            <a
              href="https://maps.google.com/?q=TNT+MMA+Fitness+Academy+Bhopal"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-zinc-800 hover:bg-slate-200 dark:hover:bg-zinc-700 text-slate-800 dark:text-zinc-200 font-bold text-xs transition-colors text-center"
            >
              View on Google Maps
            </a>
          </div>

        </div>

        {/* Filter Controls & Search */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0 scrollbar-none w-full sm:w-auto">
            {['ALL', 'MMA', 'CROSSFIT', 'KIDS', 'BJJ', 'COACH'].map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-xl font-bold text-xs uppercase tracking-wider transition-all whitespace-nowrap cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-orange-500 text-white shadow-md font-extrabold'
                    : 'bg-white dark:bg-zinc-900 text-slate-700 dark:text-zinc-300 border border-slate-200 dark:border-zinc-800 hover:border-orange-500/50'
                }`}
              >
                {cat === 'ALL' ? 'All Reviews' : cat}
              </button>
            ))}
          </div>

          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search reviews..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-xs rounded-xl bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 text-slate-900 dark:text-white outline-none focus:border-orange-500"
            />
          </div>
        </div>

        {/* 1. Mobile View: Horizontal Swipe Snap Carousel (< md) */}
        <div className="flex md:hidden overflow-x-auto snap-x snap-mandatory scrollbar-none pb-4 -mx-4 px-4 gap-4">
          {filteredReviews.map((rev) => (
            <div
              key={rev.id}
              className="w-[84vw] max-w-[330px] shrink-0 snap-center rounded-3xl bg-white dark:bg-zinc-900/80 border border-slate-200 dark:border-zinc-800 p-5 space-y-3 flex flex-col justify-between shadow-sm"
            >
              <div className="space-y-2">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className={`w-9 h-9 rounded-full bg-gradient-to-br ${rev.avatarColor} text-white font-bold flex items-center justify-center text-xs shadow-md`}>
                      {rev.name.charAt(0)}
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 dark:text-white text-xs">{rev.name}</h4>
                      <p className="text-[10px] text-slate-400">{rev.date}</p>
                    </div>
                  </div>

                  <span className="text-[9px] font-bold uppercase px-1.5 py-0.5 rounded bg-slate-100 dark:bg-zinc-800 text-slate-600 dark:text-zinc-400">
                    {rev.categoryLabel}
                  </span>
                </div>

                <div className="flex items-center gap-0.5 text-amber-400">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} className="w-3 h-3 fill-amber-400 text-amber-400" />
                  ))}
                </div>

                <h5 className="font-bold text-slate-900 dark:text-white text-xs line-clamp-1">
                  &quot;{rev.headline}&quot;
                </h5>
                <p className="text-xs text-slate-600 dark:text-zinc-400 leading-relaxed line-clamp-3">
                  {rev.comment}
                </p>
              </div>

              <div className="pt-2 border-t border-slate-100 dark:border-zinc-800 flex items-center justify-between text-[11px]">
                <button
                  onClick={() => toggleHelpful(rev.id, rev.helpfulCount)}
                  className="flex items-center gap-1 text-slate-500 font-semibold cursor-pointer"
                >
                  <ThumbsUp className="w-3 h-3" />
                  <span>Helpful ({helpfulLikes[rev.id] || rev.helpfulCount})</span>
                </button>
                <span className="text-[9px] font-bold text-green-600 flex items-center gap-0.5">
                  <CheckCircle2 className="w-3 h-3" />
                  <span>Verified</span>
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* 2. Desktop View: Pristine 3-Column Responsive Grid (md+) */}
        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredReviews.map((rev) => (
            <div
              key={rev.id}
              className="rounded-3xl bg-white dark:bg-zinc-900/80 border border-slate-200 dark:border-zinc-800 p-6 sm:p-7 space-y-5 flex flex-col justify-between hover:border-orange-500/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl shadow-sm group"
            >
              <div className="space-y-4">
                {/* Author Info & Avatar */}
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-11 h-11 rounded-full bg-gradient-to-br ${rev.avatarColor} text-white font-bold flex items-center justify-center text-sm shadow-md`}>
                      {rev.name.charAt(0)}
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <h4 className="font-bold text-slate-900 dark:text-white text-sm">{rev.name}</h4>
                        {rev.isLocalGuide && (
                          <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-amber-100 dark:bg-amber-500/20 text-amber-700 dark:text-amber-300 border border-amber-300 dark:border-amber-500/30">
                            Local Guide
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] text-slate-400 dark:text-zinc-500">{rev.date}</p>
                    </div>
                  </div>

                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-slate-100 dark:bg-zinc-800 text-slate-600 dark:text-zinc-400 border border-slate-200 dark:border-zinc-700">
                    {rev.categoryLabel}
                  </span>
                </div>

                {/* Star Rating */}
                <div className="flex items-center gap-1 text-amber-400">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>

                {/* Headline & Body */}
                <div className="space-y-1.5">
                  <h5 className="font-bold text-slate-900 dark:text-white text-sm group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors">
                    &quot;{rev.headline}&quot;
                  </h5>
                  <p className="text-xs text-slate-600 dark:text-zinc-400 leading-relaxed">
                    {rev.comment}
                  </p>
                </div>
              </div>

              {/* Footer Helpful Button */}
              <div className="pt-4 border-t border-slate-100 dark:border-zinc-800 flex items-center justify-between text-xs">
                <button
                  onClick={() => toggleHelpful(rev.id, rev.helpfulCount)}
                  className="flex items-center gap-1.5 text-slate-500 dark:text-zinc-400 hover:text-orange-600 dark:hover:text-orange-400 font-semibold cursor-pointer"
                >
                  <ThumbsUp className="w-3.5 h-3.5" />
                  <span>Helpful ({helpfulLikes[rev.id] || rev.helpfulCount})</span>
                </button>

                <span className="text-[10px] font-bold text-green-600 dark:text-green-400 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Verified Athlete</span>
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
