import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const INPUT = path.join(ROOT, "coverage/lcov.info");
const OUT_DIR = path.join(ROOT, "coverage/packages");
const PACKAGE_PREFIX = "packages/";

if (!fs.existsSync(INPUT)) {
  console.error(`LCOV file not found: ${INPUT}`);
  process.exit(1);
}

fs.mkdirSync(OUT_DIR, { recursive: true });

const content = fs.readFileSync(INPUT, "utf8").replaceAll("\\", "/");
const records = content
  .split("end_of_record")
  .map((r) => r.trim())
  .filter(Boolean)
  .map((r) => `${r}\nend_of_record\n`);

const byPackage = new Map<string, string[]>();

for (const record of records) {
  const sfLine = record.split("\n").find((line) => line.startsWith("SF:"));

  if (!sfLine) continue;

  // Normalize path
  const filePath = sfLine.replace("SF:", "").replace(/\\/g, "/");
  const idx = filePath.indexOf(PACKAGE_PREFIX);

  if (idx === -1) continue;

  const rest = filePath.slice(idx + PACKAGE_PREFIX.length);
  const pkg = rest.split("/")[0];

  if (!pkg) continue;

  if (!byPackage.has(pkg)) byPackage.set(pkg, []);
  byPackage.get(pkg)!.push(record);
}

// Write files
for (const [pkg, recs] of byPackage.entries()) {
  const out = path.join(OUT_DIR, `${pkg}.lcov`);
  fs.writeFileSync(out, recs.join(""), "utf8");
  console.log(`✓ ${pkg}: ${recs.length} records`);
}

// Optional: warn if nothing matched
if (byPackage.size === 0) {
  console.warn("No package coverage found. Check paths in lcov.info");
}
