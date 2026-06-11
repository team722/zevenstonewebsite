import { createClient } from '@sanity/client';
import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

const client = createClient({
  projectId: process.env.VITE_SANITY_PROJECT_ID,
  dataset: process.env.VITE_SANITY_DATASET,
  useCdn: false,
  token: process.env.VITE_SANITY_TOKEN,
  apiVersion: '2024-01-01',
});

async function run() {
  const docs = await client.fetch('*[_type == "service"]{title, "slug": slug.current}');
  console.log(JSON.stringify(docs, null, 2));
}
run();
