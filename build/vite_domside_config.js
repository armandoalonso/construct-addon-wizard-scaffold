import { defineConfig } from "vite";

export default defineConfig({
  build: {
    outDir: "../src/files",
    rollupOptions: {
      preserveEntrySignatures: "strict",
      input: {
        domside: "../src/domside/index.js",
      },
      output: {
        entryFileNames: "[name].js",
      },
    },
  },
});
