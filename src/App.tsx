import { type FormEvent, useMemo, useState } from 'react';
import {
  ArrowRight,
  CalendarDays,
  Check,
  ChevronDown,
  Facebook,
  Flame,
  MapPin,
  Menu,
  Minus,
  Phone,
  Plus,
  ShoppingBag,
  Sparkles,
  Truck,
  Utensils,
  X,
} from 'lucide-react';

const PHONE = '+8801790698680';
const DISPLAY_PHONE = '+880 1790-698680';
const MAPS_URL = 'https://maps.app.goo.gl/eNgnNV8HHs6nMuKa7';
const FACEBOOK_URL = 'https://www.facebook.com/p/Dastarkhan-Restaurant-and-Banquet-Hall-61571743596325/';
const ORDER_URL = 'https://www.facebook.com/share/15gbuEJyMn/?mibextid=wwXIfr';

const ORDER_MENU = [
  { id: 'wow', name: 'Wow Offer Platter', bn: 'ওয়াও অফার স্পেশাল প্ল্যাটার', price: 480, category: 'Popular offers', image: 'https://images.unsplash.com/photo-1617093727343-374698b1b08d?auto=format&fit=crop&w=900&q=85', description: 'A generous combo with fried rice, chicken, vegetable, masala, salad, and drink.' },
  { id: 'kacchi', name: 'Grand Mughlai Kacchi Biriyani', bn: 'শাহি কাচ্চি বিরিয়ানি', price: 450, category: 'Biriyani & rice', image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=900&q=85', description: 'Fragrant rice, tender meat, saffron potato, and royal spices.' },
  { id: 'chuijhal', name: 'Chicken Chuijhal Curry', bn: 'চিকেন চুইঝাল স্পেশাল', price: 250, category: 'Local favourites', image: 'https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?auto=format&fit=crop&w=900&q=85', description: 'A regional-style curry with aromatic Chuijhal and fresh chicken.' },
  { id: 'sizzling', name: 'Dastarkhan Mix Sizzling Platter', bn: 'মিক্স সিজলিং স্পেশাল', price: 650, category: 'Grill & sizzling', image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=900&q=85', description: 'A hot platter of beef, chicken, prawns, peppers, and garlic.' },
  { id: 'beef', name: 'Beef Chuijhal Bhuna', bn: 'বিফ চুইঝাল ভুনা', price: 280, category: 'Local favourites', image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=900&q=85', description: 'Slow-cooked beef with indigenous Chuijhal and caramelised onion.' },
  { id: 'faluda', name: 'Dastarkhan Special Faluda', bn: 'স্পেশাল শাহি ফালুদা', price: 250, category: 'Dessert & drinks', image: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&w=900&q=85', description: 'Rose syrup, basil seeds, vermicelli, fruits, rabri, and ice cream.' },
];

type Cart = Record<string, number>;

function openWhatsApp(message: string) {
  window.open(`https://wa.me/${PHONE.replace('+', '')}?text=${encodeURIComponent(message)}`, '_blank', 'noopener,noreferrer');
}

export default function App() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [cart, setCart] = useState<Cart>({});
  const [showCart, setShowCart] = useState(false);
  const [showInquiry, setShowInquiry] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const cartItems = ORDER_MENU.filter((item) => cart[item.id]).map((item) => ({ ...item, quantity: cart[item.id] }));
  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const cartTotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const updateCart = (id: string, amount: number) => {
    setCart((current) => {
      const next = Math.max(0, (current[id] || 0) + amount);
      const copy = { ...current };
      if (next === 0) delete copy[id]; else copy[id] = next;
      return copy;
    });
  };

  const orderSummary = useMemo(() => cartItems.map((item) => `${item.quantity} x ${item.name} (৳${item.price * item.quantity})`).join(', '), [cartItems]);

  const goTo = (id: string) => {
    setMobileOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  const submitInquiry = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    openWhatsApp(`Hello Dastarkhan, I would like a banquet quote. Name: ${String(form.get('name') || '')}. Guests: ${String(form.get('guests') || '')}. Preferred date: ${String(form.get('date') || '')}.`);
    setSubmitted(true);
  };

  return (
    <div className="site-shell">
      <header className="topbar">
        <a className="brand" href="#top" onClick={() => goTo('top')}><span className="brand-mark">د</span><span><strong>Dastarkhan</strong><small>Restaurant & Banquet Hall</small></span></a>
        <nav className={mobileOpen ? 'nav-links open' : 'nav-links'} aria-label="Main navigation">
          <button onClick={() => goTo('order')}>Order food</button><button onClick={() => goTo('menu')}>Menu</button><button onClick={() => goTo('banquet')}>Banquet</button><a className="nav-call" href={`tel:${PHONE}`}><Phone size={15} /> Call now</a>
        </nav>
        <button className="menu-toggle" aria-label="Toggle navigation" onClick={() => setMobileOpen(!mobileOpen)}>{mobileOpen ? <X /> : <Menu />}</button>
      </header>

      <main id="top">
        <section className="hero restaurant-hero section-pad">
          <div className="hero-copy"><p className="eyebrow"><span className="eyebrow-line" /> GOALABAZAR · OSMANINAGAR</p><h1>Order something<br /><em>worth sharing.</em></h1><p className="hero-lede">Local favourites, biriyani, sizzling platters, and family meals from Dastarkhan Restaurant. Order online for pickup or delivery through our Facebook ordering partner.</p><div className="hero-actions"><button className="button button-primary" onClick={() => goTo('order')}><ShoppingBag size={17} /> Order food online</button><button className="button button-ghost" onClick={() => goTo('menu')}>Browse the menu <ArrowRight size={17} /></button></div><div className="quick-proof"><span><Truck size={16} /> Pickup & delivery</span><span><Flame size={16} /> Popular local flavours</span><span><Phone size={16} /> {DISPLAY_PHONE}</span></div></div>
          <div className="hero-visual"><div className="hero-image restaurant-hero-image" role="img" aria-label="A table prepared for a Dastarkhan meal" /><div className="hero-badge order-badge"><span>Order your favourites</span><strong>ঘরে বসেই অর্ডার করুন</strong><small>Pickup & delivery options available.</small></div></div>
        </section>

        <section className="order-ribbon"><div><ShoppingBag size={23} /><span><strong>Hungry now?</strong><small>Start an order in seconds.</small></span></div><button onClick={() => goTo('order')}>See popular dishes <ArrowRight size={16} /></button><a href={ORDER_URL} target="_blank" rel="noreferrer">Open Facebook ordering <Facebook size={16} /></a></section>

        <section id="order" className="section-pad order-section"><div className="order-heading"><div><p className="eyebrow">ONLINE ORDERING</p><h2>Choose your favourites.<br /><em>We’ll take it from there.</em></h2></div><p>Build a sample basket below, then continue to Dastarkhan’s verified Facebook ordering flow for pickup or delivery.</p></div><div className="order-notice"><span><Sparkles size={17} /> Ordering made simple</span><small>Menu availability and final prices are confirmed by the restaurant when you place the order.</small></div><div className="dish-grid">{ORDER_MENU.map((item) => <article className="dish-card" key={item.id}><img src={item.image} alt={item.name} loading="lazy" /><div className="dish-body"><span className="dish-category">{item.category}</span><h3>{item.name}</h3><p className="dish-bn">{item.bn}</p><p>{item.description}</p><div className="dish-footer"><strong>৳{item.price}</strong><button className="add-button" onClick={() => updateCart(item.id, 1)}><Plus size={15} /> Add</button></div></div></article>)}</div></section>

        <section id="menu" className="menu-callout section-pad"><div className="menu-callout-image" role="img" aria-label="Dastarkhan food platter" /><div><p className="eyebrow">A MENU FOR EVERY MOOD</p><h2>From a quick bite<br /><em>to a full table.</em></h2><p>Explore popular offers, biriyani and rice, local Chuijhal favourites, grills, platters, desserts, and drinks. The online ordering flow is the fastest way to ask about what is available today.</p><div className="category-pills"><span>Popular offers</span><span>Biriyani & rice</span><span>Local favourites</span><span>Grill & sizzling</span><span>Dessert & drinks</span></div><button className="button button-primary" onClick={() => goTo('order')}>Build an order <ShoppingBag size={17} /></button></div></section>

        <section id="banquet" className="banquet-section section-pad"><div className="banquet-image" role="img" aria-label="Banquet hall prepared for an event" /><div className="banquet-copy"><p className="eyebrow">PLANNING A GATHERING?</p><h2>Bring everyone<br /><em>to the same table.</em></h2><p>For parties, events, and family occasions, speak with the banquet team about the right space and food for your guest list.</p><div className="check-list"><span><Check size={16} /> Modern banquet facilities</span><span><Check size={16} /> Event-friendly food planning</span><span><Check size={16} /> A local team you can speak with</span></div><button className="button button-primary" onClick={() => setShowInquiry(true)}>Request a banquet quote <CalendarDays size={17} /></button></div></section>

        <section id="visit" className="visit-section section-pad"><div><p className="eyebrow">FIND US IN GOALABAZAR</p><h2>Eat in, take away,<br /><em>or order ahead.</em></h2><p className="visit-copy">Khadimpur Road, GoalaBazar, Osmaninagar 3124, Bangladesh</p><div className="visit-actions"><a className="button button-primary" href={MAPS_URL} target="_blank" rel="noreferrer"><MapPin size={17} /> Get directions</a><a className="button button-ghost light" href={`tel:${PHONE}`}><Phone size={17} /> {DISPLAY_PHONE}</a></div></div><div className="visit-card"><div><Utensils size={20} /><span>Restaurant service</span></div><strong>Open until 11 pm</strong><small>Call ahead for today’s menu, pickup timing, or banquet availability.</small></div></section>
      </main>

      <footer className="footer"><div className="footer-brand"><span className="brand-mark">د</span><div><strong>Dastarkhan</strong><small>Restaurant & Banquet Hall</small></div></div><p>Local favourites, family dining, online ordering, and modern banquet facilities for Goala Bazar.</p><div className="footer-links"><a href={ORDER_URL} target="_blank" rel="noreferrer"><ShoppingBag size={16} /> Order online</a><a href={FACEBOOK_URL} target="_blank" rel="noreferrer"><Facebook size={16} /> Facebook</a><a href={`mailto:Dastarkhanbanquethall@gmail.com`}>Email the team</a></div></footer>

      <div className="mobile-cta"><button onClick={() => goTo('order')}><ShoppingBag size={16} /> Order food</button><a href={`tel:${PHONE}`}><Phone size={16} /> Call</a><button onClick={() => setShowInquiry(true)}><CalendarDays size={16} /> Event quote</button></div>
      {cartCount > 0 && <button className="cart-float" onClick={() => setShowCart(true)}><ShoppingBag size={18} /><span>{cartCount} item{cartCount > 1 ? 's' : ''}</span><strong>৳{cartTotal}</strong><ArrowRight size={16} /></button>}

      {showCart && <div className="modal-backdrop" role="presentation" onClick={() => setShowCart(false)}><div className="cart-modal" role="dialog" aria-modal="true" onClick={(event) => event.stopPropagation()}><button className="modal-close" onClick={() => setShowCart(false)} aria-label="Close"><X /></button><p className="eyebrow">YOUR ORDER</p><h2>Ready to<br /><em>continue?</em></h2><p className="modal-intro">This basket is a preview. Continue to Facebook to confirm availability, final price, pickup, or delivery with Dastarkhan.</p><div className="cart-lines">{cartItems.map((item) => <div className="cart-line" key={item.id}><span><strong>{item.name}</strong><small>৳{item.price} each</small></span><span className="quantity"><button onClick={() => updateCart(item.id, -1)} aria-label="Decrease"><Minus size={14} /></button>{item.quantity}<button onClick={() => updateCart(item.id, 1)} aria-label="Increase"><Plus size={14} /></button></span></div>)}</div><div className="cart-total"><span>Basket estimate</span><strong>৳{cartTotal}</strong></div><button className="button button-primary full" onClick={() => window.open(ORDER_URL, '_blank', 'noopener,noreferrer')}>Continue on Facebook <Facebook size={17} /></button><button className="button button-ghost full" onClick={() => openWhatsApp(`Hello Dastarkhan, I want to order: ${orderSummary}. Estimated basket: ৳${cartTotal}.`)}>Ask on WhatsApp <Phone size={17} /></button></div></div>}

      {showInquiry && <div className="modal-backdrop" role="presentation" onClick={() => setShowInquiry(false)}><div className="inquiry-modal" role="dialog" aria-modal="true" aria-labelledby="inquiry-title" onClick={(event) => event.stopPropagation()}><button className="modal-close" onClick={() => setShowInquiry(false)} aria-label="Close"><X /></button>{submitted ? <div className="submitted"><Check size={30} /><h2>Message ready.</h2><p>WhatsApp should have opened with your banquet enquiry. The team can reply with availability and a quote.</p><button className="button button-primary" onClick={() => setShowInquiry(false)}>Close</button></div> : <><p className="eyebrow">BANQUET ENQUIRY</p><h2 id="inquiry-title">Tell us about<br /><em>your gathering.</em></h2><p className="modal-intro">Share the basics and continue the conversation directly on WhatsApp.</p><form onSubmit={submitInquiry}><label>Your name<input name="name" required placeholder="Name" /></label><div className="form-row"><label>Guests<input name="guests" required type="number" min="1" placeholder="e.g. 80" /></label><label>Preferred date<input name="date" required type="date" /></label></div><button className="button button-primary full" type="submit">Continue on WhatsApp <ArrowRight size={17} /></button></form></>}</div></div>}
    </div>
  );
}
