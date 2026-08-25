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
  KidsBadge
} from './types';
import { 
  INITIAL_MEMBERS, 
  INITIAL_WAIVERS, 
  INITIAL_TRANSACTIONS, 
  INITIAL_SCHEDULE, 
  INITIAL_BROADCASTS 
} from './initialData';

const STORAGE_KEYS = {
  MEMBERS: 'tnt_mma_members_v2',
  WAIVERS: 'tnt_mma_waivers_v2',
  TRANSACTIONS: 'tnt_mma_transactions_v2',
  SCHEDULE: 'tnt_mma_schedule_v2',
  BROADCASTS: 'tnt_mma_broadcasts_v2',
  ATTENDANCE: 'tnt_mma_attendance_v2',
  TRIALS: 'tnt_mma_trials_v2',
  WORKOUT_LOGS: 'tnt_mma_workout_logs_v2',
  BOOKINGS: 'tnt_mma_class_bookings_v2',
  BELT_PROGRESS: 'tnt_mma_belt_progress_v2',
  KIDS_BADGES: 'tnt_mma_kids_badges_v2',
};

// Seeded Initial Workout Logs
const INITIAL_WORKOUT_LOGS: WorkoutLog[] = [
  {
    id: 'wlog-1',
    memberId: 'mem-101',
    memberName: 'Aarav Sharma',
    date: '2026-08-24',
    discipline: 'MMA',
    roundsSparred: 6,
    durationMinutes: 90,
    wodScore: '14 mins 20s (5 rounds)',
    notes: 'Practiced double-leg takedown from against the fence and transitioned straight into mount. Good cardio output.',
    techniqueMastered: 'Fence Takedown & Head-and-Arm Choke',
    coachFeedback: 'Excellent hip elevation, Aarav. Watch your chin tuck on exit.',
  },
  {
    id: 'wlog-2',
    memberId: 'mem-101',
    memberName: 'Aarav Sharma',
    date: '2026-08-22',
    discipline: 'BJJ',
    roundsSparred: 5,
    durationMinutes: 75,
    wodScore: 'Full Mat Session',
    notes: 'No-Gi open guard retention drills against Coach Vikalp. Successfully locked 2 triangle chokes.',
    techniqueMastered: 'De La Riva Guard & Triangle Setup',
    coachFeedback: 'Tight angle on the triangle choke.',
  },
  {
    id: 'wlog-3',
    memberId: 'mem-101',
    memberName: 'Aarav Sharma',
    date: '2026-08-19',
    discipline: 'KICKBOXING',
    roundsSparred: 8,
    durationMinutes: 60,
    wodScore: '800 kcal Burned',
    notes: 'Heavy bag Dutch kickboxing combinations (Jab - Cross - Left Hook - Right Low Kick).',
    techniqueMastered: 'Dutch 4-Count Kick Combination',
    coachFeedback: 'Turn the right hip over more on the low kick.',
  },
];

// Seeded Class Bookings
const INITIAL_CLASS_BOOKINGS: ClassBooking[] = [
  {
    id: 'bk-101',
    memberId: 'mem-101',
    memberName: 'Aarav Sharma',
    classId: 'Monday-4',
    className: 'Muay Thai Kickboxing & Pad Combinations',
    classTime: '06:00 PM - 07:30 PM',
    classDate: 'Today (Evening)',
    discipline: 'KICKBOXING',
    coachName: 'Coach Vikalp',
    status: 'CONFIRMED',
    createdAt: new Date().toISOString(),
  },
  {
    id: 'bk-102',
    memberId: 'mem-101',
    memberName: 'Aarav Sharma',
    classId: 'Tuesday-4',
    className: 'MMA Cage Tactics, Takedowns & Ground Control',
    classTime: '06:00 PM - 07:30 PM',
    classDate: 'Tomorrow (Evening)',
    discipline: 'MMA',
    coachName: 'Coach Vikalp',
    status: 'CONFIRMED',
    createdAt: new Date().toISOString(),
  },
  {
    id: 'bk-103',
    memberId: 'mem-103',
    memberName: 'Reyansh Patel',
    classId: 'Monday-3',
    className: 'Kids MMA & Anti-Bullying Defense',
    classTime: '04:00 PM - 05:30 PM',
    classDate: 'Today (Afternoon)',
    discipline: 'KIDS_MMA',
    coachName: 'Coach Anjali & Coach Vikalp',
    status: 'CONFIRMED',
    createdAt: new Date().toISOString(),
  },
];

// Seeded Belt Progress records
const INITIAL_BELT_PROGRESS: Record<string, BeltProgress> = {
  'mem-101': {
    memberId: 'mem-101',
    discipline: 'BJJ',
    currentBelt: 'Blue Belt',
    stripes: 2,
    totalStripesForPromotion: 4,
    nextBelt: 'Purple Belt',
    hoursOnMat: 142,
    requiredMatHours: 200,
    requirements: [
      { title: 'Solid defense against basic guard passes', completed: true },
      { title: 'Effective submission chains from Closed Guard', completed: true },
      { title: 'Clean Half-Guard sweeps and Underhook control', completed: true },
      { title: 'Leg lock entries & defense (Straight Ankle Lock)', completed: false },
      { title: 'Competition experience or 180+ mat sparring hours', completed: false },
    ],
    coachNotes: 'Aarav has shown outstanding discipline in the evening BJJ batches. Next stripe evaluation scheduled for next month.',
    lastGradingDate: '2026-07-15',
  },
  'mem-103': {
    memberId: 'mem-103',
    discipline: 'KIDS_MMA',
    currentBelt: 'Yellow-White Belt',
    stripes: 3,
    totalStripesForPromotion: 4,
    nextBelt: 'Solid Yellow Belt',
    hoursOnMat: 48,
    requiredMatHours: 60,
    requirements: [
      { title: 'Safe rolling and breakfall landings on padded mat', completed: true },
      { title: 'Anti-bullying verbal de-escalation posture', completed: true },
      { title: 'Guard escape and technical stand-up', completed: true },
      { title: '100% focus and coach respect in kids lineup', completed: true },
      { title: '60 total mat attendance sessions', completed: false },
    ],
    coachNotes: 'Reyansh is one of the most respectful students in the 4 PM Kids Batch. Ready for his 4th stripe soon!',
    lastGradingDate: '2026-08-01',
  },
};

// Seeded Kids Badges
const INITIAL_KIDS_BADGES: KidsBadge[] = [
  {
    id: 'badge-1',
    childId: 'mem-103',
    badgeName: 'Anti-Bullying Shield',
    category: 'DEFENSE',
    icon: '🛡️',
    awardedBy: 'Coach Vikalp',
    awardedDate: '2026-08-10',
    coachComment: 'Mastered loud verbal assertiveness ("Stop! Step back!") and safe stance.',
  },
  {
    id: 'badge-2',
    childId: 'mem-103',
    badgeName: 'Ninja Roll Master',
    category: 'STRIKING',
    icon: '🥋',
    awardedBy: 'Coach Anjali',
    awardedDate: '2026-08-18',
    coachComment: 'Executed 10 consecutive safe breakfalls without touching head on the mat.',
  },
  {
    id: 'badge-3',
    childId: 'mem-103',
    badgeName: 'Fighter Respect & Focus',
    category: 'DISCIPLINE',
    icon: '⭐',
    awardedBy: 'Coach Vikalp',
    awardedDate: '2026-08-22',
    coachComment: 'Helped junior teammates clean up sparring gear after the class.',
  },
];

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
    // Emit global event for reactive UI components
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

  // Auto-link with member if phone or email matches
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

  // Update member balance
  const members = getMembers();
  const member = members.find((m) => m.id === invoice.memberId);
  if (member) {
    member.balanceDue = Math.max(0, member.balanceDue - invoice.totalAmount);
    member.status = 'ACTIVE';
    saveMember(member);
  }
  return invoice;
}

// Pay member dues via UPI / Instant
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

  // Increment member check-in count & streak
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
  const allLogs = getStored<WorkoutLog[]>(STORAGE_KEYS.WORKOUT_LOGS, INITIAL_WORKOUT_LOGS);
  if (!memberId) return allLogs;
  return allLogs.filter((l) => l.memberId === memberId);
}

export function saveWorkoutLog(log: WorkoutLog): WorkoutLog {
  const list = getStored<WorkoutLog[]>(STORAGE_KEYS.WORKOUT_LOGS, INITIAL_WORKOUT_LOGS);
  const updated = [log, ...list];
  setStored(STORAGE_KEYS.WORKOUT_LOGS, updated);
  return log;
}

// ---------------- Class Bookings ----------------
export function getClassBookings(memberId?: string): ClassBooking[] {
  const allBookings = getStored<ClassBooking[]>(STORAGE_KEYS.BOOKINGS, INITIAL_CLASS_BOOKINGS);
  if (!memberId) return allBookings;
  return allBookings.filter((b) => b.memberId === memberId && b.status !== 'CANCELLED');
}

export function bookClass(booking: ClassBooking): ClassBooking {
  const list = getStored<ClassBooking[]>(STORAGE_KEYS.BOOKINGS, INITIAL_CLASS_BOOKINGS);
  const updated = [booking, ...list];
  setStored(STORAGE_KEYS.BOOKINGS, updated);
  return booking;
}

export function cancelClassBooking(bookingId: string): void {
  const list = getStored<ClassBooking[]>(STORAGE_KEYS.BOOKINGS, INITIAL_CLASS_BOOKINGS);
  const updated = list.map((b) => b.id === bookingId ? { ...b, status: 'CANCELLED' as const } : b);
  setStored(STORAGE_KEYS.BOOKINGS, updated);
}

// ---------------- Belt Progress ----------------
export function getBeltProgress(memberId: string): BeltProgress | null {
  const map = getStored<Record<string, BeltProgress>>(STORAGE_KEYS.BELT_PROGRESS, INITIAL_BELT_PROGRESS);
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
  const map = getStored<Record<string, BeltProgress>>(STORAGE_KEYS.BELT_PROGRESS, INITIAL_BELT_PROGRESS);
  map[progress.memberId] = progress;
  setStored(STORAGE_KEYS.BELT_PROGRESS, map);

  // Sync member beltRank string
  const member = getMembers().find((m) => m.id === progress.memberId);
  if (member) {
    member.beltRank = `${progress.currentBelt} (${progress.stripes} Stripes)`;
    saveMember(member);
  }
  return progress;
}

// ---------------- Kids Badges ----------------
export function getKidsBadges(childId: string): KidsBadge[] {
  const allBadges = getStored<KidsBadge[]>(STORAGE_KEYS.KIDS_BADGES, INITIAL_KIDS_BADGES);
  return allBadges.filter((b) => b.childId === childId);
}

export function awardKidsBadge(badge: KidsBadge): KidsBadge {
  const list = getStored<KidsBadge[]>(STORAGE_KEYS.KIDS_BADGES, INITIAL_KIDS_BADGES);
  const updated = [badge, ...list];
  setStored(STORAGE_KEYS.KIDS_BADGES, updated);
  return badge;
}

// ---------------- Trial Bookings ----------------
export function getTrialBookings(): TrialBooking[] {
  return getStored<TrialBooking[]>(STORAGE_KEYS.TRIALS, []);
}

export function saveTrialBooking(booking: TrialBooking): TrialBooking {
  const list = getTrialBookings();
  const updated = [booking, ...list];
  setStored(STORAGE_KEYS.TRIALS, updated);
  return booking;
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
  localStorage.setItem(STORAGE_KEYS.WORKOUT_LOGS, JSON.stringify(INITIAL_WORKOUT_LOGS));
  localStorage.setItem(STORAGE_KEYS.BOOKINGS, JSON.stringify(INITIAL_CLASS_BOOKINGS));
  localStorage.setItem(STORAGE_KEYS.BELT_PROGRESS, JSON.stringify(INITIAL_BELT_PROGRESS));
  localStorage.setItem(STORAGE_KEYS.KIDS_BADGES, JSON.stringify(INITIAL_KIDS_BADGES));
  window.dispatchEvent(new CustomEvent('tnt_datastore_sync', { detail: { key: 'ALL' } }));
}
