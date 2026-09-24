import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  // Base relativa: o mesmo dist/ funciona na raiz do dominio e em qualquer
  // subpasta (/lp-kelka/, /lp-kelka2/, ...) sem precisar rebuildar.
  // Antes a base era fixa e o build so abria no caminho para o qual foi gerado.
  base: './',
  publicDir: 'static',
  plugins: [react(), tailwindcss()],
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    rolldownOptions: {
      output: {
        // GSAP e AOS sairam do projeto. Os icones ganham chunk proprio porque
        // mudam pouco e podem ficar em cache entre deploys.
        manualChunks(id: string) {
          if (id.includes('@phosphor-icons')) return 'vendor-icons';
        },
      },
    },
  },
})
