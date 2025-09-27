// Main exports from the curriculum package

// Export the exercise registry and type
export { exercises, type ExerciseSlug } from "./exercises";

// Export all types needed by consumers
export type { ExerciseDefinition, Task, Scenario, TestExpect } from "./exercises/types";

// Export the base Exercise class
export { Exercise } from "./Exercise";
