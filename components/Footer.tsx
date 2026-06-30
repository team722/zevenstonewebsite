import React from 'react';
import { Link } from 'react-router-dom';
import { Check, Facebook, Instagram, Linkedin, X } from 'lucide-react';
import { Logo } from './ui/Logo';
import { useQuery } from '@tanstack/react-query';
import { sanityClient } from '../lib/sanity';
import { SITE_SETTINGS_QUERY } from '../lib/queries';
import { isBlockedLiveNestedServicePath } from '../lib/liveServiceGuards';

type FooterLinkItem = {
  _key?: string;
  text?: string;
  label?: string;
  url?: string;
  path?: string;
  href?: string;
};

type FooterColumn = {
  _key?: string;
  title?: string;
  url?: string;
  links?: FooterLinkItem[];
};

type FooterOffice = {
  _key?: string;
  title?: string;
  address?: string;
};

const defaultDescription =
  'We design digital experiences that captivate and convert. From portfolio to full-scale digital ecosystems built for impact, backed by ROI.';

const defaultQuickLinks: FooterLinkItem[] = [
  { text: 'About', url: '/about' },
  { text: 'Services', url: '/services' },
  { text: 'Portfolio', url: '/portfolio' },
  { text: 'Contact', url: '/contact' },
];

const defaultServices: FooterLinkItem[] = [
  { text: 'SEO & Growth', url: '/services' },
  { text: 'Web Development', url: '/services' },
  { text: 'Marketing Automation', url: '/services' },
  { text: 'AI & Media', url: '/services' },
];

const defaultResourceLinks: FooterLinkItem[] = [
  { text: 'Book a Strategy Call', url: '/contact' },
  { text: 'Case Studies', url: '/success-stories' },
  { text: 'Blog', url: '/blog' },
];

const defaultLegalLinks: FooterLinkItem[] = [
  { text: 'Privacy Policy', url: '/privacy-policy' },
  { text: 'Terms of Service', url: '/terms-and-conditions' },
];

const defaultTrustBadges = [
  'NDA Protected - Every Engagement',
  '100% White-Label Available',
  'No Lock-In Contracts',
  'Monthly Revenue Reporting',
  'Ohio HQ + India Delivery Team',
];

const hasItems = <T,>(items?: T[] | null): items is T[] =>
  Array.isArray(items) && items.length > 0;

const getLinkText = (item: FooterLinkItem) => item.text || item.label || '';

const getRawUrl = (item: FooterLinkItem) => item.url || item.path || item.href || '#';

const normalizeUrl = (url?: string) => {
  if (!url) return '#';
  const trimmedUrl = url.trim();

  if (
    trimmedUrl.startsWith('/') ||
    trimmedUrl.startsWith('#') ||
    /^(https?:|mailto:|tel:)/i.test(trimmedUrl)
  ) {
    return trimmedUrl;
  }

  return `/${trimmedUrl.replace(/^\/+/, '')}`;
};

const toExternalHref = (url?: string) => {
  if (!url) return '';
  const trimmedUrl = url.trim();

  if (/^(https?:|mailto:|tel:)/i.test(trimmedUrl)) {
    return trimmedUrl;
  }

  return `https://${trimmedUrl.replace(/^\/+/, '')}`;
};

const formatPhoneHref = (phone?: string) => {
  const normalizedPhone = phone?.replace(/[^\d+]/g, '');
  return normalizedPhone ? `tel:${normalizedPhone}` : '';
};

const filterLinks = (links?: FooterLinkItem[] | null) =>
  (links || []).filter((item) => getLinkText(item) && getRawUrl(item) && !isBlockedLiveNestedServicePath(getRawUrl(item)));

const filterColumns = (columns?: FooterColumn[] | null) =>
  (columns || [])
    .map((column) => ({
      ...column,
      links: filterLinks(column.links),
    }))
    .filter((column) => column.title && column.links.length > 0);

const SmartFooterLink: React.FC<{
  item: FooterLinkItem;
  className?: string;
  children?: React.ReactNode;
}> = ({ item, className = '', children }) => {
  const label = children || getLinkText(item);
  const url = normalizeUrl(getRawUrl(item));
  const isExternal = /^(https?:|mailto:|tel:)/i.test(url) || url.startsWith('#');
  const opensNewTab = /^https?:/i.test(url);

  if (isExternal) {
    return (
      <a
        href={url}
        className={className}
        target={opensNewTab ? '_blank' : undefined}
        rel={opensNewTab ? 'noreferrer' : undefined}
      >
        {label}
      </a>
    );
  }

  return (
    <Link to={url} className={className}>
      {label}
    </Link>
  );
};

const FooterColumnBlock: React.FC<{ column: FooterColumn; featured?: boolean }> = ({
  column,
  featured = false,
}) => {
  const headingClass = 'mb-6 block text-base font-bold leading-snug text-white';

  return (
    <div>
      {column.url ? (
        <SmartFooterLink item={{ text: column.title, url: column.url }} className={headingClass}>
          {column.title}
        </SmartFooterLink>
      ) : (
        <h3 className={headingClass}>{column.title}</h3>
      )}
      <ul className={`max-w-[150px] ${featured ? 'space-y-4' : 'space-y-4'}`}>
        {column.links?.map((item, index) => (
          <li key={item._key || `${getLinkText(item)}-${index}`}>
            <SmartFooterLink
              item={item}
              className="text-sm leading-relaxed text-slate-400 transition-colors duration-200 hover:text-zeven-blue"
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export const Footer: React.FC = () => {
  const { data: siteSettings } = useQuery({
    queryKey: ['siteSettings'],
    queryFn: () => sanityClient.fetch(SITE_SETTINGS_QUERY),
  });

  const quickLinks = hasItems(siteSettings?.footerNavigation)
    ? filterLinks(siteSettings.footerNavigation)
    : defaultQuickLinks;
  const servicesLinks = hasItems(siteSettings?.footerServices)
    ? filterLinks(siteSettings.footerServices)
    : defaultServices;
  const legalLinks = hasItems(siteSettings?.legalLinks)
    ? filterLinks(siteSettings.legalLinks)
    : defaultLegalLinks;

  const cmsServiceColumns = filterColumns(siteSettings?.footerServiceColumns);
  const nestedServiceColumns = (siteSettings?.nestedServiceColumns || [])
    .map((column: FooterColumn) => {
      const nestedLinks = filterLinks(column.links);
      return {
        ...column,
        links: nestedLinks.length > 0 ? nestedLinks : servicesLinks,
      };
    })
    .filter((column: FooterColumn) => column.title && column.links && column.links.length > 0);
  const serviceColumns =
    cmsServiceColumns.length > 0
      ? cmsServiceColumns
      : nestedServiceColumns.length > 0
        ? nestedServiceColumns
        : [{ title: 'Expertise', links: servicesLinks }];

  const cmsLinkColumns = filterColumns(siteSettings?.footerLinkColumns);
  const secondaryColumns =
    cmsLinkColumns.length > 0
      ? cmsLinkColumns
      : [
          { title: 'Company', links: quickLinks },
          { title: 'Resources', links: defaultResourceLinks },
          { title: 'Services', links: servicesLinks },
        ].filter((column) => column.links.length > 0);

  const trustBadges = hasItems(siteSettings?.footerTrustBadges)
    ? siteSettings.footerTrustBadges.filter(Boolean)
    : defaultTrustBadges;

  const officeLocations: FooterOffice[] = hasItems(siteSettings?.officeLocations)
    ? siteSettings.officeLocations.filter((office: FooterOffice) => office.title && office.address)
    : [
        { title: 'USA Office', address: siteSettings?.address1 },
        { title: 'Thirunelveli Office', address: siteSettings?.address2 },
        { title: 'Chennai Office', address: siteSettings?.address3 },
      ].filter((office) => office.address);

  const companyName = siteSettings?.companyName || 'Zevenstone LLC';
  const contactEmail = siteSettings?.contactEmail || 'hello@zevenstone.com';
  const phoneNumber = siteSettings?.phoneNumber || '+91-9876-543-210';
  const websiteLabel = (siteSettings?.websiteUrl || 'zevenstone.com')
    .replace(/^https?:\/\//i, '')
    .replace(/\/$/, '');
  const websiteHref = toExternalHref(siteSettings?.websiteUrl || 'zevenstone.com');
  const phoneHref = formatPhoneHref(phoneNumber);

  const socialLinks = [
    { label: 'LinkedIn', url: siteSettings?.linkedIn, icon: <Linkedin size={16} strokeWidth={1.7} /> },
    { label: 'Instagram', url: siteSettings?.instagram, icon: <Instagram size={16} strokeWidth={1.7} /> },
    { label: 'X', url: siteSettings?.twitter, icon: <X size={16} strokeWidth={1.7} /> },
    { label: 'Facebook', url: siteSettings?.facebook, icon: <Facebook size={16} strokeWidth={1.7} /> },
  ].filter((item) => item.url);

  return (
    <footer className="border-t border-white/5 bg-zeven-dark pt-20 pb-10 font-sans text-white">
      <div className="container mx-auto px-6">
        <div className="grid gap-12 lg:grid-cols-[280px_1fr] xl:grid-cols-[300px_1fr] xl:gap-16">
          <div className="max-w-[300px]">
            <Link to="/" className="mb-4 inline-flex" aria-label="Zevenstone home">
              {siteSettings?.logoUrl ? (
                <img src={siteSettings.logoUrl} alt="Zevenstone" className="h-11 w-auto object-contain brightness-0 invert" />
              ) : (
                <Logo white className="h-11 w-auto opacity-95" />
              )}
            </Link>
            <p className="max-w-[270px] whitespace-pre-wrap text-sm leading-relaxed text-slate-400">
              {siteSettings?.footerDescription || defaultDescription}
            </p>

            <div className="mt-10 space-y-2 text-sm leading-relaxed text-slate-400">
              <p className="font-semibold text-slate-300">{companyName}</p>
              {contactEmail && (
                <a href={`mailto:${contactEmail}`} className="block transition-colors hover:text-zeven-blue">
                  {contactEmail}
                </a>
              )}
              {phoneNumber && phoneHref && (
                <a href={phoneHref} className="block transition-colors hover:text-zeven-blue">
                  {phoneNumber}
                </a>
              )}
              {websiteHref && (
                <a href={websiteHref} target="_blank" rel="noreferrer" className="block transition-colors hover:text-zeven-blue">
                  {websiteLabel}
                </a>
              )}
            </div>

            {socialLinks.length > 0 && (
              <div className="mt-4 flex flex-wrap gap-3">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={toExternalHref(social.url)}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={social.label}
                    title={social.label}
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition-all duration-200 hover:bg-zeven-blue"
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 gap-9 sm:grid-cols-2 xl:grid-cols-4 xl:gap-10">
            {serviceColumns.map((column, index) => (
              <FooterColumnBlock key={column._key || `${column.title}-${index}`} column={column} featured />
            ))}
          </div>
        </div>

        {secondaryColumns.length > 0 && (
          <div className="mt-12 xl:mt-4  grid gap-10 lg:grid-cols-[280px_1fr] xl:grid-cols-[300px_1fr] xl:gap-16">
            <div className="hidden lg:block" aria-hidden="true" />
            <div className="grid grid-cols-1 gap-9 sm:grid-cols-2 lg:max-w-[640px] lg:grid-cols-3">
              {secondaryColumns.map((column, index) => (
                <FooterColumnBlock key={column._key || `${column.title}-${index}`} column={column} />
              ))}
            </div>
          </div>
        )}

        {trustBadges.length > 0 && (
          <div className="mt-16 border-t border-white/5 pt-8">
            <div className="flex flex-wrap gap-3">
              {trustBadges.map((badge: string) => (
                <span
                  key={badge}
                  className="inline-flex min-h-8 items-center gap-2 rounded-full border border-white/10 bg-transparent px-4 text-sm leading-none text-slate-400"
                >
                  <Check size={13} strokeWidth={2.2} className="text-zeven-blue" />
                  {badge}
                </span>
              ))}
            </div>
          </div>
        )}

        {officeLocations.length > 0 && (
          <div className="mt-8 border-t border-white/5 pt-7">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-3 md:gap-10 lg:gap-16">
              {officeLocations.map((office, index) => (
                <div key={office._key || `${office.title}-${index}`} className="max-w-[320px]">
                  <h3 className="mb-4 text-sm font-bold capitalize tracking-widest text-zeven-blue">
                    {office.title}
                  </h3>
                  <p className="whitespace-pre-line text-sm leading-relaxed text-slate-400">
                    {office.address}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="mt-8 flex flex-col gap-5 border-t border-white/10 pt-8 text-sm text-slate-500 md:flex-row md:items-center md:justify-between">
          <p>
            {siteSettings?.copyrightText
              ? siteSettings.copyrightText.replace('{{year}}', new Date().getFullYear().toString())
              : `\u00A9 ${new Date().getFullYear()} Zevenstone. All rights reserved.`}
          </p>
          <div className="flex flex-wrap gap-x-8 gap-y-3">
            {legalLinks.map((item, index) => (
              <SmartFooterLink
                key={item._key || `${getLinkText(item)}-${index}`}
                item={item}
                className="transition-colors hover:text-white"
              />
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};
