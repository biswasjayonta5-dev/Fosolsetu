import React, { useState, useEffect } from 'react';
import { 
  Language, 
  UserRole, 
  ViewType, 
  CropPlan, 
  Listing, 
  Buyer 
} from './types';
import { 
  CROPS, 
  BUYERS, 
  INITIAL_SEED_LISTINGS 
} from './data/mockData';
import { Header } from './components/Header';
import { BottomNav } from './components/BottomNav';
import { MobileFrame } from './components/MobileFrame';
import { Toast } from './components/Toast';
import { BkashModal } from './components/BkashModal';
import { CropDoctorModal } from './components/CropDoctorModal';

// Views
import { LoginView } from './components/views/LoginView';
import { HomeView } from './components/views/HomeView';
import { PlanView } from './components/views/PlanView';
import { OfferView } from './components/views/OfferView';
import { MarketView } from './components/views/MarketView';
import { WeatherView } from './components/views/WeatherView';
import { DealersView } from './components/views/DealersView';
import { WomenView } from './components/views/WomenView';
import { PlansView } from './components/views/PlansView';
import { BuyerView } from './components/views/BuyerView';
import { BuyerProfileView } from './components/views/BuyerProfileView';
import { AdminView } from './components/views/AdminView';
import { MoreView } from './components/views/MoreView';

export default function App() {
  // Localization: default to Bengali ('bn')
  const [lang, setLang] = useState<Language>(() => {
    return (localStorage.getItem('fosolsetu_lang') as Language) || 'bn';
  });

  // Dark Theme
  const [isDark, setIsDark] = useState<boolean>(() => {
    return localStorage.getItem('fosolsetu_theme') === 'dark';
  });

  // Role & View
  const [role, setRole] = useState<UserRole | null>(() => {
    return (localStorage.getItem('fosolsetu_role') as UserRole) || 'farmer';
  });

  const [currentView, setCurrentView] = useState<ViewType>(() => {
    return (localStorage.getItem('fosolsetu_view') as ViewType) || 'home';
  });

  // Device Frame Preview toggle (starts true on wide screens, can be toggled)
  const [isPhoneFrame, setIsPhoneFrame] = useState<boolean>(true);

  // Phone number
  const [phone, setPhone] = useState<string>('01712 345678');

  // Crop Plans
  const [plans, setPlans] = useState<CropPlan[]>(() => {
    const saved = localStorage.getItem('fosolsetu_plans');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) {}
    }
    // Default initial mock plan
    return [
      {
        id: 101,
        crop: 'rice',
        land: 5,
        dist: 'Bogura',
        date: '2026-11-28',
        women: false,
        score: 86,
        pct: 5,
        adv: 44500,
        fee: 2225,
        net: 42275,
        rep: 44500,
        repDate: '2026-12-05',
        est: 148500,
        status: 'active',
      },
    ];
  });

  // Currently inspected plan for offer
  const [currentPlan, setCurrentPlan] = useState<CropPlan | null>(null);

  // Market Listings
  const [listings, setListings] = useState<Listing[]>(() => {
    const saved = localStorage.getItem('fosolsetu_listings');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) {}
    }
    return INITIAL_SEED_LISTINGS;
  });

  // Subscription plan
  const [subscription, setSubscription] = useState<string>('Pro');

  // Selected buyer for wholesale bidding
  const [selectedBuyerId, setSelectedBuyerId] = useState<string>('b1');

  // Interactive Modals
  const [toastMessage, setToastMessage] = useState<string>('');
  const [bkashModalOpen, setBkashModalOpen] = useState<boolean>(false);
  const [bkashAmount, setBkashAmount] = useState<number>(0);
  const [doctorModalOpen, setDoctorModalOpen] = useState<boolean>(false);

  // Sync theme to document element
  useEffect(() => {
    if (isDark) {
      document.documentElement.setAttribute('data-theme', 'dark');
      localStorage.setItem('fosolsetu_theme', 'dark');
    } else {
      document.documentElement.setAttribute('data-theme', 'light');
      localStorage.setItem('fosolsetu_theme', 'light');
    }
  }, [isDark]);

  // Sync state to localStorage
  useEffect(() => {
    localStorage.setItem('fosolsetu_lang', lang);
  }, [lang]);

  useEffect(() => {
    if (role) localStorage.setItem('fosolsetu_role', role);
    else localStorage.removeItem('fosolsetu_role');
  }, [role]);

  useEffect(() => {
    localStorage.setItem('fosolsetu_view', currentView);
  }, [currentView]);

  useEffect(() => {
    localStorage.setItem('fosolsetu_plans', JSON.stringify(plans));
  }, [plans]);

  useEffect(() => {
    localStorage.setItem('fosolsetu_listings', JSON.stringify(listings));
  }, [listings]);

  // Toast helper
  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage('');
    }, 3500);
  };

  // Language toggler
  const handleToggleLang = () => {
    const next = lang === 'bn' ? 'en' : 'bn';
    setLang(next);
    showToast(next === 'bn' ? 'ভাষা: বাংলা নির্বাচন করা হয়েছে' : 'Language set to English');
  };

  // Theme toggler
  const handleToggleTheme = () => {
    setIsDark(!isDark);
  };

  // Navigation helper
  const handleNavigate = (view: ViewType) => {
    setCurrentView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Role login
  const handleLogin = (selectedRole: UserRole) => {
    setRole(selectedRole);
    if (selectedRole === 'farmer') {
      setCurrentView('home');
      showToast(lang === 'bn' ? 'কৃষক অ্যাকাউন্টে স্বাগতম!' : 'Welcome to Farmer Portal!');
    } else if (selectedRole === 'buyer') {
      setCurrentView('browse');
      showToast(lang === 'bn' ? 'পাইকারি ক্রেতা ড্যাশবোর্ডে স্বাগতম!' : 'Welcome to Wholesale Buyer Hub!');
    } else {
      setCurrentView('admin');
      showToast(lang === 'bn' ? 'পার্টনার অ্যাডমিন ড্যাশবোর্ডে স্বাগতম!' : 'Welcome to Partner Analytics!');
    }
  };

  // Save new crop plan
  const handleSavePlan = (newPlan: CropPlan) => {
    setPlans((prev) => [newPlan, ...prev]);
    setCurrentPlan(newPlan);
    setCurrentView('offer');
    showToast(lang === 'bn' ? 'আপনার অগ্রিম অফার প্রস্তুত!' : 'Your micro-advance offer is ready!');
  };

  // Accept advance
  const handleAcceptAdvance = (plan: CropPlan) => {
    setPlans((prev) =>
      prev.map((p) => (p.id === plan.id ? { ...p, status: 'active' } : p))
    );
    setBkashAmount(plan.net);
    setBkashModalOpen(true);
    showToast(
      lang === 'bn'
        ? `বিকাশে ${plan.net} টাকা জমা হয়েছে!`
        : `Disbursed ${plan.net} BDT to bKash!`
    );
    setCurrentView('home');
  };

  // Create marketplace listing
  const handleCreateListing = (newListing: Listing) => {
    setListings((prev) => [newListing, ...prev]);
    showToast(lang === 'bn' ? 'ফসল বাজারে সফলভাবে তালিকাভুক্ত হয়েছে!' : 'Crop listed in marketplace!');
    setCurrentView('market');

    // Simulate verified buyers sending bids
    setTimeout(() => {
      const buyer1 = BUYERS[0];
      const bidPrice = Math.round(newListing.ask * 0.98);
      setListings((prev) =>
        prev.map((l) =>
          l.id === newListing.id
            ? {
                ...l,
                offers: [
                  ...l.offers,
                  {
                    id: 'bid_' + Date.now(),
                    b: buyer1,
                    price: bidPrice,
                    qty: newListing.qty,
                    st: 'new',
                    timestamp: 'Just now',
                  },
                ],
              }
            : l
        )
      );
      showToast(
        lang === 'bn'
          ? `কারিম অ্যাগ্রো ট্রেডার্স থেকে নতুন অফার: ${bidPrice} টাকা/মণ`
          : `New offer from Karim Agro Traders: ${bidPrice} BDT/maund`
      );
    }, 2000);

    setTimeout(() => {
      const buyer2 = BUYERS[1];
      const bidPrice2 = Math.round(newListing.ask * 1.02);
      setListings((prev) =>
        prev.map((l) =>
          l.id === newListing.id
            ? {
                ...l,
                offers: [
                  ...l.offers,
                  {
                    id: 'bid2_' + Date.now(),
                    b: buyer2,
                    price: bidPrice2,
                    qty: Math.round(newListing.qty * 0.8),
                    st: 'new',
                    timestamp: 'Just now',
                  },
                ],
              }
            : l
        )
      );
      showToast(
        lang === 'bn'
          ? `বেঙ্গল এক্সপোর্ট থেকে প্রিমিয়াম অফার: ${bidPrice2} টাকা/মণ`
          : `Premium offer from Bengal Export Ltd: ${bidPrice2} BDT/maund`
      );
    }, 5000);
  };

  // Accept or reject buyer bid
  const handleDecideOffer = (listingId: string, offerId: string, accept: boolean) => {
    setListings((prev) =>
      prev.map((l) => {
        if (l.id !== listingId) return l;

        const updatedOffers = l.offers.map((o) =>
          o.id === offerId
            ? { ...o, st: accept ? ('accepted' as const) : ('rejected' as const) }
            : o
        );

        const acceptedOffer = accept ? l.offers.find((o) => o.id === offerId) : undefined;

        return {
          ...l,
          offers: updatedOffers,
          sold: accept ? acceptedOffer : l.sold,
        };
      })
    );

    if (accept) {
      // Mark linked crop plan as repaid
      const listing = listings.find((l) => l.id === listingId);
      if (listing && listing.plan) {
        setPlans((prev) =>
          prev.map((p) => (p.id === listing.plan ? { ...p, status: 'repaid' } : p))
        );
      }
      showToast(
        lang === 'bn'
          ? 'বিক্রয় চুক্তি সফলভাবে সম্পন্ন হয়েছে! টাকা ওয়ালেটে যোগ হয়েছে।'
          : 'Deal settled! Sale revenue credited to wallet.'
      );
    } else {
      showToast(lang === 'bn' ? 'অফার প্রত্যাখ্যান করা হয়েছে' : 'Offer rejected');
    }
  };

  // Send offer as buyer
  const handleSendBuyerOffer = (listingId: string, discountPct: number) => {
    const buyer = BUYERS.find((b) => b.id === selectedBuyerId) || BUYERS[0];
    const listing = listings.find((l) => l.id === listingId);
    if (!listing) return;

    const price = Math.round(listing.ask * (1 - discountPct / 100));

    setListings((prev) =>
      prev.map((l) =>
        l.id === listingId
          ? {
              ...l,
              offers: [
                ...l.offers,
                {
                  id: 'buyer_bid_' + Date.now(),
                  b: buyer,
                  price,
                  qty: l.qty,
                  st: 'new',
                  timestamp: 'Just now',
                },
              ],
            }
          : l
      )
    );

    showToast(
      lang === 'bn'
        ? `কৃষকের কাছে ${price} টাকা দরে অফার পাঠানো হয়েছে!`
        : `Bid submitted to farmer at ${price} BDT/maund!`
    );
  };

  // Call input shop
  const handleCallDealer = (tel: string, name: string) => {
    showToast(lang === 'bn' ? `${name} এ কল করা হচ্ছে (${tel})...` : `Dialing ${name} (${tel})...`);
    window.location.href = `tel:${tel}`;
  };

  // Active buyer object
  const activeBuyer = BUYERS.find((b) => b.id === selectedBuyerId) || BUYERS[0];

  return (
    <MobileFrame enabled={isPhoneFrame}>
      {/* Toast Bar */}
      <Toast message={toastMessage} onClose={() => setToastMessage('')} />

      {/* Header */}
      <Header
        lang={lang}
        onToggleLang={handleToggleLang}
        isDark={isDark}
        onToggleTheme={handleToggleTheme}
        role={role}
        onSwitchRole={(r) => {
          if (!r) {
            setRole(null);
            setCurrentView('login');
          } else {
            handleNavigate(r === 'farmer' ? 'home' : r === 'buyer' ? 'browse' : 'admin');
          }
        }}
        isPhoneFrame={isPhoneFrame}
        onTogglePhoneFrame={() => setIsPhoneFrame(!isPhoneFrame)}
      />

      {/* Main View Area */}
      <main className="flex-1 p-4 max-w-md mx-auto w-full">
        {(!role || currentView === 'login') && (
          <LoginView
            phone={phone}
            onSetPhone={setPhone}
            onLogin={handleLogin}
            lang={lang}
          />
        )}

        {role === 'farmer' && currentView === 'home' && (
          <HomeView
            plans={plans}
            onNavigate={handleNavigate}
            onSelectPlan={(p) => {
              setCurrentPlan(p);
              setCurrentView('offer');
            }}
            lang={lang}
            onOpenDoctor={() => setDoctorModalOpen(true)}
          />
        )}

        {role === 'farmer' && currentView === 'plan' && (
          <PlanView onSavePlan={handleSavePlan} lang={lang} />
        )}

        {role === 'farmer' && currentView === 'offer' && currentPlan && (
          <OfferView
            plan={currentPlan}
            onAccept={handleAcceptAdvance}
            onCancel={() => handleNavigate('home')}
            lang={lang}
          />
        )}

        {role === 'farmer' && currentView === 'market' && (
          <MarketView
            listings={listings}
            plans={plans}
            onCreateListing={handleCreateListing}
            onDecideOffer={handleDecideOffer}
            lang={lang}
          />
        )}

        {currentView === 'weather' && <WeatherView lang={lang} />}

        {currentView === 'dealers' && (
          <DealersView lang={lang} onCall={handleCallDealer} />
        )}

        {currentView === 'women' && (
          <WomenView lang={lang} onStartPlan={() => handleNavigate('plan')} />
        )}

        {currentView === 'plans' && (
          <PlansView
            currentPlan={subscription}
            onSelectPlan={(id) => {
              setSubscription(id);
              showToast(
                lang === 'bn' ? `${id} প্যাকেজ সক্রিয় করা হয়েছে!` : `${id} Plan activated!`
              );
            }}
            lang={lang}
          />
        )}

        {role === 'farmer' && currentView === 'more' && (
          <MoreView
            onNavigate={handleNavigate}
            lang={lang}
            onToggleLang={handleToggleLang}
            isDark={isDark}
            onToggleTheme={handleToggleTheme}
            onLogout={() => {
              setRole(null);
              setCurrentView('login');
            }}
            onOpenDoctor={() => setDoctorModalOpen(true)}
          />
        )}

        {/* Buyer Views */}
        {role === 'buyer' && currentView === 'browse' && (
          <BuyerView
            listings={listings}
            buyers={BUYERS}
            selectedBuyerId={selectedBuyerId}
            onSelectBuyer={setSelectedBuyerId}
            onSendOffer={handleSendBuyerOffer}
            lang={lang}
          />
        )}

        {role === 'buyer' && currentView === 'bprofile' && (
          <BuyerProfileView buyer={activeBuyer} lang={lang} />
        )}

        {/* Admin Dashboard */}
        {role === 'admin' && (
          <AdminView
            plans={plans}
            lang={lang}
            onBack={() => {
              setRole(null);
              setCurrentView('login');
            }}
          />
        )}
      </main>

      {/* Thumb-friendly Bottom Navigation Bar */}
      {role && currentView !== 'login' && (
        <BottomNav
          role={role}
          currentView={currentView}
          onNavigate={handleNavigate}
          lang={lang}
        />
      )}

      {/* bKash Disbursement Proof Modal */}
      <BkashModal
        isOpen={bkashModalOpen}
        onClose={() => setBkashModalOpen(false)}
        amount={bkashAmount}
        phone={phone}
        lang={lang}
      />

      {/* AI Crop Doctor Modal */}
      <CropDoctorModal
        isOpen={doctorModalOpen}
        onClose={() => setDoctorModalOpen(false)}
        lang={lang}
      />
    </MobileFrame>
  );
}
