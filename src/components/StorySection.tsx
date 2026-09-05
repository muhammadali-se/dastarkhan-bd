import React from 'react';
import { RESTAURANT_INFO, CUSTOMER_REVIEWS } from '../data';
import { MapPin, Star, ArrowRight, Utensils, Calendar, ShieldCheck, Heart, Sparkles, Award } from 'lucide-react';

interface StorySectionProps {
  onExploreMenu?: () => void;
  onExploreBanquet?: () => void;
  onOpenTableReservation?: () => void;
  onOpenBanquetInquiry?: () => void;
}

export const StorySection: React.FC<StorySectionProps> = ({
  onExploreMenu,
  onExploreBanquet,
  onOpenTableReservation,
  onOpenBanquetInquiry
}) => {
  return (
    <section className="bg-[#fdf8f8] text-[#1c1b1b] overflow-hidden" id="heritage-story">
      {/* 1. Two Featured Prestige Cards ("Signature Dishes" & "Grand Banquet Spaces") */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {/* Signature Dishes Card */}
          <div className="relative group overflow-hidden bg-[#141312] min-h-[380px] sm:min-h-[440px] md:min-h-[480px] flex flex-col justify-end p-6 sm:p-8 md:p-12 border-b-4 border-[#fed65b] shadow-xl">
            <div className="absolute inset-0 z-0">
              <img
                src="https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1200&q=80"
                alt="Signature Dishes - Sylheti Cuisine"
                className="w-full h-full object-cover object-center opacity-60 group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#141312] via-[#141312]/60 to-transparent" />
            </div>

            <div className="relative z-10 text-white max-w-md text-left">
              <span className="text-[10px] uppercase tracking-[0.25em] text-[#fed65b] font-bold block mb-2">
                HAUTE SYLHETI CUISINE
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold mb-2 sm:mb-3">
                Signature Gastronomy
              </h3>
              <p className="text-xs sm:text-sm md:text-base text-[#e5e2e1] mb-6 leading-relaxed font-light">
                Authentic heirloom recipes passed down through generations—from wild Chuijhal pepper beef to ceremonial Bamboo Kacchi, perfected for discerning palates.
              </p>
              <button
                onClick={onExploreMenu}
                className="px-6 py-3 bg-[#fed65b] text-[#1c1b1b] text-xs uppercase tracking-[0.2em] font-bold hover:bg-[#d4af37] transition-all cursor-pointer inline-flex items-center space-x-2 shadow-lg"
              >
                <span>EXPLORE MENU & ORDER</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Grand Banquet Spaces Card */}
          <div className="relative group overflow-hidden bg-[#141312] min-h-[380px] sm:min-h-[440px] md:min-h-[480px] flex flex-col justify-end p-6 sm:p-8 md:p-12 border-b-4 border-[#fed65b] shadow-xl">
            <div className="absolute inset-0 z-0">
              <img
                src="https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=1200&q=80"
                alt="Grand Banquet Spaces - Osmaninagar"
                className="w-full h-full object-cover object-center opacity-60 group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#141312] via-[#141312]/60 to-transparent" />
            </div>

            <div className="relative z-10 text-white max-w-md text-left">
              <span className="text-[10px] uppercase tracking-[0.25em] text-[#fed65b] font-bold block mb-2">
                IMPERIAL CELEBRATIONS
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold mb-2 sm:mb-3">
                Grand Banquet Spaces
              </h3>
              <p className="text-xs sm:text-sm md:text-base text-[#e5e2e1] mb-6 leading-relaxed font-light">
                Celebrate your most cherished milestones in Osmaninagar’s majestic pillarless ballroom, designed for up to 700 guests with flawless luxury hospitality.
              </p>
              <button
                onClick={onExploreBanquet}
                className="px-6 py-3 bg-transparent border border-[#fed65b] text-[#fed65b] text-xs uppercase tracking-[0.2em] font-bold hover:bg-[#fed65b] hover:text-[#1c1b1b] transition-all cursor-pointer inline-flex items-center space-x-2 shadow-lg"
              >
                <span>PLAN YOUR EVENT</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 2. "The Meaning of Dastarkhan & The Osmaninagar Landmark" Section */}
      <div className="bg-[#f5f1ee] py-16 sm:py-24 border-y border-[#e5e2e1]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 lg:gap-16 items-center">
            {/* Left text column */}
            <div className="lg:col-span-7 space-y-5 sm:space-y-6 text-left">
              <div className="inline-flex items-center space-x-2 px-3 py-1 bg-white border border-[#d4af37]/60">
                <span className="text-[10px] uppercase tracking-[0.25em] text-[#735c00] font-bold">
                  THE ROYAL HERITAGE OF DASTARKHAN
                </span>
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1c1b1b] leading-[1.15] sm:leading-[1.1]">
                Where Ancient Hospitality <br />
                Meets Modern Splendor
              </h2>
              <p className="text-sm sm:text-base lg:text-lg text-[#444748] leading-relaxed font-light">
                In Persian and Mughal history, the <em>Dastarkhan</em> was the sacred dining cloth upon which kings, poets, and family gathered as equals. In Osmaninagar, we honor this legacy by blending time-honored culinary heritage with state-of-the-art five-star venue architecture.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="p-4 bg-white border border-[#e5e2e1]">
                  <h4 className="font-serif text-base font-bold text-[#1c1b1b] mb-1">Sylheti Diaspora Landmark</h4>
                  <p className="text-xs text-[#5f5e5e] leading-relaxed">
                    A trusted home for UK and international diaspora seeking London/Dubai luxury event standards in their ancestral heartland.
                  </p>
                </div>
                <div className="p-4 bg-white border border-[#e5e2e1]">
                  <h4 className="font-serif text-base font-bold text-[#1c1b1b] mb-1">Centrally Located</h4>
                  <p className="text-xs text-[#5f5e5e] leading-relaxed">
                    Conveniently situated on Umorpur Road in Gowalabazar with rapid highway access from Sylhet City and Sreemangal.
                  </p>
                </div>
              </div>

              <div className="pt-2 flex items-center space-x-2.5 text-xs uppercase tracking-[0.15em] font-bold text-[#735c00]">
                <MapPin className="w-4 h-4 text-[#735c00]" />
                <span>Gowalabazar, Osmaninagar, Sylhet • Umorpur Road</span>
              </div>
            </div>

            {/* Right exterior photo column */}
            <div className="lg:col-span-5">
              <div className="relative p-2.5 bg-white border border-[#d4af37]/60 shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1200&q=80"
                  alt="Dastarkhan Restaurant exterior evening"
                  className="w-full h-[320px] sm:h-[420px] lg:h-[460px] object-cover"
                />
                <div className="absolute bottom-5 right-5 bg-[#1c1b1b] px-4 py-2 text-white text-xs uppercase tracking-widest font-bold border border-[#d4af37]/80 shadow-lg">
                  OSMANINAGAR • SYLHET
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 3. "Loved by Locals & Travelers" Reviews Section */}
      <div className="py-16 sm:py-24 bg-[#fdf8f8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Gold Stars */}
          <div className="flex justify-center space-x-1.5 mb-3 sm:mb-4">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star key={star} className="w-4 sm:w-5 h-4 sm:h-5 text-[#fed65b] fill-[#fed65b]" />
            ))}
          </div>

          <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-[#1c1b1b] mb-2">
            Praised by Royals, Families & Travelers
          </h2>
          <p className="text-[11px] sm:text-xs uppercase tracking-[0.25em] text-[#735c00] mb-12 sm:mb-16 font-bold">
            4.9 Stars Verified on Google & TripAdvisor • 1,200+ Testimonials
          </p>

          {/* Review Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 text-left">
            {CUSTOMER_REVIEWS.map((rev) => (
              <div
                key={rev.id}
                className="bg-white p-8 border border-[#e5e2e1] border-b-4 border-b-[#fed65b] shadow-md hover:shadow-xl transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex space-x-1 mb-4 text-[#fed65b]">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star key={s} className="w-3.5 h-3.5 fill-[#fed65b]" />
                    ))}
                  </div>
                  <p className="text-sm sm:text-base text-[#444748] italic leading-relaxed mb-8">
                    "{rev.text}"
                  </p>
                </div>

                <div className="flex items-center space-x-3.5 pt-4 border-t border-[#f1edec]">
                  <img
                    src={rev.avatarUrl}
                    alt={rev.author}
                    className="w-11 h-11 object-cover border border-[#d4af37]/60"
                  />
                  <div>
                    <h4 className="font-serif text-base font-bold text-[#1c1b1b]">{rev.author}</h4>
                    <p className="text-[10px] uppercase tracking-wider text-[#735c00] font-bold">
                      {rev.role}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};


