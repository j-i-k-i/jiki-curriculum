import { usingFunctions } from "./levels/using-functions";
import { fundamentalsLevel } from "./levels/fundamentals";
import { variablesLevel } from "./levels/variables";

// The syllabus - ordered progression of levels
export const syllabus = [
  usingFunctions,
  fundamentalsLevel,
  variablesLevel
  // Future levels will be added here:
  // controlFlowLevel,
  // loopsLevel,
  // functionsLevel,
  // arraysLevel,
  // objectsLevel,
] as const;

export type LevelId = (typeof syllabus)[number]["id"];
