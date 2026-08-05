import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    rolldownOptions: {
      output: {
        manualChunks(id: string) {
          if (id.includes('gsap'))          return 'vendor-gsap';
          if (id.includes('framer-motion')) return 'vendor-motion';
          if (id.includes('swiper'))        return 'vendor-swiper';
          if (id.includes('aos'))           return 'vendor-aos';
        },
      },
    },
  },
})
