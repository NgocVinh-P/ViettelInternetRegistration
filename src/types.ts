export interface InternetPackage {
  id: string;
  name: string;
  price: number; // in VND (Internet Only)
  priceTv?: number; // Internet + TV
  priceCamera?: number; // Internet + Camera
  priceCombo?: number; // Internet + TV + Camera Combo (Mua 1 Được 3)
  speed: string;
  wifiType: string;
  desc: string;
  features: string[];
  isPopular?: boolean;
  category: 'personal' | 'business';
}

export interface RegistrationLead {
  id: string;
  name: string;
  phone: string;
  address: string;
  packageId: string;
  packageName: string;
  packagePrice: number;
  prepayment: string; // 'monthly' | '6m' | '12m' | '18m'
  status: 'pending' | 'called' | 'completed' | 'cancelled';
  createdAt: string;
  notes?: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface TestimonialItem {
  name: string;
  location: string;
  avatar: string;
  rating: number;
  comment: string;
  packageUsed: string;
}
