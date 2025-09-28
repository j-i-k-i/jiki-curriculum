import { syllabus } from "./syllabus";
import type { LevelId } from "./syllabus";
import type { Level, Lesson } from "./types";
import type { javascript, python } from "@jiki/interpreters";

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
  language: "javascript"
): Omit<javascript.LanguageFeatures, "allowedNodes"> | undefined;
// eslint-disable-next-line no-redeclare
export function getFeatureFlags(
  levelId: LevelId | string,
  language: "python"
): Omit<python.LanguageFeatures, "allowedNodes"> | undefined;
// eslint-disable-next-line no-redeclare
export function getFeatureFlags(
  levelId: LevelId | string,
  language: "javascript" | "python"
): Omit<javascript.LanguageFeatures, "allowedNodes"> | Omit<python.LanguageFeatures, "allowedNodes"> | undefined {
  const level = getLevel(levelId);
  const features = level?.languageFeatures[language];
  return features?.languageFeatures;
}

// Get accumulated language features up to and including a level
// Concatenates allowedNodes and overrides languageFeatures with later levels taking precedence
export function getAccumulatedLanguageFeatures(
  levelId: LevelId | string,
  language: "javascript" | "python"
): {
  allowedNodes?: string[];
  excludeList?: string[];
  includeList?: string[];
  allowShadowing?: boolean;
  allowTruthiness?: boolean;
  requireVariableInstantiation?: boolean;
  allowTypeCoercion?: boolean;
  oneStatementPerLine?: boolean;
  enforceStrictEquality?: boolean;
} {
  const levelIds = getLevelIds();
  const targetIndex = levelIds.indexOf(levelId as LevelId);

  if (targetIndex === -1) {
    return {};
  }

  // Start with empty features
  let accumulatedNodes: string[] = [];
  let accumulatedFeatures: Record<string, unknown> = {};

  // Iterate through all levels up to and including the target
  for (let i = 0; i <= targetIndex; i++) {
    const level = getLevel(levelIds[i]);
    if (!level) continue;

    const features = level.languageFeatures[language];
    if (features === undefined) continue;

    // Concatenate allowed nodes (avoiding duplicates)
    if (features.allowedNodes !== undefined && features.allowedNodes.length > 0) {
      const newNodes = features.allowedNodes.filter((node) => !accumulatedNodes.includes(node));
      accumulatedNodes = [...accumulatedNodes, ...newNodes];
    }

    // Override language features (later levels take precedence)
    if (features.languageFeatures !== undefined) {
      accumulatedFeatures = {
        ...accumulatedFeatures,
        ...features.languageFeatures
      };
    }
  }

  // Return combined features matching interpreter's expected shape
  return {
    allowedNodes: accumulatedNodes.length > 0 ? accumulatedNodes : undefined,
    ...accumulatedFeatures
  };
}

// Helper to get combined language features for interpreter
export function getLanguageFeatures(
  levelId: LevelId | string,
  language: "javascript" | "python"
): {
  allowedNodes?: string[];
  excludeList?: string[];
  includeList?: string[];
  allowShadowing?: boolean;
  allowTruthiness?: boolean;
  requireVariableInstantiation?: boolean;
  allowTypeCoercion?: boolean;
  oneStatementPerLine?: boolean;
  enforceStrictEquality?: boolean;
} {
  // Use accumulated features by default
  return getAccumulatedLanguageFeatures(levelId, language);
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
