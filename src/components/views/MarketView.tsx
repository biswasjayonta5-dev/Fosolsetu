import React, { useState } from 'react';
import { 
  ShoppingBag, 
  Plus, 
  CheckCircle, 
  XCircle, 
  Building2, 
  TrendingUp, 
  ShieldCheck, 
  Receipt, 
  Clock, 
  ArrowRight,
  Filter
} from 'lucide-react';
import { Listing, Offer, CropPlan, Language, CropInfo } from '../../types';
import { CROPS, BUYERS } from '../../data/mockData';
import { formatBDT } from '../../utils/formatters';

interface MarketViewProps {
  listings: Listing[];
  plans: CropPlan[];
  onCreateListing: (listing: Listing) => void;
  onDecideOffer: (listingId: string, offerId: string, accept: boolean) => void;
  lang: Language;
}

export const MarketView: React.FC<MarketViewProps> = ({
  listings,
  plans,
  onCreateListing,
  onDecideOffer,
  lang,
}) => {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedPlanId, setSelectedPlanId] = useState<number>(plans[0]?.id || 0);
  const [qty, setQty] = useState<number>(100);
  const [askPrice, setAskPrice] = useState<number>(1650);

  const activePlans = plans.filter((p) => p.status !== 'offer');

  const handleCreateListing = (e: React.FormEvent) => {
    e.preventDefault();
    const plan = plans.find((p) => p.id === selectedPlanId) || plans[0];
    const cropKey = plan ? plan.crop : 'rice';
    const dist = plan ? plan.dist : 'Bogura';

    const newListing: Listing = {
      id: 'L_' + Date.now(),
      farmer: lang === 'bn' ? 'আপনি (স্বত্বাধিকারী)' : 'You (Farm Owner)',
      crop: cropKey,
      qty,
      ask: askPrice,
      dist,
      offers: [],
      plan: plan?.id,
      mine: true,
    };

    onCreateListing(newListing);
    setShowCreateModal(false);
  };

  return (
    <div className="space-y-4 pb-20 animate-fade-in">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-emerald-800 to-green-900 text-white p-4 rounded-2xl shadow-sm flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xl">🧺</span>
            <h2 className="font-bold text-base">
              {lang === 'bn' ? 'সরাসরি কৃষক বাজার' : 'Direct Farmer Marketplace'}
            </h2>
          </div>
          <p className="text-xs text-emerald-200 mt-0.5">
            {lang === 'bn' ? 'মধ্যস্বত্বভোগী ছাড়া সরাসরি পাইকারি বিক্রি · ০% কমিশন' : 'Sell to verified mills & exporters · 0% trade commission'}
          </p>
        </div>

        <button
          onClick={() => setShowCreateModal(true)}
          className="px-3 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-stone-900 font-bold text-xs shadow-md transition flex items-center gap-1 active:scale-95 shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>{lang === 'bn' ? 'ফসল যোগ করুন' : 'List Crop'}</span>
        </button>
      </div>

      {/* Zero Commission Guarantee Ribbon */}
      <div className="p-3 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-800 rounded-xl flex items-center justify-between text-xs">
        <span className="font-semibold text-emerald-900 dark:text-emerald-200 flex items-center gap-1.5">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>{lang === 'bn' ? '১০০% কমিশন-মুক্ত বিক্রয় চুক্তি' : '100% Commission-Free Guaranteed'}</span>
        </span>
        <span className="font-black text-emerald-700 dark:text-emerald-400">৳0 ফি</span>
      </div>

      {/* Listing Form Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-white dark:bg-[#1a271c] rounded-2xl max-w-sm w-full shadow-2xl border border-stone-200 dark:border-stone-800 p-5 space-y-4">
            <div className="flex justify-between items-center pb-2 border-b border-stone-200 dark:border-stone-800">
              <h3 className="font-bold text-sm text-stone-900 dark:text-stone-100 flex items-center gap-1.5">
                <Plus className="w-4 h-4 text-emerald-600" />
                <span>{lang === 'bn' ? 'নতুন ফসল বিক্রির তালিকা দিন' : 'List Harvest for Sale'}</span>
              </h3>
              <button
                onClick={() => setShowCreateModal(false)}
                className="w-7 h-7 rounded-full bg-stone-100 dark:bg-stone-800 flex items-center justify-center text-stone-500"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateListing} className="space-y-3">
              {activePlans.length > 0 ? (
                <div>
                  <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1">
                    {lang === 'bn' ? 'সংযুক্ত ফসলের পরিকল্পনা' : 'Linked Crop Plan'}
                  </label>
                  <select
                    value={selectedPlanId}
                    onChange={(e) => {
                      const pid = parseInt(e.target.value);
                      setSelectedPlanId(pid);
                      const p = plans.find((x) => x.id === pid);
                      if (p && CROPS[p.crop]) {
                        setAskPrice(CROPS[p.crop].pr);
                        setQty(p.land * CROPS[p.crop].y);
                      }
                    }}
                    className="w-full h-11 px-3 rounded-xl border-2 border-stone-200 dark:border-stone-800 bg-white dark:bg-[#121c13] text-stone-900 dark:text-stone-100 font-semibold text-xs"
                  >
                    {activePlans.map((p) => (
                      <option key={p.id} value={p.id}>
                        {CROPS[p.crop]?.ic} {lang === 'bn' ? CROPS[p.crop]?.bn : CROPS[p.crop]?.en} · {p.land} বিঘা
                      </option>
                    ))}
                  </select>
                </div>
              ) : (
                <div className="p-3 bg-amber-50 dark:bg-amber-950/40 rounded-xl text-xs text-amber-900 dark:text-amber-200">
                  {lang === 'bn'
                    ? 'আপনি সাধারণ তালিকা হিসেবে পোস্ট করছেন (কোনো সক্রিয় প্ল্যান নেই)'
                    : 'Posting as open market listing'}
                </div>
              )}

              <div>
                <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1">
                  {lang === 'bn' ? 'বিক্রির পরিমাণ (মণ)' : 'Quantity in Maunds (মণ)'}
                </label>
                <input
                  type="number"
                  min="1"
                  value={qty}
                  onChange={(e) => setQty(Math.max(1, parseInt(e.target.value) || 1))}
                  className="w-full h-11 px-3 rounded-xl border-2 border-stone-200 dark:border-stone-800 bg-white dark:bg-[#121c13] text-stone-900 dark:text-stone-100 font-bold text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1">
                  {lang === 'bn' ? 'আপনার চাওয়া দর প্রতি মণ (টাকা)' : 'Your Asking Price / Maund (BDT)'}
                </label>
                <input
                  type="number"
                  min="100"
                  value={askPrice}
                  onChange={(e) => setAskPrice(Math.max(100, parseInt(e.target.value) || 100))}
                  className="w-full h-11 px-3 rounded-xl border-2 border-stone-200 dark:border-stone-800 bg-white dark:bg-[#121c13] text-stone-900 dark:text-stone-100 font-bold text-sm"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs shadow-md transition flex items-center justify-center gap-1.5"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>{lang === 'bn' ? 'বাজারে প্রকাশ করুন' : 'Publish Listing'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Active Listings Feed */}
      <div className="space-y-3">
        {listings.map((item) => {
          const crop = CROPS[item.crop] || CROPS.rice;
          return (
            <div
              key={item.id}
              className="bg-white dark:bg-[#162419] rounded-2xl border border-stone-200 dark:border-stone-800 p-4 shadow-sm space-y-3"
            >
              {/* Header Info */}
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
                      📍 {item.dist} · {item.farmer}
                    </div>
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-[10px] text-stone-500 uppercase font-semibold">
                    {lang === 'bn' ? 'চাওয়া দর' : 'Asking Price'}
                  </div>
                  <div className="text-base font-extrabold text-emerald-700 dark:text-emerald-400">
                    {formatBDT(item.ask, lang)}
                    <span className="text-[10px] text-stone-500 font-normal"> / {lang === 'bn' ? 'মণ' : 'md'}</span>
                  </div>
                </div>
              </div>

              {/* Deal Settled Receipt or Incoming Bids */}
              {item.sold ? (
                /* Settled deal card */
                <div className="bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-800 rounded-xl p-3.5 space-y-2">
                  <div className="flex items-center justify-between pb-2 border-b border-emerald-200 dark:border-emerald-800">
                    <span className="font-bold text-xs text-emerald-900 dark:text-emerald-200 flex items-center gap-1.5">
                      <CheckCircle className="w-4 h-4 text-emerald-600" />
                      <span>{lang === 'bn' ? 'চুক্তি সম্পন্ন হয়েছে' : 'Deal Confirmed & Settled'}</span>
                    </span>
                    <span className="text-[11px] font-semibold text-emerald-800 dark:text-emerald-300">
                      {item.sold.b.n}
                    </span>
                  </div>

                  {(() => {
                    const gross = item.sold.price * item.sold.qty;
                    const linkedPlan = plans.find((p) => p.id === item.plan);
                    const advanceRepaid = linkedPlan && linkedPlan.status !== 'offer' ? linkedPlan.rep : 0;
                    const netKept = gross - advanceRepaid;

                    return (
                      <div className="space-y-1 text-xs">
                        <div className="flex justify-between text-stone-600 dark:text-stone-300">
                          <span>{lang === 'bn' ? 'মোট বিক্রয় মূল্য' : 'Gross Sale Value'}</span>
                          <span className="font-bold text-stone-800 dark:text-stone-200">{formatBDT(gross, lang)}</span>
                        </div>
                        <div className="flex justify-between text-stone-600 dark:text-stone-300">
                          <span>{lang === 'bn' ? 'প্ল্যাটফর্ম কমিশন' : 'Platform Commission'}</span>
                          <span className="font-bold text-emerald-600 dark:text-emerald-400">৳0 (ফ্রি)</span>
                        </div>
                        {advanceRepaid > 0 && (
                          <div className="flex justify-between text-stone-600 dark:text-stone-300">
                            <span>{lang === 'bn' ? 'স্বয়ংক্রিয় অগ্রিম কর্তন' : 'Advance Repayment Deducted'}</span>
                            <span className="font-bold text-red-600 dark:text-red-400">− {formatBDT(advanceRepaid, lang)}</span>
                          </div>
                        )}
                        <div className="pt-2 border-t border-emerald-200 dark:border-emerald-800 flex justify-between items-center">
                          <span className="font-bold text-emerald-900 dark:text-emerald-200">
                            {lang === 'bn' ? 'আপনার বিকাশ অ্যাকাউন্টে আসল টাকা' : 'Net Disbursed to Wallet'}
                          </span>
                          <span className="text-base font-black text-emerald-700 dark:text-emerald-400">
                            {formatBDT(netKept, lang)}
                          </span>
                        </div>
                      </div>
                    );
                  })()}
                </div>
              ) : item.offers.length > 0 ? (
                /* Incoming Bids / Offers */
                <div className="space-y-2">
                  <div className="text-[11px] font-bold text-stone-500 uppercase flex items-center justify-between">
                    <span>{lang === 'bn' ? 'যাচাইকৃত ক্রেতাদের দরপ্রস্তাব' : 'Incoming Verified Buyer Offers'}</span>
                    <span className="text-emerald-600 font-normal">
                      {item.offers.length} {lang === 'bn' ? 'টি অফার' : 'offer(s)'}
                    </span>
                  </div>

                  {item.offers.map((offer) => (
                    <div
                      key={offer.id}
                      className="bg-stone-50 dark:bg-[#121c13] p-3 rounded-xl border border-stone-200 dark:border-stone-800 flex flex-col sm:flex-row sm:items-center justify-between gap-2"
                    >
                      <div>
                        <div className="flex items-center gap-1.5">
                          <span className="font-bold text-xs text-stone-900 dark:text-stone-100">
                            {offer.b.n}
                          </span>
                          <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 border border-emerald-300 font-semibold">
                            ✔ {lang === 'bn' ? 'যাচাইকৃত' : 'Verified'}
                          </span>
                        </div>
                        <div className="text-xs text-stone-500 dark:text-stone-400 mt-0.5">
                          {offer.b.t} · {offer.b.d}
                        </div>
                        <div className="text-sm font-extrabold text-stone-900 dark:text-stone-100 mt-1">
                          {formatBDT(offer.price, lang)}{' '}
                          <span className="text-[10px] font-normal text-stone-500">
                            / {lang === 'bn' ? 'মণ' : 'md'} ({offer.qty} {lang === 'bn' ? 'মণ' : 'maunds'})
                          </span>
                        </div>
                      </div>

                      {offer.st === 'new' ? (
                        <div className="flex items-center gap-2 pt-1 sm:pt-0">
                          <button
                            onClick={() => onDecideOffer(item.id, offer.id, true)}
                            className="flex-1 sm:flex-initial px-3.5 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs shadow-xs transition flex items-center justify-center gap-1 active:scale-95"
                          >
                            <CheckCircle className="w-3.5 h-3.5" />
                            <span>{lang === 'bn' ? 'গ্রহণ করুন' : 'Accept'}</span>
                          </button>
                          <button
                            onClick={() => onDecideOffer(item.id, offer.id, false)}
                            className="flex-1 sm:flex-initial px-3 py-2 rounded-xl border border-red-300 dark:border-red-800 bg-red-50 dark:bg-red-950/40 text-red-700 dark:text-red-300 font-bold text-xs hover:bg-red-100 transition flex items-center justify-center gap-1 active:scale-95"
                          >
                            <XCircle className="w-3.5 h-3.5" />
                            <span>{lang === 'bn' ? 'বাতিল' : 'Reject'}</span>
                          </button>
                        </div>
                      ) : (
                        <span
                          className={`text-xs font-bold px-2.5 py-1 rounded-full ${
                            offer.st === 'accepted'
                              ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                              : 'bg-stone-200 text-stone-600 dark:bg-stone-800 dark:text-stone-400'
                          }`}
                        >
                          {offer.st === 'accepted'
                            ? lang === 'bn' ? 'গৃহীত হয়েছে' : 'Accepted'
                            : lang === 'bn' ? 'প্রত্যাখ্যাত' : 'Rejected'}
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-3 bg-stone-50 dark:bg-[#121c13] rounded-xl text-center border border-stone-200 dark:border-stone-800">
                  <div className="text-xs text-stone-500 dark:text-stone-400 flex items-center justify-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 animate-pulse text-amber-500" />
                    <span>
                      {lang === 'bn'
                        ? 'যাচাইকৃত মিল মালিক ও পাইকারদের কাছে নোটিফিকেশন পাঠানো হয়েছে…'
                        : 'Broadcasting to verified buyers and export aggregators…'}
                    </span>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
