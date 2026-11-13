import React, { useState } from 'react';
import { Smartphone, ArrowRight, ShieldCheck, CheckCircle2, Building2, BarChart3, Users, Sparkles, Wheat } from 'lucide-react';
import { UserRole, Language } from '../../types';

interface LoginViewProps {
  phone: string;
  onSetPhone: (p: string) => void;
  onLogin: (role: UserRole) => void;
  lang: Language;
}

export const LoginView: React.FC<LoginViewProps> = ({
  phone,
  onSetPhone,
  onLogin,
  lang,
}) => {
  const [localPhone, setLocalPhone] = useState(phone || '01712 345678');

  const handleFarmerLogin = (e: React.FormEvent) => {
    e.preventDefault();
    onSetPhone(localPhone);
    onLogin('farmer');
  };

  return (
    <div className="py-6 sm:py-12 animate-fade-in max-w-2xl mx-auto space-y-6">
      {/* Brand Header */}
      <div className="text-center space-y-3">
        <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-3xl bg-emerald-600 text-white flex items-center justify-center text-4xl sm:text-5xl mx-auto shadow-xl shadow-emerald-700/20 ring-4 ring-emerald-100 dark:ring-emerald-950/60">
          🌾
        </div>
        <div>
          <h1 className="text-3xl sm:text-4xl font-black text-emerald-800 dark:text-emerald-400 tracking-tight">
            FosolSetu (ফসলে সেতু)
          </h1>
          <p className="text-sm sm:text-base font-bold text-stone-700 dark:text-stone-300 mt-1">
            {lang === 'bn' ? 'ন্যায্য কৃষি অর্থায়ন ও সরাসরি কৃষক-পাইকার উন্মুক্ত বাজার' : 'Fair Micro-Advances & Direct Agricultural Marketplace'}
          </p>
        </div>
        <p className="text-xs sm:text-sm text-stone-500 dark:text-stone-400 italic max-w-md mx-auto">
          {lang === 'bn'
            ? '“কৃষক কষ্ট পাওয়ার আগেই যেন ন্যায্য আয় ও আর্থিক নিরাপত্তা নিশ্চিত করতে পারে।”'
            : '“Farmers should earn before they suffer — breaking the debt cycle with fair fintech.”'}
        </p>
      </div>

      {/* Main Login Card */}
      <div className="bg-white dark:bg-[#162419] p-6 sm:p-8 rounded-3xl border border-stone-200 dark:border-stone-800 shadow-lg space-y-5">
        <form onSubmit={handleFarmerLogin} className="space-y-4">
          <div>
            <label className="block text-xs sm:text-sm font-bold text-stone-700 dark:text-stone-300 mb-1.5 uppercase tracking-wider">
              {lang === 'bn' ? '📱 মোবাইল ফোন নম্বর' : '📱 Mobile Phone Number'}
            </label>
            <div className="relative">
              <input
                type="tel"
                value={localPhone}
                onChange={(e) => setLocalPhone(e.target.value)}
                placeholder="017XX XXXXXX"
                className="w-full h-14 px-4 pl-12 rounded-2xl border-2 border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-[#121c13] text-stone-900 dark:text-stone-100 font-extrabold text-lg focus:border-emerald-600 focus:outline-hidden transition"
              />
              <Smartphone className="w-5 h-5 text-stone-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-4 rounded-2xl bg-emerald-700 hover:bg-emerald-800 active:scale-98 text-white font-extrabold text-base shadow-md transition flex items-center justify-center gap-2"
          >
            <span>{lang === 'bn' ? 'কৃষক হিসেবে প্রবেশ করুন' : 'Continue as Farmer'}</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </form>

        <div className="p-3 bg-stone-50 dark:bg-[#121c13] rounded-2xl text-center border border-stone-100 dark:border-stone-800">
          <div className="text-xs text-stone-500 dark:text-stone-400 flex items-center justify-center gap-1.5 font-medium">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>
              {lang === 'bn'
                ? 'তাৎক্ষণিক প্রবেশ: ডেমো মোডে কোনো এসএমএস ওটিপি বিলম্ব নেই'
                : 'Instant test access: pre-filled number with full platform capabilities'}
            </span>
          </div>
        </div>
      </div>

      {/* Quick Role Switcher Cards (2 Columns) */}
      <div className="bg-white dark:bg-[#162419] p-5 sm:p-6 rounded-3xl border border-stone-200 dark:border-stone-800 shadow-sm space-y-3">
        <div className="text-xs font-bold text-stone-500 dark:text-stone-400 uppercase tracking-wider">
          {lang === 'bn' ? 'অন্যান্য প্ল্যাটফর্ম ভূমিকা অন্বেষণ' : 'Explore Other Platform Portals'}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <button
            onClick={() => onLogin('buyer')}
            className="p-4 rounded-2xl border border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-[#121c13] text-left hover:border-emerald-600 hover:bg-emerald-50/50 dark:hover:bg-emerald-950/30 transition flex items-start gap-3.5 group"
          >
            <div className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 flex items-center justify-center text-xl shrink-0 group-hover:scale-105 transition">
              <Building2 className="w-5 h-5" />
            </div>
            <div>
              <div className="font-extrabold text-sm text-stone-900 dark:text-stone-100">
                {lang === 'bn' ? 'পাইকারি ক্রেতা ও মিল মালিক' : 'Wholesale Buyer Portal'}
              </div>
              <div className="text-xs text-stone-500 mt-0.5 leading-snug">
                {lang === 'bn' ? 'সরাসরি কৃষকের চালান ব্রাউজ করুন ও দরপ্রস্তাব দিন' : 'Browse open farmer lots & submit purchase bids'}
              </div>
            </div>
          </button>

          <button
            onClick={() => onLogin('admin')}
            className="p-4 rounded-2xl border border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-[#121c13] text-left hover:border-emerald-600 hover:bg-emerald-50/50 dark:hover:bg-emerald-950/30 transition flex items-start gap-3.5 group"
          >
            <div className="w-10 h-10 rounded-xl bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 flex items-center justify-center text-xl shrink-0 group-hover:scale-105 transition">
              <BarChart3 className="w-5 h-5" />
            </div>
            <div>
              <div className="font-extrabold text-sm text-stone-900 dark:text-stone-100">
                {lang === 'bn' ? 'এমএফআই পার্টনার ড্যাশবোর্ড' : 'MFI & Bank Partner Analytics'}
              </div>
              <div className="text-xs text-stone-500 mt-0.5 leading-snug">
                {lang === 'bn' ? 'পোর্টফোলিও ঝুঁকি, বিতরণকৃত ঋণ ও এমআরআর অ্যানালিটিক্স' : 'Real-time credit deployment & risk monitoring'}
              </div>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};
