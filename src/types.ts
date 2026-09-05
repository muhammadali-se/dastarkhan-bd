export type MenuCategory = 
  | 'signature' 
  | 'biriyani' 
  | 'grill' 
  | 'platters' 
  | 'panasian' 
  | 'mains' 
  | 'starters' 
  | 'desserts' 
  | 'beverages';

export interface MenuItem {
  id: string;
  name: string;
  bengaliTitle?: string;
  category: MenuCategory;
  description: string;
  price: number; // in BDT (৳)
  priceFormatted?: string;
  dietary: ('Halal' | 'Signature' | 'Spicy' | 'Vegetarian' | 'Chef Choice' | 'Popular' | 'Value Deal')[];
  pairingNote?: string;
  imageUrl: string;
}

export interface VenueSpace {
  id: string;
  name: string;
  subtitle: string;
  capacitySeated: number;
  capacityStanding?: number;
  areaSqFt?: number;
  description: string;
  features: string[];
  idealFor: string[];
  imageUrl: string;
  galleryUrls: string[];
}

export interface BanquetTier {
  id: string;
  name: string;
  subtitle: string;
  pricePerGuest: number; // in BDT (৳)
  inclusions: string[];
  recommendedFor: string;
}

export interface PackageAddon {
  id: string;
  name: string;
  price: number; // total flat price in BDT
  priceLabel: string; // e.g., "+৳15k"
  description: string;
}

export interface CustomerReview {
  id: string;
  author: string;
  role: string;
  text: string;
  avatarUrl: string;
  rating: number;
}

export interface TableReservation {
  date: string;
  time: string;
  guests: number;
  seatingArea: 'Main Dining Hall' | 'Family Majlis & Booths' | 'VIP Royal Chamber' | 'Starlight Garden Terrace';
  name: string;
  email: string;
  phone: string;
  specialRequests?: string;
}

export interface BanquetInquiry {
  eventType: 'Wedding & Walima' | 'Wedding Reception' | 'Holud & Mehendi' | 'Corporate Summit' | 'Family Milestone' | 'Family Reunion' | 'Other' | 'Other Celebration';
  venueId: string;
  estimatedGuests: number;
  preferredDate: string;
  tierId: string;
  name: string;
  email: string;
  phone: string;
  additionalNotes?: string;
  selectedAddons?: string[];
  estimatedQuote?: number;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'concierge';
  text: string;
  timestamp: string;
}

export interface CartItem {
  dish: MenuItem;
  quantity: number;
  specialInstructions?: string;
}

export interface FoodOrder {
  id: string;
  orderType: 'delivery' | 'takeaway' | 'dine_in';
  items: CartItem[];
  subtotal: number;
  deliveryFee: number;
  total: number;
  customerName: string;
  customerPhone: string;
  deliveryAddress?: string;
  pickupTime?: string;
  paymentMethod: 'cash_on_delivery' | 'bkash_nagad' | 'card_at_counter';
  orderNotes?: string;
  createdAt: string;
}

