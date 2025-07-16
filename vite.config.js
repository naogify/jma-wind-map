import { defineConfig } from 'vite'

export default defineConfig({
  base: process.env.GITHUB_PAGES ? '/jma-wind-map/' : '/',
  build: {
    sourcemap: true
  }
})
