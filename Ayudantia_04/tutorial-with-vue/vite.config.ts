import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import deno from "@deno/vite-plugin";

export default defineConfig({
  server: {
    port: 3000,
    proxy: {
      "/api": {
        target: "http://localhost:8000",
        changeOrigin: true,
      },
    },
  },
  preview: {
    port: 3000,
    proxy: {
      "/api": {
        target: "http://localhost:8000",
        changeOrigin: true,
      },
    },
  },
  plugins: [vue(), deno()],
  optimizeDeps: {
    include: ["react/jsx-runtime"],
  },
});
