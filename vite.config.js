import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { sites } from '@openai/sites-vite-plugin'
import { mkdirSync, writeFileSync } from 'node:fs'

const staticSiteWorker = () => ({
  name: 'static-site-worker',
  closeBundle() {
    mkdirSync('dist/server', { recursive: true })
    writeFileSync('dist/server/index.js', `export default {
  async fetch(request, env) {
    return env.ASSETS.fetch(request)
  }
}\n`)
  },
})

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), sites(), staticSiteWorker()],
})
