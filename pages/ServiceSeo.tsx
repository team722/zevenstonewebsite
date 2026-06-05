import React, { useEffect, useRef, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import styles from './ServiceSeo.module.css';

const PAGE_ACTIVE_CLASS = 'service-seo-page-active';
const GLOBAL_HEADER_HIDDEN_CLASS = 'service-seo-global-header-hidden';

const ServiceSeo: React.FC = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const tabNavRef = useRef<HTMLDivElement | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaq(prev => (prev === index ? null : index));
  };

  useEffect(() => {
    document.body.classList.add(PAGE_ACTIVE_CLASS);

    // Reveal intersection observer
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => { 
        if (e.isIntersecting) { 
          e.target.classList.add(styles['in']); 
          io.unobserve(e.target); 
        } 
      });
    }, { threshold: 0.06, rootMargin: '0px 0px -20px 0px' });
    document.querySelectorAll('.' + styles['reveal']).forEach(el => io.observe(el));

    // Tab nav observer
    const sections = ['technical-seo','onpage-seo','local-seo','link-building'];
    const tabLinks = document.querySelectorAll('.' + styles['tab-link'] + '[data-section]');
    const sectionObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          tabLinks.forEach(l => {
            if (l instanceof HTMLElement) {
              if (l.dataset.section === id) {
                l.classList.add(styles['active']);
              } else {
                l.classList.remove(styles['active']);
              }
            }
          });
        }
      });
    }, { rootMargin: '-30% 0px -60% 0px' });

    sections.forEach(id => {
      const el = document.getElementById(id);
      if (el) sectionObserver.observe(el);
    });

    let isHeaderHidden = false;
    let animationFrameId = 0;

    const setGlobalHeaderHidden = (hidden: boolean) => {
      if (isHeaderHidden === hidden) return;
      isHeaderHidden = hidden;
      document.body.classList.toggle(GLOBAL_HEADER_HIDDEN_CLASS, hidden);
    };

    const updateGlobalHeaderVisibility = () => {
      animationFrameId = 0;

      const tabNav = tabNavRef.current;
      const globalHeader = document.querySelector<HTMLElement>('nav.fixed');

      if (!tabNav || !globalHeader) {
        setGlobalHeaderHidden(false);
        return;
      }

      const headerHeight = globalHeader.offsetHeight || 80;
      const tabTop = tabNav.getBoundingClientRect().top;
      const hideThreshold = headerHeight + 12;
      const showThreshold = headerHeight + 44;

      if (!isHeaderHidden && tabTop <= hideThreshold) {
        setGlobalHeaderHidden(true);
        return;
      }

      if (isHeaderHidden && tabTop > showThreshold) {
        setGlobalHeaderHidden(false);
      }
    };

    const requestHeaderVisibilityUpdate = () => {
      if (animationFrameId) return;
      animationFrameId = window.requestAnimationFrame(updateGlobalHeaderVisibility);
    };

    requestHeaderVisibilityUpdate();
    window.addEventListener('scroll', requestHeaderVisibilityUpdate, { passive: true });
    window.addEventListener('resize', requestHeaderVisibilityUpdate);

    return () => {
      io.disconnect();
      sectionObserver.disconnect();
      window.removeEventListener('scroll', requestHeaderVisibilityUpdate);
      window.removeEventListener('resize', requestHeaderVisibilityUpdate);
      if (animationFrameId) window.cancelAnimationFrame(animationFrameId);
      document.body.classList.remove(PAGE_ACTIVE_CLASS, GLOBAL_HEADER_HIDDEN_CLASS);
    };
  }, []);

  return (
    <div className={styles.seoPageWrapper}>
      <Helmet>
        <title>Search Engine Optimisation — Zevenstone Digital Marketing</title>
        <meta name="description" content="Technical SEO, On-Page & Content, Local SEO, and Link Building — delivered as one integrated system that turns search visibility into measurable business growth." />
      </Helmet>
      <main id="main">
{/*  ══ HERO ══════════════════════════════════════════  */}
<section className={`${styles['hero']}`} aria-labelledby="hero-h1">
  <div className={`${styles['wrap']}`}>
    <div className={`${styles['hero-layout']}`}>
      <div>
        <div className={`${styles['hero-eyebrow']} ${styles['reveal']}`}>
          <span className={`${styles['hero-eyebrow-dot']}`} aria-hidden="true"></span>
          Digital Marketing
        </div>
        <h1 id="hero-h1" className={`${styles['hero-title']} ${styles['reveal']} ${styles['d1']}`}>
          Search Engine<br/><span className={`${styles['blue']}`}>Optimisation.</span>
        </h1>
        <p className={`${styles['hero-sub']} ${styles['reveal']} ${styles['d2']}`}>Visibility that compounds. Organic traffic that converts. A complete SEO system covering technical foundations, content, local presence, and link authority — built as a long-term business asset.</p>
        <div className={`${styles['hero-actions']} ${styles['reveal']} ${styles['d3']}`}>
          <a href="#cta" className={`${styles['btn-primary']}`}>Start Your SEO Project →</a>
          <a href="#technical-seo" className={`${styles['btn-ghost']}`}>See What's Included</a>
        </div>
        <div className={`${styles['hero-trust']} ${styles['reveal']} ${styles['d4']}`} role="list" aria-label="Service guarantees">
          <div className={`${styles['trust-chip']}`} role="listitem">
            <svg width="11" height="11" viewBox="0 0 11 11" fill="none" aria-hidden="true"><path d="M2 5.5l2.5 2.5 4.5-4.5" stroke="#2563EB" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
            No lock-in contracts
          </div>
          <div className={`${styles['trust-chip']}`} role="listitem">
            <svg width="11" height="11" viewBox="0 0 11 11" fill="none" aria-hidden="true"><path d="M2 5.5l2.5 2.5 4.5-4.5" stroke="#2563EB" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
            Monthly reporting
          </div>
          <div className={`${styles['trust-chip']}`} role="listitem">
            <svg width="11" height="11" viewBox="0 0 11 11" fill="none" aria-hidden="true"><path d="M2 5.5l2.5 2.5 4.5-4.5" stroke="#2563EB" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
            White-label available
          </div>
          <div className={`${styles['trust-chip']}`} role="listitem">
            <svg width="11" height="11" viewBox="0 0 11 11" fill="none" aria-hidden="true"><path d="M2 5.5l2.5 2.5 4.5-4.5" stroke="#2563EB" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
            Free audit included
          </div>
        </div>
      </div>

      {/*  Hero: humanized SEO scene illustration  */}
      <div className={`${styles['reveal']} ${styles['d2']}`}>
        <div className={`${styles['hero-illustration']}`} aria-label="SEO strategist reviewing search performance dashboard" role="img">
          <svg viewBox="0 0 460 520" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: 'auto', display: 'block' }}>
            <defs>
              <linearGradient id="roomGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#EEF4FF"/>
                <stop offset="100%" stopColor="#F8FAFF"/>
              </linearGradient>
              <linearGradient id="deskGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#D4A574"/>
                <stop offset="100%" stopColor="#B8895A"/>
              </linearGradient>
              <linearGradient id="screenGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#1E293B"/>
                <stop offset="100%" stopColor="#0F172A"/>
              </linearGradient>
              <linearGradient id="chartUp" x1="0" y1="1" x2="0" y2="0">
                <stop offset="0%" stopColor="#DBEAFE"/>
                <stop offset="100%" stopColor="#2563EB"/>
              </linearGradient>
              <linearGradient id="skinGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#FDDCAD"/>
                <stop offset="100%" stopColor="#F5C48A"/>
              </linearGradient>
              <linearGradient id="shirtGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#2563EB"/>
                <stop offset="100%" stopColor="#1D4ED8"/>
              </linearGradient>
              <filter id="glow">
                <feGaussianBlur stdDeviation="3" result="blur"/>
                <feComposite in="SourceGraphic" in2="blur" operator="over"/>
              </filter>
            </defs>

            {/*  Room background  */}
            <rect width="460" height="520" fill="url(#roomGrad)"/>
            {/*  wall/floor divide  */}
            <rect x="0" y="340" width="460" height="180" fill="#EDE8E0" opacity="0.4"/>
            {/*  wall texture hint  */}
            <rect x="0" y="0" width="460" height="340" fill="#EEF4FF"/>

            {/*  Window with glow on wall  */}
            <rect x="290" y="20" width="120" height="160" rx="8" fill="#DBEAFE" stroke="#BFDBFE" strokeWidth="1.5"/>
            <line x1="350" y1="20" x2="350" y2="180" stroke="#BFDBFE" strokeWidth="1"/>
            <line x1="290" y1="100" x2="410" y2="100" stroke="#BFDBFE" strokeWidth="1"/>
            {/*  window light spill  */}
            <ellipse cx="350" cy="200" rx="90" ry="40" fill="#EEF2FF" opacity="0.6"/>

            {/*  Potted plant  */}
            <rect x="395" y="275" width="22" height="18" rx="4" fill="#C2956C"/>
            <ellipse cx="406" cy="276" rx="12" ry="5" fill="#A0785A"/>
            <path d="M406 275 C400 255 388 248 382 240" stroke="#16A34A" strokeWidth="3" strokeLinecap="round" fill="none"/>
            <ellipse cx="381" cy="238" rx="10" ry="7" fill="#22C55E" transform="rotate(-20 381 238)"/>
            <path d="M406 270 C410 250 420 244 426 236" stroke="#16A34A" strokeWidth="2.5" strokeLinecap="round" fill="none"/>
            <ellipse cx="427" cy="234" rx="9" ry="6" fill="#4ADE80" transform="rotate(15 427 234)"/>
            <path d="M406 268 C406 252 400 242 397 232" stroke="#15803D" strokeWidth="2" strokeLinecap="round" fill="none"/>
            <ellipse cx="396" cy="230" rx="7" ry="5" fill="#16A34A" transform="rotate(-10 396 230)"/>

            {/*  Desk surface  */}
            <rect x="30" y="300" width="400" height="16" rx="3" fill="url(#deskGrad)"/>
            <rect x="30" y="314" width="400" height="6" rx="2" fill="#9A6B3E"/>

            {/*  Monitor stand  */}
            <rect x="195" y="285" width="12" height="18" rx="2" fill="#94A3B8"/>
            <rect x="180" y="300" width="42" height="4" rx="2" fill="#64748B"/>

            {/*  Main Monitor  */}
            <rect x="80" y="120" width="260" height="168" rx="10" fill="url(#screenGrad)" stroke="#334155" strokeWidth="2"/>
            {/*  screen glow effect  */}
            <rect x="82" y="122" width="256" height="164" rx="9" fill="#0F172A"/>
            {/*  screen content: dashboard  */}
            {/*  top nav bar on screen  */}
            <rect x="82" y="122" width="256" height="20" rx="9" fill="#1E293B"/>
            <rect x="82" y="132" width="256" height="10" fill="#1E293B"/>
            <circle cx="96" cy="132" r="4" fill="#EF4444" opacity="0.7"/>
            <circle cx="108" cy="132" r="4" fill="#F59E0B" opacity="0.7"/>
            <circle cx="120" cy="132" r="4" fill="#22C55E" opacity="0.7"/>
            {/*  url bar on screen  */}
            <rect x="140" y="127" width="120" height="10" rx="5" fill="#334155"/>
            <text x="200" y="135" font-family="sans-serif" font-size="5" fill="#64748B" text-anchor="middle">google.com/search</text>

            {/*  Google SERP #1 — branded, glowing  */}
            <rect x="90" y="148" width="232" height="38" rx="5" fill="#1E3A5F"/>
            <rect x="90" y="148" width="2" height="38" fill="#2563EB"/>
            <rect x="90" y="148" width="232" height="38" rx="5" fill="rgba(37,99,235,0.15)"/>
            <text x="98" y="161" font-family="sans-serif" font-size="5.5" fill="#93C5FD">yourwebsite.com › services</text>
            <text x="98" y="173" font-family="sans-serif" font-size="7" font-weight="bold" fill="#60A5FA">Your Business — #1 on Google</text>
            <text x="98" y="182" font-family="sans-serif" font-size="4.5" fill="#64748B">SEO that turns visibility into growth...</text>
            {/*  #1 badge  */}
            <rect x="296" y="153" width="20" height="13" rx="6" fill="#2563EB"/>
            <text x="306" y="162" font-family="sans-serif" font-size="7" font-weight="bold" fill="white" text-anchor="middle">#1</text>

            {/*  SERP #2 dimmed  */}
            <rect x="90" y="192" width="232" height="26" rx="5" fill="#1A2535"/>
            <text x="98" y="204" font-family="sans-serif" font-size="6" fill="#374151">Competitor A · competitor.com</text>
            <text x="98" y="213" font-family="sans-serif" font-size="4.5" fill="#374151">#2 — Their best page title goes here</text>
            <rect x="296" y="196" width="18" height="11" rx="5" fill="#1E293B" stroke="#374151" strokeWidth="1"/>
            <text x="305" y="204" font-family="sans-serif" font-size="6" fill="#4B5563" text-anchor="middle">#2</text>

            {/*  SERP #3 more dimmed  */}
            <rect x="90" y="224" width="232" height="18" rx="5" fill="#151E2D"/>
            <text x="98" y="235" font-family="sans-serif" font-size="5" fill="#2D3748">#3 — another-competitor.com · fading out</text>

            {/*  metric strip at bottom of screen  */}
            <rect x="90" y="248" width="232" height="28" rx="5" fill="#0D1526"/>
            {/*  traffic sparkline  */}
            <polyline points="100,270 110,267 120,263 130,258 140,252 150,255 160,249" stroke="#3B82F6" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
            <circle cx="160" cy="249" r="2.5" fill="#2563EB"/>
            <text x="100" y="259" font-family="sans-serif" font-size="4" fill="#4B5563">TRAFFIC</text>
            <text x="100" y="272" font-family="sans-serif" font-size="6" font-weight="bold" fill="#60A5FA">+312%</text>
            {/*  divider  */}
            <line x1="180" y1="252" x2="180" y2="272" stroke="#1E293B" strokeWidth="1"/>
            {/*  rankings  */}
            <text x="188" y="259" font-family="sans-serif" font-size="4" fill="#4B5563">RANKINGS</text>
            <text x="188" y="272" font-family="sans-serif" font-size="6" font-weight="bold" fill="#34D399">Page 1 ↑</text>
            {/*  divider  */}
            <line x1="232" y1="252" x2="232" y2="272" stroke="#1E293B" strokeWidth="1"/>
            {/*  ROI  */}
            <text x="240" y="259" font-family="sans-serif" font-size="4" fill="#4B5563">ROI vs PAID</text>
            <text x="240" y="272" font-family="sans-serif" font-size="6" font-weight="bold" fill="#FBBF24">4.8×</text>

            {/*  Keyboard  */}
            <rect x="110" y="306" width="180" height="18" rx="4" fill="#E2E8F0"/>
            <rect x="112" y="308" width="176" height="14" rx="3" fill="#CBD5E1"/>
            {/*  key rows  */}
            <rect x="115" y="309" width="8" height="4" rx="1" fill="#94A3B8"/>
            <rect x="125" y="309" width="8" height="4" rx="1" fill="#94A3B8"/>
            <rect x="135" y="309" width="8" height="4" rx="1" fill="#94A3B8"/>
            <rect x="145" y="309" width="8" height="4" rx="1" fill="#94A3B8"/>
            <rect x="155" y="309" width="8" height="4" rx="1" fill="#94A3B8"/>
            <rect x="165" y="309" width="8" height="4" rx="1" fill="#94A3B8"/>
            <rect x="175" y="309" width="8" height="4" rx="1" fill="#94A3B8"/>
            <rect x="185" y="309" width="8" height="4" rx="1" fill="#94A3B8"/>
            <rect x="195" y="309" width="8" height="4" rx="1" fill="#94A3B8"/>
            <rect x="205" y="309" width="8" height="4" rx="1" fill="#94A3B8"/>
            <rect x="215" y="309" width="8" height="4" rx="1" fill="#94A3B8"/>
            <rect x="225" y="309" width="8" height="4" rx="1" fill="#94A3B8"/>
            <rect x="235" y="309" width="8" height="4" rx="1" fill="#94A3B8"/>
            <rect x="245" y="309" width="32" height="4" rx="1" fill="#94A3B8"/>
            <rect x="118" y="315" width="60" height="4" rx="1" fill="#94A3B8"/>
            <rect x="180" y="315" width="80" height="4" rx="1" fill="#94A3B8"/>
            <rect x="263" y="315" width="22" height="4" rx="1" fill="#94A3B8"/>

            {/*  Mouse  */}
            <rect x="308" y="304" width="28" height="18" rx="9" fill="#CBD5E1" stroke="#94A3B8" strokeWidth="1"/>
            <line x1="322" y1="304" x2="322" y2="322" stroke="#94A3B8" strokeWidth="0.75"/>
            <ellipse cx="316" cy="310" rx="4" ry="3" fill="#94A3B8" opacity="0.5"/>

            {/*  Coffee mug  */}
            <rect x="50" y="286" width="28" height="18" rx="4" fill="#F8FAFF" stroke="#E2E8F0" strokeWidth="1.5"/>
            <path d="M78 292 C84 292 84 300 78 300" stroke="#E2E8F0" strokeWidth="1.5" fill="none"/>
            <rect x="52" y="288" width="24" height="6" rx="2" fill="#DBEAFE"/>
            {/*  steam lines  */}
            <path d="M59 284 C59 280 62 280 62 276" stroke="#CBD5E1" strokeWidth="1" strokeLinecap="round" fill="none"/>
            <path d="M66 283 C66 279 69 279 69 275" stroke="#CBD5E1" strokeWidth="1" strokeLinecap="round" fill="none"/>

            {/*  ── PERSON: seated figure ──  */}
            {/*  Chair back  */}
            <rect x="175" y="350" width="72" height="110" rx="10" fill="#1E293B"/>
            <rect x="180" y="355" width="62" height="100" rx="8" fill="#334155"/>
            {/*  Chair seat  */}
            <rect x="165" y="440" width="92" height="16" rx="8" fill="#1E293B"/>
            {/*  Chair base/legs  */}
            <line x1="211" y1="456" x2="211" y2="490" stroke="#64748B" strokeWidth="3"/>
            <ellipse cx="211" cy="490" rx="28" ry="6" fill="#475569" opacity="0.5"/>

            {/*  Person body/torso  */}
            <rect x="186" y="380" width="50" height="64" rx="14" fill="url(#shirtGrad)"/>
            {/*  shirt collar  */}
            <path d="M205 380 L211 392 L217 380" fill="#1D4ED8" stroke="#1D4ED8" strokeWidth="1"/>
            {/*  arms  */}
            {/*  left arm on desk  */}
            <rect x="148" y="416" width="44" height="14" rx="7" fill="url(#shirtGrad)" transform="rotate(-8 148 416)"/>
            <rect x="136" y="416" width="20" height="12" rx="6" fill="url(#skinGrad)"/>
            {/*  right arm on desk  */}
            <rect x="228" y="416" width="44" height="14" rx="7" fill="url(#shirtGrad)" transform="rotate(8 228 416)"/>
            <rect x="264" y="416" width="20" height="12" rx="6" fill="url(#skinGrad)"/>

            {/*  Neck  */}
            <rect x="202" y="368" width="18" height="16" rx="6" fill="url(#skinGrad)"/>
            {/*  Head  */}
            <ellipse cx="211" cy="355" rx="26" ry="28" fill="url(#skinGrad)"/>
            {/*  Hair  */}
            <path d="M185 345 C185 320 237 320 237 345 C237 335 232 328 211 328 C190 328 185 335 185 345Z" fill="#1C1009"/>
            {/*  ear  */}
            <ellipse cx="185" cy="355" rx="5" ry="7" fill="#F5C48A"/>
            <ellipse cx="237" cy="355" rx="5" ry="7" fill="#F5C48A"/>
            {/*  face: eyes looking at screen  */}
            <ellipse cx="202" cy="352" rx="4" ry="4.5" fill="white"/>
            <ellipse cx="220" cy="352" rx="4" ry="4.5" fill="white"/>
            <circle cx="203" cy="353" r="2.5" fill="#1C1009"/>
            <circle cx="221" cy="353" r="2.5" fill="#1C1009"/>
            {/*  screen reflection in eyes (tiny blue dot)  */}
            <circle cx="204" cy="352" r="0.8" fill="#60A5FA" opacity="0.8"/>
            <circle cx="222" cy="352" r="0.8" fill="#60A5FA" opacity="0.8"/>
            {/*  slight smile  */}
            <path d="M204 362 C207 365 215 365 218 362" stroke="#C4956A" strokeWidth="1.2" strokeLinecap="round" fill="none"/>
            {/*  eyebrows  */}
            <path d="M198 347 C200 345 205 345 207 347" stroke="#1C1009" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
            <path d="M215 347 C217 345 222 345 224 347" stroke="#1C1009" strokeWidth="1.5" strokeLinecap="round" fill="none"/>

            {/*  Notebook on desk  */}
            <rect x="50" y="295" width="48" height="8" rx="2" fill="#F8FAFF" stroke="#E2E8F0" strokeWidth="1"/>
            {/*  notebook lines  */}
            <line x1="54" y1="298" x2="94" y2="298" stroke="#E2E8F0" strokeWidth="0.75"/>
            <line x1="54" y1="300" x2="94" y2="300" stroke="#E2E8F0" strokeWidth="0.75"/>
            <line x1="54" y1="302" x2="80" y2="302" stroke="#2563EB" strokeWidth="0.75" opacity="0.5"/>

            {/*  Floating notification: ranking improved  */}
            <rect x="295" y="200" width="148" height="44" rx="10" fill="white" stroke="#E5E7EB" strokeWidth="1" filter="url(#glow)"/>
            <rect x="295" y="200" width="4" height="44" rx="2" fill="#22C55E"/>
            <text x="308" y="217" font-family="sans-serif" font-size="8" font-weight="bold" fill="#111827">Ranking Improved! 🎉</text>
            <text x="308" y="230" font-family="sans-serif" font-size="7" fill="#6B7280">"seo services ohio" · #8 → #1</text>
            <text x="308" y="239" font-family="sans-serif" font-size="6" fill="#9CA3AF">Just now · Google Search Console</text>
            {/*  notification dot  */}
            <circle cx="437" cy="204" r="5" fill="#EF4444"/>
            <text x="437" y="207" font-family="sans-serif" font-size="5" fill="white" text-anchor="middle">!</text>

            {/*  Bottom: 4 discipline labels  */}
            <rect x="30" y="490" width="400" height="24" rx="8" fill="white" stroke="#E5E7EB" strokeWidth="1"/>
            {/*  dividers  */}
            <line x1="130" y1="490" x2="130" y2="514" stroke="#E5E7EB" strokeWidth="1"/>
            <line x1="230" y1="490" x2="230" y2="514" stroke="#E5E7EB" strokeWidth="1"/>
            <line x1="330" y1="490" x2="330" y2="514" stroke="#E5E7EB" strokeWidth="1"/>
            <text x="80" y="505" font-family="sans-serif" font-size="7" font-weight="bold" fill="#2563EB" text-anchor="middle">① Technical SEO</text>
            <text x="180" y="505" font-family="sans-serif" font-size="7" font-weight="bold" fill="#2563EB" text-anchor="middle">② On-Page &amp; Content</text>
            <text x="280" y="505" font-family="sans-serif" font-size="7" font-weight="bold" fill="#2563EB" text-anchor="middle">③ Local SEO</text>
            <text x="365" y="505" font-family="sans-serif" font-size="7" font-weight="bold" fill="#2563EB" text-anchor="middle">④ Link Building</text>
          </svg>
        </div>
      </div>
    </div>
  </div>
</section>



{/*  ══ STICKY IN-PAGE TAB NAV ════════════════════════  */}
<div className={`${styles['tab-nav']}`} ref={tabNavRef} role="navigation" aria-label="Page sections">
  <div className={`${styles['wrap']}`}>
    <div className={`${styles['tab-nav-inner']}`}>
      <a href="#technical-seo" className={`${styles['tab-link']} ${styles['active']}`} data-section="technical-seo">
        <span className={`${styles['tab-num']}`} aria-hidden="true">1</span>
        Technical SEO
      </a>
      <a href="#onpage-seo" className={`${styles['tab-link']}`} data-section="onpage-seo">
        <span className={`${styles['tab-num']}`} aria-hidden="true">2</span>
        On-Page &amp; Content
      </a>
      <a href="#local-seo" className={`${styles['tab-link']}`} data-section="local-seo">
        <span className={`${styles['tab-num']}`} aria-hidden="true">3</span>
        Local SEO
      </a>
      <a href="#link-building" className={`${styles['tab-link']}`} data-section="link-building">
        <span className={`${styles['tab-num']}`} aria-hidden="true">4</span>
        Link Building
      </a>
      <div className={`${styles['tab-cta']}`}>
        <a href="#cta">Start a Project →</a>
      </div>
    </div>
  </div>
</div>

{/*  ══════════════════════════════════════════════════
   DISCIPLINE 1 — TECHNICAL SEO
══════════════════════════════════════════════════  */}
<section className={`${styles['disc-section']}`} id="technical-seo" aria-labelledby="d1-title">
  <div className={`${styles['wrap']}`}>
    <div className={`${styles['disc-layout']}`}>

      {/*  LEFT: explanation  */}
      <div>
        <div className={`${styles['disc-num']} ${styles['reveal']}`}>
          <div className={`${styles['disc-num-badge']}`} aria-hidden="true">1</div>
                <h2 id="d1-title" className={`${styles['disc-h2']} ${styles['reveal']} ${styles['d1']}`}>Technical SEO<br/>Audits &amp; Fixes</h2>
        </div>
        <p className={`${styles['disc-intro']} ${styles['reveal']} ${styles['d2']}`}>Before content and links can do their job, the technical foundation has to be solid. Search engines need to crawl your site efficiently, index the right pages, and understand your content structure. Most sites have problems they don't know about. We find them, prioritise them, and fix them.</p>

        <div className={`${styles['reveal']} ${styles['d3']}`}>
          <p className={`${styles['deliv-label']}`}>What's included</p>
          <ul className={`${styles['deliv-list']}`} role="list">
            <li className={`${styles['deliv-item']}`} role="listitem">
              <svg className={`${styles['ci']}`} viewBox="0 0 22 22" fill="none" aria-hidden="true"><circle cx="11" cy="11" r="9.25" stroke="#3B82F6" strokeWidth="1.5"/><path d="M7 11l3 3 5-5" stroke="#3B82F6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
              Full site crawl — crawlability, indexing errors, orphaned pages, and broken links
            </li>
            <li className={`${styles['deliv-item']}`} role="listitem">
              <svg className={`${styles['ci']}`} viewBox="0 0 22 22" fill="none" aria-hidden="true"><circle cx="11" cy="11" r="9.25" stroke="#3B82F6" strokeWidth="1.5"/><path d="M7 11l3 3 5-5" stroke="#3B82F6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
              Core Web Vitals optimisation — LCP, CLS, INP — the metrics Google ranks on
            </li>
            <li className={`${styles['deliv-item']}`} role="listitem">
              <svg className={`${styles['ci']}`} viewBox="0 0 22 22" fill="none" aria-hidden="true"><circle cx="11" cy="11" r="9.25" stroke="#3B82F6" strokeWidth="1.5"/><path d="M7 11l3 3 5-5" stroke="#3B82F6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
              Schema markup and structured data for rich result eligibility
            </li>
            <li className={`${styles['deliv-item']}`} role="listitem">
              <svg className={`${styles['ci']}`} viewBox="0 0 22 22" fill="none" aria-hidden="true"><circle cx="11" cy="11" r="9.25" stroke="#3B82F6" strokeWidth="1.5"/><path d="M7 11l3 3 5-5" stroke="#3B82F6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
              Redirect architecture, canonical tags, duplicate content resolution
            </li>
            <li className={`${styles['deliv-item']}`} role="listitem">
              <svg className={`${styles['ci']}`} viewBox="0 0 22 22" fill="none" aria-hidden="true"><circle cx="11" cy="11" r="9.25" stroke="#3B82F6" strokeWidth="1.5"/><path d="M7 11l3 3 5-5" stroke="#3B82F6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
              XML sitemaps, robots.txt configuration, and crawl budget management
            </li>
          </ul>
        </div>

        <div className={`${styles['outcome-pills']} ${styles['reveal']} ${styles['d4']}`} role="list" aria-label="Outcomes">
          <span className={`${styles['o-pill']}`} role="listitem">Faster crawling</span>
          <span className={`${styles['o-pill']}`} role="listitem">Better indexing</span>
          <span className={`${styles['o-pill']}`} role="listitem">Rich results eligibility</span>
          <span className={`${styles['o-pill']}`} role="listitem">Mobile-first compliance</span>
        </div>

        <a href="#cta" className={`${styles['start-link']} ${styles['reveal']} ${styles['d4']}`} aria-label="Start a Technical SEO project">
          Start Project
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M3 8h10M9 4l4 4-4 4" stroke="#111827" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </a>
      </div>

      {/*  RIGHT: card + case study  */}
      <div className={`${styles['disc-right']} ${styles['reveal']} ${styles['d2']}`}>

        {/*  What's inside card  */}
        <div className={`${styles['inside-card']}`}>
          <div className={`${styles['inside-card-head']}`}>
            <div className={`${styles['inside-card-icon']}`} aria-hidden="true">
              <svg width="22" height="22" viewBox="0 0 22 22" fill="none"><path d="M11 3C6.58 3 3 6.58 3 11s3.58 8 8 8 8-3.58 8-8-3.58-8-8-8Z" stroke="#2563EB" strokeWidth="1.5"/><path d="M11 7v4l2.5 2.5" stroke="#2563EB" strokeWidth="1.5" strokeLinecap="round"/><path d="M8 3.5A8 8 0 003.5 8" stroke="#2563EB" strokeWidth="1.5" strokeLinecap="round"/></svg>
            </div>
            <div>
              <div className={`${styles['inside-card-title']}`}>Technical SEO Audit</div>
              <div className={`${styles['inside-card-sub']}`}>Delivered in Week 1 of every engagement</div>
            </div>
          </div>
          <div className={`${styles['inside-card-body']}`}>
            <ul className={`${styles['inside-items']}`} role="list">
              <li className={`${styles['inside-item']}`} role="listitem">
                <svg className={`${styles['ci']}`} viewBox="0 0 22 22" fill="none" aria-hidden="true"><circle cx="11" cy="11" r="9.25" stroke="#3B82F6" strokeWidth="1.5"/><path d="M7 11l3 3 5-5" stroke="#3B82F6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                Crawl report — every page, every error, every opportunity
              </li>
              <li className={`${styles['inside-item']}`} role="listitem">
                <svg className={`${styles['ci']}`} viewBox="0 0 22 22" fill="none" aria-hidden="true"><circle cx="11" cy="11" r="9.25" stroke="#3B82F6" strokeWidth="1.5"/><path d="M7 11l3 3 5-5" stroke="#3B82F6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                Prioritised fix list — sorted by impact, not complexity
              </li>
              <li className={`${styles['inside-item']}`} role="listitem">
                <svg className={`${styles['ci']}`} viewBox="0 0 22 22" fill="none" aria-hidden="true"><circle cx="11" cy="11" r="9.25" stroke="#3B82F6" strokeWidth="1.5"/><path d="M7 11l3 3 5-5" stroke="#3B82F6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                Core Web Vitals baseline with improvement targets
              </li>
              <li className={`${styles['inside-item']}`} role="listitem">
                <svg className={`${styles['ci']}`} viewBox="0 0 22 22" fill="none" aria-hidden="true"><circle cx="11" cy="11" r="9.25" stroke="#3B82F6" strokeWidth="1.5"/><path d="M7 11l3 3 5-5" stroke="#3B82F6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                Competitor technical benchmark
              </li>
            </ul>
          </div>
        </div>

        {/*  Discipline 1 illustration: site audit screen with crawl errors being resolved  */}
        <div className={`${styles['disc-illustration']} ${styles['reveal']} ${styles['d1']} hidden`} aria-label="Technical SEO audit in progress — errors being resolved" role="img">
          <svg viewBox="0 0 380 260" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: 'auto', display: 'block' }}>
            <defs>
              <linearGradient id="bgT" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#EEF4FF"/><stop offset="100%" stopColor="#F8FAFF"/></linearGradient>
            </defs>
            <rect width="380" height="260" rx="16" fill="url(#bgT)"/>

            {/*  laptop outline  */}
            <rect x="60" y="30" width="260" height="168" rx="10" fill="#1E293B" stroke="#334155" strokeWidth="1.5"/>
            <rect x="62" y="32" width="256" height="164" rx="9" fill="#0F172A"/>
            {/*  screen top bar  */}
            <rect x="62" y="32" width="256" height="18" rx="9" fill="#1E293B"/>
            <rect x="62" y="40" width="256" height="10" fill="#1E293B"/>
            <circle cx="76" cy="41" r="3.5" fill="#EF4444" opacity="0.8"/>
            <circle cx="86" cy="41" r="3.5" fill="#F59E0B" opacity="0.8"/>
            <circle cx="96" cy="41" r="3.5" fill="#22C55E" opacity="0.8"/>
            {/*  tab bar  */}
            <rect x="110" y="35" width="80" height="12" rx="3" fill="#334155"/>
            <text x="150" y="44" font-family="sans-serif" font-size="6" fill="#94A3B8" text-anchor="middle">SEO Audit Report</text>

            {/*  audit panel header  */}
            <text x="74" y="68" font-family="sans-serif" font-size="7" font-weight="bold" fill="#60A5FA">CRAWL AUDIT — 247 ISSUES FOUND</text>
            <rect x="74" y="72" width="224" height="1" fill="#1E3A5F"/>

            {/*  issue rows: before fix  */}
            <rect x="74" y="78" width="224" height="16" rx="4" fill="#1A2535"/>
            <circle cx="84" cy="86" r="4" fill="#EF4444"/>
            <text x="92" y="90" font-family="sans-serif" font-size="6.5" fill="#F87171">Missing meta descriptions (84 pages)</text>
            <text x="280" y="90" font-family="sans-serif" font-size="6" fill="#EF4444" text-anchor="end">CRITICAL</text>

            <rect x="74" y="98" width="224" height="16" rx="4" fill="#1A2535"/>
            <circle cx="84" cy="106" r="4" fill="#F59E0B"/>
            <text x="92" y="110" font-family="sans-serif" font-size="6.5" fill="#FCD34D">Slow LCP — 4.2s average (43 pages)</text>
            <text x="280" y="110" font-family="sans-serif" font-size="6" fill="#F59E0B" text-anchor="end">HIGH</text>

            <rect x="74" y="118" width="224" height="16" rx="4" fill="#1A2535"/>
            <circle cx="84" cy="126" r="4" fill="#F59E0B"/>
            <text x="92" y="130" font-family="sans-serif" font-size="6.5" fill="#FCD34D">Broken internal links (31 found)</text>
            <text x="280" y="130" font-family="sans-serif" font-size="6" fill="#F59E0B" text-anchor="end">HIGH</text>

            {/*  divider: after fix  */}
            <rect x="74" y="140" width="224" height="1" fill="#1E3A5F"/>
            <text x="74" y="152" font-family="sans-serif" font-size="7" font-weight="bold" fill="#34D399">AFTER ZEVENSTONE FIX ↓</text>

            <rect x="74" y="158" width="224" height="16" rx="4" fill="#052E16" stroke="#14532D" strokeWidth="0.75"/>
            <circle cx="84" cy="166" r="4" fill="#22C55E"/>
            <text x="92" y="170" font-family="sans-serif" font-size="6.5" fill="#86EFAC">All meta descriptions added &amp; optimised</text>
            <text x="280" y="170" font-family="sans-serif" font-size="6" fill="#22C55E" text-anchor="end">FIXED ✓</text>

            <rect x="74" y="178" width="224" height="16" rx="4" fill="#052E16" stroke="#14532D" strokeWidth="0.75"/>
            <circle cx="84" cy="186" r="4" fill="#22C55E"/>
            <text x="92" y="190" font-family="sans-serif" font-size="6.5" fill="#86EFAC">LCP improved to 1.4s — 94/100 score</text>
            <text x="280" y="190" font-family="sans-serif" font-size="6" fill="#22C55E" text-anchor="end">FIXED ✓</text>

            {/*  laptop base  */}
            <rect x="45" y="198" width="290" height="10" rx="3" fill="#1E293B" stroke="#334155" strokeWidth="1"/>
            <rect x="145" y="208" width="90" height="4" rx="2" fill="#0F172A"/>

            {/*  CWV score pill  */}
            <rect x="250" y="212" width="90" height="28" rx="10" fill="white" stroke="#E5E7EB" strokeWidth="1"/>
            <text x="295" y="223" font-family="sans-serif" font-size="7" font-weight="bold" fill="#111827" text-anchor="middle">Core Web Vitals</text>
            <text x="295" y="234" font-family="sans-serif" font-size="9" font-weight="bold" fill="#22C55E" text-anchor="middle">94 / 100 ✓</text>

            {/*  page speed pill  */}
            <rect x="40" y="212" width="90" height="28" rx="10" fill="white" stroke="#E5E7EB" strokeWidth="1"/>
            <text x="85" y="223" font-family="sans-serif" font-size="7" font-weight="bold" fill="#111827" text-anchor="middle">Issues Resolved</text>
            <text x="85" y="234" font-family="sans-serif" font-size="9" font-weight="bold" fill="#2563EB" text-anchor="middle">247 → 0 ✓</text>
          </svg>
        </div>

        {/*  Case study card — with client logo  */}
        <a href="/stories/technical-seo-professional-services" className={`${styles['cs-card']}`} aria-label="Read case study: From invisible to page one in 6 months">
          
          <span className={`${styles['cs-tag']}`}>Case Study · Technical SEO</span>
          <div className={`${styles['cs-metric']}`}>6 Months</div>
          <div className={`${styles['cs-title']}`}>From Zero to Page One — Professional Services Firm</div>
          <div className={`${styles['cs-desc']}`}>A firm with a technically broken site and zero organic presence. Full technical rebuild, schema implementation, and crawl fix. Page one for 14 commercial terms in 6 months.</div>
          <span className={`${styles['cs-link']}`}>
            Read the full story
            <svg width="13" height="13" viewBox="0 0 13 13" fill="none" aria-hidden="true"><path d="M2 6.5h9M8 3l3 3.5L8 10" stroke="rgba(255,255,255,0.85)" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </span>
        </a>

      </div>
    </div>
  </div>
</section>

<div className={`${styles['divider']}`}></div>

{/*  ══════════════════════════════════════════════════
   DISCIPLINE 2 — ON-PAGE & CONTENT SEO
══════════════════════════════════════════════════  */}
<section className={`${styles['disc-section']}`} id="onpage-seo" aria-labelledby="d2-title">
  <div className={`${styles['wrap']}`}>
    <div className={`${styles['disc-layout']}`}>

      {/*  LEFT (flipped to right on desktop)  */}
      <div>
        <div className={`${styles['disc-num']} ${styles['reveal']}`}>
          <div className={`${styles['disc-num-badge']}`} aria-hidden="true">2</div>
                 <h2 id="d2-title" className={`${styles['disc-h2']} ${styles['reveal']} ${styles['d1']}`}>On-Page &amp;<br/>Content SEO</h2>
        </div>
        <p className={`${styles['disc-intro']} ${styles['reveal']} ${styles['d2']}`}>Getting found is one thing. Getting found for the searches that convert is another. We research intent, map content to buying stages, and optimise every page to earn rankings for the terms your customers actually use when they're ready to act.</p>

        <div className={`${styles['reveal']} ${styles['d3']}`}>
          <p className={`${styles['deliv-label']}`}>What's included</p>
          <ul className={`${styles['deliv-list']}`} role="list">
            <li className={`${styles['deliv-item']}`} role="listitem">
              <svg className={`${styles['ci']}`} viewBox="0 0 22 22" fill="none" aria-hidden="true"><circle cx="11" cy="11" r="9.25" stroke="#3B82F6" strokeWidth="1.5"/><path d="M7 11l3 3 5-5" stroke="#3B82F6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
              Commercial keyword research mapped to buyer intent and funnel stage
            </li>
            <li className={`${styles['deliv-item']}`} role="listitem">
              <svg className={`${styles['ci']}`} viewBox="0 0 22 22" fill="none" aria-hidden="true"><circle cx="11" cy="11" r="9.25" stroke="#3B82F6" strokeWidth="1.5"/><path d="M7 11l3 3 5-5" stroke="#3B82F6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
              Title tags, meta descriptions, header structure and internal linking
            </li>
            <li className={`${styles['deliv-item']}`} role="listitem">
              <svg className={`${styles['ci']}`} viewBox="0 0 22 22" fill="none" aria-hidden="true"><circle cx="11" cy="11" r="9.25" stroke="#3B82F6" strokeWidth="1.5"/><path d="M7 11l3 3 5-5" stroke="#3B82F6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
              Content gap analysis — what your competitors rank for that you don't
            </li>
            <li className={`${styles['deliv-item']}`} role="listitem">
              <svg className={`${styles['ci']}`} viewBox="0 0 22 22" fill="none" aria-hidden="true"><circle cx="11" cy="11" r="9.25" stroke="#3B82F6" strokeWidth="1.5"/><path d="M7 11l3 3 5-5" stroke="#3B82F6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
              SEO-led content creation that ranks and converts — not just word count
            </li>
            <li className={`${styles['deliv-item']}`} role="listitem">
              <svg className={`${styles['ci']}`} viewBox="0 0 22 22" fill="none" aria-hidden="true"><circle cx="11" cy="11" r="9.25" stroke="#3B82F6" strokeWidth="1.5"/><path d="M7 11l3 3 5-5" stroke="#3B82F6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
              Topic cluster architecture — pillar pages and supporting content mapped
            </li>
          </ul>
        </div>

        <div className={`${styles['outcome-pills']} ${styles['reveal']} ${styles['d4']}`} role="list" aria-label="Outcomes">
          <span className={`${styles['o-pill']}`} role="listitem">Higher intent traffic</span>
          <span className={`${styles['o-pill']}`} role="listitem">Better conversion</span>
          <span className={`${styles['o-pill']}`} role="listitem">Topical authority</span>
          <span className={`${styles['o-pill']}`} role="listitem">Content that compounds</span>
        </div>

        <a href="#cta" className={`${styles['start-link']} ${styles['reveal']} ${styles['d4']}`} aria-label="Start an On-Page SEO project">
          Start Project
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M3 8h10M9 4l4 4-4 4" stroke="#111827" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </a>
      </div>

      {/*  RIGHT  */}
      <div className={`${styles['disc-right']} ${styles['reveal']} ${styles['d2']}`}>

        {/*  What's inside card  */}
        <div className={`${styles['inside-card']}`}>
          <div className={`${styles['inside-card-head']}`}>
            <div className={`${styles['inside-card-icon']}`} aria-hidden="true">
              <svg width="22" height="22" viewBox="0 0 22 22" fill="none"><path d="M11 3C6.58 3 3 6.58 3 11s3.58 8 8 8 8-3.58 8-8-3.58-8-8-8Z" stroke="#2563EB" strokeWidth="1.5"/><path d="M11 7v4l2.5 2.5" stroke="#2563EB" strokeWidth="1.5" strokeLinecap="round"/><path d="M8 3.5A8 8 0 003.5 8" stroke="#2563EB" strokeWidth="1.5" strokeLinecap="round"/></svg>
            </div>
            <div>
              <div className={`${styles['inside-card-title']}`}>Technical SEO Audit</div>
              <div className={`${styles['inside-card-sub']}`}>Delivered in Week 1 of every engagement</div>
            </div>
          </div>
          <div className={`${styles['inside-card-body']}`}>
            <ul className={`${styles['inside-items']}`} role="list">
              <li className={`${styles['inside-item']}`} role="listitem">
                <svg className={`${styles['ci']}`} viewBox="0 0 22 22" fill="none" aria-hidden="true"><circle cx="11" cy="11" r="9.25" stroke="#3B82F6" strokeWidth="1.5"/><path d="M7 11l3 3 5-5" stroke="#3B82F6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                Crawl report — every page, every error, every opportunity
              </li>
              <li className={`${styles['inside-item']}`} role="listitem">
                <svg className={`${styles['ci']}`} viewBox="0 0 22 22" fill="none" aria-hidden="true"><circle cx="11" cy="11" r="9.25" stroke="#3B82F6" strokeWidth="1.5"/><path d="M7 11l3 3 5-5" stroke="#3B82F6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                Prioritised fix list — sorted by impact, not complexity
              </li>
              <li className={`${styles['inside-item']}`} role="listitem">
                <svg className={`${styles['ci']}`} viewBox="0 0 22 22" fill="none" aria-hidden="true"><circle cx="11" cy="11" r="9.25" stroke="#3B82F6" strokeWidth="1.5"/><path d="M7 11l3 3 5-5" stroke="#3B82F6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                Core Web Vitals baseline with improvement targets
              </li>
              <li className={`${styles['inside-item']}`} role="listitem">
                <svg className={`${styles['ci']}`} viewBox="0 0 22 22" fill="none" aria-hidden="true"><circle cx="11" cy="11" r="9.25" stroke="#3B82F6" strokeWidth="1.5"/><path d="M7 11l3 3 5-5" stroke="#3B82F6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                Competitor technical benchmark
              </li>
            </ul>
          </div>
        </div>

        <a href="/stories/content-seo-b2b-saas" className={`${styles['cs-card']}`} aria-label="Read case study: Organic becomes number one acquisition channel">
      
          <span className={`${styles['cs-tag']}`}>Case Study · On-Page &amp; Content SEO</span>
          <div className={`${styles['cs-metric']}`}>#1 Channel</div>
          <div className={`${styles['cs-title']}`}>Organic Overtook Paid — B2B SaaS, North America</div>
          <div className={`${styles['cs-desc']}`}>A SaaS company spending 60% of revenue on paid ads. 12 months of content SEO and on-page work later — organic became their primary acquisition channel at 4.8× the return.</div>
          <span className={`${styles['cs-link']}`}>
            Read the full story
            <svg width="13" height="13" viewBox="0 0 13 13" fill="none" aria-hidden="true"><path d="M2 6.5h9M8 3l3 3.5L8 10" stroke="rgba(255,255,255,0.85)" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </span>
        </a>
      </div>

    </div>
  </div>
</section>

<div className={`${styles['divider']}`}></div>

{/*  ══════════════════════════════════════════════════
   DISCIPLINE 3 — LOCAL SEO
══════════════════════════════════════════════════  */}
<section className={`${styles['disc-section']}`} id="local-seo" aria-labelledby="d3-title">
  <div className={`${styles['wrap']}`}>
    <div className={`${styles['disc-layout']}`}>

      <div>
        <div className={`${styles['disc-num']} ${styles['reveal']}`}>
          <div className={`${styles['disc-num-badge']}`} aria-hidden="true">3</div>
                  <h2 id="d3-title" className={`${styles['disc-h2']} ${styles['reveal']} ${styles['d1']}`}>Local SEO</h2>
        </div>
        <p className={`${styles['disc-intro']} ${styles['reveal']} ${styles['d2']}`}>When someone searches for your service in your city, you need to be visible — in the map pack, in organic results, and on the directories where buying decisions are made. We build local authority systematically, so your business becomes the obvious choice in your market.</p>

        <div className={`${styles['reveal']} ${styles['d3']}`}>
          <p className={`${styles['deliv-label']}`}>What's included</p>
          <ul className={`${styles['deliv-list']}`} role="list">
            <li className={`${styles['deliv-item']}`} role="listitem">
              <svg className={`${styles['ci']}`} viewBox="0 0 22 22" fill="none" aria-hidden="true"><circle cx="11" cy="11" r="9.25" stroke="#3B82F6" strokeWidth="1.5"/><path d="M7 11l3 3 5-5" stroke="#3B82F6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
              Google Business Profile setup, optimisation, and ongoing management
            </li>
            <li className={`${styles['deliv-item']}`} role="listitem">
              <svg className={`${styles['ci']}`} viewBox="0 0 22 22" fill="none" aria-hidden="true"><circle cx="11" cy="11" r="9.25" stroke="#3B82F6" strokeWidth="1.5"/><path d="M7 11l3 3 5-5" stroke="#3B82F6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
              Local citation building and NAP consistency across all directories
            </li>
            <li className={`${styles['deliv-item']}`} role="listitem">
              <svg className={`${styles['ci']}`} viewBox="0 0 22 22" fill="none" aria-hidden="true"><circle cx="11" cy="11" r="9.25" stroke="#3B82F6" strokeWidth="1.5"/><path d="M7 11l3 3 5-5" stroke="#3B82F6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
              Geo-targeted landing pages — one per service area where relevant
            </li>
            <li className={`${styles['deliv-item']}`} role="listitem">
              <svg className={`${styles['ci']}`} viewBox="0 0 22 22" fill="none" aria-hidden="true"><circle cx="11" cy="11" r="9.25" stroke="#3B82F6" strokeWidth="1.5"/><path d="M7 11l3 3 5-5" stroke="#3B82F6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
              Review generation strategy and ongoing reputation management
            </li>
            <li className={`${styles['deliv-item']}`} role="listitem">
              <svg className={`${styles['ci']}`} viewBox="0 0 22 22" fill="none" aria-hidden="true"><circle cx="11" cy="11" r="9.25" stroke="#3B82F6" strokeWidth="1.5"/><path d="M7 11l3 3 5-5" stroke="#3B82F6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
              Local pack ranking tracking — monitored weekly per keyword per location
            </li>
          </ul>
        </div>

        <div className={`${styles['outcome-pills']} ${styles['reveal']} ${styles['d4']}`} role="list" aria-label="Outcomes">
          <span className={`${styles['o-pill']}`} role="listitem">Map pack visibility</span>
          <span className={`${styles['o-pill']}`} role="listitem">Local trust signals</span>
          <span className={`${styles['o-pill']}`} role="listitem">More reviews</span>
          <span className={`${styles['o-pill']}`} role="listitem">Multi-location scale</span>
        </div>

        <a href="#cta" className={`${styles['start-link']} ${styles['reveal']} ${styles['d4']}`} aria-label="Start a Local SEO project">
          Start Project
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M3 8h10M9 4l4 4-4 4" stroke="#111827" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </a>
      </div>

      <div className={`${styles['disc-right']} ${styles['reveal']} ${styles['d2']}`}>

        {/*  Discipline 3 illustration: map pack dominance visual  */}
         {/*  What's inside card  */}
        <div className={`${styles['inside-card']}`}>
          <div className={`${styles['inside-card-head']}`}>
            <div className={`${styles['inside-card-icon']}`} aria-hidden="true">
              <svg width="22" height="22" viewBox="0 0 22 22" fill="none"><path d="M11 3C6.58 3 3 6.58 3 11s3.58 8 8 8 8-3.58 8-8-3.58-8-8-8Z" stroke="#2563EB" strokeWidth="1.5"/><path d="M11 7v4l2.5 2.5" stroke="#2563EB" strokeWidth="1.5" strokeLinecap="round"/><path d="M8 3.5A8 8 0 003.5 8" stroke="#2563EB" strokeWidth="1.5" strokeLinecap="round"/></svg>
            </div>
            <div>
              <div className={`${styles['inside-card-title']}`}>Local SEO Deliverables</div>
              <div className={`${styles['inside-card-sub']}`}>Delivered in Week 1 of every engagement</div>
            </div>
          </div>
          <div className={`${styles['inside-card-body']}`}>
            <ul className={`${styles['inside-items']}`} role="list">
              <li className={`${styles['inside-item']}`} role="listitem">
                <svg className={`${styles['ci']}`} viewBox="0 0 22 22" fill="none" aria-hidden="true"><circle cx="11" cy="11" r="9.25" stroke="#3B82F6" strokeWidth="1.5"/><path d="M7 11l3 3 5-5" stroke="#3B82F6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                Crawl report — every page, every error, every opportunity
              </li>
              <li className={`${styles['inside-item']}`} role="listitem">
                <svg className={`${styles['ci']}`} viewBox="0 0 22 22" fill="none" aria-hidden="true"><circle cx="11" cy="11" r="9.25" stroke="#3B82F6" strokeWidth="1.5"/><path d="M7 11l3 3 5-5" stroke="#3B82F6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                Prioritised fix list — sorted by impact, not complexity
              </li>
              <li className={`${styles['inside-item']}`} role="listitem">
                <svg className={`${styles['ci']}`} viewBox="0 0 22 22" fill="none" aria-hidden="true"><circle cx="11" cy="11" r="9.25" stroke="#3B82F6" strokeWidth="1.5"/><path d="M7 11l3 3 5-5" stroke="#3B82F6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                Core Web Vitals baseline with improvement targets
              </li>
              <li className={`${styles['inside-item']}`} role="listitem">
                <svg className={`${styles['ci']}`} viewBox="0 0 22 22" fill="none" aria-hidden="true"><circle cx="11" cy="11" r="9.25" stroke="#3B82F6" strokeWidth="1.5"/><path d="M7 11l3 3 5-5" stroke="#3B82F6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                Competitor technical benchmark
              </li>
            </ul>
          </div>
        </div>
        
        <a href="/stories/local-seo-multi-location" className={`${styles['cs-card']}`} aria-label="Read case study: Multi-location local SEO dominance">
          <span className={`${styles['cs-tag']}`}>Case Study · Local SEO</span>
          <div className={`${styles['cs-metric']}`}>Top 3</div>
          <div className={`${styles['cs-title']}`}>Map Pack Dominance Across 8 Locations</div>
          <div className={`${styles['cs-desc']}`}>A regional service business invisible in local search. 90 days of GBP optimisation, citation building, and local page creation — top 3 map pack positions across all 8 service areas.</div>
          <span className={`${styles['cs-link']}`}>
            Read the full story
            <svg width="13" height="13" viewBox="0 0 13 13" fill="none" aria-hidden="true"><path d="M2 6.5h9M8 3l3 3.5L8 10" stroke="rgba(255,255,255,0.85)" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </span>
        </a>
      </div>

    </div>
  </div>
</section>

<div className={`${styles['divider']}`}></div>

{/*  ══════════════════════════════════════════════════
   DISCIPLINE 4 — LINK BUILDING
══════════════════════════════════════════════════  */}
<section className={`${styles['disc-section']}`} id="link-building" aria-labelledby="d4-title">
  <div className={`${styles['wrap']}`}>
    <div className={`${styles['disc-layout']}`}>

      <div>
        <div className={`${styles['disc-num']} ${styles['reveal']}`}>
          <div className={`${styles['disc-num-badge']}`} aria-hidden="true">4</div>
              <h2 id="d4-title" className={`${styles['disc-h2']} ${styles['reveal']} ${styles['d1']}`}>Link Building</h2>
        </div>
        <p className={`${styles['disc-intro']} ${styles['reveal']} ${styles['d2']}`}>Authority is what separates page one from page five. Links from relevant, high-quality domains signal to Google that your content is worth ranking. We build authority through white-hat outreach, digital PR, and strategic partnerships — not shortcuts that get penalised.</p>

        <div className={`${styles['reveal']} ${styles['d3']}`}>
          <p className={`${styles['deliv-label']}`}>What's included</p>
          <ul className={`${styles['deliv-list']}`} role="list">
            <li className={`${styles['deliv-item']}`} role="listitem">
              <svg className={`${styles['ci']}`} viewBox="0 0 22 22" fill="none" aria-hidden="true"><circle cx="11" cy="11" r="9.25" stroke="#3B82F6" strokeWidth="1.5"/><path d="M7 11l3 3 5-5" stroke="#3B82F6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
              White-hat outreach to high-authority, topically relevant domains
            </li>
            <li className={`${styles['deliv-item']}`} role="listitem">
              <svg className={`${styles['ci']}`} viewBox="0 0 22 22" fill="none" aria-hidden="true"><circle cx="11" cy="11" r="9.25" stroke="#3B82F6" strokeWidth="1.5"/><path d="M7 11l3 3 5-5" stroke="#3B82F6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
              Digital PR — linkable asset creation and media placement
            </li>
            <li className={`${styles['deliv-item']}`} role="listitem">
              <svg className={`${styles['ci']}`} viewBox="0 0 22 22" fill="none" aria-hidden="true"><circle cx="11" cy="11" r="9.25" stroke="#3B82F6" strokeWidth="1.5"/><path d="M7 11l3 3 5-5" stroke="#3B82F6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
              Competitor backlink gap analysis — building where they have authority you don't
            </li>
            <li className={`${styles['deliv-item']}`} role="listitem">
              <svg className={`${styles['ci']}`} viewBox="0 0 22 22" fill="none" aria-hidden="true"><circle cx="11" cy="11" r="9.25" stroke="#3B82F6" strokeWidth="1.5"/><path d="M7 11l3 3 5-5" stroke="#3B82F6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
              Toxic backlink identification and disavow file management
            </li>
            <li className={`${styles['deliv-item']}`} role="listitem">
              <svg className={`${styles['ci']}`} viewBox="0 0 22 22" fill="none" aria-hidden="true"><circle cx="11" cy="11" r="9.25" stroke="#3B82F6" strokeWidth="1.5"/><path d="M7 11l3 3 5-5" stroke="#3B82F6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
              Monthly link acquisition report — every link, every domain, every metric
            </li>
          </ul>
        </div>

        <div className={`${styles['outcome-pills']} ${styles['reveal']} ${styles['d4']}`} role="list" aria-label="Outcomes">
          <span className={`${styles['o-pill']}`} role="listitem">Domain authority</span>
          <span className={`${styles['o-pill']}`} role="listitem">Ranking acceleration</span>
          <span className={`${styles['o-pill']}`} role="listitem">Brand mentions</span>
          <span className={`${styles['o-pill']}`} role="listitem">Referral traffic</span>
        </div>

        <a href="#cta" className={`${styles['start-link']} ${styles['reveal']} ${styles['d4']}`} aria-label="Start a Link Building project">
          Start Project
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M3 8h10M9 4l4 4-4 4" stroke="#111827" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </a>
      </div>

      <div className={`${styles['disc-right']} ${styles['reveal']} ${styles['d2']}`}>

        {/*  Discipline 4 illustration: domain authority network + link pipeline  */}
           <div className={`${styles['inside-card']}`}>
          <div className={`${styles['inside-card-head']}`}>
            <div className={`${styles['inside-card-icon']}`} aria-hidden="true">
              <svg width="22" height="22" viewBox="0 0 22 22" fill="none"><path d="M11 3C6.58 3 3 6.58 3 11s3.58 8 8 8 8-3.58 8-8-3.58-8-8-8Z" stroke="#2563EB" strokeWidth="1.5"/><path d="M11 7v4l2.5 2.5" stroke="#2563EB" strokeWidth="1.5" strokeLinecap="round"/><path d="M8 3.5A8 8 0 003.5 8" stroke="#2563EB" strokeWidth="1.5" strokeLinecap="round"/></svg>
            </div>
            <div>
              <div className={`${styles['inside-card-title']}`}>Monthly Link Building</div>
              <div className={`${styles['inside-card-sub']}`}>Delivered in Week 1 of every engagement</div>
            </div>
          </div>
          <div className={`${styles['inside-card-body']}`}>
            <ul className={`${styles['inside-items']}`} role="list">
              <li className={`${styles['inside-item']}`} role="listitem">
                <svg className={`${styles['ci']}`} viewBox="0 0 22 22" fill="none" aria-hidden="true"><circle cx="11" cy="11" r="9.25" stroke="#3B82F6" strokeWidth="1.5"/><path d="M7 11l3 3 5-5" stroke="#3B82F6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                Crawl report — every page, every error, every opportunity
              </li>
              <li className={`${styles['inside-item']}`} role="listitem">
                <svg className={`${styles['ci']}`} viewBox="0 0 22 22" fill="none" aria-hidden="true"><circle cx="11" cy="11" r="9.25" stroke="#3B82F6" strokeWidth="1.5"/><path d="M7 11l3 3 5-5" stroke="#3B82F6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                Prioritised fix list — sorted by impact, not complexity
              </li>
              <li className={`${styles['inside-item']}`} role="listitem">
                <svg className={`${styles['ci']}`} viewBox="0 0 22 22" fill="none" aria-hidden="true"><circle cx="11" cy="11" r="9.25" stroke="#3B82F6" strokeWidth="1.5"/><path d="M7 11l3 3 5-5" stroke="#3B82F6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                Core Web Vitals baseline with improvement targets
              </li>
              <li className={`${styles['inside-item']}`} role="listitem">
                <svg className={`${styles['ci']}`} viewBox="0 0 22 22" fill="none" aria-hidden="true"><circle cx="11" cy="11" r="9.25" stroke="#3B82F6" strokeWidth="1.5"/><path d="M7 11l3 3 5-5" stroke="#3B82F6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                Competitor technical benchmark
              </li>
            </ul>
          </div>
        </div>

        <a href="/stories/link-building-e-commerce" className={`${styles['cs-card']}`} aria-label="Read case study: Link building drives e-commerce revenue">
          <span className={`${styles['cs-tag']}`}>Case Study · Link Building</span>
          <div className={`${styles['cs-metric']}`}>+189%</div>
          <div className={`${styles['cs-title']}`}>Authority Built, Revenue Followed — E-Commerce</div>
          <div className={`${styles['cs-desc']}`}>An e-commerce brand stuck on page 2 for high-intent product terms. 8 months of structured link outreach and digital PR — 189% organic revenue growth as authority compounded.</div>
          <span className={`${styles['cs-link']}`}>
            Read the full story
            <svg width="13" height="13" viewBox="0 0 13 13" fill="none" aria-hidden="true"><path d="M2 6.5h9M8 3l3 3.5L8 10" stroke="rgba(255,255,255,0.85)" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </span>
        </a>
      </div>

    </div>
  </div>
</section>

{/*  ══ STATS BAR ══════════════════════════════════════  */}
<div className={`${styles['stats-bar']}`} role="region" aria-label="SEO performance statistics">
  <div className={`${styles['stats-track']}`} aria-hidden="true">
    <div className={`${styles['s-item']}`}><span className={`${styles['s-val']}`}>+312%</span><span className={`${styles['s-lbl']}`}>Avg. Organic Traffic Growth</span></div>
    <div className={`${styles['s-item']}`}><span className={`${styles['s-val']}`}>Page 1</span><span className={`${styles['s-lbl']}`}>Google Rankings in 6 Months</span></div>
    <div className={`${styles['s-item']}`}><span className={`${styles['s-val']}`}>4.8×</span><span className={`${styles['s-lbl']}`}>ROI vs Paid Acquisition</span></div>
    <div className={`${styles['s-item']}`}><span className={`${styles['s-val']}`}>Top 3</span><span className={`${styles['s-lbl']}`}>Map Pack Results, Local SEO</span></div>
    <div className={`${styles['s-item']}`}><span className={`${styles['s-val']}`}>+189%</span><span className={`${styles['s-lbl']}`}>Organic Revenue, E-Commerce</span></div>
    <div className={`${styles['s-item']}`}><span className={`${styles['s-val']}`}>DA 40+</span><span className={`${styles['s-lbl']}`}>Every Link Placed, Guaranteed</span></div>
    <div className={`${styles['s-item']}`}><span className={`${styles['s-val']}`}>+312%</span><span className={`${styles['s-lbl']}`}>Avg. Organic Traffic Growth</span></div>
    <div className={`${styles['s-item']}`}><span className={`${styles['s-val']}`}>Page 1</span><span className={`${styles['s-lbl']}`}>Google Rankings in 6 Months</span></div>
    <div className={`${styles['s-item']}`}><span className={`${styles['s-val']}`}>4.8×</span><span className={`${styles['s-lbl']}`}>ROI vs Paid Acquisition</span></div>
    <div className={`${styles['s-item']}`}><span className={`${styles['s-val']}`}>Top 3</span><span className={`${styles['s-lbl']}`}>Map Pack Results, Local SEO</span></div>
    <div className={`${styles['s-item']}`}><span className={`${styles['s-val']}`}>+189%</span><span className={`${styles['s-lbl']}`}>Organic Revenue, E-Commerce</span></div>
    <div className={`${styles['s-item']}`}><span className={`${styles['s-val']}`}>DA 40+</span><span className={`${styles['s-lbl']}`}>Every Link Placed, Guaranteed</span></div>
  </div>
</div>

{/*  ══ PROCESS ════════════════════════════════════════  */}
<section className={`${styles['process-section']}`} aria-labelledby="proc-title">
  <div className={`${styles['wrap']}`}>
    <div className={`${styles['process-layout']}`}>
      <div>
        <span className={`${styles['sec-label']} ${styles['reveal']}`}>Our Approach</span>
        <h2 id="proc-title" className={`${styles['sec-title']} ${styles['reveal']} ${styles['d1']}`}>How We Build<br/>Your SEO System</h2>
        <div className={`${styles['process-steps']} ${styles['reveal']} ${styles['d2']}`} role="list" aria-label="Engagement process steps">
          <div className={`${styles['p-step']}`} role="listitem">
            <div className={`${styles['p-circle']}`} aria-label="Step 1">01</div>
            <div className={`${styles['p-body']}`}>
              <h4>Discovery &amp; Audit</h4>
              <p>Full technical audit, competitor mapping, and keyword opportunity analysis — aligned to your revenue goals, not generic traffic targets.</p>
            </div>
          </div>
          <div className={`${styles['p-step']}`} role="listitem">
            <div className={`${styles['p-circle']}`} aria-label="Step 2">02</div>
            <div className={`${styles['p-body']}`}>
              <h4>Strategy &amp; Roadmap</h4>
              <p>A prioritised 12-month roadmap: quick wins first, compounding plays built in. You know exactly what's happening and why.</p>
            </div>
          </div>
          <div className={`${styles['p-step']}`} role="listitem">
            <div className={`${styles['p-circle']}`} aria-label="Step 3">03</div>
            <div className={`${styles['p-body']}`}>
              <h4>Implementation</h4>
              <p>Technical fixes, content creation, local setup, and link outreach run in coordinated monthly sprints — all four disciplines working together.</p>
            </div>
          </div>
          <div className={`${styles['p-step']}`} role="listitem">
            <div className={`${styles['p-circle']}`} aria-label="Step 4">04</div>
            <div className={`${styles['p-body']}`}>
              <h4>Measure &amp; Iterate</h4>
              <p>Monthly reporting tied to business outcomes — traffic, rankings, conversions, and revenue. Never vanity metrics.</p>
            </div>
          </div>
        </div>
      </div>

      <div className={`${styles['reveal']} ${styles['d2']}`}>
        <p className={`${styles['process-right-copy']}`}>SEO without a system is just guesswork. We build all four disciplines — technical, content, local, and links — as one coordinated engine. Each one makes the others more effective.</p>
        <p className={`${styles['process-right-copy']}`}>The result compounds. Month 12 outperforms month 6 by more than month 6 outperforms month 3. That's the asset you're building.</p>
        <a href="#cta" className={`${styles['btn-primary']}`} style={{ marginBottom: '28px', display: 'inline-flex' }}>Get Your Free SEO Audit →</a>
        <div className={`${styles['timeline-card']}`}>
          <h4>What to Expect, Month by Month</h4>
          <div className={`${styles['t-items']}`} role="list">
            <div className={`${styles['t-item']} ${styles['deliv-item']}`} role="listitem">
              <svg className={`${styles['ci']}`} viewBox="0 0 22 22" fill="none" aria-hidden="true"><circle cx="11" cy="11" r="9.25" stroke="#3B82F6" strokeWidth="1.5"/><path d="M7 11l3 3 5-5" stroke="#3B82F6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
              <span><strong>Months 1–3:</strong> Technical foundation, keyword map, initial content, GBP setup</span>
            </div>
            <div className={`${styles['t-item']} ${styles['deliv-item']}`} role="listitem">
              <svg className={`${styles['ci']}`} viewBox="0 0 22 22" fill="none" aria-hidden="true"><circle cx="11" cy="11" r="9.25" stroke="#3B82F6" strokeWidth="1.5"/><path d="M7 11l3 3 5-5" stroke="#3B82F6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
              <span><strong>Months 4–6:</strong> Rankings movement, traffic growth, first case study wins</span>
            </div>
            <div className={`${styles['t-item']} ${styles['deliv-item']}`} role="listitem">
              <svg className={`${styles['ci']}`} viewBox="0 0 22 22" fill="none" aria-hidden="true"><circle cx="11" cy="11" r="9.25" stroke="#3B82F6" strokeWidth="1.5"/><path d="M7 11l3 3 5-5" stroke="#3B82F6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
              <span><strong>Months 7–12:</strong> Compounding authority, measurable revenue contribution</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

{/*  ══ ALL CASE STUDIES ═══════════════════════════════  */}
<section className={`${styles['cases-section']}`} aria-labelledby="cases-title">
   {/*  FAQ side CTA  */}
      <div className={`${styles['reveal']} ${styles['d2']} ${styles['wrap']} !pb-32`}>
        <div className={`${styles['faq-cta-box']} flex flex-col lg:flex-row items-center gap-8`}>
          <div>
            <img src="https://cdn.sanity.io/images/h79epwt4/production/f814e36c06076363f494c138df6bd48c46ad33cb-2817x1875.webp" 
           className='w-[350px] h-[233px]' />
          </div>
          <div>
          <h3>Not sure where to start?</h3>
          <p>We'll audit your current SEO position, identify your biggest gaps across all four disciplines, and show you exactly what needs to happen — at no cost.</p>
          <a href="#cta" className={`${styles['btn-white-sm']}`}>Get Your Free SEO Audit →</a>
          <p className={`${styles['faq-trust-note']} !text-left`}>No commitment. No pitch. Just clarity on what's possible.</p>
          </div>
        </div>
      </div>
  <div className={`${styles['wrap']}`}>
    <div className={`${styles['tc']}`}>
      <span className={`${styles['sec-label']} ${styles['reveal']}`}>Case Studies</span>
      <h2 id="cases-title" className={`${styles['sec-title']} ${styles['reveal']} ${styles['d1']}`}>SEO That Moved<br/>the Revenue Needle.</h2>
      <p className={`${styles['sec-sub']} ${styles['reveal']} ${styles['d2']}`}>Four disciplines. Four different business challenges. One consistent outcome — measurable growth tied to organic search.</p>
    </div>

    

    <div className={`${styles['cs-rich-grid']} ${styles['reveal']} ${styles['d2']}`}>

      {/*  ── CASE 1: Technical SEO ──  */}
      <a href="/stories/technical-seo-professional-services" className={`${styles['cs-rich-card']} ${styles['tech']}`} aria-label="Read case study: Technical SEO for Professional Services">
        <div className={styles['cs-header']}>
          <div className={styles['cs-header-top']}>
            <span className={`${styles['cs-tag-pill']} ${styles['tech']}`}>Technical SEO</span>
          </div>
          <div className={styles['cs-header-main']}>
            <div className={styles['cs-client']}>
              <div className={`${styles['cs-logo-box']} ${styles['tech']}`} aria-hidden="true">
                <img src="https://cdn.sanity.io/images/h79epwt4/production/29e9bff3bb707e511513b8dc5e4a61895b97eaf0-484x200.png" alt="Professional Services Firm logo" className='w-full h-auto' />
              </div>
            </div>
            <div className={`${styles['cs-main-metric']} ${styles['tech']}`}>
              Page 1
            </div>
          </div>
        </div>

        <div className={styles['cs-rich-results']} role="list" aria-label="Results">
          <div className={styles['cs-rich-result']} role="listitem">
            <div className={`${styles['cs-rich-result-val']} ${styles['tech']}`}>Page 1</div>
            <div className={styles['cs-rich-result-lbl']}>for 14 target keywords</div>
          </div>
          <div className={styles['cs-rich-result']} role="listitem">
            <div className={`${styles['cs-rich-result-val']} ${styles['tech']}`}>6 mo</div>
            <div className={styles['cs-rich-result-lbl']}>to first page rankings</div>
          </div>
          <div className={styles['cs-rich-result']} role="listitem">
            <div className={`${styles['cs-rich-result-val']} ${styles['tech']}`}>+218%</div>
            <div className={styles['cs-rich-result-lbl']}>organic traffic growth</div>
          </div>
        </div>

        <h3 className={styles['cs-rich-title']}>From Invisible to Page One — Professional Services Firm</h3>

        <div className={styles['cs-rich-challenge']}>
          <div className={styles['cs-rich-challenge-lbl']}>The Challenge</div>
          <p>A professional services firm with a technically broken website — 200+ crawl errors, duplicate content across every service page, zero schema markup, and Core Web Vitals failing. They had zero organic rankings for any commercial term.</p>
        </div>

        <div className={styles['cs-work-tags-wrap']}>
          <div className={styles['cs-work-tags-lbl']}>Tactical Actions Deployed:</div>
          <div className={styles['cs-work-tags']} role="list" aria-label="Work done on this project">
            <span className={`${styles['cs-work-tag']} ${styles['tech']}`} role="listitem">Technical Audit</span>
            <span className={`${styles['cs-work-tag']} ${styles['tech']}`} role="listitem">Crawl Fix</span>
            <span className={`${styles['cs-work-tag']} ${styles['tech']}`} role="listitem">Schema Markup</span>
            <span className={`${styles['cs-work-tag']} ${styles['tech']}`} role="listitem">Core Web Vitals</span>
            <span className={`${styles['cs-work-tag']} ${styles['tech']}`} role="listitem">Redirect Architecture</span>
            <span className={`${styles['cs-work-tag']} ${styles['plus-badge']} ${styles['tech']}`} role="listitem">+1</span>
          </div>
        </div>

        <div className={styles['cs-rich-cta']}>
          <p className={styles['cs-rich-quote']}>"They found problems our developer didn't know existed."</p>
          <span className={`${styles['cs-rich-link']} ${styles['tech']}`}>Read Full Story <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true"><path d="M2 7h10M8 3l4 4-4 4" stroke="#2563EB" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg></span>
        </div>
      </a>

      {/*  ── CASE 2: On-Page & Content ──  */}
      <a href="/stories/content-seo-b2b-saas" className={`${styles['cs-rich-card']} ${styles['content']}`} aria-label="Read case study: Content SEO for B2B SaaS">
        <div className={styles['cs-header']}>
          <div className={styles['cs-header-top']}>
            <span className={`${styles['cs-tag-pill']} ${styles['content']}`}>On-Page &amp; Content SEO</span>
          </div>
          <div className={styles['cs-header-main']}>
            <div className={styles['cs-client']}>
              <div className={`${styles['cs-logo-box']} ${styles['tech']}`} aria-hidden="true">
                <img src="https://cdn.sanity.io/images/h79epwt4/production/29e9bff3bb707e511513b8dc5e4a61895b97eaf0-484x200.png" alt="Professional Services Firm logo" className='w-full h-auto' />
              </div>
            </div>
            <div className={`${styles['cs-main-metric']} ${styles['content']}`}>
              #1
            </div>
          </div>
        </div>

        <div className={styles['cs-rich-results']} role="list" aria-label="Results">
          <div className={styles['cs-rich-result']} role="listitem">
            <div className={`${styles['cs-rich-result-val']} ${styles['content']}`}>#1</div>
            <div className={styles['cs-rich-result-lbl']}>acquisition channel</div>
          </div>
          <div className={styles['cs-rich-result']} role="listitem">
            <div className={`${styles['cs-rich-result-val']} ${styles['content']}`}>4.8×</div>
            <div className={styles['cs-rich-result-lbl']}>ROI vs paid ads</div>
          </div>
          <div className={styles['cs-rich-result']} role="listitem">
            <div className={`${styles['cs-rich-result-val']} ${styles['content']}`}>12 mo</div>
            <div className={styles['cs-rich-result-lbl']}>to channel dominance</div>
          </div>
        </div>

        <h3 className={styles['cs-rich-title']}>Organic Overtook Paid — B2B SaaS, North America</h3>

        <div className={styles['cs-rich-challenge']}>
          <div className={styles['cs-rich-challenge-lbl']}>The Challenge</div>
          <p>A B2B SaaS company spending 60% of revenue on Google Ads with zero organic presence. High CAC, no content strategy, and no keyword architecture. Every customer cost them £180+ to acquire.</p>
        </div>

        <div className={styles['cs-work-tags-wrap']}>
          <div className={styles['cs-work-tags-lbl']}>Tactical Actions Deployed:</div>
          <div className={styles['cs-work-tags']} role="list" aria-label="Work done on this project">
            <span className={`${styles['cs-work-tag']} ${styles['content']}`} role="listitem">Keyword Research</span>
            <span className={`${styles['cs-work-tag']} ${styles['content']}`} role="listitem">Topic Clusters</span>
            <span className={`${styles['cs-work-tag']} ${styles['content']}`} role="listitem">Content Strategy</span>
            <span className={`${styles['cs-work-tag']} ${styles['content']}`} role="listitem">On-Page Optimisation</span>
            <span className={`${styles['cs-work-tag']} ${styles['content']}`} role="listitem">Internal Linking</span>
            <span className={`${styles['cs-work-tag']} ${styles['plus-badge']} ${styles['content']}`} role="listitem">+1</span>
          </div>
        </div>

        <div className={styles['cs-rich-cta']}>
          <p className={styles['cs-rich-quote']}>"Organic is now our best performing channel by far."</p>
          <span className={`${styles['cs-rich-link']} ${styles['content']}`}>Read Full Story <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true"><path d="M2 7h10M8 3l4 4-4 4" stroke="#0284C7" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg></span>
        </div>
      </a>

      {/*  ── CASE 3: Local SEO ──  */}
      <a href="/stories/local-seo-multi-location" className={`${styles['cs-rich-card']} ${styles['local']}`} aria-label="Read case study: Local SEO for multi-location business">
        <div className={styles['cs-header']}>
          <div className={styles['cs-header-top']}>
            <span className={`${styles['cs-tag-pill']} ${styles['local']}`}>Local SEO</span>
          </div>
          <div className={styles['cs-header-main']}>
            <div className={styles['cs-client']}>
              <div className={`${styles['cs-logo-box']} ${styles['tech']}`} aria-hidden="true">
                <img src="https://cdn.sanity.io/images/h79epwt4/production/29e9bff3bb707e511513b8dc5e4a61895b97eaf0-484x200.png" alt="Professional Services Firm logo" className='w-full h-auto' />
              </div>
            </div>
            <div className={`${styles['cs-main-metric']} ${styles['local']}`}>
              Top 3
            </div>
          </div>
        </div>

        <div className={styles['cs-rich-results']} role="list" aria-label="Results">
          <div className={styles['cs-rich-result']} role="listitem">
            <div className={`${styles['cs-rich-result-val']} ${styles['local']}`}>Top 3</div>
            <div className={styles['cs-rich-result-lbl']}>map pack all locations</div>
          </div>
          <div className={styles['cs-rich-result']} role="listitem">
            <div className={`${styles['cs-rich-result-val']} ${styles['local']}`}>90 days</div>
            <div className={styles['cs-rich-result-lbl']}>to full visibility</div>
          </div>
          <div className={styles['cs-rich-result']} role="listitem">
            <div className={`${styles['cs-rich-result-val']} ${styles['local']}`}>+340%</div>
            <div className={`${styles['cs-rich-result-lbl']}`}>local inbound calls</div>
          </div>
        </div>

        <h3 className={styles['cs-rich-title']}>Map Pack Dominance Across 8 Locations — 90 Days</h3>

        <div className={styles['cs-rich-challenge']}>
          <div className={styles['cs-rich-challenge-lbl']}>The Challenge</div>
          <p>A regional service business operating across 8 cities — invisible in local search in all of them. Inconsistent NAP data, an unclaimed Google Business Profile, and no local content. Competitors owned the map pack.</p>
        </div>

        <div className={styles['cs-work-tags-wrap']}>
          <div className={styles['cs-work-tags-lbl']}>Tactical Actions Deployed:</div>
          <div className={styles['cs-work-tags']} role="list" aria-label="Work done on this project">
            <span className={`${styles['cs-work-tag']} ${styles['local']}`} role="listitem">Google Business Profile</span>
            <span className={`${styles['cs-work-tag']} ${styles['local']}`} role="listitem">Citation Building</span>
            <span className={`${styles['cs-work-tag']} ${styles['local']}`} role="listitem">NAP Consistency</span>
            <span className={`${styles['cs-work-tag']} ${styles['local']}`} role="listitem">Local Landing Pages</span>
            <span className={`${styles['cs-work-tag']} ${styles['local']}`} role="listitem">Review Strategy</span>
            <span className={`${styles['cs-work-tag']} ${styles['plus-badge']} ${styles['local']}`} role="listitem">+1</span>
          </div>
        </div>

        <div className={styles['cs-rich-cta']}>
          <p className={styles['cs-rich-quote']}>"We went from invisible to the first thing people see."</p>
          <span className={`${styles['cs-rich-link']} ${styles['local']}`}>Read Full Story <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true"><path d="M2 7h10M8 3l4 4-4 4" stroke="#059669" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg></span>
        </div>
      </a>

      {/*  ── CASE 4: Link Building ──  */}
      <a href="/stories/link-building-e-commerce" className={`${styles['cs-rich-card']} ${styles['links']}`} aria-label="Read case study: Link building for e-commerce">
        <div className={styles['cs-header']}>
          <div className={styles['cs-header-top']}>
            <span className={`${styles['cs-tag-pill']} ${styles['links']}`}>Link Building</span>
          </div>
          <div className={styles['cs-header-main']}>
            <div className={styles['cs-client']}>
              <div className={`${styles['cs-logo-box']} ${styles['tech']}`} aria-hidden="true">
                <img src="https://cdn.sanity.io/images/h79epwt4/production/29e9bff3bb707e511513b8dc5e4a61895b97eaf0-484x200.png" alt="Professional Services Firm logo" className='w-full h-auto' />
              </div>
            </div>
            <div className={`${styles['cs-main-metric']} ${styles['links']}`}>
              +189%
            </div>
          </div>
        </div>

        <div className={styles['cs-rich-results']} role="list" aria-label="Results">
          <div className={styles['cs-rich-result']} role="listitem">
            <div className={`${styles['cs-rich-result-val']} ${styles['links']}`}>+189%</div>
            <div className={styles['cs-rich-result-lbl']}>organic revenue</div>
          </div>
          <div className={styles['cs-rich-result']} role="listitem">
            <div className={`${styles['cs-rich-result-val']} ${styles['links']}`}>64</div>
            <div className={styles['cs-rich-result-lbl']}>DA 40+ links placed</div>
          </div>
          <div className={styles['cs-rich-result']} role="listitem">
            <div className={`${styles['cs-rich-result-val']} ${styles['links']}`}>8 mo</div>
            <div className={styles['cs-rich-result-lbl']}>to full impact</div>
          </div>
        </div>

        <h3 className={styles['cs-rich-title']}>Authority Built, Revenue Followed — E-Commerce Brand</h3>

        <div className={styles['cs-rich-challenge']}>
          <div className={styles['cs-rich-challenge-lbl']}>The Challenge</div>
          <p>An e-commerce brand with solid on-page SEO but stuck on page 2 for every high-intent product keyword. Competitors had 3× the domain authority. Without links, good content wasn't enough to rank.</p>
        </div>

        <div className={styles['cs-work-tags-wrap']}>
          <div className={styles['cs-work-tags-lbl']}>Tactical Actions Deployed:</div>
          <div className={styles['cs-work-tags']} role="list" aria-label="Work done on this project">
            <span className={`${styles['cs-work-tag']} ${styles['links']}`} role="listitem">Competitor Gap Analysis</span>
            <span className={`${styles['cs-work-tag']} ${styles['links']}`} role="listitem">White-Hat Outreach</span>
            <span className={`${styles['cs-work-tag']} ${styles['links']}`} role="listitem">Digital PR</span>
            <span className={`${styles['cs-work-tag']} ${styles['links']}`} role="listitem">Linkable Assets</span>
            <span className={`${styles['cs-work-tag']} ${styles['links']}`} role="listitem">Anchor Text Strategy</span>
            <span className={`${styles['cs-work-tag']} ${styles['plus-badge']} ${styles['links']}`} role="listitem">+1</span>
          </div>
        </div>

        <div className={styles['cs-rich-cta']}>
          <p className={styles['cs-rich-quote']}>"Our domain authority jumped 18 points. Revenue followed."</p>
          <span className={`${styles['cs-rich-link']} ${styles['links']}`}>Read Full Story <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true"><path d="M2 7h10M8 3l4 4-4 4" stroke="#7C3AED" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg></span>
        </div>
      </a>

    </div>
  </div>
</section>

{/*  ══ FAQ ════════════════════════════════════════════  */}
<section className={`${styles['faq-section']}`} aria-labelledby="faq-title">
  <div className={`${styles['wrap']}`}>
    <div className={`${styles['faq-layout']}`}>
      <div>
        <h2 id="faq-title" className={`${styles['sec-title']} ${styles['reveal']} ${styles['d1']}`}>Frequently Asked Questions</h2>
        <p className={`${styles['hero-sub']} ${styles['reveal']} ${styles['d2']} text-center !max-w-full`}>Everything you need to know about our video production services</p>
        <div className={`${styles['faq-list']} ${styles['reveal']} ${styles['d2']}`}>

          <div className={`${styles['faq-item']} ${openFaq === 0 ? styles['open'] : ''}`}>
            <button className={`${styles['faq-q']}`} aria-expanded={openFaq === 0} aria-controls="fa1" onClick={() => toggleFaq(0)}>
              How long does SEO take to show results?
              <span className={`${styles['faq-arr']}`} aria-hidden="true"><svg width="11" height="11" viewBox="0 0 11 11" fill="none"><path d="M2 4l3.5 3.5L9 4" stroke="#2563EB" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg></span>
            </button>
            <div className={`${styles['faq-a']}`} id="fa1">Technical improvements are seen within weeks. Meaningful rankings and traffic typically begin in months 3–5, with compounding results from month 6 onward. SEO is a long-term asset — the results accumulate and don't stop when you stop paying per click.</div>
          </div>

          <div className={`${styles['faq-item']} ${openFaq === 1 ? styles['open'] : ''}`}>
            <button className={`${styles['faq-q']}`} aria-expanded={openFaq === 1} aria-controls="fa2" onClick={() => toggleFaq(1)}>
              Do you offer SEO as a white-label service for agencies?
              <span className={`${styles['faq-arr']}`} aria-hidden="true"><svg width="11" height="11" viewBox="0 0 11 11" fill="none"><path d="M2 4l3.5 3.5L9 4" stroke="#2563EB" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg></span>
            </button>
            <div className={`${styles['faq-a']}`} id="fa2">Yes — completely. We operate under your brand, communicate in your voice, and deliver reports branded as your own. Your clients never know Zevenstone exists. Full NDA protection on every engagement.</div>
          </div>

          <div className={`${styles['faq-item']} ${openFaq === 2 ? styles['open'] : ''}`}>
            <button className={`${styles['faq-q']}`} aria-expanded={openFaq === 2} aria-controls="fa3" onClick={() => toggleFaq(2)}>
              Do all 4 disciplines run simultaneously?
              <span className={`${styles['faq-arr']}`} aria-hidden="true"><svg width="11" height="11" viewBox="0 0 11 11" fill="none"><path d="M2 4l3.5 3.5L9 4" stroke="#2563EB" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg></span>
            </button>
            <div className={`${styles['faq-a']}`} id="fa3">Yes. Technical, content, local, and link building are coordinated together — each discipline makes the others more effective. We phase delivery intelligently: technical and on-page first, then content and links as the foundation is solid.</div>
          </div>

          <div className={`${styles['faq-item']} ${openFaq === 3 ? styles['open'] : ''}`}>
            <button className={`${styles['faq-q']}`} aria-expanded={openFaq === 3} aria-controls="fa4" onClick={() => toggleFaq(3)}>
              What reporting do you provide?
              <span className={`${styles['faq-arr']}`} aria-hidden="true"><svg width="11" height="11" viewBox="0 0 11 11" fill="none"><path d="M2 4l3.5 3.5L9 4" stroke="#2563EB" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg></span>
            </button>
            <div className={`${styles['faq-a']}`} id="fa4">Monthly reports covering: keyword rankings, organic traffic, conversion data, link acquisition, and revenue attribution where trackable. Reports are white-labeled for agency partners and client-ready by default.</div>
          </div>

          <div className={`${styles['faq-item']} ${openFaq === 4 ? styles['open'] : ''}`}>
            <button className={`${styles['faq-q']}`} aria-expanded={openFaq === 4} aria-controls="fa5" onClick={() => toggleFaq(4)}>
              Is there a minimum contract period?
              <span className={`${styles['faq-arr']}`} aria-hidden="true"><svg width="11" height="11" viewBox="0 0 11 11" fill="none"><path d="M2 4l3.5 3.5L9 4" stroke="#2563EB" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg></span>
            </button>
            <div className={`${styles['faq-a']}`} id="fa5">We recommend 6 months minimum — not because of a contract, but because that's what SEO requires to deliver meaningful compound results. We offer project-based, retainer, and growth partnership models to suit different situations.</div>
          </div>

        </div>
      </div>
    </div>
  </div>
</section>

{/*  ══ FINAL CTA ══════════════════════════════════════  */}
<section className={`${styles['final-section']}`} id="cta" aria-labelledby="cta-title">
  <div className={`${styles['wrap']}`}>
    <div className={`${styles['cta-box']} ${styles['reveal']}`}>
      <h2 id="cta-title">Ready to Make Search<br/>Your #1 Growth Channel?</h2>
      <p>Book a free 30-minute SEO strategy call. We'll audit your position across all four disciplines and show you exactly where the opportunity is — at no cost.</p>
      <div className={`${styles['cta-actions']}`}>
        <a href="https://zevenstone.com/contact" className={`${styles['btn-white']}`}>Book a Free Strategy Call →</a>
        <a href="/services/digital-marketing" className={`${styles['btn-outline-w']}`}>← Back to Digital Marketing</a>
      </div>
      <p className={`${styles['cta-trust']}`}>No commitment. No pitch. Just a real conversation about your growth.</p>
      <div className={`${styles['cta-badges']}`} role="list" aria-label="Guarantees">
        <span className={`${styles['cta-badge']}`} role="listitem">✓ Free Audit Included</span>
        <span className={`${styles['cta-badge']}`} role="listitem">✓ White-Label Available</span>
        <span className={`${styles['cta-badge']}`} role="listitem">✓ No Lock-In Contracts</span>
        <span className={`${styles['cta-badge']}`} role="listitem">✓ Monthly Reporting</span>
      </div>
    </div>
  </div>
</section>
</main>
</div>
  );
};

export default ServiceSeo;
