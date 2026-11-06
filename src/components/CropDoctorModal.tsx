import React, { useState } from 'react';
import { Camera, X, CheckCircle, AlertTriangle, Sparkles, RefreshCw } from 'lucide-react';
import { Language } from '../types';

interface CropDoctorModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
}

export const CropDoctorModal: React.FC<CropDoctorModalProps> = ({
  isOpen,
  onClose,
  lang,
}) => {
  const [selectedCrop, setSelectedCrop] = useState('rice');
  const [analyzing, setAnalyzing] = useState(false);
  const [diagnosed, setDiagnosed] = useState<boolean>(false);

  if (!isOpen) return null;

  const handleDiagnose = () => {
    setAnalyzing(true);
    setTimeout(() => {
      setAnalyzing(false);
      setDiagnosed(true);
    }, 1200);
  };

  const reset = () => {
    setDiagnosed(false);
    setAnalyzing(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white dark:bg-[#1a271c] rounded-2xl max-w-sm w-full shadow-2xl border border-stone-200 dark:border-stone-800 overflow-hidden">
        {/* Header */}
        <div className="bg-emerald-800 text-white p-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-emerald-700 flex items-center justify-center text-lg">
              🔍
            </div>
            <div>
              <div className="font-bold text-sm">
                {lang === 'bn' ? 'ফসলের রোগ নির্ণয় (এআই ডক্টর)' : 'AI Crop Doctor'}
              </div>
              <div className="text-[11px] text-emerald-200">
                {lang === 'bn' ? 'মোবাইল ক্যামেরা বা নমুনা পরীক্ষা' : 'Camera Diagnosis & Remedies'}
              </div>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-7 h-7 rounded-full bg-black/20 flex items-center justify-center text-white"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 space-y-4">
          {!diagnosed ? (
            <>
              <div>
                <label className="text-xs font-bold text-stone-700 dark:text-stone-300 block mb-1">
                  {lang === 'bn' ? 'ফসল বেছে নিন' : 'Select Crop'}
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'rice', labelBn: 'ধান', labelEn: 'Rice', icon: '🌾' },
                    { id: 'potato', labelBn: 'আলু', labelEn: 'Potato', icon: '🥔' },
                    { id: 'tomato', labelBn: 'টমেটো', labelEn: 'Tomato', icon: '🍅' },
                  ].map((c) => (
                    <button
                      key={c.id}
                      onClick={() => setSelectedCrop(c.id)}
                      className={`p-2 rounded-xl border text-center text-xs font-bold transition flex flex-col items-center gap-1 ${
                        selectedCrop === c.id
                          ? 'border-emerald-600 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300'
                          : 'border-stone-200 dark:border-stone-800 text-stone-600 dark:text-stone-300'
                      }`}
                    >
                      <span className="text-xl">{c.icon}</span>
                      <span>{lang === 'bn' ? c.labelBn : c.labelEn}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Photo Upload Area */}
              <div className="border-2 border-dashed border-emerald-600/40 dark:border-emerald-500/30 rounded-2xl p-6 text-center bg-emerald-50/50 dark:bg-emerald-950/20">
                <Camera className="w-10 h-10 mx-auto text-emerald-600 dark:text-emerald-400 mb-2" />
                <div className="text-xs font-bold text-stone-700 dark:text-stone-200">
                  {lang === 'bn' ? 'আক্রান্ত পাতার ছবি তুলুন বা আপলোড করুন' : 'Snap photo of infected leaf / plant'}
                </div>
                <div className="text-[11px] text-stone-500 dark:text-stone-400 mt-1">
                  {lang === 'bn' ? 'অফলাইনেও ক্যাশে কাজ করে' : 'Supports field snapshot & offline cache'}
                </div>
              </div>

              <button
                disabled={analyzing}
                onClick={handleDiagnose}
                className="w-full py-3 rounded-xl bg-emerald-700 hover:bg-emerald-800 active:scale-98 text-white font-bold text-sm shadow-md transition flex items-center justify-center gap-2"
              >
                {analyzing ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>{lang === 'bn' ? 'স্ক্যান করা হচ্ছে...' : 'Analyzing symptoms...'}</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    <span>{lang === 'bn' ? 'রোগ পরীক্ষা করুন' : 'Diagnose Symptoms'}</span>
                  </>
                )}
              </button>
            </>
          ) : (
            <div className="space-y-3">
              <div className="p-3 bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 rounded-xl">
                <div className="flex items-center gap-2 text-amber-800 dark:text-amber-300 font-bold text-sm">
                  <AlertTriangle className="w-4 h-4 text-amber-600" />
                  <span>
                    {selectedCrop === 'rice'
                      ? lang === 'bn' ? 'চিহ্নিত: ধানের ব্লাস্ট রোগ (Early Stage)' : 'Detected: Rice Leaf Blast'
                      : selectedCrop === 'potato'
                      ? lang === 'bn' ? 'চিহ্নিত: আলুর নাভিধসা (Late Blight)' : 'Detected: Potato Late Blight'
                      : lang === 'bn' ? 'চিহ্নিত: টমেটোর পাতা কুঁকড়ানো পোকা' : 'Detected: Tomato Leaf Curl Virus'}
                  </span>
                </div>
                <div className="text-xs text-stone-600 dark:text-stone-300 mt-1">
                  {lang === 'bn'
                    ? 'আবহাওয়ার আর্দ্রতার কারণে ছত্রাকের প্রাদুর্ভাব দেখা দিয়েছে। এখনই ব্যবস্থা না নিলে ২০% ফলন কমে যেতে পারে।'
                    : 'Fungal spores stimulated by high humidity. Immediate treatment recommended to prevent 20% yield drop.'}
                </div>
              </div>

              <div className="bg-stone-50 dark:bg-[#121c13] p-3 rounded-xl border border-stone-200 dark:border-stone-800 space-y-2 text-xs">
                <div className="font-bold text-stone-800 dark:text-stone-200">
                  {lang === 'bn' ? 'চিকিৎসা ও সমাধান:' : 'Recommended Action:'}
                </div>
                <ul className="list-disc list-inside space-y-1 text-stone-600 dark:text-stone-400 text-[11px]">
                  <li>
                    {lang === 'bn'
                      ? 'নাটিভো বা ট্রুপার প্রতি লিটার পানিতে ১ গ্রাম হারে বিকালের দিকে স্প্রে করুন।'
                      : 'Spray Nativo or Trooper (1g / litre) during late afternoon.'}
                  </li>
                  <li>
                    {lang === 'bn'
                      ? 'জমি থেকে অতিরিক্ত পানি নিষ্কাশন করুন এবং ইউরিয়া সার প্রয়োগ সাময়িক বন্ধ রাখুন।'
                      : 'Drain stagnant water and temporarily hold urea top-dressing.'}
                  </li>
                  <li>
                    {lang === 'bn'
                      ? 'স্থানীয় অনুমোদিত দোকানে যোগাযোগ করে সঠিক বালাইনাশক নিন।'
                      : 'Contact nearby verified dealer from our Input Directory.'}
                  </li>
                </ul>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={reset}
                  className="flex-1 py-2.5 rounded-xl border border-stone-300 dark:border-stone-700 text-xs font-semibold text-stone-700 dark:text-stone-300"
                >
                  {lang === 'bn' ? 'নতুন ছবি' : 'New Scan'}
                </button>
                <button
                  onClick={onClose}
                  className="flex-1 py-2.5 rounded-xl bg-emerald-700 text-white text-xs font-bold shadow"
                >
                  {lang === 'bn' ? 'সমাপ্ত' : 'Done'}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
