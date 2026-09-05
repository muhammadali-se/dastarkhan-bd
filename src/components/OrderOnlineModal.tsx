import React, { useState } from 'react';
import { 
  X, 
  ShoppingBag, 
  Plus, 
  Minus, 
  Trash2, 
  ArrowRight, 
  Bike, 
  ShoppingBag as BagIcon, 
  Utensils, 
  Phone, 
  MapPin, 
  Clock, 
  CheckCircle2, 
  Sparkles,
  MessageSquare,
  AlertCircle
} from 'lucide-react';
import { CartItem, MenuItem } from '../types';
import { MENU_ITEMS } from '../data';

interface OrderOnlineModalProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onAddToCart: (item: MenuItem, quantity?: number) => void;
  onUpdateQuantity: (itemId: string, quantity: number) => void;
  onRemoveFromCart: (itemId: string) => void;
  onClearCart: () => void;
  onExploreMenu: () => void;
}

export const OrderOnlineModal: React.FC<OrderOnlineModalProps> = ({
  isOpen,
  onClose,
  cartItems,
  onAddToCart,
  onUpdateQuantity,
  onRemoveFromCart,
  onClearCart,
  onExploreMenu,
}) => {
  const [orderType, setOrderType] = useState<'delivery' | 'takeaway' | 'dine_in'>('delivery');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [pickupTime, setPickupTime] = useState('Within 30-40 mins');
  const [paymentMethod, setPaymentMethod] = useState<'cash_on_delivery' | 'bkash_nagad' | 'card_counter'>('cash_on_delivery');
  const [orderNotes, setOrderNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderConfirmedId, setOrderConfirmedId] = useState<string | null>(null);

  if (!isOpen) return null;

  // Calculate pricing
  const subtotal = cartItems.reduce((acc, item) => acc + (item.dish.price * item.quantity), 0);
  const deliveryFee = orderType === 'delivery' ? (subtotal >= 1500 ? 0 : 60) : 0;
  const grandTotal = subtotal + deliveryFee;

  // Recommended quick add-ons (not already in cart)
  const popularAddons = MENU_ITEMS.filter(
    (item) => !cartItems.some((c) => c.dish.id === item.id) && 
    (item.category === 'beverages' || item.category === 'desserts' || item.category === 'starters')
  ).slice(0, 3);

  const handleConfirmOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone || (orderType === 'delivery' && !address)) {
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      const generatedId = `DK-${Math.floor(100000 + Math.random() * 900000)}`;
      setOrderConfirmedId(generatedId);
      setIsSubmitting(false);
    }, 800);
  };

  const handleWhatsAppOrder = () => {
    if (!name || !phone) {
      alert('Please provide your name and contact phone number to generate your WhatsApp order message.');
      return;
    }

    const itemsSummary = cartItems
      .map((item, idx) => `${idx + 1}. ${item.dish.name} x ${item.quantity} = ৳${item.dish.price * item.quantity}`)
      .join('\n');

    const message = `*🍽️ DASTARKHAN FOOD ORDER*\n` +
      `---------------------------------\n` +
      `*Order Type:* ${orderType.toUpperCase()}\n` +
      `*Customer:* ${name}\n` +
      `*Phone:* ${phone}\n` +
      (orderType === 'delivery' ? `*Delivery Address:* ${address}\n` : `*Timing:* ${pickupTime}\n`) +
      `*Payment:* ${paymentMethod.replace('_', ' ').toUpperCase()}\n` +
      (orderNotes ? `*Special Notes:* ${orderNotes}\n` : '') +
      `---------------------------------\n` +
      `*ITEMS ORDERED:*\n${itemsSummary}\n` +
      `---------------------------------\n` +
      `*Subtotal:* ৳${subtotal}\n` +
      (orderType === 'delivery' ? `*Delivery Fee:* ৳${deliveryFee}\n` : '') +
      `*TOTAL AMOUNT:* ৳${grandTotal}\n` +
      `---------------------------------\n` +
      `Please confirm my order. Thank you!`;

    const whatsappUrl = `https://wa.me/8801711234567?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleResetAndClose = () => {
    setOrderConfirmedId(null);
    onClearCart();
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="bg-[#1c1b1b] border border-[#d4af37] max-w-2xl w-full max-h-[92vh] flex flex-col overflow-hidden shadow-2xl animate-fadeIn my-auto text-white"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="p-4 sm:p-5 border-b border-[#444748] flex items-center justify-between bg-[#141313] shrink-0">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-[#fed65b] text-[#1c1b1b] flex items-center justify-center font-bold">
              <ShoppingBag className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h3 className="font-serif text-lg sm:text-xl text-white font-bold">
                  Dastarkhan Online Ordering
                </h3>
                <span className="px-2 py-0.5 bg-[#fed65b]/20 text-[#fed65b] text-[10px] uppercase tracking-widest border border-[#d4af37] font-bold">
                  {cartItems.reduce((sum, item) => sum + item.quantity, 0)} Items
                </span>
              </div>
              <p className="text-xs text-[#c8c6c5]">
                Freshly prepared Mughlai & Sylheti delicacies in Gowalabazar, Osmaninagar
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 bg-[#2a2625] text-[#e5e2e1] hover:text-white hover:bg-[#444748] transition-colors cursor-pointer"
            aria-label="Close Order Modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Confirmation Screen */}
        {orderConfirmedId ? (
          <div className="p-6 sm:p-10 overflow-y-auto text-center space-y-6 flex-1 bg-[#1c1b1b]">
            <div className="w-16 h-16 bg-[#fed65b]/20 border-2 border-[#fed65b] text-[#fed65b] flex items-center justify-center mx-auto shadow-lg">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div>
              <span className="text-xs uppercase tracking-[0.2em] text-[#fed65b] font-bold">
                ORDER RECEIVED & TRANSMITTED TO KITCHEN
              </span>
              <h4 className="font-serif text-2xl sm:text-3xl font-bold text-white mt-1">
                Thank You, {name}!
              </h4>
              <p className="text-sm text-[#c8c6c5] mt-2 max-w-md mx-auto">
                Your order is currently being prepared with freshly roasted spices by our master chefs.
              </p>
            </div>

            <div className="bg-[#242222] border border-[#444748] p-5 text-left max-w-md mx-auto space-y-3">
              <div className="flex justify-between items-center border-b border-[#444748] pb-2 text-xs">
                <span className="text-[#a8a6a5] uppercase tracking-wider">Order Reference</span>
                <span className="font-bold text-[#fed65b] text-sm">{orderConfirmedId}</span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-[#a8a6a5]">Order Type:</span>
                <span className="font-bold uppercase text-white">{orderType}</span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-[#a8a6a5]">Estimated Time:</span>
                <span className="font-bold text-[#fed65b]">
                  {orderType === 'delivery' ? '35 - 45 Minutes' : '20 - 25 Minutes'}
                </span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-[#a8a6a5]">Phone Contact:</span>
                <span className="font-bold text-white">{phone}</span>
              </div>
              {orderType === 'delivery' && (
                <div className="flex justify-between items-start text-xs pt-1 border-t border-[#444748]/60">
                  <span className="text-[#a8a6a5]">Delivery Address:</span>
                  <span className="font-bold text-white text-right max-w-[200px]">{address}</span>
                </div>
              )}
              <div className="flex justify-between items-center pt-2 border-t border-[#444748] text-sm">
                <span className="font-bold text-white">Total Amount:</span>
                <span className="font-serif font-bold text-[#fed65b] text-base">৳{grandTotal}</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 justify-center max-w-md mx-auto">
              <button
                onClick={handleWhatsAppOrder}
                className="flex-1 py-3 px-4 bg-[#25D366] text-white text-xs uppercase tracking-wider font-bold hover:bg-[#20bd5a] transition-all flex items-center justify-center space-x-2 cursor-pointer shadow-md"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Track on WhatsApp</span>
              </button>
              <button
                onClick={handleResetAndClose}
                className="flex-1 py-3 px-4 bg-[#fed65b] text-[#1c1b1b] text-xs uppercase tracking-wider font-bold hover:bg-[#d4af37] transition-all cursor-pointer shadow-md"
              >
                Done / New Order
              </button>
            </div>

            <p className="text-xs text-[#a8a6a5]">
              Need immediate assistance? Call our direct kitchen hotline at{' '}
              <a href="tel:+8801711234567" className="text-[#fed65b] underline font-bold">
                +880 1711-234567
              </a>
            </p>
          </div>
        ) : cartItems.length === 0 ? (
          /* Empty Cart State */
          <div className="p-8 sm:p-12 text-center space-y-6 flex-1 flex flex-col items-center justify-center">
            <div className="w-16 h-16 bg-[#242222] border border-[#444748] text-[#d4af37] flex items-center justify-center">
              <ShoppingBag className="w-8 h-8 opacity-70" />
            </div>
            <div>
              <h4 className="font-serif text-2xl font-bold text-white mb-2">
                Your Order Bag is Empty
              </h4>
              <p className="text-xs sm:text-sm text-[#c8c6c5] max-w-sm mx-auto leading-relaxed">
                Explore our authentic Sylheti Chuijhal Beef, Bamboo Kacchi Biriyani, and Royal Kebabs to build your meal.
              </p>
            </div>
            <button
              onClick={() => {
                onClose();
                onExploreMenu();
              }}
              className="px-8 py-3.5 bg-[#fed65b] text-[#1c1b1b] text-xs uppercase tracking-[0.2em] font-bold hover:bg-[#d4af37] transition-all cursor-pointer shadow-lg flex items-center space-x-2"
            >
              <span>Explore Restaurant Menu</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        ) : (
          /* Active Cart & Checkout Form */
          <form onSubmit={handleConfirmOrder} className="flex-1 flex flex-col overflow-hidden">
            {/* Order Type Toggle Tabs */}
            <div className="grid grid-cols-3 bg-[#141313] border-b border-[#444748] p-1.5 gap-1 shrink-0">
              <button
                type="button"
                onClick={() => setOrderType('delivery')}
                className={`py-2.5 px-3 text-xs uppercase tracking-wider font-bold transition-all flex items-center justify-center space-x-1.5 cursor-pointer ${
                  orderType === 'delivery'
                    ? 'bg-[#fed65b] text-[#1c1b1b] shadow-md'
                    : 'text-[#c8c6c5] hover:text-white hover:bg-[#242222]'
                }`}
              >
                <Bike className="w-3.5 h-3.5 shrink-0" />
                <span className="truncate">Home Delivery</span>
              </button>
              <button
                type="button"
                onClick={() => setOrderType('takeaway')}
                className={`py-2.5 px-3 text-xs uppercase tracking-wider font-bold transition-all flex items-center justify-center space-x-1.5 cursor-pointer ${
                  orderType === 'takeaway'
                    ? 'bg-[#fed65b] text-[#1c1b1b] shadow-md'
                    : 'text-[#c8c6c5] hover:text-white hover:bg-[#242222]'
                }`}
              >
                <BagIcon className="w-3.5 h-3.5 shrink-0" />
                <span className="truncate">Takeaway</span>
              </button>
              <button
                type="button"
                onClick={() => setOrderType('dine_in')}
                className={`py-2.5 px-3 text-xs uppercase tracking-wider font-bold transition-all flex items-center justify-center space-x-1.5 cursor-pointer ${
                  orderType === 'dine_in'
                    ? 'bg-[#fed65b] text-[#1c1b1b] shadow-md'
                    : 'text-[#c8c6c5] hover:text-white hover:bg-[#242222]'
                }`}
              >
                <Utensils className="w-3.5 h-3.5 shrink-0" />
                <span className="truncate">Dine-In Advance</span>
              </button>
            </div>

            {/* Scrollable Content: Items & Contact */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6 bg-[#1c1b1b]">
              {/* Selected Dishes List */}
              <div className="space-y-3">
                <div className="flex justify-between items-center pb-2 border-b border-[#444748]">
                  <span className="text-xs uppercase tracking-widest text-[#fed65b] font-bold">
                    Order Items ({cartItems.reduce((acc, c) => acc + c.quantity, 0)})
                  </span>
                  <button
                    type="button"
                    onClick={onClearCart}
                    className="text-[11px] text-[#a8a6a5] hover:text-red-400 uppercase tracking-wider font-medium flex items-center space-x-1 cursor-pointer"
                  >
                    <Trash2 className="w-3 h-3" />
                    <span>Clear All</span>
                  </button>
                </div>

                {cartItems.map((item) => (
                  <div
                    key={item.dish.id}
                    className="bg-[#242222] border border-[#444748] p-3 sm:p-4 flex items-center justify-between gap-3"
                  >
                    <div className="flex items-center space-x-3 min-w-0">
                      <img
                        src={item.dish.imageUrl}
                        alt={item.dish.name}
                        className="w-14 h-14 object-cover border border-[#444748] shrink-0"
                      />
                      <div className="min-w-0">
                        <h5 className="font-serif text-sm sm:text-base font-bold text-white truncate">
                          {item.dish.name}
                        </h5>
                        <p className="text-xs text-[#fed65b] font-serif font-semibold">
                          ৳{item.dish.price} each
                        </p>
                      </div>
                    </div>

                    {/* Quantity Stepper & Total */}
                    <div className="flex items-center space-x-3 shrink-0">
                      <div className="flex items-center border border-[#444748] bg-[#1c1b1b]">
                        <button
                          type="button"
                          onClick={() => onUpdateQuantity(item.dish.id, item.quantity - 1)}
                          className="w-7 h-7 flex items-center justify-center text-white hover:bg-[#fed65b] hover:text-[#1c1b1b] transition-colors cursor-pointer"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-8 text-center text-xs font-bold text-white">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => onUpdateQuantity(item.dish.id, item.quantity + 1)}
                          className="w-7 h-7 flex items-center justify-center text-white hover:bg-[#fed65b] hover:text-[#1c1b1b] transition-colors cursor-pointer"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <span className="font-serif font-bold text-white text-sm w-16 text-right">
                        ৳{item.dish.price * item.quantity}
                      </span>

                      <button
                        type="button"
                        onClick={() => onRemoveFromCart(item.dish.id)}
                        className="p-1.5 text-[#a8a6a5] hover:text-red-400 transition-colors cursor-pointer"
                        title="Remove Item"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Popular Add-ons recommendations */}
              {popularAddons.length > 0 && (
                <div className="bg-[#242222]/70 border border-[#444748] p-3.5 space-y-2.5">
                  <div className="flex items-center space-x-1.5 text-xs text-[#fed65b] font-bold uppercase tracking-wider">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Recommended Extras & Beverages</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    {popularAddons.map((addon) => (
                      <div
                        key={addon.id}
                        className="bg-[#1c1b1b] border border-[#444748] p-2.5 flex items-center justify-between gap-2"
                      >
                        <div className="min-w-0">
                          <p className="text-xs font-bold text-white truncate">{addon.name}</p>
                          <p className="text-[11px] text-[#fed65b]">৳{addon.price}</p>
                        </div>
                        <button
                          type="button"
                          onClick={() => onAddToCart(addon, 1)}
                          className="px-2 py-1 bg-[#fed65b] text-[#1c1b1b] text-[10px] font-bold uppercase tracking-wider hover:bg-[#d4af37] transition-colors shrink-0 cursor-pointer"
                        >
                          + Add
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Customer Delivery / Pickup Details Form */}
              <div className="space-y-4 pt-2 border-t border-[#444748]">
                <span className="text-xs uppercase tracking-widest text-[#fed65b] font-bold block">
                  {orderType === 'delivery'
                    ? 'Delivery Information (Osmaninagar / Gowalabazar)'
                    : orderType === 'takeaway'
                    ? 'Takeaway Contact & Pickup Time'
                    : 'Dine-In Guest Details'}
                </span>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-[#c8c6c5] mb-1 font-medium">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Tanvir Ahmed"
                      className="w-full bg-[#242222] border border-[#444748] px-3.5 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-[#fed65b]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider text-[#c8c6c5] mb-1 font-medium">
                      Mobile Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="e.g. 01712-345678"
                      className="w-full bg-[#242222] border border-[#444748] px-3.5 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-[#fed65b]"
                    />
                  </div>
                </div>

                {orderType === 'delivery' ? (
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-[#c8c6c5] mb-1 font-medium">
                      Delivery Address & Nearby Landmark *
                    </label>
                    <input
                      type="text"
                      required
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      placeholder="e.g. House #14, Main Road, Near Gowalabazar Bridge, Osmaninagar"
                      className="w-full bg-[#242222] border border-[#444748] px-3.5 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-[#fed65b]"
                    />
                  </div>
                ) : (
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-[#c8c6c5] mb-1 font-medium">
                      Preferred Pickup / Arrival Time
                    </label>
                    <select
                      value={pickupTime}
                      onChange={(e) => setPickupTime(e.target.value)}
                      className="w-full bg-[#242222] border border-[#444748] px-3.5 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-[#fed65b]"
                    >
                      <option value="Ready in 20-30 mins (ASAP)">Ready in 20-30 mins (ASAP)</option>
                      <option value="In 45 minutes">In 45 minutes</option>
                      <option value="In 1 hour">In 1 hour</option>
                      <option value="Dinner Time (7:30 PM - 9:00 PM)">Dinner Time (7:30 PM - 9:00 PM)</option>
                      <option value="Lunch Time (1:00 PM - 3:00 PM)">Lunch Time (1:00 PM - 3:00 PM)</option>
                    </select>
                  </div>
                )}

                {/* Payment Method */}
                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#c8c6c5] mb-1.5 font-medium">
                    Payment Method
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('cash_on_delivery')}
                      className={`p-2 text-center text-xs font-bold border transition-colors cursor-pointer ${
                        paymentMethod === 'cash_on_delivery'
                          ? 'border-[#fed65b] bg-[#fed65b]/20 text-[#fed65b]'
                          : 'border-[#444748] bg-[#242222] text-[#c8c6c5]'
                      }`}
                    >
                      {orderType === 'delivery' ? 'Cash on Delivery' : 'Cash at Counter'}
                    </button>
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('bkash_nagad')}
                      className={`p-2 text-center text-xs font-bold border transition-colors cursor-pointer ${
                        paymentMethod === 'bkash_nagad'
                          ? 'border-[#fed65b] bg-[#fed65b]/20 text-[#fed65b]'
                          : 'border-[#444748] bg-[#242222] text-[#c8c6c5]'
                      }`}
                    >
                      bKash / Nagad
                    </button>
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('card_counter')}
                      className={`p-2 text-center text-xs font-bold border transition-colors cursor-pointer ${
                        paymentMethod === 'card_counter'
                          ? 'border-[#fed65b] bg-[#fed65b]/20 text-[#fed65b]'
                          : 'border-[#444748] bg-[#242222] text-[#c8c6c5]'
                      }`}
                    >
                      Card / POS
                    </button>
                  </div>
                </div>

                {/* Special Instructions */}
                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#c8c6c5] mb-1 font-medium">
                    Cooking or Special Instructions (Optional)
                  </label>
                  <input
                    type="text"
                    value={orderNotes}
                    onChange={(e) => setOrderNotes(e.target.value)}
                    placeholder="e.g. Mild spice for kids, extra mint chutney, call upon arrival"
                    className="w-full bg-[#242222] border border-[#444748] px-3.5 py-2 text-xs text-white focus:outline-none focus:border-[#fed65b]"
                  />
                </div>
              </div>
            </div>

            {/* Modal Footer: Pricing Summary & Actions */}
            <div className="p-4 sm:p-5 bg-[#141313] border-t border-[#444748] shrink-0 space-y-3">
              <div className="space-y-1 text-xs">
                <div className="flex justify-between text-[#c8c6c5]">
                  <span>Items Subtotal:</span>
                  <span className="font-serif font-bold text-white">৳{subtotal}</span>
                </div>
                {orderType === 'delivery' && (
                  <div className="flex justify-between text-[#c8c6c5]">
                    <span>Delivery Fee (Osmaninagar area):</span>
                    <span className="font-bold text-white">
                      {deliveryFee === 0 ? <span className="text-emerald-400">FREE (Orders &gt; ৳1500)</span> : `৳${deliveryFee}`}
                    </span>
                  </div>
                )}
                <div className="flex justify-between text-sm sm:text-base font-bold text-white pt-1 border-t border-[#444748]/60">
                  <span className="uppercase tracking-wider">Estimated Grand Total:</span>
                  <span className="font-serif text-[#fed65b] text-lg">৳{grandTotal}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-2.5 pt-2">
                <button
                  type="button"
                  onClick={handleWhatsAppOrder}
                  className="flex-1 py-3 px-4 bg-[#25D366] text-white text-xs uppercase tracking-[0.15em] font-bold hover:bg-[#20bd5a] transition-all flex items-center justify-center space-x-2 cursor-pointer shadow-md"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Order via WhatsApp</span>
                </button>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 py-3 px-4 bg-[#fed65b] text-[#1c1b1b] text-xs uppercase tracking-[0.18em] font-bold hover:bg-[#d4af37] transition-all disabled:opacity-50 cursor-pointer shadow-md flex items-center justify-center space-x-2"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>{isSubmitting ? 'Placing Order...' : 'Confirm Order Online'}</span>
                </button>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
