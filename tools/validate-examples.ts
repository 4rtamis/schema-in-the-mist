import fs from "node:fs";
import path from "node:path";
import Ajv from "ajv";
import addFormats from "ajv-formats";
import TOML from "@iarna/toml";
import { TARGETS } from "../src/zod/constants";

type Result = { file: string; ok: boolean; errors?: unknown };

function isJson(p: string) {
  return p.toLowerCase().endsWith(".json");
}
function isToml(p: string) {
  return p.toLowerCase().endsWith(".toml");
}
function isDataFile(p: string) {
  return isJson(p) || isToml(p);
}

function loadData(filePath: string): unknown {
  const raw = fs.readFileSync(filePath, "utf8");
  if (isJson(filePath)) return JSON.parse(raw);
  if (isToml(filePath)) return TOML.parse(raw);
  throw new Error(`Unsupported file type: ${filePath}`);
}

function listExampleFiles(baseDir: string): string[] {
  if (!fs.existsSync(baseDir)) return [];
  return fs
    .readdirSync(baseDir)
    .map((name) => path.join(baseDir, name))
    .filter((p) => fs.statSync(p).isFile())
    .filter(isDataFile);
}

async function run() {
  let failures = 0;
  const allResults: Result[] = [];

  for (const t of TARGETS) {
    const schemaPath = path.join(
      "schemas",
      t.game.folder,
      `${t.name}.schema.json`
    );
    const examplesDir = path.join("examples", t.game.folder, t.name);

    if (!fs.existsSync(schemaPath)) {
      console.warn(`⚠️  Missing schema for target: ${schemaPath} (skipping)`);
      continue;
    }

    const schema = JSON.parse(fs.readFileSync(schemaPath, "utf-8"));
    const ajv = new Ajv({ allErrors: true, strict: false });
    addFormats(ajv);
    const validate = ajv.compile(schema);

    const files = listExampleFiles(examplesDir);
    if (files.length === 0) {
      console.warn(`⚠️  No example files found in: ${examplesDir}`);
      continue;
    }

    for (const file of files) {
      const data = loadData(file);
      const ok = validate(data);
      if (ok) {
        console.log(`✓ ${file}`);
        allResults.push({ file, ok: true });
      } else {
        failures++;
        console.error(`✗ ${file}`);
        console.error(validate.errors);
        allResults.push({ file, ok: false, errors: validate.errors });
      }
    }
  }

  if (failures > 0) {
    console.error(`\n❌ Validation failed for ${failures} file(s).`);
    process.exit(1);
  } else {
    console.log(`\n✅ All example files passed validation.`);
  }
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
