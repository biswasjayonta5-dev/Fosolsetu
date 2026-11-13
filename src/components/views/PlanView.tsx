import React, { useState } from 'react';
import { 
  Sprout, 
  MapPin, 
  Calendar, 
  ShieldCheck, 
  Calculator, 
  Sparkles, 
  ArrowRight,
  HeartHandshake,
  CheckCircle2,
  Info,
  Mic,
  MicOff,
  Volume2,
  RotateCcw,
  Radio,
  FileText
} from 'lucide-react';
import { CropPlan, Language, CropInfo } from '../../types';
import { CROPS, DISTRICTS, DISTRICTS_BN } from '../../data/mockData';
import { formatBDT } from '../../utils/formatters';
import { useVoiceToText } from '../../hooks/useVoiceToText';
import { speakText } from '../../utils/speech';

interface PlanViewProps {
  onSavePlan: (plan: CropPlan) => void;
  lang: Language;
}

export const PlanView: React.FC<PlanViewProps> = ({ onSavePlan, lang }) => {
  const [selectedCrop, setSelectedCrop] = useState<string>('rice');
  const [land, setLand] = useState<number>(5);
  const [district, setDistrict] = useState<string>('Rajshahi');
  const [isWomen, setIsWomen] = useState<boolean>(false);

  // Voice-to-Text Hook for Crop Description
  const {
    isListening,
    isSupported,
    transcript: cropDescription,
    interimTranscript,
    errorMessage: speechError,
    startListening,
    stopListening,
    resetTranscript,
    setTranscript: setCropDescription,
  } = useVoiceToText('');

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
    // Extra completeness bonus if farmer provides field description
    const descBonus = cropDescription.trim().length > 10 ? 3 : 0;
    return Math.min(95, base + cropBonus + landBonus + womenBonus + distBonus + descBonus);
  };

  const score = calculateRiskScore();
  const pct = isWomen ? 5 : score >= 85 ? 5 : score >= 75 ? 6.5 : 8;
  const fee = Math.round((estimatedAdvance * pct) / 100);
  const net = estimatedAdvance - fee;

  const handleToggleVoice = () => {
    if (isListening) {
      stopListening();
    } else {
      startListening(lang);
    }
  };

  const quickVoicePromptsBn = [
    'ব্রি ধান-২৮ উচ্চ ফলনশীল জাত, নিয়মিত সেচ দেওয়া হচ্ছে',
    'উন্নত ডায়মন্ড বীজ, জমি সম্পূর্ণ প্রস্তুত ও সার দেওয়া হয়েছে',
    'প্রাকৃতিক গোবর সার প্রয়োগ, বিষমুক্ত ফসল উৎপাদন',
    'উন্নত ড্রিপ সেচ ব্যবস্থা, জমিতে কোনো জলাবদ্ধতা নেই',
  ];

  const quickVoicePromptsEn = [
    'BRRI dhan-28 high yield variety, well-irrigated field',
    'Certified Diamond seed, soil tested and prepared',
    'Organic vermicompost used, pesticide-free cultivation',
    'Drip-irrigated plot with excellent drainage canal',
  ];

  const quickPrompts = lang === 'bn' ? quickVoicePromptsBn : quickVoicePromptsEn;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (isListening) {
      stopListening();
    }

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
      description: cropDescription.trim() || undefined,
    };

    onSavePlan(newPlan);
  };

  return (
    <div className="space-y-6 pb-20 lg:pb-8 animate-fade-in w-full">
      {/* Header Banner */}
      <div className="bg-white dark:bg-[#162419] p-5 rounded-2xl border border-stone-200 dark:border-stone-800 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 flex items-center justify-center text-2xl shrink-0">
            🌱
          </div>
          <div>
            <h2 className="font-extrabold text-lg sm:text-xl text-stone-900 dark:text-stone-100 flex items-center gap-2">
              <span>{lang === 'bn' ? 'ফসলের পরিকল্পনা ও অগ্রিম ক্যালকুলেটর' : 'Crop Plan Builder & Advance Eligibility'}</span>
              <span className="hidden sm:inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 border border-emerald-300">
                <Mic className="w-3 h-3 text-emerald-600" />
                <span>{lang === 'bn' ? 'ভয়েস সাপোর্ট' : 'Voice Enabled'}</span>
              </span>
            </h2>
            <p className="text-xs text-stone-500 dark:text-stone-400">
              {lang === 'bn'
                ? 'চাষের বিবরণ মুখে বলে বা লিখে দিন এবং তাত্ক্ষণিক ৩০% অগ্রিম বরাদ্দ দেখুন'
                : 'Configure land specs using voice or text to unlock up to 30% pre-harvest advance'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800 text-xs font-bold">
            <ShieldCheck className="w-4 h-4" />
            <span>{lang === 'bn' ? 'স্বচ্ছ ৫-৮% ফ্ল্যাট ফি' : 'Transparent Flat Fee'}</span>
          </span>
        </div>
      </div>

      {/* 2-Column Responsive Layout */}
      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left Form Column (7-8 Cols on Desktop) */}
        <div className="lg:col-span-7 xl:col-span-8 bg-white dark:bg-[#162419] p-5 sm:p-6 rounded-2xl border border-stone-200 dark:border-stone-800 shadow-sm space-y-6">
          
          {/* 1. Crop Picker Grid */}
          <div>
            <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-2 uppercase tracking-wider">
              {lang === 'bn' ? '১. চাষকৃত ফসল নির্বাচন করুন' : '1. Select Your Crop'}
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-6 gap-2.5">
              {Object.keys(CROPS).map((key) => {
                const c = CROPS[key];
                const isSelected = selectedCrop === key;
                return (
                  <button
                    type="button"
                    key={key}
                    onClick={() => setSelectedCrop(key)}
                    className={`p-3 rounded-2xl border text-center transition-all flex flex-col items-center gap-1 active:scale-95 ${
                      isSelected
                        ? 'border-emerald-600 bg-emerald-50 dark:bg-emerald-950/60 text-emerald-900 dark:text-emerald-200 ring-2 ring-emerald-500 shadow-sm font-bold'
                        : 'border-stone-200 dark:border-stone-800 bg-stone-50/50 dark:bg-stone-900/40 text-stone-700 dark:text-stone-300 hover:border-emerald-400'
                    }`}
                  >
                    <span className="text-3xl">{c.ic}</span>
                    <span className="text-xs font-extrabold truncate w-full mt-1">
                      {lang === 'bn' ? c.bn.split(' ')[0] : c.en.split(' ')[0]}
                    </span>
                    <span className="text-[10px] text-stone-500 dark:text-stone-400">
                      ~{c.y} {lang === 'bn' ? 'মণ/বিঘা' : 'md/bg'}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 2. Land Size in Bigha */}
          <div>
            <div className="flex justify-between items-center mb-1.5">
              <label className="text-xs font-bold text-stone-700 dark:text-stone-300 uppercase tracking-wider">
                {lang === 'bn' ? '২. চাষকৃত জমির পরিমাণ (বিঘা)' : '2. Land Area (Bigha)'}
              </label>
              <span className="text-xs font-bold text-emerald-700 dark:text-emerald-400">
                {land} {lang === 'bn' ? 'বিঘা (প্রায় ' + (land * 33).toFixed(0) + ' শতাংশ)' : 'bigha (~' + (land * 0.33).toFixed(1) + ' acres)'}
              </span>
            </div>

            <div className="flex items-center gap-3">
              <input
                type="number"
                min="1"
                max="100"
                value={land}
                onChange={(e) => setLand(Math.max(1, parseInt(e.target.value) || 1))}
                className="w-full h-12 px-4 rounded-xl border-2 border-stone-200 dark:border-stone-800 bg-white dark:bg-[#121c13] text-stone-900 dark:text-stone-100 font-extrabold text-base focus:border-emerald-600 focus:outline-hidden"
              />
            </div>

            {/* Quick Land Chips */}
            <div className="flex flex-wrap gap-2 mt-2">
              {[2, 5, 10, 15, 25, 50].map((val) => (
                <button
                  type="button"
                  key={val}
                  onClick={() => setLand(val)}
                  className={`px-4 py-1.5 rounded-lg text-xs font-bold border transition ${
                    land === val
                      ? 'bg-emerald-600 text-white border-emerald-600 shadow-xs'
                      : 'bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300 border-stone-200 dark:border-stone-700 hover:bg-stone-200'
                  }`}
                >
                  {val} {lang === 'bn' ? 'বিঘা' : 'bigha'}
                </button>
              ))}
            </div>
          </div>

          {/* 3 & 4. District and Expected Harvest */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1.5 uppercase tracking-wider">
                {lang === 'bn' ? '৩. জেলা ও চাষ অঞ্চল' : '3. District Location'}
              </label>
              <div className="relative">
                <select
                  value={district}
                  onChange={(e) => setDistrict(e.target.value)}
                  className="w-full h-12 px-3 pr-8 rounded-xl border-2 border-stone-200 dark:border-stone-800 bg-white dark:bg-[#121c13] text-stone-900 dark:text-stone-100 font-bold text-sm focus:border-emerald-600 focus:outline-hidden"
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

            <div>
              <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1.5 uppercase tracking-wider">
                {lang === 'bn' ? '৪. সম্ভাব্য ফসল তোলার তারিখ' : '4. Expected Harvest Date'}
              </label>
              <div className="relative">
                <input
                  type="date"
                  value={harvestDate}
                  onChange={(e) => setHarvestDate(e.target.value)}
                  className="w-full h-12 px-3 rounded-xl border-2 border-stone-200 dark:border-stone-800 bg-white dark:bg-[#121c13] text-stone-900 dark:text-stone-100 font-bold text-sm focus:border-emerald-600 focus:outline-hidden"
                />
                <Calendar className="w-4 h-4 text-stone-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>
          </div>

          {/* 5. Voice-to-Text Crop Description (Web Speech API) */}
          <div className="p-4 sm:p-5 rounded-2xl border-2 border-emerald-500/40 bg-emerald-50/40 dark:bg-emerald-950/20 space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <label className="text-xs sm:text-sm font-extrabold text-stone-900 dark:text-stone-100 flex items-center gap-2">
                  <span className="p-1 rounded-lg bg-emerald-600 text-white">
                    <Mic className="w-3.5 h-3.5" />
                  </span>
                  <span>
                    {lang === 'bn'
                      ? '৫. ফসলের বিবরণ ও জাত (ভয়েস-টু-টেক্সট / মুখে বলুন)'
                      : '5. Crop Variety & Field Notes (Voice-to-Text)'}
                  </span>
                </label>
                <p className="text-[11px] text-stone-500 dark:text-stone-400 mt-0.5">
                  {lang === 'bn'
                    ? 'টাইপ করতে কষ্ট হলে নিচের মাইক্রোফোন বোতাম চেপে মুখে বলুন। আপনার কথা বাংলায় লেখা হয়ে যাবে।'
                    : 'Tap the microphone to speak your field notes in Bengali or English. Speech recognition writes it down instantly.'}
                </p>
              </div>

              {/* Status / Language indicator */}
              <div className="flex items-center gap-1.5">
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-900 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-700">
                  {lang === 'bn' ? 'বাংলা (bn-BD)' : 'English (en-US)'}
                </span>
              </div>
            </div>

            {/* Speech Controller Action Bar */}
            <div className="flex flex-wrap items-center gap-2 pt-1">
              <button
                type="button"
                onClick={handleToggleVoice}
                className={`flex-1 sm:flex-initial px-4 py-2.5 rounded-xl font-extrabold text-xs sm:text-sm transition-all duration-200 flex items-center justify-center gap-2 shadow-sm ${
                  isListening
                    ? 'bg-red-600 hover:bg-red-700 text-white ring-4 ring-red-300 dark:ring-red-950 animate-pulse'
                    : 'bg-emerald-700 hover:bg-emerald-800 text-white'
                }`}
              >
                {isListening ? (
                  <>
                    <Radio className="w-4 h-4 animate-spin text-white" />
                    <span>{lang === 'bn' ? '🔴 রেকর্ডিং চলছে... কথা বলুন (বন্ধ করতে চাপুন)' : '🔴 Listening... (Tap to Stop)'}</span>
                  </>
                ) : (
                  <>
                    <Mic className="w-4 h-4 text-emerald-200" />
                    <span>{lang === 'bn' ? '🎙️ মুখে বলুন (ভয়েস ইনপুট চালু)' : '🎙️ Speak (Start Voice Input)'}</span>
                  </>
                )}
              </button>

              {cropDescription && (
                <>
                  <button
                    type="button"
                    onClick={() => speakText(cropDescription, lang)}
                    className="px-3 py-2 rounded-xl border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-800 hover:bg-stone-100 dark:hover:bg-stone-700 text-xs font-bold text-stone-700 dark:text-stone-300 flex items-center gap-1.5 transition"
                    title={lang === 'bn' ? 'লেখাটি পড়ে শুনুন' : 'Listen aloud'}
                  >
                    <Volume2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span className="hidden sm:inline">{lang === 'bn' ? 'শুনুন' : 'Listen'}</span>
                  </button>

                  <button
                    type="button"
                    onClick={resetTranscript}
                    className="px-3 py-2 rounded-xl border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-800 hover:bg-red-50 text-xs font-bold text-stone-600 dark:text-stone-400 hover:text-red-600 flex items-center gap-1.5 transition"
                    title={lang === 'bn' ? 'মুছে ফেলুন' : 'Clear'}
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">{lang === 'bn' ? 'মুছুন' : 'Clear'}</span>
                  </button>
                </>
              )}
            </div>

            {/* Live Listening Wave Banner */}
            {isListening && (
              <div className="p-3 bg-red-50 dark:bg-red-950/40 border border-red-300 dark:border-red-800 rounded-xl flex items-center gap-2.5 text-xs text-red-900 dark:text-red-200 animate-fade-in">
                <span className="w-2.5 h-2.5 rounded-full bg-red-600 animate-ping shrink-0" />
                <span className="font-bold">
                  {lang === 'bn'
                    ? 'আপনার কথা শোনা হচ্ছে... স্পষ্টভাবে বলুন (যেমন: ব্রি ধান-২৮, ৫ বিঘা জমিতে রাসায়নিক মুক্ত চাষ)'
                    : 'Listening live... Speak clearly (e.g., BRRI Dhan-28 variety, organic fertilizer applied)'}
                </span>
              </div>
            )}

            {/* Error Banner if mic denied or unsupported */}
            {speechError && (
              <div className="p-3 bg-amber-50 dark:bg-amber-950/40 border border-amber-300 dark:border-amber-800 rounded-xl text-xs text-amber-900 dark:text-amber-200 flex items-start gap-2">
                <Info className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <span>{speechError}</span>
              </div>
            )}

            {/* Textarea for Transcribed or Typed Content */}
            <div className="relative">
              <textarea
                rows={3}
                value={cropDescription}
                onChange={(e) => setCropDescription(e.target.value)}
                placeholder={
                  lang === 'bn'
                    ? 'মাইক্রোফোন চেপে মুখে বলুন অথবা এখানে লিখুন (যেমন: ব্রি ধান-২৮, বিএডিসির বীজ, জমিতে জৈব সার দেওয়া হয়েছে...)'
                    : 'Speak into microphone or type details here (e.g. BRRI dhan-28 variety, certified BADC seed, organic compost applied)...'
                }
                className="w-full p-3.5 rounded-xl border-2 border-stone-200 dark:border-stone-800 bg-white dark:bg-[#121c13] text-stone-900 dark:text-stone-100 text-xs sm:text-sm font-medium focus:border-emerald-600 focus:outline-hidden leading-relaxed transition"
              />

              {interimTranscript && (
                <div className="absolute left-3 bottom-3 right-3 text-xs italic text-emerald-600 bg-emerald-50/90 dark:bg-emerald-950/90 px-2.5 py-1 rounded-lg border border-emerald-300/50 pointer-events-none truncate animate-pulse">
                  <span className="font-bold mr-1">{lang === 'bn' ? 'শুনছি:' : 'Hearing:'}</span>
                  "{interimTranscript}"
                </div>
              )}
            </div>

            {/* Quick Inspiration Voice Prompts for Farmers */}
            <div>
              <span className="text-[10px] font-bold text-stone-500 uppercase tracking-wider block mb-1.5">
                {lang === 'bn' ? '💡 নমুনা ভয়েস বাক্য (ট্যাপ করে যুক্ত করুন):' : '💡 Common Sample Notes (Tap to append):'}
              </span>
              <div className="flex flex-wrap gap-1.5">
                {quickPrompts.map((prompt, i) => (
                  <button
                    type="button"
                    key={i}
                    onClick={() => {
                      setCropDescription((prev) => {
                        const trimmed = prev.trim();
                        return trimmed ? `${trimmed}। ${prompt}` : prompt;
                      });
                    }}
                    className="text-[11px] font-medium px-2.5 py-1 rounded-lg bg-stone-100 dark:bg-stone-800 hover:bg-emerald-100 dark:hover:bg-emerald-950 text-stone-700 dark:text-stone-300 hover:text-emerald-800 border border-stone-200 dark:border-stone-700 transition"
                  >
                    + {prompt}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* 6. Women Farmer / Co-operative Toggle */}
          <div className="bg-purple-50 dark:bg-purple-950/30 p-4 rounded-2xl border border-purple-200 dark:border-purple-800/50">
            <label className="flex items-start sm:items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={isWomen}
                onChange={(e) => setIsWomen(e.target.checked)}
                className="w-5 h-5 rounded text-purple-600 border-purple-300 focus:ring-purple-500 shrink-0 mt-0.5 sm:mt-0"
              />
              <div className="flex-1">
                <span className="text-xs sm:text-sm font-bold text-purple-900 dark:text-purple-200 flex items-center gap-1.5">
                  <HeartHandshake className="w-4 h-4 text-purple-600" />
                  <span>{lang === 'bn' ? 'নারী কৃষক বা নারী সমবায় সমিতির অন্তর্ভুক্ত আবেদন' : 'Woman Farmer or Women\'s Co-operative Group'}</span>
                </span>
                <span className="text-xs text-purple-700 dark:text-purple-300 block mt-0.5">
                  {lang === 'bn'
                    ? 'জমির দলিলের ঝামেলা ছাড়াই দ্রুত অনুমোদন ও বিশেষ ৫% ফ্ল্যাট সার্ভিস ফি প্রযোজ্য হবে।'
                    : 'Fast-track group approval without land deed barriers + exclusive 5% flat fee.'}
                </span>
              </div>
            </label>
          </div>
        </div>

        {/* Right Sticky Valuation Column (4-5 Cols on Desktop) */}
        <div className="lg:col-span-5 xl:col-span-4 lg:sticky lg:top-24 space-y-4">
          <div className="bg-white dark:bg-[#162419] p-5 sm:p-6 rounded-2xl border-2 border-emerald-600/30 dark:border-emerald-500/30 shadow-md space-y-4">
            
            <div className="flex items-center justify-between pb-3 border-b border-stone-200 dark:border-stone-800">
              <div className="flex items-center gap-2">
                <Calculator className="w-5 h-5 text-emerald-600" />
                <h3 className="font-extrabold text-sm sm:text-base text-stone-900 dark:text-stone-100">
                  {lang === 'bn' ? 'প্রাক-অনুমোদন সিমুলেশন' : 'Pre-Approval Summary'}
                </h3>
              </div>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                AI Verified
              </span>
            </div>

            {/* Calculations Breakdown */}
            <div className="space-y-2.5 text-xs">
              <div className="flex justify-between items-center text-stone-600 dark:text-stone-300">
                <span>{lang === 'bn' ? 'প্রত্যাশিত মোট ফলন:' : 'Estimated Yield:'}</span>
                <span className="font-extrabold text-stone-900 dark:text-stone-100">
                  ~{estimatedYieldMaund} {lang === 'bn' ? 'মণ' : 'Maunds'}
                </span>
              </div>

              <div className="flex justify-between items-center text-stone-600 dark:text-stone-300">
                <span>{lang === 'bn' ? 'বাজার মূল্য প্রতি মণ:' : 'Market Price / Maund:'}</span>
                <span className="font-bold text-stone-800 dark:text-stone-200">
                  {formatBDT(cropInfo.pr, lang)}
                </span>
              </div>

              <div className="flex justify-between items-center text-stone-600 dark:text-stone-300">
                <span>{lang === 'bn' ? 'মোট ফসলের আনুমানিক মূল্য:' : 'Estimated Gross Valuation:'}</span>
                <span className="font-bold text-stone-900 dark:text-stone-100">
                  {formatBDT(estimatedGrossValue, lang)}
                </span>
              </div>

              <div className="pt-2 border-t border-dashed border-stone-200 dark:border-stone-800 flex justify-between items-center text-stone-600 dark:text-stone-300">
                <span>{lang === 'bn' ? `সার্ভিস ফি (${pct}% ফ্ল্যাট):` : `Flat Service Fee (${pct}%):`}</span>
                <span className="font-bold text-red-600 dark:text-red-400">
                  − {formatBDT(fee, lang)}
                </span>
              </div>

              <div className="p-3 bg-emerald-50 dark:bg-emerald-950/60 rounded-xl border border-emerald-300 dark:border-emerald-800 space-y-1">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-emerald-900 dark:text-emerald-200 text-xs">
                    {lang === 'bn' ? 'আজ সরাসরি বিকাশ/নগদে পাবেন:' : 'Net Disbursed to Wallet:'}
                  </span>
                  <span className="text-xl font-black text-emerald-700 dark:text-emerald-400">
                    {formatBDT(net, lang)}
                  </span>
                </div>
                <span className="text-[10px] text-emerald-700 dark:text-emerald-400 block">
                  {lang === 'bn' ? 'কোনো মাসিক কিস্তি বা লুকানো সুদ নেই' : '0% compound interest, repay on harvest sale'}
                </span>
              </div>

              <div className="flex justify-between items-center text-stone-600 dark:text-stone-300 text-[11px]">
                <span>{lang === 'bn' ? 'পরিশোধের মেয়াদ:' : 'Repayment Due Date:'}</span>
                <span className="font-bold text-stone-800 dark:text-stone-200">
                  {harvestDate} (+৭ দিন)
                </span>
              </div>

              {/* Crop Description Voice Snippet in Valuation Card */}
              {cropDescription && (
                <div className="p-2.5 bg-stone-50 dark:bg-[#121c13] rounded-xl border border-stone-200 dark:border-stone-800 text-[11px] space-y-1">
                  <span className="font-bold text-emerald-700 dark:text-emerald-400 flex items-center gap-1">
                    <Mic className="w-3 h-3" />
                    <span>{lang === 'bn' ? 'সংযুক্ত ভয়েস বিবরণ:' : 'Recorded Field Note:'}</span>
                  </span>
                  <p className="text-stone-600 dark:text-stone-300 italic line-clamp-2">
                    "{cropDescription}"
                  </p>
                </div>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-3.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 active:scale-98 text-white font-extrabold text-sm shadow-md transition flex items-center justify-center gap-2"
            >
              <span>{lang === 'bn' ? 'আমার অগ্রিম অফার দেখুন' : 'Generate Advance Offer'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <div className="text-[11px] text-stone-500 dark:text-stone-400 flex items-start gap-1.5 pt-1">
              <Info className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span>
                {lang === 'bn'
                  ? 'আপনার জমি ও ভয়েস বিবরণের তথ্যের ভিত্তিতে ক্রেডিট স্কোর তৈরি করা হবে।'
                  : 'Automated satellite yield indexing and agronomic notes verify your advance tier.'}
              </span>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};
