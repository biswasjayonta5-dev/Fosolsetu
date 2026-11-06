import React from 'react';
import { 
  Star, 
  Store, 
  Users, 
  Stethoscope, 
  Moon, 
  Sun, 
  Globe, 
  LogOut, 
  HelpCircle, 
  PhoneCall, 
  ChevronRight,
  ShieldCheck
} from 'lucide-react';
import { Language, ViewType } from '../../types';

interface MoreViewProps {
  onNavigate: (view: ViewType) => void;
  lang: Language;
  onToggleLang: () => void;
  isDark: boolean;
  onToggleTheme: () => void;
  onLogout: () => void;
  onOpenDoctor: () => void;
}

export const MoreView: React.FC<MoreViewProps> = ({
  onNavigate,
  lang,
  onToggleLang,
  isDark,
  onToggleTheme,
  onLogout,
  onOpenDoctor,
}) => {
  return (
    <div className="space-y-4 pb-20 animate-fade-in">
      <div>
        <h2 className="font-bold text-base text-stone-900 dark:text-stone-100 flex items-center gap-2">
          <span>☰</span>
          <span>{lang === 'bn' ? 'আরও সেবা ও সেটিংস' : 'Services & Settings'}</span>
        </h2>
        <p className="text-xs text-stone-500 dark:text-stone-400">
          {lang === 'bn' ? 'ফসলসেতুর সকল সুবিধা এক নজরে' : 'Explore all tools, memberships and account options'}
        </p>
      </div>

      {/* Main Services Menu */}
      <div className="bg-white dark:bg-[#162419] rounded-2xl border border-stone-200 dark:border-stone-800 shadow-sm overflow-hidden divide-y divide-stone-100 dark:divide-stone-800/80">
        <button
          onClick={() => onNavigate('plans')}
          className="w-full p-4 flex items-center justify-between text-left hover:bg-stone-50 dark:hover:bg-[#1f2f22] transition active:scale-98"
        >
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-400 flex items-center justify-center text-lg">
              ⭐
            </div>
            <div>
              <div className="font-bold text-xs text-stone-900 dark:text-stone-100">
                {lang === 'bn' ? 'সাবস্ক্রিপশন প্যাকেজসমূহ' : 'Membership Plans'}
              </div>
              <div className="text-[11px] text-stone-500">
                {lang === 'bn' ? 'বেসিক, প্রো ও প্রিমিয়াম সুবিধা' : 'Compare tiers and features'}
              </div>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-stone-400" />
        </button>

        <button
          onClick={() => onNavigate('dealers')}
          className="w-full p-4 flex items-center justify-between text-left hover:bg-stone-50 dark:hover:bg-[#1f2f22] transition active:scale-98"
        >
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-blue-100 dark:bg-blue-950/60 text-blue-700 dark:text-blue-400 flex items-center justify-center text-lg">
              🏪
            </div>
            <div>
              <div className="font-bold text-xs text-stone-900 dark:text-stone-100">
                {lang === 'bn' ? 'সার ও বীজের অনুমোদিত দোকান' : 'Agro Input Directory'}
              </div>
              <div className="text-[11px] text-stone-500">
                {lang === 'bn' ? 'বিএডিসির সার্টিফাইড ডিলার তালিকা' : 'Certified dealers with direct calling'}
              </div>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-stone-400" />
        </button>

        <button
          onClick={() => onNavigate('women')}
          className="w-full p-4 flex items-center justify-between text-left hover:bg-stone-50 dark:hover:bg-[#1f2f22] transition active:scale-98"
        >
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-purple-100 dark:bg-purple-950/60 text-purple-700 dark:text-purple-400 flex items-center justify-center text-lg">
              👩‍🌾
            </div>
            <div>
              <div className="font-bold text-xs text-stone-900 dark:text-stone-100">
                {lang === 'bn' ? 'নারী কৃষক ও সমবায় হাব' : 'Women Farmers Hub'}
              </div>
              <div className="text-[11px] text-stone-500">
                {lang === 'bn' ? 'কাগজপত্র ছাড়া দলগত সহজ আবেদন' : 'Group onboarding & preferential 5% fee'}
              </div>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-stone-400" />
        </button>

        <button
          onClick={onOpenDoctor}
          className="w-full p-4 flex items-center justify-between text-left hover:bg-stone-50 dark:hover:bg-[#1f2f22] transition active:scale-98"
        >
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 flex items-center justify-center text-lg">
              🔬
            </div>
            <div>
              <div className="font-bold text-xs text-stone-900 dark:text-stone-100">
                {lang === 'bn' ? 'এআই ক্রপ ডক্টর' : 'AI Crop Doctor'}
              </div>
              <div className="text-[11px] text-stone-500">
                {lang === 'bn' ? 'মোবাইল ক্যামেরায় রোগের সমাধান' : 'Symptom scanner & field treatments'}
              </div>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-stone-400" />
        </button>
      </div>

      {/* App Preferences */}
      <div className="bg-white dark:bg-[#162419] rounded-2xl border border-stone-200 dark:border-stone-800 shadow-sm overflow-hidden divide-y divide-stone-100 dark:divide-stone-800/80">
        <div className="p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 flex items-center justify-center">
              {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-stone-600" />}
            </div>
            <div>
              <div className="font-bold text-xs text-stone-900 dark:text-stone-100">
                {lang === 'bn' ? 'উচ্চ বৈসাদৃশ্য / ডার্ক মোড' : 'High Contrast / Dark Mode'}
              </div>
              <div className="text-[11px] text-stone-500">
                {lang === 'bn' ? 'রোদে দেখার সুবিধার্থে কালার থিম' : 'Optimized for outdoor field visibility'}
              </div>
            </div>
          </div>
          <button
            onClick={onToggleTheme}
            className="px-3 py-1.5 rounded-lg border border-stone-300 dark:border-stone-700 text-xs font-bold bg-stone-50 dark:bg-stone-800"
          >
            {isDark ? 'Light' : 'Dark'}
          </button>
        </div>

        <div className="p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 flex items-center justify-center">
              <Globe className="w-4 h-4 text-emerald-600" />
            </div>
            <div>
              <div className="font-bold text-xs text-stone-900 dark:text-stone-100">
                {lang === 'bn' ? 'ভাষা / Language' : 'App Language'}
              </div>
              <div className="text-[11px] text-stone-500">
                {lang === 'bn' ? 'বাংলা ও ইংরেজি সম্পূর্ণ সাপোর্ট' : 'Full Bengali and English localized'}
              </div>
            </div>
          </div>
          <button
            onClick={onToggleLang}
            className="px-3 py-1.5 rounded-lg bg-amber-400 text-stone-900 text-xs font-bold shadow-xs"
          >
            {lang === 'bn' ? 'English' : 'বাংলা'}
          </button>
        </div>

        <button
          onClick={onLogout}
          className="w-full p-4 flex items-center justify-between text-left hover:bg-red-50/60 dark:hover:bg-red-950/20 text-red-600 dark:text-red-400 transition"
        >
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-red-100 dark:bg-red-950/50 flex items-center justify-center">
              <LogOut className="w-4 h-4" />
            </div>
            <div>
              <div className="font-bold text-xs">
                {lang === 'bn' ? 'লগআউট / ভূমিকা পরিবর্তন' : 'Switch Role / Logout'}
              </div>
              <div className="text-[11px] text-red-500/80">
                {lang === 'bn' ? 'ক্রেতা বা পার্টনার হিসেবে লগইন করুন' : 'Switch between farmer, buyer, or admin'}
              </div>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-red-400" />
        </button>
      </div>

      {/* Footer Info */}
      <div className="text-center text-[11px] text-stone-400 dark:text-stone-500 space-y-1 pt-2">
        <div>FosolSetu v2.4 (Mobile Optimized)</div>
        <div>Built for Bangladesh smallholder farmers with fair fintech</div>
      </div>
    </div>
  );
};
