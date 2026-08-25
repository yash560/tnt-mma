'use client';

import React, { useState, useEffect } from 'react';
import { 
  Utensils, 
  Dumbbell, 
  Flame, 
  Sparkles, 
  Check, 
  Plus, 
  UserCheck, 
  Save, 
  Download 
} from 'lucide-react';
import { DietPlan, WorkoutRoutine, Member } from '@/lib/types';
import { getDietPlan, saveDietPlan, getWorkoutRoutine, saveWorkoutRoutine, getMembers } from '@/lib/dataStore';
import confetti from 'canvas-confetti';

export default function DietWorkoutManager() {
  const [members] = useState<Member[]>(() => getMembers());
  const [selectedMemberId, setSelectedMemberId] = useState<string>(members[0]?.id || 'mem-101');
  const [diet, setDiet] = useState<DietPlan | null>(() => getDietPlan(selectedMemberId));
  const [routine, setRoutine] = useState<WorkoutRoutine | null>(() => getWorkoutRoutine(selectedMemberId));

  // Form states for Diet
  const [goal, setGoal] = useState<'FAT_LOSS' | 'MUSCLE_GAIN' | 'FIGHT_CAMP' | 'MAINTENANCE'>('FIGHT_CAMP');
  const [calories, setCalories] = useState(2600);
  const [protein, setProtein] = useState(170);
  const [carbs, setCarbs] = useState(280);
  const [fats, setFats] = useState(65);
  const [water, setWater] = useState(4.5);
  const [coachNotes, setCoachNotes] = useState('Maintain strict hydration before evening sparring.');

  useEffect(() => {
    const d = getDietPlan(selectedMemberId);
    setDiet(d);
    if (d) {
      setGoal(d.goal);
      setCalories(d.dailyCalories);
      setProtein(d.proteinGrams);
      setCarbs(d.carbsGrams);
      setFats(d.fatsGrams);
      setWater(d.waterLitres);
      setCoachNotes(d.coachNotes);
    }
    setRoutine(getWorkoutRoutine(selectedMemberId));
  }, [selectedMemberId]);

  const handleSaveDiet = (e: React.FormEvent) => {
    e.preventDefault();
    const selMember = members.find(m => m.id === selectedMemberId);
    const updatedDiet: DietPlan = {
      id: `diet-${Date.now()}`,
      memberId: selectedMemberId,
      memberName: selMember?.name || 'Athlete',
      goal,
      targetWeightKg: 74,
      dailyCalories: Number(calories),
      proteinGrams: Number(protein),
      carbsGrams: Number(carbs),
      fatsGrams: Number(fats),
      waterLitres: Number(water),
      meals: diet?.meals || [
        {
          mealName: 'Morning Pre-Workout',
          time: '07:00 AM',
          items: ['1 Banana', '1 scoop Whey Protein in water', '4 almonds'],
          calories: 320,
          proteinGrams: 28,
        },
        {
          mealName: 'Post-Workout High Protein Breakfast',
          time: '09:30 AM',
          items: ['4 Whole Eggs / 150g Paneer', '2 Multigrain Roti', 'Sprouted salad'],
          calories: 680,
          proteinGrams: 42,
        },
      ],
      coachNotes,
      assignedBy: 'Coach Vikalp (Certified Dietician)',
      assignedDate: new Date().toISOString().split('T')[0],
    };
    saveDietPlan(updatedDiet);
    setDiet(updatedDiet);
    confetti({ particleCount: 50 });
    alert(`🥗 Customized Diet Plan assigned to ${selMember?.name}! Updated in athlete portal.`);
  };

  const currentMember = members.find(m => m.id === selectedMemberId);

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-xl font-black text-slate-900 dark:text-white flex items-center gap-2">
            <span>Diet, Nutrition & Workout Routines</span>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 font-bold">GymBook Standard</span>
          </h3>
          <p className="text-xs text-slate-500 dark:text-zinc-400">
            Assign custom calorie & macro plans and weekly WOD combat training routines directly to athletes.
          </p>
        </div>

        {/* Member Selector */}
        <div className="flex items-center gap-2 text-xs">
          <span className="font-bold text-slate-500 dark:text-zinc-400">Select Athlete:</span>
          <select
            value={selectedMemberId}
            onChange={(e) => setSelectedMemberId(e.target.value)}
            className="p-2 rounded-xl bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 font-bold text-slate-900 dark:text-white outline-none"
          >
            {members.map((m) => (
              <option key={m.id} value={m.id}>
                {m.name} ({m.discipline})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Grid: Diet Plan Builder + Workout Routine */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left: Diet & Macros Plan (7 Cols) */}
        <div className="lg:col-span-7 rounded-3xl bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 p-6 sm:p-8 space-y-6 shadow-md">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-zinc-800">
            <div className="flex items-center gap-2">
              <Utensils className="w-5 h-5 text-orange-500" />
              <h4 className="font-black text-slate-900 dark:text-white text-base">
                Custom Nutrition Plan for {currentMember?.name}
              </h4>
            </div>
            <span className="text-[10px] uppercase font-bold text-orange-600 dark:text-orange-400 px-2 py-0.5 rounded bg-orange-100 dark:bg-orange-500/20">
              {goal}
            </span>
          </div>

          <form onSubmit={handleSaveDiet} className="space-y-4 text-xs">
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="font-bold text-slate-700 dark:text-zinc-300">Training Goal</label>
                <select
                  value={goal}
                  onChange={(e) => setGoal(e.target.value as any)}
                  className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-zinc-950 border border-slate-200 dark:border-zinc-800 outline-none font-bold"
                >
                  <option value="FAT_LOSS">Fat Loss & Leaning Out</option>
                  <option value="MUSCLE_GAIN">Hypertrophy & Muscle Gain</option>
                  <option value="FIGHT_CAMP">Fight Camp Weight Cut</option>
                  <option value="MAINTENANCE">Maintenance & Endurance</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-700 dark:text-zinc-300">Daily Target Calories</label>
                <input
                  type="number"
                  value={calories}
                  onChange={(e) => setCalories(Number(e.target.value))}
                  className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-zinc-950 border border-slate-200 dark:border-zinc-800 outline-none font-mono"
                />
              </div>
            </div>

            {/* Macros Row */}
            <div className="grid grid-cols-3 gap-3 p-3.5 rounded-2xl bg-slate-50 dark:bg-zinc-950 border border-slate-200 dark:border-zinc-800">
              <div className="space-y-1">
                <label className="font-bold text-red-500 text-[10px] uppercase">Protein (g)</label>
                <input
                  type="number"
                  value={protein}
                  onChange={(e) => setProtein(Number(e.target.value))}
                  className="w-full p-2 rounded-lg bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 outline-none font-bold"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-amber-500 text-[10px] uppercase">Carbs (g)</label>
                <input
                  type="number"
                  value={carbs}
                  onChange={(e) => setCarbs(Number(e.target.value))}
                  className="w-full p-2 rounded-lg bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 outline-none font-bold"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-blue-500 text-[10px] uppercase">Fats (g)</label>
                <input
                  type="number"
                  value={fats}
                  onChange={(e) => setFats(Number(e.target.value))}
                  className="w-full p-2 rounded-lg bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 outline-none font-bold"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="font-bold text-slate-700 dark:text-zinc-300">Coach Dietician Directives</label>
              <textarea
                rows={3}
                value={coachNotes}
                onChange={(e) => setCoachNotes(e.target.value)}
                className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-zinc-950 border border-slate-200 dark:border-zinc-800 outline-none resize-none"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs uppercase tracking-wider shadow-md flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <Save className="w-4 h-4" />
              <span>Update Nutrition Plan for {currentMember?.name}</span>
            </button>
          </form>
        </div>

        {/* Right: Assigned Workout Routine View (5 Cols) */}
        <div className="lg:col-span-5 rounded-3xl bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 p-6 sm:p-8 space-y-6 shadow-md">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-zinc-800">
            <div className="flex items-center gap-2">
              <Dumbbell className="w-5 h-5 text-orange-500" />
              <h4 className="font-black text-slate-900 dark:text-white text-base">
                Assigned Workout Plan
              </h4>
            </div>
            <span className="text-[10px] px-2 py-0.5 rounded bg-blue-100 dark:bg-blue-500/20 text-blue-600 font-bold uppercase">
              {routine?.level || 'INTERMEDIATE'}
            </span>
          </div>

          <div className="space-y-3">
            {routine?.days.map((day, idx) => (
              <div
                key={idx}
                className="p-4 rounded-2xl bg-slate-50 dark:bg-zinc-950 border border-slate-200 dark:border-zinc-800 space-y-2 text-xs"
              >
                <div className="flex items-center justify-between font-bold text-slate-900 dark:text-white">
                  <span className="text-orange-600 dark:text-orange-400">{day.dayName}</span>
                  <span className="text-slate-500 text-[11px]">{day.focus}</span>
                </div>
                <ul className="space-y-1 text-slate-600 dark:text-zinc-400 text-[11px] list-disc list-inside">
                  {day.exercises.map((ex, i) => (
                    <li key={i}>
                      <strong>{ex.name}</strong>: {ex.sets} sets × {ex.reps} (Rest: {ex.restSeconds}s)
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <p className="text-[10px] text-slate-400 text-center">
            Athletes can view this live inside their Member Portal.
          </p>
        </div>

      </div>

    </div>
  );
}
