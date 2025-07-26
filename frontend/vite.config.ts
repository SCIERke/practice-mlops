import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'



export default defineConfig({
  server: {
    host: '0.0.0.0',
    watch: {
      usePolling: true,
      interval: 100,
    },
    port: 5173,
  },
  plugins: [
    react(),
    tailwindcss(),
  ],
})
