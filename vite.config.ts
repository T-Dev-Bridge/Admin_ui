/// <reference types="vitest" />
import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import checker from "vite-plugin-checker";
import eslint from "vite-plugin-eslint";
import { resolve } from "path";
import fs from "fs/promises";
import svgr from "@svgr/rollup";
import federation from "@originjs/vite-plugin-federation";

export default ({ mode }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };

  /**
   * React Compiler Config
   * src 경로에 있는 파일 컴파일
   */
  const ReactCompilerConfig = {
    target: "19"
  };

  return defineConfig({
    ...(mode !== "test" && {
      plugins: [
        federation({
          name: 'hostApp',
          remotes: {
            remoteApp: 'http://localhost:4173/assets/remoteEntry.js',
          },
          shared: ["react", "react-dom"],
        }),
        react(),
        // react({
        //   babel: {
        //     plugins: [["babel-plugin-react-compiler", ReactCompilerConfig]],
        //   },
        // }),
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
        "/bridge": {
          target: process.env.VITE_BASE_SERVER_URL,
          changeOrigin: true,
          secure: false,
          // rewrite: (path) => path.replace(/^\/api/, '/api'), // 여기서는 프리픽스를 그대로 유지
          rewrite: (path) => path.replace(/^\/bridge/, ""), //
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
      // `true`로 설정할 경우 `CSS`가 JS 청크와 함께 분리되어 로드된다.
      // `false`로 설정할 경우 `CSS`가 하나의 파일로 병합된다.
      // `Module Federation`을 사용할 경우 `false`로 설정하는게 유용하다.
      cssCodeSplit: false,
      target: "esnext",
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
