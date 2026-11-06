import React from 'react';
import { 
  HeartHandshake, 
  Smartphone, 
  Users, 
  Coins, 
  ShieldCheck, 
  ArrowRight,
  Sparkles,
  PhoneCall
} from 'lucide-react';
import { Language } from '../../types';

interface WomenViewProps {
  lang: Language;
  onStartPlan: () => void;
}

export const WomenView: React.FC<WomenViewProps> = ({ lang, onStartPlan }) => {
  const steps = [
    {
      icon: Smartphone,
      titleBn: '১. কেবল ফোন নম্বরে তাৎক্ষণিক নিবন্ধন',
      titleEn: '1. Instant Mobile Registration',
      descBn: 'শুরুতে কোনো জমির দলিল বা মালিকানার কাগজপত্র লাগবে না। আপনার সক্রিয় ফোন নম্বরই যথেষ্ট।',
      descEn: 'No land ownership deeds needed upfront. Register securely with your mobile phone.',
    },
    {
      icon: Users,
      titleBn: '২. নারী সমবায় দলে যৌথ আবেদন',
      titleEn: '2. Cooperative Group Inclusivity',
      descBn: 'পাড়া বা গ্রামের নারী কৃষক দল হিসেবে একসাথে যুক্ত হন। আমাদের নারী মাঠ কর্মকর্তা সরাসরি ভিজিট করবেন।',
      descEn: 'Join as a self-help cooperative group. A dedicated female field officer visits your village.',
    },
    {
      icon: Coins,
      titleBn: '৩. বিশেষ ৫% সাশ্রয়ী সার্ভিস ফি',
      titleEn: '3. Preferred 5% Flat Advance Fee',
      descBn: 'অন্যান্য উৎসের চড়া চক্রবৃদ্ধি সুদের বদলে মাত্র ৫% এককালীন ফি-তে বিকাশ অ্যাকাউন্টে অগ্রিম টাকা পাবেন।',
      descEn: 'Receive up to 30% harvest financing deposited directly to bKash with a preferential 5% flat fee.',
    },
    {
      icon: ShieldCheck,
      titleBn: '৪. ন্যায্য মূল্যে সরাসরি প্রাতিষ্ঠানিক ক্রেতা',
      titleEn: '4. Guaranteed Direct Buyer Access',
      descBn: 'হাটে যাওয়ার ঝামেলা ছাড়াই বাছাইকৃত রফতানিকারক ও খাদ্য প্রক্রিয়াজাতকারী কোম্পানিতে সরাসরি বিক্রি করুন।',
      descEn: 'Sell collectively to verified exporters and retail food companies with zero middlemen leakage.',
    },
  ];

  return (
    <div className="space-y-4 pb-20 animate-fade-in">
      {/* Banner */}
      <div className="bg-gradient-to-br from-purple-800 to-indigo-900 text-white p-5 rounded-2xl shadow-md space-y-2">
        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-purple-500/30 text-purple-200 text-xs font-bold border border-purple-400/30">
          <Sparkles className="w-3.5 h-3.5 text-amber-300" />
          <span>{lang === 'bn' ? 'নারী কৃষক অন্তর্ভুক্তি উদ্যোগ' : 'Women Farmer Financial Inclusion'}</span>
        </div>

        <h2 className="text-lg font-black tracking-tight">
          {lang === 'bn'
            ? 'নারী কৃষক ও নারী সমবায়ের আর্থিক স্বনির্ভরতা'
            : 'Fair Micro-Advances & Collective Trade for Women'}
        </h2>

        <p className="text-xs text-purple-200 leading-relaxed">
          {lang === 'bn'
            ? 'বাংলাদেশের কৃষিতে শ্রম দেওয়া লক্ষ লক্ষ নারীর অধিকার ও ন্যায়সঙ্গত আর্থিক সেবা নিশ্চিত করতে ফসলসেতুর বিশেষ প্রোগ্রাম।'
            : 'Empowering female agricultural producers and collective farming groups across Bangladesh with dignity and zero-collateral financing.'}
        </p>
      </div>

      {/* 4 Feature Steps */}
      <div className="space-y-3">
        {steps.map((s, i) => {
          const Icon = s.icon;
          return (
            <div
              key={i}
              className="bg-white dark:bg-[#162419] p-4 rounded-2xl border border-stone-200 dark:border-stone-800 shadow-sm flex items-start gap-3.5"
            >
              <div className="w-10 h-10 rounded-xl bg-purple-100 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300 flex items-center justify-center shrink-0">
                <Icon className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <h3 className="font-bold text-xs text-stone-900 dark:text-stone-100">
                  {lang === 'bn' ? s.titleBn : s.titleEn}
                </h3>
                <p className="text-xs text-stone-600 dark:text-stone-300 leading-normal">
                  {lang === 'bn' ? s.descBn : s.descEn}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Direct Call Center Card */}
      <div className="bg-stone-50 dark:bg-[#121c13] p-4 rounded-2xl border border-stone-200 dark:border-stone-800 flex items-center justify-between">
        <div>
          <div className="font-bold text-xs text-stone-900 dark:text-stone-100">
            {lang === 'bn' ? 'নারী কৃষক হেল্পলাইন' : 'Dedicated Women Helpline'}
          </div>
          <div className="text-[11px] text-stone-500 dark:text-stone-400">
            {lang === 'bn' ? 'সরাসরি নারী ফিল্ড প্রতিনিধির সাথে কথা বলুন' : 'Speak to a female agricultural counselor'}
          </div>
        </div>
        <a
          href="tel:09612345678"
          className="px-3 py-2 rounded-xl bg-purple-700 hover:bg-purple-800 text-white font-bold text-xs shadow-xs flex items-center gap-1.5"
        >
          <PhoneCall className="w-3.5 h-3.5" />
          <span>{lang === 'bn' ? '১৬১২৩' : '16123'}</span>
        </a>
      </div>

      {/* CTA Button */}
      <button
        onClick={onStartPlan}
        className="w-full py-3.5 rounded-xl bg-purple-700 hover:bg-purple-800 active:scale-98 text-white font-bold text-sm shadow-md transition flex items-center justify-center gap-2"
      >
        <span>{lang === 'bn' ? 'নারী কৃষক হিসেবে আবেদন শুরু করুন' : 'Apply as Woman Farmer / Co-op'}</span>
        <ArrowRight className="w-4 h-4" />
      </button>
    </div>
  );
};
