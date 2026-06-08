import React, { useEffect, useRef, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { sanityClient } from "../lib/sanity";
import { NESTED_SERVICE_QUERY } from "../lib/queries";
import { LoadingSpinner, ErrorState } from "../components/ui";
import styles from "./ServiceSeo.module.css";

const PAGE_ACTIVE_CLASS = "service-seo-page-active";
const GLOBAL_HEADER_HIDDEN_CLASS = "service-seo-global-header-hidden";

// Helper for dynamic section IDs
const slugify = (text: string) => text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

const NestedServicePage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const tabNavRef = useRef<HTMLDivElement | null>(null);

  const { data: service, isLoading, error } = useQuery({
    queryKey: ["nestedService", slug],
    queryFn: async () => {
      if (!slug) return null;
      return sanityClient.fetch(NESTED_SERVICE_QUERY, { slug });
    },
    enabled: !!slug,
  });

  console.log("Fetched service data:", service?.hero?.illustrationUrl);

  const toggleFaq = (index: number) => {
    setOpenFaq(prev => (prev === index ? null : index));
  };

  useEffect(() => {
    if (!service) return; // Wait until loaded to set observers
    
    document.body.classList.add(PAGE_ACTIVE_CLASS);

    // Reveal intersection observer
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => { 
        if (e.isIntersecting) { 
          e.target.classList.add(styles["in"]); 
          io.unobserve(e.target); 
        } 
      });
    }, { threshold: 0.06, rootMargin: "0px 0px -20px 0px" });
    
    // Slight timeout to let DOM render
    setTimeout(() => {
      document.querySelectorAll("." + styles["reveal"]).forEach(el => io.observe(el));
    }, 100);

    // Tab nav observer
    const sections = service.disciplines?.map((d: any) => slugify(d.title)) || [];
    const tabLinks = document.querySelectorAll("." + styles["tab-link"] + "[data-section]");
    const sectionObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          tabLinks.forEach(l => {
            if (l instanceof HTMLElement) {
              if (l.dataset.section === id) {
                l.classList.add(styles["active"]);
              } else {
                l.classList.remove(styles["active"]);
              }
            }
          });
        }
      });
    }, { rootMargin: "-30% 0px -60% 0px" });

    setTimeout(() => {
      sections.forEach((id: string) => {
        const el = document.getElementById(id);
        if (el) sectionObserver.observe(el);
      });
    }, 100);

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
      const globalHeader = document.querySelector<HTMLElement>("nav.fixed");

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
    window.addEventListener("scroll", requestHeaderVisibilityUpdate, { passive: true });
    window.addEventListener("resize", requestHeaderVisibilityUpdate);

    return () => {
      io.disconnect();
      sectionObserver.disconnect();
      window.removeEventListener("scroll", requestHeaderVisibilityUpdate);
      window.removeEventListener("resize", requestHeaderVisibilityUpdate);
      if (animationFrameId) window.cancelAnimationFrame(animationFrameId);
      document.body.classList.remove(PAGE_ACTIVE_CLASS, GLOBAL_HEADER_HIDDEN_CLASS);
    };
  }, [service]);

  if (isLoading) return <LoadingSpinner />;
  if (error || !service) return <ErrorState />;

  return (
    <div className={styles.seoPageWrapper}>
      <Helmet>
        <title>{service.seoTitle || `${service.title} — Zevenstone Digital Marketing`}</title>
        <meta name="description" content={service.seoDescription || service.description || ""} />
      </Helmet>
      <main id="main">

{/*  ══ HERO ══════════════════════════════════════════  */}
<section className={`${styles['hero']}`} aria-labelledby="hero-h1">
  <div className={`${styles['wrap']}`}>
    <div className={`${styles['hero-layout']}`}>
      <div>
        <div className={`${styles['hero-eyebrow']} ${styles['reveal']}`}>
          <span className={`${styles['hero-eyebrow-dot']}`} aria-hidden="true"></span>
          {service.hero?.eyebrow || "Digital Marketing"}
        </div>
        <h1 id="hero-h1" className={`${styles['hero-title']} ${styles['reveal']} ${styles['d1']}`} dangerouslySetInnerHTML={{ __html: service.hero?.title || service.title }}>
        </h1>
        <p className={`${styles['hero-sub']} ${styles['reveal']} ${styles['d2']}`}>{service.hero?.subtitle}</p>
        
        <div className={`${styles['hero-actions']} ${styles['reveal']} ${styles['d3']}`}>
          {service.hero?.actions?.map((act: any, idx: number) => (
             <a key={idx} href={act.url} className={act.style === 'secondary' ? styles['btn-ghost'] : styles['btn-primary']}>
               {act.label}
               {act.style !== 'secondary' && (
                 <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                   <path d="M3 8h10M9 4l4 4-4 4" stroke="#ffffff" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                 </svg>
               )}
             </a>
          ))}
        </div>

        <div className={`${styles['hero-trust']} ${styles['reveal']} ${styles['d4']}`} role="list" aria-label="Service guarantees">
          {service.hero?.trustChips?.map((chip: any, idx: number) => (
             <div key={idx} className={`${styles['trust-chip']}`} role="listitem">
               <svg width="11" height="11" viewBox="0 0 11 11" fill="none" aria-hidden="true"><path d="M2 5.5l2.5 2.5 4.5-4.5" stroke="#2563EB" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
               {chip.label}
             </div>
          ))}
        </div>
      </div>

      {/*  Hero: humanized SEO scene illustration  */}
      <div className={`${styles['reveal']} ${styles['d2']}`}>
        <div className={`${styles['hero-illustration']}`} aria-label="SEO strategist reviewing search performance dashboard" role="img">
          {service.hero?.illustrationUrl ? (
            <img src={service.hero.illustrationUrl} alt="Illustration" style={{ width: '100%', height: 'auto', display: 'block', borderRadius: '16px' }} />
          ) : (
            <svg></svg>
          )}
        </div>
      </div>
    </div>
  </div>
</section>

{/*  ══ STICKY IN-PAGE TAB NAV ════════════════════════  */}
<div className={`${styles['tab-nav']}`} ref={tabNavRef} role="navigation" aria-label="Page sections">
  <div className={`${styles['wrap']}`}>
    <div className={`${styles['tab-nav-inner']}`}>
      {service.disciplines?.map((d: any, idx: number) => (
         <a key={idx} href={`#${slugify(d.title)}`} className={`${styles['tab-link']} ${idx === 0 ? styles['active'] : ''}`} data-section={slugify(d.title)}>
           <span className={`${styles['tab-num']}`} aria-hidden="true">{idx + 1}</span>
           {d.title}
         </a>
      ))}
      <div className={`${styles['tab-cta']}`}>
        <a href="#cta">Start a Project →</a>
      </div>
    </div>
  </div>
</div>

{/*  ══ DISCIPLINES LOOP ════════════════════════════════  */}
{service.disciplines?.map((disc: any, index: number) => {
  const secId = slugify(disc.title);
  
  return (
    <React.Fragment key={index}>
      <section className={`${styles['disc-section']}`} id={secId} aria-labelledby={`d${index}-title`}>
        <div className={`${styles['wrap']}`}>
          <div className={`${styles['disc-layout']}`}>

            {/*  LEFT: explanation  */}
            <div>
              <div className={`${styles['disc-num']} ${styles['reveal']}`}>
                <div className={`${styles['disc-num-badge']}`} aria-hidden="true">{index + 1}</div>
                <h2 id={`d${index}-title`} className={`${styles['disc-h2']} ${styles['reveal']} ${styles['d1']}`}>{disc.title}</h2>
              </div>
              <p className={`${styles['disc-intro']} ${styles['reveal']} ${styles['d2']}`}>{disc.intro}</p>

              <div className={`${styles['reveal']} ${styles['d3']}`}>
                <p className={`${styles['deliv-label']}`}>{disc.deliverablesLabel || "What's included"}</p>
                <ul className={`${styles['deliv-list']}`} role="list">
                  {disc.deliverables?.map((deliv: string, di: number) => (
                    <li key={di} className={`${styles['deliv-item']}`} role="listitem">
                      <svg className={`${styles['ci']}`} viewBox="0 0 22 22" fill="none" aria-hidden="true"><circle cx="11" cy="11" r="9.25" stroke="#3B82F6" strokeWidth="1.5"/><path d="M7 11l3 3 5-5" stroke="#3B82F6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                      {deliv}
                    </li>
                  ))}
                </ul>
              </div>

              <div className={`${styles['outcome-pills']} ${styles['reveal']} ${styles['d4']}`} role="list" aria-label="Outcomes">
                {disc.outcomePills?.map((pill: string, pi: number) => (
                  <span key={pi} className={`${styles['o-pill']}`} role="listitem">{pill}</span>
                ))}
              </div>

              <a href="#cta" className={`${styles['start-link']} ${styles['reveal']} ${styles['d4']}`} aria-label={`Start a ${disc.title} project`}>
                Start Project
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M3 8h10M9 4l4 4-4 4" stroke="#111827" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </a>
            </div>

            {/*  RIGHT: card + case study  */}
            <div className={`${styles['disc-right']} ${styles['reveal']} ${styles['d2']}`}>

              {/*  What's inside card  */}
              {disc.insideCard && (
                <div className={`${styles['inside-card']}`}>
                  <div className={`${styles['inside-card-head']}`}>
                    <div className={`${styles['inside-card-icon']}`} aria-hidden="true">
                      <svg width="22" height="22" viewBox="0 0 22 22" fill="none"><path d="M11 3C6.58 3 3 6.58 3 11s3.58 8 8 8 8-3.58 8-8-3.58-8-8-8Z" stroke="#2563EB" strokeWidth="1.5"/><path d="M11 7v4l2.5 2.5" stroke="#2563EB" strokeWidth="1.5" strokeLinecap="round"/><path d="M8 3.5A8 8 0 003.5 8" stroke="#2563EB" strokeWidth="1.5" strokeLinecap="round"/></svg>
                    </div>
                    <div>
                      <div className={`${styles['inside-card-title']}`}>{disc.insideCard.title}</div>
                      <div className={`${styles['inside-card-sub']}`}>{disc.insideCard.subtitle}</div>
                    </div>
                  </div>
                  <div className={`${styles['inside-card-body']}`}>
                    <ul className={`${styles['inside-items']}`} role="list">
                      {disc.insideCard.items?.map((item: string, iti: number) => (
                         <li key={iti} className={`${styles['inside-item']}`} role="listitem">
                           <svg className={`${styles['ci']}`} viewBox="0 0 22 22" fill="none" aria-hidden="true"><circle cx="11" cy="11" r="9.25" stroke="#3B82F6" strokeWidth="1.5"/><path d="M7 11l3 3 5-5" stroke="#3B82F6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                           {item}
                         </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}

              {/*  Discipline 1 illustration fallback only  */}
              {index === 0 && (
                <div className={`${styles['disc-illustration']} ${styles['reveal']} ${styles['d1']} hidden`} aria-label="Technical SEO audit in progress — errors being resolved" role="img">
                  <svg></svg>
                </div>
              )}

              {/*  Case study card  */}
              {disc.caseStudy && (
                <a href={disc.caseStudy.url || '#'} className={`${styles['cs-card']}`} aria-label="Read case study">
                  <span className={`${styles['cs-tag']}`}>{disc.caseStudy.tag}</span>
                  <div className={`${styles['cs-metric']}`}>{disc.caseStudy.mainMetric}</div>
                  <div className={`${styles['cs-title']}`}>{disc.caseStudy.title}</div>
                  <div className={`${styles['cs-desc']}`}>{disc.caseStudy.description}</div>
                  <span className={`${styles['cs-link']}`}>
                    Read the full story
                    <svg width="13" height="13" viewBox="0 0 13 13" fill="none" aria-hidden="true"><path d="M2 6.5h9M8 3l3 3.5L8 10" stroke="rgba(255,255,255,0.85)" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </span>
                </a>
              )}
            </div>
          </div>
        </div>
      </section>
      {index < service.disciplines.length - 1 && <div className={`${styles['divider']}`}></div>}
    </React.Fragment>
  );
})}

{/*  ══ STATS BAR ══════════════════════════════════════  */}
{service.statsBar && service.statsBar.length > 0 && (
  <div className={`${styles['stats-bar']}`} role="region" aria-label="SEO performance statistics">
    <div className={`${styles['stats-track']}`} aria-hidden="true">
      {service.statsBar.map((s: any, idx: number) => (
        <div key={idx} className={`${styles['s-item']}`}><span className={`${styles['s-val']}`}>{s.value}</span><span className={`${styles['s-lbl']}`}>{s.label}</span></div>
      ))}
      {/* Duplicate for seamless scrolling */}
      {service.statsBar.map((s: any, idx: number) => (
        <div key={`dup-${idx}`} className={`${styles['s-item']}`}><span className={`${styles['s-val']}`}>{s.value}</span><span className={`${styles['s-lbl']}`}>{s.label}</span></div>
      ))}
    </div>
  </div>
)}

{/*  ══ PROCESS ════════════════════════════════════════  */}
{service.processSection && (
  <section className={`${styles['process-section']}`} aria-labelledby="proc-title">
    <div className={`${styles['wrap']}`}>
      <div className={`${styles['process-layout']}`}>
        <div>
          <span className={`${styles['sec-label']} ${styles['reveal']}`}>{service.processSection.secLabel}</span>
          <h2 id="proc-title" className={`${styles['sec-title']} ${styles['reveal']} ${styles['d1']}`} dangerouslySetInnerHTML={{__html: service.processSection.secTitle}}></h2>
          <div className={`${styles['process-steps']} ${styles['reveal']} ${styles['d2']}`} role="list" aria-label="Engagement process steps">
            {service.processSection.steps?.map((step: any, idx: number) => (
              <div key={idx} className={`${styles['p-step']}`} role="listitem">
                <div className={`${styles['p-circle']}`} aria-label={`Step ${idx + 1}`}>0{idx + 1}</div>
                <div className={`${styles['p-body']}`}>
                  <h4>{step.title}</h4>
                  <p>{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className={`${styles['reveal']} ${styles['d2']}`}>
          {service.processSection.rightCopy?.map((rc: string, idx: number) => (
            <p key={idx} className={`${styles['process-right-copy']}`}>{rc}</p>
          ))}
          <a href="#cta" className={`${styles['btn-primary']}`} style={{ marginBottom: '28px', display: 'inline-flex' }}>Get Your Free SEO Audit →</a>
          {service.processSection.timelineCard && (
            <div className={`${styles['timeline-card']}`}>
              <h4>{service.processSection.timelineCard.title}</h4>
              <div className={`${styles['t-items']}`} role="list">
                {service.processSection.timelineCard.items?.map((item: any, idx: number) => (
                  <div key={idx} className={`${styles['t-item']} ${styles['deliv-item']}`} role="listitem">
                    <svg className={`${styles['ci']}`} viewBox="0 0 22 22" fill="none" aria-hidden="true"><circle cx="11" cy="11" r="9.25" stroke="#3B82F6" strokeWidth="1.5"/><path d="M7 11l3 3 5-5" stroke="#3B82F6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    <span><strong>{item.period}:</strong> {item.description}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  </section>
)}

{/*  ══ ALL CASE STUDIES ═══════════════════════════════  */}
{service.caseStudiesSection && (
  <section className={`${styles['cases-section']}`} aria-labelledby="cases-title">
    
    {/*  FAQ side CTA  */}
    {service.faqCta && (
      <div className={`${styles['reveal']} ${styles['d2']} ${styles['wrap']} !pb-32`}>
        <div className={`${styles['faq-cta-box']} flex flex-col lg:flex-row items-center gap-8`}>
          {service.faqCta.imageUrl && (
            <div>
              <img src={service.faqCta.imageUrl} className='w-[350px] h-[233px] object-cover' alt="CTA" />
            </div>
          )}
          <div className="lg:max-w-[540px]">
            <h3>{service.faqCta.heading}</h3>
            <p>{service.faqCta.description}</p>
            <div className="flex flex-col sm:flex-row sm:items-center gap-6">
               <a href={service.faqCta.buttonUrl || '#cta'} className={`${styles['btn-white-sm']} w-fit`}>{`${service.faqCta.buttonText}  →` || 'Get Your Free SEO Audit →'}</a>
            <p className={`${styles['faq-trust-note']} !text-left`}>{service.faqCta.trustNote}</p>
            </div>
          </div>
        </div>
      </div>
    )}

    <div className={`${styles['wrap']}`}>
      <div className={`${styles['tc']}`}>
        <span className={`${styles['sec-label']} ${styles['reveal']}`}>{service.caseStudiesSection.secLabel}</span>
        <h2 id="cases-title" className={`${styles['sec-title']} ${styles['reveal']} ${styles['d1']}`} dangerouslySetInnerHTML={{__html: service.caseStudiesSection.secTitle}}></h2>
        <p className={`${styles['sec-sub']} ${styles['reveal']} ${styles['d2']}`}>{service.caseStudiesSection.secSub}</p>
      </div>

      <div className={`${styles['cs-rich-grid']} ${styles['reveal']} ${styles['d2']}`}>
        {service.caseStudiesSection.caseStudies?.map((cs: any, idx: number) => {
          // Simple logic to map discipline tag to a color class
          const tagLower = (cs.disciplineTag || '').toLowerCase();

          const colorClasses = [
                                styles.tech,
                                styles.content,
                                styles.local,
                                styles.links,
                              ];

         const colorClass = colorClasses[idx % colorClasses.length];
                 
  
              console.log("colorclass", colorClass);
          return (
            <a key={idx} href={cs.url || '#'} className={`${styles['cs-rich-card']} ${colorClass}`} aria-label="Read case study">
              <div className={styles['cs-header']}>
                <div className={styles['cs-header-top']}>
                  <span className={`${styles['cs-tag-pill']} ${colorClass}`}>{cs.disciplineTag}</span>
                </div>
                <div className={styles['cs-header-main']}>
                  <div className={styles['cs-client']}>
                    {cs.logoUrl && (
                      <div className={`${styles['cs-logo-box']} ${colorClass}`} aria-hidden="true">
                        <img src={cs.logoUrl} alt="Client logo" className='w-full h-auto' />
                      </div>
                    )}
                  </div>
                  <div className={`${styles['cs-main-metric']} ${colorClass}`}>
                    {cs.mainMetric}
                  </div>
                </div>
              </div>

              <div className={styles['cs-rich-results']} role="list" aria-label="Results">
                {cs.results?.map((res: any, ri: number) => (
                  <div key={ri} className={styles['cs-rich-result']} role="listitem">
                    <div className={`${styles['cs-rich-result-val']} ${colorClass}`}>{res.value}</div>
                    <div className={styles['cs-rich-result-lbl']}>{res.label}</div>
                  </div>
                ))}
              </div>

              <h3 className={styles['cs-rich-title']}>{cs.title}</h3>

              <div className={styles['cs-rich-challenge']}>
                <div className={styles['cs-rich-challenge-lbl']}>The Challenge</div>
                <p>{cs.challenge}</p>
              </div>

              <div className={styles['cs-work-tags-wrap']}>
                <div className={styles['cs-work-tags-lbl']}>Tactical Actions Deployed:</div>
                <div className={styles['cs-work-tags']} role="list" aria-label="Work done on this project">
                  {cs.tacticalActions?.slice(0, 5).map((act: string, ai: number) => (
                    <span key={ai} className={`${styles['cs-work-tag']} ${colorClass}`} role="listitem">{act}</span>
                  ))}
                  {cs.tacticalActions?.length > 5 && (
                    <span className={`${styles['cs-work-tag']} ${styles['plus-badge']} ${colorClass}`} role="listitem">+{cs.tacticalActions.length - 5}</span>
                  )}
                </div>
              </div>

              <div className={styles['cs-rich-cta']}>
                <p className={styles['cs-rich-quote']}>"{cs.quote}"</p>
                <span className={`${styles['cs-rich-link']} ${colorClass}`}>Read Full Story <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true"><path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg></span>
              </div>
            </a>
          );
        })}
      </div>
    </div>
  </section>
)}

{/*  ══ FAQ ════════════════════════════════════════════  */}
{service.faqs && (
  <section className={`${styles['faq-section']}`} aria-labelledby="faq-title">
    <div className={`${styles['wrap']}`}>
      <div className={`${styles['faq-layout']}`}>
        <div>
          <h2 id="faq-title" className={`${styles['sec-title']} ${styles['reveal']} ${styles['d1']}`}>{service.faqs.title}</h2>
          <p className={`${styles['hero-sub']} ${styles['reveal']} ${styles['d2']} text-center !max-w-full`}>{service.faqs.subtitle}</p>
          <div className={`${styles['faq-list']} ${styles['reveal']} ${styles['d2']}`}>
            {service.faqs.list?.map((faq: any, idx: number) => (
              <div key={idx} className={`${styles['faq-item']} ${openFaq === idx ? styles['open'] : ''}`}>
                <button className={`${styles['faq-q']}`} aria-expanded={openFaq === idx} aria-controls={`fa${idx}`} onClick={() => toggleFaq(idx)}>
                  {faq.question}
                  <span className={`${styles['faq-arr']}`} aria-hidden="true"><svg width="11" height="11" viewBox="0 0 11 11" fill="none"><path d="M2 4l3.5 3.5L9 4" stroke="#2563EB" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg></span>
                </button>
                <div className={`${styles['faq-a']}`} id={`fa${idx}`}>{faq.answer}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </section>
)}

{/*  ══ FINAL CTA ══════════════════════════════════════  */}
{service.finalCta && (
  <section className={`${styles['final-section']}`} id="cta" aria-labelledby="cta-title">
    <div className={`${styles['wrap']}`}>
      <div className={`${styles['cta-box']} ${styles['reveal']}`}>
        <h2 id="cta-title" dangerouslySetInnerHTML={{__html: service.finalCta.title}}></h2>
        <p>{service.finalCta.description}</p>
        <div className={`${styles['cta-actions']}`}>
          {service.finalCta.primaryButtonUrl && (
            <a href={service.finalCta.primaryButtonUrl} className={`${styles['btn-white']}`}>{service.finalCta.primaryButtonText} →</a>
          )}
          {service.finalCta.secondaryButtonUrl && (
            <a href={service.finalCta.secondaryButtonUrl} className={`${styles['btn-outline-w']}`}>← {service.finalCta.secondaryButtonText}</a>
          )}
        </div>
        <p className={`${styles['cta-trust']}`}>{service.finalCta.trustNote}</p>
        <div className={`${styles['cta-badges']}`} role="list" aria-label="Guarantees">
          {service.finalCta.badges?.map((badge: string, idx: number) => (
            <span key={idx} className={`${styles['cta-badge']}`} role="listitem">{badge}</span>
          ))}
        </div>
      </div>
    </div>
  </section>
)}
      </main>
    </div>
  );
};

export default NestedServicePage;
