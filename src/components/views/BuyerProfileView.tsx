import React from 'react';
import { Building2, ShieldCheck, Award, FileText, CheckCircle2, Phone, MapPin, TrendingUp } from 'lucide-react';
import { Buyer, Language } from '../../types';

interface BuyerProfileViewProps {
  buyer: Buyer;
  lang: Language;
}

export const BuyerProfileView: React.FC<BuyerProfileViewProps> = ({ buyer, lang }) => {
  return (
    <div className="space-y-6 pb-20 lg:pb-8 animate-fade-in w-full max-w-4xl mx-auto">
      <div className="bg-white dark:bg-[#162419] p-6 sm:p-8 rounded-2xl border border-stone-200 dark:border-stone-800 shadow-sm text-center sm:text-left space-y-6">
        
        <div className="flex flex-col sm:flex-row items-center gap-5 pb-6 border-b border-stone-100 dark:border-stone-800">
          <div className="w-20 h-20 rounded-2xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 flex items-center justify-center text-4xl shrink-0 shadow-inner">
            🏢
          </div>

          <div className="space-y-1">
            <h2 className="text-xl sm:text-2xl font-black text-stone-900 dark:text-stone-100">
              {buyer.n}
            </h2>
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 pt-1">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800 text-xs font-bold">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>{lang === 'bn' ? 'যাচাইকৃত প্রাতিষ্ঠানিক ক্রেতা' : 'Verified Institutional Buyer'}</span>
              </span>
              <span className="text-xs text-stone-500 font-semibold">
                {buyer.t} · {buyer.d}
              </span>
            </div>
          </div>
        </div>

        {/* Credentials Grid: 4 Columns on Tablets and Desktop */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-left">
          <div className="p-4 bg-stone-50 dark:bg-[#121c13] rounded-xl border border-stone-200 dark:border-stone-800">
            <span className="text-[10px] text-stone-500 uppercase font-bold block mb-1">
              {lang === 'bn' ? 'ব্যবসায়ের ধরন' : 'Category'}
            </span>
            <span className="text-sm font-extrabold text-stone-800 dark:text-stone-200">
              {buyer.t}
            </span>
          </div>

          <div className="p-4 bg-stone-50 dark:bg-[#121c13] rounded-xl border border-stone-200 dark:border-stone-800">
            <span className="text-[10px] text-stone-500 uppercase font-bold block mb-1">
              {lang === 'bn' ? 'প্রধান হাব / গোডাউন' : 'Wholesale Hub'}
            </span>
            <span className="text-sm font-extrabold text-stone-800 dark:text-stone-200">
              {buyer.d}
            </span>
          </div>

          <div className="p-4 bg-stone-50 dark:bg-[#121c13] rounded-xl border border-stone-200 dark:border-stone-800">
            <span className="text-[10px] text-stone-500 uppercase font-bold block mb-1">
              {lang === 'bn' ? 'ট্রেড লাইসেন্স' : 'Trade License'}
            </span>
            <span className="text-sm font-extrabold text-emerald-600 flex items-center gap-1">
              <CheckCircle2 className="w-4 h-4" />
              <span>বৈধ ২০২৬</span>
            </span>
          </div>

          <div className="p-4 bg-stone-50 dark:bg-[#121c13] rounded-xl border border-stone-200 dark:border-stone-800">
            <span className="text-[10px] text-stone-500 uppercase font-bold block mb-1">
              {lang === 'bn' ? 'পেমেন্ট রেকর্ড' : 'On-Time Payout'}
            </span>
            <span className="text-sm font-extrabold text-emerald-600 flex items-center gap-1">
              <Award className="w-4 h-4" />
              <span>98% সময়মতো</span>
            </span>
          </div>
        </div>

        {/* Guarantee Info */}
        <div className="text-left text-xs sm:text-sm text-stone-700 dark:text-stone-300 bg-emerald-50/70 dark:bg-emerald-950/40 p-4 rounded-xl border border-emerald-200 dark:border-emerald-800/60 leading-relaxed">
          <p>
            {lang === 'bn'
              ? 'ফসলসেতুর এসক্রো সিস্টেম ও ডিজিটাল ওয়েব্রিজের মাধ্যমে ওজন ও মান যাচাইয়ের সাথে সাথে বিক্রয়লব্ধ অর্থ স্বয়ংক্রিয়ভাবে কৃষকের মোবাইল ওয়ালেটে পৌঁছে যায়।'
              : 'All transactions with this buyer are secured via FosolSetu digital weighbridge certification and instant automated escrow release.'}
          </p>
        </div>
      </div>
    </div>
  );
};
