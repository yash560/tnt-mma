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
    <section id="pricing" className="py-24 bg-radial-gradient relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-xs font-bold uppercase tracking-wider">
            <Tag className="w-3.5 h-3.5" />
            Transparent & Honest Memberships
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
            Invest in Your Fighter Journey
          </h2>
          <p className="text-zinc-400 text-sm sm:text-base">
            No hidden admission fees or locking contracts. All memberships include full locker amenities, coach orientation, and mobile member pass.
          </p>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {PRICING_PLANS.map((plan) => {
            const isSelected = selectedPlanId === plan.id;
            const savings = plan.originalPrice - plan.price;

            return (
              <div
                key={plan.id}
                onClick={() => setSelectedPlanId(plan.id)}
                className={`relative rounded-3xl p-7 sm:p-8 flex flex-col justify-between transition-all duration-300 cursor-pointer ${
                  plan.popular
                    ? 'bg-gradient-to-b from-zinc-900 via-orange-950/30 to-zinc-900 border-2 border-orange-500 shadow-2xl shadow-orange-950/40 scale-100 lg:scale-105 z-10'
                    : 'bg-zinc-900/70 border border-zinc-800 hover:border-zinc-700 hover:bg-zinc-900'
                }`}
              >
                {/* Popular Pill */}
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-orange-500 to-red-600 text-white font-extrabold text-xs uppercase tracking-widest shadow-lg flex items-center gap-1.5">
                    <Flame className="w-3.5 h-3.5" />
                    Most Popular Choice
                  </div>
                )}

                <div className="space-y-6">
                  {/* Title & Tagline */}
                  <div className="space-y-2">
                    <h3 className="text-2xl font-black text-white">
                      {plan.name}
                    </h3>
                    <p className="text-xs text-zinc-400 leading-relaxed">
                      {plan.tagline}
                    </p>
                  </div>

                  {/* Price */}
                  <div className="space-y-1 pb-4 border-b border-zinc-800">
                    <div className="flex items-baseline gap-2">
                      <span className="text-4xl sm:text-5xl font-black text-white">
                        ₹{plan.price.toLocaleString('en-IN')}
                      </span>
                      <span className="text-sm text-zinc-400 font-medium">
                        / {plan.durationMonths === 1 ? 'month' : `${plan.durationMonths} months`}
                      </span>
                    </div>

                    {savings > 0 && (
                      <div className="flex items-center gap-2 pt-1 text-xs">
                        <span className="line-through text-zinc-500">
                          ₹{plan.originalPrice.toLocaleString('en-IN')}
                        </span>
                        <span className="text-emerald-400 font-bold bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                          Save ₹{savings.toLocaleString('en-IN')}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Features List */}
                  <div className="space-y-3">
                    <p className="text-xs font-bold text-zinc-300 uppercase tracking-wider">
                      Included in this pass:
                    </p>
                    <ul className="space-y-2 text-xs text-zinc-300">
                      {plan.features.map((feat, idx) => (
                        <li key={idx} className="flex items-start gap-2.5">
                          <Check className="w-4 h-4 text-orange-400 shrink-0 mt-0.5" />
                          <span className="leading-tight">{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Card Action Button */}
                <div className="pt-8 mt-6 border-t border-zinc-800">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectPlan(plan.name);
                    }}
                    className={`w-full py-3.5 rounded-2xl font-extrabold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg ${
                      plan.popular
                        ? 'bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white shadow-orange-500/30'
                        : 'bg-zinc-800 hover:bg-orange-500 text-zinc-200 hover:text-white'
                    }`}
                  >
                    <span>Enrol in {plan.name}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Student & Corporate Discount Banner */}
        <div className="rounded-2xl bg-zinc-900 border border-zinc-800 p-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-300">
          <div className="flex items-center gap-3 text-center sm:text-left">
            <div className="w-10 h-10 rounded-xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-orange-400 shrink-0">
              <Zap className="w-5 h-5" />
            </div>
            <div>
              <p className="font-bold text-white text-sm">Special Concessions & Sibling Discount</p>
              <p className="text-zinc-400">10% off for college students (with valid ID) & 15% off on enrolling 2+ siblings in the Kids MMA batch.</p>
            </div>
          </div>
          <button
            onClick={() => onSelectPlan('Student/Sibling Concession')}
            className="px-4 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-orange-400 font-bold border border-zinc-700 whitespace-nowrap cursor-pointer"
          >
            Claim Student Discount
          </button>
        </div>

      </div>
    </section>
  );
}
