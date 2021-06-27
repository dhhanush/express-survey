import { defineConfig } from 'vite';
import reactRefresh from '@vitejs/plugin-react-refresh';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [reactRefresh()],
  server: {
    proxy: {
      '/auth/google': {
        target: 'http://localhost:5000',
      },
      '/api': {
        target: 'http://localhost:5000',
      },
    },
  },
});
