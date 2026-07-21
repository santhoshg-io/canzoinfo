import { defineConfig, Plugin } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { processSmtpEmail, verifyCsrf, rateLimitIp } from "./api/send-email";

function smtpApiDevPlugin(): Plugin {
  return {
    name: "smtp-api-dev-plugin",
    configureServer(server) {
      server.middlewares.use("/api/send-email", async (req, res) => {
        if (req.method !== "POST") {
          res.statusCode = 405;
          res.end(JSON.stringify({ success: false, message: "Method Not Allowed" }));
          return;
        }

        // Dev CSRF validation
        if (!verifyCsrf(req.headers)) {
          res.statusCode = 403;
          res.setHeader("Content-Type", "application/json");
          res.end(JSON.stringify({ success: false, message: "Forbidden: CSRF check failed." }));
          return;
        }

        // Dev IP rate limiting
        const ip = req.headers["x-forwarded-for"] || req.socket?.remoteAddress || "anonymous";
        const cleanIp = typeof ip === "string" ? ip.split(",")[0].trim() : "anonymous";
        if (!rateLimitIp(cleanIp, 5, 60000)) {
          res.statusCode = 429;
          res.setHeader("Content-Type", "application/json");
          res.end(JSON.stringify({ success: false, message: "Too many requests. Please try again later." }));
          return;
        }

        let body = "";
        req.on("data", (chunk) => {
          body += chunk.toString();
        });

        req.on("end", async () => {
          try {
            const payload = JSON.parse(body || "{}");
            const result = await processSmtpEmail(payload);
            res.statusCode = 200;
            res.setHeader("Content-Type", "application/json");
            res.end(JSON.stringify(result));
          } catch (err: any) {
            console.error("[Vite Dev SMTP Error]", err);
            res.statusCode = 500;
            res.setHeader("Content-Type", "application/json");
            res.end(
              JSON.stringify({
                success: false,
                message: err.message || "Failed to process SMTP email in dev server.",
              })
            );
          }
        });
      });
    },
  };
}

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    hmr: {
      overlay: false,
    },
  },
  plugins: [react(), smtpApiDevPlugin()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  assetsInclude: ['**/*.JPG'],
  esbuild: {
    drop: mode === 'production' ? ['console', 'debugger'] : [],
  },
  build: {
    sourcemap: mode === 'development',
    minify: 'esbuild',
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor-react': ['react', 'react-dom', 'react-router-dom'],
          'vendor-framer': ['framer-motion'],
          'vendor-icons': ['lucide-react'],
          'vendor-swiper': ['swiper'],
          'vendor-query': ['@tanstack/react-query'],
        },
      },
    },
  },
}));
