import tsconfigPaths from "vite-tsconfig-paths";
import { defineConfig } from "vitest/config";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [tsconfigPaths()],
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: [],
    coverage: {
      include: ["src/**"],
      exclude: ["src/**/index.ts", "src/**/*.test.*", "src/**/declaration.d.ts"],
      reporter: ["json"],
    },
  },
});
