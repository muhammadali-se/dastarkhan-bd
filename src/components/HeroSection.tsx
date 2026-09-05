import React, { useState, useEffect } from 'react';
import { Utensils, Calendar, MapPin, Star, Award, ShieldCheck, Users, Sparkles, ChevronRight, Phone, Clock, ArrowRight } from 'lucide-react';
import { RESTAURANT_INFO } from '../data';

interface HeroSectionProps {
  onExploreMenu: () => void;
  onExploreBanquet: () => void;
  onOpenTableReservation: () => void;
  onOpenConcierge: () => void;
}

interface HeroScene {
  id: string;
  title: string;
  subtitle: string;
  badge: string;
  image: string;
  tagline: string;
}

const HERO_SCENES: HeroScene[] = [
  {
    id: 'ballroom',
    title: 'Majestic Celebrations,',
    subtitle: 'Unforgettable Memories',
    badge: 'GRAND BANQUET BALLROOM • UP TO 700 GUESTS',
    image: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=2000&q=85',
    tagline: 'Osmaninagar\'s premier destination for royal wedding galas, milestone receptions, and VIP community summits.'
  },
  {
    id: 'dining',
    title: 'Traditional Flavors,',
    subtitle: 'Modern Elegance',
    badge: 'MUGHLAI & SYLHETI CHUIJHAL HAUTE CUISINE',
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=2000&q=85',
    tagline: 'Masterfully spiced Peshawari charcoal tandoors, authentic Bamboo Kacchi, and slow-braised indigenous Chuijhal specialties.'
  },
  {
    id: 'terrace',
    title: 'The Starlight Terrace,',
    subtitle: 'Enchanted Evenings',
    badge: 'ROOFTOP GARDEN & OPEN-AIR CELEBRATIONS',
    image: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=2000&q=85',
    tagline: 'Under the evening skies of Gowalabazar—intimate Holud, Mehendi soirées, live tandoor grills, and panoramic views.'
  }
];

export const HeroSection: React.FC<HeroSectionProps> = ({
  onExploreMenu,
  onExploreBanquet,
  onOpenTableReservation,
  onOpenConcierge
}) => {
  const [currentSceneIdx, setCurrentSceneIdx] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSceneIdx((prev) => (prev + 1) % HERO_SCENES.length);
    }, 7000);
    return () => clearInterval(timer);
  }, []);

  const activeScene = HERO_SCENES[currentSceneIdx];

  return (
    <section className="relative min-h-[90vh] lg:min-h-[92vh] bg-[#121110] text-white overflow-hidden flex flex-col justify-between">
      {/* Background Image Carousel with Smooth Transitions */}
      {HERO_SCENES.map((scene, idx) => (
        <div
          key={scene.id}
          className={`absolute inset-0 z-0 transition-opacity duration-1000 ease-in-out ${
            idx === currentSceneIdx ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
        >
          <img
            src={scene.image}
            alt={scene.title}
            className="w-full h-full object-cover object-center scale-105 transition-transform duration-[10000ms] ease-out hover:scale-100"
          />
          {/* Multi-layered Vignette & Dark Luxury Film */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#0d0c0c]/95 via-[#0d0c0c]/75 to-[#0d0c0c]/90" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0d0c0c] via-transparent to-[#0d0c0c]/70" />
        </div>
      ))}

      {/* Top Floating Status Indicator */}
      <div className="relative z-20 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8 flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="inline-flex items-center space-x-2.5 px-3.5 py-1.5 bg-[#1a1918]/80 backdrop-blur-md border border-[#d4af37]/40 shadow-lg">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.2em] text-[#fed65b] font-bold">
            Live Today: Dining & Event Concierge Open until 11:30 PM
          </span>
        </div>

        {/* Scene Switcher Dots / Tabs */}
        <div className="hidden sm:flex items-center space-x-2 bg-[#1a1918]/80 backdrop-blur-md border border-[#d4af37]/30 px-3 py-1.5">
          <span className="text-[10px] uppercase tracking-wider text-[#a8a6a5] font-semibold mr-1">
            Experience:
          </span>
          {HERO_SCENES.map((scene, idx) => (
            <button
              key={scene.id}
              onClick={() => setCurrentSceneIdx(idx)}
              className={`px-2.5 py-0.5 text-[10px] uppercase tracking-wider font-bold transition-all cursor-pointer ${
                idx === currentSceneIdx
                  ? 'bg-[#fed65b] text-[#1c1b1b]'
                  : 'text-[#e5e2e1] hover:text-[#fed65b]'
              }`}
            >
              {scene.id === 'ballroom' ? 'Grand Ballroom' : scene.id === 'dining' ? 'Haute Cuisine' : 'Rooftop Terrace'}
            </button>
          ))}
        </div>
      </div>

      {/* Main Hero Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 md:py-20 lg:py-24 flex-1 flex flex-col justify-center items-start text-left">
        <div className="max-w-3.5xl">
          {/* Eyebrow / Regal Crest line */}
          <div className="flex items-center space-x-3 mb-4 sm:mb-5">
            <span className="h-[1px] w-8 sm:w-12 bg-gradient-to-r from-[#fed65b] to-transparent"></span>
            <span className="text-[10px] sm:text-xs uppercase tracking-[0.25em] text-[#fed65b] font-bold">
              {activeScene.badge}
            </span>
          </div>

          {/* Royal Headline with Cormorant & Cinzel touches */}
          <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold tracking-tight text-white leading-[1.08] sm:leading-[1.04] mb-4 sm:mb-6">
            {activeScene.title} <br />
            <span className="gold-gradient-text font-serif italic font-normal">
              {activeScene.subtitle}
            </span>
          </h1>

          {/* Subtitle / Narrative */}
          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-[#e5e2e1] max-w-2xl font-light leading-relaxed mb-8 sm:mb-10 font-sans">
            {activeScene.tagline}
          </p>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 sm:gap-4 w-full sm:w-auto">
            {/* Primary Gold Button */}
            <button
              onClick={onExploreBanquet}
              className="relative px-7 sm:px-9 py-4 bg-[#fed65b] text-[#1c1b1b] text-xs uppercase tracking-[0.2em] font-bold hover:bg-[#d4af37] transition-all duration-300 shadow-xl hover:shadow-[#fed65b]/20 cursor-pointer flex items-center justify-center space-x-2.5 group"
            >
              <span>PLAN BANQUET EVENT</span>
              <Calendar className="w-4 h-4 text-[#1c1b1b] group-hover:translate-x-0.5 transition-transform" />
            </button>

            {/* Secondary Dark Luxury Button */}
            <button
              onClick={onExploreMenu}
              className="px-7 sm:px-9 py-4 bg-[#1a1918]/90 border border-[#d4af37] text-white text-xs uppercase tracking-[0.2em] font-bold hover:bg-white hover:text-[#1c1b1b] transition-all duration-300 cursor-pointer flex items-center justify-center space-x-2.5 group shadow-lg"
            >
              <span>ORDER DINING ONLINE</span>
              <Utensils className="w-4 h-4 text-[#fed65b] group-hover:text-[#1c1b1b] transition-colors" />
            </button>

            {/* Tertiary Table Booking */}
            <button
              onClick={onOpenTableReservation}
              className="px-5 py-4 bg-transparent text-[#fed65b] hover:text-white text-xs uppercase tracking-[0.18em] font-bold transition-colors cursor-pointer flex items-center justify-center space-x-2"
            >
              <span>RESERVE VIP TABLE</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Direct VIP Contact Touchpoint */}
          <div className="mt-8 sm:mt-10 flex flex-wrap items-center gap-6 text-xs text-[#c8c6c5] pt-4 border-t border-white/10">
            <div className="flex items-center space-x-2">
              <Phone className="w-3.5 h-3.5 text-[#fed65b]" />
              <span>VIP Maître D': <a href={`tel:${RESTAURANT_INFO.phone}`} className="text-white font-bold hover:text-[#fed65b] transition-colors">{RESTAURANT_INFO.phone}</a></span>
            </div>
            <div className="hidden sm:inline text-white/30">•</div>
            <div className="flex items-center space-x-2">
              <MapPin className="w-3.5 h-3.5 text-[#fed65b]" />
              <span>Umorpur Road, Gowalabazar, Osmaninagar</span>
            </div>
            <div className="hidden md:inline text-white/30">•</div>
            <button
              onClick={onOpenConcierge}
              className="flex items-center space-x-1.5 text-[#fed65b] hover:underline font-bold cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Ask AI Concierge</span>
            </button>
          </div>
        </div>
      </div>

      {/* High-Contrast Luxury Metrics Ribbon */}
      <div className="relative z-10 border-t border-[#383533] bg-[#141312]/95 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 sm:py-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-left">
            <div className="flex items-start space-x-3.5 pl-0 md:pl-2 border-r border-[#2d2a28] last:border-r-0">
              <div className="p-2 bg-[#22201e] border border-[#d4af37]/40 shrink-0">
                <Star className="w-4 h-4 text-[#fed65b] fill-[#fed65b]" />
              </div>
              <div>
                <div className="flex items-baseline space-x-1.5">
                  <span className="font-serif text-lg sm:text-xl font-bold text-white">4.9</span>
                  <span className="text-[10px] text-[#fed65b] uppercase tracking-wider font-bold">/ 5.0</span>
                </div>
                <p className="text-[10px] sm:text-[11px] text-[#a8a6a5] mt-0.5">1,200+ Google Reviews</p>
              </div>
            </div>

            <div className="flex items-start space-x-3.5 pl-0 md:pl-2 border-r border-[#2d2a28] last:border-r-0">
              <div className="p-2 bg-[#22201e] border border-[#d4af37]/40 shrink-0">
                <Users className="w-4 h-4 text-[#fed65b]" />
              </div>
              <div>
                <div className="flex items-baseline space-x-1.5">
                  <span className="font-serif text-lg sm:text-xl font-bold text-white">700</span>
                  <span className="text-[10px] text-[#fed65b] uppercase tracking-wider font-bold">Guests</span>
                </div>
                <p className="text-[10px] sm:text-[11px] text-[#a8a6a5] mt-0.5">Grand Pillarless Ballroom</p>
              </div>
            </div>

            <div className="flex items-start space-x-3.5 pl-0 md:pl-2 border-r border-[#2d2a28] last:border-r-0">
              <div className="p-2 bg-[#22201e] border border-[#d4af37]/40 shrink-0">
                <Award className="w-4 h-4 text-[#fed65b]" />
              </div>
              <div>
                <div className="flex items-baseline space-x-1.5">
                  <span className="font-serif text-lg sm:text-xl font-bold text-white">15+</span>
                  <span className="text-[10px] text-[#fed65b] uppercase tracking-wider font-bold">Chefs</span>
                </div>
                <p className="text-[10px] sm:text-[11px] text-[#a8a6a5] mt-0.5">Chuijhal & Mughlai Masters</p>
              </div>
            </div>

            <div className="flex items-start space-x-3.5 pl-0 md:pl-2">
              <div className="p-2 bg-[#22201e] border border-[#d4af37]/40 shrink-0">
                <ShieldCheck className="w-4 h-4 text-[#fed65b]" />
              </div>
              <div>
                <div className="flex items-baseline space-x-1.5">
                  <span className="font-serif text-lg sm:text-xl font-bold text-white">100%</span>
                  <span className="text-[10px] text-[#fed65b] uppercase tracking-wider font-bold">Halal</span>
                </div>
                <p className="text-[10px] sm:text-[11px] text-[#a8a6a5] mt-0.5">Family Majlis & VIP Lounges</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};


