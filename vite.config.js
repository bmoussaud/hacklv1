import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import { readFileSync } from 'node:fs'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    {
      name: 'source-brief',
      generateBundle() {
        this.emitFile({
          type: 'asset',
          fileName: 'operation_atelier_404_brief.pdf',
          source: readFileSync(new URL('./operation_atelier_404_brief.pdf', import.meta.url)),
        })
      },
    },
  ],
})
