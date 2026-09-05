import React, { useState, useEffect } from 'react';
import { BanquetInquiry } from '../types';
import { VENUE_SPACES, BANQUET_TIERS } from '../data';
import { X, Calendar, Users, Sparkles, CheckCircle2, Award, ShieldCheck } from 'lucide-react';

interface BanquetInquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialVenueId?: string;
  initialTierId?: string;
  initialGuestCount?: number;
  onAskConciergeWithPrompt: (prompt: string) => void;
}

export const BanquetInquiryModal: React.FC<BanquetInquiryModalProps> = ({
  isOpen,
  onClose,
  initialVenueId,
  initialTierId,
  initialGuestCount,
  onAskConciergeWithPrompt
}) => {
  const [step, setStep] = useState<'form' | 'success'>('form');
  const [formData, setFormData] = useState<BanquetInquiry>({
    eventType: 'Wedding & Walima',
    venueId: initialVenueId || 'royal-ballroom',
    estimatedGuests: initialGuestCount || 250,
    preferredDate: new Date(Date.now() + 86400000 * 90).toISOString().split('T')[0],
    tierId: initialTierId || 'package-b',
    name: '',
    email: '',
    phone: '',
    additionalNotes: ''
  });

  useEffect(() => {
    if (initialVenueId) setFormData(prev => ({ ...prev, venueId: initialVenueId }));
    if (initialTierId) setFormData(prev => ({ ...prev, tierId: initialTierId }));
    if (initialGuestCount) setFormData(prev => ({ ...prev, estimatedGuests: initialGuestCount }));
  }, [initialVenueId, initialTierId, initialGuestCount]);

  if (!isOpen) return null;

  const selectedVenue = VENUE_SPACES.find(v => v.id === formData.venueId) || VENUE_SPACES[0];
  const selectedTier = BANQUET_TIERS.find(t => t.id === formData.tierId) || BANQUET_TIERS[1];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('success');
  };

  const resetAndClose = () => {
    setStep('form');
    onClose();
  };

  return (
    <div 
      className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto"
      onClick={resetAndClose}
    >
      <div 
        className="bg-[#1c1b1b] border border-[#d4af37] max-w-3xl w-full overflow-hidden shadow-2xl animate-fadeIn my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 border-b border-[#444748] flex items-center justify-between bg-[#141313]">
          <div>
            <span className="text-xs uppercase tracking-[0.25em] text-[#fed65b] font-bold">
              Dastarkhan Banquet Hall • Osmaninagar, Sylhet
            </span>
            <h3 className="font-serif text-2xl text-white font-bold">Private Event & Banquet Inquiry</h3>
          </div>
          <button
            onClick={resetAndClose}
            className="p-2 bg-[#2a2625] text-[#e5e2e1] hover:text-white transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {step === 'success' ? (
          <div className="p-8 sm:p-12 text-center">
            <div className="w-16 h-16 rounded-full bg-[#fed65b]/20 border border-[#fed65b] flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="w-8 h-8 text-[#fed65b]" />
            </div>
            <h4 className="font-serif text-3xl text-white font-bold mb-2">Inquiry Received</h4>
            <p className="text-sm text-[#e5e2e1] max-w-lg mx-auto mb-6 leading-relaxed">
              Thank you, <strong className="text-white">{formData.name}</strong>. Our Dastarkhan Event Supervisor will contact you within 24 hours with an official tasting invitation and floor plan proposal for <strong className="text-[#fed65b]">{selectedVenue.name}</strong>.
            </p>

            <div className="bg-[#141313] border border-[#444748] p-6 max-w-md mx-auto text-left mb-8 space-y-3">
              <div className="flex justify-between text-xs">
                <span className="text-[#c8c6c5] uppercase">Selected Venue:</span>
                <span className="text-white font-medium">{selectedVenue.name}</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-[#c8c6c5] uppercase">Culinary Tier:</span>
                <span className="text-white font-medium">{selectedTier.name} (৳{selectedTier.pricePerGuest.toLocaleString()}/guest)</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-[#c8c6c5] uppercase">Event Type & Guests:</span>
                <span className="text-[#fed65b] font-medium">{formData.eventType} ({formData.estimatedGuests} Guests)</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row justify-center gap-3">
              <button
                onClick={resetAndClose}
                className="px-8 py-3.5 bg-[#fed65b] text-[#1c1b1b] text-xs uppercase tracking-widest font-bold hover:bg-[#d4af37] cursor-pointer"
              >
                Return to Website
              </button>
              <button
                onClick={() => {
                  const prompt = `Can you provide sample menu ideas and biryani pairings for a ${formData.eventType} of ${formData.estimatedGuests} guests in ${selectedVenue.name} with the ${selectedTier.name}?`;
                  resetAndClose();
                  onAskConciergeWithPrompt(prompt);
                }}
                className="px-6 py-3.5 border border-[#d4af37] text-[#fed65b] text-xs uppercase tracking-widest hover:bg-[#d4af37]/15 flex items-center justify-center space-x-2 cursor-pointer font-bold"
              >
                <Sparkles className="w-4 h-4" />
                <span>Ask AI Concierge About Custom Menus</span>
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-6">
            {/* Venue and Tier selection */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs uppercase tracking-widest text-[#c8c6c5] font-bold mb-2">
                  Select Banquet Venue
                </label>
                <select
                  value={formData.venueId}
                  onChange={(e) => setFormData({ ...formData, venueId: e.target.value })}
                  className="w-full bg-[#141313] border border-[#444748] px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-[#fed65b]"
                >
                  {VENUE_SPACES.map((venue) => (
                    <option key={venue.id} value={venue.id}>
                      {venue.name} (Up to {venue.capacitySeated} Seated)
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-widest text-[#c8c6c5] font-bold mb-2">
                  Select All-Inclusive Culinary Tier
                </label>
                <select
                  value={formData.tierId}
                  onChange={(e) => setFormData({ ...formData, tierId: e.target.value })}
                  className="w-full bg-[#141313] border border-[#444748] px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-[#fed65b]"
                >
                  {BANQUET_TIERS.map((tier) => (
                    <option key={tier.id} value={tier.id}>
                      {tier.name} — ৳{tier.pricePerGuest.toLocaleString()} / Guest
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Event Type, Date, Estimated Guests */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs uppercase tracking-wider text-[#c8c6c5] font-bold mb-2">
                  Event Format
                </label>
                <select
                  value={formData.eventType}
                  onChange={(e) => setFormData({ ...formData, eventType: e.target.value as any })}
                  className="w-full bg-[#141313] border border-[#444748] px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-[#fed65b]"
                >
                  <option value="Wedding & Walima">Wedding & Walima Reception</option>
                  <option value="Holud & Mehendi">Holud & Mehendi Night</option>
                  <option value="Corporate Summit">Corporate Summit & Dinner</option>
                  <option value="Family Milestone">Family Milestone Celebration</option>
                  <option value="Other">Other Custom Celebration</option>
                </select>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-[#c8c6c5] font-bold mb-2">
                  Preferred Event Date
                </label>
                <input
                  type="date"
                  required
                  value={formData.preferredDate}
                  onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                  className="w-full bg-[#141313] border border-[#444748] px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-[#fed65b]"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-[#c8c6c5] font-bold mb-2">
                  Estimated Guests
                </label>
                <input
                  type="number"
                  min="20"
                  max="1000"
                  value={formData.estimatedGuests}
                  onChange={(e) => setFormData({ ...formData, estimatedGuests: Number(e.target.value) })}
                  className="w-full bg-[#141313] border border-[#444748] px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-[#fed65b]"
                />
              </div>
            </div>

            {/* Inclusions preview card */}
            <div className="bg-[#141313] border border-[#444748] p-4 text-xs">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[#fed65b] font-bold uppercase tracking-wider">
                  {selectedTier.name} Preview:
                </span>
                <span className="text-[#e5e2e1]">
                  Estimated: ৳{(selectedTier.pricePerGuest * formData.estimatedGuests).toLocaleString()}
                </span>
              </div>
              <div className="text-[#c8c6c5] line-clamp-2">
                {selectedTier.inclusions.join(' • ')}
              </div>
            </div>

            {/* Host Contact Information */}
            <div className="space-y-4 pt-2 border-t border-[#444748]">
              <p className="text-xs uppercase tracking-widest text-[#c8c6c5] font-bold">
                Host / Event Coordinator Contact
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#a8a6a5] font-bold mb-1.5">
                    Full Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Host or Coordinator Name..."
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-[#141313] border border-[#444748] px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-[#fed65b]"
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#a8a6a5] font-bold mb-1.5">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="coordinator@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-[#141313] border border-[#444748] px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-[#fed65b]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#a8a6a5] font-bold mb-1.5">
                    Telephone Number (Bangladesh / Intl)
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+880 1700 000000"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full bg-[#141313] border border-[#444748] px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-[#fed65b]"
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#a8a6a5] font-bold mb-1.5">
                    Additional Notes or Special Requests
                  </label>
                  <input
                    type="text"
                    placeholder="Stage decor, floral canopy, VIP lounge needs..."
                    value={formData.additionalNotes}
                    onChange={(e) => setFormData({ ...formData, additionalNotes: e.target.value })}
                    className="w-full bg-[#141313] border border-[#444748] px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-[#fed65b]"
                  />
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-4 border-t border-[#444748] flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-between gap-3">
              <button
                type="button"
                onClick={resetAndClose}
                className="px-6 py-3 text-xs uppercase tracking-widest text-[#a8a6a5] hover:text-white transition-colors cursor-pointer font-bold text-center"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-8 py-3.5 bg-[#fed65b] text-[#1c1b1b] text-xs uppercase tracking-[0.2em] font-bold hover:bg-[#d4af37] transition-all cursor-pointer shadow-lg text-center"
              >
                Submit Banquet Inquiry
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

