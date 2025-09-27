// Main exports from the curriculum package

// Export the exercise registry and type
export { exercises, type ExerciseSlug } from "./exercises";

// Export all types needed by consumers
export type { ExerciseDefinition, Task, Scenario, TestExpect } from "./exercises/types";

// Export the base Exercise class and Animation type
export { Exercise, type Animation } from "./Exercise";

// Export mock implementations for testing
export { TestExercise } from "./mocks";

// Export levels system - only what's needed
export { levels, getLevel, getLanguageFeatures, type Level, type LevelId } from "./levels";

// Export syllabus system - only what's needed
export { mainSyllabus, type Syllabus, type Lesson } from "./syllabus";
