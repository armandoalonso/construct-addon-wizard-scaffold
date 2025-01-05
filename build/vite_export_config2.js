import { defineConfig } from "vite";

export default defineConfig({
  build: {
    outDir: "../dist/export",
    rollupOptions: {
      preserveEntrySignatures: "strict",
      input: {
        "c3runtime/plugin": "../template/main.js",
      },
      output: {
        entryFileNames: "[name].js",
      },
    },
  },
});
