import { MenuItem, VenueSpace, BanquetTier, PackageAddon, CustomerReview } from './types';

export const RESTAURANT_INFO = {
  name: "Dastarkhan",
  fullName: "Dastarkhan Restaurant & Banquet Hall",
  tagline: "Traditional Flavors, Modern Elegance",
  shortDescription: "The Pride of Gowalabazar, Osmaninagar. Experience authentic Mughlai dining, regional Chuijhal specialties, and majestic banquet halls for life's most cherished celebrations.",
  address: "Umorpur Road, Gowalabazar, Osmaninagar, Sylhet.",
  phone: "+8801790 69 86 80",
  email: "dastarkhanbanquethall@gmail.com",
  facebook: "Dastarkhan Restaurent & Benquet Hall",
  hours: {
    dinner: "Saturday – Thursday | 11:30 AM – 11:30 PM",
    friday: "Friday | 1:30 PM – 11:30 PM",
    banquetInquiries: "Everyday | 9:00 AM – 9:00 PM"
  },
  dressCode: "Smart Casual & Elegant Traditional"
};

export const MENU_ITEMS: MenuItem[] = [
  // Signature & Mughlai
  {
    id: "sig1",
    name: "Dastarkhan Royal Tandoori Platter",
    bengaliTitle: "দস্তরখান শাহি তন্দুরি প্ল্যাটার",
    category: "signature",
    description: "An imperial selection of charcoal-roasted Peshawari mutton chops, Reshmi chicken tikka, and jumbo bay tiger prawns marinated in saffron yogurt and Sylheti spice blend.",
    price: 2400,
    priceFormatted: "৳2,400",
    dietary: ["Halal", "Signature"],
    pairingNote: "Pairs perfectly with Shahi Borhani & Garlic Butter Naan",
    imageUrl: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1000&q=80"
  },
  {
    id: "sig2",
    name: "Chicken Chuijhal Curry",
    bengaliTitle: "চিকেন চুইঝাল স্পেশাল",
    category: "signature",
    description: "Our signature regional heritage curry cooked with aromatic Chuijhal bark pepper stems, slow-roasted cumin, and farm-fresh chicken.",
    price: 250,
    priceFormatted: "৳250",
    dietary: ["Halal", "Signature", "Spicy", "Popular"],
    pairingNote: "Traditional Kalijeera White Rice or Steamed Polao",
    imageUrl: "https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "sig3",
    name: "Beef Chuijhal Bhuna",
    bengaliTitle: "বিফ চুইঝাল ভুনা",
    category: "signature",
    description: "Tender slow-cooked organic beef simmered with indigenous Chuijhal bark root and caramelized onions for an authentic earthy warmth.",
    price: 280,
    priceFormatted: "৳280",
    dietary: ["Halal", "Signature", "Spicy", "Popular"],
    pairingNote: "Garlic Naan or Steamed Kalijeera Rice",
    imageUrl: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "sig4",
    name: "Mutton Chuijhal Masala",
    bengaliTitle: "মাটন চুইঝাল মাসালা",
    category: "signature",
    description: "Succulent mutton pieces cooked in rich Mughlai gravy with Chuijhal pepper stems, whole garlic cloves, and royal spices.",
    price: 350,
    priceFormatted: "৳350",
    dietary: ["Halal", "Signature", "Spicy"],
    pairingNote: "Laccha Paratha or Kashmiri Naan",
    imageUrl: "https://images.unsplash.com/photo-1541544741938-0af808871cc0?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "sig5",
    name: "Sylheti Shatkora Beef Bhuna",
    bengaliTitle: "সিলেটি সাতকড়া বিফ ভুনা",
    category: "signature",
    description: "Tender beef simmered with indigenous citrus Shatkora from Jaintiapur hills, roasted cumin, and caramelized onions.",
    price: 950,
    priceFormatted: "৳950",
    dietary: ["Halal", "Signature", "Spicy"],
    pairingNote: "Traditional Kalijeera White Rice",
    imageUrl: "https://images.unsplash.com/photo-1574484284002-952d92456975?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "sig6",
    name: "Royal Mutton Rezala",
    bengaliTitle: "শাহি খাসির রোজালা",
    category: "signature",
    description: "A rich white Mughlai gravy made with poppy seeds, yogurt, almond paste, and tender cuts of mutton seasoned with mace and rose water.",
    price: 1050,
    priceFormatted: "৳1,050",
    dietary: ["Halal", "Signature"],
    pairingNote: "Best enjoyed with Laccha Paratha or Kashmiri Naan",
    imageUrl: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&w=800&q=80"
  },

  // Biriyani, Rice & Traditional
  {
    id: "bir1",
    name: "Grand Mughlai Kacchi Biriyani",
    bengaliTitle: "শাহি কাচ্চি বিরিয়ানি",
    category: "biriyani",
    description: "The crown jewel of celebrations—fragrant Chinigura rice layered with succulent baby mutton, saffron potatoes, kewra water, and whole royal aromatic spices.",
    price: 450,
    priceFormatted: "৳450",
    dietary: ["Halal", "Signature", "Popular"],
    pairingNote: "Served with Shahi Borhani & Roasted Cucumber Raita",
    imageUrl: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=1000&q=80"
  },
  {
    id: "bir2",
    name: "Dastarkhan Bamboo Kacchi",
    bengaliTitle: "ঐতিহ্যবাহী বাঁশ কাচ্চি",
    category: "biriyani",
    description: "Our famous specialty Biryani layered inside green bamboo tubes and steamed over charcoal to seal in the natural bamboo fragrance.",
    price: 320,
    priceFormatted: "৳320",
    dietary: ["Halal", "Signature", "Chef Choice"],
    pairingNote: "Plum Chutney & Cucumber Salad",
    imageUrl: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=1000&q=80"
  },
  {
    id: "bir3",
    name: "Haydrabadi Mutton Biriyani",
    bengaliTitle: "হায়দ্রাবাদি মাটন বিরিয়ানি",
    category: "biriyani",
    description: "Spicy aromatic Hyderabadi dum biryani cooked with marinated mutton, saffron milk, and fried golden onions.",
    price: 450,
    priceFormatted: "৳450",
    dietary: ["Halal", "Spicy"],
    imageUrl: "https://images.unsplash.com/photo-1633945274405-b6c8069047b0?auto=format&fit=crop&w=1000&q=80"
  },
  {
    id: "bir4",
    name: "Tandoori Chicken Biriyani",
    bengaliTitle: "তান্দুরি চিকেন বিরিয়ানি",
    category: "biriyani",
    description: "Char-grilled tandoori chicken quarter served over spiced aromatic Chinigura rice with saffron aroma.",
    price: 290,
    priceFormatted: "৳290",
    dietary: ["Halal", "Popular"],
    imageUrl: "https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "bir5",
    name: "Beef Kala Bhuna Heritage",
    bengaliTitle: "ঐতিহ্যবাহী বিফ কালা ভুনা",
    category: "biriyani",
    description: "Authentic Chittagong & Sylhet style dark roasted beef bhuna simmered in 16 ground spices until deep caramelization.",
    price: 399,
    priceFormatted: "৳399",
    dietary: ["Halal", "Signature", "Spicy"],
    pairingNote: "Steamed White Rice or Paratha",
    imageUrl: "https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?auto=format&fit=crop&w=800&q=80"
  },

  // Kabab, Sizzling & BBQ (Grill)
  {
    id: "gr1",
    name: "Chicken Reshmi Kabab",
    bengaliTitle: "চিকেন রেশমি কাবাব",
    category: "grill",
    description: "Melt-in-mouth chicken breasts marinated in clotted cream, crushed white pepper, cashew paste, and fresh cardamom.",
    price: 220,
    priceFormatted: "৳220",
    dietary: ["Halal", "Popular"],
    pairingNote: "Mint & Cilantro Yogurt Chutney with Butter Naan",
    imageUrl: "https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "gr2",
    name: "Chicken Hariyali Kabab",
    bengaliTitle: "চিকেন হারিয়ালি কাবাব",
    category: "grill",
    description: "Succulent chicken boneless cubes marinated in green herbs, mint, coriander, green chili, and roasted cumin.",
    price: 230,
    priceFormatted: "৳230",
    dietary: ["Halal", "Spicy"],
    imageUrl: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "gr3",
    name: "Dastarkhan Mix Sizzling Platter",
    bengaliTitle: "মিক্স সিজলিং স্পেশাল",
    category: "grill",
    description: "A sizzling cast-iron platter featuring tender beef slices, chicken strips, and tiger prawns tossed with bell peppers and garlic oyster reduction.",
    price: 650,
    priceFormatted: "৳650",
    dietary: ["Halal", "Signature", "Chef Choice"],
    pairingNote: "Garlic Butter Naan or Egg Fried Rice",
    imageUrl: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=1000&q=80"
  },
  {
    id: "gr4",
    name: "Char-Grilled BBQ Lobster",
    bengaliTitle: "বি.বি.কিউ. লবস্টার স্পেশাল",
    category: "grill",
    description: "Fresh seafood lobster grilled over charcoal coals with garlic lemon butter and Sylheti chili marinade.",
    price: 1200,
    priceFormatted: "৳1,200",
    dietary: ["Halal", "Signature"],
    imageUrl: "https://images.unsplash.com/photo-1553240799-36bbf332a5c3?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "gr5",
    name: "BBQ Coral Fish Whole",
    bengaliTitle: "আস্ত বি.বি.কিউ. কোরাল মাছ",
    category: "grill",
    description: "Whole fresh Coral fish marinated in mustard oil, tandoori masala, and lemon juice, roasted in our clay tandoor.",
    price: 800,
    priceFormatted: "৳800",
    dietary: ["Halal", "Chef Choice"],
    imageUrl: "https://images.unsplash.com/photo-1534939561126-855b8675edd7?auto=format&fit=crop&w=800&q=80"
  },

  // Value Platters & Wow Offers
  {
    id: "pl1",
    name: "Wow Offer Platter",
    bengaliTitle: "ওয়াও অফার স্পেশাল প্ল্যাটার",
    category: "platters",
    description: "A complete feast! Includes D.K. Special Thai Soup, Crispy Wonton, Thai Fried Rice, Sautéed Vegetable, Fried Chicken, Chicken/Beef Masala, Salad & Drink.",
    price: 480,
    priceFormatted: "৳480",
    dietary: ["Halal", "Popular", "Value Deal"],
    imageUrl: "https://images.unsplash.com/photo-1617093727343-374698b1b08d?auto=format&fit=crop&w=1000&q=80"
  },
  {
    id: "pl2",
    name: "Platter 1: Classic Thai & Crispy Combo",
    bengaliTitle: "কম্বো প্ল্যাটার ১",
    category: "platters",
    description: "Thai Fried Rice, Thai Fried Chicken, Mix Vegetable, Chicken Masala, Fresh Green Salad, Soft Drink & Mineral Water.",
    price: 320,
    priceFormatted: "৳320",
    dietary: ["Halal", "Value Deal"],
    imageUrl: "https://images.unsplash.com/photo-1559847844-5315695dadae?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "pl3",
    name: "Platter 2: Royal Beef Masala Feast",
    bengaliTitle: "কম্বো প্ল্যাটার ২ (বিফ মাসালা)",
    category: "platters",
    description: "Fried Rice, Thai Fried Chicken, Sautéed Vegetable, Royal Beef Masala, Fresh Salad, Soft Drink & Mineral Water.",
    price: 380,
    priceFormatted: "৳380",
    dietary: ["Halal", "Value Deal", "Popular"],
    imageUrl: "https://images.unsplash.com/photo-1604382355076-af4b0eb60143?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "pl4",
    name: "Student Special Value Platter",
    bengaliTitle: "স্টুডেন্ট স্পেশাল প্ল্যাটার",
    category: "platters",
    description: "Generous serving of Fried Rice, Thai Fried Chicken, Mix Vegetable, Salad, Soft Drink & Mineral Water.",
    price: 250,
    priceFormatted: "৳250",
    dietary: ["Halal", "Value Deal"],
    imageUrl: "https://images.unsplash.com/photo-1600891964599-f61ba0e24092?auto=format&fit=crop&w=800&q=80"
  },

  // Pan-Asian & Special Appetizers
  {
    id: "pan1",
    name: "D.K. Special Thai Clear & Coconut Soup",
    bengaliTitle: "ডি.কে. স্পেশাল থাই স্যুপ",
    category: "panasian",
    description: "Our signature family-bowl Thai soup loaded with chicken, prawns, mushrooms, lemongrass, galangal, and coconut cream.",
    price: 750,
    priceFormatted: "৳750",
    dietary: ["Halal", "Signature"],
    imageUrl: "https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "pan2",
    name: "Deep Dish Pizza Special (12 inch)",
    bengaliTitle: "ডিপ ডিশ পিৎজা স্পেশাল (১২ ইঞ্চি)",
    category: "panasian",
    description: "Hand-tossed deep dish pizza loaded with tandoori chicken, beef pepperoni, capsicum, olives, and double mozzarella cheese.",
    price: 1250,
    priceFormatted: "৳1,250",
    dietary: ["Halal", "Chef Choice"],
    imageUrl: "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "pan3",
    name: "D.K. Special Mix Chowmein",
    bengaliTitle: "স্পেশাল মিক্স চাওমিন",
    category: "panasian",
    description: "Wok-tossed egg noodles with chicken, beef, prawns, crisp vegetables, and sesame soy glaze.",
    price: 450,
    priceFormatted: "৳450",
    dietary: ["Halal"],
    imageUrl: "https://images.unsplash.com/photo-1585032226651-759b368d7246?auto=format&fit=crop&w=800&q=80"
  },

  // Desserts & Faluda
  {
    id: "d1",
    name: "Dastarkhan Special Faluda",
    bengaliTitle: "স্পেশাল শাহি ফালুদা",
    category: "desserts",
    description: "A sumptuous layered dessert with rose syrup, sweet basil seeds, vermicelli, seasonal fruits, thick rabri, and a scoop of vanilla ice cream.",
    price: 250,
    priceFormatted: "৳250",
    dietary: ["Vegetarian", "Signature", "Popular"],
    imageUrl: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "d2",
    name: "Shahi Tukda Royal",
    bengaliTitle: "শাহি টুকরা রয়্যাল",
    category: "desserts",
    description: "Golden fried brioche steeped in saffron cardamom syrup, topped with thick condensed rabri, slivered pistachios, and edible gold leaf.",
    price: 380,
    priceFormatted: "৳380",
    dietary: ["Vegetarian", "Signature"],
    imageUrl: "https://images.unsplash.com/photo-1587314168485-3236d6710814?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "d3",
    name: "Saffron Pista Firni (Clay Pot)",
    bengaliTitle: "জাফরানি পেস্তা ফিরনি",
    category: "desserts",
    description: "Slow-cooked ground aromatic rice pudding chilled in handcrafted earthen clay pots for an authentic earthy aroma.",
    price: 180,
    priceFormatted: "৳180",
    dietary: ["Vegetarian"],
    imageUrl: "https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=800&q=80"
  },

  // Beverages & Mocktails
  {
    id: "b1",
    name: "Blue Lemon Mojito Signature",
    bengaliTitle: "ব্লু লেমন মোজিতো",
    category: "beverages",
    description: "Our famous blue ocean sparkling mocktail muddled with fresh lime, mint leaves, blue curaçao syrup, and crushed ice.",
    price: 160,
    priceFormatted: "৳160",
    dietary: ["Vegetarian", "Signature", "Popular"],
    imageUrl: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "b2",
    name: "Shahi Borhani Heritage",
    bengaliTitle: "শাহি সিলেটি বোরহানি",
    category: "beverages",
    description: "Our legendary digestive wedding drink—whisked sour curd infused with roasted cumin, mint, green chili, and black rock salt.",
    price: 220,
    priceFormatted: "৳220",
    dietary: ["Vegetarian", "Signature"],
    imageUrl: "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "b3",
    name: "Sylheti 7-Layer Tea Heritage",
    bengaliTitle: "সিলেটি ৭-লেয়ার চা",
    category: "beverages",
    description: "The world-famous layered tea from Sreemangal tea gardens, showcasing 7 distinct flavor strata of green, black, spiced, and condensed teas.",
    price: 250,
    priceFormatted: "৳250",
    dietary: ["Vegetarian", "Signature"],
    imageUrl: "https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=800&q=80"
  }
];

export const VENUE_SPACES: VenueSpace[] = [
  {
    id: "royal-ballroom",
    name: "THE ROYAL BALLROOM",
    subtitle: "Celebrate life's milestones in Osmaninagar's most prestigious venue.",
    capacitySeated: 500,
    capacityStanding: 700,
    areaSqFt: 8500,
    description: "Our expansive pillarless ballroom features high-vaulted ceilings, sparkling crystal chandeliers, and acoustic paneling. Designed to accommodate large-scale weddings, reception galas, and grand community summits with supreme comfort.",
    features: [
      "Capacity: Up to 500 Guests Seated",
      "Pillarless 24-ft High Ceilings with Crystal Chandeliers",
      "Advanced Climate Control & Whisper-Quiet HVAC",
      "Integrated Pro Sound System & Stage Lighting",
      "Private Bridal & VIP Lounge Access"
    ],
    idealFor: ["Grand Wedding Receptions", "Corporate Conventions", "Milestone Galas", "Charity Banquets"],
    imageUrl: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=1200&q=80",
    galleryUrls: [
      "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?auto=format&fit=crop&w=1200&q=80"
    ]
  },
  {
    id: "executive-suite",
    name: "SYLHET EXECUTIVE SUITE",
    subtitle: "An intimate, boardroom-style sanctuary for corporate summits and executive meetings.",
    capacitySeated: 80,
    capacityStanding: 100,
    areaSqFt: 2200,
    description: "Designed for corporate leaders, diplomatic luncheons, and exclusive family gatherings. Equipped with 4K display panels, soundproof walls, and dedicated butler service from our kitchen.",
    features: [
      "Capacity: Up to 80 Guests",
      "Private Audio-Visual Suite & 4K Displays",
      "Dedicated Maître D' & Custom Degustation Service",
      "Soundproof Architectural Paneling",
      "High-Speed Fiber Connectivity"
    ],
    idealFor: ["Corporate Summits", "Executive Dinners", "Private Family Celebrations", "Board Meetings"],
    imageUrl: "https://images.unsplash.com/photo-1517502884422-41eaead166d4?auto=format&fit=crop&w=1200&q=80",
    galleryUrls: [
      "https://images.unsplash.com/photo-1517502884422-41eaead166d4?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&w=1200&q=80"
    ]
  },
  {
    id: "starlight-terrace",
    name: "THE STARLIGHT TERRACE",
    subtitle: "An enchanting open-air rooftop garden under string lights and starry night skies.",
    capacitySeated: 150,
    capacityStanding: 200,
    areaSqFt: 3800,
    description: "Overlooking the tranquil greenery of Osmaninagar, The Starlight Terrace provides an atmospheric outdoor setting with warm ambient bistro lighting, comfortable lounge seating, and live barbecue stations.",
    features: [
      "Capacity: Up to 150 Guests",
      "Open-Air Rooftop Garden with String Lights",
      "Live Charcoal Tandoor & Kebabs Station",
      "Custom Canopy & Weather Protection Options",
      "Panoramic Views of Osmaninagar"
    ],
    idealFor: ["Holud & Mehendi Nights", "Sunset Receptions", "Cocktail & Mocktail Soirées", "Anniversary Parties"],
    imageUrl: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=1200&q=80",
    galleryUrls: [
      "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=1200&q=80"
    ]
  }
];

export const BANQUET_TIERS: BanquetTier[] = [
  {
    id: "package-a",
    name: "PACKAGE A: CLASSIC SYLHETI",
    subtitle: "Traditional Flavors, 5 courses",
    pricePerGuest: 1500,
    inclusions: [
      "Traditional 5-Course Sylheti Feast",
      "Choice of Akhni Biryani or Steamed Kalijeera Polao",
      "Sylheti Chicken Roast & Tandoori Kebab Starter",
      "Shahi Borhani & Fresh Seasonal Salad",
      "Saffron Pista Firni Dessert",
      "Standard White Linen Setup & Waitstaff"
    ],
    recommendedFor: "Family Receptions & Community Banquets"
  },
  {
    id: "package-b",
    name: "PACKAGE B: ROYAL HERITAGE",
    subtitle: "Premium selection, 7 courses",
    pricePerGuest: 2200,
    inclusions: [
      "7-Course Mughal & Sylheti Gastronomic Selection",
      "Grand Mughlai Kachi Biryani & Mutton Rezala",
      "Assorted Tandoori Kebab Platter (Prawn & Reshmi)",
      "Sylheti Shatkora Beef Bhuna",
      "Shahi Tukda Royal & Saffron Firni",
      "Premium Gold Rim Tableware & Dedicated Captain"
    ],
    recommendedFor: "Weddings, Receptions & Corporate Galas"
  },
  {
    id: "package-c",
    name: "PACKAGE C: SIGNATURE LUXE",
    subtitle: "Exclusive menu, 9 courses + Welcome drinks",
    pricePerGuest: 3500,
    inclusions: [
      "9-Course Imperial Banquet with Live Carving / Barbecue Station",
      "Welcome Mocktails & Canapés on Arrival",
      "Whole Roasted Lamb Leg (Raan-e-Dastarkhan) & Tiger Prawns",
      "Dry-Aged Beef Wellington Tasting & Chital Kofta",
      "Sylheti 7-Layer Tea Experience & Dessert Bar",
      "VIP Royal Lounge Access & Priority Valet Parking"
    ],
    recommendedFor: "Prestige Weddings & VIP Dignitary Summits"
  }
];

export const PACKAGE_ADDONS: PackageAddon[] = [
  {
    id: "addon-decor",
    name: "Floral Stage Decor",
    price: 15000,
    priceLabel: "+৳15k",
    description: "Custom floral stage canopy with fresh orchids, roses, and warm spotlight framing."
  },
  {
    id: "addon-photo",
    name: "Photography Pkg",
    price: 18000,
    priceLabel: "+৳18k",
    description: "Professional event cinematography, drone shots, and instant prints."
  },
  {
    id: "addon-music",
    name: "Live Music Setup",
    price: 15000,
    priceLabel: "+৳15k",
    description: "Traditional classical sitar or acoustic ensemble sound stage."
  },
  {
    id: "addon-valet",
    name: "VIP Valet Service",
    price: 12000,
    priceLabel: "+৳12k",
    description: "Dedicated valet attendants and priority VIP drop-off zone."
  }
];

export const CUSTOMER_REVIEWS: CustomerReview[] = [
  {
    id: "rev1",
    author: "Ahmed R.",
    role: "Google Local Guide",
    text: "The Tandoori Chicken is easily the best in Sylhet. But it's the atmosphere that really makes Dastarkhan special. It feels truly premium yet welcoming.",
    avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
    rating: 5
  },
  {
    id: "rev2",
    author: "Fatimah Z.",
    role: "Event Planner",
    text: "We held our daughter's wedding here and the experience was flawless. The banquet hall team is professional, and the food was praised by every guest.",
    avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
    rating: 5
  },
  {
    id: "rev3",
    author: "Sohail M.",
    role: "Business Traveler",
    text: "Dastarkhan brings a level of fine dining to Osmaninagar that was missing. Perfect for business meetings or family dinners. Highly recommended!",
    avatarUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80",
    rating: 5
  }
];
