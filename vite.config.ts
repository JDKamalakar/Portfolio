import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
// 1. Import the VitePWA plugin
import { VitePWA } from 'vite-plugin-pwa';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    // 2. Add the VitePWA plugin and its configuration
    VitePWA({
      registerType: 'autoUpdate',
      // This will create a manifest.webmanifest file in your dist folder.
      // You can customize the details below.
      manifest: {
        name: 'Jayraj Kamalakar - Portfolio',
        short_name: 'JK Portfolio',
        description: 'A personal portfolio website showcasing the projects and skills of Jayraj Kamalakar.',
        theme_color: '#1a73e8', // A nice blue theme color
        background_color: '#ffffff',
        icons: [
          {
            src: 'pwa-192x192.png', // path is relative to the public folder
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: 'pwa-512x512.png', // path is relative to the public folder
            sizes: '512x512',
            type: 'image/png',
          },
          {
            src: 'pwa-512x512.png', // for Apple touch icon
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable',
          },
        ],
      },
      // This part configures the service worker for offline caching
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg}'],
      },
      // (Optional) Enable the service worker in development for testing
      devOptions: {
        enabled: true,
      },
    }),
  ],
  // Your existing configurations are kept
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          icons: ['lucide-react'],
        },
      },
    },
  },
  // The old server header is now removed as it's no longer necessary
});