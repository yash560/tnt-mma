import { 
  Member, 
  WaiverDocument, 
  TransactionInvoice, 
  ScheduleClass, 
  BroadcastMessage, 
  AttendanceRecord, 
  TrialBooking,
  WorkoutLog,
  ClassBooking,
  BeltProgress,
  KidsBadge,
  EnquiryLead,
  GymExpense,
  StaffMember,
  DietPlan,
  WorkoutRoutine
} from './types';
import { 
  INITIAL_MEMBERS, 
  INITIAL_WAIVERS, 
  INITIAL_TRANSACTIONS, 
  INITIAL_SCHEDULE, 
  INITIAL_BROADCASTS 
} from './initialData';

const STORAGE_KEYS = {
  MEMBERS: 'tnt_mma_members_v3',
  WAIVERS: 'tnt_mma_waivers_v3',
  TRANSACTIONS: 'tnt_mma_transactions_v3',
  SCHEDULE: 'tnt_mma_schedule_v3',
  BROADCASTS: 'tnt_mma_broadcasts_v3',
  ATTENDANCE: 'tnt_mma_attendance_v3',
  TRIALS: 'tnt_mma_trials_v3',
  WORKOUT_LOGS: 'tnt_mma_workout_logs_v3',
  BOOKINGS: 'tnt_mma_class_bookings_v3',
  BELT_PROGRESS: 'tnt_mma_belt_progress_v3',
  KIDS_BADGES: 'tnt_mma_kids_badges_v3',
  LEADS: 'tnt_mma_leads_v3',
  EXPENSES: 'tnt_mma_expenses_v3',
  STAFF: 'tnt_mma_staff_v3',
  DIETS: 'tnt_mma_diets_v3',
  ROUTINES: 'tnt_mma_routines_v3',
};

// Seeded Leads
const INITIAL_LEADS: EnquiryLead[] = [
  {
    id: 'lead-1',
    name: 'Vikramaditya Solanki',
    phone: '+91 98261 44556',
    email: 'vikram.solanki@gmail.com',
    source: 'GOOGLE',
    status: 'HOT',
    interestDiscipline: 'MMA',
    preferredBatch: 'EVENING',
    notes: 'Walked in after seeing 4.9 Google reviews. Interested in annual combat pass. Follow up on Wednesday.',
    followUpDate: '2026-08-27',
    assignedCoach: 'Coach Vikalp',
    createdAt: '2026-08-23',
  },
  {
    id: 'lead-2',
    name: 'Priyanka Sen',
    phone: '+91 97552 33441',
    email: 'priyanka.sen@gmail.com',
    source: 'INSTAGRAM',
    status: 'HOT',
    interestDiscipline: 'CROSSFIT',
    preferredBatch: 'MORNING',
    notes: 'Looking for rapid fat loss and conditioning. Asked about women batch timing.',
    followUpDate: '2026-08-26',
    assignedCoach: 'Coach Rohit',
    createdAt: '2026-08-24',
  },
  {
    id: 'lead-3',
    name: 'Gaurav Chouhan',
    phone: '+91 94250 11228',
    source: 'WALK_IN',
    status: 'WARM',
    interestDiscipline: 'KIDS_MMA',
    preferredBatch: 'KIDS',
    notes: 'Inquired for his 8-year-old daughter. Wants anti-bullying & agility focus.',
    followUpDate: '2026-08-28',
    assignedCoach: 'Coach Anjali',
    createdAt: '2026-08-22',
  },
];

// Seeded Expenses
const INITIAL_EXPENSES: GymExpense[] = [
  {
    id: 'exp-1',
    title: 'Academy Floor Rent (Ayodhya Nagar Branch)',
    category: 'RENT',
    amount: 35000,
    date: '2026-08-01',
    paidTo: 'Klub Fox Building Management',
    paymentMode: 'NET_BANKING',
    branch: 'Ayodhya Nagar',
    notes: 'Monthly Commercial Rent for 3500 sq ft Academy floor',
  },
  {
    id: 'exp-2',
    title: 'New Fairtex Tear-Drop Heavy Bags & Chains',
    category: 'EQUIPMENT',
    amount: 18500,
    date: '2026-08-10',
    paidTo: 'Fairtex India Sports Supply',
    paymentMode: 'UPI',
    branch: 'Govind Garden',
    notes: 'Replaced 2 worn out punching bags in striking row',
  },
  {
    id: 'exp-3',
    title: 'Coach Rohit & Trainer Salaries',
    category: 'SALARY',
    amount: 42000,
    date: '2026-08-05',
    paidTo: 'Coaching Staff',
    paymentMode: 'NET_BANKING',
    branch: 'Ayodhya Nagar',
    notes: 'Monthly trainer compensation + PT incentives',
  },
  {
    id: 'exp-4',
    title: 'Commercial Electricity & AC Utility Bill',
    category: 'ELECTRICITY',
    amount: 9400,
    date: '2026-08-12',
    paidTo: 'MPPKVVCL Bhopal',
    paymentMode: 'UPI',
    branch: 'Ayodhya Nagar',
    notes: 'Air conditioning & high-power gym lighting',
  },
  {
    id: 'exp-5',
    title: 'Instagram & Google Maps Local Ads (Bhopal)',
    category: 'MARKETING',
    amount: 6500,
    date: '2026-08-15',
    paidTo: 'Meta Ads & Google Ads',
    paymentMode: 'UPI',
    branch: 'Ayodhya Nagar',
    notes: 'Bhopal combat sports awareness campaign',
  },
];

// Seeded Staff
const INITIAL_STAFF: StaffMember[] = [
  {
    id: 'st-1',
    name: 'Coach Vikalp',
    role: 'HEAD_COACH',
    phone: '+91 97132 17866',
    email: 'vikalp@tntmma.com',
    baseSalary: 65000,
    ptCommission: 15000,
    status: 'ACTIVE',
    specialties: ['MMA', 'BJJ (Brown Belt)', 'Muay Thai', 'Sports Nutrition'],
    joinedDate: '2021-06-01',
  },
  {
    id: 'st-2',
    name: 'Coach Rohit',
    role: 'TRAINER',
    phone: '+91 98260 55441',
    email: 'rohit@tntmma.com',
    baseSalary: 28000,
    ptCommission: 8000,
    status: 'ACTIVE',
    specialties: ['CrossFit L2', 'Olympic Lifting', 'Cardio Circuits'],
    joinedDate: '2022-03-15',
  },
  {
    id: 'st-3',
    name: 'Coach Anjali',
    role: 'DIETICIAN',
    phone: '+91 94250 77889',
    email: 'anjali@tntmma.com',
    baseSalary: 26000,
    ptCommission: 6000,
    status: 'ACTIVE',
    specialties: ['Kids MMA Lead', 'Calisthenics', 'Clinical Dietetics'],
    joinedDate: '2023-01-10',
  },
];

// Seeded Diet Plans
const INITIAL_DIETS: Record<string, DietPlan> = {
  'mem-101': {
    id: 'diet-101',
    memberId: 'mem-101',
    memberName: 'Aarav Sharma',
    goal: 'FIGHT_CAMP',
    targetWeightKg: 74,
    dailyCalories: 2650,
    proteinGrams: 175,
    carbsGrams: 280,
    fatsGrams: 65,
    waterLitres: 4.5,
    meals: [
      {
        mealName: 'Pre-Workout Morning Energizer (06:30 AM)',
        time: '06:30 AM',
        items: ['1 Banana', '1 scoop Whey Protein in water', '4 soaked almonds & 2 dates', '1 cup Black Coffee'],
        calories: 320,
        proteinGrams: 28,
      },
      {
        mealName: 'Post-Workout High Protein Breakfast (09:00 AM)',
        time: '09:00 AM',
        items: ['4 Whole Eggs / 150g Paneer Bhurji', '2 Multigrain Roti with desi ghee', '1 bowl Sprouted Moong Salad'],
        calories: 680,
        proteinGrams: 42,
      },
      {
        mealName: 'Fighter Carb & Lean Fuel Lunch (01:30 PM)',
        time: '01:30 PM',
        items: ['200g Grilled Chicken Breast / Soya Chunks Curry', '1 cup Brown Rice / 3 Phulkas', '1 bowl Thick Dal Tadka', 'Cucumber salad'],
        calories: 750,
        proteinGrams: 55,
      },
      {
        mealName: 'Pre-Sparring Evening Snack (05:00 PM)',
        time: '05:00 PM',
        items: ['1 Apple with 1 tbsp Natural Peanut Butter', '1 glass Tender Coconut Water with Electrolytes'],
        calories: 280,
        proteinGrams: 8,
      },
      {
        mealName: 'Recovery Dinner & Sleep Optimization (09:30 PM)',
        time: '09:30 PM',
        items: ['150g Grilled Fish / Paneer Tikka', '1 large bowl Mixed Veg Soup', '1 glass Warm Haldi Milk with Ashwagandha'],
        calories: 620,
        proteinGrams: 42,
      },
    ],
    coachNotes: 'Strict hydration before evening sparring. Maintain 4.5L clean water intake. Avoid high sodium foods 3 days before belt grading.',
    assignedBy: 'Coach Vikalp (Certified Sports Nutritionist)',
    assignedDate: '2026-08-15',
  },
};

// Seeded Workout Routines
const INITIAL_ROUTINES: Record<string, WorkoutRoutine> = {
  'mem-101': {
    id: 'rt-101',
    memberId: 'mem-101',
    memberName: 'Aarav Sharma',
    routineTitle: 'MMA Striking & Grappling Conditioning Camp',
    level: 'INTERMEDIATE',
    days: [
      {
        dayName: 'Monday',
        focus: 'Muay Thai Striking & Heavy Bag Power',
        exercises: [
          { name: 'Jump Rope & Agility Footwork', sets: 4, reps: '3 mins', restSeconds: 60, notes: 'Continuous rhythm' },
          { name: 'Jab - Cross - Left Hook - Low Kick Combo', sets: 5, reps: '3 mins round', restSeconds: 60, notes: 'Heavy bag power' },
          { name: 'Clinch Knee Strikes & Elbow Counters', sets: 4, reps: '20 reps/side', restSeconds: 45, notes: 'Tight posture' },
          { name: 'Burpee Box Jumps & Med Ball Slams', sets: 4, reps: '15 reps', restSeconds: 45, notes: 'Explosive cardio' },
        ],
      },
      {
        dayName: 'Tuesday',
        focus: 'BJJ Takedowns & Fence Control',
        exercises: [
          { name: 'Double-Leg & Single-Leg Penetration Steps', sets: 5, reps: '10 per leg', restSeconds: 45, notes: 'Level change' },
          { name: 'Wall Pinning & Underhook Pummeling', sets: 4, reps: '3 mins', restSeconds: 60, notes: 'Active head pressure' },
          { name: 'Guard Passing Drills (Toreando & Knee Slice)', sets: 5, reps: '2 mins each', restSeconds: 45, notes: 'Speed transition' },
        ],
      },
      {
        dayName: 'Wednesday',
        focus: 'CrossFit WOD & Functional Strength',
        exercises: [
          { name: 'Barbell Deadlifts (75% 1RM)', sets: 5, reps: '5 reps', restSeconds: 90, notes: 'Strict straight spine' },
          { name: 'Strict Pull-Ups on Rig', sets: 4, reps: '10-12 reps', restSeconds: 60, notes: 'Full chin over bar' },
          { name: 'Heavy Tractor Tyre Flips', sets: 4, reps: '10 flips', restSeconds: 60, notes: 'Hip explosion' },
          { name: 'Battle Rope Waves & Slams', sets: 5, reps: '45 secs on', restSeconds: 45, notes: 'Maximum intensity' },
        ],
      },
    ],
    assignedBy: 'Coach Vikalp',
    assignedDate: '2026-08-10',
  },
};

function getStored<T>(key: string, fallback: T): T {
  if (typeof window === 'undefined') return fallback;
  try {
    const item = localStorage.getItem(key);
    if (!item) {
      localStorage.setItem(key, JSON.stringify(fallback));
      return fallback;
    }
    return JSON.parse(item) as T;
  } catch (err) {
    console.error(`Error reading ${key} from storage:`, err);
    return fallback;
  }
}

function setStored<T>(key: string, data: T): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(key, JSON.stringify(data));
    window.dispatchEvent(new CustomEvent('tnt_datastore_sync', { detail: { key } }));
  } catch (err) {
    console.error(`Error writing ${key} to storage:`, err);
  }
}

// ---------------- Members ----------------
export function getMembers(): Member[] {
  return getStored<Member[]>(STORAGE_KEYS.MEMBERS, INITIAL_MEMBERS);
}

export function saveMember(member: Member): Member {
  const list = getMembers();
  const index = list.findIndex((m) => m.id === member.id);
  let updated: Member[];
  if (index >= 0) {
    updated = [...list];
    updated[index] = member;
  } else {
    updated = [member, ...list];
  }
  setStored(STORAGE_KEYS.MEMBERS, updated);
  return member;
}

export function deleteMember(id: string): void {
  const list = getMembers();
  const updated = list.filter((m) => m.id !== id);
  setStored(STORAGE_KEYS.MEMBERS, updated);
}

// ---------------- Waivers ----------------
export function getWaivers(): WaiverDocument[] {
  return getStored<WaiverDocument[]>(STORAGE_KEYS.WAIVERS, INITIAL_WAIVERS);
}

export function saveWaiver(waiver: WaiverDocument): WaiverDocument {
  const list = getWaivers();
  const updated = [waiver, ...list];
  setStored(STORAGE_KEYS.WAIVERS, updated);

  const members = getMembers();
  const matchingMember = members.find(
    (m) => m.phone.replace(/\D/g, '') === waiver.signerPhone.replace(/\D/g, '') ||
           m.name.toLowerCase() === waiver.participantName.toLowerCase()
  );
  if (matchingMember) {
    matchingMember.waiverSigned = true;
    matchingMember.waiverId = waiver.verificationId;
    saveMember(matchingMember);
  }
  return waiver;
}

export function getWaiverById(idOrVerificationId: string): WaiverDocument | undefined {
  const list = getWaivers();
  return list.find(
    (w) => w.id === idOrVerificationId || w.verificationId.toLowerCase() === idOrVerificationId.toLowerCase()
  );
}

// ---------------- Transactions / Invoices ----------------
export function getTransactions(): TransactionInvoice[] {
  return getStored<TransactionInvoice[]>(STORAGE_KEYS.TRANSACTIONS, INITIAL_TRANSACTIONS);
}

export function saveTransaction(invoice: TransactionInvoice): TransactionInvoice {
  const list = getTransactions();
  const updated = [invoice, ...list];
  setStored(STORAGE_KEYS.TRANSACTIONS, updated);

  const members = getMembers();
  const member = members.find((m) => m.id === invoice.memberId);
  if (member) {
    member.balanceDue = Math.max(0, member.balanceDue - invoice.totalAmount);
    member.status = 'ACTIVE';
    saveMember(member);
  }
  return invoice;
}

export function payMemberDues(memberId: string, amount: number, paymentMode: 'UPI' | 'CASH' | 'CARD' = 'UPI'): TransactionInvoice {
  const member = getMembers().find((m) => m.id === memberId);
  const invoice: TransactionInvoice = {
    id: `txn-${Date.now()}`,
    invoiceNumber: `TNT-INV-2026-${Math.floor(1000 + Math.random() * 9000)}`,
    memberId,
    memberName: member?.name || 'Athlete',
    memberPhone: member?.phone || '+91 97132 17866',
    planName: member?.planName || 'Combat Membership Renewal',
    amount: Math.round(amount / 1.18),
    gstAmount: Math.round(amount - amount / 1.18),
    totalAmount: amount,
    paymentMode,
    transactionRef: `UPI-TXN-${Date.now()}`,
    date: new Date().toISOString().split('T')[0],
    status: 'PAID',
    notes: 'Online Membership Dues Settlement via TNT App',
  };
  return saveTransaction(invoice);
}

// ---------------- Schedule ----------------
export function getSchedule(): ScheduleClass[] {
  return getStored<ScheduleClass[]>(STORAGE_KEYS.SCHEDULE, INITIAL_SCHEDULE);
}

export function saveScheduleClass(sch: ScheduleClass): ScheduleClass {
  const list = getSchedule();
  const index = list.findIndex((s) => s.id === sch.id);
  let updated: ScheduleClass[];
  if (index >= 0) {
    updated = [...list];
    updated[index] = sch;
  } else {
    updated = [sch, ...list];
  }
  setStored(STORAGE_KEYS.SCHEDULE, updated);
  return sch;
}

// ---------------- Trials ----------------
export function getTrialBookings(): TrialBooking[] {
  return getStored<TrialBooking[]>(STORAGE_KEYS.TRIALS, []);
}

export function saveTrialBooking(trial: TrialBooking): TrialBooking {
  const list = getTrialBookings();
  const updated = [trial, ...list];
  setStored(STORAGE_KEYS.TRIALS, updated);
  return trial;
}

// ---------------- Broadcasts ----------------
export function getBroadcasts(): BroadcastMessage[] {
  return getStored<BroadcastMessage[]>(STORAGE_KEYS.BROADCASTS, INITIAL_BROADCASTS);
}

export function saveBroadcast(msg: BroadcastMessage): BroadcastMessage {
  const list = getBroadcasts();
  const updated = [msg, ...list];
  setStored(STORAGE_KEYS.BROADCASTS, updated);
  return msg;
}

// ---------------- Attendance ----------------
export function getAttendanceRecords(): AttendanceRecord[] {
  return getStored<AttendanceRecord[]>(STORAGE_KEYS.ATTENDANCE, []);
}

export function logAttendance(record: AttendanceRecord): AttendanceRecord {
  const list = getAttendanceRecords();
  const updated = [record, ...list];
  setStored(STORAGE_KEYS.ATTENDANCE, updated);

  const members = getMembers();
  const member = members.find((m) => m.id === record.memberId);
  if (member) {
    member.totalCheckIns += 1;
    member.attendanceStreak += 1;
    saveMember(member);
  }
  return record;
}

// ---------------- Workout Logs ----------------
export function getWorkoutLogs(memberId?: string): WorkoutLog[] {
  const allLogs = getStored<WorkoutLog[]>(STORAGE_KEYS.WORKOUT_LOGS, []);
  if (!memberId) return allLogs;
  return allLogs.filter((l) => l.memberId === memberId);
}

export function saveWorkoutLog(log: WorkoutLog): WorkoutLog {
  const list = getStored<WorkoutLog[]>(STORAGE_KEYS.WORKOUT_LOGS, []);
  const updated = [log, ...list];
  setStored(STORAGE_KEYS.WORKOUT_LOGS, updated);
  return log;
}

// ---------------- Class Bookings ----------------
export function getClassBookings(memberId?: string): ClassBooking[] {
  const allBookings = getStored<ClassBooking[]>(STORAGE_KEYS.BOOKINGS, []);
  if (!memberId) return allBookings;
  return allBookings.filter((b) => b.memberId === memberId && b.status !== 'CANCELLED');
}

export function bookClass(booking: ClassBooking): ClassBooking {
  const list = getStored<ClassBooking[]>(STORAGE_KEYS.BOOKINGS, []);
  const updated = [booking, ...list];
  setStored(STORAGE_KEYS.BOOKINGS, updated);
  return booking;
}

export function cancelClassBooking(bookingId: string): void {
  const list = getStored<ClassBooking[]>(STORAGE_KEYS.BOOKINGS, []);
  const updated = list.map((b) => b.id === bookingId ? { ...b, status: 'CANCELLED' as const } : b);
  setStored(STORAGE_KEYS.BOOKINGS, updated);
}

// ---------------- Belt Progress ----------------
export function getBeltProgress(memberId: string): BeltProgress | null {
  const map = getStored<Record<string, BeltProgress>>(STORAGE_KEYS.BELT_PROGRESS, {});
  return map[memberId] || {
    memberId,
    discipline: 'MMA',
    currentBelt: 'Striking Level 1',
    stripes: 1,
    totalStripesForPromotion: 4,
    nextBelt: 'Striking Level 2',
    hoursOnMat: 24,
    requiredMatHours: 50,
    requirements: [
      { title: 'Proper guard stance & head movement', completed: true },
      { title: 'Jab-Cross combination with hip rotation', completed: true },
      { title: 'Defensive parry against straight punches', completed: false },
      { title: '50 hours mat sparring time', completed: false },
    ],
    coachNotes: 'Consistent attendance. Working on footwork pivot.',
    lastGradingDate: '2026-08-01',
  };
}

export function updateBeltProgress(progress: BeltProgress): BeltProgress {
  const map = getStored<Record<string, BeltProgress>>(STORAGE_KEYS.BELT_PROGRESS, {});
  map[progress.memberId] = progress;
  setStored(STORAGE_KEYS.BELT_PROGRESS, map);

  const member = getMembers().find((m) => m.id === progress.memberId);
  if (member) {
    member.beltRank = `${progress.currentBelt} (${progress.stripes} Stripes)`;
    saveMember(member);
  }
  return progress;
}

// ---------------- Kids Badges ----------------
export function getKidsBadges(childId: string): KidsBadge[] {
  const allBadges = getStored<KidsBadge[]>(STORAGE_KEYS.KIDS_BADGES, []);
  return allBadges.filter((b) => b.childId === childId);
}

export function awardKidsBadge(badge: KidsBadge): KidsBadge {
  const list = getStored<KidsBadge[]>(STORAGE_KEYS.KIDS_BADGES, []);
  const updated = [badge, ...list];
  setStored(STORAGE_KEYS.KIDS_BADGES, updated);
  return badge;
}

// ---------------- Enquiry Leads (GymBook Feature) ----------------
export function getEnquiryLeads(): EnquiryLead[] {
  return getStored<EnquiryLead[]>(STORAGE_KEYS.LEADS, INITIAL_LEADS);
}

export function saveEnquiryLead(lead: EnquiryLead): EnquiryLead {
  const list = getEnquiryLeads();
  const index = list.findIndex((l) => l.id === lead.id);
  let updated: EnquiryLead[];
  if (index >= 0) {
    updated = [...list];
    updated[index] = lead;
  } else {
    updated = [lead, ...list];
  }
  setStored(STORAGE_KEYS.LEADS, updated);
  return lead;
}

export function deleteEnquiryLead(id: string): void {
  const list = getEnquiryLeads();
  const updated = list.filter((l) => l.id !== id);
  setStored(STORAGE_KEYS.LEADS, updated);
}

export function convertLeadToMember(leadId: string, planName: string = '1-Month Fighter Kickstart', planAmount: number = 3000): Member {
  const leads = getEnquiryLeads();
  const lead = leads.find((l) => l.id === leadId);
  if (!lead) throw new Error('Lead not found');

  // Create member
  const newMember: Member = {
    id: `mem-${Date.now()}`,
    name: lead.name,
    email: lead.email || `${lead.name.toLowerCase().replace(/\s+/g, '')}@gmail.com`,
    phone: lead.phone,
    role: 'MEMBER',
    batch: lead.preferredBatch,
    status: 'ACTIVE',
    joinedDate: new Date().toISOString().split('T')[0],
    expiryDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    planId: 'plan-1mo-starter',
    planName,
    planAmount,
    balanceDue: 0,
    beltRank: 'Striking Level 1',
    discipline: lead.interestDiscipline,
    emergencyContact: {
      name: 'Emergency Contact',
      relationship: 'Family',
      phone: lead.phone,
    },
    bloodGroup: 'B+',
    waiverSigned: false,
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
    attendanceStreak: 1,
    totalCheckIns: 1,
  };

  saveMember(newMember);

  // Mark lead as CONVERTED
  lead.status = 'CONVERTED';
  saveEnquiryLead(lead);

  // Generate initial invoice
  saveTransaction({
    id: `txn-${Date.now()}`,
    invoiceNumber: `TNT-INV-2026-${Math.floor(1000 + Math.random() * 9000)}`,
    memberId: newMember.id,
    memberName: newMember.name,
    memberPhone: newMember.phone,
    planName,
    amount: Math.round(planAmount / 1.18),
    gstAmount: Math.round(planAmount - planAmount / 1.18),
    totalAmount: planAmount,
    paymentMode: 'UPI',
    transactionRef: `LEAD-CONV-${Date.now()}`,
    date: new Date().toISOString().split('T')[0],
    status: 'PAID',
    notes: 'Converted from Walk-in Lead',
  });

  return newMember;
}

// ---------------- Gym Expenses (GymBook Feature) ----------------
export function getGymExpenses(): GymExpense[] {
  return getStored<GymExpense[]>(STORAGE_KEYS.EXPENSES, INITIAL_EXPENSES);
}

export function saveGymExpense(exp: GymExpense): GymExpense {
  const list = getGymExpenses();
  const index = list.findIndex((e) => e.id === exp.id);
  let updated: GymExpense[];
  if (index >= 0) {
    updated = [...list];
    updated[index] = exp;
  } else {
    updated = [exp, ...list];
  }
  setStored(STORAGE_KEYS.EXPENSES, updated);
  return exp;
}

export function deleteGymExpense(id: string): void {
  const list = getGymExpenses();
  const updated = list.filter((e) => e.id !== id);
  setStored(STORAGE_KEYS.EXPENSES, updated);
}

// ---------------- Staff & Payroll (GymBook Feature) ----------------
export function getStaffMembers(): StaffMember[] {
  return getStored<StaffMember[]>(STORAGE_KEYS.STAFF, INITIAL_STAFF);
}

export function saveStaffMember(staff: StaffMember): StaffMember {
  const list = getStaffMembers();
  const index = list.findIndex((s) => s.id === staff.id);
  let updated: StaffMember[];
  if (index >= 0) {
    updated = [...list];
    updated[index] = staff;
  } else {
    updated = [staff, ...list];
  }
  setStored(STORAGE_KEYS.STAFF, updated);
  return staff;
}

// ---------------- Diet & Nutrition (GymBook Feature) ----------------
export function getDietPlan(memberId: string): DietPlan | null {
  const map = getStored<Record<string, DietPlan>>(STORAGE_KEYS.DIETS, INITIAL_DIETS);
  return map[memberId] || null;
}

export function saveDietPlan(plan: DietPlan): DietPlan {
  const map = getStored<Record<string, DietPlan>>(STORAGE_KEYS.DIETS, INITIAL_DIETS);
  map[plan.memberId] = plan;
  setStored(STORAGE_KEYS.DIETS, map);
  return plan;
}

// ---------------- Workout Routines (GymBook Feature) ----------------
export function getWorkoutRoutine(memberId: string): WorkoutRoutine | null {
  const map = getStored<Record<string, WorkoutRoutine>>(STORAGE_KEYS.ROUTINES, INITIAL_ROUTINES);
  return map[memberId] || null;
}

export function saveWorkoutRoutine(routine: WorkoutRoutine): WorkoutRoutine {
  const map = getStored<Record<string, WorkoutRoutine>>(STORAGE_KEYS.ROUTINES, INITIAL_ROUTINES);
  map[routine.memberId] = routine;
  setStored(STORAGE_KEYS.ROUTINES, map);
  return routine;
}

// ---------------- CSV Export Engine (GymBook Feature) ----------------
export function generateCSV(type: 'MEMBERS' | 'TRANSACTIONS' | 'EXPENSES' | 'LEADS' | 'ATTENDANCE'): string {
  if (type === 'MEMBERS') {
    const list = getMembers();
    const headers = ['ID', 'Name', 'Phone', 'Email', 'Batch', 'Status', 'Plan', 'Balance Due', 'Belt Rank', 'Joined Date', 'Expiry Date'];
    const rows = list.map(m => [m.id, `"${m.name}"`, m.phone, m.email, m.batch, m.status, `"${m.planName}"`, m.balanceDue, `"${m.beltRank}"`, m.joinedDate, m.expiryDate]);
    return [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
  } else if (type === 'TRANSACTIONS') {
    const list = getTransactions();
    const headers = ['Invoice No', 'Member', 'Phone', 'Plan', 'Total Amount', 'Payment Mode', 'Ref ID', 'Date', 'Status'];
    const rows = list.map(t => [t.invoiceNumber, `"${t.memberName}"`, t.memberPhone, `"${t.planName}"`, t.totalAmount, t.paymentMode, t.transactionRef, t.date, t.status]);
    return [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
  } else if (type === 'EXPENSES') {
    const list = getGymExpenses();
    const headers = ['ID', 'Title', 'Category', 'Amount', 'Date', 'Paid To', 'Mode', 'Branch'];
    const rows = list.map(e => [e.id, `"${e.title}"`, e.category, e.amount, e.date, `"${e.paidTo}"`, e.paymentMode, `"${e.branch}"`]);
    return [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
  } else if (type === 'LEADS') {
    const list = getEnquiryLeads();
    const headers = ['ID', 'Name', 'Phone', 'Source', 'Status', 'Discipline', 'Follow Up Date', 'Coach', 'Created At'];
    const rows = list.map(l => [l.id, `"${l.name}"`, l.phone, l.source, l.status, l.interestDiscipline, l.followUpDate, `"${l.assignedCoach}"`, l.createdAt]);
    return [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
  }
  return '';
}

// ---------------- Reset Database ----------------
export function resetToDefaults(): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEYS.MEMBERS, JSON.stringify(INITIAL_MEMBERS));
  localStorage.setItem(STORAGE_KEYS.WAIVERS, JSON.stringify(INITIAL_WAIVERS));
  localStorage.setItem(STORAGE_KEYS.TRANSACTIONS, JSON.stringify(INITIAL_TRANSACTIONS));
  localStorage.setItem(STORAGE_KEYS.SCHEDULE, JSON.stringify(INITIAL_SCHEDULE));
  localStorage.setItem(STORAGE_KEYS.BROADCASTS, JSON.stringify(INITIAL_BROADCASTS));
  localStorage.setItem(STORAGE_KEYS.ATTENDANCE, JSON.stringify([]));
  localStorage.setItem(STORAGE_KEYS.TRIALS, JSON.stringify([]));
  localStorage.setItem(STORAGE_KEYS.LEADS, JSON.stringify(INITIAL_LEADS));
  localStorage.setItem(STORAGE_KEYS.EXPENSES, JSON.stringify(INITIAL_EXPENSES));
  localStorage.setItem(STORAGE_KEYS.STAFF, JSON.stringify(INITIAL_STAFF));
  localStorage.setItem(STORAGE_KEYS.DIETS, JSON.stringify(INITIAL_DIETS));
  localStorage.setItem(STORAGE_KEYS.ROUTINES, JSON.stringify(INITIAL_ROUTINES));
  window.dispatchEvent(new CustomEvent('tnt_datastore_sync', { detail: { key: 'ALL' } }));
}
