import { readdirSync } from "node:fs";
import { defineConfig } from "vitest/config";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [],
  resolve: {
    tsconfigPaths: true,
  },
  test: {
    projects: readdirSync("./packages", { withFileTypes: true })
      .filter(
        (dirent) => dirent.isDirectory() && !/shared|convert/.test(dirent.name),
      )
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
        "packages/**/src/**/types.ts",
        "packages/**/src/**/*.test.*",
        "packages/**/src/**/declaration.d.ts",
        "packages/shared/**/*.*",
        "packages/convert/**/*.*",
      ],
      reporter: ["lcov"],
    },
  },
});
