import React, { useState } from 'react';
import { Smartphone, ArrowRight, ShieldCheck, CheckCircle2, Building2, BarChart3, Users } from 'lucide-react';
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
    <div className="space-y-5 py-6 pb-20 animate-fade-in max-w-sm mx-auto">
      {/* Brand Header */}
      <div className="text-center space-y-2 pt-2">
        <div className="w-20 h-20 rounded-3xl bg-emerald-600 text-white flex items-center justify-center text-4xl mx-auto shadow-lg shadow-emerald-700/20 ring-4 ring-emerald-100 dark:ring-emerald-950/60">
          🌾
        </div>
        <div>
          <h1 className="text-2xl font-black text-emerald-800 dark:text-emerald-400 tracking-tight">
            FosolSetu
          </h1>
          <p className="text-xs font-semibold text-stone-600 dark:text-stone-300">
            {lang === 'bn' ? 'ফসলে সেতু · কৃষকের আপন অর্থায়ন ও বাজার' : 'Fair Micro-Advances & Direct Farm Marketplace'}
          </p>
        </div>
        <p className="text-xs text-stone-500 dark:text-stone-400 italic max-w-xs mx-auto">
          {lang === 'bn'
            ? '“কৃষক কষ্ট পাওয়ার আগেই ন্যায্য আয় করুক।”'
            : '“Farmers should earn before they suffer.”'}
        </p>
      </div>

      {/* Mobile Login Form */}
      <div className="bg-white dark:bg-[#162419] p-5 rounded-2xl border border-stone-200 dark:border-stone-800 shadow-sm space-y-4">
        <form onSubmit={handleFarmerLogin} className="space-y-3">
          <div>
            <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1">
              {lang === 'bn' ? '📱 মোবাইল নম্বর' : '📱 Phone Number'}
            </label>
            <div className="relative">
              <input
                type="tel"
                value={localPhone}
                onChange={(e) => setLocalPhone(e.target.value)}
                placeholder="017XX XXXXXX"
                className="w-full h-12 px-3 pl-10 rounded-xl border-2 border-stone-200 dark:border-stone-800 bg-white dark:bg-[#121c13] text-stone-900 dark:text-stone-100 font-bold text-base focus:border-emerald-600 focus:outline-hidden"
              />
              <Smartphone className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 active:scale-98 text-white font-bold text-sm shadow-md transition flex items-center justify-center gap-2"
          >
            <span>{lang === 'bn' ? 'কৃষক হিসেবে প্রবেশ করুন' : 'Continue as Farmer'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="p-2.5 bg-stone-50 dark:bg-[#121c13] rounded-xl text-center border border-stone-100 dark:border-stone-800">
          <div className="text-[11px] text-stone-500 dark:text-stone-400 flex items-center justify-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            <span>
              {lang === 'bn'
                ? 'ডেমো মোড: কোনো ওটিপি লাগবে না, সরাসরি প্রবেশ করুন'
                : 'Demo mode: instant access without SMS delay'}
            </span>
          </div>
        </div>
      </div>

      {/* Quick Role Selectors */}
      <div className="bg-white dark:bg-[#162419] p-4 rounded-2xl border border-stone-200 dark:border-stone-800 shadow-sm space-y-2">
        <div className="text-xs font-bold text-stone-500 dark:text-stone-400 uppercase tracking-wider pb-1">
          {lang === 'bn' ? 'অন্যান্য প্ল্যাটফর্ম ভিউ' : 'Other Platform Roles'}
        </div>

        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={() => onLogin('buyer')}
            className="p-3 rounded-xl border border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-[#121c13] text-left hover:border-emerald-600 transition flex items-center gap-2"
          >
            <div className="w-8 h-8 rounded-lg bg-blue-100 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 flex items-center justify-center">
              <Building2 className="w-4 h-4" />
            </div>
            <div>
              <div className="font-bold text-xs text-stone-800 dark:text-stone-200">
                {lang === 'bn' ? 'পাইকারি ক্রেতা' : 'Wholesale Buyer'}
              </div>
              <div className="text-[10px] text-stone-500">
                {lang === 'bn' ? 'দরপ্রস্তাব দিন' : 'Bid on crops'}
              </div>
            </div>
          </button>

          <button
            onClick={() => onLogin('admin')}
            className="p-3 rounded-xl border border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-[#121c13] text-left hover:border-emerald-600 transition flex items-center gap-2"
          >
            <div className="w-8 h-8 rounded-lg bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 flex items-center justify-center">
              <BarChart3 className="w-4 h-4" />
            </div>
            <div>
              <div className="font-bold text-xs text-stone-800 dark:text-stone-200">
                {lang === 'bn' ? 'পার্টনার অ্যাডমিন' : 'Fintech Admin'}
              </div>
              <div className="text-[10px] text-stone-500">
                {lang === 'bn' ? 'পোর্টফোলিও' : 'MRR & Credit'}
              </div>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};
