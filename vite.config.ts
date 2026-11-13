import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { VitePWA } from 'vite-plugin-pwa'
import path from 'node:path'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'logo-emblem.png', 'logo-lockup.png'],
      manifest: {
        name: 'Parent Advocacy Alliance',
        short_name: 'PAA',
        description:
          'Nationwide resources, advocacy tools, and support for families facing mental health, basic needs, and substance use challenges.',
        theme_color: '#1A1614',
        background_color: '#F5F1EA',
        display: 'standalone',
        orientation: 'portrait',
        scope: '/',
        start_url: '/',
        icons: [
          { src: '/icon-192.png', sizes: '192x192', type: 'image/png', purpose: 'any' },
          { src: '/icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'any' },
          { src: '/icon-maskable-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
        ],
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,woff2}'],
        navigateFallbackDenylist: [/^\/api\//],
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/.*\.supabase\.co\/rest\/v1\/resources.*/i,
            handler: 'StaleWhileRevalidate',
            options: { cacheName: 'resource-cache', expiration: { maxEntries: 200, maxAgeSeconds: 86400 } },
          },
          {
            urlPattern: /^https:\/\/.*\.supabase\.co\/rest\/v1\/crisis_resources.*/i,
            handler: 'CacheFirst',
            options: { cacheName: 'crisis-cache', expiration: { maxEntries: 50, maxAgeSeconds: 604800 } },
          },
        ],
      },
    }),
  ],
  resolve: {
    alias: { '@': path.resolve(import.meta.dirname, './src') },
  },
})
