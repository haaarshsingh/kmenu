import { defineConfig } from "tsup";

export default defineConfig({
  entry: {
    index: "src/index.ts",
    filters: "src/filters.ts",
  },
  format: ["esm", "cjs"],
  dts: true,
  splitting: false,
  sourcemap: true,
  clean: true,
  minify: true,
  treeshake: true,
  external: [],
});
