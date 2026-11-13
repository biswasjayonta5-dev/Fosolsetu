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
    <div className="space-y-6 pb-20 lg:pb-8 animate-fade-in w-full max-w-5xl mx-auto">
      <div>
        <h2 className="font-extrabold text-xl sm:text-2xl text-stone-900 dark:text-stone-100 flex items-center gap-2">
          <span>☰</span>
          <span>{lang === 'bn' ? 'আরও সেবা ও অ্যাকাউন্ট সেটিংস' : 'All Services & Platform Settings'}</span>
        </h2>
        <p className="text-xs sm:text-sm text-stone-500 dark:text-stone-400 mt-0.5">
          {lang === 'bn' ? 'ফসলসেতুর সকল সুবিধা, ডিরেক্টরি ও ভাষা পরিবর্তন' : 'Explore packages, agro-dealer network, accessibility, and account preferences'}
        </p>
      </div>

      {/* 2-Column Responsive Layout on Desktop */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
        
        {/* Left Column: Core Agritech Tools */}
        <div className="space-y-4">
          <h3 className="text-xs font-bold text-stone-500 uppercase tracking-wider">
            {lang === 'bn' ? 'কৃষি সেবা ও সুবিধা' : 'Agritech Services'}
          </h3>

          <div className="bg-white dark:bg-[#162419] rounded-2xl border border-stone-200 dark:border-stone-800 shadow-sm overflow-hidden divide-y divide-stone-100 dark:divide-stone-800/80">
            <button
              onClick={() => onNavigate('plans')}
              className="w-full p-4 flex items-center justify-between text-left hover:bg-stone-50 dark:hover:bg-[#1f2f22] transition"
            >
              <div className="flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-400 flex items-center justify-center text-xl shrink-0">
                  ⭐
                </div>
                <div>
                  <div className="font-bold text-sm text-stone-900 dark:text-stone-100">
                    {lang === 'bn' ? 'সাবস্ক্রিপশন প্যাকেজসমূহ' : 'Membership Plans'}
                  </div>
                  <div className="text-xs text-stone-500 mt-0.5">
                    {lang === 'bn' ? 'বেসিক, প্রো ও প্রিমিয়াম মেম্বারশিপ' : 'Compare tiers and features'}
                  </div>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-stone-400" />
            </button>

            <button
              onClick={() => onNavigate('dealers')}
              className="w-full p-4 flex items-center justify-between text-left hover:bg-stone-50 dark:hover:bg-[#1f2f22] transition"
            >
              <div className="flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-950/60 text-blue-700 dark:text-blue-400 flex items-center justify-center text-xl shrink-0">
                  🏪
                </div>
                <div>
                  <div className="font-bold text-sm text-stone-900 dark:text-stone-100">
                    {lang === 'bn' ? 'সার ও বীজের অনুমোদিত ডিলার' : 'Agro Input Directory'}
                  </div>
                  <div className="text-xs text-stone-500 mt-0.5">
                    {lang === 'bn' ? 'বিএডিসি সার্টিফাইড ডিলারদের তালিকা ও কল' : 'Certified dealers with direct calling'}
                  </div>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-stone-400" />
            </button>

            <button
              onClick={() => onNavigate('women')}
              className="w-full p-4 flex items-center justify-between text-left hover:bg-stone-50 dark:hover:bg-[#1f2f22] transition"
            >
              <div className="flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-purple-100 dark:bg-purple-950/60 text-purple-700 dark:text-purple-400 flex items-center justify-center text-xl shrink-0">
                  👩‍🌾
                </div>
                <div>
                  <div className="font-bold text-sm text-stone-900 dark:text-stone-100">
                    {lang === 'bn' ? 'নারী কৃষক ও নারী সমবায় হাব' : 'Women Farmers Hub'}
                  </div>
                  <div className="text-xs text-stone-500 mt-0.5">
                    {lang === 'bn' ? 'দলগত সহজ আবেদন ও বিশেষ ৫% ফি' : 'Group onboarding & preferential 5% fee'}
                  </div>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-stone-400" />
            </button>

            <button
              onClick={onOpenDoctor}
              className="w-full p-4 flex items-center justify-between text-left hover:bg-stone-50 dark:hover:bg-[#1f2f22] transition"
            >
              <div className="flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 flex items-center justify-center text-xl shrink-0">
                  🔬
                </div>
                <div>
                  <div className="font-bold text-sm text-stone-900 dark:text-stone-100">
                    {lang === 'bn' ? 'এআই ক্রপ ডক্টর (রোগ নির্ণয়)' : 'AI Crop Doctor'}
                  </div>
                  <div className="text-xs text-stone-500 mt-0.5">
                    {lang === 'bn' ? 'মোবাইল ক্যামেরায় পাতার লক্ষণ ও সমাধান' : 'Symptom scanner & field treatments'}
                  </div>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-stone-400" />
            </button>
          </div>
        </div>

        {/* Right Column: App Settings & Accessibility */}
        <div className="space-y-4">
          <h3 className="text-xs font-bold text-stone-500 uppercase tracking-wider">
            {lang === 'bn' ? 'অ্যাপ পছন্দ ও ভাষা' : 'Preferences & Accessibility'}
          </h3>

          <div className="bg-white dark:bg-[#162419] rounded-2xl border border-stone-200 dark:border-stone-800 shadow-sm overflow-hidden divide-y divide-stone-100 dark:divide-stone-800/80">
            <div className="p-4 flex items-center justify-between">
              <div className="flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 flex items-center justify-center shrink-0">
                  {isDark ? <Sun className="w-5 h-5 text-amber-400" /> : <Moon className="w-5 h-5 text-stone-600" />}
                </div>
                <div>
                  <div className="font-bold text-sm text-stone-900 dark:text-stone-100">
                    {lang === 'bn' ? 'ডার্ক মোড / উচ্চ বৈসাদৃশ্য' : 'High Contrast / Dark Mode'}
                  </div>
                  <div className="text-xs text-stone-500 mt-0.5">
                    {lang === 'bn' ? 'রোদের আলোয় পরিষ্কার দেখার জন্য থিম' : 'Optimized for outdoor field sunlight'}
                  </div>
                </div>
              </div>
              <button
                onClick={onToggleTheme}
                className="px-3.5 py-2 rounded-xl border border-stone-300 dark:border-stone-700 text-xs font-bold bg-stone-50 dark:bg-stone-800"
              >
                {isDark ? 'Light' : 'Dark'}
              </button>
            </div>

            <div className="p-4 flex items-center justify-between">
              <div className="flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 flex items-center justify-center shrink-0">
                  <Globe className="w-5 h-5 text-emerald-600" />
                </div>
                <div>
                  <div className="font-bold text-sm text-stone-900 dark:text-stone-100">
                    {lang === 'bn' ? 'ভাষা / Language' : 'App Language'}
                  </div>
                  <div className="text-xs text-stone-500 mt-0.5">
                    {lang === 'bn' ? 'বাংলা এবং ইংরেজি সম্পূর্ণ সাপোর্ট' : 'Full Bengali and English localized'}
                  </div>
                </div>
              </div>
              <button
                onClick={onToggleLang}
                className="px-3.5 py-2 rounded-xl bg-amber-400 text-stone-900 text-xs font-extrabold shadow-xs"
              >
                {lang === 'bn' ? 'English' : 'বাংলা'}
              </button>
            </div>

            <button
              onClick={onLogout}
              className="w-full p-4 flex items-center justify-between text-left hover:bg-red-50/60 dark:hover:bg-red-950/20 text-red-600 dark:text-red-400 transition"
            >
              <div className="flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-red-100 dark:bg-red-950/50 flex items-center justify-center shrink-0">
                  <LogOut className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-bold text-sm">
                    {lang === 'bn' ? 'লগআউট / ভূমিকা পরিবর্তন' : 'Switch Role / Sign Out'}
                  </div>
                  <div className="text-xs text-red-500/80 mt-0.5">
                    {lang === 'bn' ? 'লগইন পর্দায় ফিরে যান' : 'Return to role portal screen'}
                  </div>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-red-400" />
            </button>
          </div>
        </div>

      </div>

      {/* Footer Info */}
      <div className="text-center text-xs text-stone-400 dark:text-stone-500 space-y-1 pt-4">
        <div>FosolSetu (ফসলে সেতু) · v2.5 Professional Agritech Platform</div>
        <div>Built with fair micro-advances, zero commission marketplace, and satellite indexing</div>
      </div>
    </div>
  );
};
