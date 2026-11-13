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
  FileSpreadsheet,
  ArrowRight
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
    <div className="space-y-6 pb-20 lg:pb-8 animate-fade-in w-full">
      {/* Title */}
      <div className="bg-white dark:bg-[#162419] p-5 rounded-2xl border border-stone-200 dark:border-stone-800 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="font-extrabold text-xl sm:text-2xl text-stone-900 dark:text-stone-100 flex items-center gap-2">
            <span>📊</span>
            <span>{lang === 'bn' ? 'এমএফআই পার্টনার ও অ্যাগ্রি-ফিনটেক অ্যানালিটিক্স' : 'MFI & Bank Partner Credit Portfolio Analytics'}</span>
          </h2>
          <p className="text-xs sm:text-sm text-stone-500 dark:text-stone-400 mt-0.5">
            {lang === 'bn' ? 'ফসলসেতু রিয়েল-টাইম লোন পোর্টফোলিও, ঝুঁকি সূচক ও কৃষক সাবস্ক্রিপশন মেট্রিক্স' : 'Live agritech credit deployment, portfolio-at-risk (PAR), and rural recurring revenue'}
          </p>
        </div>

        <button
          onClick={onBack}
          className="self-start md:self-auto px-4 py-2.5 rounded-xl border border-stone-300 dark:border-stone-700 hover:bg-stone-100 dark:hover:bg-stone-800 text-xs font-bold transition"
        >
          {lang === 'bn' ? '← মূল পাতায় ফিরুন' : '← Back to Login'}
        </button>
      </div>

      {/* 4 Big KPI Cards across top */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-[#162419] p-5 rounded-2xl border border-stone-200 dark:border-stone-800 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-[11px] text-stone-500 uppercase font-bold tracking-wider">
              {lang === 'bn' ? 'নিবন্ধিত কৃষক' : 'Onboarded Farmers'}
            </span>
            <Users className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-stone-900 dark:text-stone-100 mt-2">
            12,480
          </div>
          <span className="text-xs text-emerald-600 font-bold mt-1 inline-block">
            ↑ +14% {lang === 'bn' ? 'গত ৩০ দিনে' : 'past 30 days'}
          </span>
        </div>

        <div className="bg-white dark:bg-[#162419] p-5 rounded-2xl border border-stone-200 dark:border-stone-800 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-[11px] text-stone-500 uppercase font-bold tracking-wider">
              {lang === 'bn' ? 'সক্রিয় পেইড গ্রাহক' : 'Active Paid Subscribers'}
            </span>
            <ShieldCheck className="w-4 h-4 text-blue-600" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-stone-900 dark:text-stone-100 mt-2">
            {totalPaidSubs.toLocaleString('en-IN')}
          </div>
          <span className="text-xs text-blue-600 font-bold mt-1 inline-block">
            ৮৭% {lang === 'bn' ? 'পুনর্বার নবায়ন হার' : 'renewal rate'}
          </span>
        </div>

        <div className="bg-white dark:bg-[#162419] p-5 rounded-2xl border border-stone-200 dark:border-stone-800 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-[11px] text-stone-500 uppercase font-bold tracking-wider">
              {lang === 'bn' ? 'বিতরণকৃত মাইক্রো-অগ্রিম' : 'Disbursed Advances'}
            </span>
            <Wallet className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-emerald-700 dark:text-emerald-400 mt-2">
            {formatBDT(activeAdvancesTotal, lang)}
          </div>
          <span className="text-xs text-stone-500 font-semibold mt-1 inline-block">
            PAR (ঝুঁকি) &lt; ১.২%
          </span>
        </div>

        <div className="bg-white dark:bg-[#162419] p-5 rounded-2xl border border-stone-200 dark:border-stone-800 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-[11px] text-stone-500 uppercase font-bold tracking-wider">
              {lang === 'bn' ? 'মাসিক আয় (MRR)' : 'Monthly MRR'}
            </span>
            <TrendingUp className="w-4 h-4 text-amber-600" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-stone-900 dark:text-stone-100 mt-2">
            {formatBDT(mrr, lang)}
          </div>
          <span className="text-xs text-emerald-600 font-bold mt-1 inline-block">
            {lang === 'bn' ? 'টেকসই ক্যাশফ্লো' : 'Sustainable revenue'}
          </span>
        </div>
      </div>

      {/* 2-Column Wide Analytics Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Subscription Mix Breakdown */}
        <div className="bg-white dark:bg-[#162419] p-6 rounded-2xl border border-stone-200 dark:border-stone-800 shadow-sm space-y-4">
          <h3 className="font-extrabold text-sm sm:text-base text-stone-900 dark:text-stone-100 flex items-center gap-2">
            <PieChart className="w-5 h-5 text-emerald-600" />
            <span>{lang === 'bn' ? 'সাবস্ক্রিপশন প্যাকেজ বণ্টন ও মিশ্রণ' : 'Subscriber Tier Distribution'}</span>
          </h3>

          <div className="space-y-4 pt-2">
            {Object.entries(mix).map(([tier, data], i) => {
              const pct = Math.round((data.count / totalPaidSubs) * 100);
              const colorClass =
                i === 0 ? 'bg-stone-500' : i === 1 ? 'bg-emerald-600' : 'bg-amber-500';

              return (
                <div key={tier} className="space-y-1.5">
                  <div className="flex justify-between text-xs sm:text-sm font-bold text-stone-700 dark:text-stone-300">
                    <span>{tier} ({tier === 'Basic' ? 'বেসিক' : tier === 'Pro' ? 'প্রো' : 'প্রিমিয়াম'})</span>
                    <span>{data.count.toLocaleString('en-IN')} কৃষক ({pct}%)</span>
                  </div>
                  <div className="w-full h-3 rounded-full bg-stone-100 dark:bg-stone-800 overflow-hidden">
                    <div
                      className={`h-full ${colorClass} transition-all duration-500 rounded-full`}
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Clean Transparent Revenue Streams */}
        <div className="bg-white dark:bg-[#162419] p-6 rounded-2xl border border-stone-200 dark:border-stone-800 shadow-sm space-y-4">
          <h3 className="font-extrabold text-sm sm:text-base text-stone-900 dark:text-stone-100 flex items-center gap-2">
            <Coins className="w-5 h-5 text-amber-600" />
            <span>{lang === 'bn' ? 'আয়ের মডেল ও নৈতিক শূন্য-কমিশন গ্যারান্টি' : 'Agritech Revenue Model & Ethics'}</span>
          </h3>

          <div className="space-y-3 pt-2 text-xs sm:text-sm">
            <div className="flex justify-between items-center py-2 border-b border-dashed border-stone-200 dark:border-stone-800">
              <span className="text-stone-600 dark:text-stone-300">
                {lang === 'bn' ? 'এগ্রোনমিক ক্লাউড ডেটা অ্যানালিটিক্স' : 'Agronomic Soil & Yield Analytics'}
              </span>
              <span className="font-extrabold text-stone-900 dark:text-stone-100">
                {formatBDT(85000, lang)} / {lang === 'bn' ? 'মাস' : 'mo'}
              </span>
            </div>

            <div className="flex justify-between items-center py-2 border-b border-dashed border-stone-200 dark:border-stone-800">
              <span className="text-stone-600 dark:text-stone-300">
                {lang === 'bn' ? 'কৃষকের ফসল বিক্রিতে কমিশন' : 'Farmer Sales Commission'}
              </span>
              <span className="font-black text-emerald-600">
                ৳0 ({lang === 'bn' ? '১০০% কমিশন-মুক্ত' : 'Always 100% Free'})
              </span>
            </div>

            <div className="flex justify-between items-center py-2">
              <span className="text-stone-600 dark:text-stone-300">
                {lang === 'bn' ? 'মাইক্রো-অগ্রিম সার্ভিস ফি' : 'Average Advance Service Fee'}
              </span>
              <span className="font-extrabold text-stone-900 dark:text-stone-100">
                ৫%–৮% ({lang === 'bn' ? '০% চক্রবৃদ্ধি সুদ' : 'Flat, zero compounding'})
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
