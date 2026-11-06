import React, { useState } from 'react';
import { 
  Sprout, 
  MapPin, 
  Calendar, 
  ShieldCheck, 
  Calculator, 
  Sparkles, 
  ArrowRight,
  HeartHandshake
} from 'lucide-react';
import { CropPlan, Language, CropInfo } from '../../types';
import { CROPS, DISTRICTS, DISTRICTS_BN } from '../../data/mockData';
import { formatBDT } from '../../utils/formatters';

interface PlanViewProps {
  onSavePlan: (plan: CropPlan) => void;
  lang: Language;
}

export const PlanView: React.FC<PlanViewProps> = ({ onSavePlan, lang }) => {
  const [selectedCrop, setSelectedCrop] = useState<string>('rice');
  const [land, setLand] = useState<number>(5);
  const [district, setDistrict] = useState<string>('Rajshahi');
  const [isWomen, setIsWomen] = useState<boolean>(false);

  // Set default harvest date 90 days from today
  const defaultHarvestDate = () => {
    const d = new Date();
    d.setDate(d.getDate() + 90);
    return d.toISOString().slice(0, 10);
  };
  const [harvestDate, setHarvestDate] = useState<string>(defaultHarvestDate());

  const cropInfo: CropInfo = CROPS[selectedCrop] || CROPS.rice;
  const estimatedYieldMaund = Math.round(land * cropInfo.y);
  const estimatedGrossValue = estimatedYieldMaund * cropInfo.pr;
  const estimatedAdvance = Math.round(estimatedGrossValue * 0.3);

  const calculateRiskScore = () => {
    const base = 60;
    const cropBonus = { rice: 14, jute: 10, potato: 12, tomato: 4, onion: 11, mustard: 13 }[selectedCrop] || 10;
    const landBonus = land <= 10 ? 6 : 2;
    const womenBonus = isWomen ? 5 : 0;
    const distBonus = (DISTRICTS.indexOf(district) % 3) * 2;
    return Math.min(95, base + cropBonus + landBonus + womenBonus + distBonus);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const score = calculateRiskScore();
    const pct = score >= 85 ? 5 : score >= 75 ? 6.5 : 8; // transparent service fee %
    const fee = Math.round((estimatedAdvance * pct) / 100);
    const net = estimatedAdvance - fee;

    const repDateObj = new Date(harvestDate);
    repDateObj.setDate(repDateObj.getDate() + 7);
    const repDate = repDateObj.toISOString().slice(0, 10);

    const newPlan: CropPlan = {
      id: Date.now(),
      crop: selectedCrop,
      land,
      dist: district,
      date: harvestDate,
      women: isWomen,
      score,
      pct,
      adv: estimatedAdvance,
      fee,
      net,
      rep: estimatedAdvance,
      repDate,
      est: estimatedGrossValue,
      status: 'offer',
    };

    onSavePlan(newPlan);
  };

  return (
    <div className="space-y-4 pb-20 animate-fade-in">
      <div className="bg-white dark:bg-[#162419] p-4 rounded-2xl border border-stone-200 dark:border-stone-800 shadow-sm">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-8 h-8 rounded-xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 flex items-center justify-center text-lg">
            🌱
          </div>
          <div>
            <h2 className="font-bold text-base text-stone-900 dark:text-stone-100">
              {lang === 'bn' ? 'নতুন ফসলের পরিকল্পনা' : 'New Crop Plan & Advance'}
            </h2>
            <p className="text-[11px] text-stone-500 dark:text-stone-400">
              {lang === 'bn'
                ? 'ফসলের বিবরণ দিন এবং তাত্ক্ষণিক ৩০% অগ্রিম অফার দেখুন'
                : 'Enter your crop specs to receive pre-harvest advance offer'}
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          {/* 1. Crop Picker Grid */}
          <div>
            <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-2">
              {lang === 'bn' ? '১. ফসল নির্বাচন করুন' : '1. Select Your Crop'}
            </label>
            <div className="grid grid-cols-3 gap-2">
              {Object.keys(CROPS).map((key) => {
                const c = CROPS[key];
                const isSelected = selectedCrop === key;
                return (
                  <button
                    type="button"
                    key={key}
                    onClick={() => setSelectedCrop(key)}
                    className={`p-2.5 rounded-xl border text-center transition-all flex flex-col items-center gap-1 active:scale-95 ${
                      isSelected
                        ? 'border-emerald-600 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-900 dark:text-emerald-200 ring-2 ring-emerald-500 shadow-sm font-bold'
                        : 'border-stone-200 dark:border-stone-800 bg-stone-50/50 dark:bg-stone-900/40 text-stone-700 dark:text-stone-300 hover:border-emerald-400'
                    }`}
                  >
                    <span className="text-2xl">{c.ic}</span>
                    <span className="text-xs truncate w-full">
                      {lang === 'bn' ? c.bn.split(' ')[0] : c.en.split(' ')[0]}
                    </span>
                    <span className="text-[10px] text-stone-500 dark:text-stone-400">
                      ~{c.y} {lang === 'bn' ? 'মণ/বিঘা' : 'md/bigha'}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 2. Land Size in Bigha */}
          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="text-xs font-bold text-stone-700 dark:text-stone-300">
                {lang === 'bn' ? '২. জমির পরিমাণ (বিঘা)' : '2. Land Size (Bigha)'}
              </label>
              <span className="text-xs font-semibold text-emerald-700 dark:text-emerald-400">
                {land} {lang === 'bn' ? 'বিঘা (প্রায় ' + (land * 33).toFixed(0) + ' শতাংশ)' : 'bigha (~' + (land * 0.33).toFixed(1) + ' acres)'}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <input
                type="number"
                min="1"
                max="100"
                value={land}
                onChange={(e) => setLand(Math.max(1, parseInt(e.target.value) || 1))}
                className="w-full h-12 px-3 rounded-xl border-2 border-stone-200 dark:border-stone-800 bg-white dark:bg-[#121c13] text-stone-900 dark:text-stone-100 font-bold text-base focus:border-emerald-600 focus:outline-hidden"
              />
            </div>

            {/* Quick Land Chips */}
            <div className="flex gap-2 mt-2">
              {[2, 5, 10, 15, 25].map((val) => (
                <button
                  type="button"
                  key={val}
                  onClick={() => setLand(val)}
                  className={`flex-1 py-1 rounded-lg text-xs font-semibold border transition ${
                    land === val
                      ? 'bg-emerald-600 text-white border-emerald-600'
                      : 'bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300 border-stone-200 dark:border-stone-700'
                  }`}
                >
                  {val} {lang === 'bn' ? 'বিঘা' : 'bg'}
                </button>
              ))}
            </div>
          </div>

          {/* 3. District Selector */}
          <div>
            <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1">
              {lang === 'bn' ? '৩. জেলা ও অঞ্চল' : '3. Farming District'}
            </label>
            <div className="relative">
              <select
                value={district}
                onChange={(e) => setDistrict(e.target.value)}
                className="w-full h-12 px-3 pr-8 rounded-xl border-2 border-stone-200 dark:border-stone-800 bg-white dark:bg-[#121c13] text-stone-900 dark:text-stone-100 font-semibold text-sm focus:border-emerald-600 focus:outline-hidden"
              >
                {DISTRICTS.map((d) => (
                  <option key={d} value={d}>
                    {lang === 'bn' ? DISTRICTS_BN[d] || d : d} District
                  </option>
                ))}
              </select>
              <MapPin className="w-4 h-4 text-stone-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>

          {/* 4. Expected Harvest Date */}
          <div>
            <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1">
              {lang === 'bn' ? '৪. সম্ভাব্য ফসল তোলার তারিখ' : '4. Expected Harvest Date'}
            </label>
            <div className="relative">
              <input
                type="date"
                value={harvestDate}
                onChange={(e) => setHarvestDate(e.target.value)}
                className="w-full h-12 px-3 rounded-xl border-2 border-stone-200 dark:border-stone-800 bg-white dark:bg-[#121c13] text-stone-900 dark:text-stone-100 font-semibold text-sm focus:border-emerald-600 focus:outline-hidden"
              />
              <Calendar className="w-4 h-4 text-stone-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>

          {/* 5. Women Farmer / Co-operative Toggle */}
          <div className="bg-purple-50 dark:bg-purple-950/30 p-3 rounded-xl border border-purple-200 dark:border-purple-800/50">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={isWomen}
                onChange={(e) => setIsWomen(e.target.checked)}
                className="w-5 h-5 rounded text-purple-600 border-purple-300 focus:ring-purple-500"
              />
              <div className="flex-1">
                <span className="text-xs font-bold text-purple-900 dark:text-purple-200 flex items-center gap-1.5">
                  <HeartHandshake className="w-4 h-4 text-purple-600" />
                  {lang === 'bn' ? 'নারী কৃষক বা নারী সমবায় সমিতি' : 'Woman Farmer or Women\'s Co-operative'}
                </span>
                <span className="text-[11px] text-purple-700 dark:text-purple-300 block">
                  {lang === 'bn'
                    ? 'জমির কাগজপত্রের জটিলতা ছাড়াই সহজ অনুমোদন ও বিশেষ ৫% ফি'
                    : 'Fast-track approval with community verification & lower 5% fee'}
                </span>
              </div>
            </label>
          </div>

          {/* Live Valuation Box */}
          <div className="bg-emerald-50 dark:bg-emerald-950/40 p-3.5 rounded-xl border border-emerald-300 dark:border-emerald-800 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="text-stone-600 dark:text-stone-300">
                {lang === 'bn' ? 'প্রত্যাশিত ফলন:' : 'Estimated Yield:'}
              </span>
              <span className="font-bold text-stone-800 dark:text-stone-200">
                ~{estimatedYieldMaund} {lang === 'bn' ? 'মণ' : 'maunds'}
              </span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-stone-600 dark:text-stone-300">
                {lang === 'bn' ? 'মোট ফসলের আনুমানিক মূল্য:' : 'Estimated Crop Valuation:'}
              </span>
              <span className="font-bold text-stone-800 dark:text-stone-200">
                {formatBDT(estimatedGrossValue, lang)}
              </span>
            </div>
            <div className="pt-2 border-t border-emerald-200 dark:border-emerald-800/80 flex items-center justify-between">
              <span className="text-xs font-bold text-emerald-900 dark:text-emerald-200">
                {lang === 'bn' ? 'সম্ভাব্য অগ্রিম অর্থায়ন (৩০%):' : 'Pre-harvest Advance Eligibility (30%):'}
              </span>
              <span className="text-base font-extrabold text-emerald-700 dark:text-emerald-400">
                {formatBDT(estimatedAdvance, lang)}
              </span>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 active:scale-98 text-white font-bold text-sm shadow-md transition flex items-center justify-center gap-2"
          >
            <span>{lang === 'bn' ? 'আমার অগ্রিম অফার দেখুন' : 'Generate Advance Offer'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
};
