import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': '/src', // Si usas alias en tus rutas
    },
  },
  server: {
    port: 3000, // Asigna el puerto 3000
  },
});