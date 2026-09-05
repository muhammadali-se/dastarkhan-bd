import React, { useState } from 'react';
import { Menu as MenuIcon, X, Sparkles, Phone, MapPin, Clock, ShoppingBag } from 'lucide-react';
import { RESTAURANT_INFO } from '../data';
import { DastarkhanEmblem } from './DastarkhanEmblem';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onOpenTableReservation: () => void;
  onOpenBanquetInquiry: () => void;
  onOpenConcierge: () => void;
  onOpenOrderModal: () => void;
  cartCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  onOpenTableReservation,
  onOpenBanquetInquiry,
  onOpenConcierge,
  onOpenOrderModal,
  cartCount
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'HOME' },
    { id: 'menu', label: 'MENU' },
    { id: 'banquet', label: 'EVENTS' },
    { id: 'story', label: 'GALLERY' },
    { id: 'contact', label: 'CONTACT' }
  ];

  const handleNavClick = (id: string) => {
    if (id === 'contact') {
      const footerEl = document.getElementById('footer-contact');
      if (footerEl) {
        footerEl.scrollIntoView({ behavior: 'smooth' });
      } else {
        setActiveTab('home');
        window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
      }
    } else {
      setActiveTab(id);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-[#fdf8f8]/95 text-[#1c1b1b] backdrop-blur-md border-b border-[#e5e2e1] transition-all duration-300">
      {/* Top micro-bar for hours and Osmaninagar address */}
      <div className="hidden lg:flex justify-between items-center px-8 py-2 text-[11px] border-b border-[#ebe7e6] text-[#5f5e5e] tracking-widest uppercase font-sans">
        <div className="flex items-center space-x-6">
          <span className="flex items-center space-x-1.5">
            <MapPin className="w-3.5 h-3.5 text-[#d4af37]" />
            <span>{RESTAURANT_INFO.address}</span>
          </span>
          <span className="flex items-center space-x-1.5">
            <Clock className="w-3.5 h-3.5 text-[#d4af37]" />
            <span>Open Daily • Halal Certified</span>
          </span>
        </div>
        <div className="flex items-center space-x-6">
          <button 
            onClick={onOpenConcierge}
            className="flex items-center space-x-1.5 text-[#735c00] hover:text-[#1c1b1b] transition-colors cursor-pointer font-semibold"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Ask Dastarkhan AI Concierge</span>
          </button>
          <span className="flex items-center space-x-1">
            <Phone className="w-3.5 h-3.5 text-[#d4af37]" />
            <span>{RESTAURANT_INFO.phone}</span>
          </span>
        </div>
      </div>

      {/* Main navigation bar matching screenshot */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <button
            onClick={() => handleNavClick('home')}
            className="flex items-center space-x-3 group focus:outline-none cursor-pointer shrink-0 mr-4 lg:mr-8"
          >
            <DastarkhanEmblem className="w-10 h-10 transition-transform duration-300 group-hover:scale-105" size={40} />
            <div className="flex flex-col items-start text-left">
              <span className="font-serif text-2xl sm:text-3xl tracking-[0.14em] uppercase text-[#1c1b1b] font-bold leading-none">
                DASTARKHAN
              </span>
              <span className="text-[10px] sm:text-[11px] font-sans tracking-[0.22em] text-[#735c00] uppercase mt-1 font-semibold whitespace-nowrap">
                Gowalabazar • Osmaninagar
              </span>
            </div>
          </button>

          {/* Desktop Navigation Links (HOME MENU EVENTS GALLERY CONTACT) */}
          <nav className="hidden lg:flex items-center space-x-6 xl:space-x-8">
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`relative py-2 text-xs tracking-[0.15em] uppercase font-bold transition-colors cursor-pointer whitespace-nowrap ${
                    isActive ? 'text-[#735c00]' : 'text-[#444748] hover:text-[#1c1b1b]'
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#d4af37]" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Action Buttons with ORDER ONLINE */}
          <div className="hidden lg:flex items-center space-x-3 shrink-0 ml-4 lg:ml-8">
            <button
              onClick={onOpenOrderModal}
              className="relative px-4 py-2.5 text-xs tracking-[0.12em] uppercase font-bold bg-[#fed65b] text-[#1c1b1b] hover:bg-[#d4af37] transition-all duration-200 cursor-pointer whitespace-nowrap flex items-center space-x-2 shadow-sm"
              title="Order food online for takeaway or home delivery"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>ORDER ONLINE</span>
              {cartCount > 0 && (
                <span className="w-5 h-5 rounded-full bg-[#1c1b1b] text-[#fed65b] text-[10px] font-bold flex items-center justify-center ml-0.5">
                  {cartCount}
                </span>
              )}
            </button>

            <button
              onClick={onOpenTableReservation}
              className="hidden xl:inline-flex px-4 py-2.5 text-xs tracking-[0.12em] uppercase font-bold border border-[#d4af37] text-[#1c1b1b] hover:bg-[#fed65b]/20 transition-all duration-200 cursor-pointer whitespace-nowrap"
            >
              RESERVE TABLE
            </button>
            <button
              onClick={onOpenBanquetInquiry}
              className="px-5 py-2.5 text-xs tracking-[0.15em] uppercase font-bold bg-[#1c1b1b] text-white hover:bg-[#d4af37] hover:text-[#1c1b1b] transition-all duration-200 cursor-pointer shadow-sm whitespace-nowrap"
            >
              BOOK EVENT
            </button>
          </div>

          {/* Mobile menu toggle & quick order bag */}
          <div className="flex lg:hidden items-center space-x-2">
            <button
              onClick={onOpenOrderModal}
              className="relative px-3 py-2 bg-[#fed65b] text-[#1c1b1b] font-bold text-xs uppercase tracking-wider flex items-center space-x-1.5 cursor-pointer shadow-sm"
            >
              <ShoppingBag className="w-4 h-4" />
              <span className="font-bold">ORDER</span>
              {cartCount > 0 && (
                <span className="w-4 h-4 rounded-full bg-[#1c1b1b] text-[#fed65b] text-[9px] font-bold flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>

            <button
              onClick={onOpenConcierge}
              className="p-2 text-[#735c00] hover:bg-[#ebe7e6] transition-colors"
              title="AI Concierge"
            >
              <Sparkles className="w-5 h-5" />
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-[#1c1b1b] hover:bg-[#ebe7e6] transition-colors"
              aria-label="Toggle Navigation"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#fdf8f8] border-t border-[#e5e2e1] px-6 py-6 space-y-4 animate-fadeIn">
          <div className="flex flex-col space-y-3">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`text-left py-2 text-sm tracking-[0.15em] uppercase font-bold border-b border-[#ebe7e6] ${
                  activeTab === item.id ? 'text-[#735c00]' : 'text-[#1c1b1b]'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="pt-4 flex flex-col space-y-3">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenOrderModal();
              }}
              className="w-full py-3.5 text-xs tracking-[0.15em] uppercase font-bold bg-[#fed65b] text-[#1c1b1b] hover:bg-[#d4af37] transition-all text-center flex items-center justify-center space-x-2 shadow-md"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>ORDER FOOD ONLINE ({cartCount} ITEMS)</span>
            </button>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenTableReservation();
              }}
              className="w-full py-3 text-xs tracking-[0.15em] uppercase font-bold border border-[#d4af37] text-[#1c1b1b] hover:bg-[#d4af37]/15 transition-all text-center"
            >
              Reserve a Table
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenBanquetInquiry();
              }}
              className="w-full py-3 text-xs tracking-[0.15em] uppercase font-bold bg-[#1c1b1b] text-white hover:bg-[#d4af37] hover:text-[#1c1b1b] transition-all text-center"
            >
              BOOK EVENT HALL
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenConcierge();
              }}
              className="w-full py-3 text-xs tracking-[0.15em] uppercase font-bold bg-[#f7f3f2] text-[#735c00] border border-[#d4af37]/40 flex items-center justify-center space-x-2"
            >
              <Sparkles className="w-4 h-4" />
              <span>Ask Dastarkhan AI Concierge</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

