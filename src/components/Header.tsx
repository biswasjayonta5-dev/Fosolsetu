import React from 'react';
import { Globe, Moon, Sun, Smartphone, Monitor, ShieldCheck, User } from 'lucide-react';
import { Language, UserRole } from '../types';

interface HeaderProps {
  lang: Language;
  onToggleLang: () => void;
  isDark: boolean;
  onToggleTheme: () => void;
  role: UserRole | null;
  onSwitchRole: (role: UserRole | null) => void;
  isPhoneFrame: boolean;
  onTogglePhoneFrame: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  lang,
  onToggleLang,
  isDark,
  onToggleTheme,
  role,
  onSwitchRole,
  isPhoneFrame,
  onTogglePhoneFrame,
}) => {
  const roleName = {
    farmer: lang === 'bn' ? 'কৃষক' : 'Farmer',
    buyer: lang === 'bn' ? 'ক্রেতা' : 'Buyer',
    admin: lang === 'bn' ? 'অ্যাডমিন' : 'Admin',
  };

  return (
    <header className="sticky top-0 z-30 bg-[#14532d] dark:bg-[#0c2e19] text-white shadow-md transition-colors safe-top">
      <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between gap-3">
        {/* Brand Logo & Title */}
        <div 
          className="flex items-center gap-2 cursor-pointer select-none"
          onClick={() => role && onSwitchRole(role)}
        >
          <div className="w-9 h-9 rounded-xl bg-emerald-600 flex items-center justify-center text-xl shadow-inner border border-emerald-400/30">
            🌾
          </div>
          <div>
            <div className="font-bold text-lg tracking-tight flex items-center gap-1.5 leading-none">
              <span>FosolSetu</span>
              {role && (
                <span className="text-[10px] uppercase font-semibold px-1.5 py-0.5 rounded bg-emerald-800/80 text-emerald-200 border border-emerald-600/50">
                  {roleName[role]}
                </span>
              )}
            </div>
            <div className="text-[11px] text-emerald-200/80 font-medium">
              {lang === 'bn' ? 'ফসলে সেতু · কৃষি অর্থায়ন ও বাজার' : 'Fair Farm Finance & Direct Trade'}
            </div>
          </div>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-1.5">
          {/* Frame Toggle (Visible on larger screens) */}
          <button
            onClick={onTogglePhoneFrame}
            className="hidden sm:flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-semibold bg-emerald-900/60 hover:bg-emerald-800 text-emerald-100 border border-emerald-700/60 transition active:scale-95"
            title={isPhoneFrame ? 'Switch to Fullscreen Responsive View' : 'Switch to Mobile Phone Shell'}
          >
            {isPhoneFrame ? <Monitor className="w-3.5 h-3.5" /> : <Smartphone className="w-3.5 h-3.5" />}
            <span>{isPhoneFrame ? 'Full' : 'Mobile'}</span>
          </button>

          {/* Theme Toggle */}
          <button
            onClick={onToggleTheme}
            className="w-8 h-8 rounded-lg flex items-center justify-center bg-emerald-900/60 hover:bg-emerald-800 text-emerald-100 border border-emerald-700/60 transition active:scale-95"
            aria-label="Toggle Theme"
          >
            {isDark ? <Sun className="w-4 h-4 text-amber-300" /> : <Moon className="w-4 h-4 text-emerald-200" />}
          </button>

          {/* Language Switcher */}
          <button
            onClick={onToggleLang}
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-bold bg-amber-500 hover:bg-amber-400 text-stone-900 shadow-sm transition active:scale-95"
            aria-label="Change Language"
          >
            <Globe className="w-3.5 h-3.5" />
            <span>{lang === 'bn' ? 'English' : 'বাংলা'}</span>
          </button>
        </div>
      </div>
    </header>
  );
};
