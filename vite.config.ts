/// <reference types="vitest" />
import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import checker from "vite-plugin-checker";
import eslint from "vite-plugin-eslint";
import { resolve } from "path";
import fs from "fs/promises";
import svgr from "@svgr/rollup";

export default ({ mode }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };

  return defineConfig({
    ...(mode !== "test" && {
      plugins: [
        react(),
        svgr(),
        eslint({
          overrideConfigFile: "eslint.config.js",
          cache: false,
          fix: true,
        }),
        checker({ typescript: true }),
      ],
    }),
    // dev용
    server: {
      port: 3000,
      proxy: {
        "/sw": {
          target: process.env.VITE_BASE_SERVER_URL,
          changeOrigin: true,
          secure: false,
          // rewrite: (path) => path.replace(/^\/api/, '/api'), // 여기서는 프리픽스를 그대로 유지
          rewrite: (path) => path.replace(/^\/sw/, ""), // '/we' 프리픽스를 제거할 경우
        },
      },
    },
    preview: { open: true },
    esbuild: {
      treeShaking: true,
      pure: ["console.log", "console.warn", "console.error"], // 불필요한 console 제거
    },
    build: {
      minify: "terser",
      terserOptions: {
        mangle: {
          toplevel: true,
          keep_classnames: false,
          keep_fnames: false,
          reserved: ["React", "ReactDOM", "$", "_"],
          properties: {
            regex: /^[_#]/,
            reserved: ["metadata", "props", "state", "React", "ReactDOM"],
            keep_quoted: true,
          },
        },
        nameCache: {},
        compress: {
          drop_console: true,
          drop_debugger: true,
        },
        format: {
          comments: false,
        },
      },
      outDir: "dist",
      assetsDir: "assets",
      sourcemap: false,
      cssCodeSplit: true,
      rollupOptions: {
        output: {
          entryFileNames: "assets/[hash].js",
          chunkFileNames: "assets/[hash].js",
          assetFileNames: "assets/[hash].[ext]",
          manualChunks(id) {
            if (id.includes("node_modules")) {
              return "vendor";
            }
          },
        },
      },
    },
    resolve: {
      alias: {
        "@/app": resolve("src/app"),
        "@/assets": resolve("src/assets"),
        "@/entities": resolve("src/entities"),
        "@/features": resolve("src/features"),
        "@/pages": resolve("src/pages"),
        "@/shared": resolve("src/shared"),
        "@/widgets": resolve("src/widgets"),
      },
    },
    optimizeDeps: {
      esbuildOptions: {
        plugins: [
          {
            name: "load-js-files-as-tsx",
            setup(build) {
              build.onLoad({ filter: /src\\.*\.js$/ }, async (args) => ({
                loader: "tsx",
                contents: await fs.readFile(args.path, "utf8"),
              }));
            },
          },
        ],
      },
    },
  });
};
