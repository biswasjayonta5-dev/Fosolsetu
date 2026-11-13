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
    <div className="space-y-6 pb-20 lg:pb-8 animate-fade-in w-full max-w-6xl mx-auto">
      {/* Title */}
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 border border-emerald-300 text-xs font-bold">
          <Sparkles className="w-4 h-4 text-emerald-600" />
          <span>{lang === 'bn' ? 'স্বচ্ছ ও সাশ্রয়ী প্যাকেজ' : 'Transparent & Affordable Tiers'}</span>
        </div>
        <h2 className="font-black text-2xl sm:text-3xl text-stone-900 dark:text-stone-100">
          {lang === 'bn' ? 'ফসলসেতু মেম্বারশিপ প্যাকেজ' : 'Choose Your FosolSetu Plan'}
        </h2>
        <p className="text-xs sm:text-sm text-stone-500 dark:text-stone-400">
          {lang === 'bn'
            ? 'নির্দিষ্ট মাসিক সাবস্ক্রিপশন ফি · উন্মুক্ত বাজারে বিক্রিতে কোনো মধ্যস্বত্বভোগী কমিশন নেই'
            : 'Predictable low monthly fee with zero platform sales commission on harvest trades'}
        </p>
      </div>

      {/* Plan Cards: 3 Columns on Tablet and Desktop */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
        {SUBSCRIPTION_TIERS.map((tier) => {
          const isCurrent = currentPlan === tier.id;
          return (
            <div
              key={tier.id}
              className={`bg-white dark:bg-[#162419] rounded-2xl border-2 p-6 shadow-sm relative transition-all flex flex-col justify-between ${
                isCurrent
                  ? 'border-emerald-600 dark:border-emerald-500 ring-4 ring-emerald-500/20'
                  : tier.popular
                  ? 'border-amber-400 shadow-md'
                  : 'border-stone-200 dark:border-stone-800'
              }`}
            >
              {tier.popular && (
                <div className="absolute -top-3.5 right-6 px-3 py-1 rounded-full bg-amber-500 text-stone-900 font-black text-xs uppercase tracking-wider shadow-sm flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5 fill-stone-900" />
                  <span>{lang === 'bn' ? 'সর্বাধিক জনপ্রিয়' : 'Most Popular'}</span>
                </div>
              )}

              <div className="space-y-4">
                <div className="pb-3 border-b border-stone-100 dark:border-stone-800">
                  <h3 className="font-extrabold text-lg text-stone-900 dark:text-stone-100">
                    {lang === 'bn' ? tier.nameBn : tier.nameEn}
                  </h3>
                  <div className="text-xs text-stone-500 dark:text-stone-400 mt-1">
                    {tier.id === 'Basic'
                      ? lang === 'bn' ? 'ক্ষুদ্র ও প্রান্তিক কৃষকদের উপযোগী' : 'For smallholder farmers'
                      : tier.id === 'Pro'
                      ? lang === 'bn' ? 'বাণিজ্যিক চাষী ও সক্রিয় বিক্রেতা' : 'For commercial agricultural growers'
                      : lang === 'bn' ? 'মাইক্রো-অগ্রিম অর্থায়ন ও ভিআইপি মাঠ সেবা' : 'Advance financing & priority'}
                  </div>
                </div>

                <div className="flex items-baseline gap-1">
                  <span className="text-3xl sm:text-4xl font-black text-stone-900 dark:text-stone-100">
                    {tier.price}
                  </span>
                  <span className="text-xs text-stone-500 dark:text-stone-400">
                    {lang === 'bn' ? tier.cycleBn : tier.cycleEn}
                  </span>
                </div>

                {/* Features List */}
                <div className="space-y-2.5 pt-2">
                  {(lang === 'bn' ? tier.featuresBn : tier.featuresEn).map((f, i) => (
                    <div key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-stone-700 dark:text-stone-300">
                      <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{f}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-6 mt-6 border-t border-stone-100 dark:border-stone-800">
                <button
                  onClick={() => onSelectPlan(tier.id)}
                  className={`w-full py-3.5 rounded-xl font-extrabold text-xs sm:text-sm transition active:scale-98 ${
                    isCurrent
                      ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800 cursor-default'
                      : 'bg-emerald-700 hover:bg-emerald-800 text-white shadow-md'
                  }`}
                >
                  {isCurrent
                    ? lang === 'bn' ? '✓ বর্তমান প্যাকেজ সক্রিয়' : '✓ Current Active Plan'
                    : lang === 'bn' ? 'এই প্যাকেজটি বেছে নিন' : 'Choose ' + tier.nameEn}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      <div className="p-4 bg-stone-50 dark:bg-[#121c13] rounded-2xl border border-stone-200 dark:border-stone-800 text-center text-xs text-stone-600 dark:text-stone-400 max-w-2xl mx-auto">
        {lang === 'bn'
          ? 'বিকাশ, নগদ বা রকেটের মাধ্যমে যেকোনো সময় প্যাকেজ আপগ্রেড বা বাতিল করতে পারবেন।'
          : 'Easily pay monthly subscription via bKash, Nagad or Rocket mobile money. Cancel anytime with no penalties.'}
      </div>
    </div>
  );
};
