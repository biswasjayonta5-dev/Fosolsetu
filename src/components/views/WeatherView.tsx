import React, { useState } from 'react';
import { 
  CloudSun, 
  AlertTriangle, 
  Wind, 
  Droplets, 
  MessageSquare, 
  Check, 
  MapPin,
  Calendar,
  Volume2
} from 'lucide-react';
import { Language } from '../../types';
import { WEATHER_ALERTS, DISTRICTS } from '../../data/mockData';
import { speakText } from '../../utils/speech';

interface WeatherViewProps {
  lang: Language;
}

export const WeatherView: React.FC<WeatherViewProps> = ({ lang }) => {
  const [selectedDistrict, setSelectedDistrict] = useState('Rajshahi');
  const [smsSubscribed, setSmsSubscribed] = useState(true);

  const forecastDays = [
    { dayBn: 'আজ', dayEn: 'Today', icon: '🌧️', condBn: 'ভারী বৃষ্টি', condEn: 'Heavy Rain', temp: '28° / 23°' },
    { dayBn: 'আগামীকাল', dayEn: 'Tomorrow', icon: '🌦️', condBn: 'বিক্ষিপ্ত বৃষ্টি', condEn: 'Scattered Showers', temp: '29° / 24°' },
    { dayBn: 'বৃহস্পতিবার', dayEn: 'Thursday', icon: '💨', condBn: 'ঝড়ো বাতাস', condEn: 'Gusty Wind', temp: '31° / 22°' },
    { dayBn: 'শুক্রবার', dayEn: 'Friday', icon: '⛅', condBn: 'আংশিক মেঘলা', condEn: 'Partly Cloudy', temp: '32° / 25°' },
    { dayBn: 'শনিবার', dayEn: 'Saturday', icon: '☀️', condBn: 'রোদ ঝলমলে', condEn: 'Sunny & Dry', temp: '33° / 24°' },
  ];

  return (
    <div className="space-y-4 pb-20 animate-fade-in">
      {/* Title & District Filter */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-bold text-base text-stone-900 dark:text-stone-100 flex items-center gap-2">
            <span>🌦️</span>
            <span>{lang === 'bn' ? 'আবহাওয়া ও কৃষি পরামর্শ' : 'Weather & Crop Advisory'}</span>
          </h2>
          <p className="text-xs text-stone-500 dark:text-stone-400">
            {lang === 'bn' ? 'সরাসরি উপগ্রহ ও আবহাওয়া অধিদপ্তরের তথ্য' : 'Satellite & Met Department Radar Feed'}
          </p>
        </div>

        <select
          value={selectedDistrict}
          onChange={(e) => setSelectedDistrict(e.target.value)}
          className="h-9 px-2 rounded-xl border border-stone-300 dark:border-stone-700 bg-white dark:bg-[#121c13] text-xs font-semibold text-stone-800 dark:text-stone-200"
        >
          {DISTRICTS.map((d) => (
            <option key={d} value={d}>
              {d}
            </option>
          ))}
        </select>
      </div>

      {/* Extreme Weather Warnings */}
      <div className="space-y-3">
        {WEATHER_ALERTS.map((alert, i) => (
          <div
            key={i}
            className={`p-4 rounded-2xl border-2 shadow-xs transition ${
              alert.s === 'r'
                ? 'bg-red-50/80 dark:bg-[#2c1515] border-red-500/50'
                : alert.s === 'w'
                ? 'bg-amber-50/80 dark:bg-[#2b2014] border-amber-500/50'
                : 'bg-emerald-50/80 dark:bg-[#15291b] border-emerald-500/50'
            }`}
          >
            <div className="flex items-start gap-3">
              <span className="text-3xl p-1 bg-white/80 dark:bg-black/30 rounded-xl">
                {alert.ic}
              </span>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <span className={`font-bold text-sm ${
                    alert.s === 'r'
                      ? 'text-red-900 dark:text-red-200'
                      : alert.s === 'w'
                      ? 'text-amber-900 dark:text-amber-200'
                      : 'text-emerald-900 dark:text-emerald-200'
                  }`}>
                    {lang === 'bn' ? alert.bn : alert.en}
                  </span>
                  <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded-full text-white ${
                    alert.s === 'r' ? 'bg-red-600' : alert.s === 'w' ? 'bg-amber-600' : 'bg-emerald-600'
                  }`}>
                    {alert.s === 'r' ? (lang === 'bn' ? 'জরুরি' : 'Urgent') : alert.s === 'w' ? (lang === 'bn' ? 'মাঝারি' : 'Warning') : (lang === 'bn' ? 'অনুকূল' : 'Optimal')}
                  </span>
                </div>

                <p className="text-xs text-stone-700 dark:text-stone-300 mt-1 leading-snug">
                  {lang === 'bn' ? alert.dbn : alert.den}
                </p>

                <div className="flex items-center justify-between mt-3 pt-2 border-t border-stone-200/60 dark:border-stone-800 text-[11px] text-stone-500 dark:text-stone-400">
                  <div className="flex gap-3">
                    <span className="flex items-center gap-1">
                      <Droplets className="w-3.5 h-3.5 text-blue-500" />
                      <span>{alert.humidity || '80%'}</span>
                    </span>
                    <span className="flex items-center gap-1">
                      <Wind className="w-3.5 h-3.5 text-stone-500" />
                      <span>{alert.temp || '29°C'}</span>
                    </span>
                  </div>

                  <button
                    onClick={() => speakText(lang === 'bn' ? `${alert.bn}। ${alert.dbn}` : `${alert.en}. ${alert.den}`, lang)}
                    className="flex items-center gap-1 font-bold text-emerald-700 dark:text-emerald-400"
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                    <span>{lang === 'bn' ? 'শুনুন' : 'Voice'}</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 5-Day Strip Forecast */}
      <div className="bg-white dark:bg-[#162419] p-4 rounded-2xl border border-stone-200 dark:border-stone-800 shadow-sm">
        <div className="text-xs font-bold text-stone-700 dark:text-stone-300 mb-3 flex items-center justify-between">
          <span className="flex items-center gap-1.5">
            <Calendar className="w-4 h-4 text-emerald-600" />
            <span>{lang === 'bn' ? '৫ দিনের পূর্বাভাস' : '5-Day Field Forecast'}</span>
          </span>
          <span className="text-[10px] text-stone-500 font-normal">{selectedDistrict}</span>
        </div>

        <div className="grid grid-cols-5 gap-1 text-center">
          {forecastDays.map((f, idx) => (
            <div
              key={idx}
              className={`p-2 rounded-xl border text-xs flex flex-col items-center gap-1 ${
                idx === 0
                  ? 'border-emerald-500 bg-emerald-50/60 dark:bg-emerald-950/40 text-emerald-900 dark:text-emerald-200 font-bold'
                  : 'border-stone-100 dark:border-stone-800 text-stone-700 dark:text-stone-300'
              }`}
            >
              <span className="text-[10px] text-stone-500">{lang === 'bn' ? f.dayBn : f.dayEn}</span>
              <span className="text-xl my-0.5">{f.icon}</span>
              <span className="text-[9px] font-semibold text-stone-600 dark:text-stone-400 truncate w-full">
                {lang === 'bn' ? f.condBn : f.condEn}
              </span>
              <span className="text-[10px] font-bold text-stone-800 dark:text-stone-200 mt-1">{f.temp}</span>
            </div>
          ))}
        </div>
      </div>

      {/* SMS Alert Subscription Card */}
      <div className="bg-stone-50 dark:bg-[#121c13] p-4 rounded-2xl border border-stone-200 dark:border-stone-800 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-950/50 text-blue-600 flex items-center justify-center text-xl">
            <MessageSquare className="w-5 h-5" />
          </div>
          <div>
            <div className="font-bold text-xs text-stone-900 dark:text-stone-100">
              {lang === 'bn' ? 'বিনামূল্যে এসএমএস সতর্কতা' : 'Free Mobile SMS Broadcast'}
            </div>
            <div className="text-[11px] text-stone-500 dark:text-stone-400">
              {lang === 'bn' ? 'ইন্টারনেট ছাড়াই ফোনে সরাসরি মেসেজ পান' : 'Receive instant SMS when storm/rain arrives'}
            </div>
          </div>
        </div>

        <button
          onClick={() => setSmsSubscribed(!smsSubscribed)}
          className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1 ${
            smsSubscribed
              ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 border border-emerald-300'
              : 'bg-stone-200 text-stone-700'
          }`}
        >
          {smsSubscribed ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-600" />
              <span>{lang === 'bn' ? 'চালু আছে' : 'Active'}</span>
            </>
          ) : (
            <span>{lang === 'bn' ? 'চালু করুন' : 'Enable'}</span>
          )}
        </button>
      </div>
    </div>
  );
};
