import React, { useState } from 'react';
import { 
  Building2, 
  Send, 
  CheckCircle, 
  Filter, 
  Search, 
  MapPin, 
  TrendingDown, 
  ArrowRight,
  ShieldCheck,
  Award
} from 'lucide-react';
import { Listing, Buyer, Language } from '../../types';
import { CROPS, BUYERS, DISTRICTS } from '../../data/mockData';
import { formatBDT } from '../../utils/formatters';

interface BuyerViewProps {
  listings: Listing[];
  buyers: Buyer[];
  selectedBuyerId: string;
  onSelectBuyer: (id: string) => void;
  onSendOffer: (listingId: string, discountPct: number) => void;
  lang: Language;
}

export const BuyerView: React.FC<BuyerViewProps> = ({
  listings,
  buyers,
  selectedBuyerId,
  onSelectBuyer,
  onSendOffer,
  lang,
}) => {
  const [filterCrop, setFilterCrop] = useState<string>('All');
  const activeBuyer = buyers.find((b) => b.id === selectedBuyerId) || buyers[0];

  const filtered = listings.filter((l) => {
    return filterCrop === 'All' || l.crop === filterCrop;
  });

  return (
    <div className="space-y-6 pb-20 lg:pb-8 animate-fade-in w-full">
      {/* Buyer Identity Switcher Header */}
      <div className="bg-white dark:bg-[#162419] p-5 rounded-2xl border border-stone-200 dark:border-stone-800 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="font-extrabold text-xl sm:text-2xl text-stone-900 dark:text-stone-100 flex items-center gap-2">
            <span>🏢</span>
            <span>{lang === 'bn' ? 'পাইকারি ক্রেতা ও মিল মালিক পোর্টাল' : 'Institutional Wholesale Buyer Hub'}</span>
          </h2>
          <p className="text-xs sm:text-sm text-stone-500 dark:text-stone-400 mt-0.5">
            {lang === 'bn' ? 'সরাসরি কৃষকের তালিকাভুক্ত ফসল পরিদর্শন করুন ও দরপ্রস্তাব পাঠান' : 'Directly review farmer lots across Bangladesh and place purchase bids'}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <label className="text-xs font-bold text-stone-600 dark:text-stone-300 hidden sm:block shrink-0">
            {lang === 'bn' ? 'ক্রেতার পরিচয়:' : 'Active Entity:'}
          </label>
          <div className="relative min-w-[260px]">
            <select
              value={selectedBuyerId}
              onChange={(e) => onSelectBuyer(e.target.value)}
              className="w-full h-11 px-3 pr-8 rounded-xl border-2 border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-[#121c13] text-stone-900 dark:text-stone-100 font-extrabold text-xs"
            >
              {buyers.map((b) => (
                <option key={b.id} value={b.id}>
                  {b.n} ({b.t})
                </option>
              ))}
            </select>
            <Building2 className="w-4 h-4 text-stone-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Filter by Crop Pills */}
      <div className="bg-white dark:bg-[#162419] p-3 rounded-2xl border border-stone-200 dark:border-stone-800 shadow-sm flex gap-1.5 overflow-x-auto pb-1 text-xs scrollbar-none">
        <button
          onClick={() => setFilterCrop('All')}
          className={`px-4 py-2 rounded-xl font-bold shrink-0 transition ${
            filterCrop === 'All'
              ? 'bg-emerald-700 text-white shadow-xs'
              : 'bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300 hover:bg-stone-200'
          }`}
        >
          {lang === 'bn' ? 'সব ফসল' : 'All Crops'}
        </button>
        {Object.keys(CROPS).map((k) => (
          <button
            key={k}
            onClick={() => setFilterCrop(k)}
            className={`px-4 py-2 rounded-xl font-bold shrink-0 transition flex items-center gap-1.5 ${
              filterCrop === k
                ? 'bg-emerald-700 text-white shadow-xs'
                : 'bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300 hover:bg-stone-200'
            }`}
          >
            <span>{CROPS[k].ic}</span>
            <span>{lang === 'bn' ? CROPS[k].bn.split(' ')[0] : CROPS[k].en.split(' ')[0]}</span>
          </button>
        ))}
      </div>

      {/* Responsive 3-Column Listings Grid on Desktop */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map((item) => {
          const crop = CROPS[item.crop] || CROPS.rice;
          const alreadyOffered = item.offers.some((o) => o.b.id === activeBuyer.id);

          return (
            <div
              key={item.id}
              className="bg-white dark:bg-[#162419] p-5 rounded-2xl border border-stone-200 dark:border-stone-800 shadow-sm space-y-4 flex flex-col justify-between hover:border-emerald-500/50 transition"
            >
              <div>
                <div className="flex items-start justify-between pb-3 border-b border-stone-100 dark:border-stone-800">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl p-2 bg-emerald-50 dark:bg-emerald-950/60 rounded-2xl">
                      {crop.ic}
                    </span>
                    <div>
                      <h3 className="font-extrabold text-base text-stone-900 dark:text-stone-100">
                        {lang === 'bn' ? crop.bn : crop.en}
                      </h3>
                      <div className="text-xs text-stone-500 dark:text-stone-400 mt-0.5">
                        👤 {item.farmer} · 📍 {item.dist}
                      </div>
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="text-[10px] text-stone-500 uppercase font-semibold">
                      {lang === 'bn' ? 'পরিমাণ' : 'Volume'}
                    </div>
                    <div className="text-sm font-extrabold text-stone-900 dark:text-stone-100">
                      {item.qty} {lang === 'bn' ? 'মণ' : 'md'}
                    </div>
                  </div>
                </div>

                <div className="my-3 p-3 bg-stone-50 dark:bg-[#121c13] rounded-xl flex items-center justify-between text-xs">
                  <span className="text-stone-500">
                    {lang === 'bn' ? 'কৃষকের চাওয়া পাইকারি দর:' : 'Farmer Asking Rate:'}
                  </span>
                  <span className="text-base font-black text-stone-900 dark:text-stone-100">
                    {formatBDT(item.ask, lang)}
                    <span className="text-[10px] text-stone-500 font-normal"> / {lang === 'bn' ? 'মণ' : 'md'}</span>
                  </span>
                </div>
              </div>

              {/* Bidding Actions */}
              {!item.sold ? (
                <div className="space-y-2 pt-2 border-t border-stone-100 dark:border-stone-800">
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => onSendOffer(item.id, 0)}
                      className="py-2.5 px-3 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-extrabold text-xs shadow-xs transition active:scale-95 flex items-center justify-center gap-1.5"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>{lang === 'bn' ? 'চাওয়া দরে বিড' : 'Bid at Ask'}</span>
                    </button>

                    <button
                      onClick={() => onSendOffer(item.id, 3)}
                      className="py-2.5 px-3 rounded-xl bg-amber-50 dark:bg-amber-950/40 text-amber-900 dark:text-amber-200 border border-amber-300 dark:border-amber-800 font-extrabold text-xs shadow-xs transition active:scale-95 flex items-center justify-center gap-1.5"
                    >
                      <TrendingDown className="w-3.5 h-3.5" />
                      <span>− ৩% {lang === 'bn' ? 'কাউন্টার' : 'Counter'}</span>
                    </button>
                  </div>

                  {alreadyOffered && (
                    <div className="text-[11px] font-bold text-emerald-700 dark:text-emerald-400 flex items-center justify-center gap-1">
                      <CheckCircle className="w-3.5 h-3.5" />
                      <span>{lang === 'bn' ? 'আপনার দরপ্রস্তাব সক্রিয় রয়েছে' : 'Bid active on this lot'}</span>
                    </div>
                  )}
                </div>
              ) : (
                <div className="p-3 bg-emerald-50 dark:bg-emerald-950/40 rounded-xl text-center text-xs font-bold text-emerald-800 dark:text-emerald-300">
                  {lang === 'bn' ? 'এই চালানটির বিক্রয় চুক্তি সম্পন্ন হয়েছে' : 'Sold & settled with buyer'}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
