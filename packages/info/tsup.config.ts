import { rdiPlugin } from "esbuild-plugin-rdi";
import { defineConfig, type Options } from "tsup";

export default defineConfig(
  (options: Options) =>
    ({
      format: ["cjs", "esm"],
      target: "es2019",
      tsconfig: "../../tsconfig.build.json",
      dts: true,
      entry: ["./src/index.ts", "./src/node.ts"],
      sourcemap: false,
      clean: !options.watch,
      bundle: true,
      minify: !options.watch,
      esbuildPlugins: [rdiPlugin()],
      ...options,
    }) as Options,
);
