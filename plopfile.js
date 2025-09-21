import fs from "node:fs";
import { type } from "node:os";

export default function (plop) {
  plop.setGenerator("package", {
    description: "Scaffold a new @svg-fns package",
    prompts: [
      {
        type: "input",
        name: "name",
        message: "Package name (e.g. transform):",
        validate: (input) => (input ? true : "Package name is required"),
        filter: (input) => input.trim(),
      },
      {
        type: "input",
        name: "utilities",
        message:
          "Utility functions (comma-separated, e.g. svgToBase64,convertSvg):",
        validate: (input) =>
          input ? true : "At least one utility is required",
        filter: (input) =>
          input
            .split(",")
            .map((u) => u.trim())
            .filter(Boolean),
      },
    ],
    actions: (data) => {
      const packagePath = `packages/${plop.getHelper("kebabCase")(data.name)}`;
      const packageExists = fs.existsSync(packagePath);

      const actions = [];

      if (!packageExists) {
        // Create new package structure
        actions.push({
          type: "addMany",
          destination: "packages",
          base: "scripts/plop-templates/package",
          templateFiles: "scripts/plop-templates/package/**",
        });
      }

      const indexFilePath = `${packagePath}/src/index.ts`;
      // Add utility files
      const exportLines = fs.existsSync(indexFilePath)
        ? new Set(
            fs
              .readFileSync(indexFilePath, "utf8")
              .split("\n")
              .map((line) => line.trim()),
          )
        : new Set();

      data.utilities.forEach((utility) => {
        const utilityKebab = plop.getHelper("kebabCase")(utility);
        const utilityPath = `${packagePath}/src/${utilityKebab}.ts`;
        const testPath = `${packagePath}/src/${utilityKebab}.test.ts`;

        if (!fs.existsSync(utilityPath)) {
          actions.push({
            type: "add",
            path: utilityPath,
            templateFile: "scripts/plop-templates/utility.ts.hbs",
            data: { ...data, utilityName: utility, utilityKebab },
          });
          exportLines.add(`export * from "./${utilityKebab}";`);
        }

        if (!fs.existsSync(testPath)) {
          actions.push({
            type: "add",
            path: testPath,
            templateFile: "scripts/plop-templates/utility.test.ts.hbs",
            data: { ...data, utilityName: utility, utilityKebab },
          });
        }
      });

      actions.push({
        type: "modify",
        path: indexFilePath,
        transform: () => `${Array.from(exportLines).join("\n")}\n`,
      });

      return actions;
    },
  });
}
