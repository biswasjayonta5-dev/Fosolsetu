import React from 'react';
import { Check, Star, Zap, Shield, Sparkles } from 'lucide-react';
import { Language } from '../../types';
import { SUBSCRIPTION_TIERS } from '../../data/mockData';

interface PlansViewProps {
  currentPlan: string;
  onSelectPlan: (planId: string) => void;
  lang: Language;
}

export const PlansView: React.FC<PlansViewProps> = ({
  currentPlan,
  onSelectPlan,
  lang,
}) => {
  return (
    <div className="space-y-4 pb-20 animate-fade-in">
      {/* Title */}
      <div>
        <h2 className="font-bold text-base text-stone-900 dark:text-stone-100 flex items-center gap-2">
          <span>⭐</span>
          <span>{lang === 'bn' ? 'ফসলসেতু প্যাকেজ ও সুবিধা' : 'Membership Plans & Packages'}</span>
        </h2>
        <p className="text-xs text-stone-500 dark:text-stone-400">
          {lang === 'bn'
            ? 'নির্দিষ্ট মাসিক ফি · বিক্রিতে কোনো লুকানো কমিশন নেই'
            : 'Predictable monthly fee · Zero commission on market sales'}
        </p>
      </div>

      {/* Plan Cards */}
      <div className="space-y-3">
        {SUBSCRIPTION_TIERS.map((tier) => {
          const isCurrent = currentPlan === tier.id;
          return (
            <div
              key={tier.id}
              className={`bg-white dark:bg-[#162419] rounded-2xl border-2 p-4 shadow-sm relative transition-all ${
                isCurrent
                  ? 'border-emerald-600 dark:border-emerald-500 ring-2 ring-emerald-500/20'
                  : 'border-stone-200 dark:border-stone-800'
              }`}
            >
              {tier.popular && (
                <div className="absolute -top-2.5 right-4 px-2.5 py-0.5 rounded-full bg-amber-500 text-stone-900 font-extrabold text-[10px] uppercase tracking-wider shadow-sm flex items-center gap-1">
                  <Sparkles className="w-3 h-3 fill-stone-900" />
                  <span>{lang === 'bn' ? 'জনপ্রিয়' : 'Most Popular'}</span>
                </div>
              )}

              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-bold text-sm text-stone-900 dark:text-stone-100">
                    {lang === 'bn' ? tier.nameBn : tier.nameEn}
                  </h3>
                  <div className="text-xs text-stone-500 dark:text-stone-400">
                    {tier.id === 'Basic'
                      ? lang === 'bn' ? 'ক্ষুদ্র কৃষকদের জন্য উপযোগী' : 'For smallholder farmers'
                      : tier.id === 'Pro'
                      ? lang === 'bn' ? 'নিয়মিত বিক্রেতা ও আধুনিক চাষী' : 'For active commercial growers'
                      : lang === 'bn' ? 'অগ্রিম অর্থায়ন ও ভিআইপি সেবা' : 'Advance financing & priority'}
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-xl font-black text-stone-900 dark:text-stone-100">
                    {tier.price}
                  </span>
                  <span className="text-xs text-stone-500 dark:text-stone-400">
                    {lang === 'bn' ? tier.cycleBn : tier.cycleEn}
                  </span>
                </div>
              </div>

              {/* Features List */}
              <div className="my-3 space-y-1.5 pt-2 border-t border-stone-100 dark:border-stone-800">
                {(lang === 'bn' ? tier.featuresBn : tier.featuresEn).map((f, i) => (
                  <div key={i} className="flex items-start gap-2 text-xs text-stone-700 dark:text-stone-300">
                    <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{f}</span>
                  </div>
                ))}
              </div>

              {/* Action Button */}
              <button
                onClick={() => onSelectPlan(tier.id)}
                className={`w-full py-2.5 rounded-xl font-bold text-xs transition active:scale-98 ${
                  isCurrent
                    ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800 cursor-default'
                    : 'bg-emerald-700 hover:bg-emerald-800 text-white shadow-xs'
                }`}
              >
                {isCurrent
                  ? lang === 'bn' ? '✓ বর্তমান প্যাকেজ সক্রিয়' : '✓ Current Active Plan'
                  : lang === 'bn' ? 'এই প্যাকেজটি বেছে নিন' : 'Select Plan'}
              </button>
            </div>
          );
        })}
      </div>

      <div className="p-3.5 bg-stone-50 dark:bg-[#121c13] rounded-xl border border-stone-200 dark:border-stone-800 text-center text-xs text-stone-600 dark:text-stone-400">
        {lang === 'bn'
          ? 'বিকাশ, নগদ বা রকেটের মাধ্যমে যেকোনো সময় প্যাকেজ নবায়ন বা বাতিল করতে পারবেন।'
          : 'Easily pay monthly subscription via bKash, Nagad or Rocket. Cancel anytime.'}
      </div>
    </div>
  );
};
