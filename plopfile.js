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
    ],
    actions: [
      {
        type: "addMany",
        destination: "packages",
        base: "scripts/plop-templates",
        templateFiles: "scripts/plop-templates/**",
      },
    ],
  });
}
