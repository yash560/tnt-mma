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
  Filter
} from 'lucide-react';

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
    comment: 'The level of dedication Coach Vikalp shows to every single student is unmatched in Bhopal. Whether you are a college student or working professional, the workouts are tailored to your stamina level. Best decision of my life to join TNT.',
    helpfulCount: 9,
  },
  {
    id: 'gr-6',
    name: 'Neha Agrawal',
    avatarColor: 'from-teal-500 to-cyan-600',
    isLocalGuide: true,
    reviewsCount: 15,
    rating: 5,
    date: '3 weeks ago',
    category: 'MMA',
    categoryLabel: 'Women Self-Defense & Boxing',
    headline: 'Super empowering environment for women in Bhopal',
    comment: 'As a woman stepping into a combat gym for the first time, I was nervous. But TNT MMA is the most respectful, safe, and empowering space. I learned real practical striking defense and boosted my stamina ten-fold!',
    helpfulCount: 16,
  },
];

export default function GoogleReviewsSection({ isFullPage = false }: { isFullPage?: boolean }) {
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredReviews = EXTENDED_GOOGLE_REVIEWS.filter((rev) => {
    const matchesCat = selectedCategory === 'ALL' || rev.category === selectedCategory;
    const matchesSearch = searchQuery === '' || 
      rev.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      rev.comment.toLowerCase().includes(searchQuery.toLowerCase()) ||
      rev.headline.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <section id="reviews" className={`py-20 ${isFullPage ? 'pt-28' : 'bg-slate-50 dark:bg-zinc-950/80 border-t border-slate-200 dark:border-zinc-800/80'} relative overflow-hidden`}>
      
      {/* Background Ambience */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-orange-500/10 dark:bg-orange-600/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 relative z-10">
        
        {/* Section Header with Google Official Badge Styling */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 shadow-sm text-xs font-bold">
            {/* Google Multicolored "G" */}
            <span className="flex items-center gap-0.5 font-black text-sm">
              <span className="text-blue-500">G</span>
              <span className="text-red-500">o</span>
              <span className="text-yellow-500">o</span>
              <span className="text-blue-500">g</span>
              <span className="text-green-500">l</span>
              <span className="text-red-500">e</span>
            </span>
            <span className="text-slate-400 dark:text-zinc-600">|</span>
            <span className="text-slate-800 dark:text-zinc-200 flex items-center gap-1">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <strong>4.9 Rating</strong> (100+ Verified Reviews)
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
            Real Athlete & Parent Reviews
          </h2>
          <p className="text-slate-600 dark:text-zinc-400 text-sm sm:text-base">
            Verified testimonials from members training across our Ayodhya Nagar and Govind Garden academies in Bhopal.
          </p>
        </div>

        {/* Google Metrics Summary Card */}
        <div className="rounded-3xl bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 p-6 sm:p-8 shadow-xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left: 4.9 Big Score (4 Cols) */}
          <div className="lg:col-span-4 text-center lg:text-left space-y-3 lg:border-r lg:border-slate-100 dark:lg:border-zinc-800 lg:pr-8">
            <div className="flex items-center justify-center lg:justify-start gap-3">
              <span className="text-5xl sm:text-6xl font-black text-slate-900 dark:text-white tracking-tight">
                4.9
              </span>
              <div className="space-y-1 text-left">
                <div className="flex items-center gap-1 text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-xs text-slate-500 dark:text-zinc-400 font-semibold">112 Verified Reviews</p>
              </div>
            </div>

            <p className="text-xs text-slate-600 dark:text-zinc-400">
              #1 Ranked Combat Sports & CrossFit Academy in Bhopal on Google Maps.
            </p>

            <a
              href="https://www.google.com/search?q=tnt+mma&oq=tnt+mma&gs_lcrp=EgZjaHJvbWUqBwgAEAAYgAQyBwgAEAAYgAQyDQgBEC4YrwEYxwEYgAQyBwgCEAAYgAQyBwgDEAAYgAQyBwgEEAAYgAQyBggFEEUYPDIGCAYQRRg8MgYIBxBFGDzSAQgxODUwajBqN6gCALACAA&sourceid=chrome&source=chrome.ob&ie=UTF-8#lpg=cid:CgIgAQ%3D%3D,ik:CAoSHENJQUJJaEJ3anFoV1JyVVRRa25RdGwwbkNGN00%3D"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 text-xs font-bold text-orange-600 dark:text-orange-400 hover:underline"
            >
              <span>Write a Review on Google</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Center: Rating Breakdown Bars (5 Cols) */}
          <div className="lg:col-span-5 space-y-2 text-xs">
            <div className="flex items-center gap-3">
              <span className="w-12 font-bold text-slate-700 dark:text-zinc-300">5 Stars</span>
              <div className="flex-1 h-3 rounded-full bg-slate-100 dark:bg-zinc-800 overflow-hidden">
                <div className="h-full bg-amber-400 rounded-full w-[96%]" />
              </div>
              <span className="w-8 font-mono text-slate-500 text-right">96%</span>
            </div>

            <div className="flex items-center gap-3">
              <span className="w-12 font-bold text-slate-700 dark:text-zinc-300">4 Stars</span>
              <div className="flex-1 h-3 rounded-full bg-slate-100 dark:bg-zinc-800 overflow-hidden">
                <div className="h-full bg-amber-400 rounded-full w-[4%]" />
              </div>
              <span className="w-8 font-mono text-slate-500 text-right">4%</span>
            </div>

            <div className="flex items-center gap-3">
              <span className="w-12 font-bold text-slate-400 dark:text-zinc-500">3 Stars</span>
              <div className="flex-1 h-3 rounded-full bg-slate-100 dark:bg-zinc-800 overflow-hidden">
                <div className="h-full bg-amber-400 rounded-full w-[0%]" />
              </div>
              <span className="w-8 font-mono text-slate-400 text-right">0%</span>
            </div>
          </div>

          {/* Right: Direct Actions (3 Cols) */}
          <div className="lg:col-span-3 text-center lg:text-right space-y-3">
            <a
              href="https://www.google.com/search?q=tnt+mma&oq=tnt+mma&gs_lcrp=EgZjaHJvbWUqBwgAEAAYgAQyBwgAEAAYgAQyDQgBEC4YrwEYxwEYgAQyBwgCEAAYgAQyBwgDEAAYgAQyBwgEEAAYgAQyBggFEEUYPDIGCAYQRRg8MgYIBxBFGDzSAQgxODUwajBqN6gCALACAA&sourceid=chrome&source=chrome.ob&ie=UTF-8#lpg=cid:CgIgAQ%3D%3D,ik:CAoSHENJQUJJaEJ3anFoV1JyVVRRa25RdGwwbkNGN00%3D"
              target="_blank"
              rel="noreferrer"
              className="w-full py-3 rounded-2xl bg-slate-900 dark:bg-zinc-800 hover:bg-orange-500 dark:hover:bg-orange-500 text-white font-extrabold text-xs uppercase tracking-wider shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>View On Google Maps</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>

            <p className="text-[11px] text-slate-500 dark:text-zinc-400">
              100% verified athlete feedback.
            </p>
          </div>

        </div>

        {/* Filter Pills & Live Search */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          
          {/* Category Pills */}
          <div className="flex items-center flex-wrap gap-2 text-xs w-full sm:w-auto">
            {[
              { id: 'ALL', label: 'All Reviews (112)' },
              { id: 'MMA', label: '🥊 MMA & Striking' },
              { id: 'KIDS', label: '👨‍👦 Kids Anti-Bullying' },
              { id: 'CROSSFIT', label: '🥗 Weight Loss & CrossFit' },
              { id: 'BJJ', label: '🥋 BJJ Grappling' },
              { id: 'COACH', label: '⭐ Coach Vikalp' },
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3.5 py-2 rounded-xl font-bold transition-all cursor-pointer ${
                  selectedCategory === cat.id
                    ? 'bg-orange-500 text-white shadow-md shadow-orange-500/20'
                    : 'bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 text-slate-600 dark:text-zinc-400 hover:bg-slate-100 dark:hover:bg-zinc-800'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search in reviews..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-xl bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 text-xs text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-zinc-500 outline-none focus:border-orange-500"
            />
          </div>

        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredReviews.map((rev) => (
            <div
              key={rev.id}
              className="rounded-3xl bg-white dark:bg-zinc-900/80 border border-slate-200 dark:border-zinc-800 p-6 space-y-4 hover:border-orange-500/50 transition-all duration-300 shadow-md hover:shadow-xl flex flex-col justify-between"
            >
              <div className="space-y-3">
                {/* Author Bar */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${rev.avatarColor} text-white flex items-center justify-center font-bold text-sm shadow-md`}>
                      {rev.name.charAt(0)}
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 dark:text-white text-sm flex items-center gap-1.5">
                        <span>{rev.name}</span>
                        {rev.isLocalGuide && (
                          <span className="text-[10px] px-1.5 py-0.2 rounded bg-amber-100 dark:bg-amber-500/20 text-amber-700 dark:text-amber-400 font-bold">
                            Local Guide
                          </span>
                        )}
                      </h4>
                      <p className="text-[11px] text-slate-500 dark:text-zinc-400">
                        {rev.reviewsCount ? `${rev.reviewsCount} reviews • ` : ''}{rev.date}
                      </p>
                    </div>
                  </div>

                  {/* Stars */}
                  <div className="flex items-center gap-0.5 text-amber-400">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                </div>

                {/* Category Badge */}
                <span className="inline-block text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded bg-orange-100 dark:bg-orange-500/10 text-orange-600 dark:text-orange-400 border border-orange-200 dark:border-orange-500/20">
                  {rev.categoryLabel}
                </span>

                {/* Headline & Body */}
                <h5 className="font-black text-slate-900 dark:text-white text-sm leading-snug">
                  &ldquo;{rev.headline}&rdquo;
                </h5>
                <p className="text-xs text-slate-600 dark:text-zinc-300 leading-relaxed">
                  {rev.comment}
                </p>
              </div>

              {/* Bottom Card Footer */}
              <div className="pt-3 border-t border-slate-100 dark:border-zinc-800 flex items-center justify-between text-[11px] text-slate-400 dark:text-zinc-500">
                <span className="flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-green-500" />
                  <span>Verified Google Athlete</span>
                </span>
                <span className="flex items-center gap-1 text-slate-500 dark:text-zinc-400">
                  <ThumbsUp className="w-3 h-3" />
                  <span>{rev.helpfulCount}</span>
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
