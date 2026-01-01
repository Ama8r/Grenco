import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  base: '/', 
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  // --- بداية التعديل المهم لحل مشكلة CORS ---
  server: {
    proxy: {
      '/api': {
        target: 'https://grenco.athrcode.site', // رابط السيرفر الحقيقي
        changeOrigin: true,
        secure: false, // لأن السيرفر يستخدم https
        // لا نحتاج لـ rewrite لأن الرابط الأصلي يحتوي على /api
      }
    }
  },
  // --- نهاية التعديل ---
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
  }
})