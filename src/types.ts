export type Language = 'bn' | 'en';

export type UserRole = 'farmer' | 'buyer' | 'admin';

export type ViewType = 
  | 'login'
  | 'home'
  | 'plan'
  | 'offer'
  | 'market'
  | 'weather'
  | 'dealers'
  | 'women'
  | 'plans'
  | 'browse'
  | 'bprofile'
  | 'admin'
  | 'more';

export interface CropInfo {
  id: string;
  ic: string;
  en: string;
  bn: string;
  h: number[];      // Historical prices (past 6 weeks)
  f: number[];      // Forecast prices (next 3 weeks)
  y: number;        // Average yield in maund (মন) per bigha (বিঘা)
  pr: number;       // Current market price per maund in BDT
  seasonEn: string;
  seasonBn: string;
}

export interface CropPlan {
  id: number;
  crop: string;
  land: number;
  dist: string;
  date: string;
  women: boolean;
  score: number;
  pct: number;
  adv: number;
  fee: number;
  net: number;
  rep: number;
  repDate: string;
  est: number;
  status: 'offer' | 'active' | 'repaid';
  disbursedTo?: string;
  disbursedAt?: string;
}

export interface Buyer {
  id: string;
  n: string;
  t: string;
  d: string;
  ok: boolean;
  phone?: string;
  rating?: number;
}

export interface Offer {
  id: string;
  b: Buyer;
  price: number;
  qty: number;
  st: 'new' | 'accepted' | 'rejected';
  timestamp?: string;
}

export interface Listing {
  id: string;
  farmer: string;
  crop: string;
  qty: number;
  ask: number;
  dist: string;
  offers: Offer[];
  plan?: number;
  mine?: boolean;
  sold?: Offer;
}

export interface WeatherAlert {
  ic: string;
  s: 'r' | 'w' | 'g'; // red, warning, good
  en: string;
  bn: string;
  den: string;
  dbn: string;
  temp?: string;
  humidity?: string;
}

export interface Dealer {
  n: string;
  d: string;
  i: string;
  f: boolean;
  phone: string;
}
