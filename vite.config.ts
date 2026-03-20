import path from "path";
import { fileURLToPath } from "url";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  build: {
    // Don't empty the dist dir before building — avoids EPERM issues on
    // mounted/network filesystems (Cloudflare Pages CI, WSL2, etc.).
    // The prerender script (run after vite build) overwrites all static pages.
    emptyOutDir: false,
  },
  // Vite dev server natively serves index.html for all paths (SPA mode).
  // For production, _redirects (Netlify) or _headers (Cloudflare) handle routing.
});

