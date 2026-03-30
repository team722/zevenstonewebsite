import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

const token = import.meta.env.VITE_SANITY_TOKEN;

export const sanityClient = createClient({
  projectId: import.meta.env.VITE_SANITY_PROJECT_ID,
  dataset: import.meta.env.VITE_SANITY_DATASET,
  // CDN must be OFF when using a token (CDN doesn't support auth requests)
  // CDN is ON when no token (faster for regular public users)
  useCdn: !token,
  token: token || undefined,
  apiVersion: '2024-01-01',
  perspective: token ? 'previewDrafts' : 'published',
});

// Helper to generate optimized image URLs from Sanity image assets
const builder = imageUrlBuilder(sanityClient);

export const urlFor = (source: any) => {
  // Safe fallback to prevent app crashes when images are missing in Sanity CMS
  if (!source) {
    return { url: () => '' };
  }
  return builder.image(source);
};
