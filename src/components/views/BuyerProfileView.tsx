import React from 'react';
import { Building2, ShieldCheck, Award, FileText, CheckCircle2, Phone, MapPin } from 'lucide-react';
import { Buyer, Language } from '../../types';

interface BuyerProfileViewProps {
  buyer: Buyer;
  lang: Language;
}

export const BuyerProfileView: React.FC<BuyerProfileViewProps> = ({ buyer, lang }) => {
  return (
    <div className="space-y-4 pb-20 animate-fade-in">
      <div className="bg-white dark:bg-[#162419] p-5 rounded-2xl border border-stone-200 dark:border-stone-800 shadow-sm text-center space-y-3">
        <div className="w-16 h-16 rounded-2xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 flex items-center justify-center text-3xl mx-auto shadow-inner">
          🏢
        </div>

        <div>
          <h2 className="text-base font-bold text-stone-900 dark:text-stone-100">
            {buyer.n}
          </h2>
          <div className="inline-flex items-center gap-1 mt-1 px-2.5 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800 text-xs font-bold">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>{lang === 'bn' ? 'যাচাইকৃত প্রাতিষ্ঠানিক ক্রেতা' : 'Verified Institutional Buyer'}</span>
          </div>
        </div>

        {/* Credentials Grid */}
        <div className="grid grid-cols-2 gap-2 text-left pt-2">
          <div className="p-3 bg-stone-50 dark:bg-[#121c13] rounded-xl border border-stone-200 dark:border-stone-800">
            <span className="text-[10px] text-stone-500 uppercase font-semibold block">
              {lang === 'bn' ? 'ব্যবসায়ের ধরন' : 'Buyer Category'}
            </span>
            <span className="text-xs font-bold text-stone-800 dark:text-stone-200">
              {buyer.t}
            </span>
          </div>

          <div className="p-3 bg-stone-50 dark:bg-[#121c13] rounded-xl border border-stone-200 dark:border-stone-800">
            <span className="text-[10px] text-stone-500 uppercase font-semibold block">
              {lang === 'bn' ? 'প্রধান কার্যালয়' : 'HQ Hub'}
            </span>
            <span className="text-xs font-bold text-stone-800 dark:text-stone-200">
              {buyer.d}
            </span>
          </div>

          <div className="p-3 bg-stone-50 dark:bg-[#121c13] rounded-xl border border-stone-200 dark:border-stone-800">
            <span className="text-[10px] text-stone-500 uppercase font-semibold block">
              {lang === 'bn' ? 'ট্রেড লাইসেন্স' : 'Trade License'}
            </span>
            <span className="text-xs font-bold text-emerald-600 flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>{lang === 'bn' ? 'বৈধ ও নবায়নকৃত' : 'Validated 2026'}</span>
            </span>
          </div>

          <div className="p-3 bg-stone-50 dark:bg-[#121c13] rounded-xl border border-stone-200 dark:border-stone-800">
            <span className="text-[10px] text-stone-500 uppercase font-semibold block">
              {lang === 'bn' ? 'পেমেন্ট ট্র্যাক রেকর্ড' : 'On-Time Payout'}
            </span>
            <span className="text-xs font-bold text-emerald-600 flex items-center gap-1">
              <Award className="w-3.5 h-3.5" />
              <span>98% {lang === 'bn' ? 'সময়মতো' : 'On-time'}</span>
            </span>
          </div>
        </div>

        {/* Guarantee Info */}
        <div className="text-left text-xs text-stone-600 dark:text-stone-300 bg-emerald-50/60 dark:bg-emerald-950/30 p-3 rounded-xl border border-emerald-200 dark:border-emerald-800/60">
          <p>
            {lang === 'bn'
              ? 'ফসলসেতুর এসক্রো সিস্টেমের মাধ্যমে কৃষকের বিক্রয়লব্ধ টাকা সরাসরি কৃষকের ওয়ালেটে চলে যায়।'
              : 'All wholesale settlements are backed by our automated weighbridge verification and escrow.'}
          </p>
        </div>
      </div>
    </div>
  );
};
