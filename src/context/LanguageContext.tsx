'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

export type LanguageCode = 'en' | 'hi';

export interface Translations {
  // Navigation
  nav_home: string;
  nav_programs: string;
  nav_timetable: string;
  nav_gallery: string;
  nav_reviews: string;
  nav_pricing: string;
  nav_about: string;
  nav_contact: string;
  nav_waiver: string;
  nav_portal: string;
  nav_admin: string;
  nav_signin: string;
  nav_signup: string;
  nav_logout: string;
  nav_profile: string;
  nav_dashboard: string;
  nav_free_trial: string;

  // Hero
  hero_badge: string;
  hero_title_1: string;
  hero_title_highlight: string;
  hero_title_2: string;
  hero_desc: string;
  hero_cta_trial: string;
  hero_cta_waiver: string;
  hero_stats_rating: string;
  hero_stats_athletes: string;
  hero_stats_coaches: string;

  // Features
  feat_mma_title: string;
  feat_bjj_title: string;
  feat_kickboxing_title: string;
  feat_crossfit_title: string;
  feat_kids_title: string;

  // Reviews
  reviews_title: string;
  reviews_subtitle: string;
  reviews_write: string;
  reviews_maps: string;

  // Gallery
  gallery_title: string;
  gallery_subtitle: string;
  gallery_all: string;
  gallery_lake: string;
  gallery_mma: string;
  gallery_crossfit: string;
  gallery_bags: string;

  // Common
  common_search: string;
  common_save: string;
  common_cancel: string;
  common_loading: string;
}

const TRANSLATIONS: Record<LanguageCode, Translations> = {
  en: {
    nav_home: 'Home',
    nav_programs: 'Combat Programs',
    nav_timetable: 'Weekly Timetable',
    nav_gallery: 'Photos & Videos',
    nav_reviews: 'Google Reviews',
    nav_pricing: 'Pricing Plans',
    nav_about: 'About Academy',
    nav_contact: 'Bhopal Branches',
    nav_waiver: 'Sign Digital Waiver',
    nav_portal: 'Athlete / Parent Pass',
    nav_admin: 'Admin Command Hub',
    nav_signin: 'Sign In',
    nav_signup: 'Join Academy',
    nav_logout: 'Sign Out',
    nav_profile: 'Profile Settings',
    nav_dashboard: 'My Dashboard',
    nav_free_trial: 'Book Free 1-Day Trial',

    hero_badge: '⚡ #1 Combat Sports & MMA Academy in Bhopal',
    hero_title_1: 'UNLEASH YOUR',
    hero_title_highlight: 'INNER WARRIOR',
    hero_title_2: 'ON THE MAT',
    hero_desc: 'Bhopal’s premier mixed martial arts facility. Train in professional MMA cage combat, Brazilian Jiu-Jitsu, Muay Thai kickboxing, and high-intensity CrossFit under Coach Vikalp.',
    hero_cta_trial: 'Claim Free 1-Day Pass',
    hero_cta_waiver: 'Sign Digital Waiver Online',
    hero_stats_rating: '4.9★ Google Rating',
    hero_stats_athletes: '500+ Trained Athletes',
    hero_stats_coaches: 'Certified Coaches',

    feat_mma_title: 'Mixed Martial Arts (MMA)',
    feat_bjj_title: 'Brazilian Jiu-Jitsu (BJJ)',
    feat_kickboxing_title: 'Muay Thai Kickboxing',
    feat_crossfit_title: 'CrossFit & Conditioning',
    feat_kids_title: 'Kids Anti-Bullying Academy',

    reviews_title: 'Real Athlete & Parent Reviews',
    reviews_subtitle: 'Verified 5-star testimonials from our Bhopal academies in Ayodhya Nagar and Govind Garden.',
    reviews_write: 'Write a Review on Google',
    reviews_maps: 'View on Google Maps',

    gallery_title: 'Authentic Photo & Video Gallery',
    gallery_subtitle: 'Real moments on Bhopal mats, Upper Lake endurance runs, and championship fight camps.',
    gallery_all: 'All Media',
    gallery_lake: 'Team & Lake Runs',
    gallery_mma: 'MMA & Striking',
    gallery_crossfit: 'CrossFit Rig',
    gallery_bags: 'Heavy Punching Bags',

    common_search: 'Search...',
    common_save: 'Save Changes',
    common_cancel: 'Cancel',
    common_loading: 'Loading...',
  },
  hi: {
    nav_home: 'होम',
    nav_programs: 'मार्शल आर्ट्स प्रोग्राम्स',
    nav_timetable: 'साप्ताहिक टाइमटेबल',
    nav_gallery: 'फ़ोटो और वीडियो गैलरी',
    nav_reviews: 'गूगल रिव्यूज़ (4.9★)',
    nav_pricing: 'मेंबरशिप प्लान्स',
    nav_about: 'एकेडमी के बारे में',
    nav_contact: 'भोपाल शाखाएं',
    nav_waiver: 'डिजिटल वेवर साइन करें',
    nav_portal: 'एथलीट / पैरेंट पास',
    nav_admin: 'एडमिन कमांड हब',
    nav_signin: 'लॉग इन करें',
    nav_signup: 'ज्वाइन करें',
    nav_logout: 'लॉग आउट',
    nav_profile: 'प्रोफ़ाइल सेटिंग्स',
    nav_dashboard: 'मेरा डैशबोर्ड',
    nav_free_trial: 'फ्री 1-डे ट्रायल बुक करें',

    hero_badge: '⚡ भोपाल की #1 मिक्स्ड मार्शल आर्ट्स और फिटनेस एकेडमी',
    hero_title_1: 'अपने अंदर के',
    hero_title_highlight: 'योद्धा को जगाएं',
    hero_title_2: 'मैट पर',
    hero_desc: 'भोपाल की सबसे आधुनिक कॉम्बैट एकेडमी। हेड कोच विकल्प के मार्गदर्शन में प्रोफेशनल MMA केज, ब्राज़ीलियन जू-जित्सु (BJJ), मॉय थाई और क्रॉसफ़िट की ट्रेनिंग लें।',
    hero_cta_trial: 'फ्री 1-डे ट्रायल पास लें',
    hero_cta_waiver: 'ऑनलाइन डिजिटल वेवर साइन करें',
    hero_stats_rating: '4.9★ गूगल रेटिंग (100+ रिव्यूज़)',
    hero_stats_athletes: '500+ प्रशिक्षित एथलीट्स',
    hero_stats_coaches: 'सर्टिफाइड कोचेस',

    feat_mma_title: 'मिक्स्ड मार्शल आर्ट्स (MMA)',
    feat_bjj_title: 'ब्राज़ीलियन जू-जित्सु (BJJ)',
    feat_kickboxing_title: 'मॉय थाई और किकबॉक्सिंग',
    feat_crossfit_title: 'क्रॉसफ़िट और कंडीशनिंग',
    feat_kids_title: 'किड्स एंटी-बुलिंग एकेडमी',

    reviews_title: 'एथलीट्स और माता-पिता के वास्तविक रिव्यूज़',
    reviews_subtitle: 'अयोध्या नगर और गोविंद गार्डन एकेडमी से 100% वेरिफाइड 5-स्टार गूगल रिव्यूज़।',
    reviews_write: 'गूगल पर रिव्यू लिखें',
    reviews_maps: 'गूगल मैप्स पर देखें',

    gallery_title: 'असली फ़ोटो और वीडियो गैलरी',
    gallery_subtitle: 'भोपाल मैट पर ट्रेनिंग, बड़ा तालाब रनिंग और फाइट कैंप के असली दृश्य।',
    gallery_all: 'सभी फ़ोटो',
    gallery_lake: 'तालाब रनिंग और टीम',
    gallery_mma: 'MMA और स्ट्राइकिंग',
    gallery_crossfit: 'क्रॉसफ़िट रिग',
    gallery_bags: 'पंचिंग बैग्स',

    common_search: 'खोजें...',
    common_save: 'सुरक्षित करें',
    common_cancel: 'रद्द करें',
    common_loading: 'लोड हो रहा है...',
  },
};

interface LanguageContextType {
  language: LanguageCode;
  setLanguage: (lang: LanguageCode) => void;
  t: Translations;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<LanguageCode>('en');

  useEffect(() => {
    const saved = localStorage.getItem('tnt_lang') as LanguageCode;
    if (saved === 'en' || saved === 'hi') {
      setLanguageState(saved);
    }
  }, []);

  const setLanguage = (lang: LanguageCode) => {
    setLanguageState(lang);
    localStorage.setItem('tnt_lang', lang);
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t: TRANSLATIONS[language] }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
