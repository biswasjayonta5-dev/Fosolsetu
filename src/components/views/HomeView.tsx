import React from 'react';
import { 
  Sparkles, 
  Volume2, 
  TrendingUp, 
  TrendingDown, 
  ArrowRight, 
  AlertTriangle, 
  CheckCircle, 
  Plus, 
  Store, 
  ShoppingBag, 
  Users, 
  Award, 
  Stethoscope,
  Calendar,
  Wallet
} from 'lucide-react';
import { CropPlan, Language, CropInfo, WeatherAlert } from '../../types';
import { CROPS, WEATHER_ALERTS } from '../../data/mockData';
import { formatBDT } from '../../utils/formatters';
import { speakText } from '../../utils/speech';

interface HomeViewProps {
  plans: CropPlan[];
  onNavigate: (view: any) => void;
  onSelectPlan: (plan: CropPlan) => void;
  lang: Language;
  onOpenDoctor: () => void;
}

export const HomeView: React.FC<HomeViewProps> = ({
  plans,
  onNavigate,
  onSelectPlan,
  lang,
  onOpenDoctor,
}) => {
  const activePlan = plans[0];
  const weather = WEATHER_ALERTS[0];
  
  // Calculate Bridge progress state
  // 0: None, 1: Plan created, 2: Advance active, 3: Repaid / Sold
  let step = 0;
  if (activePlan) {
    if (activePlan.status === 'offer') step = 1;
    else if (activePlan.status === 'active') step = 2;
    else if (activePlan.status === 'repaid') step = 3;
  }

  // Active crop for AI price guide
  const cropKey = activePlan ? activePlan.crop : 'rice';
  const cropInfo: CropInfo = CROPS[cropKey] || CROPS.rice;

  const currentPrice = cropInfo.h[cropInfo.h.length - 1];
  const forecastPrice = cropInfo.f[2];
  const priceChangePct = Math.round(((forecastPrice - currentPrice) / currentPrice) * 100);
  const shouldWait = forecastPrice > currentPrice * 1.03;

  const guideTextBn = shouldWait
    ? `অপেক্ষা করুন। আগামী ৩ সপ্তাহে ${cropInfo.bn} এর দাম ${priceChangePct}% বাড়তে পারে।`
    : `এখনই বিক্রি করুন। আগামী ৩ সপ্তাহে দাম কমে যেতে পারে।`;

  const guideTextEn = shouldWait
    ? `Hold crop. Forecast indicates ${cropInfo.en} prices may rise by ${priceChangePct}% over 3 weeks.`
    : `Good time to sell now. Forecast indicates price softness ahead.`;

  const guideAudio = lang === 'bn' ? guideTextBn : guideTextEn;

  // Generate SVG points for sparkline
  const fullTrend = [...cropInfo.h, ...cropInfo.f];
  const minVal = Math.min(...fullTrend);
  const maxVal = Math.max(...fullTrend);
  const range = maxVal - minVal || 1;

  const getX = (index: number) => 15 + index * (270 / (fullTrend.length - 1));
  const getY = (val: number) => 65 - ((val - minVal) / range) * 50;

  const histPoints = cropInfo.h.map((v, i) => `${getX(i)},${getY(v)}`).join(' ');
  const forePoints = [cropInfo.h.length - 1, 6, 7, 8]
    .map((i) => `${getX(i)},${getY(fullTrend[i])}`)
    .join(' ');

  return (
    <div className="space-y-4 pb-20 animate-fade-in">
      {/* 4-Stage Bridge Tracker */}
      <div className="bg-white dark:bg-[#162419] p-4 rounded-2xl border border-stone-200 dark:border-stone-800 shadow-sm">
        <div className="flex items-center justify-between text-xs font-bold text-stone-500 dark:text-stone-400 mb-3">
          <span>{lang === 'bn' ? 'ফসলের জীবনচক্র ও অর্থায়ন' : 'Farm Journey & Financing Bridge'}</span>
          <span className="text-emerald-600 dark:text-emerald-400">
            {step === 0
              ? lang === 'bn' ? 'শুরু করুন' : 'Get Started'
              : step === 1
              ? lang === 'bn' ? 'অফার অপেক্ষায়' : 'Offer Ready'
              : step === 2
              ? lang === 'bn' ? 'অর্থায়ন সক্রিয়' : 'Advance Active'
              : lang === 'bn' ? 'পরিশোধিত' : 'Cycle Complete'}
          </span>
        </div>

        <div className="flex items-center justify-between relative px-2">
          {/* Bridge connector line */}
          <div className="absolute left-6 right-6 top-1/2 -translate-y-1/2 h-1 bg-stone-200 dark:bg-stone-800 -z-0" />
          <div 
            className="absolute left-6 top-1/2 -translate-y-1/2 h-1 bg-emerald-600 transition-all duration-500 -z-0"
            style={{ width: `${Math.min(100, (step / 3) * 85)}%` }}
          />

          {[
            { id: 0, ic: '🌱', bn: 'পরিকল্পনা', en: 'Plan' },
            { id: 1, ic: '💰', bn: 'অগ্রিম', en: 'Advance' },
            { id: 2, ic: '🌤️', bn: 'চাষ', en: 'Grow' },
            { id: 3, ic: '🤝', bn: 'বিক্রি', en: 'Sell' },
          ].map((item, idx) => {
            const isCompleted = step > idx;
            const isCurrent = step === idx;
            return (
              <div key={item.id} className="flex flex-col items-center z-10">
                <div
                  className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold border-2 transition-transform ${
                    isCurrent
                      ? 'border-emerald-600 bg-emerald-600 text-white shadow-md scale-110 ring-4 ring-emerald-100 dark:ring-emerald-950/60'
                      : isCompleted
                      ? 'border-emerald-700 bg-emerald-700 text-white'
                      : 'border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-400'
                  }`}
                >
                  {item.ic}
                </div>
                <span className={`text-[11px] font-bold mt-1.5 ${
                  isCurrent || isCompleted ? 'text-emerald-800 dark:text-emerald-300' : 'text-stone-400'
                }`}>
                  {lang === 'bn' ? item.bn : item.en}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Urgent Local Weather Alert */}
      {weather && (
        <div 
          onClick={() => onNavigate('weather')}
          className="cursor-pointer bg-gradient-to-r from-red-50 to-amber-50 dark:from-[#2e1515] dark:to-[#2b1f14] border-2 border-red-500/40 rounded-2xl p-4 shadow-sm transition hover:shadow-md"
        >
          <div className="flex items-start gap-3">
            <span className="text-3xl p-1 bg-white/70 dark:bg-black/30 rounded-xl shadow-xs">
              {weather.ic}
            </span>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <span className="font-bold text-sm text-red-900 dark:text-red-200 flex items-center gap-1.5">
                  <AlertTriangle className="w-3.5 h-3.5 text-red-600 dark:text-red-400" />
                  {lang === 'bn' ? weather.bn : weather.en}
                </span>
                <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded-full bg-red-600 text-white">
                  {lang === 'bn' ? 'জরুরি' : 'Alert'}
                </span>
              </div>
              <p className="text-xs text-stone-700 dark:text-stone-300 mt-1 leading-snug">
                {lang === 'bn' ? weather.dbn : weather.den}
              </p>
              <div className="text-[11px] text-red-700 dark:text-red-300 font-semibold mt-2 flex items-center gap-1">
                <span>{lang === 'bn' ? 'সম্পূর্ণ আবহাওয়ার তালিকা দেখুন' : 'View localized weather radar'}</span>
                <ArrowRight className="w-3 h-3" />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Active Crop Plan or Add Plan CTA */}
      {activePlan ? (
        <div className="bg-white dark:bg-[#162419] rounded-2xl border-2 border-emerald-600/30 dark:border-emerald-500/30 p-4 shadow-sm relative overflow-hidden">
          <div className="flex items-center justify-between pb-3 border-b border-stone-200 dark:border-stone-800">
            <div className="flex items-center gap-2">
              <span className="text-2xl">{CROPS[activePlan.crop]?.ic || '🌱'}</span>
              <div>
                <h3 className="font-bold text-sm text-stone-900 dark:text-stone-100">
                  {lang === 'bn' ? CROPS[activePlan.crop]?.bn : CROPS[activePlan.crop]?.en}
                </h3>
                <div className="text-[11px] text-stone-500 dark:text-stone-400">
                  {activePlan.land} {lang === 'bn' ? 'বিঘা' : 'Bigha'} · {activePlan.dist}
                </div>
              </div>
            </div>

            <div>
              {activePlan.status === 'offer' ? (
                <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300 border border-amber-300">
                  {lang === 'bn' ? 'অফার প্রস্তুত' : 'Offer Ready'}
                </span>
              ) : activePlan.status === 'active' ? (
                <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 border border-emerald-300">
                  {lang === 'bn' ? 'অগ্রিম চালু' : 'Active'}
                </span>
              ) : (
                <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-stone-100 text-stone-800 dark:bg-stone-800 dark:text-stone-300">
                  {lang === 'bn' ? 'পরিশোধিত' : 'Repaid'}
                </span>
              )}
            </div>
          </div>

          <div className="py-3 grid grid-cols-2 gap-3 text-xs">
            <div>
              <span className="text-stone-500 dark:text-stone-400 block">
                {lang === 'bn' ? 'মাইক্রো-অগ্রিম ফান্ড' : 'Disbursed Advance'}
              </span>
              <span className="text-base font-extrabold text-emerald-700 dark:text-emerald-400">
                {formatBDT(activePlan.adv, lang)}
              </span>
            </div>
            <div>
              <span className="text-stone-500 dark:text-stone-400 block">
                {lang === 'bn' ? 'ফসল তোলার তারিখ' : 'Harvest Date'}
              </span>
              <span className="text-sm font-semibold text-stone-800 dark:text-stone-200">
                {activePlan.date}
              </span>
            </div>
          </div>

          {activePlan.status === 'offer' && (
            <button
              onClick={() => {
                onSelectPlan(activePlan);
                onNavigate('offer');
              }}
              className="w-full py-2.5 mt-1 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs shadow transition flex items-center justify-center gap-1.5"
            >
              <span>{lang === 'bn' ? 'অফার দেখুন ও টাকা নিন' : 'Review & Claim Advance'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )}

          {activePlan.status === 'active' && (
            <div className="mt-1 pt-2 border-t border-dashed border-stone-200 dark:border-stone-800 flex items-center justify-between text-[11px] text-stone-600 dark:text-stone-300">
              <span className="flex items-center gap-1">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                <span>{lang === 'bn' ? 'বিকাশে সরাসরি জমা হয়েছে' : 'Credited to bKash'}</span>
              </span>
              <button
                onClick={() => onNavigate('market')}
                className="font-bold text-emerald-700 dark:text-emerald-400 hover:underline"
              >
                {lang === 'bn' ? 'ফসল বিক্রির প্রস্তুতি' : 'Prepare Marketplace Sale →'}
              </button>
            </div>
          )}
        </div>
      ) : (
        <div className="bg-white dark:bg-[#162419] rounded-2xl border-2 border-dashed border-emerald-600/40 p-5 text-center shadow-xs">
          <div className="w-12 h-12 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 flex items-center justify-center text-2xl mx-auto mb-2">
            🌱
          </div>
          <h3 className="font-bold text-sm text-stone-900 dark:text-stone-100">
            {lang === 'bn' ? 'নতুন ফসলের পরিকল্পনা শুরু করুন' : 'Start Your First Crop Plan'}
          </h3>
          <p className="text-xs text-stone-500 dark:text-stone-400 mt-1 mb-3">
            {lang === 'bn'
              ? 'বিনা সুদে ৩০% পর্যন্ত অগ্রিম টাকা ও নিশ্চিত সরাসরি ক্রেতা সংযোগ পান।'
              : 'Unlock 30% pre-harvest advance at transparent 0% interest and direct buyer access.'}
          </p>
          <button
            onClick={() => onNavigate('plan')}
            className="w-full py-3 rounded-xl bg-emerald-700 hover:bg-emerald-800 active:scale-98 text-white font-bold text-sm shadow-md transition flex items-center justify-center gap-2"
          >
            <Plus className="w-4 h-4" />
            <span>{lang === 'bn' ? 'ফসলের পরিকল্পনা দিন' : 'Create Crop Plan'}</span>
          </button>
        </div>
      )}

      {/* AI Price Guidance with Interactive Sparkline */}
      <div className="bg-white dark:bg-[#162419] rounded-2xl border border-stone-200 dark:border-stone-800 p-4 shadow-sm">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-amber-100 dark:bg-amber-950/50 flex items-center justify-center text-amber-700 dark:text-amber-400">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-xs text-stone-900 dark:text-stone-100 flex items-center gap-1">
                <span>{lang === 'bn' ? 'এআই বাজার পূর্বাভাস' : 'AI Price Forecaster'}</span>
                <span className="text-[10px] text-stone-500 font-normal">
                  ({lang === 'bn' ? cropInfo.bn : cropInfo.en})
                </span>
              </h3>
            </div>
          </div>
          <button
            onClick={() => speakText(guideAudio, lang)}
            className="px-2 py-1 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800 text-[11px] font-bold flex items-center gap-1 active:scale-95"
            title="Listen aloud in Bengali / English"
          >
            <Volume2 className="w-3.5 h-3.5" />
            <span>{lang === 'bn' ? 'শুনুন' : 'Listen'}</span>
          </button>
        </div>

        {/* Current price readout */}
        <div className="flex items-baseline justify-between mt-2">
          <span className="text-xs text-stone-500 dark:text-stone-400">
            {lang === 'bn' ? 'আজকের পাইকারি দর (৪০ কেজি / ১ মণ)' : 'Today\'s Market Ask (40 kg / 1 maund)'}
          </span>
          <span className="text-xl font-extrabold text-stone-900 dark:text-stone-100">
            {formatBDT(currentPrice, lang)}
          </span>
        </div>

        {/* SVG Sparkline */}
        <div className="my-2 bg-stone-50 dark:bg-[#121c13] rounded-xl p-2 border border-stone-100 dark:border-stone-800">
          <svg viewBox="0 0 300 75" className="w-full h-20 overflow-visible" role="img">
            {/* Historical trend */}
            <polyline
              points={histPoints}
              fill="none"
              stroke="#15803d"
              strokeWidth="3.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {/* Forecast dashed trend */}
            <polyline
              points={forePoints}
              fill="none"
              stroke="#d97706"
              strokeWidth="3.5"
              strokeDasharray="6 5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>

          <div className="flex justify-between text-[10px] font-semibold text-stone-500 dark:text-stone-400 px-2 mt-1">
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-emerald-600 inline-block" />
              <span>{lang === 'bn' ? 'গত ৬ সপ্তাহ' : 'Past 6 Weeks'}</span>
            </span>
            <span className="flex items-center gap-1 text-amber-700 dark:text-amber-400">
              <span className="w-2 h-2 rounded-full bg-amber-500 inline-block" />
              <span>
                {lang === 'bn' ? '৩ সপ্তাহের পূর্বাভাস:' : '3-Wk Forecast:'} {formatBDT(forecastPrice, lang)}
              </span>
            </span>
          </div>
        </div>

        {/* Actionable recommendation badge */}
        <div
          className={`p-3 rounded-xl border flex items-center justify-between text-xs font-bold ${
            shouldWait
              ? 'bg-amber-50 dark:bg-amber-950/40 border-amber-300 dark:border-amber-800 text-amber-900 dark:text-amber-200'
              : 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-300 dark:border-emerald-800 text-emerald-900 dark:text-emerald-200'
          }`}
        >
          <div className="flex items-center gap-2">
            {shouldWait ? <TrendingUp className="w-4 h-4 text-amber-600" /> : <TrendingDown className="w-4 h-4 text-emerald-600" />}
            <span>{guideAudio}</span>
          </div>
        </div>
      </div>

      {/* Quick Action Tiles */}
      <div className="grid grid-cols-2 gap-2.5">
        <button
          onClick={() => onNavigate('market')}
          className="p-3.5 bg-white dark:bg-[#162419] rounded-2xl border border-stone-200 dark:border-stone-800 text-left hover:border-emerald-500 transition shadow-xs flex flex-col justify-between active:scale-98"
        >
          <div className="w-9 h-9 rounded-xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 flex items-center justify-center text-xl mb-2">
            🧺
          </div>
          <div>
            <div className="font-bold text-xs text-stone-800 dark:text-stone-100">
              {lang === 'bn' ? 'ফসল বিক্রি করুন' : 'Sell Crop'}
            </div>
            <div className="text-[10px] text-stone-500 dark:text-stone-400">
              {lang === 'bn' ? '০% কমিশন সরাসরি বাজার' : '0% commission market'}
            </div>
          </div>
        </button>

        <button
          onClick={() => onNavigate('dealers')}
          className="p-3.5 bg-white dark:bg-[#162419] rounded-2xl border border-stone-200 dark:border-stone-800 text-left hover:border-emerald-500 transition shadow-xs flex flex-col justify-between active:scale-98"
        >
          <div className="w-9 h-9 rounded-xl bg-blue-100 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 flex items-center justify-center text-xl mb-2">
            🏪
          </div>
          <div>
            <div className="font-bold text-xs text-stone-800 dark:text-stone-100">
              {lang === 'bn' ? 'সার-বীজের দোকান' : 'Input Shops'}
            </div>
            <div className="text-[10px] text-stone-500 dark:text-stone-400">
              {lang === 'bn' ? 'অনুমোদিত ডিলার তালিকা' : 'Certified agro dealers'}
            </div>
          </div>
        </button>

        <button
          onClick={() => onNavigate('women')}
          className="p-3.5 bg-white dark:bg-[#162419] rounded-2xl border border-stone-200 dark:border-stone-800 text-left hover:border-emerald-500 transition shadow-xs flex flex-col justify-between active:scale-98"
        >
          <div className="w-9 h-9 rounded-xl bg-purple-100 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300 flex items-center justify-center text-xl mb-2">
            👩‍🌾
          </div>
          <div>
            <div className="font-bold text-xs text-stone-800 dark:text-stone-100">
              {lang === 'bn' ? 'নারী কৃষক সমবায়' : 'Women Farmers'}
            </div>
            <div className="text-[10px] text-stone-500 dark:text-stone-400">
              {lang === 'bn' ? 'সহজ শর্ত ও গ্রুপ সাপোর্ট' : 'Cooperative financing'}
            </div>
          </div>
        </button>

        <button
          onClick={onOpenDoctor}
          className="p-3.5 bg-white dark:bg-[#162419] rounded-2xl border border-stone-200 dark:border-stone-800 text-left hover:border-emerald-500 transition shadow-xs flex flex-col justify-between active:scale-98"
        >
          <div className="w-9 h-9 rounded-xl bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 flex items-center justify-center text-xl mb-2">
            🔬
          </div>
          <div>
            <div className="font-bold text-xs text-stone-800 dark:text-stone-100">
              {lang === 'bn' ? 'এআই রোগ নির্ণয়' : 'AI Crop Doctor'}
            </div>
            <div className="text-[10px] text-stone-500 dark:text-stone-400">
              {lang === 'bn' ? 'পাতার রোগ ও তাৎক্ষণিক সমাধান' : 'Leaf health & remedies'}
            </div>
          </div>
        </button>
      </div>

      {/* Package Subscription Banner */}
      <div 
        onClick={() => onNavigate('plans')}
        className="cursor-pointer bg-gradient-to-r from-emerald-800 to-teal-900 text-white rounded-2xl p-4 shadow-sm flex items-center justify-between"
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-xl border border-white/20">
            ⭐
          </div>
          <div>
            <div className="font-bold text-xs">
              {lang === 'bn' ? 'ফসলসেতু প্রো সাবস্ক্রিপশন' : 'FosolSetu Pro Membership'}
            </div>
            <div className="text-[11px] text-emerald-200">
              {lang === 'bn' ? 'ফ্রি মার্কেটপ্লেস ও এআই পূর্বাভাস আনলক করুন' : 'Unlock direct buyers & AI alerts'}
            </div>
          </div>
        </div>
        <span className="text-xs font-bold px-3 py-1.5 rounded-lg bg-amber-400 text-stone-900">
          {lang === 'bn' ? 'প্যাকেজ দেখুন' : 'Explore'}
        </span>
      </div>
    </div>
  );
};
