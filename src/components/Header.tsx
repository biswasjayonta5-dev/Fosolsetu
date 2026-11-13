import React, { useState } from 'react';
import { 
  Globe, 
  Moon, 
  Sun, 
  Home, 
  Sprout, 
  ShoppingBag, 
  CloudSun, 
  Store, 
  Users, 
  Star, 
  Stethoscope, 
  Building2, 
  BarChart3, 
  LogOut, 
  Menu, 
  X,
  ChevronDown,
  UserCheck
} from 'lucide-react';
import { Language, UserRole, ViewType } from '../types';

interface HeaderProps {
  lang: Language;
  onToggleLang: () => void;
  isDark: boolean;
  onToggleTheme: () => void;
  role: UserRole | null;
  onSwitchRole: (role: UserRole | null) => void;
  currentView: ViewType;
  onNavigate: (view: ViewType) => void;
  onOpenDoctor: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  lang,
  onToggleLang,
  isDark,
  onToggleTheme,
  role,
  onSwitchRole,
  currentView,
  onNavigate,
  onOpenDoctor,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [roleMenuOpen, setRoleMenuOpen] = useState(false);

  const roleName = {
    farmer: lang === 'bn' ? 'কৃষক পোর্টাল' : 'Farmer Portal',
    buyer: lang === 'bn' ? 'পাইকারি ক্রেতা' : 'Wholesale Buyer',
    admin: lang === 'bn' ? 'এমএফআই পার্টনার' : 'MFI Admin',
  };

  const farmerNavItems: { id: ViewType; icon: React.ElementType; labelEn: string; labelBn: string }[] = [
    { id: 'home', icon: Home, labelEn: 'Dashboard', labelBn: 'হোম' },
    { id: 'plan', icon: Sprout, labelEn: 'Crop Plan & Advance', labelBn: 'পরিকল্পনা ও অগ্রিম' },
    { id: 'market', icon: ShoppingBag, labelEn: 'Direct Market', labelBn: 'সরাসরি বাজার' },
    { id: 'weather', icon: CloudSun, labelEn: 'Weather & Spray', labelBn: 'আবহাওয়া' },
    { id: 'dealers', icon: Store, labelEn: 'Input Dealers', labelBn: 'সার-বীজের দোকান' },
    { id: 'women', icon: Users, labelEn: 'Women Co-op', labelBn: 'নারী সমবায়' },
    { id: 'plans', icon: Star, labelEn: 'Packages', labelBn: 'প্যাকেজ' },
  ];

  const buyerNavItems: { id: ViewType; icon: React.ElementType; labelEn: string; labelBn: string }[] = [
    { id: 'browse', icon: ShoppingBag, labelEn: 'Open Listings', labelBn: 'খোলা তালিকা' },
    { id: 'bprofile', icon: Building2, labelEn: 'Verified Profile', labelBn: 'প্রোফাইল' },
  ];

  const adminNavItems: { id: ViewType; icon: React.ElementType; labelEn: string; labelBn: string }[] = [
    { id: 'admin', icon: BarChart3, labelEn: 'MFI Portfolio Analytics', labelBn: 'পোর্টফোলিও ড্যাশবোর্ড' },
  ];

  const navItems = role === 'farmer' ? farmerNavItems : role === 'buyer' ? buyerNavItems : adminNavItems;

  return (
    <header className="sticky top-0 z-40 bg-[#14532d] dark:bg-[#0c2e19] text-white shadow-md transition-colors safe-top border-b border-emerald-600/30">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          
          {/* Left: Brand Logo & Title */}
          <div 
            className="flex items-center gap-3 cursor-pointer select-none shrink-0"
            onClick={() => {
              if (role === 'farmer') onNavigate('home');
              else if (role === 'buyer') onNavigate('browse');
              else if (role === 'admin') onNavigate('admin');
              else onNavigate('login');
            }}
          >
            <div className="w-10 h-10 rounded-xl bg-emerald-600 flex items-center justify-center text-2xl shadow-inner border border-emerald-400/40">
              🌾
            </div>
            <div>
              <div className="font-extrabold text-lg sm:text-xl tracking-tight flex items-center gap-2 leading-none">
                <span>FosolSetu</span>
                {role && (
                  <span className="hidden sm:inline-block text-[10px] uppercase font-bold px-2 py-0.5 rounded-full bg-emerald-800 text-emerald-200 border border-emerald-600">
                    {roleName[role]}
                  </span>
                )}
              </div>
              <div className="text-[11px] text-emerald-200/90 font-medium hidden sm:block">
                {lang === 'bn' ? 'ফসলে সেতু · কৃষি অর্থায়ন ও সরাসরি বাজার' : 'Fair Farm Finance & Direct Agritech Trade'}
              </div>
            </div>
          </div>

          {/* Center: Desktop Navigation Bar (Visible on Laptop/Desktop screens >= 1024px) */}
          {role && (
            <nav className="hidden lg:flex items-center gap-1 xl:gap-2 overflow-x-auto py-1 scrollbar-none">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = currentView === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => onNavigate(item.id)}
                    className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs xl:text-sm font-bold transition-all duration-150 shrink-0 ${
                      isActive
                        ? 'bg-emerald-600/80 text-white shadow-sm ring-1 ring-emerald-400/30'
                        : 'text-emerald-100/80 hover:text-white hover:bg-emerald-800/60'
                    }`}
                  >
                    <Icon className="w-4 h-4 shrink-0" />
                    <span>{lang === 'bn' ? item.labelBn : item.labelEn}</span>
                  </button>
                );
              })}

              {/* Desktop AI Crop Doctor Shortcut */}
              {role === 'farmer' && (
                <button
                  onClick={onOpenDoctor}
                  className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs xl:text-sm font-bold bg-amber-500/20 text-amber-300 border border-amber-400/40 hover:bg-amber-500/30 transition shrink-0"
                  title="AI Crop Doctor symptom checker"
                >
                  <Stethoscope className="w-4 h-4 text-amber-300" />
                  <span>{lang === 'bn' ? 'এআই ডক্টর' : 'Crop Doctor'}</span>
                </button>
              )}
            </nav>
          )}

          {/* Right: Actions (Language, Theme, Role Selector, User Menu) */}
          <div className="flex items-center gap-2 shrink-0">
            
            {/* Desktop Role Switcher Dropdown */}
            {role && (
              <div className="relative hidden md:block">
                <button
                  onClick={() => setRoleMenuOpen(!roleMenuOpen)}
                  className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-bold bg-emerald-900/80 hover:bg-emerald-800 text-emerald-100 border border-emerald-700/60 transition"
                >
                  <UserCheck className="w-3.5 h-3.5 text-emerald-300" />
                  <span>{roleName[role]}</span>
                  <ChevronDown className="w-3 h-3 text-emerald-300" />
                </button>

                {roleMenuOpen && (
                  <div 
                    className="absolute right-0 mt-2 w-48 bg-white dark:bg-[#162419] rounded-xl shadow-xl border border-stone-200 dark:border-stone-800 py-1.5 z-50 text-stone-800 dark:text-stone-200 animate-scale-up"
                    onMouseLeave={() => setRoleMenuOpen(false)}
                  >
                    <div className="px-3 py-1 text-[10px] font-bold text-stone-400 uppercase tracking-wider">
                      {lang === 'bn' ? 'ভূমিকা পরিবর্তন' : 'Switch Role'}
                    </div>
                    <button
                      onClick={() => {
                        onSwitchRole('farmer');
                        onNavigate('home');
                        setRoleMenuOpen(false);
                      }}
                      className={`w-full text-left px-3 py-2 text-xs font-semibold flex items-center gap-2 hover:bg-emerald-50 dark:hover:bg-[#1f2f22] ${
                        role === 'farmer' ? 'text-emerald-700 dark:text-emerald-400 font-bold bg-emerald-50/60 dark:bg-emerald-950/40' : ''
                      }`}
                    >
                      <span>🌾</span>
                      <span>{lang === 'bn' ? 'কৃষক পোর্টাল' : 'Farmer Portal'}</span>
                    </button>
                    <button
                      onClick={() => {
                        onSwitchRole('buyer');
                        onNavigate('browse');
                        setRoleMenuOpen(false);
                      }}
                      className={`w-full text-left px-3 py-2 text-xs font-semibold flex items-center gap-2 hover:bg-emerald-50 dark:hover:bg-[#1f2f22] ${
                        role === 'buyer' ? 'text-emerald-700 dark:text-emerald-400 font-bold bg-emerald-50/60 dark:bg-emerald-950/40' : ''
                      }`}
                    >
                      <span>🏢</span>
                      <span>{lang === 'bn' ? 'পাইকারি ক্রেতা' : 'Wholesale Buyer'}</span>
                    </button>
                    <button
                      onClick={() => {
                        onSwitchRole('admin');
                        onNavigate('admin');
                        setRoleMenuOpen(false);
                      }}
                      className={`w-full text-left px-3 py-2 text-xs font-semibold flex items-center gap-2 hover:bg-emerald-50 dark:hover:bg-[#1f2f22] ${
                        role === 'admin' ? 'text-emerald-700 dark:text-emerald-400 font-bold bg-emerald-50/60 dark:bg-emerald-950/40' : ''
                      }`}
                    >
                      <span>📊</span>
                      <span>{lang === 'bn' ? 'এমএফআই পার্টনার' : 'MFI Partner Admin'}</span>
                    </button>
                    <div className="border-t border-stone-100 dark:border-stone-800 my-1" />
                    <button
                      onClick={() => {
                        onSwitchRole(null);
                        onNavigate('login');
                        setRoleMenuOpen(false);
                      }}
                      className="w-full text-left px-3 py-2 text-xs font-semibold text-red-600 dark:text-red-400 flex items-center gap-2 hover:bg-red-50 dark:hover:bg-red-950/30"
                    >
                      <LogOut className="w-3.5 h-3.5" />
                      <span>{lang === 'bn' ? 'লগআউট' : 'Sign Out'}</span>
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Dark Mode Toggle */}
            <button
              onClick={onToggleTheme}
              className="w-9 h-9 rounded-xl flex items-center justify-center bg-emerald-900/60 hover:bg-emerald-800 text-emerald-100 border border-emerald-700/60 transition active:scale-95"
              aria-label="Toggle Theme"
              title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            >
              {isDark ? <Sun className="w-4 h-4 text-amber-300" /> : <Moon className="w-4 h-4 text-emerald-200" />}
            </button>

            {/* Language Switcher */}
            <button
              onClick={onToggleLang}
              className="flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-extrabold bg-amber-500 hover:bg-amber-400 text-stone-900 shadow-sm transition active:scale-95"
              aria-label="Change Language"
              title="Toggle Bengali / English"
            >
              <Globe className="w-3.5 h-3.5" />
              <span>{lang === 'bn' ? 'English' : 'বাংলা'}</span>
            </button>

            {/* Mobile Hamburger Menu Toggle (Visible on screens < 1024px) */}
            {role && (
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden w-9 h-9 rounded-xl flex items-center justify-center bg-emerald-900/60 hover:bg-emerald-800 text-emerald-100 border border-emerald-700/60 transition"
                aria-label="Toggle Navigation Menu"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Drawer Dropdown for Tablets & Phones */}
      {mobileMenuOpen && role && (
        <div className="lg:hidden bg-emerald-900/95 border-t border-emerald-700/60 px-4 py-3 space-y-1 animate-slide-down">
          <div className="grid grid-cols-2 gap-2 pb-2 mb-2 border-b border-emerald-800">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentView === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    onNavigate(item.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`flex items-center gap-2 p-2.5 rounded-xl text-xs font-bold text-left transition ${
                    isActive
                      ? 'bg-emerald-700 text-white shadow-xs'
                      : 'text-emerald-100 hover:bg-emerald-800'
                  }`}
                >
                  <Icon className="w-4 h-4 shrink-0" />
                  <span className="truncate">{lang === 'bn' ? item.labelBn : item.labelEn}</span>
                </button>
              );
            })}
          </div>

          <div className="flex items-center justify-between pt-1">
            <button
              onClick={() => {
                onOpenDoctor();
                setMobileMenuOpen(false);
              }}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold bg-amber-400 text-stone-900"
            >
              <Stethoscope className="w-4 h-4" />
              <span>{lang === 'bn' ? 'এআই ক্রপ ডক্টর' : 'AI Crop Doctor'}</span>
            </button>

            <button
              onClick={() => {
                onSwitchRole(null);
                onNavigate('login');
                setMobileMenuOpen(false);
              }}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold text-red-300 hover:bg-red-900/40"
            >
              <LogOut className="w-4 h-4" />
              <span>{lang === 'bn' ? 'লগআউট' : 'Sign Out'}</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
