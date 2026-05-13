import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

function figmaAssetResolver() {
  return {
    name: 'figma-asset-resolver',
    resolveId(id) {
      if (id.startsWith('figma:asset/')) {
        const filename = id.replace('figma:asset/', '')
        // Point to the new modular assets directory
        return path.resolve(__dirname, 'modules/landing-pages/zstone-v1/assets', filename)
      }
    },
  }
}

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, '.', '');
    return {
      base: '/',
      server: {
        port: 3000,
        host: true, // binds to both IPv4 and IPv6 to avoid localhost issues
        headers: {
          // Allow Sanity Studio (localhost:3333) to embed this app in an iframe
          // for the Presentation Tool (live split-screen preview)
          'Access-Control-Allow-Origin': '*',
          'X-Frame-Options': 'ALLOWALL',
          'Content-Security-Policy': "frame-ancestors 'self' http://localhost:3333 https://*.sanity.studio",
        },
      },
      plugins: [
        figmaAssetResolver(),
        react(), 
        tailwindcss()
      ],
      define: {
        'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY),
        'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY)
      },
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '.'),
        }
      },
      assetsInclude: ['**/*.svg', '**/*.csv'],
    };
});
