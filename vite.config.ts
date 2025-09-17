import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,webp,jpg,jpeg,pdf}'],
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'google-fonts-cache',
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24 * 365 // 1 year
              },
              cacheKeyWillBeUsed: async ({ request }) => {
                return `${request.url}?${Date.now()}`;
              }
            }
          },
          {
            urlPattern: /^https:\/\/fonts\.gstatic\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'gstatic-fonts-cache',
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24 * 365 // 1 year
              }
            }
          },
          {
            urlPattern: /\.(?:png|jpg|jpeg|svg|gif|webp|ico)$/,
            handler: 'CacheFirst',
            options: {
              cacheName: 'images-cache',
              expiration: {
                maxEntries: 100,
                maxAgeSeconds: 60 * 60 * 24 * 30 // 30 days
              }
            }
          }
        ]
      },
      includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'masked-icon.svg'],
      manifest: {
        name: 'Jayraj Kamalakar - Portfolio',
        short_name: 'JK Portfolio',
        description: 'Professional portfolio website showcasing skills, experience, and projects of Jayraj Kamalakar - B.Tech CSE Graduate',
        theme_color: '#3b82f6',
        background_color: '#1e293b',
        display: 'standalone',
        orientation: 'portrait-primary',
        scope: '/',
        start_url: '/',
        icons: [
          {
            src: '/assets/cv.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: '/assets/cv.png',
            sizes: '512x512',
            type: 'image/png'
          },
          {
            src: '/assets/cv.png',
            sizes: '192x192',
            type: 'image/png',
            purpose: 'maskable'
          },
          {
            src: '/assets/cv.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable'
          }
        ],
        shortcuts: [
          {
            name: 'View Projects',
            short_name: 'Projects',
            description: 'View my latest projects and work',
            url: '/#projects',
            icons: [
              {
                src: '/assets/cv.png',
                sizes: '192x192',
                type: 'image/png'
              }
            ]
          },
          {
            name: 'Contact Me',
            short_name: 'Contact',
            description: 'Get in touch with me',
            url: '/#contact',
            icons: [
              {
                src: '/assets/cv.png',
                sizes: '192x192',
                type: 'image/png'
              }
            ]
          },
          {
            name: 'Download CV',
            short_name: 'CV',
            description: 'Download my resume/CV',
            url: '/assets/jayraj-kamalakar-cv.pdf',
            icons: [
              {
                src: '/assets/cv.png',
                sizes: '192x192',
                type: 'image/png'
              }
            ]
          }
        ]
      },
      devOptions: {
        enabled: true
      }
    })
  ],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          icons: ['lucide-react']
        }
      }
    }
  }
});