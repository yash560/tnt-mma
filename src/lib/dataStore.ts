import { 
  Member, 
  WaiverDocument, 
  TransactionInvoice, 
  ScheduleClass, 
  BroadcastMessage, 
  AttendanceRecord, 
  TrialBooking 
} from './types';
import { 
  INITIAL_MEMBERS, 
  INITIAL_WAIVERS, 
  INITIAL_TRANSACTIONS, 
  INITIAL_SCHEDULE, 
  INITIAL_BROADCASTS 
} from './initialData';

const STORAGE_KEYS = {
  MEMBERS: 'tnt_mma_members_v1',
  WAIVERS: 'tnt_mma_waivers_v1',
  TRANSACTIONS: 'tnt_mma_transactions_v1',
  SCHEDULE: 'tnt_mma_schedule_v1',
  BROADCASTS: 'tnt_mma_broadcasts_v1',
  ATTENDANCE: 'tnt_mma_attendance_v1',
  TRIALS: 'tnt_mma_trials_v1',
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
}
