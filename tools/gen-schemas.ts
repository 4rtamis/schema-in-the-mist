import fs from "node:fs";
import path from "node:path";
import { z } from "zod";
import { LegendInTheMistChallengeSchema } from "../src/zod/legend-in-the-mist/challenge";

const targets = [
  {
    zod: LegendInTheMistChallengeSchema,
    out: "schemas/legend-in-the-mist/challenge.schema.json",
    title: "Legend in the Mist Challenge",
  },
];

for (const t of targets) {
  const json = z.toJSONSchema(t.zod);
  fs.mkdirSync(path.dirname(t.out), { recursive: true });
  fs.writeFileSync(t.out, JSON.stringify(json, null, 2));
  console.log("Wrote", t.out);
}
