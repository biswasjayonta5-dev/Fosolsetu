import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { CheckCircle2, X, ArrowDownRight, Smartphone, ShieldCheck, Wallet } from 'lucide-react';
import { formatBDT } from '../utils/formatters';
import { Language } from '../types';

interface BkashModalProps {
  isOpen: boolean;
  onClose: () => void;
  amount: number;
  phone: string;
  lang: Language;
}

export const BkashModal: React.FC<BkashModalProps> = ({
  isOpen,
  onClose,
  amount,
  phone,
  lang,
}) => {
  useEffect(() => {
    if (isOpen) {
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#e2136e', '#15803d', '#f59e0b', '#3b82f6'],
        });
      } catch (e) {
        // Safe catch if canvas not supported
      }
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const trxId = 'BKX' + Math.random().toString(36).substring(2, 9).toUpperCase();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white dark:bg-[#1a271c] rounded-2xl max-w-sm w-full shadow-2xl border border-stone-200 dark:border-stone-800 overflow-hidden transform transition-all animate-scale-up">
        {/* bKash Header */}
        <div className="bg-[#e2136e] text-white p-5 text-center relative">
          <button
            onClick={onClose}
            className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/20 hover:bg-black/30 flex items-center justify-center text-white"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="w-16 h-16 rounded-full bg-white text-[#e2136e] mx-auto flex items-center justify-center shadow-md mb-2">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <div className="text-xl font-bold tracking-tight">
            {lang === 'bn' ? 'টাকা সফলভাবে পাঠানো হয়েছে!' : 'Payment Disbursed!'}
          </div>
          <div className="text-xs text-pink-100 mt-1">
            {lang === 'bn' ? 'বিকাশ মাইক্রো-অগ্রিম ফান্ড' : 'bKash Agri Micro-Advance'}
          </div>
        </div>

        {/* Content Body */}
        <div className="p-5 space-y-4">
          <div className="text-center">
            <div className="text-xs text-stone-500 dark:text-stone-400 uppercase font-semibold">
              {lang === 'bn' ? 'জমা কৃত অর্থ' : 'Net Received'}
            </div>
            <div className="text-3xl font-extrabold text-emerald-700 dark:text-emerald-400 my-1">
              {formatBDT(amount, lang)}
            </div>
            <div className="text-xs text-stone-600 dark:text-stone-300 flex items-center justify-center gap-1">
              <Smartphone className="w-3.5 h-3.5 text-stone-400" />
              <span>{lang === 'bn' ? 'বিকাশ নম্বর:' : 'To Wallet:'} <b>{phone}</b></span>
            </div>
          </div>

          <div className="bg-stone-50 dark:bg-[#121c13] rounded-xl p-3 border border-stone-200 dark:border-stone-800 text-xs space-y-1.5">
            <div className="flex justify-between text-stone-500 dark:text-stone-400">
              <span>{lang === 'bn' ? 'ট্রানজেকশন আইডি' : 'TrxID'}</span>
              <span className="font-mono font-bold text-stone-800 dark:text-stone-200">{trxId}</span>
            </div>
            <div className="flex justify-between text-stone-500 dark:text-stone-400">
              <span>{lang === 'bn' ? 'ফি কাঠামো' : 'Fee Structure'}</span>
              <span className="font-semibold text-emerald-600 dark:text-emerald-400">
                {lang === 'bn' ? '০% চক্রবৃদ্ধি সুদ' : '0% Compound Interest'}
              </span>
            </div>
            <div className="flex justify-between text-stone-500 dark:text-stone-400">
              <span>{lang === 'bn' ? 'স্ট্যাটাস' : 'Status'}</span>
              <span className="inline-flex items-center gap-1 font-bold text-emerald-600">
                <ShieldCheck className="w-3.5 h-3.5" />
                {lang === 'bn' ? 'সম্পন্ন (Instant)' : 'Completed (Instant)'}
              </span>
            </div>
          </div>

          <p className="text-[11px] text-stone-500 dark:text-stone-400 text-center leading-tight">
            {lang === 'bn'
              ? 'আপনার বিকাশ অ্যাকাউন্টে সরাসরি টাকা ঢুকেছে। ফসল বিক্রির সময় এই অর্থ স্বয়ংক্রিয়ভাবে সমন্বয় করা যাবে।'
              : 'Funds have been deposited into your bKash wallet. You can repay after crop harvest with zero hidden fines.'}
          </p>

          <button
            onClick={onClose}
            className="w-full py-3 rounded-xl bg-emerald-700 hover:bg-emerald-800 active:scale-98 text-white font-bold text-sm shadow-md transition flex items-center justify-center gap-2"
          >
            <Wallet className="w-4 h-4" />
            <span>{lang === 'bn' ? 'ঠিক আছে, ড্যাশবোর্ডে ফিরুন' : 'Done, Back to Dashboard'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
