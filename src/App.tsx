import { type FormEvent, useState } from 'react';
import {
  ArrowRight,
  CalendarDays,
  Check,
  ChevronDown,
  Clock3,
  Facebook,
  Flame,
  MapPin,
  Menu,
  Phone,
  Sparkles,
  Users,
  X,
} from 'lucide-react';

const PHONE = '+8801790698680';
const DISPLAY_PHONE = '+880 1790-698680';
const MAPS_URL = 'https://maps.app.goo.gl/eNgnNV8HHs6nMuKa7';
const FACEBOOK_URL = 'https://www.facebook.com/p/Dastarkhan-Restaurant-and-Banquet-Hall-61571743596325/';

const gallery = [
  {
    src: 'https://images.unsplash.com/photo-1515003197210-e0cd71810b5f?auto=format&fit=crop&w=1200&q=85',
    alt: 'Warmly presented Bengali-inspired restaurant meal',
  },
  {
    src: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=1200&q=85',
    alt: 'Elegant banquet hall prepared for a celebration',
  },
  {
    src: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1200&q=85',
    alt: 'Shared feast for family and friends',
  },
];

const menuHighlights = [
  { title: 'Family dining', text: 'A comfortable place to enjoy a generous meal with the people who matter.' },
  { title: 'Celebration menus', text: 'Talk to the team about food for parties, events, and larger gatherings.' },
  { title: 'Local favourites', text: 'Come hungry, ask what is fresh today, and let the kitchen guide you.' },
];

function openWhatsApp(message: string) {
  window.open(`https://wa.me/${PHONE.replace('+', '')}?text=${encodeURIComponent(message)}`, '_blank', 'noopener,noreferrer');
}

export default function App() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [showInquiry, setShowInquiry] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const goTo = (id: string) => {
    setMobileOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  const submitInquiry = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const name = String(form.get('name') || '');
    const guests = String(form.get('guests') || '');
    const date = String(form.get('date') || '');
    openWhatsApp(`Hello Dastarkhan, I would like a banquet quote. Name: ${name}. Guests: ${guests}. Preferred date: ${date}.`);
    setSubmitted(true);
  };

  return (
    <div className="site-shell">
      <header className="topbar">
        <a className="brand" href="#top" onClick={() => goTo('top')}>
          <span className="brand-mark">د</span>
          <span><strong>Dastarkhan</strong><small>Restaurant & Banquet Hall</small></span>
        </a>
        <nav className={mobileOpen ? 'nav-links open' : 'nav-links'} aria-label="Main navigation">
          <button onClick={() => goTo('menu')}>Dining</button>
          <button onClick={() => goTo('banquet')}>Banquet</button>
          <button onClick={() => goTo('visit')}>Visit us</button>
          <a className="nav-call" href={`tel:${PHONE}`}><Phone size={15} /> Call now</a>
        </nav>
        <button className="menu-toggle" aria-label="Toggle navigation" onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? <X /> : <Menu />}
        </button>
      </header>

      <main id="top">
        <section className="hero section-pad">
          <div className="hero-copy">
            <p className="eyebrow"><span className="eyebrow-line" /> GOALABAZAR · OSMANINAGAR</p>
            <h1>Good food.<br /><em>Beautiful moments.</em></h1>
            <p className="hero-lede">A welcoming place for everyday meals, family gatherings, parties, and celebrations in the heart of Goala Bazar.</p>
            <div className="hero-actions">
              <button className="button button-primary" onClick={() => goTo('menu')}>Explore dining <ArrowRight size={17} /></button>
              <button className="button button-ghost" onClick={() => setShowInquiry(true)}>Plan an event <CalendarDays size={17} /></button>
            </div>
            <div className="quick-proof">
              <span><Flame size={16} /> Restaurant & banquet</span>
              <span><MapPin size={16} /> Khadimpur Road</span>
              <span><Clock3 size={16} /> Open until 11 pm</span>
            </div>
          </div>
          <div className="hero-visual">
            <div className="hero-image" role="img" aria-label="Dastarkhan dining experience" />
            <div className="hero-badge"><span>Come together</span><strong>খাবারের প্রকৃত স্বাদে</strong><small>Food tastes better when shared.</small></div>
          </div>
        </section>

        <section className="trust-strip">
          <div><strong>3.9/5</strong><span>Google rating · 47 reviews</span></div>
          <div><strong>726+</strong><span>People following on Facebook</span></div>
          <div><strong>11 pm</strong><span>Late dining availability</span></div>
          <div><strong>1 call</strong><span>To ask about your event</span></div>
        </section>

        <section id="menu" className="section-pad intro-section">
          <div className="section-heading"><p className="eyebrow">THE DASTARKHAN TABLE</p><h2>Made for meals<br /><em>worth remembering.</em></h2></div>
          <div className="intro-content"><p>Whether you are stopping in for a meal or bringing your whole family, Dastarkhan is designed around generous hospitality, familiar flavours, and time well spent together.</p><a className="text-link" href={`tel:${PHONE}`}>Ask what is fresh today <ArrowRight size={16} /></a></div>
        </section>

        <section className="feature-grid section-pad">
          {menuHighlights.map((item, index) => <article className="feature-card" key={item.title}><span className="feature-number">0{index + 1}</span><h3>{item.title}</h3><p>{item.text}</p><a href={`tel:${PHONE}`} className="text-link">Call to enquire <ArrowRight size={15} /></a></article>)}
        </section>

        <section id="banquet" className="banquet-section section-pad">
          <div className="banquet-image" role="img" aria-label="Banquet hall prepared for an event" />
          <div className="banquet-copy"><p className="eyebrow">YOUR NEXT GATHERING</p><h2>Bring everyone<br /><em>to the same table.</em></h2><p>From family occasions to parties and events, our banquet team can help you plan the right space and food for your guest list.</p><div className="check-list"><span><Check size={16} /> Modern banquet facilities</span><span><Check size={16} /> Event-friendly food planning</span><span><Check size={16} /> A local team you can speak with</span></div><button className="button button-primary" onClick={() => setShowInquiry(true)}>Request a banquet quote <ArrowRight size={17} /></button></div>
        </section>

        <section className="gallery section-pad"><div className="section-heading"><p className="eyebrow">A PLACE TO SHARE</p><h2>See you around<br /><em>the table.</em></h2></div><div className="gallery-grid">{gallery.map((image) => <img key={image.src} src={image.src} alt={image.alt} loading="lazy" />)}</div></section>

        <section id="visit" className="visit-section section-pad"><div><p className="eyebrow">FIND US IN GOALABAZAR</p><h2>Come hungry.<br /><em>Leave happy.</em></h2><p className="visit-copy">Khadimpur Road, GoalaBazar, Osmaninagar 3124, Bangladesh</p><div className="visit-actions"><a className="button button-primary" href={MAPS_URL} target="_blank" rel="noreferrer"><MapPin size={17} /> Get directions</a><a className="button button-ghost light" href={`tel:${PHONE}`}><Phone size={17} /> {DISPLAY_PHONE}</a></div></div><div className="visit-card"><div><Clock3 size={20} /><span>Open today</span></div><strong>Until 11:00 pm</strong><small>Hours may vary on event days. Call ahead for banquet availability.</small></div></section>
      </main>

      <footer className="footer"><div className="footer-brand"><span className="brand-mark">د</span><div><strong>Dastarkhan</strong><small>Restaurant & Banquet Hall</small></div></div><p>Authentic food and modern banquet facilities for Goala Bazar and beyond.</p><div className="footer-links"><a href={FACEBOOK_URL} target="_blank" rel="noreferrer"><Facebook size={16} /> Facebook</a><a href={`mailto:Dastarkhanbanquethall@gmail.com`}>Email the team</a><a href={`tel:${PHONE}`}>Call {DISPLAY_PHONE}</a></div></footer>

      <div className="mobile-cta"><a href={`tel:${PHONE}`}><Phone size={16} /> Call</a><button onClick={() => openWhatsApp('Hello Dastarkhan, I would like to ask about your restaurant or banquet hall.')}>WhatsApp</button><button onClick={() => setShowInquiry(true)}><CalendarDays size={16} /> Event quote</button></div>

      {showInquiry && <div className="modal-backdrop" role="presentation" onClick={() => setShowInquiry(false)}><div className="inquiry-modal" role="dialog" aria-modal="true" aria-labelledby="inquiry-title" onClick={(event) => event.stopPropagation()}><button className="modal-close" onClick={() => setShowInquiry(false)} aria-label="Close"><X /></button>{submitted ? <div className="submitted"><Check size={30} /><h2>Message ready.</h2><p>WhatsApp should have opened with your enquiry. The Dastarkhan team can reply with availability and a quote.</p><button className="button button-primary" onClick={() => setShowInquiry(false)}>Close</button></div> : <><p className="eyebrow">BANQUET ENQUIRY</p><h2 id="inquiry-title">Tell us about<br /><em>your gathering.</em></h2><p className="modal-intro">Share the basics and we will help you continue the conversation directly on WhatsApp.</p><form onSubmit={submitInquiry}><label>Your name<input name="name" required placeholder="Name" /></label><div className="form-row"><label>Guests<input name="guests" required type="number" min="1" placeholder="e.g. 80" /></label><label>Preferred date<input name="date" required type="date" /></label></div><button className="button button-primary full" type="submit">Continue on WhatsApp <ArrowRight size={17} /></button></form></>}</div></div>}
    </div>
  );
}
