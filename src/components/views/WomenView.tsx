import React from 'react';
import { 
  HeartHandshake, 
  Smartphone, 
  Users, 
  Coins, 
  ShieldCheck, 
  ArrowRight,
  Sparkles,
  PhoneCall,
  CheckCircle2
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
      descBn: 'শুরুতে কোনো জমির দলিল বা খতিয়ানের কাগজপত্র লাগবে না। আপনার সক্রিয় ফোন নম্বরই যথেষ্ট।',
      descEn: 'No land ownership deeds needed upfront. Register securely with your mobile phone.',
    },
    {
      icon: Users,
      titleBn: '২. নারী সমবায় দলে যৌথ অন্তর্ভুক্তি',
      titleEn: '2. Cooperative Group Inclusivity',
      descBn: 'গ্রাম বা পাড়ার নারী কৃষক দল হিসেবে একসাথে যুক্ত হন। আমাদের নারী মাঠ কর্মকর্তা সরাসরি সমবায় পরিদর্শন করবেন।',
      descEn: 'Join as a self-help cooperative group. A dedicated female field officer visits your village.',
    },
    {
      icon: Coins,
      titleBn: '৩. বিশেষ ৫% সাশ্রয়ী ফ্ল্যাট সার্ভিস ফি',
      titleEn: '3. Preferred 5% Flat Advance Fee',
      descBn: 'অন্যান্য উৎসের চড়া চক্রবৃদ্ধি সুদের বদলে মাত্র ৫% এককালীন ফি-তে সরাসরি বিকাশ অ্যাকাউন্টে টাকা পাবেন।',
      descEn: 'Receive up to 30% harvest financing deposited directly to bKash with a preferential 5% flat fee.',
    },
    {
      icon: ShieldCheck,
      titleBn: '৪. ন্যায্য মূল্যে সরাসরি প্রাতিষ্ঠানিক ক্রেতা',
      titleEn: '4. Guaranteed Direct Buyer Access',
      descBn: 'হাটে টানাহেঁচড়া ছাড়াই বাছাইকৃত রফতানিকারক ও খাদ্য প্রক্রিয়াজাতকারী কোম্পানিতে সরাসরি বিক্রি করুন।',
      descEn: 'Sell collectively to verified exporters and retail food companies with zero middlemen leakage.',
    },
  ];

  return (
    <div className="space-y-6 pb-20 lg:pb-8 animate-fade-in w-full">
      {/* Banner */}
      <div className="bg-gradient-to-br from-purple-800 via-purple-900 to-indigo-950 text-white p-6 sm:p-8 rounded-2xl shadow-md space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-500/30 text-purple-200 text-xs font-bold border border-purple-400/30">
          <Sparkles className="w-4 h-4 text-amber-300" />
          <span>{lang === 'bn' ? 'নারী কৃষক আর্থিক অন্তর্ভুক্তি ও স্বনির্ভরতা উদ্যোগ' : 'Women Farmer Financial Inclusion & Dignity'}</span>
        </div>

        <h2 className="text-xl sm:text-3xl font-black tracking-tight max-w-2xl">
          {lang === 'bn'
            ? 'নারী কৃষক ও নারী সমবায় সমিতির জন্য সহজ শর্তে মাইক্রো-অগ্রিম'
            : 'Collateral-Free Pre-Harvest Advances & Collective Trade for Women'}
        </h2>

        <p className="text-xs sm:text-sm text-purple-200 leading-relaxed max-w-3xl">
          {lang === 'bn'
            ? 'বাংলাদেশের কৃষিতে শ্রম দেওয়া লক্ষ লক্ষ নারীর অধিকার ও ন্যায়সঙ্গত আর্থিক সেবা নিশ্চিত করতে ফসলসেতুর বিশেষ প্রোগ্রাম। কোনো প্রাথমিক জমির দলিল ছাড়াই নারী দলের সুপারিশে নগদ অর্থায়ন।'
            : 'Empowering female agricultural producers and collective farming groups across Bangladesh with dignity, 0% compound interest, and direct corporate buyers.'}
        </p>
      </div>

      {/* 4 Feature Steps: 4 Columns on Desktop */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {steps.map((s, i) => {
          const Icon = s.icon;
          return (
            <div
              key={i}
              className="bg-white dark:bg-[#162419] p-5 rounded-2xl border border-stone-200 dark:border-stone-800 shadow-sm flex flex-col justify-between space-y-3 hover:border-purple-400 transition"
            >
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-purple-100 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300 flex items-center justify-center shrink-0">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="font-extrabold text-sm sm:text-base text-stone-900 dark:text-stone-100">
                  {lang === 'bn' ? s.titleBn : s.titleEn}
                </h3>
                <p className="text-xs text-stone-600 dark:text-stone-300 leading-relaxed">
                  {lang === 'bn' ? s.descBn : s.descEn}
                </p>
              </div>

              <div className="pt-2 border-t border-stone-100 dark:border-stone-800 flex items-center gap-1.5 text-[11px] font-bold text-purple-700 dark:text-purple-400">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>{lang === 'bn' ? 'স্বয়ংক্রিয়ভাবে নিশ্চিত' : 'Verified Standard'}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Direct Call Center Card & Action */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 items-center">
        <div className="md:col-span-2 bg-stone-50 dark:bg-[#121c13] p-5 rounded-2xl border border-stone-200 dark:border-stone-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="font-extrabold text-sm sm:text-base text-stone-900 dark:text-stone-100">
              {lang === 'bn' ? 'নারী কৃষক সমবায় পরামর্শ সেল' : 'Dedicated Women Agricultural Help Desk'}
            </div>
            <div className="text-xs text-stone-500 dark:text-stone-400 mt-0.5">
              {lang === 'bn' ? 'সরাসরি নারী ফিল্ড প্রতিনিধির সাথে কথা বলে আবেদন প্রক্রিয়া সম্পন্ন করুন' : 'Speak to a female agricultural extension counselor for cooperative enrollment'}
            </div>
          </div>
          <a
            href="tel:16123"
            className="px-4 py-2.5 rounded-xl bg-purple-700 hover:bg-purple-800 text-white font-bold text-xs sm:text-sm shadow-xs flex items-center justify-center gap-2 shrink-0"
          >
            <PhoneCall className="w-4 h-4" />
            <span>{lang === 'bn' ? 'টোল-ফ্রি ১৬১২৩' : 'Toll-Free 16123'}</span>
          </a>
        </div>

        <button
          onClick={onStartPlan}
          className="w-full py-4 rounded-2xl bg-purple-700 hover:bg-purple-800 active:scale-98 text-white font-extrabold text-sm shadow-md transition flex items-center justify-center gap-2"
        >
          <span>{lang === 'bn' ? 'নারী সমবায় আবেদন শুরু করুন' : 'Apply as Woman Farmer / Co-op'}</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
