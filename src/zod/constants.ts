import { ZodObject } from "zod";
import { LegendInTheMistChallengeSchema } from "./legend-in-the-mist/challenge";

type Game = {
  name: string;
  folder: string;
  abbr: string;
};

type GameDictionary = {
  [index: string]: Game;
};

type SchemaTarget = {
  name: string;
  zod: ZodObject;
  game: Game;
};

export const GAMES: GameDictionary = {
  litm: {
    name: "Legend in the Mist",
    folder: "legend-in-the-mist",
    abbr: "litm",
  },
  com: {
    name: "City of Mist",
    folder: "city-of-mist",
    abbr: "com",
  },
  otherscape: {
    name: ":Otherscape",
    folder: "otherscape",
    abbr: "otherscape",
  },
};

export const TARGETS: Array<SchemaTarget> = [
  {
    zod: LegendInTheMistChallengeSchema,
    game: GAMES.litm,
    name: "challenge",
  },
];
