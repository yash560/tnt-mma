export type MembershipStatus = 'ACTIVE' | 'EXPIRING_SOON' | 'EXPIRED' | 'TRIAL' | 'FROZEN';

export type DisciplineType = 
  | 'MMA'
  | 'BJJ'
  | 'KICKBOXING'
  | 'BOXING'
  | 'CROSSFIT'
  | 'CALISTHENICS'
  | 'KIDS_MMA'
  | 'PERSONAL_TRAINING';

export type BatchType = 'MORNING' | 'EVENING' | 'KIDS' | 'PRO_FIGHTER' | 'WEEKEND';

export interface Member {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: 'MEMBER' | 'PARENT' | 'TRAINER' | 'ADMIN';
  batch: BatchType;
  status: MembershipStatus;
  joinedDate: string;
  expiryDate: string;
  planId: string;
  planName: string;
  planAmount: number;
  balanceDue: number;
  beltRank: string;
  discipline: DisciplineType;
  emergencyContact: {
    name: string;
    relationship: string;
    phone: string;
  };
  bloodGroup: string;
  medicalNotes?: string;
  waiverSigned: boolean;
  waiverId?: string;
  avatarUrl: string;
  attendanceStreak: number;
  totalCheckIns: number;
  isMinor?: boolean;
  guardianName?: string;
  guardianPhone?: string;
}

export type WaiverType = 'ADULT' | 'MINOR';

export interface WaiverDocument {
  id: string;
  verificationId: string;
  type: WaiverType;
  signerName: string;
  signerEmail: string;
  signerPhone: string;
  signerGovId?: string;
  participantName: string;
  participantDob?: string;
  participantAge: number;
  emergencyContactName: string;
  emergencyContactPhone: string;
  relationshipToMinor?: string;
  medicalConditions: string;
  agreedClauses: {
    assumptionOfRisk: boolean;
    liabilityRelease: boolean;
    medicalConsent: boolean;
    sparringRules: boolean;
    mediaConsent: boolean;
    codeOfConduct: boolean;
  };
  signatureDataUrl: string;
  signedAt: string;
  ipAddress: string;
  userAgent: string;
  status: 'VERIFIED' | 'REVOKED';
}

export interface TransactionInvoice {
  id: string;
  invoiceNumber: string;
  memberId: string;
  memberName: string;
  memberPhone: string;
  planName: string;
  amount: number;
  gstAmount: number;
  totalAmount: number;
  paymentMode: 'UPI' | 'CASH' | 'CARD' | 'NET_BANKING';
  transactionRef: string;
  date: string;
  status: 'PAID' | 'PENDING' | 'REFUNDED';
  notes?: string;
}

export interface ScheduleClass {
  id: string;
  day: 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday' | 'Sunday';
  time: string;
  discipline: DisciplineType;
  disciplineTitle: string;
  coachName: string;
  batchType: BatchType;
  location: string;
  intensity: 'High' | 'Very High' | 'Medium' | 'All Levels';
  capacity: number;
  enrolled: number;
}

export interface BroadcastMessage {
  id: string;
  title: string;
  content: string;
  targetBatch: 'ALL' | BatchType | 'EXPIRED_MEMBERS' | 'ACTIVE_MEMBERS';
  channels: ('EMAIL' | 'WHATSAPP' | 'IN_APP')[];
  sentAt: string;
  sentBy: string;
  recipientCount: number;
  status: 'SENT' | 'SCHEDULED' | 'DRAFT';
}

export interface AttendanceRecord {
  id: string;
  memberId: string;
  memberName: string;
  discipline: DisciplineType;
  batch: BatchType;
  timestamp: string;
  date: string;
  verifiedWaiver: boolean;
  verifiedFee: boolean;
}

export interface TrialBooking {
  id: string;
  bookingPassId: string;
  name: string;
  phone: string;
  email: string;
  discipline: DisciplineType;
  preferredDate: string;
  preferredTime: string;
  branch: 'Nizamuddin Road (Ayodhya Nagar)' | 'Govind Garden (Raisen Road)';
  status: 'CONFIRMED' | 'ATTENDED' | 'CONVERTED' | 'NO_SHOW';
  createdAt: string;
}

export interface PricingPlan {
  id: string;
  name: string;
  tagline: string;
  durationMonths: number;
  price: number;
  originalPrice: number;
  popular?: boolean;
  features: string[];
  disciplinesIncluded: string[];
}
