export type UserRole = 'ADMIN' | 'TRAINER' | 'MEMBER' | 'PARENT';

export interface EmergencyContact {
  name: string;
  relationship: string;
  phone: string;
}

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: UserRole;
  memberId?: string;
  avatarUrl: string;
  batch?: string;
  beltRank?: string;
  discipline?: string;
  bloodGroup?: string;
  weightKg?: number;
  heightCm?: number;
  emergencyContact?: EmergencyContact;
  bio?: string;
  joinedDate?: string;
  isGoogleUser?: boolean;
}

export interface StoredCredential {
  email: string;
  passwordHash: string; // Base64 / demo hash
  user: AuthUser;
  resetOtp?: string;
  otpExpiry?: number;
}

export const INITIAL_USER_ACCOUNTS: StoredCredential[] = [
  {
    email: 'vikalp@tntmma.com',
    passwordHash: 'admin123',
    user: {
      id: 'user-admin-1',
      name: 'Coach Vikalp',
      email: 'vikalp@tntmma.com',
      phone: '+91 97132 17866',
      role: 'ADMIN',
      avatarUrl: 'https://images.unsplash.com/photo-1549476464-37392f717541?w=200&auto=format&fit=crop&q=80',
      beltRank: 'Head Coach / BJJ Brown Belt',
      discipline: 'MMA',
      bloodGroup: 'O+',
      weightKg: 78,
      heightCm: 178,
      bio: 'Head Coach and Founder of TNT MMA Bhopal. 8+ years combat coaching experience.',
      joinedDate: '2021-06-01',
    },
  },
  {
    email: 'aarav.sharma@gmail.com',
    passwordHash: 'fighter123',
    user: {
      id: 'user-member-1',
      name: 'Aarav Sharma',
      email: 'aarav.sharma@gmail.com',
      phone: '+91 98260 11223',
      role: 'MEMBER',
      memberId: 'mem-101',
      avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
      batch: 'EVENING',
      beltRank: 'BJJ Blue Belt (2 Stripes)',
      discipline: 'MMA',
      bloodGroup: 'O+',
      weightKg: 74,
      heightCm: 175,
      emergencyContact: {
        name: 'Dr. Rajesh Sharma',
        relationship: 'Father',
        phone: '+91 98260 44556',
      },
      bio: 'Competitive amateur MMA fighter & BJJ practitioner training for state championships.',
      joinedDate: '2025-10-15',
    },
  },
  {
    email: 'sanjay.patel@gmail.com',
    passwordHash: 'parent123',
    user: {
      id: 'user-parent-1',
      name: 'Sanjay Patel',
      email: 'sanjay.patel@gmail.com',
      phone: '+91 97555 33441',
      role: 'PARENT',
      memberId: 'mem-103',
      avatarUrl: 'https://images.unsplash.com/photo-1544717305-2782549b5136?w=200&auto=format&fit=crop&q=80',
      batch: 'KIDS',
      beltRank: 'Parent of Reyansh Patel (Kids Batch)',
      discipline: 'KIDS_MMA',
      bloodGroup: 'B+',
      emergencyContact: {
        name: 'Pooja Patel',
        relationship: 'Mother',
        phone: '+91 97555 33442',
      },
      bio: 'Parent monitoring Reyansh Patel in the 4:00 PM Kids Anti-Bullying Academy.',
      joinedDate: '2026-03-01',
    },
  },
  {
    email: 'rohit@tntmma.com',
    passwordHash: 'trainer123',
    user: {
      id: 'user-trainer-1',
      name: 'Coach Rohit',
      email: 'rohit@tntmma.com',
      phone: '+91 94250 88991',
      role: 'TRAINER',
      avatarUrl: 'https://images.unsplash.com/photo-1567013127542-490d757e51fc?w=200&auto=format&fit=crop&q=80',
      beltRank: 'CrossFit L2 & Muay Thai Lead',
      discipline: 'CROSSFIT',
      bloodGroup: 'AB+',
      weightKg: 82,
      heightCm: 182,
      bio: 'Olympic lifting and high-intensity conditioning coach.',
      joinedDate: '2022-03-15',
    },
  },
];

const AUTH_STORAGE_KEY = 'tnt_mma_auth_user_v3';
const CREDENTIALS_STORAGE_KEY = 'tnt_mma_credentials_v3';

export function getStoredCredentials(): StoredCredential[] {
  if (typeof window === 'undefined') return INITIAL_USER_ACCOUNTS;
  try {
    const item = localStorage.getItem(CREDENTIALS_STORAGE_KEY);
    if (!item) {
      localStorage.setItem(CREDENTIALS_STORAGE_KEY, JSON.stringify(INITIAL_USER_ACCOUNTS));
      return INITIAL_USER_ACCOUNTS;
    }
    return JSON.parse(item);
  } catch {
    return INITIAL_USER_ACCOUNTS;
  }
}

export function saveStoredCredentials(creds: StoredCredential[]): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(CREDENTIALS_STORAGE_KEY, JSON.stringify(creds));
  } catch (err) {
    console.error('Error writing credentials store:', err);
  }
}

export function getStoredAuth(): AuthUser | null {
  if (typeof window === 'undefined') return null;
  try {
    const item = localStorage.getItem(AUTH_STORAGE_KEY);
    return item ? JSON.parse(item) : null;
  } catch {
    return null;
  }
}

export function setStoredAuth(user: AuthUser | null): void {
  if (typeof window === 'undefined') return;
  try {
    if (user) {
      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(user));
    } else {
      localStorage.removeItem(AUTH_STORAGE_KEY);
    }
  } catch (err) {
    console.error('Error writing auth to storage:', err);
  }
}

export const DEMO_ACCOUNTS: { [key in UserRole]: AuthUser } = {
  ADMIN: INITIAL_USER_ACCOUNTS[0].user,
  MEMBER: INITIAL_USER_ACCOUNTS[1].user,
  PARENT: INITIAL_USER_ACCOUNTS[2].user,
  TRAINER: INITIAL_USER_ACCOUNTS[3].user,
};
