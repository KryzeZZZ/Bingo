import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        game: resolve(__dirname, 'game.html') // 改为 game.html
      }
    }
  }
});
