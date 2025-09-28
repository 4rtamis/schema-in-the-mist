import fs from "node:fs";
import path from "node:path";
import { z } from "zod";
import { TARGETS } from "../src/zod/constants";

for (const t of TARGETS) {
  const json = z.toJSONSchema(t.zod, { target: "draft-7" });
  fs.mkdirSync(path.dirname(`schemas/${t.game.folder}`), {
    recursive: true,
  });
  fs.writeFileSync(
    `schemas/${t.game.folder}/${t.name}.schema.json`,
    JSON.stringify(json, null, 2)
  );
  console.log("Wrote", `schemas/${t.game.folder}/${t.name}.schema.json`);
}
