import React from 'react';
import { 
  CheckCircle2, 
  Volume2, 
  ShieldCheck, 
  AlertCircle, 
  Calendar, 
  ArrowRight, 
  Smartphone,
  Info
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
    <div className="space-y-4 pb-20 animate-fade-in">
      {/* Title */}
      <div className="flex items-center justify-between">
        <h2 className="font-bold text-base text-stone-900 dark:text-stone-100 flex items-center gap-2">
          <span>💰</span>
          <span>{lang === 'bn' ? 'আপনার অনুমোদিত অগ্রিম অফার' : 'Approved Advance Offer'}</span>
        </h2>
        <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 border border-emerald-300">
          {lang === 'bn' ? 'যাচাইকৃত' : 'Instant Verified'}
        </span>
      </div>

      {/* Credit & Risk Assessment Score Card */}
      <div className="bg-white dark:bg-[#162419] p-4 rounded-2xl border border-stone-200 dark:border-stone-800 shadow-sm flex items-center gap-4">
        <div className="relative w-20 h-20 rounded-full border-4 border-emerald-600 dark:border-emerald-500 flex flex-col items-center justify-center shrink-0 shadow-inner bg-emerald-50/50 dark:bg-emerald-950/30">
          <span className="text-2xl font-black text-emerald-800 dark:text-emerald-300 leading-none">
            {plan.score}
          </span>
          <span className="text-[10px] text-stone-500 font-semibold uppercase">
            / 100
          </span>
        </div>

        <div className="space-y-1">
          <div className="font-bold text-sm text-stone-900 dark:text-stone-100 flex items-center gap-1.5">
            <span>
              {isLowRisk
                ? lang === 'bn' ? 'ঝুঁকি স্কোর: চমৎকার (কম ঝুঁকি)' : 'Risk Grade: Excellent (Low)'
                : isMedRisk
                ? lang === 'bn' ? 'ঝুঁকি স্কোর: ভালো (মাঝারি ঝুঁকি)' : 'Risk Grade: Moderate'
                : lang === 'bn' ? 'ঝুঁকি স্কোর: সাধারণ' : 'Risk Grade: Standard'}
            </span>
          </div>

          <p className="text-xs text-stone-500 dark:text-stone-400">
            {cropInfo.ic} {lang === 'bn' ? cropInfo.bn : cropInfo.en} · {plan.land} {lang === 'bn' ? 'বিঘা' : 'Bigha'} · {plan.dist}
          </p>

          <div className="flex flex-wrap gap-1.5 pt-1">
            <span className="inline-flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
              <ShieldCheck className="w-3 h-3" />
              {lang === 'bn' ? 'স্যাটেলাইট ফলন রেকর্ড' : 'Satellite Vegetative Index'}
            </span>
            <span className="inline-flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-full bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
              {lang === 'bn' ? 'আবহাওয়া ঝুঁকি সহনশীল' : 'Weather Resilience'}
            </span>
          </div>
        </div>
      </div>

      {/* Financial Details Card */}
      <div className="bg-white dark:bg-[#162419] p-4 rounded-2xl border border-stone-200 dark:border-stone-800 shadow-sm space-y-3">
        <div className="text-xs font-bold text-stone-500 dark:text-stone-400 uppercase tracking-wider pb-1 border-b border-stone-200 dark:border-stone-800">
          {lang === 'bn' ? 'অর্থায়নের স্বচ্ছ হিসাব' : 'Transparent Financing Terms'}
        </div>

        <div className="space-y-2 text-xs">
          <div className="flex justify-between items-center py-1 border-b border-dashed border-stone-200 dark:border-stone-800">
            <span className="text-stone-600 dark:text-stone-300">
              {lang === 'bn' ? 'মঞ্জুরীকৃত অগ্রিম (৩০%)' : 'Approved Advance'}
            </span>
            <span className="font-bold text-stone-900 dark:text-stone-100">
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

          <div className="flex justify-between items-center py-2 bg-emerald-50 dark:bg-emerald-950/40 p-2.5 rounded-xl border border-emerald-200 dark:border-emerald-800">
            <div>
              <span className="text-xs font-bold text-emerald-900 dark:text-emerald-200 block">
                {lang === 'bn' ? 'আজ সরাসরি বিকাশ/নগদে পাবেন' : 'You Receive Today (Net)'}
              </span>
              <span className="text-[10px] text-emerald-700 dark:text-emerald-400">
                {lang === 'bn' ? 'কোনো লুকানো বা চক্রবৃদ্ধি চার্জ নেই' : 'Zero hidden deductions'}
              </span>
            </div>
            <span className="text-xl font-black text-emerald-700 dark:text-emerald-400">
              {formatBDT(plan.net, lang)}
            </span>
          </div>

          <div className="flex justify-between items-center py-1 border-b border-dashed border-stone-200 dark:border-stone-800">
            <span className="text-stone-600 dark:text-stone-300">
              {lang === 'bn' ? 'পরিশোধ করবেন (ফসল তোলার পর)' : 'Repayment at Harvest'}
            </span>
            <span className="font-bold text-stone-900 dark:text-stone-100">
              {formatBDT(plan.rep, lang)}
            </span>
          </div>

          <div className="flex justify-between items-center py-1">
            <span className="text-stone-600 dark:text-stone-300 flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-stone-400" />
              <span>{lang === 'bn' ? 'পরিশোধের শেষ সময়' : 'Repay By Date'}</span>
            </span>
            <span className="font-semibold text-stone-800 dark:text-stone-200">
              {plan.repDate}
            </span>
          </div>
        </div>

        <div className="p-3 bg-stone-50 dark:bg-[#121c13] rounded-xl text-[11px] text-stone-600 dark:text-stone-400 leading-relaxed border border-stone-200 dark:border-stone-800">
          <div className="flex items-start gap-1.5">
            <Info className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <div>
              {lang === 'bn'
                ? 'একটিমাত্র নির্দিষ্ট সার্ভিস ফি। কোনো সাপ্তাহিক কিস্তি নেই। ফসল কাটার পর আমাদের উন্মুক্ত বাজারে ফসল বিক্রি করে অগ্রিম পরিশোধ করুন।'
                : 'One fixed fee. No high-pressure weekly installments. Repay smoothly when you sell through our direct marketplace.'}
            </div>
          </div>
        </div>
      </div>

      {/* Voice Read Aloud Button */}
      <button
        onClick={() => speakText(audioText, lang)}
        className="w-full py-3 rounded-xl border border-amber-300 dark:border-amber-800 bg-amber-50 dark:bg-amber-950/30 text-amber-900 dark:text-amber-200 font-bold text-xs shadow-xs transition flex items-center justify-center gap-2 active:scale-98"
      >
        <Volume2 className="w-4 h-4 text-amber-700" />
        <span>{lang === 'bn' ? 'সম্পূর্ণ শর্ত বাংলায় পড়ে শোনান' : 'Read Offer Aloud'}</span>
      </button>

      {/* Action Buttons */}
      <div className="space-y-2">
        <button
          onClick={() => onAccept(plan)}
          className="w-full py-3.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 active:scale-98 text-white font-bold text-sm shadow-md transition flex items-center justify-center gap-2"
        >
          <Smartphone className="w-4 h-4" />
          <span>{lang === 'bn' ? 'অগ্রিম গ্রহণ করুন (বিকাশে নিন)' : 'Accept Advance (bKash Payout)'}</span>
        </button>

        <button
          onClick={onCancel}
          className="w-full py-2.5 rounded-xl border border-stone-300 dark:border-stone-700 text-stone-600 dark:text-stone-300 text-xs font-semibold hover:bg-stone-100 dark:hover:bg-stone-800 transition"
        >
          {lang === 'bn' ? 'এখন নয়, পরে বিবেচনা করব' : 'Not Now'}
        </button>
      </div>
    </div>
  );
};
