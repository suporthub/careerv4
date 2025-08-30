import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'https://b858e5754435.ngrok-free.app',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
    allowedHosts: ['b858e5754435.ngrok-free.app',"localhost", "127.0.0.1","careerredefine.com", 'datascience.careerredefine.com'],
  },
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});
