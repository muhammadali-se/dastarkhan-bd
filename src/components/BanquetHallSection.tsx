import React, { useState } from 'react';
import { VENUE_SPACES, BANQUET_TIERS, PACKAGE_ADDONS, RESTAURANT_INFO } from '../data';
import { VenueSpace, BanquetTier, PackageAddon } from '../types';
import { Users, Maximize2, Sparkles, CheckCircle2, Award, Calendar, Eye, X, Star, Calculator, Sliders, Check, ShieldCheck, Zap, Car, HeartHandshake, PhoneCall } from 'lucide-react';

interface BanquetHallSectionProps {
  onOpenBanquetInquiryWithVenue?: (venueId: string, tierId?: string, guestCount?: number) => void;
  onAskConciergeWithPrompt: (prompt: string) => void;
}

interface FloorplanLayout {
  id: string;
  name: string;
  capacity: string;
  bestFor: string;
  description: string;
  features: string[];
}

const FLOORPLAN_LAYOUTS: FloorplanLayout[] = [
  {
    id: 'wedding-rounds',
    name: 'Imperial Wedding Gala (Round Tables & Grand Stage)',
    capacity: 'Up to 500 Seated (50 Round Tables of 10)',
    bestFor: 'Grand Weddings, Walima, & Reception Dinners',
    description: 'A regal banquet layout featuring gold Tiffany chairs, 10-seater round tables with floral candelabras, an elevated 30-ft bridal stage, and a central carpeted red aisle for royal processions.',
    features: ['30-ft Elevated Stage with Crystal Backdrops', '6-ft Aisle Clearance for Processions', 'Dedicated VIP Family Tables Near Stage', 'Dual Projection Screens for Live Feed']
  },
  {
    id: 'community-buffet',
    name: 'Community Reception (Double Island Buffet Flow)',
    capacity: 'Up to 700 Standing & Rotating Guests',
    bestFor: 'Large Community Gatherings, Corporate Milestones, & Summits',
    description: 'Designed for fluid guest movement with dual four-sided buffet stations serving hot Kacchi, Roast, and desserts simultaneously, eliminating guest wait times.',
    features: ['Dual 360° Heated Buffet Island Stations', 'Fluid One-Way Guest Traffic Layout', 'Spacious Cocktail Standing Tables', 'High-Speed Beverage & Tea Stations']
  },
  {
    id: 'traditional-majlis',
    name: 'Sylheti Cultural Majlis (VIP Royal Floor Seating)',
    capacity: 'Up to 150 Guests in Private Wing',
    bestFor: 'Traditional Family Feasts, Sunnah Dastarkhan, & Akika',
    description: 'An authentic Persian & Sylheti traditional arrangement with plush cushioned low-seating bolsters, hand-embroidered carpet runners, and ceremonial hand-washing silver jugs.',
    features: ['Hand-Carved Wooden Bolsters & Silk Cushions', 'Ceremonial Silver Aftaba Hand-Washing Service', 'Dedicated Private Butler for Each Dastarkhan', 'Acoustically Screened for Intimate Privacy']
  },
  {
    id: 'corporate-summit',
    name: 'Executive Boardroom & Diplomatic Summit',
    capacity: '80 Seated in U-Shape or Classroom',
    bestFor: 'Corporate Annual General Meetings, Seminars & Trade Summits',
    description: 'State-of-the-art corporate setup in the Sylhet Executive Suite, equipped with high-definition laser projectors, wireless conference microphones, and podium.',
    features: ['Ultra-HD 4K Displays with Wireless Presentation', 'Ergonomic Executive Leather Chairs', 'Integrated Sound & Stage Lighting', 'Private Pre-Function Coffee & Canapé Lounge']
  }
];

export const BanquetHallSection: React.FC<BanquetHallSectionProps> = ({
  onOpenBanquetInquiryWithVenue,
  onAskConciergeWithPrompt
}) => {
  const [selectedVenueId, setSelectedVenueId] = useState<string>('royal-ballroom');
  const [galleryModalVenue, setGalleryModalVenue] = useState<VenueSpace | null>(null);
  const [activeImageIndex, setActiveImageIndex] = useState<number>(0);

  // Interactive Imperial Calculator State
  const [calculatorGuests, setCalculatorGuests] = useState<number>(300);
  const [calculatorVenueId, setCalculatorVenueId] = useState<string>('royal-ballroom');
  const [calculatorTierId, setCalculatorTierId] = useState<string>('package-b');
  const [selectedAddonIds, setSelectedAddonIds] = useState<string[]>(['addon-decor', 'addon-valet']);
  const [activeFloorplanId, setActiveFloorplanId] = useState<string>('wedding-rounds');

  const activeVenue = VENUE_SPACES.find(v => v.id === selectedVenueId) || VENUE_SPACES[0];
  const selectedCalcTier = BANQUET_TIERS.find(t => t.id === calculatorTierId) || BANQUET_TIERS[1];
  const selectedCalcVenue = VENUE_SPACES.find(v => v.id === calculatorVenueId) || VENUE_SPACES[0];
  const activeFloorplan = FLOORPLAN_LAYOUTS.find(f => f.id === activeFloorplanId) || FLOORPLAN_LAYOUTS[0];

  // Calculation Math
  const cateringSubtotal = calculatorGuests * selectedCalcTier.pricePerGuest;
  const addonsSubtotal = PACKAGE_ADDONS
    .filter(a => selectedAddonIds.includes(a.id))
    .reduce((sum, a) => sum + a.price, 0);
  const estimatedGrandTotal = cateringSubtotal + addonsSubtotal;
  const perGuestEffective = Math.round(estimatedGrandTotal / (calculatorGuests || 1));

  const toggleAddon = (id: string) => {
    setSelectedAddonIds(prev => 
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  const handleOpenGallery = (venue: VenueSpace) => {
    setGalleryModalVenue(venue);
    setActiveImageIndex(0);
  };

  const handleShareOnWhatsApp = () => {
    const text = `*Dastarkhan Event Inquiry Estimation*%0A` +
      `• *Venue:* ${selectedCalcVenue.name}%0A` +
      `• *Guest Count:* ${calculatorGuests} Guests%0A` +
      `• *Menu Package:* ${selectedCalcTier.name} (৳${selectedCalcTier.pricePerGuest}/guest)%0A` +
      `• *Selected Add-ons:* ${selectedAddonIds.length > 0 ? selectedAddonIds.map(id => PACKAGE_ADDONS.find(a => a.id === id)?.name).join(', ') : 'None'}%0A` +
      `• *Estimated Total:* ৳${estimatedGrandTotal.toLocaleString()} (Approx. ৳${perGuestEffective}/guest)%0A%0A` +
      `Please let me know available dates for this celebration.`;
    window.open(`https://wa.me/8801790698680?text=${text}`, '_blank');
  };

  return (
    <section className="py-20 sm:py-28 bg-[#121110] text-white border-t border-[#383533]" id="banquet-hall">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <div className="inline-flex items-center space-x-2 px-3 py-1 bg-[#22201e] border border-[#d4af37]/60 mb-4">
            <span className="text-[10px] sm:text-xs uppercase tracking-[0.25em] text-[#fed65b] font-bold">
              THE PREMIER EVENT VENUES OF OSMANINAGAR, SYLHET
            </span>
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white mb-5 sm:mb-6">
            Dastarkhan Banquet Spaces
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-[#e5e2e1] leading-relaxed font-light">
            Whether hosting a 700-guest Royal Wedding in our pillarless grand ballroom, an executive diplomatic summit, or an open-air Holud under the stars, our master planners guarantee flawless execution and memorable hospitality.
          </p>
        </div>

        {/* Venue Selector Tabs */}
        <div className="flex overflow-x-auto no-scrollbar md:flex-wrap justify-start md:justify-center gap-2.5 sm:gap-4 mb-10 sm:mb-12 pb-2 px-1">
          {VENUE_SPACES.map((venue) => {
            const isSelected = selectedVenueId === venue.id;
            return (
              <button
                key={venue.id}
                onClick={() => setSelectedVenueId(venue.id)}
                className={`px-5 sm:px-7 py-3.5 sm:py-4 text-xs tracking-[0.14em] uppercase transition-all duration-300 cursor-pointer font-bold whitespace-nowrap shrink-0 border ${
                  isSelected
                    ? 'bg-[#fed65b] text-[#1c1b1b] border-[#fed65b] shadow-xl'
                    : 'bg-[#1e1c1b] text-[#e5e2e1] hover:bg-[#2d2a28] hover:text-white border-[#383533]'
                }`}
              >
                <span>{venue.name}</span>
              </button>
            );
          })}
        </div>

        {/* Active Venue Showcase Card */}
        <div className="bg-[#1a1918] border border-[#383533] overflow-hidden grid grid-cols-1 lg:grid-cols-12 gap-0 mb-20 shadow-2xl">
          {/* Left Column: Image & Gallery Button */}
          <div className="lg:col-span-6 relative min-h-[340px] sm:min-h-[440px] lg:min-h-full bg-black group">
            <img
              src={activeVenue.imageUrl}
              alt={activeVenue.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-90"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#1a1918] via-transparent to-transparent opacity-85 lg:hidden" />
            
            <button
              onClick={() => handleOpenGallery(activeVenue)}
              className="absolute bottom-5 left-5 px-4 py-2.5 bg-[#141312]/95 border border-[#d4af37] text-[#fed65b] text-xs uppercase tracking-widest flex items-center space-x-2 hover:bg-[#d4af37] hover:text-[#1c1b1b] transition-all cursor-pointer font-bold shadow-lg"
            >
              <Eye className="w-4 h-4" />
              <span>View Venue Gallery ({activeVenue.galleryUrls.length} Photos)</span>
            </button>
          </div>

          {/* Right Column: Venue Details */}
          <div className="lg:col-span-6 p-6 sm:p-8 md:p-10 lg:p-12 flex flex-col justify-between">
            <div>
              <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-xs uppercase tracking-widest text-[#fed65b] font-bold mb-3">
                <span className="flex items-center space-x-1.5">
                  <Users className="w-4 h-4" />
                  <span>Up to {activeVenue.capacitySeated} Seated / {activeVenue.capacityStanding} Standing</span>
                </span>
                {activeVenue.areaSqFt && (
                  <>
                    <span>•</span>
                    <span className="flex items-center space-x-1.5">
                      <Maximize2 className="w-4 h-4" />
                      <span>{activeVenue.areaSqFt.toLocaleString()} Sq. Ft.</span>
                    </span>
                  </>
                )}
              </div>

              <h3 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-white font-bold mb-2">
                {activeVenue.name}
              </h3>
              <p className="font-serif italic text-sm sm:text-base text-[#fed65b] mb-4 sm:mb-6">
                {activeVenue.subtitle}
              </p>

              <p className="text-xs sm:text-sm md:text-base text-[#e5e2e1] leading-relaxed mb-6 sm:mb-8 font-light">
                {activeVenue.description}
              </p>

              {/* Architectural Features */}
              <div className="mb-6 sm:mb-8">
                <p className="text-xs uppercase tracking-widest text-[#fed65b] font-bold mb-3">
                  Signature Architectural Features & Amenities
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3">
                  {activeVenue.features.map((feature, idx) => (
                    <div key={idx} className="flex items-start space-x-2.5 text-xs text-[#e5e2e1]">
                      <CheckCircle2 className="w-4 h-4 text-[#fed65b] shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Ideal For tags */}
              <div className="mb-6 sm:mb-8">
                <p className="text-xs uppercase tracking-widest text-[#fed65b] font-bold mb-2.5">
                  Recommended Event Formats
                </p>
                <div className="flex flex-wrap gap-2">
                  {activeVenue.idealFor.map((format, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 bg-[#141312] border border-[#383533] text-white text-[11px] uppercase tracking-wider font-bold"
                    >
                      {format}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-6 border-t border-[#383533] flex flex-col sm:flex-row gap-3 sm:gap-4">
              <button
                onClick={() => onOpenBanquetInquiryWithVenue?.(activeVenue.id)}
                className="flex-1 py-4 bg-[#fed65b] text-[#1c1b1b] text-xs uppercase tracking-[0.2em] font-bold hover:bg-[#d4af37] transition-all cursor-pointer text-center shadow-lg"
              >
                INQUIRE FOR THIS VENUE
              </button>
              <button
                onClick={() => onAskConciergeWithPrompt(`Can you tell me more about hosting an event in ${activeVenue.name} (${activeVenue.capacitySeated} guests) at Dastarkhan?`)}
                className="px-6 py-4 border border-[#d4af37] text-[#fed65b] text-xs uppercase tracking-[0.15em] hover:bg-[#d4af37]/15 transition-all flex items-center justify-center space-x-2 cursor-pointer font-bold"
              >
                <Sparkles className="w-4 h-4" />
                <span>Ask AI Concierge</span>
              </button>
            </div>
          </div>
        </div>

        {/* 1. BRAND NEW INTERACTIVE FEATURE: Imperial Banquet Cost & Event Budget Estimator */}
        <div className="mb-24 bg-gradient-to-b from-[#181615] to-[#141312] border-2 border-[#d4af37]/60 p-6 sm:p-10 md:p-12 shadow-2xl relative">
          <div className="absolute top-0 right-8 -translate-y-1/2 bg-[#fed65b] text-[#1c1b1b] px-4 py-1 text-xs uppercase tracking-[0.2em] font-bold shadow-md flex items-center space-x-1.5">
            <Calculator className="w-3.5 h-3.5" />
            <span>Interactive Event Estimator</span>
          </div>

          <div className="max-w-3xl mb-10 text-left">
            <span className="text-xs uppercase tracking-[0.2em] text-[#fed65b] font-bold">
              PLAN YOUR BUDGET WITH TRANSPARENCY
            </span>
            <h3 className="font-serif text-3xl sm:text-4xl text-white font-bold mt-2 mb-3">
              Imperial Banquet Package & Cost Calculator
            </h3>
            <p className="text-xs sm:text-sm text-[#c8c6c5] leading-relaxed">
              Estimate your complete celebration budget in real time. Select your expected guest count, venue, catering tier, and custom amenities to see an instant itemized breakdown.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            {/* Left Controls Column */}
            <div className="lg:col-span-7 space-y-7 text-left">
              {/* Guest Count Slider & Quick Presets */}
              <div className="bg-[#1f1d1c] p-5 border border-[#383533]">
                <div className="flex justify-between items-center mb-3">
                  <label className="text-xs uppercase tracking-wider text-[#fed65b] font-bold flex items-center space-x-2">
                    <Users className="w-4 h-4" />
                    <span>Estimated Guest Count:</span>
                  </label>
                  <span className="font-serif text-2xl text-white font-bold">
                    {calculatorGuests} <span className="text-xs font-normal text-[#a8a6a5]">Guests</span>
                  </span>
                </div>

                <input
                  type="range"
                  min="50"
                  max="700"
                  step="25"
                  value={calculatorGuests}
                  onChange={(e) => setCalculatorGuests(Number(e.target.value))}
                  className="w-full accent-[#fed65b] cursor-pointer h-2 bg-[#383533] rounded-lg appearance-none"
                />

                {/* Quick Presets */}
                <div className="flex flex-wrap gap-2 mt-4 pt-3 border-t border-[#383533]">
                  <span className="text-[10px] uppercase tracking-wider text-[#a8a6a5] self-center mr-1">
                    Presets:
                  </span>
                  {[
                    { label: '100 Intimate', count: 100 },
                    { label: '250 Reception', count: 250 },
                    { label: '450 Royal Gala', count: 450 },
                    { label: '700 Full Hall', count: 700 }
                  ].map((preset) => (
                    <button
                      key={preset.count}
                      type="button"
                      onClick={() => setCalculatorGuests(preset.count)}
                      className={`px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider border cursor-pointer transition-all ${
                        calculatorGuests === preset.count
                          ? 'bg-[#fed65b] text-[#1c1b1b] border-[#fed65b]'
                          : 'bg-[#141312] text-[#c8c6c5] border-[#383533] hover:border-[#fed65b]'
                      }`}
                    >
                      {preset.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Venue Selection */}
              <div>
                <label className="block text-xs uppercase tracking-wider text-[#fed65b] font-bold mb-2.5">
                  1. Select Event Venue Space:
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {VENUE_SPACES.map((v) => {
                    const isSelected = calculatorVenueId === v.id;
                    return (
                      <button
                        key={v.id}
                        type="button"
                        onClick={() => setCalculatorVenueId(v.id)}
                        className={`p-3.5 text-left border cursor-pointer transition-all ${
                          isSelected
                            ? 'bg-[#2a2625] border-[#fed65b] shadow-md'
                            : 'bg-[#1a1918] border-[#383533] hover:border-[#735c00]'
                        }`}
                      >
                        <p className="text-xs font-bold text-white leading-snug">{v.name}</p>
                        <p className="text-[10px] text-[#fed65b] mt-1 font-medium">Up to {v.capacityStanding} Guests</p>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Catering Menu Package Tier */}
              <div>
                <label className="block text-xs uppercase tracking-wider text-[#fed65b] font-bold mb-2.5">
                  2. Select Catering Package Tier:
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {BANQUET_TIERS.map((tier) => {
                    const isSelected = calculatorTierId === tier.id;
                    return (
                      <button
                        key={tier.id}
                        type="button"
                        onClick={() => setCalculatorTierId(tier.id)}
                        className={`p-3.5 text-left border cursor-pointer transition-all relative ${
                          isSelected
                            ? 'bg-[#2a2625] border-[#fed65b] shadow-md'
                            : 'bg-[#1a1918] border-[#383533] hover:border-[#735c00]'
                        }`}
                      >
                        {isSelected && (
                          <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-[#fed65b]" />
                        )}
                        <p className="text-xs font-bold text-white">{tier.name}</p>
                        <p className="font-serif text-base font-bold text-[#fed65b] mt-1">৳{tier.pricePerGuest.toLocaleString()} <span className="text-[10px] text-[#a8a6a5] font-sans font-normal">/ guest</span></p>
                        <p className="text-[10px] text-[#c8c6c5] mt-1 line-clamp-1">{tier.subtitle}</p>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Optional Add-ons Checkboxes */}
              <div>
                <label className="block text-xs uppercase tracking-wider text-[#fed65b] font-bold mb-2.5">
                  3. Customize with Premium Event Add-ons:
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {PACKAGE_ADDONS.map((addon) => {
                    const isChecked = selectedAddonIds.includes(addon.id);
                    return (
                      <div
                        key={addon.id}
                        onClick={() => toggleAddon(addon.id)}
                        className={`p-3 border flex items-center justify-between cursor-pointer transition-all ${
                          isChecked
                            ? 'bg-[#2a2625] border-[#fed65b]'
                            : 'bg-[#1a1918] border-[#383533] hover:border-[#735c00]'
                        }`}
                      >
                        <div className="flex items-center space-x-2.5">
                          <div className={`w-4 h-4 rounded-none border flex items-center justify-center shrink-0 ${
                            isChecked ? 'bg-[#fed65b] border-[#fed65b] text-[#1c1b1b]' : 'border-[#444748]'
                          }`}>
                            {isChecked && <Check className="w-3 h-3 stroke-[3]" />}
                          </div>
                          <div>
                            <p className="text-xs font-bold text-white">{addon.name}</p>
                            <p className="text-[10px] text-[#a8a6a5] line-clamp-1">{addon.description}</p>
                          </div>
                        </div>
                        <span className="text-xs font-bold text-[#fed65b] whitespace-nowrap ml-2">
                          {addon.priceLabel}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Right Live Estimation Summary Card */}
            <div className="lg:col-span-5 bg-[#1f1d1c] border-2 border-[#d4af37] p-6 sm:p-8 shadow-2xl text-left">
              <div className="border-b border-[#383533] pb-5 mb-5">
                <span className="text-[10px] uppercase tracking-[0.2em] text-[#fed65b] font-bold">
                  LIVE QUOTATION SUMMARY
                </span>
                <h4 className="font-serif text-2xl text-white font-bold mt-1">
                  Estimated Celebration Investment
                </h4>
                <p className="text-xs text-[#a8a6a5] mt-1">
                  {selectedCalcVenue.name} • {calculatorGuests} Guests
                </p>
              </div>

              <div className="space-y-3.5 text-xs text-[#e5e2e1] mb-6">
                <div className="flex justify-between items-center">
                  <span>Catering ({calculatorGuests} × ৳{selectedCalcTier.pricePerGuest}):</span>
                  <span className="font-bold text-white">৳{cateringSubtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Selected Add-ons ({selectedAddonIds.length}):</span>
                  <span className="font-bold text-white">৳{addonsSubtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center text-emerald-400">
                  <span>Complimentary Bridal Suite:</span>
                  <span className="font-bold uppercase tracking-wider text-[10px]">INCLUDED</span>
                </div>
                <div className="flex justify-between items-center text-emerald-400">
                  <span>Central Climate Control & Pro Sound:</span>
                  <span className="font-bold uppercase tracking-wider text-[10px]">INCLUDED</span>
                </div>
              </div>

              {/* Total Box */}
              <div className="p-4 bg-[#141312] border border-[#d4af37] mb-6">
                <div className="flex justify-between items-baseline mb-1">
                  <span className="text-xs uppercase tracking-wider text-[#a8a6a5] font-semibold">
                    Estimated Grand Total:
                  </span>
                  <span className="font-serif text-2xl sm:text-3xl font-bold text-[#fed65b]">
                    ৳{estimatedGrandTotal.toLocaleString()}
                  </span>
                </div>
                <p className="text-[11px] text-[#a8a6a5] text-right">
                  Approx. ৳{perGuestEffective.toLocaleString()} per guest (All inclusive)
                </p>
              </div>

              {/* Instant Conversion CTAs */}
              <div className="space-y-3">
                <button
                  type="button"
                  onClick={() => onOpenBanquetInquiryWithVenue?.(calculatorVenueId, calculatorTierId, calculatorGuests)}
                  className="w-full py-4 bg-[#fed65b] text-[#1c1b1b] text-xs uppercase tracking-[0.2em] font-bold hover:bg-[#d4af37] transition-all cursor-pointer text-center shadow-lg"
                >
                  LOCK IN THIS ESTIMATE & INQUIRE
                </button>

                <button
                  type="button"
                  onClick={handleShareOnWhatsApp}
                  className="w-full py-3 bg-[#1e1c1b] border border-[#25D366] text-[#25D366] text-xs uppercase tracking-[0.15em] font-bold hover:bg-[#25D366] hover:text-white transition-all cursor-pointer flex items-center justify-center space-x-2"
                >
                  <span>SEND QUOTATION VIA WHATSAPP</span>
                </button>
              </div>

              <p className="text-[10px] text-[#8c8988] text-center mt-4 leading-relaxed">
                * Quotation is an initial estimate. Final dates and customized menu dishes will be locked upon signing with our Maître D'.
              </p>
            </div>
          </div>
        </div>

        {/* 2. FLOORPLAN & SEATING CONFIGURATION VISUALIZER */}
        <div className="mb-24 bg-[#1a1918] border border-[#383533] p-6 sm:p-10 text-left">
          <div className="max-w-3xl mb-8">
            <span className="text-xs uppercase tracking-[0.2em] text-[#fed65b] font-bold">
              ARCHITECTURAL EXCELLENCE & SEATING FLEXIBILITY
            </span>
            <h3 className="font-serif text-3xl sm:text-4xl text-white font-bold mt-1 mb-2">
              Seating Formats & Spatial Setups
            </h3>
            <p className="text-xs sm:text-sm text-[#c8c6c5] leading-relaxed font-light">
              Explore how our 24-ft pillarless hall dynamically adapts to diverse cultural and corporate seating configurations.
            </p>
          </div>

          {/* Layout Tabs */}
          <div className="flex overflow-x-auto no-scrollbar gap-2 mb-8 pb-1">
            {FLOORPLAN_LAYOUTS.map((layout) => (
              <button
                key={layout.id}
                onClick={() => setActiveFloorplanId(layout.id)}
                className={`px-4 py-2.5 text-xs font-bold uppercase tracking-wider transition-all whitespace-nowrap cursor-pointer border ${
                  activeFloorplanId === layout.id
                    ? 'bg-[#fed65b] text-[#1c1b1b] border-[#fed65b]'
                    : 'bg-[#141312] text-[#c8c6c5] border-[#383533] hover:text-white'
                }`}
              >
                {layout.name.split('(')[0]}
              </button>
            ))}
          </div>

          {/* Active Layout Detail Card */}
          <div className="p-6 bg-[#141312] border border-[#d4af37]/60 grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            <div className="md:col-span-7 space-y-3">
              <span className="inline-block px-2.5 py-0.5 bg-[#2a2625] text-[#fed65b] text-[10px] font-bold uppercase tracking-widest border border-[#d4af37]/40">
                {activeFloorplan.capacity}
              </span>
              <h4 className="font-serif text-2xl font-bold text-white">
                {activeFloorplan.name}
              </h4>
              <p className="text-xs sm:text-sm text-[#c8c6c5] leading-relaxed">
                {activeFloorplan.description}
              </p>
              <div className="pt-2">
                <p className="text-[11px] uppercase tracking-wider text-[#fed65b] font-bold mb-2">
                  Key Spatial Advantages:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {activeFloorplan.features.map((feat, idx) => (
                    <div key={idx} className="flex items-center space-x-2 text-xs text-[#e5e2e1]">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#fed65b] shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="md:col-span-5 bg-[#1f1d1c] p-5 border border-[#383533] text-center">
              <p className="text-xs uppercase tracking-widest text-[#a8a6a5] font-semibold mb-1">Recommended For</p>
              <p className="font-serif text-lg text-white font-bold mb-4">{activeFloorplan.bestFor}</p>
              <button
                type="button"
                onClick={() => onOpenBanquetInquiryWithVenue?.(selectedVenueId)}
                className="px-5 py-2.5 bg-[#fed65b] text-[#1c1b1b] text-xs font-bold uppercase tracking-wider hover:bg-[#d4af37] transition-all cursor-pointer w-full"
              >
                REQUEST THIS CONFIGURATION
              </button>
            </div>
          </div>
        </div>

        {/* 3. Banquet Pricing & Culinary Packages */}
        <div className="mt-20">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-xs uppercase tracking-[0.2em] text-[#fed65b] font-bold">
              ALL-INCLUSIVE SYLHETI BANQUET MENUS
            </span>
            <h3 className="font-serif text-3xl sm:text-4xl md:text-5xl text-white font-bold mt-2 mb-4">
              Event Package Tiers (BDT / ৳)
            </h3>
            <p className="text-sm sm:text-base text-[#e5e2e1]">
              Every celebration is accompanied by professional event supervision, halal-certified kitchen preparation, and menus curated by our Sylheti culinary masters.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {BANQUET_TIERS.map((tier) => {
              const isRecommended = tier.id === 'package-b';
              const isLuxe = tier.id === 'package-c';
              return (
                <div
                  key={tier.id}
                  className={`bg-[#1e1c1b] border flex flex-col justify-between p-8 sm:p-10 transition-all duration-300 relative text-left ${
                    isRecommended
                      ? 'border-[#fed65b] shadow-2xl bg-[#252220]'
                      : isLuxe
                      ? 'border-[#d4af37] bg-[#1a1817]'
                      : 'border-[#383533]'
                  }`}
                >
                  {isRecommended && (
                    <div className="absolute top-0 right-8 -translate-y-1/2 bg-[#fed65b] text-[#1c1b1b] px-3 py-1 text-[10px] uppercase tracking-[0.2em] font-bold shadow-md">
                      MOST POPULAR
                    </div>
                  )}

                  <div>
                    <div className="mb-6 border-b border-[#383533] pb-6">
                      <p className="text-xs uppercase tracking-widest text-[#fed65b] font-bold mb-1">
                        {tier.recommendedFor}
                      </p>
                      <h4 className="font-serif text-3xl text-white font-bold">
                        {tier.name}
                      </h4>
                      <p className="font-serif italic text-sm text-[#e5e2e1] mt-1">
                        {tier.subtitle}
                      </p>
                      <div className="mt-4 flex items-baseline space-x-2">
                        <span className="font-serif text-4xl sm:text-5xl text-white font-bold">
                          ৳{tier.pricePerGuest.toLocaleString()}
                        </span>
                        <span className="text-xs uppercase tracking-wider text-[#c8c6c5]">
                          / per guest
                        </span>
                      </div>
                    </div>

                    <p className="text-xs uppercase tracking-widest text-[#fed65b] font-bold mb-4">
                      Package Inclusions:
                    </p>
                    <ul className="space-y-3.5 mb-8">
                      {tier.inclusions.map((inclusion, idx) => (
                        <li key={idx} className="flex items-start space-x-3 text-xs sm:text-sm text-[#e5e2e1]">
                          <CheckCircle2 className="w-4 h-4 text-[#fed65b] shrink-0 mt-0.5" />
                          <span>{inclusion}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-4 border-t border-[#383533]">
                    <button
                      onClick={() => onOpenBanquetInquiryWithVenue?.(selectedVenueId, tier.id)}
                      className={`w-full py-4 text-xs uppercase tracking-[0.2em] font-bold transition-all cursor-pointer ${
                        isRecommended
                          ? 'bg-[#fed65b] text-[#1c1b1b] hover:bg-[#d4af37]'
                          : 'bg-[#141312] text-white border border-[#383533] hover:bg-[#383533]'
                      }`}
                    >
                      Select {tier.name}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* 4. 5-STAR VENUE HOSPITALITY PILLARS */}
        <div className="mt-20 pt-16 border-t border-[#383533] text-left">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs uppercase tracking-[0.2em] text-[#fed65b] font-bold">
              THE DASTARKHAN PROMISE
            </span>
            <h4 className="font-serif text-3xl text-white font-bold mt-2">
              Uncompromising Standards of Hospitality
            </h4>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 bg-[#1a1918] border border-[#383533]">
              <Zap className="w-7 h-7 text-[#fed65b] mb-4" />
              <h5 className="font-serif text-lg font-bold text-white mb-2">100% Dual Generator Backup</h5>
              <p className="text-xs text-[#c8c6c5] leading-relaxed">
                Seamless automatic transfer switches guarantee that lighting, AC, and sound never flicker for a single second during your ceremony.
              </p>
            </div>

            <div className="p-6 bg-[#1a1918] border border-[#383533]">
              <Car className="w-7 h-7 text-[#fed65b] mb-4" />
              <h5 className="font-serif text-lg font-bold text-white mb-2">150+ Vehicle Parking & Valet</h5>
              <p className="text-xs text-[#c8c6c5] leading-relaxed">
                Dedicated secured parking lot on Umorpur Road with uniformed valet attendants to handle high-volume arrival peaks effortlessly.
              </p>
            </div>

            <div className="p-6 bg-[#1a1918] border border-[#383533]">
              <ShieldCheck className="w-7 h-7 text-[#fed65b] mb-4" />
              <h5 className="font-serif text-lg font-bold text-white mb-2">Dedicated Prayer & Ablution</h5>
              <p className="text-xs text-[#c8c6c5] leading-relaxed">
                Separate serene prayer sanctuaries and clean wudhu facilities for ladies and gentlemen throughout the event duration.
              </p>
            </div>

            <div className="p-6 bg-[#1a1918] border border-[#383533]">
              <HeartHandshake className="w-7 h-7 text-[#fed65b] mb-4" />
              <h5 className="font-serif text-lg font-bold text-white mb-2">Dedicated Maître D' Captain</h5>
              <p className="text-xs text-[#c8c6c5] leading-relaxed">
                An experienced hospitality captain assigned specifically to your family to coordinate timeline, food replenishment, and VIP hosts.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Architectural Gallery Modal */}
      {galleryModalVenue && (
        <div 
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setGalleryModalVenue(null)}
        >
          <div 
            className="bg-[#1a1918] border border-[#d4af37] max-w-4xl w-full overflow-hidden shadow-2xl animate-fadeIn"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="p-6 border-b border-[#383533] flex items-center justify-between">
              <div>
                <h3 className="font-serif text-2xl text-white font-bold">{galleryModalVenue.name} Gallery</h3>
                <p className="text-xs text-[#e5e2e1] uppercase tracking-widest">{galleryModalVenue.subtitle}</p>
              </div>
              <button
                onClick={() => setGalleryModalVenue(null)}
                className="p-2 bg-[#2a2625] text-white hover:text-[#fed65b] transition-colors"
                aria-label="Close Gallery"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Main Image View */}
            <div className="relative h-72 sm:h-[450px] bg-black">
              <img
                src={galleryModalVenue.galleryUrls[activeImageIndex]}
                alt={`${galleryModalVenue.name} View ${activeImageIndex + 1}`}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Thumbnails Footer */}
            <div className="p-4 sm:p-6 bg-[#141312] flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
              <div className="flex space-x-2.5 sm:space-x-3 overflow-x-auto no-scrollbar pb-1 sm:pb-0">
                {galleryModalVenue.galleryUrls.map((url, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`w-16 sm:w-20 h-12 sm:h-14 overflow-hidden border transition-all cursor-pointer shrink-0 ${
                      activeImageIndex === idx ? 'border-[#fed65b] scale-105 shadow-md' : 'border-[#383533] opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img src={url} alt="Thumbnail" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>

              <button
                onClick={() => {
                  const id = galleryModalVenue.id;
                  setGalleryModalVenue(null);
                  onOpenBanquetInquiryWithVenue?.(id);
                }}
                className="px-6 py-3 bg-[#fed65b] text-[#1c1b1b] text-xs uppercase tracking-widest font-bold hover:bg-[#d4af37] shrink-0 text-center"
              >
                Inquire This Venue
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};


