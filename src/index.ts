// Main exports from the curriculum package

// Export the exercise registry and type
export { exercises, type ExerciseSlug } from "./exercises";

// Export all types needed by consumers
export type { ExerciseDefinition, Task, Scenario, TestExpect } from "./exercises/types";

// Export the base Exercise class and Animation type
export { Exercise, type Animation } from "./Exercise";

// Export mock implementations for testing
export { TestExercise } from "./mocks";
