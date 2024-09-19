import { ConfigEnv, defineConfig, loadEnv, UserConfig } from "vite";
import { wrapperEnv } from "./src/build/vite-env";
import { createVitePlugins } from "./src/build/plugins";
import path, { resolve } from "path";
import { createProxy } from "./src/build/proxy";

export default ({ mode }: ConfigEnv): UserConfig => {
  const root = process.cwd();
  const env = loadEnv(mode, root);
  const viteEnv = wrapperEnv(env);

  return defineConfig({
    base: viteEnv.VITE_PUBLIC_PATH,
    root,
    resolve: {
      alias: {
        "@": path.resolve("./src")
      }
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@use "@/styles/theme.scss" as *;`
        }
      }
    },
    server: {
      host: "0.0.0.0",
      open: viteEnv.VITE_OPEN,
      port: viteEnv.VITE_PORT,
      cors: true,
      proxy: createProxy(viteEnv.VITE_PROXY)
    },
    plugins: createVitePlugins(viteEnv),
    build: {
      outDir: resolve(__dirname, "dist"),
      chunkSizeWarningLimit: 1500,
      sourcemap: false,
      emptyOutDir: true,
      terserOptions: {
        compress: {
          keep_infinity: true,
          drop_console: true,
          drop_debugger: true
        }
      },
      rollupOptions: {
        output: {
          chunkFileNames: "assets/js/[name]-[hash].js",
          entryFileNames: "assets/js/[name]-[hash].js",
          assetFileNames: "assets/[ext]/[name]-[hash].[ext]",
          compact: true,
          manualChunks: (id: string) => {
            if (id.includes("node_modules")) {
              return id
                .toString()
                .split("node_modules/")[1]
                .split("/")[0]
                .toString();
            }
          }
        }
      }
    }
  });
};
