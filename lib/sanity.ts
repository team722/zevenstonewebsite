import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

export const sanityClient = createClient({
  projectId: import.meta.env.VITE_SANITY_PROJECT_ID,
  dataset: import.meta.env.VITE_SANITY_DATASET,
  useCdn: true,          // Enable edge caching (fastest for users)
  apiVersion: '2024-01-01',
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
