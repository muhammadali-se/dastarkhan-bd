import React, { useState } from 'react';
import { TableReservation } from '../types';
import { X, Calendar, Clock, Users, MapPin, CheckCircle2, Sparkles, Utensils } from 'lucide-react';

interface TableReservationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAskConciergeWithPrompt: (prompt: string) => void;
}

export const TableReservationModal: React.FC<TableReservationModalProps> = ({
  isOpen,
  onClose,
  onAskConciergeWithPrompt
}) => {
  const [step, setStep] = useState<'form' | 'success'>('form');
  const [formData, setFormData] = useState<TableReservation>({
    date: new Date(Date.now() + 86400000 * 2).toISOString().split('T')[0],
    time: '19:30',
    guests: 4,
    seatingArea: 'Main Dining Hall',
    name: '',
    email: '',
    phone: '',
    specialRequests: ''
  });

  if (!isOpen) return null;

  const seatingAreas: { id: TableReservation['seatingArea']; title: string; desc: string }[] = [
    {
      id: 'Main Dining Hall',
      title: 'The Shahi Dining Hall',
      desc: 'Spacious geometric tables, brass chandeliers, and authentic Mughlai heritage ambiance.'
    },
    {
      id: 'Family Majlis & Booths',
      title: 'Family Majlis & Private Booths',
      desc: 'Intimate cushioned seating designed for family gatherings and traditional Sylheti dining.'
    },
    {
      id: 'VIP Royal Chamber',
      title: 'The VIP Royal Chamber',
      desc: 'Exclusive private dining lounge with dedicated service and customized Mughlai platters.'
    }
  ];

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
        className="bg-[#1c1b1b] border border-[#d4af37] max-w-2xl w-full overflow-hidden shadow-2xl animate-fadeIn my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 border-b border-[#444748] flex items-center justify-between bg-[#141313]">
          <div>
            <span className="text-xs uppercase tracking-[0.25em] text-[#fed65b] font-bold">
              Dastarkhan Restaurant • Osmaninagar, Sylhet
            </span>
            <h3 className="font-serif text-2xl text-white font-bold">Table Reservation</h3>
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
            <h4 className="font-serif text-3xl text-white font-bold mb-2">Reservation Confirmed</h4>
            <p className="text-sm text-[#e5e2e1] max-w-md mx-auto mb-6 leading-relaxed">
              We look forward to welcoming you, <strong className="text-white">{formData.name}</strong>. A confirmation SMS and reservation reminder have been sent to <span className="text-[#fed65b]">{formData.email}</span>.
            </p>

            <div className="bg-[#141313] border border-[#444748] p-6 max-w-md mx-auto text-left mb-8 space-y-3">
              <div className="flex justify-between text-xs">
                <span className="text-[#c8c6c5] uppercase font-bold">Date & Time:</span>
                <span className="text-white font-medium">{formData.date} at {formData.time}</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-[#c8c6c5] uppercase font-bold">Guests:</span>
                <span className="text-white font-medium">{formData.guests} Guests</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-[#c8c6c5] uppercase font-bold">Seating Area:</span>
                <span className="text-[#fed65b] font-bold">{formData.seatingArea}</span>
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
                  const prompt = `I just reserved a table in ${formData.seatingArea} for ${formData.guests} guests on ${formData.date}. What signature Mughlai dishes and traditional desserts do you recommend?`;
                  resetAndClose();
                  onAskConciergeWithPrompt(prompt);
                }}
                className="px-6 py-3.5 border border-[#d4af37] text-[#fed65b] text-xs uppercase tracking-widest hover:bg-[#d4af37]/15 flex items-center justify-center space-x-2 cursor-pointer font-bold"
              >
                <Sparkles className="w-4 h-4" />
                <span>Ask AI Concierge For Recommendations</span>
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-6">
            {/* Seating Area Choice */}
            <div>
              <label className="block text-xs uppercase tracking-widest text-[#c8c6c5] font-bold mb-3">
                1. Select Desired Dining Atmosphere
              </label>
              <div className="grid grid-cols-1 gap-3">
                {seatingAreas.map((area) => {
                  const isSelected = formData.seatingArea === area.id;
                  return (
                    <div
                      key={area.id}
                      onClick={() => setFormData({ ...formData, seatingArea: area.id })}
                      className={`p-4 border transition-all cursor-pointer flex items-start justify-between ${
                        isSelected
                          ? 'bg-[#fed65b]/15 border-[#fed65b]'
                          : 'bg-[#141313] border-[#444748] hover:border-[#fed65b]/50'
                      }`}
                    >
                      <div>
                        <p className="font-serif text-lg text-white font-bold">{area.title}</p>
                        <p className="text-xs text-[#c8c6c5] mt-0.5">{area.desc}</p>
                      </div>
                      <div className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 mt-1 ${
                        isSelected ? 'border-[#fed65b] bg-[#fed65b]' : 'border-[#444748]'
                      }`}>
                        {isSelected && <div className="w-2 h-2 rounded-full bg-[#141313]" />}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Date, Time, Guests */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs uppercase tracking-wider text-[#c8c6c5] font-bold mb-2">
                  Date
                </label>
                <input
                  type="date"
                  required
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  className="w-full bg-[#141313] border border-[#444748] px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-[#fed65b]"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-[#c8c6c5] font-bold mb-2">
                  Time
                </label>
                <select
                  value={formData.time}
                  onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                  className="w-full bg-[#141313] border border-[#444748] px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-[#fed65b]"
                >
                  <option value="12:30">12:30 PM (Lunch Service)</option>
                  <option value="13:30">1:30 PM (Lunch Service)</option>
                  <option value="18:30">6:30 PM (Evening Service)</option>
                  <option value="19:30">7:30 PM (Prime Dinner)</option>
                  <option value="20:30">8:30 PM (Late Dinner)</option>
                  <option value="21:30">9:30 PM</option>
                </select>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-[#c8c6c5] font-bold mb-2">
                  Guests
                </label>
                <select
                  value={formData.guests}
                  onChange={(e) => setFormData({ ...formData, guests: Number(e.target.value) })}
                  className="w-full bg-[#141313] border border-[#444748] px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-[#fed65b]"
                >
                  {[1, 2, 3, 4, 5, 6, 7, 8, 10, 12, 15, 20].map((num) => (
                    <option key={num} value={num}>
                      {num} {num === 1 ? 'Guest' : 'Guests'}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Guest Contact Details */}
            <div className="space-y-4 pt-2 border-t border-[#444748]">
              <p className="text-xs uppercase tracking-widest text-[#c8c6c5] font-bold">
                2. Guest Information
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#a8a6a5] font-bold mb-1.5">
                    Full Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Mr. / Ms. / Family Name..."
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
                    placeholder="name@example.com"
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
                    Special Occasion or Dietary Notes
                  </label>
                  <input
                    type="text"
                    placeholder="Family reunion, anniversary, quiet corner..."
                    value={formData.specialRequests}
                    onChange={(e) => setFormData({ ...formData, specialRequests: e.target.value })}
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
                Confirm Table Reservation
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

