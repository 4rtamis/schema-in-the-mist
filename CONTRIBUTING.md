# Contributing

Thanks for helping make Mist Engine tools interoperate!

## How to propose a change

1. **Open an issue** describing the change (new field, new schema, clarification).
2. **Discuss** design/compat with maintainers and other tool authors.
3. **Submit a PR** that includes:

   - Zod v4 source updates in `src/zod/...`
   - New target in `src/constants.ts` like:

     ```ts
     {
        zod: LegendInTheMistChallengeSchema,
        game: GAMES.litm,
        name: "challenge",
     }
     ```

   - Re-generated JSON Schema in `schemas/...`
     ```sh
        npm run gen
     ```
   - At least **one example** in `examples/<game>/<object>/...`
   - Passing validation
     ```sh
       npm run check
     ```

## Ground rules

- **Canonical source is Zod** (we generate JSON Schema from it).
- **Backward compatibility:** try as much as possible to avoid breaking changes.
- **Metadata:** add concise descriptions and examples to your fields. With Zod, make use of `.meta({ description, examples })`

## Dev commands

```bash
npm ci
npm run gen            # generate JSON Schemas
npm run validate       # validate example files
npm run check          # generate + validate
```
