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
  Filter,
  Search,
  MapPin
} from 'lucide-react';
import { Listing, Offer, CropPlan, Language, CropInfo } from '../../types';
import { CROPS, BUYERS, DISTRICTS } from '../../data/mockData';
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
  const [filterCrop, setFilterCrop] = useState<string>('All');
  const [searchTerm, setSearchTerm] = useState<string>('');

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

  const filteredListings = listings.filter((l) => {
    const matchCrop = filterCrop === 'All' || l.crop === filterCrop;
    const matchSearch =
      l.farmer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      l.dist.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (CROPS[l.crop]?.en.toLowerCase().includes(searchTerm.toLowerCase()) ?? false);
    return matchCrop && matchSearch;
  });

  return (
    <div className="space-y-6 pb-20 lg:pb-8 animate-fade-in w-full">
      {/* Top Banner & Action */}
      <div className="bg-gradient-to-r from-emerald-800 via-emerald-900 to-green-950 text-white p-6 rounded-2xl shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5">
            <span className="text-3xl p-2 bg-white/10 rounded-xl">🧺</span>
            <div>
              <h2 className="font-extrabold text-xl sm:text-2xl">
                {lang === 'bn' ? 'সরাসরি পাইকারি কৃষক বাজার' : 'Direct Wholesale Agritech Marketplace'}
              </h2>
              <p className="text-xs sm:text-sm text-emerald-200 mt-0.5">
                {lang === 'bn' ? 'মধ্যস্বত্বভোগী ফড়িয়া ছাড়া সরাসরি মিল ও রফতানিকারকদের কাছে বিক্রি · ১০০% কমিশন-মুক্ত' : 'Direct trade with verified rice mills, food processors & exporters · 100% Zero Commission'}
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <div className="hidden sm:flex flex-col text-right">
            <span className="text-[10px] text-emerald-300 font-bold uppercase tracking-wider">
              {lang === 'bn' ? 'কমিশন গ্যারান্টি' : 'Trade Commission'}
            </span>
            <span className="text-lg font-black text-amber-300">৳0 (সম্পূর্ণ ফ্রি)</span>
          </div>

          <button
            onClick={() => setShowCreateModal(true)}
            className="px-4 py-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-stone-900 font-extrabold text-xs sm:text-sm shadow-md transition flex items-center gap-2 active:scale-95"
          >
            <Plus className="w-4 h-4" />
            <span>{lang === 'bn' ? 'নতুন ফসল যোগ করুন' : 'List Harvest for Sale'}</span>
          </button>
        </div>
      </div>

      {/* Filter and Search Controls Bar */}
      <div className="bg-white dark:bg-[#162419] p-4 rounded-2xl border border-stone-200 dark:border-stone-800 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-3">
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <input
            type="text"
            placeholder={lang === 'bn' ? 'ফসল, কৃষক বা জেলা দিয়ে খুঁজুন...' : 'Search by crop, farmer or district...'}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full h-11 pl-10 pr-4 rounded-xl border border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-[#121c13] text-xs font-semibold text-stone-900 dark:text-stone-100 focus:outline-hidden focus:border-emerald-600"
          />
          <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
        </div>

        {/* Filter Pills */}
        <div className="flex gap-1.5 overflow-x-auto pb-1 text-xs scrollbar-none">
          <button
            onClick={() => setFilterCrop('All')}
            className={`px-3.5 py-2 rounded-xl font-bold shrink-0 transition ${
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
              className={`px-3.5 py-2 rounded-xl font-bold shrink-0 transition flex items-center gap-1.5 ${
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
      </div>

      {/* Listing Form Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-white dark:bg-[#1a271c] rounded-2xl max-w-md w-full shadow-2xl border border-stone-200 dark:border-stone-800 p-6 space-y-4">
            <div className="flex justify-between items-center pb-3 border-b border-stone-200 dark:border-stone-800">
              <h3 className="font-extrabold text-base text-stone-900 dark:text-stone-100 flex items-center gap-2">
                <Plus className="w-5 h-5 text-emerald-600" />
                <span>{lang === 'bn' ? 'নতুন ফসল বিক্রির তালিকা দিন' : 'List Harvest for Wholesale'}</span>
              </h3>
              <button
                onClick={() => setShowCreateModal(false)}
                className="w-8 h-8 rounded-full bg-stone-100 dark:bg-stone-800 flex items-center justify-center text-stone-500 hover:bg-stone-200"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateListing} className="space-y-4">
              {activePlans.length > 0 ? (
                <div>
                  <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1.5">
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
                    className="w-full h-12 px-3 rounded-xl border-2 border-stone-200 dark:border-stone-800 bg-white dark:bg-[#121c13] text-stone-900 dark:text-stone-100 font-bold text-xs"
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
                    ? 'উন্মুক্ত তালিকা হিসেবে পোস্ট করছেন (কোনো সক্রিয় প্ল্যান নেই)'
                    : 'Posting as open market lot'}
                </div>
              )}

              <div>
                <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1.5">
                  {lang === 'bn' ? 'বিক্রির পরিমাণ (মণ)' : 'Quantity in Maunds (৪০ কেজি/মণ)'}
                </label>
                <input
                  type="number"
                  min="1"
                  value={qty}
                  onChange={(e) => setQty(Math.max(1, parseInt(e.target.value) || 1))}
                  className="w-full h-12 px-3 rounded-xl border-2 border-stone-200 dark:border-stone-800 bg-white dark:bg-[#121c13] text-stone-900 dark:text-stone-100 font-bold text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1.5">
                  {lang === 'bn' ? 'আপনার চাওয়া পাইকারি দর প্রতি মণ (টাকা)' : 'Asking Price / Maund (BDT)'}
                </label>
                <input
                  type="number"
                  min="100"
                  value={askPrice}
                  onChange={(e) => setAskPrice(Math.max(100, parseInt(e.target.value) || 100))}
                  className="w-full h-12 px-3 rounded-xl border-2 border-stone-200 dark:border-stone-800 bg-white dark:bg-[#121c13] text-stone-900 dark:text-stone-100 font-bold text-sm"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-extrabold text-sm shadow-md transition flex items-center justify-center gap-2"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>{lang === 'bn' ? 'বাজারে প্রকাশ করুন' : 'Publish Wholesale Lot'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Responsive Multi-Column Grid: 1 col on mobile, 2 on tablet, 3 on desktop */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredListings.map((item) => {
          const crop = CROPS[item.crop] || CROPS.rice;
          return (
            <div
              key={item.id}
              className="bg-white dark:bg-[#162419] rounded-2xl border border-stone-200 dark:border-stone-800 p-5 shadow-sm space-y-4 flex flex-col justify-between hover:border-emerald-500/50 transition-all duration-200"
            >
              <div>
                {/* Header Info */}
                <div className="flex items-start justify-between pb-3 border-b border-stone-100 dark:border-stone-800">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl p-2 bg-emerald-50 dark:bg-emerald-950/60 rounded-2xl">
                      {crop.ic}
                    </span>
                    <div>
                      <h3 className="font-extrabold text-base text-stone-900 dark:text-stone-100">
                        {lang === 'bn' ? crop.bn : crop.en}
                      </h3>
                      <div className="text-xs text-stone-500 dark:text-stone-400 flex items-center gap-1 mt-0.5">
                        <MapPin className="w-3.5 h-3.5 text-stone-400" />
                        <span>{item.dist} · {item.farmer}</span>
                      </div>
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="text-[10px] text-stone-500 uppercase font-semibold">
                      {lang === 'bn' ? 'পরিমাণ' : 'Quantity'}
                    </div>
                    <div className="text-sm font-extrabold text-stone-900 dark:text-stone-100">
                      {item.qty} {lang === 'bn' ? 'মণ' : 'maunds'}
                    </div>
                  </div>
                </div>

                {/* Asking Price & Valuation */}
                <div className="my-3 p-3 bg-stone-50 dark:bg-[#121c13] rounded-xl flex items-center justify-between text-xs">
                  <span className="text-stone-600 dark:text-stone-400">
                    {lang === 'bn' ? 'কৃষকের চাওয়া দর:' : 'Farmer Ask Price:'}
                  </span>
                  <span className="text-base font-black text-emerald-700 dark:text-emerald-400">
                    {formatBDT(item.ask, lang)}
                    <span className="text-[10px] text-stone-500 font-normal"> / {lang === 'bn' ? 'মণ' : 'md'}</span>
                  </span>
                </div>

                {/* Deal Settled Receipt or Incoming Bids */}
                {item.sold ? (
                  <div className="bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-300 dark:border-emerald-800 rounded-xl p-3.5 space-y-2">
                    <div className="flex items-center justify-between pb-2 border-b border-emerald-200 dark:border-emerald-800">
                      <span className="font-extrabold text-xs text-emerald-900 dark:text-emerald-200 flex items-center gap-1.5">
                        <CheckCircle className="w-4 h-4 text-emerald-600" />
                        <span>{lang === 'bn' ? 'চুক্তি সম্পন্ন ও অর্থ পরিশোধিত' : 'Deal Confirmed & Settled'}</span>
                      </span>
                      <span className="text-[11px] font-bold text-emerald-800 dark:text-emerald-300">
                        {item.sold.b.n}
                      </span>
                    </div>

                    {(() => {
                      const gross = item.sold.price * item.sold.qty;
                      const linkedPlan = plans.find((p) => p.id === item.plan);
                      const advanceRepaid = linkedPlan && linkedPlan.status !== 'offer' ? linkedPlan.rep : 0;
                      const netKept = gross - advanceRepaid;

                      return (
                        <div className="space-y-1.5 text-xs">
                          <div className="flex justify-between text-stone-600 dark:text-stone-300">
                            <span>{lang === 'bn' ? 'মোট বিক্রয় মূল্য:' : 'Gross Sale Total:'}</span>
                            <span className="font-bold text-stone-800 dark:text-stone-200">{formatBDT(gross, lang)}</span>
                          </div>
                          <div className="flex justify-between text-stone-600 dark:text-stone-300">
                            <span>{lang === 'bn' ? 'প্ল্যাটফর্ম কমিশন:' : 'Platform Fee:'}</span>
                            <span className="font-bold text-emerald-600 dark:text-emerald-400">৳0 (ফ্রি)</span>
                          </div>
                          {advanceRepaid > 0 && (
                            <div className="flex justify-between text-stone-600 dark:text-stone-300">
                              <span>{lang === 'bn' ? 'স্বয়ংক্রিয় অগ্রিম কর্তন:' : 'Advance Repaid:'}</span>
                              <span className="font-bold text-red-600 dark:text-red-400">− {formatBDT(advanceRepaid, lang)}</span>
                            </div>
                          )}
                          <div className="pt-2 border-t border-emerald-200 dark:border-emerald-800 flex justify-between items-center">
                            <span className="font-bold text-emerald-900 dark:text-emerald-200">
                              {lang === 'bn' ? 'আপনার বিকাশ ওয়ালেটে আসল টাকা:' : 'Net Disbursed to Wallet:'}
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
                  <div className="space-y-2">
                    <div className="text-[11px] font-bold text-stone-500 uppercase flex items-center justify-between">
                      <span>{lang === 'bn' ? 'যাচাইকৃত ক্রেতাদের দরপ্রস্তাব' : 'Incoming Bids'}</span>
                      <span className="text-emerald-600 font-bold">
                        {item.offers.length} {lang === 'bn' ? 'টি অফার' : 'offer(s)'}
                      </span>
                    </div>

                    {item.offers.map((offer) => (
                      <div
                        key={offer.id}
                        className="bg-stone-50 dark:bg-[#121c13] p-3 rounded-xl border border-stone-200 dark:border-stone-800 space-y-2"
                      >
                        <div className="flex justify-between items-center">
                          <span className="font-bold text-xs text-stone-900 dark:text-stone-100 flex items-center gap-1.5">
                            <Building2 className="w-3.5 h-3.5 text-stone-500" />
                            <span>{offer.b.n}</span>
                          </span>
                          <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 border border-emerald-300 font-bold">
                            ✔ Verified
                          </span>
                        </div>

                        <div className="flex justify-between items-baseline">
                          <span className="text-xs text-stone-500">
                            {offer.qty} {lang === 'bn' ? 'মণ' : 'maunds'} @
                          </span>
                          <span className="text-sm font-black text-stone-900 dark:text-stone-100">
                            {formatBDT(offer.price, lang)} / {lang === 'bn' ? 'মণ' : 'md'}
                          </span>
                        </div>

                        {offer.st === 'new' ? (
                          <div className="flex items-center gap-2 pt-1">
                            <button
                              onClick={() => onDecideOffer(item.id, offer.id, true)}
                              className="flex-1 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs shadow-xs transition flex items-center justify-center gap-1 active:scale-95"
                            >
                              <CheckCircle className="w-3.5 h-3.5" />
                              <span>{lang === 'bn' ? 'গ্রহণ করুন' : 'Accept'}</span>
                            </button>
                            <button
                              onClick={() => onDecideOffer(item.id, offer.id, false)}
                              className="flex-1 py-2 rounded-xl border border-red-300 dark:border-red-800 bg-red-50 dark:bg-red-950/40 text-red-700 dark:text-red-300 font-bold text-xs hover:bg-red-100 transition flex items-center justify-center gap-1 active:scale-95"
                            >
                              <XCircle className="w-3.5 h-3.5" />
                              <span>{lang === 'bn' ? 'বাতিল' : 'Reject'}</span>
                            </button>
                          </div>
                        ) : (
                          <span
                            className={`text-xs font-bold px-2.5 py-1 rounded-full inline-block ${
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
                          ? 'যাচাইকৃত মিল মালিকদের কাছে দর আহ্বান পাঠানো হয়েছে…'
                          : 'Broadcasting to verified wholesalers…'}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
