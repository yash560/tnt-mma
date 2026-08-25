'use client';

import React, { useState } from 'react';
import { 
  Check, 
  Flame, 
  Sparkles, 
  ShieldCheck, 
  ArrowRight, 
  Zap, 
  Tag 
} from 'lucide-react';
import { PRICING_PLANS } from '@/lib/initialData';

interface PricingCalculatorProps {
  onSelectPlan: (planName: string) => void;
}

export default function PricingCalculator({ onSelectPlan }: PricingCalculatorProps) {
  const [selectedPlanId, setSelectedPlanId] = useState<string>('plan-6mo-combat');

  return (
    <section id="pricing" className="py-16 sm:py-24 bg-white dark:bg-zinc-950/40 border-t border-slate-200 dark:border-zinc-800/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 sm:space-y-12">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-600 dark:text-orange-400 text-xs font-bold uppercase tracking-wider">
            <Tag className="w-3.5 h-3.5" />
            <span>Transparent &amp; Honest Memberships</span>
          </div>
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
            Invest in Your Fighter Journey
          </h2>
          <p className="text-slate-600 dark:text-zinc-400 text-xs sm:text-base">
            No hidden admission fees. All memberships include lockers, coach orientation, and mobile member pass.
          </p>
        </div>

        {/* Mobile Swipe Hint */}
        <div className="flex md:hidden items-center justify-between text-[11px] text-slate-400 dark:text-zinc-500 px-1 font-semibold">
          <span>👉 Swipe to compare plans ({PRICING_PLANS.length})</span>
          <span className="text-orange-500 font-bold">1-Month to Annual</span>
        </div>

        {/* Pricing: Swipeable Carousel on Mobile (<md), Grid on Desktop (md+) */}
        <div className="flex md:grid md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-8 overflow-x-auto snap-x snap-mandatory scrollbar-none pb-4 -mx-4 px-4 md:mx-0 md:px-0">
          {PRICING_PLANS.map((plan) => {
            const isSelected = selectedPlanId === plan.id;
            const savings = plan.originalPrice - plan.price;

            return (
              <div
                key={plan.id}
                onClick={() => setSelectedPlanId(plan.id)}
                className={`w-[84vw] max-w-[330px] shrink-0 snap-center md:w-auto md:shrink relative rounded-3xl p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 cursor-pointer ${
                  plan.popular
                    ? 'bg-gradient-to-b from-orange-50/50 via-white to-orange-50/30 dark:from-zinc-900 dark:via-orange-950/30 dark:to-zinc-900 border-2 border-orange-500 shadow-xl shadow-orange-500/15 scale-100 lg:scale-105 z-10'
                    : 'bg-slate-50 dark:bg-zinc-900/70 border border-slate-200 dark:border-zinc-800 hover:border-orange-500/50 shadow-sm'
                }`}
              >
                {/* Popular Pill */}
                {plan.popular && (
                  <div className="absolute -top-3 sm:-top-4 left-1/2 -translate-x-1/2 px-3 sm:px-4 py-0.5 sm:py-1 rounded-full bg-gradient-to-r from-orange-500 to-red-600 text-white font-extrabold text-[10px] sm:text-xs uppercase tracking-widest shadow-md flex items-center gap-1.5 whitespace-nowrap">
                    <Flame className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                    <span>Most Popular Choice</span>
                  </div>
                )}

                <div className="space-y-4 sm:space-y-6">
                  {/* Title & Tagline */}
                  <div className="space-y-1">
                    <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
                      {plan.name}
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-zinc-400 leading-relaxed">
                      {plan.tagline}
                    </p>
                  </div>

                  {/* Price */}
                  <div className="space-y-1 pb-3 sm:pb-4 border-b border-slate-200 dark:border-zinc-800">
                    <div className="flex items-baseline gap-1.5 sm:gap-2">
                      <span className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white">
                        ₹{plan.price.toLocaleString('en-IN')}
                      </span>
                      <span className="text-xs sm:text-sm text-slate-500 dark:text-zinc-400 font-medium">
                        / {plan.durationMonths === 1 ? 'month' : `${plan.durationMonths} months`}
                      </span>
                    </div>

                    {savings > 0 && (
                      <div className="flex items-center gap-2 pt-0.5 text-[11px] sm:text-xs">
                        <span className="line-through text-slate-400 dark:text-zinc-500">
                          ₹{plan.originalPrice.toLocaleString('en-IN')}
                        </span>
                        <span className="text-emerald-700 dark:text-emerald-400 font-bold bg-emerald-100 dark:bg-emerald-500/10 px-1.5 py-0.2 rounded border border-emerald-200 dark:border-emerald-500/20">
                          Save ₹{savings.toLocaleString('en-IN')}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Features List */}
                  <div className="space-y-2 sm:space-y-3">
                    <p className="text-[11px] sm:text-xs font-bold text-slate-800 dark:text-zinc-300 uppercase tracking-wider">
                      Included with Plan:
                    </p>
                    <ul className="space-y-1.5 sm:space-y-2 text-[11px] sm:text-xs text-slate-600 dark:text-zinc-400">
                      {plan.features.map((feat, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <Check className="w-3.5 h-3.5 text-orange-500 shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Plan Selection CTA */}
                <div className="pt-4 sm:pt-6">
                  <button
                    onClick={() => onSelectPlan(plan.name)}
                    className={`w-full py-2.5 sm:py-3 rounded-2xl font-black text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer ${
                      plan.popular
                        ? 'bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white shadow-lg shadow-orange-500/25'
                        : 'bg-slate-900 dark:bg-zinc-800 hover:bg-orange-500 text-white shadow-md'
                    }`}
                  >
                    <span>Choose {plan.name.split(' ')[0]}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
