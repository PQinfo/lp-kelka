import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: '/lp-kelka/',
  build: {
    outDir: 'dist',
    emptyOutDir: true,
  },
})
