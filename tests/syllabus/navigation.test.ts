import { describe, it, expect } from "vitest";
import {
  syllabus,
  getLessonsForLevel,
  getLesson,
  getLevelForLesson,
  getNextLesson,
  getPreviousLesson,
  getAllExerciseLessons
} from "../../src/syllabus";
import type { Lesson } from "../../src/syllabus";

describe("Syllabus Navigation", () => {
  describe("getLessonsForLevel", () => {
    it("should return lessons for fundamentals level", () => {
      const lessons = getLessonsForLevel("fundamentals");
      expect(Array.isArray(lessons)).toBe(true);
      expect(lessons.length).toBeGreaterThanOrEqual(1);

      // Check first lesson
      if (lessons.length > 0) {
        expect(lessons[0]).toHaveProperty("id");
        expect(lessons[0]).toHaveProperty("title");
        expect(lessons[0].id).toBe("first-function-call");
      }
    });

    it("should return lessons for variables level", () => {
      const lessons = getLessonsForLevel("variables");
      expect(Array.isArray(lessons)).toBe(true);
      // Variables level might have no lessons yet (commented out)
    });

    it("should return empty array for non-existent level", () => {
      const lessons = getLessonsForLevel("non-existent");
      expect(lessons).toEqual([]);
    });

    it("should return different lessons for different levels", () => {
      const fundamentalsLessons = getLessonsForLevel("fundamentals");
      const variablesLessons = getLessonsForLevel("variables");

      // They should be different arrays
      expect(fundamentalsLessons).not.toBe(variablesLessons);

      // If both have lessons, they should have different IDs
      if (fundamentalsLessons.length > 0 && variablesLessons.length > 0) {
        const fundamentalsIds = fundamentalsLessons.map((l) => l.id);
        const variablesIds = variablesLessons.map((l) => l.id);

        // No overlapping IDs
        fundamentalsIds.forEach((id) => {
          expect(variablesIds).not.toContain(id);
        });
      }
    });
  });

  describe("getLesson", () => {
    it("should find lesson by ID", () => {
      const lesson = getLesson("first-function-call");
      expect(lesson).toBeDefined();
      expect(lesson?.id).toBe("first-function-call");
      expect(lesson?.title).toBe("Your First Function Call");
      expect(lesson?.type).toBe("exercise");
    });

    it("should return undefined for non-existent lesson", () => {
      const lesson = getLesson("non-existent-lesson");
      expect(lesson).toBeUndefined();
    });

    it("should find lessons from any level", () => {
      // Test finding lesson from different levels
      syllabus.forEach((level) => {
        level.lessons.forEach((expectedLesson) => {
          const foundLesson = getLesson(expectedLesson.id);
          expect(foundLesson).toEqual(expectedLesson);
        });
      });
    });
  });

  describe("getLevelForLesson", () => {
    it("should return correct level for lesson", () => {
      const levelId = getLevelForLesson("first-function-call");
      expect(levelId).toBe("fundamentals");
    });

    it("should return undefined for non-existent lesson", () => {
      const levelId = getLevelForLesson("non-existent-lesson");
      expect(levelId).toBeUndefined();
    });

    it("should correctly identify level for all lessons", () => {
      syllabus.forEach((level) => {
        level.lessons.forEach((lesson) => {
          const foundLevelId = getLevelForLesson(lesson.id);
          expect(foundLevelId).toBe(level.id);
        });
      });
    });
  });

  describe("getNextLesson", () => {
    it("should return next lesson within same level", () => {
      // This depends on whether we have multiple lessons in fundamentals
      const fundamentals = syllabus.find((p) => p.id === "fundamentals");
      if (fundamentals && fundamentals.lessons.length > 1) {
        const firstLesson = fundamentals.lessons[0];
        const nextLesson = getNextLesson(firstLesson.id);
        expect(nextLesson).toBeDefined();
        expect(nextLesson?.id).toBe(fundamentals.lessons[1].id);
      }
    });

    it("should return next lesson across levels", () => {
      // Get last lesson of fundamentals
      const fundamentals = syllabus.find((p) => p.id === "fundamentals");
      const variables = syllabus.find((p) => p.id === "variables");

      if (fundamentals && variables && fundamentals.lessons.length > 0 && variables.lessons.length > 0) {
        const lastFundamentalsLesson = fundamentals.lessons[fundamentals.lessons.length - 1];
        const nextLesson = getNextLesson(lastFundamentalsLesson.id);
        expect(nextLesson?.id).toBe(variables.lessons[0].id);
      }
    });

    it("should return undefined for last lesson", () => {
      // Find the very last lesson
      let lastLesson: Lesson | undefined;
      syllabus.forEach((level) => {
        if (level.lessons.length > 0) {
          lastLesson = level.lessons[level.lessons.length - 1];
        }
      });

      if (lastLesson) {
        const nextLesson = getNextLesson(lastLesson.id);
        expect(nextLesson).toBeUndefined();
      }
    });

    it("should return undefined for non-existent lesson", () => {
      const nextLesson = getNextLesson("non-existent");
      expect(nextLesson).toBeUndefined();
    });
  });

  describe("getPreviousLesson", () => {
    it("should return undefined for first lesson", () => {
      const firstLevel = syllabus[0];
      if (firstLevel.lessons.length > 0) {
        const firstLesson = firstLevel.lessons[0];
        const prevLesson = getPreviousLesson(firstLesson.id);
        expect(prevLesson).toBeUndefined();
      }
    });

    it("should return previous lesson within same level", () => {
      const fundamentals = syllabus.find((p) => p.id === "fundamentals");
      if (fundamentals && fundamentals.lessons.length > 1) {
        const secondLesson = fundamentals.lessons[1];
        const prevLesson = getPreviousLesson(secondLesson.id);
        expect(prevLesson).toBeDefined();
        expect(prevLesson?.id).toBe(fundamentals.lessons[0].id);
      }
    });

    it("should return previous lesson across levels", () => {
      // Get first lesson of variables (second level)
      const fundamentals = syllabus.find((p) => p.id === "fundamentals");
      const variables = syllabus.find((p) => p.id === "variables");

      if (fundamentals && variables && fundamentals.lessons.length > 0 && variables.lessons.length > 0) {
        const firstVariablesLesson = variables.lessons[0];
        const prevLesson = getPreviousLesson(firstVariablesLesson.id);
        const lastFundamentalsLesson = fundamentals.lessons[fundamentals.lessons.length - 1];
        expect(prevLesson?.id).toBe(lastFundamentalsLesson.id);
      }
    });

    it("should return undefined for non-existent lesson", () => {
      const prevLesson = getPreviousLesson("non-existent");
      expect(prevLesson).toBeUndefined();
    });
  });

  describe("getAllExerciseLessons", () => {
    it("should return all exercise type lessons", () => {
      const exercises = getAllExerciseLessons();
      expect(Array.isArray(exercises)).toBe(true);

      // All returned lessons should be exercises
      exercises.forEach((lesson) => {
        expect(lesson.type).toBe("exercise");
      });
    });

    it("should include exercises from all levels", () => {
      const exercises = getAllExerciseLessons();
      const exerciseIds = exercises.map((e) => e.id);

      // Check that we get exercises from different levels
      syllabus.forEach((level) => {
        level.lessons.forEach((lesson) => {
          if (lesson.type === "exercise") {
            expect(exerciseIds).toContain(lesson.id);
          }
        });
      });
    });

    it("should not include non-exercise lessons", () => {
      const exercises = getAllExerciseLessons();
      const allLessons: Lesson[] = [];

      syllabus.forEach((p) => allLessons.push(...p.lessons));

      const nonExerciseLessons = allLessons.filter((l) => l.type !== "exercise");

      nonExerciseLessons.forEach((lesson) => {
        expect(exercises).not.toContain(lesson);
      });
    });

    it("should return at least one exercise", () => {
      const exercises = getAllExerciseLessons();
      expect(exercises.length).toBeGreaterThanOrEqual(1);
    });
  });
});
