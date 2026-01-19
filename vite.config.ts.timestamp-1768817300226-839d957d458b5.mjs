// vite.config.ts
import { defineConfig } from "file:///home/project/node_modules/vite/dist/node/index.js";
import react from "file:///home/project/node_modules/@vitejs/plugin-react/dist/index.mjs";
import { VitePWA } from "file:///home/project/node_modules/vite-plugin-pwa/dist/index.js";
var vite_config_default = defineConfig({
  plugins: [
    react(),
    // 2. Add the VitePWA plugin and its configuration
    VitePWA({
      registerType: "autoUpdate",
      // This will create a manifest.webmanifest file in your dist folder.
      // You can customize the details below.
      manifest: {
        name: "Jayraj Kamalakar - Portfolio",
        short_name: "JK Portfolio",
        description: "A personal portfolio website showcasing the projects and skills of Jayraj Kamalakar.",
        theme_color: "#1a73e8",
        // A nice blue theme color
        background_color: "#ffffff",
        icons: [
          {
            src: "pwa-192x192.png",
            // path is relative to the public folder
            sizes: "192x192",
            type: "image/png"
          },
          {
            src: "pwa-512x512.png",
            // path is relative to the public folder
            sizes: "512x512",
            type: "image/png"
          },
          {
            src: "pwa-512x512.png",
            // for Apple touch icon
            sizes: "512x512",
            type: "image/png",
            purpose: "any maskable"
          }
        ]
      },
      // This part configures the service worker for offline caching
      workbox: {
        globPatterns: ["**/*.{js,css,html,ico,png,svg}"]
      },
      // (Optional) Enable the service worker in development for testing
      devOptions: {
        enabled: true
      }
    })
  ],
  // Your existing configurations are kept
  optimizeDeps: {
    exclude: ["lucide-react"]
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ["react", "react-dom"],
          icons: ["lucide-react"]
        }
      }
    }
  }
  // The old server header is now removed as it's no longer necessary
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvaG9tZS9wcm9qZWN0XCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCIvaG9tZS9wcm9qZWN0L3ZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9ob21lL3Byb2plY3Qvdml0ZS5jb25maWcudHNcIjtpbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tICd2aXRlJztcbmltcG9ydCByZWFjdCBmcm9tICdAdml0ZWpzL3BsdWdpbi1yZWFjdCc7XG4vLyAxLiBJbXBvcnQgdGhlIFZpdGVQV0EgcGx1Z2luXG5pbXBvcnQgeyBWaXRlUFdBIH0gZnJvbSAndml0ZS1wbHVnaW4tcHdhJztcblxuLy8gaHR0cHM6Ly92aXRlanMuZGV2L2NvbmZpZy9cbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyh7XG4gIHBsdWdpbnM6IFtcbiAgICByZWFjdCgpLFxuICAgIC8vIDIuIEFkZCB0aGUgVml0ZVBXQSBwbHVnaW4gYW5kIGl0cyBjb25maWd1cmF0aW9uXG4gICAgVml0ZVBXQSh7XG4gICAgICByZWdpc3RlclR5cGU6ICdhdXRvVXBkYXRlJyxcbiAgICAgIC8vIFRoaXMgd2lsbCBjcmVhdGUgYSBtYW5pZmVzdC53ZWJtYW5pZmVzdCBmaWxlIGluIHlvdXIgZGlzdCBmb2xkZXIuXG4gICAgICAvLyBZb3UgY2FuIGN1c3RvbWl6ZSB0aGUgZGV0YWlscyBiZWxvdy5cbiAgICAgIG1hbmlmZXN0OiB7XG4gICAgICAgIG5hbWU6ICdKYXlyYWogS2FtYWxha2FyIC0gUG9ydGZvbGlvJyxcbiAgICAgICAgc2hvcnRfbmFtZTogJ0pLIFBvcnRmb2xpbycsXG4gICAgICAgIGRlc2NyaXB0aW9uOiAnQSBwZXJzb25hbCBwb3J0Zm9saW8gd2Vic2l0ZSBzaG93Y2FzaW5nIHRoZSBwcm9qZWN0cyBhbmQgc2tpbGxzIG9mIEpheXJhaiBLYW1hbGFrYXIuJyxcbiAgICAgICAgdGhlbWVfY29sb3I6ICcjMWE3M2U4JywgLy8gQSBuaWNlIGJsdWUgdGhlbWUgY29sb3JcbiAgICAgICAgYmFja2dyb3VuZF9jb2xvcjogJyNmZmZmZmYnLFxuICAgICAgICBpY29uczogW1xuICAgICAgICAgIHtcbiAgICAgICAgICAgIHNyYzogJ3B3YS0xOTJ4MTkyLnBuZycsIC8vIHBhdGggaXMgcmVsYXRpdmUgdG8gdGhlIHB1YmxpYyBmb2xkZXJcbiAgICAgICAgICAgIHNpemVzOiAnMTkyeDE5MicsXG4gICAgICAgICAgICB0eXBlOiAnaW1hZ2UvcG5nJyxcbiAgICAgICAgICB9LFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIHNyYzogJ3B3YS01MTJ4NTEyLnBuZycsIC8vIHBhdGggaXMgcmVsYXRpdmUgdG8gdGhlIHB1YmxpYyBmb2xkZXJcbiAgICAgICAgICAgIHNpemVzOiAnNTEyeDUxMicsXG4gICAgICAgICAgICB0eXBlOiAnaW1hZ2UvcG5nJyxcbiAgICAgICAgICB9LFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIHNyYzogJ3B3YS01MTJ4NTEyLnBuZycsIC8vIGZvciBBcHBsZSB0b3VjaCBpY29uXG4gICAgICAgICAgICBzaXplczogJzUxMng1MTInLFxuICAgICAgICAgICAgdHlwZTogJ2ltYWdlL3BuZycsXG4gICAgICAgICAgICBwdXJwb3NlOiAnYW55IG1hc2thYmxlJyxcbiAgICAgICAgICB9LFxuICAgICAgICBdLFxuICAgICAgfSxcbiAgICAgIC8vIFRoaXMgcGFydCBjb25maWd1cmVzIHRoZSBzZXJ2aWNlIHdvcmtlciBmb3Igb2ZmbGluZSBjYWNoaW5nXG4gICAgICB3b3JrYm94OiB7XG4gICAgICAgIGdsb2JQYXR0ZXJuczogWycqKi8qLntqcyxjc3MsaHRtbCxpY28scG5nLHN2Z30nXSxcbiAgICAgIH0sXG4gICAgICAvLyAoT3B0aW9uYWwpIEVuYWJsZSB0aGUgc2VydmljZSB3b3JrZXIgaW4gZGV2ZWxvcG1lbnQgZm9yIHRlc3RpbmdcbiAgICAgIGRldk9wdGlvbnM6IHtcbiAgICAgICAgZW5hYmxlZDogdHJ1ZSxcbiAgICAgIH0sXG4gICAgfSksXG4gIF0sXG4gIC8vIFlvdXIgZXhpc3RpbmcgY29uZmlndXJhdGlvbnMgYXJlIGtlcHRcbiAgb3B0aW1pemVEZXBzOiB7XG4gICAgZXhjbHVkZTogWydsdWNpZGUtcmVhY3QnXSxcbiAgfSxcbiAgYnVpbGQ6IHtcbiAgICByb2xsdXBPcHRpb25zOiB7XG4gICAgICBvdXRwdXQ6IHtcbiAgICAgICAgbWFudWFsQ2h1bmtzOiB7XG4gICAgICAgICAgdmVuZG9yOiBbJ3JlYWN0JywgJ3JlYWN0LWRvbSddLFxuICAgICAgICAgIGljb25zOiBbJ2x1Y2lkZS1yZWFjdCddLFxuICAgICAgICB9LFxuICAgICAgfSxcbiAgICB9LFxuICB9LFxuICAvLyBUaGUgb2xkIHNlcnZlciBoZWFkZXIgaXMgbm93IHJlbW92ZWQgYXMgaXQncyBubyBsb25nZXIgbmVjZXNzYXJ5XG59KTsiXSwKICAibWFwcGluZ3MiOiAiO0FBQXlOLFNBQVMsb0JBQW9CO0FBQ3RQLE9BQU8sV0FBVztBQUVsQixTQUFTLGVBQWU7QUFHeEIsSUFBTyxzQkFBUSxhQUFhO0FBQUEsRUFDMUIsU0FBUztBQUFBLElBQ1AsTUFBTTtBQUFBO0FBQUEsSUFFTixRQUFRO0FBQUEsTUFDTixjQUFjO0FBQUE7QUFBQTtBQUFBLE1BR2QsVUFBVTtBQUFBLFFBQ1IsTUFBTTtBQUFBLFFBQ04sWUFBWTtBQUFBLFFBQ1osYUFBYTtBQUFBLFFBQ2IsYUFBYTtBQUFBO0FBQUEsUUFDYixrQkFBa0I7QUFBQSxRQUNsQixPQUFPO0FBQUEsVUFDTDtBQUFBLFlBQ0UsS0FBSztBQUFBO0FBQUEsWUFDTCxPQUFPO0FBQUEsWUFDUCxNQUFNO0FBQUEsVUFDUjtBQUFBLFVBQ0E7QUFBQSxZQUNFLEtBQUs7QUFBQTtBQUFBLFlBQ0wsT0FBTztBQUFBLFlBQ1AsTUFBTTtBQUFBLFVBQ1I7QUFBQSxVQUNBO0FBQUEsWUFDRSxLQUFLO0FBQUE7QUFBQSxZQUNMLE9BQU87QUFBQSxZQUNQLE1BQU07QUFBQSxZQUNOLFNBQVM7QUFBQSxVQUNYO0FBQUEsUUFDRjtBQUFBLE1BQ0Y7QUFBQTtBQUFBLE1BRUEsU0FBUztBQUFBLFFBQ1AsY0FBYyxDQUFDLGdDQUFnQztBQUFBLE1BQ2pEO0FBQUE7QUFBQSxNQUVBLFlBQVk7QUFBQSxRQUNWLFNBQVM7QUFBQSxNQUNYO0FBQUEsSUFDRixDQUFDO0FBQUEsRUFDSDtBQUFBO0FBQUEsRUFFQSxjQUFjO0FBQUEsSUFDWixTQUFTLENBQUMsY0FBYztBQUFBLEVBQzFCO0FBQUEsRUFDQSxPQUFPO0FBQUEsSUFDTCxlQUFlO0FBQUEsTUFDYixRQUFRO0FBQUEsUUFDTixjQUFjO0FBQUEsVUFDWixRQUFRLENBQUMsU0FBUyxXQUFXO0FBQUEsVUFDN0IsT0FBTyxDQUFDLGNBQWM7QUFBQSxRQUN4QjtBQUFBLE1BQ0Y7QUFBQSxJQUNGO0FBQUEsRUFDRjtBQUFBO0FBRUYsQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
