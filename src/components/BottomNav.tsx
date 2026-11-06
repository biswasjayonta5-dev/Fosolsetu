import React from 'react';
import { Home, Sprout, ShoppingBag, CloudSun, MoreHorizontal, Building2, UserCheck, LogOut, BarChart3 } from 'lucide-react';
import { ViewType, UserRole, Language } from '../types';

interface BottomNavProps {
  role: UserRole;
  currentView: ViewType;
  onNavigate: (view: ViewType) => void;
  lang: Language;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  role,
  currentView,
  onNavigate,
  lang,
}) => {
  if (role === 'farmer') {
    const items = [
      { id: 'home' as ViewType, icon: Home, labelEn: 'Home', labelBn: 'হোম' },
      { id: 'plan' as ViewType, icon: Sprout, labelEn: 'Plan', labelBn: 'পরিকল্পনা' },
      { id: 'market' as ViewType, icon: ShoppingBag, labelEn: 'Market', labelBn: 'বাজার' },
      { id: 'weather' as ViewType, icon: CloudSun, labelEn: 'Weather', labelBn: 'আবহাওয়া' },
      { id: 'more' as ViewType, icon: MoreHorizontal, labelEn: 'More', labelBn: 'আরও' },
    ];

    return (
      <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 dark:bg-[#162419]/95 backdrop-blur-md border-t border-emerald-900/10 dark:border-emerald-700/20 safe-bottom">
        <div className="max-w-md mx-auto grid grid-cols-5 px-1 py-1">
          {items.map((item) => {
            const Icon = item.icon;
            const isActive = currentView === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`flex flex-col items-center justify-center min-h-[56px] py-1 px-1 rounded-xl transition-all duration-150 active:scale-95 ${
                  isActive
                    ? 'text-emerald-700 dark:text-emerald-400 font-bold bg-emerald-50 dark:bg-emerald-950/40'
                    : 'text-stone-500 dark:text-stone-400 hover:text-stone-700 dark:hover:text-stone-200'
                }`}
              >
                <div className="relative">
                  <Icon className={`w-5 h-5 transition-transform ${isActive ? 'scale-110' : ''}`} />
                  {item.id === 'market' && (
                    <span className="absolute -top-1 -right-1.5 w-2 h-2 rounded-full bg-amber-500 ring-2 ring-white dark:ring-stone-900" />
                  )}
                </div>
                <span className="text-[11px] mt-1 tracking-tight leading-tight">
                  {lang === 'bn' ? item.labelBn : item.labelEn}
                </span>
              </button>
            );
          })}
        </div>
      </nav>
    );
  }

  if (role === 'buyer') {
    const items = [
      { id: 'browse' as ViewType, icon: ShoppingBag, labelEn: 'Listings', labelBn: 'খোলা তালিকা' },
      { id: 'bprofile' as ViewType, icon: Building2, labelEn: 'Profile', labelBn: 'প্রোফাইল' },
      { id: 'login' as ViewType, icon: LogOut, labelEn: 'Switch', labelBn: 'বদল' },
    ];

    return (
      <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 dark:bg-[#162419]/95 backdrop-blur-md border-t border-emerald-900/10 dark:border-emerald-700/20 safe-bottom">
        <div className="max-w-md mx-auto grid grid-cols-3 px-2 py-1">
          {items.map((item) => {
            const Icon = item.icon;
            const isActive = currentView === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`flex flex-col items-center justify-center min-h-[56px] py-1 px-2 rounded-xl transition-all active:scale-95 ${
                  isActive
                    ? 'text-emerald-700 dark:text-emerald-400 font-bold bg-emerald-50 dark:bg-emerald-950/40'
                    : 'text-stone-500 dark:text-stone-400'
                }`}
              >
                <Icon className={`w-5 h-5 ${isActive ? 'scale-110' : ''}`} />
                <span className="text-[11px] mt-1">
                  {lang === 'bn' ? item.labelBn : item.labelEn}
                </span>
              </button>
            );
          })}
        </div>
      </nav>
    );
  }

  if (role === 'admin') {
    const items = [
      { id: 'admin' as ViewType, icon: BarChart3, labelEn: 'Overview', labelBn: 'ড্যাশবোর্ড' },
      { id: 'login' as ViewType, icon: LogOut, labelEn: 'Switch Role', labelBn: 'রোল বদল' },
    ];

    return (
      <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 dark:bg-[#162419]/95 backdrop-blur-md border-t border-emerald-900/10 dark:border-emerald-700/20 safe-bottom">
        <div className="max-w-md mx-auto grid grid-cols-2 px-4 py-1">
          {items.map((item) => {
            const Icon = item.icon;
            const isActive = currentView === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`flex flex-col items-center justify-center min-h-[56px] py-1 px-2 rounded-xl transition-all active:scale-95 ${
                  isActive
                    ? 'text-emerald-700 dark:text-emerald-400 font-bold bg-emerald-50 dark:bg-emerald-950/40'
                    : 'text-stone-500 dark:text-stone-400'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="text-[11px] mt-1">
                  {lang === 'bn' ? item.labelBn : item.labelEn}
                </span>
              </button>
            );
          })}
        </div>
      </nav>
    );
  }

  return null;
};
