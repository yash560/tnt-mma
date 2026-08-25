'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { AuthUser, UserRole, DEMO_ACCOUNTS, getStoredAuth, setStoredAuth } from '@/lib/auth';
import { saveMember } from '@/lib/dataStore';

interface AuthContextType {
  user: AuthUser | null;
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  login: (role: UserRole, email?: string, password?: string) => Promise<boolean>;
  signup: (userData: { name: string; email: string; phone: string; role: UserRole; isMinor?: boolean; discipline?: string; batch?: string }) => Promise<boolean>;
  logout: () => void;
  switchPersona: (role: UserRole) => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check saved theme
    const savedTheme = localStorage.getItem('tnt_theme') as 'light' | 'dark';
    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.classList.toggle('dark', savedTheme === 'dark');
    } else {
      // Default is light mode
      setTheme('light');
      document.documentElement.classList.remove('dark');
    }

    // Check saved auth
    const savedUser = getStoredAuth();
    if (savedUser) {
      setUser(savedUser);
    }
    setIsLoading(false);
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(nextTheme);
    localStorage.setItem('tnt_theme', nextTheme);
    document.documentElement.classList.toggle('dark', nextTheme === 'dark');
  };

  const login = async (role: UserRole, email?: string, _password?: string): Promise<boolean> => {
    const demoUser = DEMO_ACCOUNTS[role];
    const loggedInUser: AuthUser = {
      ...demoUser,
      email: email || demoUser.email,
    };
    setUser(loggedInUser);
    setStoredAuth(loggedInUser);
    return true;
  };

  const signup = async (userData: {
    name: string;
    email: string;
    phone: string;
    role: UserRole;
    isMinor?: boolean;
    discipline?: string;
    batch?: string;
  }): Promise<boolean> => {
    const memberId = `mem-${Date.now()}`;
    const newUser: AuthUser = {
      id: `user-${Date.now()}`,
      name: userData.name,
      email: userData.email,
      phone: userData.phone,
      role: userData.role,
      memberId,
      avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
      batch: userData.batch || 'EVENING',
      beltRank: userData.discipline === 'BJJ' ? 'BJJ White Belt' : 'Striking Level 1',
      discipline: userData.discipline || 'MMA',
    };

    // Register in members store
    saveMember({
      id: memberId,
      name: userData.name,
      email: userData.email,
      phone: userData.phone,
      role: userData.role,
      batch: (userData.batch as any) || 'EVENING',
      status: 'ACTIVE',
      joinedDate: new Date().toISOString().split('T')[0],
      expiryDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      planId: 'plan-1mo-starter',
      planName: '1-Month Kickstart Plan',
      planAmount: 3000,
      balanceDue: 0,
      beltRank: newUser.beltRank || 'Striking Level 1',
      discipline: (userData.discipline as any) || 'MMA',
      isMinor: userData.isMinor,
      emergencyContact: {
        name: 'Emergency Desk',
        relationship: 'Guardian',
        phone: userData.phone,
      },
      bloodGroup: 'O+',
      waiverSigned: false,
      avatarUrl: newUser.avatarUrl,
      attendanceStreak: 0,
      totalCheckIns: 0,
    });

    setUser(newUser);
    setStoredAuth(newUser);
    return true;
  };

  const logout = () => {
    setUser(null);
    setStoredAuth(null);
  };

  const switchPersona = (role: UserRole) => {
    const persona = DEMO_ACCOUNTS[role];
    setUser(persona);
    setStoredAuth(persona);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        theme,
        toggleTheme,
        login,
        signup,
        logout,
        switchPersona,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
