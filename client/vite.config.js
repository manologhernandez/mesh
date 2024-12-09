import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  server: {
    proxy: {
      "/auth": {
        target: "http://127.0.0.1:3000/auth",
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/auth/, ""),
      },
    },
  },
});
