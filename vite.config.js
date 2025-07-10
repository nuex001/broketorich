import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    lib: {
      entry: 'src/main.jsx',
      name: 'ReactPresaleWidget',
      fileName: 'widget',
      formats: ['iife'],
    },
    rollupOptions: {
      // Don't externalize React and ReactDOM for IIFE builds
      external: [],
      output: {
        // Ensure globals are properly set
        globals: {}
      }
    }
  },
});