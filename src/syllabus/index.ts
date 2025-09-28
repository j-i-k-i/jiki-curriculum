import { syllabus } from "./syllabus";
import type { LevelId } from "./syllabus";
import type { Level, Lesson } from "./types";

// Export types
export * from "./types";

// Export syllabus and LevelId
export { syllabus } from "./syllabus";
export type { LevelId } from "./syllabus";

// Helper to get level by ID
export function getLevel(id: LevelId | string): Level | undefined {
  return syllabus.find((level) => level.id === id);
}

// Helper to get allowed nodes for a language
export function getAllowedNodes(levelId: LevelId | string, language: "javascript" | "python"): string[] | undefined {
  const level = getLevel(levelId);
  const features = level?.languageFeatures[language];
  return features?.allowedNodes;
}

// Helper to get feature flags for a language
export function getFeatureFlags(
  levelId: LevelId | string,
  language: "javascript" | "python"
): Record<string, number | boolean> | undefined {
  const level = getLevel(levelId);
  const features = level?.languageFeatures[language];
  return features?.featureFlags;
}

// Helper to get combined language features for interpreter
export function getLanguageFeatures(
  levelId: LevelId | string,
  language: "javascript"
): {
  allowedNodes?: string[];
  allowShadowing?: boolean;
  allowTruthiness?: boolean;
  requireVariableInstantiation?: boolean;
  allowTypeCoercion?: boolean;
  oneStatementPerLine?: boolean;
  enforceStrictEquality?: boolean;
} {
  const level = getLevel(levelId);
  if (!level) {
    return {};
  }

  const features = level.languageFeatures[language];

  return {
    allowedNodes: features.allowedNodes,
    ...features.featureFlags
  };
}

// Get all level IDs in order (useful for progression)
export function getLevelIds(): LevelId[] {
  return syllabus.map((level) => level.id) as LevelId[];
}

// Check if a level exists
export function hasLevel(id: string): boolean {
  return syllabus.some((level) => level.id === id);
}

// Get all lessons for a specific level
export function getLessonsForLevel(levelId: LevelId | string): Lesson[] {
  const level = getLevel(levelId);
  return level?.lessons || [];
}

// Get a specific lesson by ID
export function getLesson(lessonId: string): Lesson | undefined {
  for (const level of syllabus) {
    const lesson = level.lessons.find((l) => l.id === lessonId);
    if (lesson) {
      return lesson;
    }
  }
  return undefined;
}

// Get the level ID for a specific lesson
export function getLevelForLesson(lessonId: string): LevelId | undefined {
  for (const level of syllabus) {
    if (level.lessons.some((l) => l.id === lessonId)) {
      return level.id as LevelId;
    }
  }
  return undefined;
}

// Get the next lesson in the progression
export function getNextLesson(currentLessonId: string): Lesson | undefined {
  let foundCurrent = false;

  for (const level of syllabus) {
    for (const lesson of level.lessons) {
      if (foundCurrent) {
        return lesson;
      }
      if (lesson.id === currentLessonId) {
        foundCurrent = true;
      }
    }
  }

  return undefined;
}

// Get the previous lesson in the progression
export function getPreviousLesson(currentLessonId: string): Lesson | undefined {
  let previousLesson: Lesson | undefined;

  for (const level of syllabus) {
    for (const lesson of level.lessons) {
      if (lesson.id === currentLessonId) {
        return previousLesson;
      }
      previousLesson = lesson;
    }
  }

  return undefined;
}

// Get all exercise lessons
export function getAllExerciseLessons() {
  const exercises: Lesson[] = [];

  for (const level of syllabus) {
    for (const lesson of level.lessons) {
      if (lesson.type === "exercise") {
        exercises.push(lesson);
      }
    }
  }

  return exercises;
}
