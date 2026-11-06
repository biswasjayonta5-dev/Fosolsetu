import React, { useState } from 'react';
import { Store, Phone, MapPin, Search, Star, ShieldCheck, Tag } from 'lucide-react';
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
    <div className="space-y-4 pb-20 animate-fade-in">
      {/* Title */}
      <div>
        <h2 className="font-bold text-base text-stone-900 dark:text-stone-100 flex items-center gap-2">
          <span>🏪</span>
          <span>{lang === 'bn' ? 'অনুমোদিত সার ও বীজের ডিলার' : 'Certified Agro Input Dealers'}</span>
        </h2>
        <p className="text-xs text-stone-500 dark:text-stone-400">
          {lang === 'bn'
            ? 'সরকারি নির্ধারিত মূল্যে খাঁটি বীজ ও সার সরাসরি অর্ডার করুন'
            : 'Direct access to verified fertilizer, seed & equipment stockists'}
        </p>
      </div>

      {/* Search & Filter Bar */}
      <div className="space-y-2">
        <div className="relative">
          <input
            type="text"
            placeholder={lang === 'bn' ? 'দোকান, বীজ বা সারের নাম খুঁজুন...' : 'Search by dealer, crop seed or DAP...'}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full h-11 pl-10 pr-4 rounded-xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-[#121c13] text-xs font-medium text-stone-900 dark:text-stone-100 focus:outline-hidden focus:border-emerald-600"
          />
          <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
        </div>

        {/* District Filter Pills */}
        <div className="flex gap-1.5 overflow-x-auto pb-1 scrollbar-none text-xs">
          <button
            onClick={() => setFilterDist('All')}
            className={`px-3 py-1.5 rounded-full font-semibold shrink-0 transition ${
              filterDist === 'All'
                ? 'bg-emerald-700 text-white'
                : 'bg-white dark:bg-[#162419] border border-stone-200 dark:border-stone-800 text-stone-600 dark:text-stone-300'
            }`}
          >
            {lang === 'bn' ? 'সব জেলা' : 'All Districts'}
          </button>
          {DISTRICTS.slice(0, 6).map((d) => (
            <button
              key={d}
              onClick={() => setFilterDist(d)}
              className={`px-3 py-1.5 rounded-full font-semibold shrink-0 transition ${
                filterDist === d
                  ? 'bg-emerald-700 text-white'
                  : 'bg-white dark:bg-[#162419] border border-stone-200 dark:border-stone-800 text-stone-600 dark:text-stone-300'
              }`}
            >
              {d}
            </button>
          ))}
        </div>
      </div>

      {/* Dealers List */}
      <div className="space-y-3">
        {filteredDealers.map((d, idx) => (
          <div
            key={idx}
            className={`bg-white dark:bg-[#162419] p-4 rounded-2xl border shadow-sm space-y-3 transition ${
              d.f ? 'border-amber-400/60 dark:border-amber-600/40 ring-1 ring-amber-400/30' : 'border-stone-200 dark:border-stone-800'
            }`}
          >
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-bold text-sm text-stone-900 dark:text-stone-100">{d.n}</h3>
                  {d.f && (
                    <span className="inline-flex items-center gap-0.5 px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300 border border-amber-300 text-[10px] font-bold">
                      <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
                      <span>{lang === 'bn' ? 'বিশ্বস্ত' : 'Featured'}</span>
                    </span>
                  )}
                </div>
                <div className="text-xs text-stone-500 dark:text-stone-400 flex items-center gap-1 mt-0.5">
                  <MapPin className="w-3.5 h-3.5 text-stone-400" />
                  <span>{d.d} · বাংলাদেশ কৃষি উন্নয়ন কর্পোরেশন (BADC) লাইসেন্সপ্রাপ্ত</span>
                </div>
              </div>
            </div>

            <div className="p-2.5 bg-stone-50 dark:bg-[#121c13] rounded-xl border border-stone-100 dark:border-stone-800 flex items-start gap-2 text-xs">
              <Tag className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <div className="text-stone-700 dark:text-stone-300">
                <span className="font-semibold text-stone-500 dark:text-stone-400 block text-[10px] uppercase">
                  {lang === 'bn' ? 'মজুদ সামগ্রী' : 'Available Inputs'}
                </span>
                <span>{d.i}</span>
              </div>
            </div>

            <button
              onClick={() => onCall(d.phone, d.n)}
              className="w-full py-2.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 hover:bg-emerald-100 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800 font-bold text-xs flex items-center justify-center gap-2 active:scale-98 transition"
            >
              <Phone className="w-3.5 h-3.5 text-emerald-600" />
              <span>{lang === 'bn' ? `দোকানে সরাসরি কল করুন (${d.phone})` : `Direct Call (${d.phone})`}</span>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
