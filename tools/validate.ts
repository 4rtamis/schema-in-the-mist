import fs from "node:fs";
import Ajv from "ajv";
import addFormats from "ajv-formats";

const schema = JSON.parse(
  fs.readFileSync("schemas/legend-in-the-mist/challenge.schema.json", "utf8")
);

const ajv = new Ajv({ allErrors: true, strict: false });
addFormats(ajv);
const validate = ajv.compile(schema);

const files = process.argv.slice(2);
let failed = 0;

for (const f of files) {
  const data = JSON.parse(fs.readFileSync(f, "utf8"));
  const ok = validate(data);
  if (ok) console.log("✓", f);
  else {
    console.error("✗", f, validate.errors);
    failed = 1;
  }
}
process.exit(failed);
