import { defineConfig } from 'vite'

export default defineConfig({
  server: {
    host: true, // Listen on all local IPs
    allowedHosts: true, // Allow ngrok domains
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:8000',
        changeOrigin: true,
      }
    }
  }
})
