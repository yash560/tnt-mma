'use client';

import React, { useState } from 'react';
import { 
  CalendarDays, 
  Clock, 
  User, 
  MapPin, 
  Zap, 
  Check, 
  Sparkles,
  Flame
} from 'lucide-react';
import { ScheduleClass, DisciplineType } from '@/lib/types';
import { INITIAL_SCHEDULE } from '@/lib/initialData';

interface TimetableProps {
  onOpenTrialModal: (discipline?: string) => void;
}

export default function InteractiveTimetable({ onOpenTrialModal }: TimetableProps) {
  const [selectedDay, setSelectedDay] = useState<string>('Monday');
  const [selectedDiscipline, setSelectedDiscipline] = useState<string>('ALL');

  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  // Detailed multi-day timetable generator for full week schedule
  const getDaySchedule = (day: string): ScheduleClass[] => {
    switch (day) {
      case 'Monday':
      case 'Wednesday':
      case 'Friday':
        return [
          {
            id: `${day}-1`,
            day: day as any,
            time: '06:00 AM - 07:30 AM',
            discipline: 'CROSSFIT',
            disciplineTitle: 'CrossFit WOD & Metabolic Conditioning',
            coachName: 'Coach Rohit',
            batchType: 'MORNING',
            location: 'Main Conditioning Arena',
            intensity: 'High',
            capacity: 20,
            enrolled: 16,
          },
          {
            id: `${day}-2`,
            day: day as any,
            time: '07:30 AM - 09:00 AM',
            discipline: 'CALISTHENICS',
            disciplineTitle: 'Calisthenics, Muscle-Up & Stunts',
            coachName: 'Coach Anjali',
            batchType: 'MORNING',
            location: 'Gymnastic Ring Zone',
            intensity: 'High',
            capacity: 15,
            enrolled: 12,
          },
          {
            id: `${day}-3`,
            day: day as any,
            time: '04:00 PM - 05:30 PM',
            discipline: 'KIDS_MMA',
            disciplineTitle: 'Kids MMA & Anti-Bullying Defense',
            coachName: 'Coach Anjali & Coach Vikalp',
            batchType: 'KIDS',
            location: 'Padded Mat Zone A',
            intensity: 'Medium',
            capacity: 18,
            enrolled: 15,
          },
          {
            id: `${day}-4`,
            day: day as any,
            time: '06:00 PM - 07:30 PM',
            discipline: 'KICKBOXING',
            disciplineTitle: 'Muay Thai Kickboxing & Pad Combinations',
            coachName: 'Coach Vikalp',
            batchType: 'EVENING',
            location: 'Striking Zone & Heavy Bags',
            intensity: 'Very High',
            capacity: 25,
            enrolled: 22,
          },
          {
            id: `${day}-5`,
            day: day as any,
            time: '07:30 PM - 09:00 PM',
            discipline: 'BJJ',
            disciplineTitle: 'Brazilian Jiu-Jitsu (No-Gi Submission Grappling)',
            coachName: 'Coach Vikalp',
            batchType: 'EVENING',
            location: 'Championship Grappling Mats',
            intensity: 'High',
            capacity: 20,
            enrolled: 18,
          },
        ];
      case 'Tuesday':
      case 'Thursday':
        return [
          {
            id: `${day}-1`,
            day: day as any,
            time: '06:00 AM - 07:30 AM',
            discipline: 'BOXING',
            disciplineTitle: 'Boxing Footwork & Heavy Bag Conditioning',
            coachName: 'Coach Vikalp',
            batchType: 'MORNING',
            location: 'Striking Arena',
            intensity: 'High',
            capacity: 20,
            enrolled: 14,
          },
          {
            id: `${day}-2`,
            day: day as any,
            time: '07:30 AM - 09:00 AM',
            discipline: 'CROSSFIT',
            disciplineTitle: 'CrossFit Powerlifting & Core Rig',
            coachName: 'Coach Rohit',
            batchType: 'MORNING',
            location: 'Rig & Barbell Zone',
            intensity: 'Very High',
            capacity: 18,
            enrolled: 15,
          },
          {
            id: `${day}-3`,
            day: day as any,
            time: '04:00 PM - 05:30 PM',
            discipline: 'KIDS_MMA',
            disciplineTitle: 'Kids Agility, Stunts & Coordination',
            coachName: 'Coach Anjali',
            batchType: 'KIDS',
            location: 'Padded Mat Zone A',
            intensity: 'Medium',
            capacity: 18,
            enrolled: 14,
          },
          {
            id: `${day}-4`,
            day: day as any,
            time: '06:00 PM - 07:30 PM',
            discipline: 'MMA',
            disciplineTitle: 'MMA Cage Tactics, Takedowns & Ground Control',
            coachName: 'Coach Vikalp',
            batchType: 'EVENING',
            location: 'Octagon Cage',
            intensity: 'Very High',
            capacity: 20,
            enrolled: 18,
          },
          {
            id: `${day}-5`,
            day: day as any,
            time: '07:30 PM - 09:30 PM',
            discipline: 'MMA',
            disciplineTitle: 'Pro Fighter Sparring & Fight Camp',
            coachName: 'Coach Vikalp',
            batchType: 'PRO_FIGHTER',
            location: 'Octagon Cage & Ring',
            intensity: 'Very High',
            capacity: 12,
            enrolled: 10,
          },
        ];
      case 'Saturday':
      default:
        return [
          {
            id: `${day}-1`,
            day: day as any,
            time: '07:00 AM - 09:00 AM',
            discipline: 'CROSSFIT',
            disciplineTitle: 'Saturday Gladiator Team Endurance Challenge',
            coachName: 'Coach Rohit & Coach Vikalp',
            batchType: 'MORNING',
            location: 'All Arena Zones',
            intensity: 'Very High',
            capacity: 35,
            enrolled: 30,
          },
          {
            id: `${day}-2`,
            day: day as any,
            time: '10:00 AM - 12:00 PM',
            discipline: 'BJJ',
            disciplineTitle: 'Open Mat: BJJ Grappling & Sparring Rounds',
            coachName: 'Coach Vikalp',
            batchType: 'EVENING',
            location: 'Grappling Mats',
            intensity: 'High',
            capacity: 25,
            enrolled: 20,
          },
          {
            id: `${day}-3`,
            day: day as any,
            time: '04:00 PM - 05:30 PM',
            discipline: 'KIDS_MMA',
            disciplineTitle: 'Kids Belt Evaluation & Agility Games',
            coachName: 'Coach Anjali',
            batchType: 'KIDS',
            location: 'Mat Zone A',
            intensity: 'Medium',
            capacity: 20,
            enrolled: 18,
          },
        ];
    }
  };

  const scheduleList = getDaySchedule(selectedDay);
  const filteredSchedule = selectedDiscipline === 'ALL'
    ? scheduleList
    : scheduleList.filter((s) => s.discipline === selectedDiscipline);

  return (
    <section id="timetable" className="py-24 bg-zinc-950 border-t border-zinc-800/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-xs font-bold uppercase tracking-wider">
              <CalendarDays className="w-3.5 h-3.5" />
              Live Class Schedule
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
              Weekly Mat Timetable
            </h2>
            <p className="text-zinc-400 text-sm sm:text-base max-w-2xl">
              Morning sessions starting at 06:00 AM, dedicated Kids batch at 04:00 PM, and evening combat slots until 10:00 PM. Reserve your trial spot in any active session.
            </p>
          </div>

          {/* Quick Notice */}
          <div className="p-4 rounded-2xl bg-zinc-900 border border-zinc-800 text-xs text-zinc-300 flex items-center gap-3">
            <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse shrink-0" />
            <span>
              All batches are operating on schedule across <strong className="text-white">Ayodhya Nagar</strong> & <strong className="text-white">Govind Garden</strong> branches.
            </span>
          </div>
        </div>

        {/* Day Selector Buttons */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none border-b border-zinc-800">
          {days.map((day) => (
            <button
              key={day}
              onClick={() => setSelectedDay(day)}
              className={`px-5 py-3 rounded-2xl text-xs sm:text-sm font-bold uppercase tracking-wider transition-all whitespace-nowrap cursor-pointer flex items-center gap-2 ${
                selectedDay === day
                  ? 'bg-gradient-to-r from-orange-500 to-red-600 text-white shadow-lg shadow-orange-500/20'
                  : 'bg-zinc-900/80 text-zinc-400 hover:text-white hover:bg-zinc-800 border border-zinc-800'
              }`}
            >
              <CalendarDays className="w-4 h-4" />
              <span>{day}</span>
            </button>
          ))}
        </div>

        {/* Discipline Quick Filter */}
        <div className="flex items-center gap-2 flex-wrap text-xs">
          <span className="text-zinc-500 font-bold uppercase tracking-wider mr-2">Filter By:</span>
          {['ALL', 'MMA', 'BJJ', 'KICKBOXING', 'CROSSFIT', 'CALISTHENICS', 'KIDS_MMA'].map((disc) => (
            <button
              key={disc}
              onClick={() => setSelectedDiscipline(disc)}
              className={`px-3 py-1.5 rounded-lg font-semibold transition-all cursor-pointer ${
                selectedDiscipline === disc
                  ? 'bg-orange-500/20 text-orange-400 border border-orange-500/40'
                  : 'bg-zinc-900 text-zinc-400 hover:text-zinc-200 border border-zinc-800'
              }`}
            >
              {disc.replace('_', ' ')}
            </button>
          ))}
        </div>

        {/* Schedule List */}
        <div className="space-y-4">
          {filteredSchedule.map((cls) => (
            <div
              key={cls.id}
              className="rounded-2xl bg-zinc-900/80 border border-zinc-800 hover:border-orange-500/40 p-5 sm:p-6 transition-all flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 hover:shadow-xl hover:shadow-orange-950/10 group"
            >
              {/* Left Column: Timing & Discipline */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 w-full lg:w-auto">
                <div className="px-4 py-2.5 rounded-xl bg-zinc-950 border border-zinc-800 text-orange-400 font-mono font-bold text-xs sm:text-sm flex items-center gap-2 shrink-0">
                  <Clock className="w-4 h-4 text-orange-500" />
                  <span>{cls.time}</span>
                </div>

                <div className="space-y-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-base sm:text-lg font-black text-white group-hover:text-orange-400 transition-colors">
                      {cls.disciplineTitle}
                    </span>
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-orange-500/20 text-orange-400 border border-orange-500/30">
                      {cls.batchType.replace('_', ' ')}
                    </span>
                  </div>

                  <div className="flex items-center gap-4 text-xs text-zinc-400 flex-wrap">
                    <span className="flex items-center gap-1">
                      <User className="w-3.5 h-3.5 text-zinc-500" />
                      Coach: <strong className="text-zinc-300 font-semibold">{cls.coachName}</strong>
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-zinc-500" />
                      {cls.location}
                    </span>
                    <span className="flex items-center gap-1 text-amber-400">
                      <Zap className="w-3.5 h-3.5" />
                      Intensity: {cls.intensity}
                    </span>
                  </div>
                </div>
              </div>

              {/* Right Column: Capacity Meter & Action */}
              <div className="flex items-center justify-between lg:justify-end gap-5 w-full lg:w-auto pt-4 lg:pt-0 border-t lg:border-t-0 border-zinc-800">
                <div className="text-right">
                  <p className="text-xs text-zinc-400">
                    Capacity: <span className="text-white font-bold">{cls.enrolled}/{cls.capacity}</span>
                  </p>
                  <div className="w-24 h-1.5 rounded-full bg-zinc-800 overflow-hidden mt-1">
                    <div 
                      className="h-full bg-gradient-to-r from-orange-500 to-red-500 rounded-full"
                      style={{ width: `${(cls.enrolled / cls.capacity) * 100}%` }}
                    />
                  </div>
                </div>

                <button
                  onClick={() => onOpenTrialModal(cls.disciplineTitle)}
                  className="px-4 py-2.5 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs uppercase tracking-wider transition-all flex items-center gap-1.5 shadow-md shadow-orange-500/20 cursor-pointer whitespace-nowrap"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Book Trial</span>
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
