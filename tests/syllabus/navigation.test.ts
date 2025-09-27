import { describe, it, expect } from "vitest";
import {
  mainSyllabus,
  getLessonsForLevel,
  getLesson,
  getLevelForLesson,
  getNextLesson,
  getPreviousLesson,
  getAllExerciseLessons
} from "../../src/syllabus";

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
      // @ts-expect-error Testing invalid level
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

    it("should find lessons across different levels", () => {
      // Add a test for when we have lessons in multiple levels
      mainSyllabus.levelProgression.forEach((progression) => {
        progression.lessons.forEach((expectedLesson) => {
          const foundLesson = getLesson(expectedLesson.id);
          expect(foundLesson).toBeDefined();
          expect(foundLesson?.id).toBe(expectedLesson.id);
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
      const levelId = getLevelForLesson("non-existent");
      expect(levelId).toBeUndefined();
    });

    it("should correctly identify level for all existing lessons", () => {
      mainSyllabus.levelProgression.forEach((progression) => {
        progression.lessons.forEach((lesson) => {
          const levelId = getLevelForLesson(lesson.id);
          expect(levelId).toBe(progression.levelId);
        });
      });
    });
  });

  describe("getNextLesson", () => {
    it("should return next lesson in same level", () => {
      // This test will be more meaningful when we have multiple lessons
      const fundamentalsLessons = getLessonsForLevel("fundamentals");

      if (fundamentalsLessons.length > 1) {
        const firstLesson = fundamentalsLessons[0];
        const nextLesson = getNextLesson(firstLesson.id);
        expect(nextLesson).toBeDefined();
        expect(nextLesson?.id).toBe(fundamentalsLessons[1].id);
      }
    });

    it("should return next lesson across levels", () => {
      // When we have lessons in multiple levels, test cross-level navigation
      const allLessons: (typeof mainSyllabus.levelProgression)[0]["lessons"] = [];
      mainSyllabus.levelProgression.forEach((p) => {
        allLessons.push(...p.lessons);
      });

      if (allLessons.length > 1) {
        for (let i = 0; i < allLessons.length - 1; i++) {
          const nextLesson = getNextLesson(allLessons[i].id);
          if (nextLesson) {
            expect(nextLesson.id).toBe(allLessons[i + 1].id);
          }
        }
      }
    });

    it("should return undefined for last lesson", () => {
      const allLessons: (typeof mainSyllabus.levelProgression)[0]["lessons"] = [];
      mainSyllabus.levelProgression.forEach((p) => {
        allLessons.push(...p.lessons);
      });

      if (allLessons.length > 0) {
        const lastLesson = allLessons[allLessons.length - 1];
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
    it("should return previous lesson in same level", () => {
      const fundamentalsLessons = getLessonsForLevel("fundamentals");

      if (fundamentalsLessons.length > 1) {
        const secondLesson = fundamentalsLessons[1];
        const prevLesson = getPreviousLesson(secondLesson.id);
        expect(prevLesson).toBeDefined();
        expect(prevLesson?.id).toBe(fundamentalsLessons[0].id);
      }
    });

    it("should return undefined for first lesson", () => {
      const firstLesson = mainSyllabus.levelProgression[0]?.lessons[0];
      if (firstLesson !== undefined) {
        const prevLesson = getPreviousLesson(firstLesson.id);
        expect(prevLesson).toBeUndefined();
      }
    });

    it("should return undefined for non-existent lesson", () => {
      const prevLesson = getPreviousLesson("non-existent");
      expect(prevLesson).toBeUndefined();
    });

    it("should correctly navigate backwards through syllabus", () => {
      const allLessons: (typeof mainSyllabus.levelProgression)[0]["lessons"] = [];
      mainSyllabus.levelProgression.forEach((p) => {
        allLessons.push(...p.lessons);
      });

      for (let i = 1; i < allLessons.length; i++) {
        const prevLesson = getPreviousLesson(allLessons[i].id);
        if (prevLesson !== undefined) {
          expect(prevLesson.id).toBe(allLessons[i - 1].id);
        }
      }
    });
  });

  describe("getAllExerciseLessons", () => {
    it("should return only exercise type lessons", () => {
      const exercises = getAllExerciseLessons();
      expect(Array.isArray(exercises)).toBe(true);

      exercises.forEach((lesson) => {
        expect(lesson.type).toBe("exercise");
      });
    });

    it("should include exercises from all levels", () => {
      const exercises = getAllExerciseLessons();
      const exerciseIds = new Set(exercises.map((e) => e.id));

      // Check that we found all exercise lessons
      mainSyllabus.levelProgression.forEach((progression) => {
        progression.lessons.forEach((lesson) => {
          if (lesson.type === "exercise") {
            expect(exerciseIds.has(lesson.id)).toBe(true);
          }
        });
      });
    });

    it("should not include non-exercise lessons", () => {
      const exercises = getAllExerciseLessons();
      const exerciseIds = new Set(exercises.map((e) => e.id));

      // Check that non-exercise lessons are not included
      mainSyllabus.levelProgression.forEach((progression) => {
        progression.lessons.forEach((lesson) => {
          if (lesson.type !== "exercise") {
            expect(exerciseIds.has(lesson.id)).toBe(false);
          }
        });
      });
    });

    it("should return at least one exercise", () => {
      const exercises = getAllExerciseLessons();
      expect(exercises.length).toBeGreaterThanOrEqual(1);
    });

    it("should maintain order from syllabus", () => {
      const exercises = getAllExerciseLessons();
      const allLessons: (typeof mainSyllabus.levelProgression)[0]["lessons"] = [];
      mainSyllabus.levelProgression.forEach((p) => {
        allLessons.push(...p.lessons);
      });

      const exerciseLessons = allLessons.filter((l) => l.type === "exercise");

      // Order should be preserved
      exercises.forEach((exercise, index) => {
        expect(exercise.id).toBe(exerciseLessons[index].id);
      });
    });
  });

  describe("navigation edge cases", () => {
    it("should handle empty level progressions", () => {
      const emptyLevelLessons = mainSyllabus.levelProgression.find((p) => p.lessons.length === 0);

      if (emptyLevelLessons) {
        const lessons = getLessonsForLevel(emptyLevelLessons.levelId);
        expect(lessons).toEqual([]);
      }
    });

    it("should handle navigation with single lesson", () => {
      if (getAllExerciseLessons().length === 1) {
        const lesson = getAllExerciseLessons()[0];
        expect(getNextLesson(lesson.id)).toBeUndefined();
        expect(getPreviousLesson(lesson.id)).toBeUndefined();
      }
    });
  });
});
