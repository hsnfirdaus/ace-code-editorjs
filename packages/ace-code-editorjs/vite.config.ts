// vite.config.ts
import { resolve } from "path";
import { defineConfig } from "vite";
import dts from "vite-plugin-dts";

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, "src/index.ts"),
      name: "ace-code-editorjs",
      fileName: "index",
    },
    rollupOptions: {
      external: ["@editorjs/editorjs", "ace-builds"],
      output: {
        globals: {
          "ace-builds": "ace",
        },
      },
    },
  },
  plugins: [dts()],
});
