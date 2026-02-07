import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import type { UserConfig } from "vite";

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
  },
  css: {
    devSourcemap: true,
  },
  build: {
    cssCodeSplit: false,
    outDir: "dist",
    rollupOptions: {
      output: {
        manualChunks: {
          // Separate React + React DOM
          "vendor-react": ["react", "react-dom"],
          // Separate TanStack Query
          "vendor-query": ["@tanstack/react-query"],
          // Separate wallet libraries (wagmi + viem + appkit)
          "vendor-wallet": ["wagmi", "viem", "@reown/appkit", "@reown/appkit-adapter-wagmi"],
        },
        chunkFileNames: "assets/[name]-[hash].js",
        entryFileNames: "assets/[name]-[hash].js",
        assetFileNames: "assets/[name]-[hash].[ext]",
      },
    },
  },
  worker: {
    format: "es",
  },
  optimizeDeps: {
    exclude: ["secp256k1"],
    esbuildOptions: {
      define: {
        global: "globalThis",
      },
    },
  },
}) as UserConfig;
