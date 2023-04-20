"use strict";
import { defineConfig, loadEnv } from "vite";
import vue from "@vitejs/plugin-vue";
import { resolve } from "path";
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import { VantResolver } from "unplugin-vue-components/resolvers";
import viteCompression from "vite-plugin-compression";
import AliyunossWebpackPlugin from "aliyunoss-webpack-plugin";

// 初始化OSS
function initOSSPlugin(env) {
  return new AliyunossWebpackPlugin({
    buildPath: "dist/**",
    region: "",
    accessKeyId: "",
    accessKeySecret: "",
    bucket: "",
    deleteAll: false,
    generateObjectPath: function (filename, file) {
      if (env === "pro_test") {
        return file.replace(/dist/, "/new_test");
      } else {
        return file.replace(/dist/, "/new"); // 上传到OSS根目录下prod_test，如果没有就创建文件夹
      }
    },
  });
}

// https://vitejs.dev/config/
export default ({ mode }) => {
  //参数mode为开放模式或生产模式
  const env = loadEnv(mode, process.cwd()); // 获取.env文件里定义的环境变量
  console.log(env);   //变量在命令行里打印出来

  return defineConfig({
    base: env.VITE_APP_BASE_URL,
    publicDir: "public",
    assetsInclude: ["**/*.gltf"],
    logLevel: "info", //info 、warn、error、silent
    clearScreen: false,
    resolve: {
      alias: [
        //配置别名
        { find: "@", replacement: resolve(__dirname, "src") },
      ],
      extensions: [".mjs", ".js", ".ts", ".jsx", ".tsx", ".json"],
    },
    server: {
      host: "localhost",
      https: false,
      cors: true,
      open: false,
      port: "9000",
      strictPort: false,
      hmr: false,
      // 反向代理配置
      proxy: {
        "/api": {
          target: "https://xxxx.com/",
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ""),
        },
      },
    },
    //打包配置
    build: {
      target: "modules",
      outDir: "dist",
      assetsDir: "static",
      assetsInlineLimit: 4096,
      cssCodeSplit: true,
      sourcemap: false,
      manifest: false,
      write: true,
      emptyOutDir: true,
      brotliSize: true,
      chunkSizeWarningLimit: 500, // 超大包预警
      minify: "terser",
      terserOptions: {
        compress: {
          drop_console: true,
          drop_debugger: true,
        },
      },
      rollupOptions: {
        output: {
          chunkFileNames: "static/js/[name]-[hash].js",
          entryFileNames: "static/js/[name]-[hash].js",
          assetFileNames: "static/[ext]/[name]-[hash].[ext]",
          manualChunks(id) {
            // 大静态文件拆分
            if (id.includes("node_modules")) {
              return id
                .toString()
                .split("node_modules/")[1]
                .split("/")[0]
                .toString();
            }
          },
        },
      },
    },

    plugins: [
      //配置需要使用的插件列表
      vue(),
      AutoImport({
        imports: ["vue", "vue-router"],
        dts: "src/auto-import.d.ts",
      }),
      Components({
        resolvers: [VantResolver()],
      }),
      // oss上传
      // env.NODE_ENV.includes("prod")
      //   ? initOSSPlugin(env.NODE_ENV)
      //   : "",
      viteCompression({
        //生成压缩包gz
        verbose: true, // 输出压缩成功
        disable: false, // 是否禁用
        threshold: 10240, // 体积大于阈值会被压缩，单位是b
        algorithm: "gzip", // 压缩算法
        ext: ".gz", // 生成的压缩包后缀
      }),
    ],
    optimizeDeps: {
      include: ["axios"],
    },
    // css
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `$injectedColor:orange;`,
        },
      },
    },
    json: {
      namedExports: true,
      stringify: false,
    },
    esbuild: {
      jsxFactory: "h",
      jsxFragment: "Fragment",
      jsxInject: `import Vue from 'vue'`,
    },
  });
};
