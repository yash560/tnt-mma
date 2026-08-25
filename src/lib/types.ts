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

export interface WorkoutLog {
  id: string;
  memberId: string;
  memberName: string;
  date: string;
  discipline: DisciplineType;
  roundsSparred: number;
  durationMinutes: number;
  wodScore?: string;
  notes: string;
  techniqueMastered: string;
  coachFeedback?: string;
}

export interface ClassBooking {
  id: string;
  memberId: string;
  memberName: string;
  classId: string;
  className: string;
  classTime: string;
  classDate: string;
  discipline: DisciplineType;
  coachName: string;
  status: 'CONFIRMED' | 'CANCELLED' | 'ATTENDED';
  createdAt: string;
}

export interface BeltProgress {
  memberId: string;
  discipline: DisciplineType;
  currentBelt: string;
  stripes: number;
  totalStripesForPromotion: number;
  nextBelt: string;
  hoursOnMat: number;
  requiredMatHours: number;
  requirements: { title: string; completed: boolean }[];
  coachNotes: string;
  lastGradingDate: string;
}

export interface KidsBadge {
  id: string;
  childId: string;
  badgeName: string;
  category: 'DISCIPLINE' | 'STRIKING' | 'DEFENSE' | 'FOCUS' | 'RESPECT';
  icon: string;
  awardedBy: string;
  awardedDate: string;
  coachComment: string;
}

export type LeadStatus = 'HOT' | 'WARM' | 'COLD' | 'CONVERTED' | 'LOST';
export type LeadSource = 'GOOGLE' | 'INSTAGRAM' | 'WALK_IN' | 'REFERRAL' | 'WEBSITE';

export interface EnquiryLead {
  id: string;
  name: string;
  phone: string;
  email?: string;
  source: LeadSource;
  status: LeadStatus;
  interestDiscipline: DisciplineType;
  preferredBatch: BatchType;
  notes: string;
  followUpDate: string;
  assignedCoach: string;
  createdAt: string;
}

export type ExpenseCategory = 'RENT' | 'EQUIPMENT' | 'SALARY' | 'ELECTRICITY' | 'MARKETING' | 'SUPPLEMENTS' | 'MISC';

export interface GymExpense {
  id: string;
  title: string;
  category: ExpenseCategory;
  amount: number;
  date: string;
  paidTo: string;
  paymentMode: 'UPI' | 'CASH' | 'NET_BANKING';
  branch: 'Ayodhya Nagar' | 'Govind Garden';
  notes?: string;
}

export interface StaffMember {
  id: string;
  name: string;
  role: 'HEAD_COACH' | 'TRAINER' | 'DIETICIAN' | 'FRONT_DESK';
  phone: string;
  email: string;
  baseSalary: number;
  ptCommission: number;
  status: 'ACTIVE' | 'ON_LEAVE';
  specialties: string[];
  joinedDate: string;
}

export interface MealItem {
  mealName: string;
  time: string;
  items: string[];
  calories: number;
  proteinGrams: number;
}

export interface DietPlan {
  id: string;
  memberId: string;
  memberName: string;
  goal: 'FAT_LOSS' | 'MUSCLE_GAIN' | 'FIGHT_CAMP' | 'MAINTENANCE';
  targetWeightKg: number;
  dailyCalories: number;
  proteinGrams: number;
  carbsGrams: number;
  fatsGrams: number;
  meals: MealItem[];
  waterLitres: number;
  coachNotes: string;
  assignedBy: string;
  assignedDate: string;
}

export interface ExerciseItem {
  name: string;
  sets: number;
  reps: string;
  restSeconds: number;
  notes?: string;
}

export interface WorkoutDay {
  dayName: string;
  focus: string;
  exercises: ExerciseItem[];
}

export interface WorkoutRoutine {
  id: string;
  memberId: string;
  memberName: string;
  routineTitle: string;
  level: 'BEGINNER' | 'INTERMEDIATE' | 'PRO_FIGHTER';
  days: WorkoutDay[];
  assignedBy: string;
  assignedDate: string;
}
