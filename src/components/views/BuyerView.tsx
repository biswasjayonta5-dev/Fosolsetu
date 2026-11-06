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
  ShieldCheck
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
    <div className="space-y-4 pb-20 animate-fade-in">
      {/* Buyer Identity Switcher */}
      <div className="bg-white dark:bg-[#162419] p-4 rounded-2xl border border-stone-200 dark:border-stone-800 shadow-sm space-y-2">
        <label className="block text-xs font-bold text-stone-700 dark:text-stone-300">
          {lang === 'bn' ? 'ক্রেতার পরিচয় নির্বাচন' : 'Bidding As Verified Buyer:'}
        </label>
        <div className="relative">
          <select
            value={selectedBuyerId}
            onChange={(e) => onSelectBuyer(e.target.value)}
            className="w-full h-11 px-3 pr-8 rounded-xl border-2 border-stone-200 dark:border-stone-800 bg-white dark:bg-[#121c13] text-stone-900 dark:text-stone-100 font-bold text-xs"
          >
            {buyers.map((b) => (
              <option key={b.id} value={b.id}>
                {b.n} ({b.t} · {b.d})
              </option>
            ))}
          </select>
          <Building2 className="w-4 h-4 text-stone-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
        </div>
      </div>

      {/* Filter by Crop */}
      <div className="flex gap-1.5 overflow-x-auto pb-1 text-xs scrollbar-none">
        <button
          onClick={() => setFilterCrop('All')}
          className={`px-3 py-1.5 rounded-full font-semibold shrink-0 transition ${
            filterCrop === 'All'
              ? 'bg-emerald-700 text-white'
              : 'bg-white dark:bg-[#162419] border border-stone-200 dark:border-stone-800 text-stone-600 dark:text-stone-300'
          }`}
        >
          {lang === 'bn' ? 'সব ফসল' : 'All Crops'}
        </button>
        {Object.keys(CROPS).map((k) => (
          <button
            key={k}
            onClick={() => setFilterCrop(k)}
            className={`px-3 py-1.5 rounded-full font-semibold shrink-0 transition flex items-center gap-1 ${
              filterCrop === k
                ? 'bg-emerald-700 text-white'
                : 'bg-white dark:bg-[#162419] border border-stone-200 dark:border-stone-800 text-stone-600 dark:text-stone-300'
            }`}
          >
            <span>{CROPS[k].ic}</span>
            <span>{lang === 'bn' ? CROPS[k].bn.split(' ')[0] : CROPS[k].en.split(' ')[0]}</span>
          </button>
        ))}
      </div>

      {/* Listings List for Bidding */}
      <div className="space-y-3">
        {filtered.map((item) => {
          const crop = CROPS[item.crop] || CROPS.rice;
          const alreadyOffered = item.offers.some((o) => o.b.id === activeBuyer.id);

          return (
            <div
              key={item.id}
              className="bg-white dark:bg-[#162419] p-4 rounded-2xl border border-stone-200 dark:border-stone-800 shadow-sm space-y-3"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2.5">
                  <span className="text-3xl p-1.5 bg-emerald-50 dark:bg-emerald-950/50 rounded-xl">
                    {crop.ic}
                  </span>
                  <div>
                    <h3 className="font-bold text-sm text-stone-900 dark:text-stone-100">
                      {lang === 'bn' ? crop.bn : crop.en} · {item.qty} {lang === 'bn' ? 'মণ' : 'maunds'}
                    </h3>
                    <div className="text-[11px] text-stone-500 dark:text-stone-400">
                      👤 {item.farmer} · 📍 {item.dist}
                    </div>
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-[10px] text-stone-500 uppercase font-semibold">
                    {lang === 'bn' ? 'কৃষকের চাওয়া দর' : 'Farmer Ask'}
                  </div>
                  <div className="text-base font-extrabold text-stone-900 dark:text-stone-100">
                    {formatBDT(item.ask, lang)}
                    <span className="text-[10px] text-stone-500 font-normal"> / {lang === 'bn' ? 'মণ' : 'md'}</span>
                  </div>
                </div>
              </div>

              {/* Quick Bid Actions */}
              {!item.sold ? (
                <div className="pt-2 border-t border-stone-100 dark:border-stone-800 flex items-center gap-2">
                  <button
                    onClick={() => onSendOffer(item.id, 0)}
                    className="flex-1 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs shadow-xs transition active:scale-95 flex items-center justify-center gap-1"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>{lang === 'bn' ? 'চাওয়া দরে অফার' : 'Offer At Ask'}</span>
                  </button>

                  <button
                    onClick={() => onSendOffer(item.id, 3)}
                    className="flex-1 py-2.5 rounded-xl bg-amber-50 dark:bg-amber-950/40 text-amber-900 dark:text-amber-200 border border-amber-300 dark:border-amber-800 font-bold text-xs shadow-xs transition active:scale-95 flex items-center justify-center gap-1"
                  >
                    <TrendingDown className="w-3.5 h-3.5" />
                    <span>− ৩% {lang === 'bn' ? 'কাউন্টার দর' : 'Counter'}</span>
                  </button>
                </div>
              ) : (
                <div className="p-2 bg-emerald-50 dark:bg-emerald-950/40 rounded-xl text-center text-xs font-bold text-emerald-800 dark:text-emerald-300">
                  {lang === 'bn' ? 'এই চালানটি ইতিমধ্যে বিক্রি হয়ে গেছে' : 'This lot has been sold'}
                </div>
              )}

              {alreadyOffered && !item.sold && (
                <div className="text-[11px] font-semibold text-emerald-700 dark:text-emerald-400 flex items-center gap-1">
                  <CheckCircle className="w-3.5 h-3.5" />
                  <span>{lang === 'bn' ? 'আপনার দরপ্রস্তাব পাঠানো হয়েছে' : 'Your bid is active'}</span>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
