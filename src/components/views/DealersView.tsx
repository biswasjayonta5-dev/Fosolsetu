import React, { useState } from 'react';
import { Store, Phone, MapPin, Search, Star, ShieldCheck, Tag, CheckCircle2 } from 'lucide-react';
import { Dealer, Language } from '../../types';
import { DEALERS, DISTRICTS } from '../../data/mockData';

interface DealersViewProps {
  lang: Language;
  onCall: (phone: string, name: string) => void;
}

export const DealersView: React.FC<DealersViewProps> = ({ lang, onCall }) => {
  const [search, setSearch] = useState('');
  const [filterDist, setFilterDist] = useState('All');

  const filteredDealers = DEALERS.filter((d) => {
    const matchSearch =
      d.n.toLowerCase().includes(search.toLowerCase()) ||
      d.i.toLowerCase().includes(search.toLowerCase()) ||
      d.d.toLowerCase().includes(search.toLowerCase());
    const matchDist = filterDist === 'All' || d.d === filterDist;
    return matchSearch && matchDist;
  }).sort((a, b) => (b.f ? 1 : 0) - (a.f ? 1 : 0));

  return (
    <div className="space-y-6 pb-20 lg:pb-8 animate-fade-in w-full">
      {/* Title Header */}
      <div className="bg-white dark:bg-[#162419] p-5 rounded-2xl border border-stone-200 dark:border-stone-800 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="font-extrabold text-xl sm:text-2xl text-stone-900 dark:text-stone-100 flex items-center gap-2">
            <span>🏪</span>
            <span>{lang === 'bn' ? 'অনুমোদিত সার ও বীজের ডিলার ডিরেক্টরি' : 'Certified Agro Input Dealers & Stockists'}</span>
          </h2>
          <p className="text-xs sm:text-sm text-stone-500 dark:text-stone-400 mt-0.5">
            {lang === 'bn'
              ? 'বাংলাদেশ কৃষি উন্নয়ন কর্পোরেশন (BADC) নিবন্ধিত ডিলারদের কাছ থেকে সরকারি মূল্যে আসল সার ও বীজ কিনুন'
              : 'Direct hotline to certified fertilizer, hybrid seed, and micronutrient stockists at government fixed rates'}
          </p>
        </div>

        <span className="self-start md:self-auto px-3 py-1.5 rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 border border-emerald-300 text-xs font-bold flex items-center gap-1.5">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>{lang === 'bn' ? '১০০% ভেজালমুক্ত গ্যারান্টি' : 'BADC Certified Quality'}</span>
        </span>
      </div>

      {/* Search & Filter Bar */}
      <div className="bg-white dark:bg-[#162419] p-4 rounded-2xl border border-stone-200 dark:border-stone-800 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div className="relative flex-1 max-w-md">
          <input
            type="text"
            placeholder={lang === 'bn' ? 'দোকানের নাম, ইউরিয়া, ডিএপি বা বীজের ধরন খুঁজুন...' : 'Search by store name, DAP, Urea, seed type...'}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full h-11 pl-10 pr-4 rounded-xl border border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-[#121c13] text-xs font-semibold text-stone-900 dark:text-stone-100 focus:outline-hidden focus:border-emerald-600"
          />
          <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
        </div>

        {/* District Filter Pills */}
        <div className="flex gap-1.5 overflow-x-auto pb-1 scrollbar-none text-xs">
          <button
            onClick={() => setFilterDist('All')}
            className={`px-3.5 py-2 rounded-xl font-bold shrink-0 transition ${
              filterDist === 'All'
                ? 'bg-emerald-700 text-white shadow-xs'
                : 'bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300 hover:bg-stone-200'
            }`}
          >
            {lang === 'bn' ? 'সব জেলা' : 'All Districts'}
          </button>
          {DISTRICTS.slice(0, 6).map((d) => (
            <button
              key={d}
              onClick={() => setFilterDist(d)}
              className={`px-3.5 py-2 rounded-xl font-bold shrink-0 transition ${
                filterDist === d
                  ? 'bg-emerald-700 text-white shadow-xs'
                  : 'bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300 hover:bg-stone-200'
              }`}
            >
              {d}
            </button>
          ))}
        </div>
      </div>

      {/* 3-Column Responsive Grid on Desktop */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredDealers.map((d, idx) => (
          <div
            key={idx}
            className={`bg-white dark:bg-[#162419] p-5 rounded-2xl border shadow-sm space-y-4 flex flex-col justify-between transition ${
              d.f ? 'border-amber-400/80 dark:border-amber-600/60 ring-2 ring-amber-400/20' : 'border-stone-200 dark:border-stone-800'
            }`}
          >
            <div>
              <div className="flex items-start justify-between gap-2 pb-3 border-b border-stone-100 dark:border-stone-800">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-extrabold text-base text-stone-900 dark:text-stone-100">{d.n}</h3>
                    {d.f && (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300 border border-amber-300 text-[10px] font-extrabold">
                        <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
                        <span>{lang === 'bn' ? 'সেরা ডিলার' : 'Top Stockist'}</span>
                      </span>
                    )}
                  </div>
                  <div className="text-xs text-stone-500 dark:text-stone-400 flex items-center gap-1 mt-1">
                    <MapPin className="w-3.5 h-3.5 text-stone-400" />
                    <span>{d.d} District · BADC লাইসেন্সপ্রাপ্ত</span>
                  </div>
                </div>
              </div>

              <div className="my-3 p-3 bg-stone-50 dark:bg-[#121c13] rounded-xl border border-stone-100 dark:border-stone-800 flex items-start gap-2.5 text-xs">
                <Tag className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <div className="text-stone-700 dark:text-stone-300">
                  <span className="font-bold text-stone-500 dark:text-stone-400 block text-[10px] uppercase">
                    {lang === 'bn' ? 'মজুদ সামগ্রী ও সার' : 'In-Stock Agro Inputs'}
                  </span>
                  <span className="leading-relaxed mt-0.5 block">{d.i}</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => onCall(d.phone, d.n)}
              className="w-full py-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 hover:bg-emerald-100 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800 font-extrabold text-xs sm:text-sm flex items-center justify-center gap-2 active:scale-98 transition shadow-xs"
            >
              <Phone className="w-4 h-4 text-emerald-600" />
              <span>{lang === 'bn' ? `দোকানে কল করুন (${d.phone})` : `Call Dealer (${d.phone})`}</span>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
