import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
//自动导入vue3 Api
import AutoImport from "unplugin-auto-import/vite";

// elementplus相关包
import Components from "unplugin-vue-components/vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";
import { UserConfigExport, ConfigEnv } from "vite";
import { viteMockServe } from "vite-plugin-mock";

import path from "path";

// https://vitejs.dev/config/

export default ({ command }: ConfigEnv): UserConfigExport => {
  return {
    plugins: [
      vue(),
      AutoImport({
        // 自动导入vue相关的Api
        imports: ["vue"], // 也支持vue-router、axios等
        // 声明文件的存放位置
        dts: "auto-imports.d.ts",
        resolvers: [ElementPlusResolver()],
      }),
      Components({
        resolvers: [ElementPlusResolver()],
      }),
      viteMockServe({
        // default
        mockPath: "mock",
        localEnabled: command === "serve",
      }),
    ],
    resolve: {
      alias: {
        //这里猜测应该是一个map，key为别名，value为你要别名的路径
        "@": path.resolve(__dirname, "src"),
        coms: path.resolve(__dirname, "src/components"),
      },
    },
  };
};
