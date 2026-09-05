import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { RestaurantMenuSection } from './components/RestaurantMenuSection';
import { BanquetHallSection } from './components/BanquetHallSection';
import { StorySection } from './components/StorySection';
import { Footer } from './components/Footer';
import { TableReservationModal } from './components/TableReservationModal';
import { BanquetInquiryModal } from './components/BanquetInquiryModal';
import { ConciergeModal } from './components/ConciergeModal';
import { OrderOnlineModal } from './components/OrderOnlineModal';
import { Sparkles, Utensils, Calendar, Users, ShoppingBag, ArrowRight } from 'lucide-react';
import { CartItem, MenuItem } from './types';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('home');

  // Cart & Online Ordering State
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);

  // Modal states
  const [isTableModalOpen, setIsTableModalOpen] = useState(false);
  const [isBanquetModalOpen, setIsBanquetModalOpen] = useState(false);
  const [banquetModalVenueId, setBanquetModalVenueId] = useState<string | undefined>(undefined);
  const [banquetModalTierId, setBanquetModalTierId] = useState<string | undefined>(undefined);
  const [banquetModalGuests, setBanquetModalGuests] = useState<number | undefined>(undefined);
  const [isConciergeModalOpen, setIsConciergeModalOpen] = useState(false);
  const [conciergePrompt, setConciergePrompt] = useState<string | undefined>(undefined);

  const totalCartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const cartSubtotal = cartItems.reduce((acc, item) => acc + item.dish.price * item.quantity, 0);

  const handleAddToCart = (dish: MenuItem, quantity: number = 1) => {
    setCartItems((prev) => {
      const existingIndex = prev.findIndex((item) => item.dish.id === dish.id);
      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += quantity;
        return updated;
      } else {
        return [...prev, { dish, quantity }];
      }
    });
  };

  const handleUpdateQuantity = (dishId: string, quantity: number) => {
    if (quantity <= 0) {
      handleRemoveFromCart(dishId);
      return;
    }
    setCartItems((prev) =>
      prev.map((item) =>
        item.dish.id === dishId ? { ...item, quantity } : item
      )
    );
  };

  const handleRemoveFromCart = (dishId: string) => {
    setCartItems((prev) => prev.filter((item) => item.dish.id !== dishId));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const handleOpenBanquetWithVenue = (venueId?: string, tierId?: string, guests?: number) => {
    setBanquetModalVenueId(venueId);
    setBanquetModalTierId(tierId);
    setBanquetModalGuests(guests);
    setIsBanquetModalOpen(true);
  };

  const handleAskConcierge = (prompt?: string) => {
    setConciergePrompt(prompt);
    setIsConciergeModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#141313] text-[#e5e2e1] flex flex-col selection:bg-[#fed65b] selection:text-[#1c1b1b]">
      {/* Top Navbar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenTableReservation={() => setIsTableModalOpen(true)}
        onOpenBanquetInquiry={() => handleOpenBanquetWithVenue()}
        onOpenConcierge={() => handleAskConcierge()}
        onOpenOrderModal={() => setIsOrderModalOpen(true)}
        cartCount={totalCartCount}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {activeTab === 'home' && (
          <>
            <HeroSection
              onExploreMenu={() => {
                setActiveTab('menu');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onExploreBanquet={() => {
                setActiveTab('banquet');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onOpenTableReservation={() => setIsTableModalOpen(true)}
              onOpenConcierge={() => handleAskConcierge()}
            />
            <RestaurantMenuSection
              onOpenTableReservation={() => setIsTableModalOpen(true)}
              onAskConciergeWithPrompt={(p) => handleAskConcierge(p)}
              onAddToCart={handleAddToCart}
              onOpenOrderModal={() => setIsOrderModalOpen(true)}
              cartItems={cartItems}
            />
            <BanquetHallSection
              onOpenBanquetInquiryWithVenue={handleOpenBanquetWithVenue}
              onAskConciergeWithPrompt={(p) => handleAskConcierge(p)}
            />
            <StorySection
              onOpenTableReservation={() => setIsTableModalOpen(true)}
              onOpenBanquetInquiry={() => handleOpenBanquetWithVenue()}
            />
          </>
        )}

        {activeTab === 'menu' && (
          <div className="animate-fadeIn">
            <RestaurantMenuSection
              onOpenTableReservation={() => setIsTableModalOpen(true)}
              onAskConciergeWithPrompt={(p) => handleAskConcierge(p)}
              onAddToCart={handleAddToCart}
              onOpenOrderModal={() => setIsOrderModalOpen(true)}
              cartItems={cartItems}
            />
          </div>
        )}

        {activeTab === 'banquet' && (
          <div className="animate-fadeIn">
            <BanquetHallSection
              onOpenBanquetInquiryWithVenue={handleOpenBanquetWithVenue}
              onAskConciergeWithPrompt={(p) => handleAskConcierge(p)}
            />
          </div>
        )}

        {activeTab === 'story' && (
          <div className="animate-fadeIn">
            <StorySection
              onOpenTableReservation={() => setIsTableModalOpen(true)}
              onOpenBanquetInquiry={() => handleOpenBanquetWithVenue()}
            />
          </div>
        )}
      </main>

      {/* Footer */}
      <Footer
        setActiveTab={setActiveTab}
        onOpenTableReservation={() => setIsTableModalOpen(true)}
        onOpenBanquetInquiry={() => handleOpenBanquetWithVenue()}
        onOpenConcierge={() => handleAskConcierge()}
      />

      {/* Floating Action Elements */}
      <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end space-y-3">
        {/* Floating Cart Notification Pill when items exist */}
        {totalCartCount > 0 && (
          <button
            onClick={() => setIsOrderModalOpen(true)}
            className="bg-[#fed65b] text-[#1c1b1b] hover:bg-[#d4af37] shadow-2xl px-5 py-3 flex items-center space-x-3 font-bold text-xs uppercase tracking-wider transition-all duration-300 hover:scale-105 cursor-pointer border border-white/20 animate-bounce"
            title="View Current Order Bag"
          >
            <div className="flex items-center space-x-2">
              <ShoppingBag className="w-4 h-4" />
              <span>{totalCartCount} {totalCartCount === 1 ? 'Dish' : 'Dishes'}</span>
            </div>
            <span className="h-4 w-[1px] bg-[#1c1b1b]/30"></span>
            <span className="font-serif text-sm">৳{cartSubtotal}</span>
            <span className="underline decoration-[#1c1b1b] ml-1">CHECKOUT →</span>
          </button>
        )}

        {/* Floating AI Concierge Button */}
        <button
          onClick={() => handleAskConcierge()}
          className="bg-[#1c1b1b] text-white hover:bg-[#fed65b] hover:text-[#1c1b1b] shadow-2xl rounded-none px-5 py-3.5 flex items-center space-x-2.5 font-bold text-xs tracking-widest uppercase transition-all duration-300 hover:scale-105 cursor-pointer border border-[#d4af37] group"
          title="Ask Dastarkhan AI Concierge — Dining & Banquet Assistant"
        >
          <Sparkles className="w-4 h-4 text-[#fed65b] group-hover:text-[#1c1b1b] group-hover:rotate-12 transition-transform" />
          <span className="hidden sm:inline">Ask AI Concierge</span>
        </button>
      </div>

      {/* Modals */}
      <OrderOnlineModal
        isOpen={isOrderModalOpen}
        onClose={() => setIsOrderModalOpen(false)}
        cartItems={cartItems}
        onAddToCart={handleAddToCart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveFromCart={handleRemoveFromCart}
        onClearCart={handleClearCart}
        onExploreMenu={() => {
          setActiveTab('menu');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />

      <TableReservationModal
        isOpen={isTableModalOpen}
        onClose={() => setIsTableModalOpen(false)}
        onAskConciergeWithPrompt={(p) => handleAskConcierge(p)}
      />

      <BanquetInquiryModal
        isOpen={isBanquetModalOpen}
        onClose={() => setIsBanquetModalOpen(false)}
        initialVenueId={banquetModalVenueId}
        initialTierId={banquetModalTierId}
        initialGuestCount={banquetModalGuests}
        onAskConciergeWithPrompt={(p) => handleAskConcierge(p)}
      />

      <ConciergeModal
        isOpen={isConciergeModalOpen}
        onClose={() => {
          setIsConciergeModalOpen(false);
          setConciergePrompt(undefined);
        }}
        initialPrompt={conciergePrompt}
        onOpenTableReservation={() => setIsTableModalOpen(true)}
        onOpenBanquetInquiry={() => handleOpenBanquetWithVenue()}
      />
    </div>
  );
}

