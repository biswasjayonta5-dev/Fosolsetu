import React from 'react';
import { 
  BarChart3, 
  Users, 
  Wallet, 
  TrendingUp, 
  ShieldCheck, 
  PieChart, 
  Coins, 
  CheckCircle,
  FileSpreadsheet
} from 'lucide-react';
import { Language, CropPlan } from '../../types';
import { formatBDT } from '../../utils/formatters';

interface AdminViewProps {
  plans: CropPlan[];
  lang: Language;
  onBack: () => void;
}

export const AdminView: React.FC<AdminViewProps> = ({ plans, lang, onBack }) => {
  const mix = {
    Basic: { count: 1540, fee: 75 },
    Pro: { count: 1120, fee: 250 },
    Premium: { count: 600, fee: 450 },
  };

  const totalPaidSubs = Object.values(mix).reduce((acc, curr) => acc + curr.count, 0);
  const mrr = Object.values(mix).reduce((acc, curr) => acc + curr.count * curr.fee, 0);

  // Active plans advance sum + baseline
  const activeAdvancesTotal =
    plans.filter((p) => p.status !== 'offer').reduce((acc, p) => acc + p.adv, 0) + 41800000;

  return (
    <div className="space-y-4 pb-20 animate-fade-in">
      {/* Title */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-bold text-base text-stone-900 dark:text-stone-100 flex items-center gap-2">
            <span>📊</span>
            <span>{lang === 'bn' ? 'পার্টনার ব্যাংক ও এমএফআই ড্যাশবোর্ড' : 'Partner & MFI Portfolio Dashboard'}</span>
          </h2>
          <p className="text-xs text-stone-500 dark:text-stone-400">
            {lang === 'bn' ? 'ফসলসেতু কৃষি অর্থায়ন ও পোর্টফোলিও পর্যবেক্ষণ' : 'FosolSetu Agri-Fintech Credit & Ecosystem Metrics'}
          </p>
        </div>
      </div>

      {/* 4 Big KPI Cards */}
      <div className="grid grid-cols-2 gap-2.5">
        <div className="bg-white dark:bg-[#162419] p-3.5 rounded-2xl border border-stone-200 dark:border-stone-800 shadow-sm">
          <span className="text-[10px] text-stone-500 uppercase font-semibold flex items-center gap-1">
            <Users className="w-3.5 h-3.5 text-emerald-600" />
            <span>{lang === 'bn' ? 'নিবন্ধিত কৃষক' : 'Onboarded Farmers'}</span>
          </span>
          <div className="text-xl font-black text-stone-900 dark:text-stone-100 mt-1">
            12,480
          </div>
          <span className="text-[10px] text-emerald-600 font-bold">↑ +14% এই মাসে</span>
        </div>

        <div className="bg-white dark:bg-[#162419] p-3.5 rounded-2xl border border-stone-200 dark:border-stone-800 shadow-sm">
          <span className="text-[10px] text-stone-500 uppercase font-semibold flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
            <span>{lang === 'bn' ? 'পেইড গ্রাহক' : 'Active Subscribers'}</span>
          </span>
          <div className="text-xl font-black text-stone-900 dark:text-stone-100 mt-1">
            {totalPaidSubs.toLocaleString('en-IN')}
          </div>
          <span className="text-[10px] text-blue-600 font-bold">৮৭% নবায়ন হার</span>
        </div>

        <div className="bg-white dark:bg-[#162419] p-3.5 rounded-2xl border border-stone-200 dark:border-stone-800 shadow-sm">
          <span className="text-[10px] text-stone-500 uppercase font-semibold flex items-center gap-1">
            <Wallet className="w-3.5 h-3.5 text-emerald-600" />
            <span>{lang === 'bn' ? 'বিতরণকৃত মাইক্রো-অগ্রিম' : 'Disbursed Advances'}</span>
          </span>
          <div className="text-base font-black text-emerald-700 dark:text-emerald-400 mt-1">
            {formatBDT(activeAdvancesTotal, lang)}
          </div>
          <span className="text-[10px] text-stone-500">PAR (ঝুঁকি) &lt; ১.২%</span>
        </div>

        <div className="bg-white dark:bg-[#162419] p-3.5 rounded-2xl border border-stone-200 dark:border-stone-800 shadow-sm">
          <span className="text-[10px] text-stone-500 uppercase font-semibold flex items-center gap-1">
            <TrendingUp className="w-3.5 h-3.5 text-amber-600" />
            <span>{lang === 'bn' ? 'মাসিক আয় (MRR)' : 'Monthly MRR'}</span>
          </span>
          <div className="text-base font-black text-stone-900 dark:text-stone-100 mt-1">
            {formatBDT(mrr, lang)}
          </div>
          <span className="text-[10px] text-emerald-600 font-bold">সুস্থ ক্যাশফ্লো</span>
        </div>
      </div>

      {/* Subscription Mix Breakdown */}
      <div className="bg-white dark:bg-[#162419] p-4 rounded-2xl border border-stone-200 dark:border-stone-800 shadow-sm space-y-3">
        <h3 className="font-bold text-xs text-stone-900 dark:text-stone-100 flex items-center gap-1.5">
          <PieChart className="w-4 h-4 text-emerald-600" />
          <span>{lang === 'bn' ? 'সাবস্ক্রিপশন প্যাকেজ বণ্টন' : 'Subscriber Tier Distribution'}</span>
        </h3>

        {Object.entries(mix).map(([tier, data], i) => {
          const pct = Math.round((data.count / totalPaidSubs) * 100);
          const colorClass =
            i === 0 ? 'bg-stone-500' : i === 1 ? 'bg-emerald-600' : 'bg-amber-500';

          return (
            <div key={tier} className="space-y-1">
              <div className="flex justify-between text-xs font-semibold text-stone-700 dark:text-stone-300">
                <span>{tier} ({tier === 'Basic' ? 'বেসিক' : tier === 'Pro' ? 'প্রো' : 'প্রিমিয়াম'})</span>
                <span>{data.count} ({pct}%)</span>
              </div>
              <div className="w-full h-2.5 rounded-full bg-stone-100 dark:bg-stone-800 overflow-hidden">
                <div
                  className={`h-full ${colorClass} transition-all duration-500 rounded-full`}
                  style={{ width: `${pct}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* Clean Transparent Revenue Streams */}
      <div className="bg-white dark:bg-[#162419] p-4 rounded-2xl border border-stone-200 dark:border-stone-800 shadow-sm space-y-2 text-xs">
        <div className="font-bold text-xs text-stone-900 dark:text-stone-100 pb-1 border-b border-stone-200 dark:border-stone-800">
          {lang === 'bn' ? 'আয়ের উৎস ও স্বচ্ছতা গ্যারান্টি' : 'Revenue Model & Ethics Guarantee'}
        </div>

        <div className="flex justify-between py-1 border-b border-dashed border-stone-200 dark:border-stone-800">
          <span className="text-stone-600 dark:text-stone-300">
            {lang === 'bn' ? 'এগ্রোনমিক ডেটা ইনসাইটস রেভিনিউ' : 'Anonymized Agronomic Data Insights'}
          </span>
          <span className="font-bold text-stone-900 dark:text-stone-100">
            {formatBDT(85000, lang)} / {lang === 'bn' ? 'মাস' : 'mo'}
          </span>
        </div>

        <div className="flex justify-between py-1">
          <span className="text-stone-600 dark:text-stone-300">
            {lang === 'bn' ? 'কৃষকের ট্রেড কমিশন' : 'Farmer Trade Commission'}
          </span>
          <span className="font-bold text-emerald-600">
            ৳0 ({lang === 'bn' ? '১০০% কমিশন-মুক্ত' : 'Always Free'})
          </span>
        </div>
      </div>

      <button
        onClick={onBack}
        className="w-full py-3 rounded-xl border border-stone-300 dark:border-stone-700 text-stone-700 dark:text-stone-300 font-bold text-xs hover:bg-stone-100 dark:hover:bg-stone-800 transition"
      >
        {lang === 'bn' ? 'ফিরে যান' : 'Back to Login Screen'}
      </button>
    </div>
  );
};
