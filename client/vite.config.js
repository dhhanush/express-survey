import { defineConfig } from 'vite';
import reactRefresh from '@vitejs/plugin-react-refresh';

// https://vitejs.dev/config/
export default ({ command, mode }) => {
  console.log('command', command);
  console.log('mode', mode);
  if (mode === 'development') {
    return {
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
    };
  } else {
    return {
      plugins: [reactRefresh()],
    };
  }
};
