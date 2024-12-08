import { defineConfig } from 'vite';
import preact from '@preact/preset-vite';

export default defineConfig({
	plugins: [preact()],
  server: {
    proxy: {
      '/api': {
        target: 'http://192.168.1.149',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
});
