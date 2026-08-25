export type UserRole = 'ADMIN' | 'TRAINER' | 'MEMBER' | 'PARENT';

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
}

export const DEMO_ACCOUNTS: { [key in UserRole]: AuthUser } = {
  ADMIN: {
    id: 'user-admin-1',
    name: 'Coach Vikalp (Founder & Head Coach)',
    email: 'admin@tntmma.com',
    phone: '+91 97132 17866',
    role: 'ADMIN',
    avatarUrl: 'https://images.unsplash.com/photo-1549476464-37392f717541?w=200&auto=format&fit=crop&q=80',
    beltRank: 'Head Coach / BJJ Brown Belt',
    discipline: 'MMA',
  },
  MEMBER: {
    id: 'user-member-1',
    name: 'Aarav Sharma',
    email: 'member@tntmma.com',
    phone: '+91 98260 11223',
    role: 'MEMBER',
    memberId: 'mem-101',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
    batch: 'EVENING',
    beltRank: 'BJJ Blue Belt (2 Stripes)',
    discipline: 'MMA',
  },
  PARENT: {
    id: 'user-parent-1',
    name: 'Sanjay Patel (Parent of Reyansh)',
    email: 'parent@tntmma.com',
    phone: '+91 97555 33441',
    role: 'PARENT',
    memberId: 'mem-103',
    avatarUrl: 'https://images.unsplash.com/photo-1544717305-2782549b5136?w=200&auto=format&fit=crop&q=80',
    batch: 'KIDS',
    beltRank: 'Kids Yellow-White Belt',
    discipline: 'KIDS_MMA',
  },
  TRAINER: {
    id: 'user-trainer-1',
    name: 'Coach Rohit',
    email: 'trainer@tntmma.com',
    phone: '+91 94250 88991',
    role: 'TRAINER',
    avatarUrl: 'https://images.unsplash.com/photo-1567013127542-490d757e51fc?w=200&auto=format&fit=crop&q=80',
    beltRank: 'CrossFit Level 2 & Strength Coach',
    discipline: 'CROSSFIT',
  },
};

const AUTH_STORAGE_KEY = 'tnt_mma_auth_user_v2';

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
