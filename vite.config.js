import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    lib: {
      entry: 'src/main.jsx',       // where your `ReactDOM.render` or `createRoot` is
      name: 'ReactPresaleWidget',
      fileName: 'widget',
      formats: ['iife'],           // embeddable in <script> tag
    },
  },
});
