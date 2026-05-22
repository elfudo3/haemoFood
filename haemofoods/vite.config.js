import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/test-setup.js',
  },
  server: {
    proxy: {
      // redirect /api requests to Open Food Facts
      '/api': {
        target: 'https://world.openfoodfacts.org',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
      // redirect /usda-api requests to USDA database
      '/usda-api': {
        target: 'https://api.nal.usda.gov/fdc/v1',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/usda-api/, ''),
      },
    },
  },
})