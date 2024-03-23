import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': 'http://localhost:5000',
    },
    cors: {
      origin: [
        'http://localhost:5000',
        'https://accounts.google.com',
        'https://localhost:5000',
      ],
    },
  },
})
