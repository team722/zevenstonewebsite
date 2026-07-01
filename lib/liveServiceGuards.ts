const LIVE_HOSTNAMES = new Set(['zevenstone.com', 'www.zevenstone.com']);

const BLOCKED_LIVE_NESTED_SERVICE_PATHS = new Set([
  '/services/marketing-automation/ai-assisted-operations',
  '/services/marketing-automation/martech-reporting',
  '/services/tech-solutions/website-design-development',
  '/services/tech-solutions/e-commerce-development',
  '/services/tech-solutions/web-app-development',
  '/services/tech-solutions/landing-pages-cro',
]);

const ENABLE_LIVE_SERVICE_GUARDS = false;

export const slugifyServicePathSegment = (text: string) =>
  text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');

export const isLiveProductionHost = () => {
  if (typeof window === 'undefined') return false;
  return LIVE_HOSTNAMES.has(window.location.hostname.toLowerCase());
};

export const normalizeInternalPath = (path?: string) => {
  if (!path) return '';

  const trimmedPath = path.trim();

  if (/^(https?:)?\/\//i.test(trimmedPath)) {
    try {
      const currentHost = typeof window === 'undefined' ? '' : window.location.hostname.toLowerCase();
      const currentOrigin = typeof window === 'undefined' ? 'https://zevenstone.com' : window.location.origin;
      const url = new URL(trimmedPath, currentOrigin);
      const urlHost = url.hostname.toLowerCase();

      if (!LIVE_HOSTNAMES.has(urlHost) && urlHost !== currentHost) return '';

      return url.pathname.toLowerCase().replace(/\/$/, '');
    } catch {
      return '';
    }
  }

  const pathOnly = trimmedPath.split(/[?#]/)[0] || '';
  return `/${pathOnly.replace(/^\/+/, '')}`.toLowerCase().replace(/\/$/, '');
};

export const isBlockedLiveNestedServicePath = (path?: string) =>
    ENABLE_LIVE_SERVICE_GUARDS && isLiveProductionHost() && BLOCKED_LIVE_NESTED_SERVICE_PATHS.has(normalizeInternalPath(path));


export const isBlockedLiveNestedServiceRoute = (category?: string, slug?: string) => {
  if (!category || !slug) return false;
  return isBlockedLiveNestedServicePath(`/services/${category}/${slug}`);
};
