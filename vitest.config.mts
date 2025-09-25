import { readdirSync } from "node:fs";
import tsconfigPaths from "vite-tsconfig-paths";
import { defineConfig } from "vitest/config";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [tsconfigPaths()],
  test: {
    projects: readdirSync("./packages", { withFileTypes: true })
      .filter((dirent) => dirent.isDirectory())
      .map(({ name }) => ({
        extends: true,
        test: { name, include: [`packages/${name}/src/**/*.test.{ts,tsx}`] },
      })),
    environment: "jsdom",
    globals: true,
    setupFiles: ["vitest.setup.ts"],
    coverage: {
      include: ["packages/**/src/**"],
      exclude: [
        "packages/**/src/**/index.ts",
        "packages/**/src/**/node.ts",
        "packages/**/src/**/*.test.*",
        "packages/**/src/**/declaration.d.ts",
      ],
      reporter: ["json", "text"],
    },
  },
});
