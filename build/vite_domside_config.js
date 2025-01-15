import { defineConfig } from "vite";

export default defineConfig({
  build: {
    outDir: "../generated",
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
