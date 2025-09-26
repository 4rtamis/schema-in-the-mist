import fs from "node:fs";
import TOML from "@iarna/toml";

const inPath = process.argv[2];
const outPath = process.argv[3];
const data = TOML.parse(fs.readFileSync(inPath, "utf8"));
fs.writeFileSync(outPath, JSON.stringify(data, null, 2));
console.log(`Converted ${inPath} -> ${outPath}`);
