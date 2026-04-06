import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

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
      plugins: [react()],
      define: {
        'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY),
        'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY)
      },
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '.'),
        }
      }
    };
});
