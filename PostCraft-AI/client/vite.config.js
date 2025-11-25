import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],

  preview: {
    allowedHosts: ["postcraft-ai-npg6.onrender.com"]
    // OR simply use:
    // allowedHosts: "all"
  },

  server: {
    port: 3000,
    proxy: {
      '/api': {
        target: 'https://postcraft-ai-1-l7li.onrender.com',
        changeOrigin: true,
      },
    },
  },

  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});

