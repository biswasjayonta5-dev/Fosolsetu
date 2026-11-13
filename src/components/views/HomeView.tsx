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
  Wallet,
  ShieldCheck,
  PhoneCall,
  Clock
} from 'lucide-react';
import { CropPlan, Language, CropInfo, WeatherAlert, ViewType } from '../../types';
import { CROPS, WEATHER_ALERTS } from '../../data/mockData';
import { formatBDT } from '../../utils/formatters';
import { speakText } from '../../utils/speech';

interface HomeViewProps {
  plans: CropPlan[];
  onNavigate: (view: ViewType) => void;
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
  
  // Calculate Bridge progress state: 0=None, 1=Plan created, 2=Advance active, 3=Repaid/Sold
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
    : `এখনই বিক্রি করুন। আগামী ৩ সপ্তাহে বাজার কিছুটা নরম হতে পারে।`;

  const guideTextEn = shouldWait
    ? `Hold crop. Forecast indicates ${cropInfo.en} prices may rise by ${priceChangePct}% over 3 weeks.`
    : `Good time to sell now. Forecast indicates price softening ahead.`;

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
    <div className="space-y-6 pb-20 lg:pb-8 animate-fade-in w-full">
      {/* Top Desktop & Tablet Stats KPI Bar */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
        <div className="bg-white dark:bg-[#162419] p-4 rounded-2xl border border-stone-200 dark:border-stone-800 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-[11px] font-bold text-stone-500 uppercase tracking-wider block">
              {lang === 'bn' ? 'সক্রিয় অগ্রিম' : 'Active Advance'}
            </span>
            <div className="text-xl sm:text-2xl font-black text-emerald-700 dark:text-emerald-400 mt-0.5">
              {activePlan && activePlan.status !== 'offer' ? formatBDT(activePlan.adv, lang) : formatBDT(44500, lang)}
            </div>
            <span className="text-[10px] text-emerald-600 font-semibold">
              {lang === 'bn' ? '০% সুদে বিকাশ ফান্ড' : '0% Interest bKash Fund'}
            </span>
          </div>
          <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 flex items-center justify-center text-xl shrink-0">
            💰
          </div>
        </div>

        <div className="bg-white dark:bg-[#162419] p-4 rounded-2xl border border-stone-200 dark:border-stone-800 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-[11px] font-bold text-stone-500 uppercase tracking-wider block">
              {lang === 'bn' ? 'বর্তমান ফসল' : 'Planted Crop'}
            </span>
            <div className="text-base sm:text-lg font-black text-stone-900 dark:text-stone-100 mt-0.5 truncate">
              {cropInfo.ic} {lang === 'bn' ? cropInfo.bn.split(' ')[0] : cropInfo.en.split(' ')[0]}
            </div>
            <span className="text-[10px] text-stone-500">
              {activePlan ? `${activePlan.land} ${lang === 'bn' ? 'বিঘা' : 'Bigha'} · ${activePlan.dist}` : '5 Bigha · Bogura'}
            </span>
          </div>
          <div className="w-10 h-10 rounded-xl bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 flex items-center justify-center text-xl shrink-0">
            🌾
          </div>
        </div>

        <div className="bg-white dark:bg-[#162419] p-4 rounded-2xl border border-stone-200 dark:border-stone-800 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-[11px] font-bold text-stone-500 uppercase tracking-wider block">
              {lang === 'bn' ? 'ঝুঁকি স্কোর' : 'Credit Grade'}
            </span>
            <div className="text-xl sm:text-2xl font-black text-emerald-600 dark:text-emerald-400 mt-0.5">
              {activePlan?.score || 86}/100
            </div>
            <span className="text-[10px] text-emerald-600 font-semibold">
              {lang === 'bn' ? 'কম ঝুঁকি · ৩য় পর্যায়' : 'Low Risk · Tier 1'}
            </span>
          </div>
          <div className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 flex items-center justify-center text-xl shrink-0">
            🛡️
          </div>
        </div>

        <div className="bg-white dark:bg-[#162419] p-4 rounded-2xl border border-stone-200 dark:border-stone-800 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-[11px] font-bold text-stone-500 uppercase tracking-wider block">
              {lang === 'bn' ? 'আজকের পাইকারি দর' : 'Market Price (40kg)'}
            </span>
            <div className="text-xl sm:text-2xl font-black text-stone-900 dark:text-stone-100 mt-0.5">
              {formatBDT(currentPrice, lang)}
            </div>
            <span className={`text-[10px] font-bold ${shouldWait ? 'text-amber-600' : 'text-emerald-600'}`}>
              {shouldWait ? `↑ +${priceChangePct}% ৩ সপ্তাহে` : 'স্থিতিশীল'}
            </span>
          </div>
          <div className="w-10 h-10 rounded-xl bg-purple-100 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300 flex items-center justify-center text-xl shrink-0">
            📊
          </div>
        </div>
      </div>

      {/* Responsive Multi-Column Layout: 8 cols (Main) + 4 cols (Sidebar) on Desktop */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left / Main Column (8 Columns) */}
        <div className="lg:col-span-7 xl:col-span-8 space-y-6">
          
          {/* 4-Stage Bridge Tracker */}
          <div className="bg-white dark:bg-[#162419] p-5 rounded-2xl border border-stone-200 dark:border-stone-800 shadow-sm">
            <div className="flex items-center justify-between text-xs font-bold text-stone-500 dark:text-stone-400 mb-4 pb-2 border-b border-stone-100 dark:border-stone-800">
              <span className="text-sm font-extrabold text-stone-900 dark:text-stone-100">
                {lang === 'bn' ? 'ফসলের জীবনচক্র ও অর্থায়ন রূপরেখা' : 'Farm Journey & Financing Bridge'}
              </span>
              <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 border border-emerald-300">
                {step === 0
                  ? lang === 'bn' ? 'পরিকল্পনা শুরু করুন' : 'Get Started'
                  : step === 1
                  ? lang === 'bn' ? 'অফার প্রস্তুত' : 'Offer Ready'
                  : step === 2
                  ? lang === 'bn' ? 'অর্থায়ন সক্রিয়' : 'Advance Active'
                  : lang === 'bn' ? 'পরিশোধিত' : 'Cycle Complete'}
              </span>
            </div>

            <div className="flex items-center justify-between relative px-4 sm:px-8 py-2">
              <div className="absolute left-8 right-8 top-1/2 -translate-y-1/2 h-1.5 bg-stone-200 dark:bg-stone-800 -z-0 rounded-full" />
              <div 
                className="absolute left-8 top-1/2 -translate-y-1/2 h-1.5 bg-emerald-600 transition-all duration-500 -z-0 rounded-full"
                style={{ width: `${Math.min(100, (step / 3) * 88)}%` }}
              />

              {[
                { id: 0, ic: '🌱', bn: 'পরিকল্পনা', en: '1. Plan', descBn: 'ফসল নির্বাচন', descEn: 'Specs & Yield' },
                { id: 1, ic: '💰', bn: 'অগ্রিম', en: '2. Advance', descBn: '৩০% বিকাশ ফান্ড', descEn: '30% bKash Cash' },
                { id: 2, ic: '🌤️', bn: 'চাষ ও পরিচর্যা', en: '3. Grow', descBn: 'আবহাওয়া ও পরামর্শ', descEn: 'Radar & Alerts' },
                { id: 3, ic: '🤝', bn: 'সরাসরি বিক্রি', en: '4. Sell', descBn: '০% কমিশন বাজার', descEn: 'Zero Commission' },
              ].map((item, idx) => {
                const isCompleted = step > idx;
                const isCurrent = step === idx;
                return (
                  <div key={item.id} className="flex flex-col items-center z-10 text-center">
                    <div
                      className={`w-11 h-11 sm:w-12 sm:h-12 rounded-full flex items-center justify-center text-lg sm:text-xl font-bold border-2 transition-all ${
                        isCurrent
                          ? 'border-emerald-600 bg-emerald-600 text-white shadow-lg scale-110 ring-4 ring-emerald-100 dark:ring-emerald-950/60'
                          : isCompleted
                          ? 'border-emerald-700 bg-emerald-700 text-white'
                          : 'border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-400'
                      }`}
                    >
                      {item.ic}
                    </div>
                    <span className={`text-xs sm:text-sm font-bold mt-2 ${
                      isCurrent || isCompleted ? 'text-emerald-800 dark:text-emerald-300' : 'text-stone-400'
                    }`}>
                      {lang === 'bn' ? item.bn : item.en}
                    </span>
                    <span className="hidden sm:block text-[10px] text-stone-500 dark:text-stone-400">
                      {lang === 'bn' ? item.descBn : item.descEn}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Active Crop Plan or Add Plan CTA */}
          {activePlan ? (
            <div className="bg-white dark:bg-[#162419] rounded-2xl border-2 border-emerald-600/30 dark:border-emerald-500/30 p-5 shadow-sm relative overflow-hidden">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-stone-200 dark:border-stone-800 gap-3">
                <div className="flex items-center gap-3">
                  <span className="text-3xl sm:text-4xl p-2 bg-emerald-50 dark:bg-emerald-950/60 rounded-2xl">
                    {CROPS[activePlan.crop]?.ic || '🌱'}
                  </span>
                  <div>
                    <h3 className="font-extrabold text-base sm:text-lg text-stone-900 dark:text-stone-100">
                      {lang === 'bn' ? CROPS[activePlan.crop]?.bn : CROPS[activePlan.crop]?.en}
                    </h3>
                    <div className="text-xs text-stone-500 dark:text-stone-400">
                      {activePlan.land} {lang === 'bn' ? 'বিঘা' : 'Bigha'} · {activePlan.dist} District
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {activePlan.status === 'offer' ? (
                    <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300 border border-amber-300">
                      {lang === 'bn' ? 'অফার প্রস্তুত' : 'Offer Ready'}
                    </span>
                  ) : activePlan.status === 'active' ? (
                    <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 border border-emerald-300">
                      {lang === 'bn' ? 'অগ্রিম চালু' : 'Advance Active'}
                    </span>
                  ) : (
                    <span className="px-3 py-1 rounded-full text-xs font-bold bg-stone-100 text-stone-800 dark:bg-stone-800 dark:text-stone-300">
                      {lang === 'bn' ? 'পরিশোধিত' : 'Repaid'}
                    </span>
                  )}
                </div>
              </div>

              {/* 3-Column stats grid */}
              <div className="py-4 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                <div className="p-3 bg-stone-50 dark:bg-[#121c13] rounded-xl border border-stone-100 dark:border-stone-800">
                  <span className="text-stone-500 dark:text-stone-400 block font-medium">
                    {lang === 'bn' ? 'বিতরণকৃত মাইক্রো-অগ্রিম' : 'Disbursed Advance'}
                  </span>
                  <span className="text-lg font-black text-emerald-700 dark:text-emerald-400">
                    {formatBDT(activePlan.adv, lang)}
                  </span>
                  <span className="text-[10px] text-stone-500 block">
                    {lang === 'bn' ? 'বিকাশ ওয়ালেটে প্রেরিত' : 'Sent to bKash'}
                  </span>
                </div>

                <div className="p-3 bg-stone-50 dark:bg-[#121c13] rounded-xl border border-stone-100 dark:border-stone-800">
                  <span className="text-stone-500 dark:text-stone-400 block font-medium">
                    {lang === 'bn' ? 'ফসল কাটার তারিখ' : 'Harvest Date'}
                  </span>
                  <span className="text-base font-bold text-stone-900 dark:text-stone-100">
                    {activePlan.date}
                  </span>
                  <span className="text-[10px] text-stone-500 block">
                    {lang === 'bn' ? 'পরিশোধের মেয়াদ: +৭ দিন' : 'Repayment: +7 days'}
                  </span>
                </div>

                <div className="p-3 bg-stone-50 dark:bg-[#121c13] rounded-xl border border-stone-100 dark:border-stone-800">
                  <span className="text-stone-500 dark:text-stone-400 block font-medium">
                    {lang === 'bn' ? 'আনুমানিক মোট উৎপাদন' : 'Est. Total Production'}
                  </span>
                  <span className="text-base font-bold text-stone-900 dark:text-stone-100">
                    ~{activePlan.land * (CROPS[activePlan.crop]?.y || 18)} {lang === 'bn' ? 'মণ' : 'Maunds'}
                  </span>
                  <span className="text-[10px] text-emerald-600 block font-semibold">
                    {formatBDT(activePlan.est, lang)} {lang === 'bn' ? 'সম্ভাব্য মূল্য' : 'Gross Value'}
                  </span>
                </div>
              </div>

              {activePlan.description && (
                <div className="mb-3 p-3 bg-stone-50 dark:bg-[#121c13] rounded-xl border border-stone-200 dark:border-stone-800 text-xs flex items-start gap-2">
                  <span className="text-emerald-600 font-bold">🎙️</span>
                  <div>
                    <span className="font-bold text-stone-700 dark:text-stone-300 block text-[11px]">
                      {lang === 'bn' ? 'সংযুক্ত ভয়েস বিবরণ:' : 'Recorded Field Notes:'}
                    </span>
                    <span className="text-stone-600 dark:text-stone-400 italic">
                      "{activePlan.description}"
                    </span>
                  </div>
                </div>
              )}

              {activePlan.status === 'offer' && (
                <button
                  onClick={() => {
                    onSelectPlan(activePlan);
                    onNavigate('offer');
                  }}
                  className="w-full py-3 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-sm shadow-md transition flex items-center justify-center gap-2"
                >
                  <span>{lang === 'bn' ? 'অফার দেখুন ও বিকাশে টাকা নিন' : 'Review & Disburse to bKash'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              )}

              {activePlan.status === 'active' && (
                <div className="mt-2 pt-3 border-t border-dashed border-stone-200 dark:border-stone-800 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
                  <span className="flex items-center gap-1.5 text-stone-600 dark:text-stone-300">
                    <CheckCircle className="w-4 h-4 text-emerald-600" />
                    <span>{lang === 'bn' ? 'অগ্রিম ফান্ড কার্যকর আছে। ফসল কাটার পর উন্মুক্ত বাজারে বিক্রি করুন।' : 'Funds in your wallet. Sell through FosolSetu to settle with ৳0 commission.'}</span>
                  </span>
                  <button
                    onClick={() => onNavigate('market')}
                    className="font-bold text-emerald-700 dark:text-emerald-400 hover:underline flex items-center gap-1 shrink-0"
                  >
                    <span>{lang === 'bn' ? 'ফসল বিক্রির প্রস্তুতি' : 'Go to Marketplace'}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="bg-white dark:bg-[#162419] rounded-2xl border-2 border-dashed border-emerald-600/40 p-6 sm:p-8 text-center shadow-xs">
              <div className="w-14 h-14 rounded-2xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 flex items-center justify-center text-3xl mx-auto mb-3">
                🌱
              </div>
              <h3 className="font-extrabold text-base sm:text-lg text-stone-900 dark:text-stone-100">
                {lang === 'bn' ? 'নতুন ফসলের পরিকল্পনা শুরু করুন' : 'Start Your First Crop Plan'}
              </h3>
              <p className="text-xs sm:text-sm text-stone-500 dark:text-stone-400 max-w-md mx-auto mt-1 mb-4">
                {lang === 'bn'
                  ? 'বিনা সুদে ৩০% পর্যন্ত অগ্রিম অর্থায়ন ও নিশ্চিত সরাসরি ক্রেতা সংযোগ পান।'
                  : 'Unlock up to 30% pre-harvest advance at transparent 0% compound interest and direct verified buyer access.'}
              </p>
              <button
                onClick={() => onNavigate('plan')}
                className="px-6 py-3 rounded-xl bg-emerald-700 hover:bg-emerald-800 active:scale-98 text-white font-bold text-sm shadow-md transition inline-flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                <span>{lang === 'bn' ? 'ফসলের পরিকল্পনা দিন' : 'Create Crop Plan'}</span>
              </button>
            </div>
          )}

          {/* AI Price Guidance with Wide Interactive Sparkline */}
          <div className="bg-white dark:bg-[#162419] rounded-2xl border border-stone-200 dark:border-stone-800 p-5 shadow-sm space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-stone-100 dark:border-stone-800">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-amber-100 dark:bg-amber-950/50 flex items-center justify-center text-amber-700 dark:text-amber-400 shrink-0">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-extrabold text-sm sm:text-base text-stone-900 dark:text-stone-100 flex items-center gap-1.5">
                    <span>{lang === 'bn' ? 'এআই বাজার দর পূর্বাভাস ও বিশ্লেষণ' : 'AI Price Forecaster & Decision Engine'}</span>
                    <span className="text-xs text-stone-500 font-normal">
                      ({lang === 'bn' ? cropInfo.bn : cropInfo.en})
                    </span>
                  </h3>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => speakText(guideAudio, lang)}
                  className="px-3 py-1.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800 text-xs font-bold flex items-center gap-1.5 active:scale-95 transition"
                  title="Listen aloud in Bengali / English"
                >
                  <Volume2 className="w-4 h-4 text-emerald-600" />
                  <span>{lang === 'bn' ? 'পড়ে শোনান' : 'Audio Guide'}</span>
                </button>
              </div>
            </div>

            {/* Price Readout & Recommendation Ribbon */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 items-center">
              <div>
                <span className="text-xs text-stone-500 dark:text-stone-400 block">
                  {lang === 'bn' ? 'আজকের পাইকারি দর (৪০ কেজি / ১ মণ)' : 'Today\'s Market Ask (40 kg / 1 maund)'}
                </span>
                <span className="text-2xl sm:text-3xl font-black text-stone-900 dark:text-stone-100">
                  {formatBDT(currentPrice, lang)}
                </span>
              </div>

              <div
                className={`p-3 rounded-xl border flex items-center gap-2.5 text-xs font-bold ${
                  shouldWait
                    ? 'bg-amber-50 dark:bg-amber-950/40 border-amber-300 dark:border-amber-800 text-amber-900 dark:text-amber-200'
                    : 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-300 dark:border-emerald-800 text-emerald-900 dark:text-emerald-200'
                }`}
              >
                {shouldWait ? <TrendingUp className="w-5 h-5 text-amber-600 shrink-0" /> : <TrendingDown className="w-5 h-5 text-emerald-600 shrink-0" />}
                <span>{guideAudio}</span>
              </div>
            </div>

            {/* Wide Sparkline SVG */}
            <div className="bg-stone-50 dark:bg-[#121c13] rounded-2xl p-4 border border-stone-200 dark:border-stone-800">
              <svg viewBox="0 0 300 75" className="w-full h-24 overflow-visible" role="img">
                <polyline
                  points={histPoints}
                  fill="none"
                  stroke="#15803d"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
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

              <div className="flex flex-wrap items-center justify-between text-xs font-semibold text-stone-500 dark:text-stone-400 px-2 mt-2 pt-2 border-t border-stone-200/60 dark:border-stone-800">
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-600 inline-block" />
                  <span>{lang === 'bn' ? 'গত ৬ সপ্তাহের প্রকৃত দর' : 'Past 6 Weeks Historical Price'}</span>
                </span>
                <span className="flex items-center gap-1.5 text-amber-700 dark:text-amber-400 font-bold">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block" />
                  <span>
                    {lang === 'bn' ? '৩ সপ্তাহের পূর্বাভাস:' : '3-Week Forecast:'} {formatBDT(forecastPrice, lang)}
                  </span>
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Sidebar Column (4 Columns on Desktop) */}
        <div className="lg:col-span-5 xl:col-span-4 space-y-6">
          
          {/* Urgent Local Weather Alert */}
          {weather && (
            <div 
              onClick={() => onNavigate('weather')}
              className="cursor-pointer bg-gradient-to-r from-red-50 to-amber-50 dark:from-[#2e1515] dark:to-[#2b1f14] border-2 border-red-500/40 rounded-2xl p-4 shadow-sm transition hover:shadow-md hover:border-red-500"
            >
              <div className="flex items-start gap-3">
                <span className="text-3xl p-1.5 bg-white/80 dark:bg-black/30 rounded-xl shadow-xs shrink-0">
                  {weather.ic}
                </span>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="font-extrabold text-sm text-red-900 dark:text-red-200 flex items-center gap-1.5">
                      <AlertTriangle className="w-4 h-4 text-red-600 dark:text-red-400 shrink-0" />
                      <span>{lang === 'bn' ? weather.bn : weather.en}</span>
                    </span>
                    <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded-full bg-red-600 text-white shrink-0">
                      {lang === 'bn' ? 'সতর্কতা' : 'Alert'}
                    </span>
                  </div>
                  <p className="text-xs text-stone-700 dark:text-stone-300 mt-1 leading-snug">
                    {lang === 'bn' ? weather.dbn : weather.den}
                  </p>
                  <div className="text-[11px] text-red-700 dark:text-red-300 font-bold mt-2 flex items-center gap-1">
                    <span>{lang === 'bn' ? 'সম্পূর্ণ আবহাওয়ার তালিকা ও স্প্রে সূচি' : 'View localized weather radar →'}</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Quick Action Tiles Grid (2x2) */}
          <div className="bg-white dark:bg-[#162419] p-4 rounded-2xl border border-stone-200 dark:border-stone-800 shadow-sm space-y-3">
            <h4 className="text-xs font-bold text-stone-500 dark:text-stone-400 uppercase tracking-wider">
              {lang === 'bn' ? 'দ্রুত সেবা ও অ্যাকশন' : 'Quick Actions & Agritech Hub'}
            </h4>

            <div className="grid grid-cols-2 gap-2.5">
              <button
                onClick={() => onNavigate('market')}
                className="p-3 bg-stone-50 dark:bg-[#121c13] rounded-xl border border-stone-200 dark:border-stone-800 text-left hover:border-emerald-500 hover:bg-emerald-50/50 dark:hover:bg-emerald-950/30 transition shadow-xs flex flex-col justify-between"
              >
                <div className="w-8 h-8 rounded-lg bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 flex items-center justify-center text-lg mb-2">
                  🧺
                </div>
                <div>
                  <div className="font-bold text-xs text-stone-800 dark:text-stone-100">
                    {lang === 'bn' ? 'ফসল বিক্রি' : 'Sell Crop'}
                  </div>
                  <div className="text-[10px] text-stone-500">
                    {lang === 'bn' ? '০% কমিশন সরাসরি' : 'Zero commission'}
                  </div>
                </div>
              </button>

              <button
                onClick={() => onNavigate('dealers')}
                className="p-3 bg-stone-50 dark:bg-[#121c13] rounded-xl border border-stone-200 dark:border-stone-800 text-left hover:border-emerald-500 hover:bg-emerald-50/50 dark:hover:bg-emerald-950/30 transition shadow-xs flex flex-col justify-between"
              >
                <div className="w-8 h-8 rounded-lg bg-blue-100 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 flex items-center justify-center text-lg mb-2">
                  🏪
                </div>
                <div>
                  <div className="font-bold text-xs text-stone-800 dark:text-stone-100">
                    {lang === 'bn' ? 'সার-বীজের দোকান' : 'Input Shops'}
                  </div>
                  <div className="text-[10px] text-stone-500">
                    {lang === 'bn' ? 'বিএডিসি ডিলার' : 'Certified stockists'}
                  </div>
                </div>
              </button>

              <button
                onClick={() => onNavigate('women')}
                className="p-3 bg-stone-50 dark:bg-[#121c13] rounded-xl border border-stone-200 dark:border-stone-800 text-left hover:border-emerald-500 hover:bg-emerald-50/50 dark:hover:bg-emerald-950/30 transition shadow-xs flex flex-col justify-between"
              >
                <div className="w-8 h-8 rounded-lg bg-purple-100 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300 flex items-center justify-center text-lg mb-2">
                  👩‍🌾
                </div>
                <div>
                  <div className="font-bold text-xs text-stone-800 dark:text-stone-100">
                    {lang === 'bn' ? 'নারী সমবায়' : 'Women Co-op'}
                  </div>
                  <div className="text-[10px] text-stone-500">
                    {lang === 'bn' ? 'দলগত ৫% ফি' : 'Group onboarding'}
                  </div>
                </div>
              </button>

              <button
                onClick={onOpenDoctor}
                className="p-3 bg-stone-50 dark:bg-[#121c13] rounded-xl border border-stone-200 dark:border-stone-800 text-left hover:border-emerald-500 hover:bg-emerald-50/50 dark:hover:bg-emerald-950/30 transition shadow-xs flex flex-col justify-between"
              >
                <div className="w-8 h-8 rounded-lg bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 flex items-center justify-center text-lg mb-2">
                  🔬
                </div>
                <div>
                  <div className="font-bold text-xs text-stone-800 dark:text-stone-100">
                    {lang === 'bn' ? 'এআই ডক্টর' : 'Crop Doctor'}
                  </div>
                  <div className="text-[10px] text-stone-500">
                    {lang === 'bn' ? 'পাতার রোগ নির্ণয়' : 'Symptom scanner'}
                  </div>
                </div>
              </button>
            </div>
          </div>

          {/* Pro Membership Card */}
          <div 
            onClick={() => onNavigate('plans')}
            className="cursor-pointer bg-gradient-to-r from-emerald-800 to-teal-900 text-white rounded-2xl p-4 shadow-sm flex items-center justify-between hover:shadow-md transition"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-xl border border-white/20 shrink-0">
                ⭐
              </div>
              <div>
                <div className="font-bold text-xs">
                  {lang === 'bn' ? 'ফসলসেতু প্রো মেম্বারশিপ' : 'FosolSetu Pro Membership'}
                </div>
                <div className="text-[11px] text-emerald-200">
                  {lang === 'bn' ? 'ফ্রি মার্কেটপ্লেস ও এআই পূর্বাভাস আনলক করুন' : 'Unlock direct buyers & AI alerts'}
                </div>
              </div>
            </div>
            <span className="text-xs font-bold px-3 py-1.5 rounded-lg bg-amber-400 text-stone-900 shrink-0">
              {lang === 'bn' ? 'প্যাকেজ' : 'Explore'}
            </span>
          </div>

          {/* Farmer Hotline Help Desk */}
          <div className="bg-stone-50 dark:bg-[#121c13] p-4 rounded-2xl border border-stone-200 dark:border-stone-800 flex items-center justify-between">
            <div>
              <div className="font-bold text-xs text-stone-900 dark:text-stone-100">
                {lang === 'bn' ? 'কৃষি কর্মকর্তা হেল্পলাইন' : 'Agri Officer Helpline'}
              </div>
              <div className="text-[11px] text-stone-500 dark:text-stone-400">
                {lang === 'bn' ? 'টোল-ফ্রি ২৪/৭ সরাসরি পরামর্শ' : 'Toll-free 24/7 direct assistance'}
              </div>
            </div>
            <a
              href="tel:16123"
              className="px-3 py-1.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs shadow-xs flex items-center gap-1.5 shrink-0"
            >
              <PhoneCall className="w-3.5 h-3.5" />
              <span>১৬১২৩</span>
            </a>
          </div>

        </div>
      </div>
    </div>
  );
};
