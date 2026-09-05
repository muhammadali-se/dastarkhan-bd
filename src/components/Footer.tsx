import React from 'react';
import { RESTAURANT_INFO } from '../data';
import { Utensils, Sparkles, MapPin, Phone, Mail, Clock, ArrowUp } from 'lucide-react';
import { DastarkhanEmblem } from './DastarkhanEmblem';

interface FooterProps {
  setActiveTab: (tab: string) => void;
  onOpenTableReservation: () => void;
  onOpenBanquetInquiry: () => void;
  onOpenConcierge: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  setActiveTab,
  onOpenTableReservation,
  onOpenBanquetInquiry,
  onOpenConcierge
}) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="footer-contact" className="bg-[#1c1b1b] text-[#e5e2e1] border-t border-[#444748] scroll-mt-20">
      {/* Upper Footer Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">
          {/* Brand & Tagline */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <DastarkhanEmblem className="w-9 h-9" size={36} />
              <div>
                <h3 className="font-serif text-3xl text-white font-bold tracking-tight">
                  {RESTAURANT_INFO.name}
                </h3>
                <p className="text-[10px] uppercase tracking-[0.2em] text-[#fed65b] font-bold">
                  RESTAURANT & BANQUET HALL
                </p>
              </div>
            </div>
            <p className="text-sm text-[#c8c6c5] leading-relaxed">
              {RESTAURANT_INFO.shortDescription}
            </p>
            <div className="pt-2">
              <button
                onClick={onOpenConcierge}
                className="inline-flex items-center space-x-2 text-xs uppercase tracking-[0.18em] text-[#fed65b] hover:text-white transition-colors cursor-pointer font-bold"
              >
                <Sparkles className="w-4 h-4" />
                <span>Ask Dastarkhan AI Assistant</span>
              </button>
            </div>
          </div>

          {/* Quick Navigation */}
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-[#fed65b] font-bold mb-6">
              Navigation & Experiences
            </p>
            <ul className="space-y-3 text-sm">
              <li>
                <button
                  onClick={() => {
                    setActiveTab('home');
                    scrollToTop();
                  }}
                  className="hover:text-white transition-colors cursor-pointer font-medium"
                >
                  Overview & Highlights
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setActiveTab('menu');
                    scrollToTop();
                  }}
                  className="hover:text-white transition-colors cursor-pointer font-medium"
                >
                  Dastarkhan Culinary Menu
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setActiveTab('banquet');
                    scrollToTop();
                  }}
                  className="hover:text-white transition-colors cursor-pointer font-medium"
                >
                  Grand Banquet Spaces
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setActiveTab('story');
                    scrollToTop();
                  }}
                  className="hover:text-white transition-colors cursor-pointer font-medium"
                >
                  Our Sylheti Heritage
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenTableReservation}
                  className="text-[#fed65b] hover:text-white transition-colors cursor-pointer font-semibold"
                >
                  Reserve a Dining Table
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenBanquetInquiry}
                  className="text-[#fed65b] hover:text-white transition-colors cursor-pointer font-semibold"
                >
                  Banquet Hall Inquiry
                </button>
              </li>
            </ul>
          </div>

          {/* Location & Hours */}
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-[#fed65b] font-bold mb-6">
              Location & Dining Hours
            </p>
            <ul className="space-y-3 text-sm text-[#c8c6c5]">
              <li className="flex items-start space-x-2">
                <MapPin className="w-4 h-4 text-[#fed65b] shrink-0 mt-0.5" />
                <span>{RESTAURANT_INFO.address}</span>
              </li>
              <li className="flex items-start space-x-2">
                <Clock className="w-4 h-4 text-[#fed65b] shrink-0 mt-0.5" />
                <div>
                  <p className="text-white font-semibold">Dinner Service</p>
                  <p className="text-xs text-[#a8a6a5]">{RESTAURANT_INFO.hours.dinner}</p>
                </div>
              </li>
              <li className="flex items-start space-x-2">
                <Clock className="w-4 h-4 text-[#fed65b] shrink-0 mt-0.5" />
                <div>
                  <p className="text-white font-semibold">Banquet Inquiries</p>
                  <p className="text-xs text-[#a8a6a5]">{RESTAURANT_INFO.hours.banquetInquiries}</p>
                </div>
              </li>
            </ul>
          </div>

          {/* Direct Concierge & Newsletter */}
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-[#fed65b] font-bold mb-6">
              Dastarkhan Inner Circle
            </p>
            <p className="text-sm text-[#c8c6c5] mb-4">
              Receive seasonal invites to special Mughlai festivals, royal Ramadan buffets, and private community events.
            </p>
            <form onSubmit={(e) => e.preventDefault()} className="space-y-2">
              <input
                type="email"
                placeholder="Your Email Address"
                className="w-full bg-[#242222] border border-[#444748] px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#fed65b]"
              />
              <button
                type="submit"
                className="w-full py-2.5 bg-[#fed65b] text-[#1c1b1b] text-xs uppercase tracking-[0.2em] font-bold hover:bg-[#d4af37] transition-colors cursor-pointer"
              >
                JOIN NEWSLETTER
              </button>
            </form>
            <div className="mt-4 text-xs text-[#a8a6a5]">
              Direct Tel: {RESTAURANT_INFO.phone}
            </div>
          </div>
        </div>
      </div>

      {/* Lower Bar */}
      <div className="border-t border-[#444748] bg-[#141313]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#a8a6a5]">
          <p>
            © {new Date().getFullYear()} Dastarkhan Restaurant & Banquet Hall, Osmaninagar, Sylhet. All rights reserved.
          </p>
          <div className="flex items-center space-x-6">
            <span>Traditional Hospitality • Modern Elegance</span>
            <button
              onClick={scrollToTop}
              className="flex items-center space-x-1 text-[#fed65b] hover:text-white transition-colors cursor-pointer font-semibold"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

