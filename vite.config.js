import { defineConfig } from 'vite';
// import vue from '@vitejs/plugin-vue'; // Removed Vue plugin import
import react from '@vitejs/plugin-react'; // Assuming react plugin is needed and installed
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    // vue(), // Removed Vue plugin usage
    react(), // Keep or add react plugin if necessary
    VitePWA({
      registerType: 'autoUpdate',
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,json}'],
        skipWaiting: true,
        clientsClaim: true,
        cleanupOutdatedCaches: true,
        // Reducir la cantidad de archivos a cachear inicialmente
        maximumFileSizeToCacheInBytes: 3 * 1024 * 1024, // 3MB máximo
        // Excluir recursos que podrían fallar
        navigateFallbackDenylist: [/^\/api/, /\.(json|xml|csv|md)$/]
      },
      includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'mask-icon.svg'],
      manifest: {
        name: 'Hospital App',
        short_name: 'Hospital',
        start_url: '/',
        display: 'standalone',
        background_color: '#ffffff',
        theme_color: '#42b983',
        icons: [
          {
            src: '/icon-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: '/icon-512x512.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      }
    })
  ],
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    emptyOutDir: true
  },
  publicDir: 'public',
  server: {
    headers: {
      'X-Frame-Options': 'SAMEORIGIN', 
    },
    // Configuración para mejorar la conexión WebSocket
    hmr: {
      protocol: 'ws',
      host: 'localhost',
      port: 5173,
      clientPort: 5173, // Aseguramos que el cliente use el mismo puerto
      timeout: 5000, // Aumentar el tiempo de espera
    },
    // Configuración para mejorar el rendimiento y estabilidad
    watch: {
      usePolling: true,
      interval: 1000
    },
    cors: true,
    open: true, // Abrir el navegador automáticamente
  },
  // Mejorar el manejo de errores
  optimizeDeps: {
    exclude: ['google-maps'] // Excluir APIs externas que pueden causar errores
  }
});
