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
  Volume2,
  ShieldAlert,
  SunMedium
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
    { dayBn: 'আজ', dayEn: 'Today', icon: '🌧️', condBn: 'ভারী বৃষ্টি', condEn: 'Heavy Rain', temp: '28° / 23°', precip: '85%' },
    { dayBn: 'আগামীকাল', dayEn: 'Tomorrow', icon: '🌦️', condBn: 'বিক্ষিপ্ত বৃষ্টি', condEn: 'Scattered Showers', temp: '29° / 24°', precip: '55%' },
    { dayBn: 'বৃহস্পতিবার', dayEn: 'Thursday', icon: '💨', condBn: 'কালবৈশাখী ঝড়', condEn: 'Gusty Wind', temp: '31° / 22°', precip: '60%' },
    { dayBn: 'শুক্রবার', dayEn: 'Friday', icon: '⛅', condBn: 'আংশিক মেঘলা', condEn: 'Partly Cloudy', temp: '32° / 25°', precip: '20%' },
    { dayBn: 'শনিবার', dayEn: 'Saturday', icon: '☀️', condBn: 'রোদ ঝলমলে', condEn: 'Sunny & Dry', temp: '33° / 24°', precip: '5%' },
  ];

  return (
    <div className="space-y-6 pb-20 lg:pb-8 animate-fade-in w-full">
      {/* Header and District Switcher */}
      <div className="bg-white dark:bg-[#162419] p-5 rounded-2xl border border-stone-200 dark:border-stone-800 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="font-extrabold text-xl sm:text-2xl text-stone-900 dark:text-stone-100 flex items-center gap-2">
            <span>🌦️</span>
            <span>{lang === 'bn' ? 'আবহাওয়া রাডার ও কৃষি স্প্রে পরামর্শ' : 'Agricultural Weather Radar & Spray Advisory'}</span>
          </h2>
          <p className="text-xs sm:text-sm text-stone-500 dark:text-stone-400 mt-0.5">
            {lang === 'bn' ? 'বাংলাদেশ আবহাওয়া অধিদপ্তর ও স্যাটেলাইট ভিত্তিক ৭২ ঘণ্টার পূর্বাভাস' : 'Satellite hyper-local precipitation & storm forecast tailored for farming operations'}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-xs font-bold text-stone-500 hidden sm:inline">
            {lang === 'bn' ? 'জেলা নির্বাচন:' : 'Select District:'}
          </span>
          <select
            value={selectedDistrict}
            onChange={(e) => setSelectedDistrict(e.target.value)}
            className="h-11 px-4 rounded-xl border-2 border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-[#121c13] text-xs sm:text-sm font-bold text-stone-900 dark:text-stone-100 focus:border-emerald-600 focus:outline-hidden"
          >
            {DISTRICTS.map((d) => (
              <option key={d} value={d}>
                {d} District
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Extreme Weather Warnings: 2 or 3 Column Grid on Tablets & Desktop */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {WEATHER_ALERTS.map((alert, i) => (
          <div
            key={i}
            className={`p-5 rounded-2xl border-2 shadow-xs transition flex flex-col justify-between ${
              alert.s === 'r'
                ? 'bg-red-50/80 dark:bg-[#2c1515] border-red-500/50'
                : alert.s === 'w'
                ? 'bg-amber-50/80 dark:bg-[#2b2014] border-amber-500/50'
                : 'bg-emerald-50/80 dark:bg-[#15291b] border-emerald-500/50'
            }`}
          >
            <div>
              <div className="flex items-start justify-between gap-3 mb-3">
                <span className="text-3xl p-1.5 bg-white/80 dark:bg-black/30 rounded-xl shadow-xs shrink-0">
                  {alert.ic}
                </span>
                <span className={`text-[10px] uppercase font-bold px-2.5 py-0.5 rounded-full text-white ${
                  alert.s === 'r' ? 'bg-red-600' : alert.s === 'w' ? 'bg-amber-600' : 'bg-emerald-600'
                }`}>
                  {alert.s === 'r' ? (lang === 'bn' ? 'জরুরি রেড অ্যালার্ট' : 'Critical Alert') : alert.s === 'w' ? (lang === 'bn' ? 'সতর্কবার্তা' : 'Warning') : (lang === 'bn' ? 'অনুকূল' : 'Optimal')}
                </span>
              </div>

              <h3 className={`font-extrabold text-sm sm:text-base ${
                alert.s === 'r'
                  ? 'text-red-900 dark:text-red-200'
                  : alert.s === 'w'
                  ? 'text-amber-900 dark:text-amber-200'
                  : 'text-emerald-900 dark:text-emerald-200'
              }`}>
                {lang === 'bn' ? alert.bn : alert.en}
              </h3>

              <p className="text-xs text-stone-700 dark:text-stone-300 mt-1.5 leading-relaxed">
                {lang === 'bn' ? alert.dbn : alert.den}
              </p>
            </div>

            <div className="flex items-center justify-between mt-4 pt-3 border-t border-stone-200/60 dark:border-stone-800 text-xs text-stone-500 dark:text-stone-400">
              <div className="flex gap-3">
                <span className="flex items-center gap-1 font-semibold">
                  <Droplets className="w-3.5 h-3.5 text-blue-500" />
                  <span>{alert.humidity || '80%'}</span>
                </span>
                <span className="flex items-center gap-1 font-semibold">
                  <Wind className="w-3.5 h-3.5 text-stone-500" />
                  <span>{alert.temp || '29°C'}</span>
                </span>
              </div>

              <button
                onClick={() => speakText(lang === 'bn' ? `${alert.bn}। ${alert.dbn}` : `${alert.en}. ${alert.den}`, lang)}
                className="flex items-center gap-1 font-bold text-emerald-700 dark:text-emerald-400 hover:underline"
              >
                <Volume2 className="w-3.5 h-3.5" />
                <span>{lang === 'bn' ? 'শুনুন' : 'Voice'}</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* 5-Day Strip Forecast: 5 Columns on Desktop */}
      <div className="bg-white dark:bg-[#162419] p-5 sm:p-6 rounded-2xl border border-stone-200 dark:border-stone-800 shadow-sm space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-stone-100 dark:border-stone-800">
          <div className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-emerald-600" />
            <h3 className="font-extrabold text-sm sm:text-base text-stone-900 dark:text-stone-100">
              {lang === 'bn' ? '৫ দিনের আবহাওয়া ও বৃষ্টিপাতের সম্ভাবনা' : '5-Day Hyper-Local Agricultural Forecast'}
            </h3>
          </div>
          <span className="text-xs text-stone-500 font-bold">{selectedDistrict} District</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 text-center">
          {forecastDays.map((f, idx) => (
            <div
              key={idx}
              className={`p-4 rounded-2xl border text-xs flex flex-col items-center justify-between gap-2 ${
                idx === 0
                  ? 'border-emerald-500 bg-emerald-50/70 dark:bg-emerald-950/40 text-emerald-900 dark:text-emerald-200 font-bold ring-1 ring-emerald-500'
                  : 'border-stone-200 dark:border-stone-800 bg-stone-50/50 dark:bg-[#121c13] text-stone-700 dark:text-stone-300'
              }`}
            >
              <span className="text-xs font-bold text-stone-500">{lang === 'bn' ? f.dayBn : f.dayEn}</span>
              <span className="text-3xl my-1">{f.icon}</span>
              <span className="text-xs font-bold truncate w-full">
                {lang === 'bn' ? f.condBn : f.condEn}
              </span>
              <div className="w-full pt-2 border-t border-stone-200/50 dark:border-stone-800 flex justify-between items-center text-[11px] font-bold">
                <span>{f.temp}</span>
                <span className="text-blue-600 flex items-center gap-0.5">
                  <Droplets className="w-3 h-3" />
                  <span>{f.precip}</span>
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* SMS Broadcast Notification Toggle Banner */}
      <div className="bg-stone-50 dark:bg-[#121c13] p-5 rounded-2xl border border-stone-200 dark:border-stone-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-2xl bg-blue-100 dark:bg-blue-950/50 text-blue-600 flex items-center justify-center text-2xl shrink-0">
            <MessageSquare className="w-6 h-6" />
          </div>
          <div>
            <div className="font-extrabold text-sm sm:text-base text-stone-900 dark:text-stone-100">
              {lang === 'bn' ? 'বিনামূল্যে মোবাইল এসএমএস আবহাওয়া সম্প্রচার' : 'Free Automated Mobile Weather SMS Broadcast'}
            </div>
            <div className="text-xs text-stone-500 dark:text-stone-400 mt-0.5">
              {lang === 'bn'
                ? 'ইন্টারনেট বা স্মার্টফোন ডেটা বন্ধ থাকলেও ঝড় বা ভারী বৃষ্টির ৩ ঘণ্টা আগে মোবাইল ফোনে জরুরি বার্তা পাবেন।'
                : 'Receive real-time storm & rain alerts directly via GSM SMS 3 hours in advance even without internet.'}
            </div>
          </div>
        </div>

        <button
          onClick={() => setSmsSubscribed(!smsSubscribed)}
          className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-extrabold transition flex items-center justify-center gap-2 shrink-0 ${
            smsSubscribed
              ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 border border-emerald-300'
              : 'bg-stone-200 text-stone-700 hover:bg-stone-300'
          }`}
        >
          {smsSubscribed ? (
            <>
              <Check className="w-4 h-4 text-emerald-600" />
              <span>{lang === 'bn' ? 'এসএমএস অ্যালার্ট চালু আছে' : 'SMS Alert Enabled'}</span>
            </>
          ) : (
            <span>{lang === 'bn' ? 'এসএমএস সেবা চালু করুন' : 'Enable Free SMS Alerts'}</span>
          )}
        </button>
      </div>
    </div>
  );
};
