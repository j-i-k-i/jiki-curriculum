export * from "./types";
export { mainSyllabus } from "./syllabus";

// Helper functions for working with syllabus
import type { LevelId } from "../levels";
import type { Lesson } from "./types";
import { mainSyllabus } from "./syllabus";

// Get all lessons for a specific level
export function getLessonsForLevel(levelId: LevelId): Lesson[] {
  const levelProgress = mainSyllabus.levelProgression.find((lp) => lp.levelId === levelId);
  return levelProgress?.lessons || [];
}

// Get a specific lesson by ID
export function getLesson(lessonId: string): Lesson | undefined {
  for (const levelProgress of mainSyllabus.levelProgression) {
    const lesson = levelProgress.lessons.find((l) => l.id === lessonId);
    if (lesson) {
      return lesson;
    }
  }
  return undefined;
}

// Get the level ID for a specific lesson
export function getLevelForLesson(lessonId: string): LevelId | undefined {
  for (const levelProgress of mainSyllabus.levelProgression) {
    if (levelProgress.lessons.some((l) => l.id === lessonId)) {
      return levelProgress.levelId;
    }
  }
  return undefined;
}

// Get the next lesson in the progression
export function getNextLesson(currentLessonId: string): Lesson | undefined {
  let foundCurrent = false;

  for (const levelProgress of mainSyllabus.levelProgression) {
    for (const lesson of levelProgress.lessons) {
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

  for (const levelProgress of mainSyllabus.levelProgression) {
    for (const lesson of levelProgress.lessons) {
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

  for (const levelProgress of mainSyllabus.levelProgression) {
    for (const lesson of levelProgress.lessons) {
      if (lesson.type === "exercise") {
        exercises.push(lesson);
      }
    }
  }

  return exercises;
}
