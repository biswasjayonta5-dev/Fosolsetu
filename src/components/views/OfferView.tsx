import React from 'react';
import { 
  CheckCircle2, 
  Volume2, 
  ShieldCheck, 
  AlertCircle, 
  Calendar, 
  ArrowRight, 
  Smartphone,
  Info,
  Award,
  TrendingUp
} from 'lucide-react';
import { CropPlan, Language, CropInfo } from '../../types';
import { CROPS } from '../../data/mockData';
import { formatBDT } from '../../utils/formatters';
import { speakText } from '../../utils/speech';

interface OfferViewProps {
  plan: CropPlan;
  onAccept: (plan: CropPlan) => void;
  onCancel: () => void;
  lang: Language;
}

export const OfferView: React.FC<OfferViewProps> = ({
  plan,
  onAccept,
  onCancel,
  lang,
}) => {
  const cropInfo: CropInfo = CROPS[plan.crop] || CROPS.rice;
  const isLowRisk = plan.score >= 80;
  const isMedRisk = plan.score >= 70 && plan.score < 80;

  const audioText = lang === 'bn'
    ? `আপনার জন্য অগ্রিম মঞ্জুর করা হয়েছে ${plan.adv} টাকা। সার্ভিস ফি ${plan.fee} টাকা। আপনি আজকে হাতে পাবেন ${plan.net} টাকা। পরিশোধের তারিখ ${plan.repDate}।`
    : `Approved micro advance: ${plan.adv} Taka. Fixed service fee: ${plan.fee} Taka. Net received today: ${plan.net} Taka. Due date: ${plan.repDate}.`;

  return (
    <div className="space-y-6 pb-20 lg:pb-8 animate-fade-in w-full max-w-5xl mx-auto">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <h2 className="font-extrabold text-xl sm:text-2xl text-stone-900 dark:text-stone-100 flex items-center gap-2">
            <span>💰</span>
            <span>{lang === 'bn' ? 'আপনার অনুমোদিত অগ্রিম অফার' : 'Approved Micro-Advance Offer'}</span>
          </h2>
          <p className="text-xs text-stone-500 dark:text-stone-400">
            {lang === 'bn' ? 'স্যাটেলাইট ফলন রেকর্ড ও এআই ঝুঁকি বিশ্লেষণ সম্পন্ন' : 'Automated credit appraisal & satellite yield verification complete'}
          </p>
        </div>
        <span className="self-start sm:self-auto px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 border border-emerald-300">
          ✔ {lang === 'bn' ? 'তাৎক্ষণিক অনুমোদনপ্রাপ্ত' : 'Instant Pre-Approved'}
        </span>
      </div>

      {/* 2-Column Responsive Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left Column: Credit & Risk Score Dossier (5 cols) */}
        <div className="lg:col-span-5 bg-white dark:bg-[#162419] p-6 rounded-2xl border border-stone-200 dark:border-stone-800 shadow-sm space-y-5 text-center sm:text-left">
          
          <div className="flex flex-col sm:flex-row items-center gap-5">
            <div className="relative w-24 h-24 rounded-full border-4 border-emerald-600 dark:border-emerald-500 flex flex-col items-center justify-center shrink-0 shadow-inner bg-emerald-50/50 dark:bg-emerald-950/30">
              <span className="text-3xl font-black text-emerald-800 dark:text-emerald-300 leading-none">
                {plan.score}
              </span>
              <span className="text-[10px] text-stone-500 font-bold uppercase mt-1">
                / 100
              </span>
            </div>

            <div className="space-y-1">
              <div className="font-extrabold text-base text-stone-900 dark:text-stone-100">
                {isLowRisk
                  ? lang === 'bn' ? 'ঝুঁকি গ্রেড: চমৎকার (কম ঝুঁকি)' : 'Risk Grade: Excellent (Low)'
                  : isMedRisk
                  ? lang === 'bn' ? 'ঝুঁকি গ্রেড: সন্তোষজনক (মাঝারি)' : 'Risk Grade: Moderate'
                  : lang === 'bn' ? 'ঝুঁকি গ্রেড: সাধারণ' : 'Risk Grade: Standard'}
              </div>

              <p className="text-xs text-stone-500 dark:text-stone-400">
                {cropInfo.ic} {lang === 'bn' ? cropInfo.bn : cropInfo.en} · {plan.land} {lang === 'bn' ? 'বিঘা' : 'Bigha'} · {plan.dist}
              </p>

              <div className="text-[11px] font-semibold text-emerald-600">
                {lang === 'bn' ? 'সর্বোচ্চ ৩০% অর্থায়নের উপযোগী' : 'Eligible for 30% advance tier'}
              </div>
            </div>
          </div>

          <div className="space-y-2 pt-3 border-t border-stone-100 dark:border-stone-800 text-xs text-left">
            <div className="flex items-center gap-2 p-2.5 bg-emerald-50/60 dark:bg-emerald-950/30 rounded-xl border border-emerald-200 dark:border-emerald-800/60">
              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
              <div>
                <span className="font-bold text-emerald-900 dark:text-emerald-200 block">
                  {lang === 'bn' ? 'স্যাটেলাইট এনডিভিআই সূচক' : 'Satellite NDVI Vegetative Health'}
                </span>
                <span className="text-[10px] text-stone-500">
                  {lang === 'bn' ? 'জমির আর্দ্রতা ও ফসলের বৃদ্ধি স্বাভাবিক' : 'Optimal soil moisture and chlorophyll index'}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2 p-2.5 bg-blue-50/60 dark:bg-blue-950/30 rounded-xl border border-blue-200 dark:border-blue-800/60">
              <Award className="w-4 h-4 text-blue-600 shrink-0" />
              <div>
                <span className="font-bold text-blue-900 dark:text-blue-200 block">
                  {lang === 'bn' ? 'ইতিহাস ও খ্যাতি যাচাই' : 'Community Standing'}
                </span>
                <span className="text-[10px] text-stone-500">
                  {lang === 'bn' ? 'স্থানীয় ডিলার ও সমবায়ের সাথে ইতিবাচক লেনদেন' : 'Good repayment record & verified mobile identity'}
                </span>
              </div>
            </div>

            {plan.description && (
              <div className="flex items-start gap-2 p-2.5 bg-amber-50/70 dark:bg-amber-950/30 rounded-xl border border-amber-200 dark:border-amber-800/60">
                <span className="text-sm">🎙️</span>
                <div>
                  <span className="font-bold text-amber-900 dark:text-amber-200 block">
                    {lang === 'bn' ? 'কৃষকের রেকর্ডকৃত ভয়েস নোট:' : 'Farmer Field Voice Description:'}
                  </span>
                  <span className="text-[11px] text-stone-700 dark:text-stone-300 italic block mt-0.5">
                    "{plan.description}"
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Financial Terms & Disbursement (7 cols) */}
        <div className="lg:col-span-7 bg-white dark:bg-[#162419] p-6 rounded-2xl border border-stone-200 dark:border-stone-800 shadow-sm space-y-4">
          <div className="text-xs font-bold text-stone-500 dark:text-stone-400 uppercase tracking-wider pb-2 border-b border-stone-200 dark:border-stone-800 flex items-center justify-between">
            <span>{lang === 'bn' ? 'স্বচ্ছ অর্থায়ন চুক্তি' : 'Transparent Financing Terms'}</span>
            <span className="text-emerald-600 font-bold">০% সুদ গ্যারান্টি</span>
          </div>

          <div className="space-y-2.5 text-xs sm:text-sm">
            <div className="flex justify-between items-center py-1 border-b border-dashed border-stone-200 dark:border-stone-800">
              <span className="text-stone-600 dark:text-stone-300">
                {lang === 'bn' ? 'মঞ্জুরীকৃত অগ্রিম (ফসলের ৩০%)' : 'Approved Advance (30% crop value)'}
              </span>
              <span className="font-extrabold text-stone-900 dark:text-stone-100">
                {formatBDT(plan.adv, lang)}
              </span>
            </div>

            <div className="flex justify-between items-center py-1 border-b border-dashed border-stone-200 dark:border-stone-800">
              <span className="text-stone-600 dark:text-stone-300">
                {lang === 'bn' ? `এককালীন সার্ভিস ফি (${plan.pct}%)` : `Flat Service Fee (${plan.pct}%)`}
              </span>
              <span className="font-bold text-red-600 dark:text-red-400">
                − {formatBDT(plan.fee, lang)}
              </span>
            </div>

            <div className="flex justify-between items-center p-3.5 bg-emerald-50 dark:bg-emerald-950/50 rounded-xl border border-emerald-200 dark:border-emerald-800">
              <div>
                <span className="text-xs sm:text-sm font-bold text-emerald-900 dark:text-emerald-200 block">
                  {lang === 'bn' ? 'আজ সরাসরি বিকাশ/নগদে পাবেন' : 'Net Received Today'}
                </span>
                <span className="text-[11px] text-emerald-700 dark:text-emerald-400">
                  {lang === 'bn' ? 'কোনো মাসিক কিস্তি বা লুকানো ফি নেই' : '0% hidden deductions'}
                </span>
              </div>
              <span className="text-2xl sm:text-3xl font-black text-emerald-700 dark:text-emerald-400">
                {formatBDT(plan.net, lang)}
              </span>
            </div>

            <div className="flex justify-between items-center py-1 border-b border-dashed border-stone-200 dark:border-stone-800">
              <span className="text-stone-600 dark:text-stone-300">
                {lang === 'bn' ? 'পরিশোধ করবেন (ফসল তোলার পর)' : 'Repayment at Harvest'}
              </span>
              <span className="font-extrabold text-stone-900 dark:text-stone-100">
                {formatBDT(plan.rep, lang)}
              </span>
            </div>

            <div className="flex justify-between items-center py-1">
              <span className="text-stone-600 dark:text-stone-300 flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-stone-400" />
                <span>{lang === 'bn' ? 'পরিশোধের শেষ তারিখ' : 'Repay By Date'}</span>
              </span>
              <span className="font-bold text-stone-800 dark:text-stone-200">
                {plan.repDate}
              </span>
            </div>
          </div>

          {/* Voice Read Aloud Button */}
          <button
            onClick={() => speakText(audioText, lang)}
            className="w-full py-2.5 rounded-xl border border-amber-300 dark:border-amber-800 bg-amber-50 dark:bg-amber-950/30 text-amber-900 dark:text-amber-200 font-bold text-xs shadow-xs transition flex items-center justify-center gap-2 active:scale-98"
          >
            <Volume2 className="w-4 h-4 text-amber-700" />
            <span>{lang === 'bn' ? 'সম্পূর্ণ শর্ত বাংলায় অডিও শুনুন' : 'Read Offer Terms Aloud'}</span>
          </button>

          {/* Action Buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => onAccept(plan)}
              className="py-3.5 px-4 rounded-xl bg-emerald-700 hover:bg-emerald-800 active:scale-98 text-white font-extrabold text-sm shadow-md transition flex items-center justify-center gap-2"
            >
              <Smartphone className="w-4 h-4" />
              <span>{lang === 'bn' ? 'অগ্রিম গ্রহণ করুন (বিকাশে নিন)' : 'Accept Advance (bKash Payout)'}</span>
            </button>

            <button
              onClick={onCancel}
              className="py-3.5 px-4 rounded-xl border border-stone-300 dark:border-stone-700 text-stone-700 dark:text-stone-300 text-xs font-bold hover:bg-stone-100 dark:hover:bg-stone-800 transition text-center"
            >
              {lang === 'bn' ? 'এখন নয়, পরে বিবেচনা করব' : 'Not Now, Return Home'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
