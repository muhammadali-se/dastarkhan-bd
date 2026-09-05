import React, { useState, useMemo } from 'react';
import { MENU_ITEMS, RESTAURANT_INFO } from '../data';
import { MenuItem, MenuCategory, CartItem } from '../types';
import { Utensils, Sparkles, Filter, X, Award, Flame, CheckCircle2, Search, Eye, Calendar, ArrowRight, ShoppingBag, Plus, Bike } from 'lucide-react';

interface RestaurantMenuSectionProps {
  onOpenTableReservation: () => void;
  onAskConciergeWithPrompt: (prompt: string) => void;
  onAddToCart: (dish: MenuItem, quantity?: number) => void;
  onOpenOrderModal: () => void;
  cartItems?: CartItem[];
}

export const RestaurantMenuSection: React.FC<RestaurantMenuSectionProps> = ({
  onOpenTableReservation,
  onAskConciergeWithPrompt,
  onAddToCart,
  onOpenOrderModal,
  cartItems = []
}) => {
  const [selectedCategory, setSelectedCategory] = useState<MenuCategory | 'all'>('signature');
  const [selectedDietary, setSelectedDietary] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [spotlightDish, setSpotlightDish] = useState<MenuItem | null>(null);

  const getItemQuantityInCart = (dishId: string) => {
    const found = cartItems.find((c) => c.dish.id === dishId);
    return found ? found.quantity : 0;
  };

  const categories: { id: MenuCategory | 'all'; label: string; bengali: string }[] = [
    { id: 'signature', label: 'Signature & Mughlai', bengali: 'শাহি ও চুইঝাল স্পেশাল' },
    { id: 'biriyani', label: 'Biriyani, Kacchi & Rice', bengali: 'কাচ্চি, বিরিয়ানি ও পোলাও' },
    { id: 'grill', label: 'Kabab, Sizzling & BBQ', bengali: 'কাবাব, সিজলিং ও তান্দুরি' },
    { id: 'platters', label: 'Value Platters & Combos', bengali: 'ওয়াও অফার ও কম্বো প্ল্যাটার' },
    { id: 'panasian', label: 'Thai Soup, Chowmein & Pizza', bengali: 'থাই স্যুপ, চাওমিন ও পিৎজা' },
    { id: 'desserts', label: 'Faluda & Desserts', bengali: 'স্পেশাল ফালুদা ও মিষ্টান্ন' },
    { id: 'beverages', label: 'Mocktails & Shahi Drinks', bengali: 'মকশটেল ও ঐতিহ্যবাহী পানীয়' },
    { id: 'all', label: 'View Full Menu', bengali: 'সম্পূর্ণ মেনু সূচি' }
  ];

  const dietaryTags = [
    { id: 'ALL', label: 'All Dishes' },
    { id: 'Popular', label: 'Most Popular' },
    { id: 'Value Deal', label: 'Value Deals' },
    { id: 'Signature', label: 'Chef Signature' },
    { id: 'Spicy', label: 'Spicy & Chuijhal' },
    { id: 'Halal', label: '100% Halal' },
    { id: 'Vegetarian', label: 'Vegetarian' }
  ];

  const filteredItems = useMemo(() => {
    return MENU_ITEMS.filter((item) => {
      const categoryMatch = selectedCategory === 'all' || item.category === selectedCategory;
      const dietaryMatch =
        selectedDietary === 'ALL' || item.dietary.includes(selectedDietary as any);
      const query = searchQuery.trim().toLowerCase();
      const searchMatch =
        query === '' ||
        item.name.toLowerCase().includes(query) ||
        (item.bengaliTitle && item.bengaliTitle.includes(query)) ||
        item.description.toLowerCase().includes(query) ||
        (item.pairingNote && item.pairingNote.toLowerCase().includes(query));

      return categoryMatch && dietaryMatch && searchMatch;
    });
  }, [selectedCategory, selectedDietary, searchQuery]);

  return (
    <section className="py-20 lg:py-28 bg-[#fdf8f8] text-[#1c1b1b] border-t border-[#e5e2e1]" id="restaurant-menu">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs uppercase tracking-[0.25em] text-[#735c00] font-bold">
            CULINARY MASTERY • OSMANINAGAR, SYLHET
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-[#1c1b1b] mt-3 mb-5 leading-tight">
            Dastarkhan Culinary Menu
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-[#444748] leading-relaxed">
            Crafted with authentic indigenous Chuijhal bark roots, whole roasted Peshawari aromatics, and fragrant Chinigura rice. Every dish is 100% Halal and freshly prepared in our exhibition kitchens.
          </p>
        </div>

        {/* Culinary Mastery Heritage Pillars */}
        <div className="mb-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-left">
          <div className="bg-white p-5 border border-[#e5e2e1] shadow-sm hover:border-[#d4af37] transition-all">
            <span className="text-[10px] uppercase tracking-widest text-[#735c00] font-bold">HERITAGE SECRET</span>
            <h4 className="font-serif text-base font-bold text-[#1c1b1b] mt-1 mb-1.5">Authentic Chuijhal Roots</h4>
            <p className="text-xs text-[#5f5e5e] leading-relaxed">
              Wild Piper Chaba bark slow-braised into succulent beef until the spicy warmth permeates every fiber.
            </p>
          </div>

          <div className="bg-white p-5 border border-[#e5e2e1] shadow-sm hover:border-[#d4af37] transition-all">
            <span className="text-[10px] uppercase tracking-widest text-[#735c00] font-bold">ANCIENT TECHNIQUE</span>
            <h4 className="font-serif text-base font-bold text-[#1c1b1b] mt-1 mb-1.5">Charcoal Bamboo Kacchi</h4>
            <p className="text-xs text-[#5f5e5e] leading-relaxed">
              Aromatic Kalijeera rice and tender goat sealed inside green bamboo logs and slow-roasted over natural pit coals.
            </p>
          </div>

          <div className="bg-white p-5 border border-[#e5e2e1] shadow-sm hover:border-[#d4af37] transition-all">
            <span className="text-[10px] uppercase tracking-widest text-[#735c00] font-bold">SYLHET SPECIALTY</span>
            <h4 className="font-serif text-base font-bold text-[#1c1b1b] mt-1 mb-1.5">Jaintiapur Shatkora Citrus</h4>
            <p className="text-xs text-[#5f5e5e] leading-relaxed">
              Indigenous citrus from the Jaintia hills lending an intoxicating aromatic tang to our slow-cooked broths.
            </p>
          </div>

          <div className="bg-white p-5 border border-[#e5e2e1] shadow-sm hover:border-[#d4af37] transition-all">
            <span className="text-[10px] uppercase tracking-widest text-[#735c00] font-bold">ROYAL PURITY</span>
            <h4 className="font-serif text-base font-bold text-[#1c1b1b] mt-1 mb-1.5">100% Halal Certified</h4>
            <p className="text-xs text-[#5f5e5e] leading-relaxed">
              Rigorous hand-slaughtered sourcing and immaculate culinary hygiene in dedicated exhibition kitchens.
            </p>
          </div>
        </div>

        {/* Category Navigation Tabs */}
        <div className="flex overflow-x-auto no-scrollbar md:flex-wrap justify-start md:justify-center gap-2 sm:gap-3 mb-8 pb-2 px-1">
          {categories.map((cat) => {
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 sm:px-5 py-2.5 sm:py-3 text-xs sm:text-sm tracking-[0.08em] uppercase transition-all duration-200 cursor-pointer font-bold border whitespace-nowrap shrink-0 ${
                  isActive
                    ? 'bg-[#1c1b1b] text-[#fed65b] border-[#1c1b1b] shadow-md scale-105'
                    : 'bg-white text-[#444748] hover:bg-[#f1edec] hover:text-[#1c1b1b] border-[#e5e2e1]'
                }`}
              >
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>

        {/* Online Ordering Quick Banner */}
        <div className="bg-[#1c1b1b] text-white p-4 sm:p-5 mb-8 border border-[#d4af37] shadow-lg flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-3 text-left">
            <div className="w-10 h-10 bg-[#fed65b] text-[#1c1b1b] flex items-center justify-center shrink-0">
              <Bike className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-xs uppercase tracking-wider text-[#fed65b] font-bold">
                  Home Delivery & Fresh Takeaway Available
                </span>
                <span className="hidden sm:inline px-2 py-0.5 bg-emerald-700 text-white text-[9px] font-bold uppercase tracking-widest">
                  Live Kitchen
                </span>
              </div>
              <p className="text-xs text-[#c8c6c5] mt-0.5">
                Delivering hot & fresh to Gowalabazar, Osmaninagar, Tajpur, and surrounding areas.
              </p>
            </div>
          </div>

          <button
            onClick={onOpenOrderModal}
            className="px-6 py-2.5 bg-[#fed65b] text-[#1c1b1b] hover:bg-[#d4af37] text-xs uppercase tracking-[0.15em] font-bold transition-all flex items-center space-x-2 shrink-0 cursor-pointer shadow-md"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Open Order Bag ({cartItems.reduce((acc, c) => acc + c.quantity, 0)})</span>
          </button>
        </div>

        {/* Search & Specialty Filter Bar */}
        <div className="bg-white p-4 sm:p-6 border border-[#e5e2e1] shadow-sm mb-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          {/* Search Box */}
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-[#735c00] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search Chuijhal, Biriyani, Kebab, Platter..."
              className="w-full pl-10 pr-10 py-2.5 bg-[#fdf8f8] border border-[#e5e2e1] text-xs sm:text-sm text-[#1c1b1b] placeholder:text-[#8d8c8b] focus:outline-none focus:border-[#d4af37]"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-700 cursor-pointer"
                title="Clear search"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Dietary / Specialty Pills */}
          <div className="flex items-center flex-wrap gap-1.5 sm:gap-2">
            <div className="hidden lg:flex items-center space-x-1.5 text-xs uppercase tracking-wider text-[#735c00] font-bold mr-2">
              <Filter className="w-3.5 h-3.5" />
              <span>Specialty:</span>
            </div>
            {dietaryTags.map((tag) => {
              const isSelected = selectedDietary === tag.id;
              return (
                <button
                  key={tag.id}
                  onClick={() => setSelectedDietary(tag.id)}
                  className={`px-3 py-1.5 text-xs tracking-wider uppercase transition-colors cursor-pointer font-bold ${
                    isSelected
                      ? 'bg-[#fed65b] text-[#1c1b1b] border border-[#d4af37]'
                      : 'bg-[#fdf8f8] text-[#5f5e5e] hover:text-[#1c1b1b] hover:bg-[#f1edec] border border-[#e5e2e1]'
                  }`}
                >
                  {tag.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Active Bengali Subtitle */}
        {selectedCategory !== 'all' && (
          <div className="text-center mb-8">
            <p className="font-serif italic text-2xl sm:text-3xl text-[#735c00]">
              {categories.find((c) => c.id === selectedCategory)?.bengali}
            </p>
          </div>
        )}

        {/* Menu Items Responsive Grid with Images */}
        {filteredItems.length === 0 ? (
          <div className="text-center py-16 bg-white border border-[#e5e2e1] p-8">
            <Utensils className="w-12 h-12 text-[#d4af37] mx-auto mb-3 opacity-80" />
            <h3 className="font-serif text-xl font-bold text-[#1c1b1b] mb-1">
              No dishes match your search or filter
            </h3>
            <p className="text-[#5f5e5e] text-sm mb-6">
              Try adjusting your specialty filter or searching for another dish keyword.
            </p>
            <button
              onClick={() => {
                setSelectedCategory('all');
                setSelectedDietary('ALL');
                setSearchQuery('');
              }}
              className="px-6 py-3 text-xs uppercase tracking-widest bg-[#1c1b1b] text-white font-bold hover:bg-[#d4af37] hover:text-[#1c1b1b] transition-all cursor-pointer"
            >
              Reset All Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                onClick={() => setSpotlightDish(item)}
                className="group bg-white border border-[#e5e2e1] hover:border-[#d4af37] transition-all duration-300 flex flex-col justify-between cursor-pointer shadow-sm hover:shadow-xl overflow-hidden"
              >
                {/* Image Container with Badges */}
                <div className="relative h-52 sm:h-56 w-full overflow-hidden bg-[#1c1b1b]">
                  <img
                    src={item.imageUrl}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1c1b1b]/80 via-transparent to-black/20" />

                  {/* Top Badges */}
                  <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 max-w-[70%]">
                    {item.dietary.slice(0, 2).map((tag) => (
                      <span
                        key={tag}
                        className={`px-2 py-0.5 text-[10px] uppercase tracking-wider font-bold shadow-sm ${
                          tag === 'Signature'
                            ? 'bg-[#fed65b] text-[#1c1b1b]'
                            : tag === 'Spicy'
                            ? 'bg-red-600 text-white'
                            : tag === 'Value Deal'
                            ? 'bg-emerald-600 text-white'
                            : 'bg-black/75 text-white backdrop-blur-sm'
                        }`}
                      >
                        {tag === 'Signature' ? '★ Signature' : tag}
                      </span>
                    ))}
                  </div>

                  {/* Price Badge on Top Right */}
                  <div className="absolute top-3 right-3 bg-[#1c1b1b]/90 border border-[#fed65b]/60 px-3 py-1 text-[#fed65b] font-serif text-sm sm:text-base font-bold shadow-md">
                    {item.priceFormatted || `৳${item.price}`}
                  </div>

                  {/* Quick View Button on Hover */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/40 backdrop-blur-[2px]">
                    <span className="px-4 py-2 bg-[#fed65b] text-[#1c1b1b] text-xs uppercase tracking-widest font-bold flex items-center space-x-1.5 shadow-lg transform translate-y-2 group-hover:translate-y-0 transition-transform">
                      <Eye className="w-3.5 h-3.5" />
                      <span>View Details</span>
                    </span>
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-5 sm:p-6 flex flex-col justify-between flex-1">
                  <div>
                    {/* Food Titles & Category */}
                    <div className="mb-2.5">
                      <div className="flex items-center justify-between gap-2">
                        <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#1c1b1b] group-hover:text-[#735c00] transition-colors leading-snug">
                          {item.name}
                        </h3>
                      </div>
                      {item.bengaliTitle && (
                        <p className="font-serif text-sm text-[#735c00] font-medium mt-0.5">
                          {item.bengaliTitle}
                        </p>
                      )}
                    </div>

                    {/* Food Description */}
                    <p className="text-xs sm:text-sm text-[#444748] leading-relaxed line-clamp-2 mb-3">
                      {item.description}
                    </p>
                  </div>

                  <div>
                    {/* Bottom Action Strip: Price + Order Button */}
                    <div className="pt-3 border-t border-[#f1edec] flex items-center justify-between gap-2 mb-2">
                      <div className="flex flex-col">
                        <span className="text-[10px] uppercase tracking-wider text-[#5f5e5e] font-semibold">Price</span>
                        <span className="font-serif text-lg font-bold text-[#735c00] leading-none">
                          ৳{item.price}
                        </span>
                      </div>

                      <div className="flex items-center space-x-1.5" onClick={(e) => e.stopPropagation()}>
                        <button
                          type="button"
                          onClick={() => {
                            onAddToCart(item, 1);
                          }}
                          className={`px-3.5 py-2 text-xs uppercase tracking-wider font-bold transition-all flex items-center space-x-1.5 cursor-pointer shadow-sm ${
                            getItemQuantityInCart(item.id) > 0
                              ? 'bg-[#1c1b1b] text-[#fed65b] hover:bg-[#735c00]'
                              : 'bg-[#fed65b] text-[#1c1b1b] hover:bg-[#d4af37]'
                          }`}
                        >
                          <ShoppingBag className="w-3.5 h-3.5" />
                          <span>
                            {getItemQuantityInCart(item.id) > 0
                              ? `In Bag (${getItemQuantityInCart(item.id)}) +`
                              : 'ORDER NOW'}
                          </span>
                        </button>
                      </div>
                    </div>

                    {/* Pairing or Fresh Prep Note */}
                    <div className="pt-1.5">
                      {item.pairingNote ? (
                        <div className="flex items-center space-x-1.5 text-[11px] text-[#735c00] font-medium">
                          <Utensils className="w-3 h-3 shrink-0 text-[#735c00]" />
                          <span className="truncate" title={item.pairingNote}>
                            {item.pairingNote}
                          </span>
                        </div>
                      ) : (
                        <div className="flex items-center space-x-1.5 text-[11px] text-[#5f5e5e]">
                          <CheckCircle2 className="w-3 h-3 shrink-0 text-emerald-600" />
                          <span>Freshly Prepared to Order</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Bottom Call to Action for Table Reservation & Banquets */}
        <div className="mt-16 bg-[#1c1b1b] text-white border border-[#d4af37] p-8 sm:p-10 flex flex-col lg:flex-row items-center justify-between gap-6 text-center lg:text-left shadow-2xl">
          <div className="max-w-2xl">
            <span className="text-xs uppercase tracking-[0.2em] text-[#fed65b] font-bold">
              PLAN YOUR VISIT • GOWALABAZAR, OSMANINAGAR
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-white mt-1 mb-2">
              Reserve a Family Table or Private Majlis
            </h3>
            <p className="text-sm text-[#e5e2e1] leading-relaxed">
              Experience the pinnacle of hospitality with dedicated family dining cabins, air-conditioned seating, and authentic Mughlai catering.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3.5 w-full lg:w-auto shrink-0">
            <button
              onClick={onOpenTableReservation}
              className="px-6 py-3.5 bg-[#fed65b] text-[#1c1b1b] text-xs uppercase tracking-[0.2em] font-bold hover:bg-[#d4af37] transition-all cursor-pointer shadow-lg flex items-center justify-center space-x-2"
            >
              <Calendar className="w-4 h-4" />
              <span>Reserve a Table</span>
            </button>
            <button
              onClick={() => onAskConciergeWithPrompt("What are the most recommended dishes for a family dining group at Dastarkhan?")}
              className="px-6 py-3.5 border border-[#fed65b] text-[#fed65b] text-xs uppercase tracking-[0.2em] font-bold hover:bg-[#fed65b]/15 transition-all cursor-pointer flex items-center justify-center space-x-2"
            >
              <Sparkles className="w-4 h-4" />
              <span>Ask AI Concierge</span>
            </button>
          </div>
        </div>
      </div>

      {/* Dish Spotlight Modal */}
      {spotlightDish && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white max-w-2xl w-full border-2 border-[#d4af37] shadow-2xl overflow-hidden relative max-h-[92vh] flex flex-col my-auto">
            {/* Modal Image Header */}
            <div className="relative h-48 sm:h-64 md:h-72 w-full shrink-0 bg-black">
              <img
                src={spotlightDish.imageUrl}
                alt={spotlightDish.name}
                className="w-full h-full object-cover"
              />
              <button
                onClick={() => setSpotlightDish(null)}
                className="absolute top-3 right-3 sm:top-4 sm:right-4 z-20 w-9 h-9 sm:w-10 sm:h-10 bg-black/80 text-white rounded-full flex items-center justify-center hover:bg-[#fed65b] hover:text-[#1c1b1b] transition-colors cursor-pointer border border-white/20"
                title="Close modal"
              >
                <X className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
              <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/95 via-black/50 to-transparent p-4 sm:p-6 text-white">
                <div className="flex flex-wrap gap-1.5 mb-1.5">
                  {spotlightDish.dietary.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 sm:px-2.5 py-0.5 text-[9px] sm:text-[10px] uppercase tracking-wider font-bold bg-[#fed65b] text-[#1c1b1b]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <h3 className="font-serif text-xl sm:text-2xl md:text-3xl font-bold leading-tight">
                  {spotlightDish.name}
                </h3>
                {spotlightDish.bengaliTitle && (
                  <p className="font-serif text-sm sm:text-base text-[#fed65b] mt-0.5">
                    {spotlightDish.bengaliTitle}
                  </p>
                )}
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-4 sm:p-6 md:p-8 overflow-y-auto flex-1">
              <div className="flex items-center justify-between gap-4 mb-3 sm:mb-4 pb-3 sm:pb-4 border-b border-[#e5e2e1]">
                <span className="text-xs uppercase tracking-widest text-[#735c00] font-bold">
                  Dastarkhan Specialty
                </span>
                <span className="font-serif text-2xl sm:text-3xl text-[#735c00] font-bold">
                  {spotlightDish.priceFormatted || `৳${spotlightDish.price}`}
                </span>
              </div>

              <p className="text-[#444748] text-xs sm:text-sm md:text-base leading-relaxed mb-5 sm:mb-6">
                {spotlightDish.description}
              </p>

              {spotlightDish.pairingNote && (
                <div className="bg-[#fdf8f8] border border-[#e5e2e1] p-3 sm:p-4 mb-5 sm:mb-6 flex items-start space-x-3">
                  <Utensils className="w-4 h-4 sm:w-5 sm:h-5 text-[#735c00] shrink-0 mt-0.5" />
                  <div>
                    <p className="text-[11px] sm:text-xs uppercase tracking-wider text-[#5f5e5e] font-bold">
                      Recommended Chef Pairing
                    </p>
                    <p className="text-xs sm:text-sm font-serif text-[#1c1b1b] mt-0.5 font-medium">
                      {spotlightDish.pairingNote}
                    </p>
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-2.5 sm:gap-3 pt-3 sm:pt-4 border-t border-[#e5e2e1]">
                <button
                  onClick={() => {
                    onAddToCart(spotlightDish, 1);
                    setSpotlightDish(null);
                    onOpenOrderModal();
                  }}
                  className="flex-1 py-3 sm:py-3.5 bg-[#fed65b] text-[#1c1b1b] text-xs uppercase tracking-[0.18em] font-bold hover:bg-[#d4af37] transition-all cursor-pointer flex items-center justify-center space-x-2 shadow-md"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>ORDER THIS DISH (৳{spotlightDish.price})</span>
                </button>
                <button
                  onClick={() => {
                    setSpotlightDish(null);
                    onOpenTableReservation();
                  }}
                  className="py-3 sm:py-3.5 px-4 bg-[#1c1b1b] text-white text-xs uppercase tracking-[0.15em] font-bold hover:bg-[#444748] transition-all cursor-pointer flex items-center justify-center space-x-2"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Reserve Table</span>
                </button>
                <button
                  onClick={() => {
                    const prompt = `Tell me more about the recipe, origin, and spice blend of the ${spotlightDish.name} (${spotlightDish.bengaliTitle || ''}) at Dastarkhan Restaurant.`;
                    setSpotlightDish(null);
                    onAskConciergeWithPrompt(prompt);
                  }}
                  className="px-4 py-3 sm:py-3.5 border border-[#d4af37] text-[#735c00] text-xs uppercase tracking-[0.15em] hover:bg-[#d4af37]/15 transition-all flex items-center justify-center space-x-2 font-bold cursor-pointer"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Ask AI</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
