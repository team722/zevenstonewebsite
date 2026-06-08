import fs from 'fs';
import path from 'path';

const htmlPath = 'D:\\zevenstone-seo-v2 (1).html';
const htmlContent = fs.readFileSync(htmlPath, 'utf-8');

const classMap = {
  'wrap': 'max-w-[1160px] mx-auto px-[clamp(20px,5vw,60px)]',
  'reveal': 'opacity-0 translate-y-[22px] transition-all duration-500 ease-out',
  'reveal.in': 'opacity-100 translate-y-0',
  'd1': 'delay-75',
  'd2': 'delay-150',
  'd3': 'delay-200',
  'd4': 'delay-300',
  'd5': 'delay-500',
  'blue': 'text-blue-600',
  'hero': 'pt-7 pb-20 bg-gradient-to-br from-[#EEF4FF] via-[#F8FAFF] to-white relative overflow-hidden',
  'hero-layout': 'grid grid-cols-1 lg:grid-cols-[1fr_420px] gap-[52px] items-center relative z-10',
  'hero-eyebrow': 'inline-flex items-center gap-2 text-[11px] font-semibold tracking-[0.12em] uppercase text-blue-600 bg-indigo-50 py-1.5 px-3.5 rounded-full mb-4',
  'hero-eyebrow-dot': 'w-1.5 h-1.5 rounded-full bg-blue-600 animate-pulse',
  'hero-title': 'text-[clamp(34px,5vw,58px)] font-extrabold leading-[1.08] tracking-[-0.03em] text-gray-900 mb-4',
  'hero-sub': 'text-[clamp(15px,1.7vw,17px)] font-normal text-gray-500 leading-[1.8] mb-[30px] max-w-[500px]',
  'hero-actions': 'flex flex-col sm:flex-row items-start sm:items-center gap-3 flex-wrap mb-6',
  'btn-primary': 'inline-flex items-center gap-2 bg-blue-600 text-white font-sans text-[15px] font-semibold py-3.5 px-[30px] rounded-full no-underline transition-all duration-200 hover:bg-blue-700 hover:-translate-y-0.5 hover:shadow-lg',
  'btn-ghost': 'inline-flex items-center gap-2 bg-transparent text-gray-700 font-sans text-sm font-medium py-3 px-[22px] rounded-full border-[1.5px] border-gray-300 no-underline transition-colors duration-200 hover:border-blue-600 hover:text-blue-600',
  'hero-trust': 'flex items-center gap-2.5 flex-wrap',
  'trust-chip': 'flex items-center gap-1.5 text-xs font-medium text-gray-500 bg-white border border-gray-200 rounded-full py-1 px-3',
  'h-panel': 'hidden lg:block bg-white rounded-[22px] border border-gray-200 shadow-xl overflow-hidden',
  'h-panel-head': 'bg-blue-600 py-5 px-6 flex items-center justify-between',
  'h-panel-head-title': 'text-[13px] font-semibold text-white/90',
  'h-panel-badge': 'text-[10px] font-bold tracking-[0.08em] uppercase text-blue-600 bg-white py-1 px-2.5 rounded-full',
  'h-panel-stats': 'pt-[18px] px-6 pb-3 flex flex-col gap-[9px]',
  'h-stat': 'flex items-center justify-between bg-gray-50 border border-gray-200 rounded-[10px] py-[11px] px-[15px] hover:border-blue-200 transition-colors',
  'h-stat-val': 'text-[20px] font-extrabold text-blue-600 tracking-[-0.02em]',
  'h-stat-lbl': 'text-[11px] text-gray-500 font-medium text-right leading-[1.4]',
  'h-chart': 'py-1 px-6 pb-2',
  'h-chart-lbl': 'text-[10px] font-semibold tracking-[0.08em] uppercase text-gray-400 mb-1.5',
  'h-bars': 'flex items-end gap-[3px] h-[40px]',
  'h-bar': 'flex-1 rounded-t-[3px] bg-blue-200',
  'h-bar hi': 'flex-1 rounded-t-[3px] bg-blue-600',
  'h-panel-cta': 'pt-3 px-6 pb-5',
  'tab-nav': 'sticky top-[60px] z-[200] bg-white border-b border-gray-200 shadow-sm',
  'tab-nav-inner': 'flex items-center overflow-x-auto no-scrollbar',
  'tab-link': 'flex items-center gap-2 py-4 px-4 sm:px-6 text-[12px] sm:text-[13px] font-semibold text-gray-500 no-underline whitespace-nowrap border-b-2 border-transparent hover:text-blue-600 transition-colors shrink-0',
  'tab-link active': 'flex items-center gap-2 py-4 px-4 sm:px-6 text-[12px] sm:text-[13px] font-semibold text-blue-600 no-underline whitespace-nowrap border-b-2 border-blue-600 shrink-0',
  'tab-num': 'w-5 h-5 rounded-full bg-indigo-50 text-[10px] font-bold text-blue-600 flex items-center justify-center shrink-0',
  'tab-cta': 'ml-auto py-3 px-6 shrink-0',
  'sec-label': 'inline-block text-[11px] font-semibold tracking-[0.14em] uppercase text-blue-600 mb-3',
  'sec-title': 'text-[clamp(26px,3.8vw,42px)] font-extrabold leading-[1.13] tracking-[-0.025em] text-gray-900 mb-3.5',
  'sec-sub': 'text-[clamp(14px,1.5vw,16px)] font-normal text-gray-500 leading-[1.8] max-w-[580px]',
  'tc': 'text-center',
  'divider': 'h-px bg-gray-200',
  'ci': 'w-[22px] h-[22px] shrink-0 mt-0.5',
  'disc-section': 'relative py-[clamp(64px,8vw,96px)]',
  'disc-anchor': 'block h-0 invisible -mt-[120px] pt-[120px]',
  'disc-layout': 'grid grid-cols-1 md:grid-cols-2 gap-[36px] md:gap-[64px] items-start',
  'disc-num': 'inline-flex items-center gap-2.5 mb-3.5',
  'disc-num-badge': 'w-9 h-9 rounded-full bg-blue-600 flex items-center justify-center text-[13px] font-bold text-white shrink-0',
  'disc-num-label': 'text-[11px] font-semibold tracking-[0.12em] uppercase text-blue-600',
  'disc-h2': 'text-[clamp(24px,3.5vw,38px)] font-extrabold leading-[1.12] tracking-[-0.025em] text-gray-900 mb-4',
  'disc-intro': 'text-[clamp(14px,1.5vw,16px)] text-gray-500 leading-[1.8] mb-6',
  'deliv-label': 'text-[10px] font-bold tracking-[0.12em] uppercase text-gray-400 mb-3.5',
  'deliv-list': 'flex flex-col gap-[13px] mb-7',
  'deliv-item': 'flex items-start gap-2.5 text-sm text-gray-700 leading-[1.6]',
  'outcome-pills': 'flex flex-wrap gap-2 mb-7',
  'o-pill': 'text-xs font-medium text-blue-600 bg-indigo-50 border border-blue-200 py-1 px-3 rounded-full',
  'start-link': 'inline-flex items-center gap-1.5 text-sm font-bold text-gray-900 no-underline hover:text-blue-600 hover:gap-3 transition-all',
  'inside-card': 'bg-white border border-gray-200 rounded-[22px] shadow-sm mb-5 hover:shadow-lg transition-shadow',
  'inside-card-head': 'py-5 px-6 border-b border-gray-200 flex items-center gap-3',
  'inside-card-icon': 'w-11 h-11 bg-indigo-50 rounded-[10px] border border-blue-200 flex items-center justify-center shrink-0',
  'inside-card-title': 'text-sm font-bold text-gray-900',
  'inside-card-sub': 'text-xs text-gray-500 mt-0.5',
  'inside-card-body': 'pt-5 px-6 pb-[22px]',
  'inside-items': 'flex flex-col gap-[11px]',
  'inside-item': 'flex items-start gap-2.5 text-[13px] text-gray-700 leading-[1.6]',
  'cs-card': 'bg-blue-600 rounded-[22px] py-6 px-6 no-underline flex flex-col gap-2.5 hover:-translate-y-1 hover:shadow-xl transition-all group',
  'cs-tag': 'text-[10px] font-bold tracking-[0.1em] uppercase text-white/60',
  'cs-metric': 'text-[clamp(28px,3vw,38px)] font-extrabold text-white tracking-[-0.03em] leading-none',
  'cs-title': 'text-[15px] font-bold text-white leading-[1.35]',
  'cs-desc': 'text-[13px] text-white/70 leading-[1.65]',
  'cs-link': 'inline-flex items-center gap-1.5 text-[13px] font-semibold text-white/85 mt-1 group-hover:gap-2.5 transition-all',
  'cs-client-row': 'flex items-center gap-3 mb-3',
  'cs-client-logo': 'w-10 h-10 rounded-[10px] flex items-center justify-center shrink-0',
  'cs-client-info': 'flex flex-col gap-[1px]',
  'cs-client-name': 'text-[13px] font-bold text-white leading-[1.2]',
  'cs-client-sector': 'text-[11px] text-white/55',
  'stats-bar': 'bg-blue-600 py-0 overflow-hidden',
  'stats-track': 'flex w-max', 
  's-item': 'flex items-center gap-2.5 py-4 px-12 whitespace-nowrap border-r border-white/15',
  's-val': 'text-[17px] font-bold text-white tracking-[-0.01em]',
  's-lbl': 'text-[13px] text-white/70',
  'process-section': 'py-[clamp(64px,8vw,96px)] bg-gray-50',
  'process-layout': 'grid grid-cols-1 md:grid-cols-2 gap-[40px] md:gap-[64px] items-start',
  'process-steps': 'flex flex-col relative before:absolute before:left-[19px] before:top-6 before:bottom-6 before:w-[2px] before:bg-gradient-to-b before:from-blue-600 before:to-blue-200 before:z-0',
  'p-step': 'grid grid-cols-[40px_1fr] gap-[18px] py-5 relative z-10 hover:pl-1.5 transition-all group',
  'p-circle': 'w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-[13px] font-bold text-white shrink-0 shadow-[0_0_0_4px_#F9FAFB,0_0_0_6px_#DBEAFE]',
  'p-body': 'pt-2',
  'process-right-copy': 'text-[clamp(14px,1.5vw,16px)] text-gray-500 leading-[1.8] mb-6',
  'timeline-card': 'bg-white border border-gray-200 rounded-2xl py-6 px-6 shadow-sm mt-1',
  't-items': 'flex flex-col gap-3',
  't-item': 'flex items-start gap-2.5 text-[13px] text-gray-700 leading-[1.6]',
  'cases-section': 'py-[clamp(64px,8vw,96px)] bg-white',
  'cases-grid': 'grid grid-cols-1 md:grid-cols-2 gap-5 mt-12',
  'case-card-full': 'bg-gray-50 border border-gray-200 rounded-[22px] p-7 md:p-8 flex flex-col gap-3.5 no-underline hover:-translate-y-1 hover:shadow-lg hover:border-blue-200 transition-all group',
  'cc-graph': 'flex items-end gap-[3px] h-[44px] mb-0.5',
  'cc-bar': 'flex-1 rounded-t-[3px] bg-blue-200',
  'cc-bar hi': 'flex-1 rounded-t-[3px] bg-blue-600',
  'cc-sector': 'text-[10px] font-bold tracking-[0.1em] uppercase text-blue-600',
  'cc-tag': 'inline-block text-[10px] font-semibold text-gray-500 bg-white border border-gray-200 rounded-full py-1 px-2.5 mb-0.5',
  'cc-metric': 'text-[clamp(30px,3.5vw,42px)] font-extrabold text-gray-900 tracking-[-0.03em] leading-none',
  'cc-link': 'inline-flex items-center gap-1.5 text-[13px] font-semibold text-blue-600 mt-1 group-hover:gap-2.5 transition-all',
  'faq-section': 'py-[clamp(64px,8vw,96px)] bg-gray-50',
  'faq-layout': 'grid grid-cols-1 md:grid-cols-2 gap-[40px] md:gap-[60px] items-start',
  'faq-list': 'flex flex-col',
  'faq-item': 'faq-item group border-b border-gray-200 first:border-t',
  'faq-q': 'flex items-center justify-between py-5 cursor-pointer text-sm font-semibold text-gray-900 bg-transparent border-none w-full text-left font-sans gap-3 hover:text-blue-600 transition-colors',
  'faq-arr': 'w-[22px] h-[22px] rounded-full bg-indigo-50 flex items-center justify-center shrink-0 transition-transform duration-300 group-[.open]:rotate-180 group-[.open]:bg-blue-600',
  'faq-a': 'max-h-0 overflow-hidden text-[13px] text-gray-500 leading-[1.75] transition-all duration-300 group-[.open]:max-h-[220px] group-[.open]:pb-[18px]',
  'faq-cta-box': 'bg-blue-600 rounded-[22px] py-8 px-7',
  'btn-white-sm': 'inline-flex items-center gap-2 bg-white text-blue-600 font-sans text-sm font-bold py-3 px-6 rounded-full no-underline hover:bg-indigo-50 hover:-translate-y-0.5 transition-all',
  'faq-trust-note': 'mt-3 text-xs text-white/40 text-center',
  'final-section': 'py-[clamp(64px,8vw,96px)] bg-white',
  'cta-box': 'bg-blue-600 rounded-[28px] py-[clamp(52px,7vw,82px)] px-[clamp(28px,6vw,72px)] text-center relative overflow-hidden',
  'cta-actions': 'flex flex-col sm:flex-row items-center justify-center gap-3 flex-wrap relative z-10',
  'btn-white': 'inline-flex items-center gap-2 bg-white text-blue-600 font-sans text-[15px] font-bold py-3.5 px-8 rounded-full no-underline hover:bg-indigo-50 hover:-translate-y-0.5 transition-all',
  'btn-outline-w': 'inline-flex items-center gap-2 bg-transparent text-white/85 font-sans text-sm font-semibold py-3 px-6 rounded-full border-[1.5px] border-white/35 no-underline hover:border-white/70 hover:text-white transition-colors',
  'cta-trust': 'mt-3.5 text-xs text-white/40 relative z-10',
  'cta-badges': 'flex items-center justify-center gap-4 flex-wrap mt-5 relative z-10',
  'cta-badge': 'text-xs font-medium text-white/60',
  'related-section': 'py-[clamp(64px,8vw,96px)] bg-gray-50',
  'related-grid': 'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-[18px] mt-10',
  'related-card': 'bg-white border border-gray-200 rounded-2xl p-6 no-underline flex flex-col gap-2.5 hover:border-blue-200 hover:shadow-lg hover:-translate-y-1 transition-all group',
  'rel-icon': 'w-[38px] h-[38px] bg-indigo-50 rounded-[10px] flex items-center justify-center',
  'rel-link': 'text-[13px] font-semibold text-blue-600 flex items-center gap-1 mt-auto'
};

let bodyContent = htmlContent.split('<body>')[1].split('</body>')[0];

bodyContent = bodyContent.replace(/<a href="#main" class="skip-link">Skip to main content<\/a>/, '');
bodyContent = bodyContent.split('<footer>')[0]; 
// Remove script tag entirely
bodyContent = bodyContent.replace(/<script>[\s\S]*?<\/script>/g, '');

Object.keys(classMap).forEach(cls => {
  const regex = new RegExp(`class="${cls}"`, 'g');
  bodyContent = bodyContent.replace(regex, `className="${classMap[cls]}"`);
  const regex2 = new RegExp(`class='${cls}'`, 'g');
  bodyContent = bodyContent.replace(regex2, `className='${classMap[cls]}'`);
});
bodyContent = bodyContent.replace(/class="/g, 'className="');
bodyContent = bodyContent.replace(/for="/g, 'htmlFor="');
bodyContent = bodyContent.replace(/stroke-width/g, 'strokeWidth');
bodyContent = bodyContent.replace(/stroke-linecap/g, 'strokeLinecap');
bodyContent = bodyContent.replace(/stroke-linejoin/g, 'strokeLinejoin');
bodyContent = bodyContent.replace(/fill-rule/g, 'fillRule');
bodyContent = bodyContent.replace(/clip-rule/g, 'clipRule');
bodyContent = bodyContent.replace(/stop-color/g, 'stopColor');
bodyContent = bodyContent.replace(/xmlns:xlink/g, 'xmlnsXlink');

bodyContent = bodyContent.replace(/style="width:100%;height:auto;display:block;"/g, "style={{ width: '100%', height: 'auto', display: 'block' }}");
bodyContent = bodyContent.replace(/style="background:#1D4ED8;"/g, "style={{ background: '#1D4ED8' }}");
bodyContent = bodyContent.replace(/style="background:#0F172A;"/g, "style={{ background: '#0F172A' }}");
bodyContent = bodyContent.replace(/style="background:#0369A1;"/g, "style={{ background: '#0369A1' }}");
bodyContent = bodyContent.replace(/style="background:#059669;"/g, "style={{ background: '#059669' }}");
bodyContent = bodyContent.replace(/style="background:#7C3AED;"/g, "style={{ background: '#7C3AED' }}");
bodyContent = bodyContent.replace(/style="margin-bottom:28px;display:inline-flex;"/g, "style={{ marginBottom: '28px', display: 'inline-flex' }}");

bodyContent = bodyContent.replace(/<style>[\s\S]*?<\/style>/g, '');
bodyContent = bodyContent.replace(/<br>/g, '<br/>');

// Fix comments with gs flags
bodyContent = bodyContent.replace(/<!--([\s\S]*?)-->/g, '{/* $1 */}');

// The faq arrows SVG uses stroke="#fff" based on a group hover, but we will handle the FAQ state in react or using group-hover.
// Let's replace the group-[.open] for FAQ items to use standard React state or simple vanilla JS in useEffect since it's already coded to toggle the .open class.

const componentCode = `import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';

const ServiceSeo: React.FC = () => {

  useEffect(() => {
    // Reveal intersection observer
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
    }, { threshold: 0.06, rootMargin: '0px 0px -20px 0px' });
    document.querySelectorAll('.reveal').forEach(el => io.observe(el));

    // Tab nav observer
    const sections = ['technical-seo','onpage-seo','local-seo','link-building'];
    const tabLinks = document.querySelectorAll('.tab-link[data-section]');
    const sectionObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          tabLinks.forEach(l => {
            if (l instanceof HTMLElement) {
              if (l.dataset.section === id) {
                l.classList.add('active', 'text-blue-600', 'border-blue-600');
                l.classList.remove('text-gray-500', 'border-transparent');
              } else {
                l.classList.remove('active', 'text-blue-600', 'border-blue-600');
                l.classList.add('text-gray-500', 'border-transparent');
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

    // FAQ Accordion
    document.querySelectorAll('.faq-q').forEach(btn => {
      btn.addEventListener('click', () => {
        const item = btn.closest('.faq-item');
        if (!item) return;
        const isOpen = item.classList.contains('open');
        document.querySelectorAll('.faq-item.open').forEach(i => {
          i.classList.remove('open');
          i.querySelector('.faq-q')?.setAttribute('aria-expanded', 'false');
        });
        if (!isOpen) { 
          item.classList.add('open'); 
          btn.setAttribute('aria-expanded', 'true'); 
        }
      });
    });
  }, []);

  return (
    <>
      <Helmet>
        <title>Search Engine Optimisation — Zevenstone Digital Marketing</title>
        <meta name="description" content="Technical SEO, On-Page & Content, Local SEO, and Link Building — delivered as one integrated system that turns search visibility into measurable business growth." />
      </Helmet>
      ${bodyContent}
    </>
  );
};

export default ServiceSeo;
`;

const outPath = path.join('d:\\Website-Project\\zevenstonewebsite\\pages', 'ServiceSeo.tsx');
fs.writeFileSync(outPath, componentCode);
console.log('Converted ServiceSeo.tsx successfully!');
