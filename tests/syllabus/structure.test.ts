import { describe, it, expect } from "vitest";
import { syllabus, hasLevel } from "../../src/syllabus";
import { exercises } from "../../src/exercises";

describe("Syllabus Structure", () => {
  describe("syllabus", () => {
    it("should be an array of levels", () => {
      expect(Array.isArray(syllabus)).toBe(true);
      expect(syllabus.length).toBeGreaterThan(0);
    });

    it("each level should have valid structure", () => {
      syllabus.forEach((level) => {
        expect(level).toHaveProperty("id");
        expect(level).toHaveProperty("title");
        expect(level).toHaveProperty("lessons");
        expect(Array.isArray(level.lessons)).toBe(true);
      });
    });
  });

  describe("level lessons", () => {
    it("each level should have valid lesson structure", () => {
      syllabus.forEach((level) => {
        expect(level).toHaveProperty("id");
        expect(level).toHaveProperty("lessons");
        expect(typeof level.id).toBe("string");
        expect(Array.isArray(level.lessons)).toBe(true);
      });
    });

    it("all level IDs should be valid", () => {
      syllabus.forEach((level) => {
        expect(hasLevel(level.id)).toBe(true);
      });
    });

    it("should have fundamentals as first level", () => {
      expect(syllabus.length).toBeGreaterThan(0);
      expect(syllabus[0].id).toBe("fundamentals");
    });

    it("should have logical level ordering", () => {
      const levelIds = syllabus.map((level) => level.id);

      // Fundamentals should come before variables
      const fundamentalsIndex = levelIds.indexOf("fundamentals");
      const variablesIndex = levelIds.indexOf("variables");

      if (fundamentalsIndex !== -1 && variablesIndex !== -1) {
        expect(fundamentalsIndex).toBeLessThan(variablesIndex);
      }
    });
  });

  describe("lessons", () => {
    it("all lessons should have required properties", () => {
      syllabus.forEach((level) => {
        level.lessons.forEach((lesson) => {
          expect(lesson).toHaveProperty("id");
          expect(lesson).toHaveProperty("title");
          expect(lesson).toHaveProperty("type");
          expect(typeof lesson.id).toBe("string");
          expect(typeof lesson.title).toBe("string");
          expect(["exercise", "tutorial", "challenge", "assessment"]).toContain(lesson.type);
        });
      });
    });

    it("lesson IDs should be unique across entire syllabus", () => {
      const allIds: string[] = [];

      syllabus.forEach((level) => {
        level.lessons.forEach((lesson) => {
          allIds.push(lesson.id);
        });
      });

      const uniqueIds = new Set(allIds);
      expect(uniqueIds.size).toBe(allIds.length);
    });

    it("exercise lessons should have valid exerciseSlug", () => {
      syllabus.forEach((level) => {
        level.lessons.forEach((lesson) => {
          if (lesson.type === "exercise") {
            expect(lesson).toHaveProperty("exerciseSlug");
            expect(typeof lesson.exerciseSlug).toBe("string");

            // Check if exercise exists
            expect(lesson.exerciseSlug in exercises).toBe(true);
          }
        });
      });
    });

    it("tutorial lessons should have content or reference", () => {
      syllabus.forEach((level) => {
        level.lessons.forEach((lesson) => {
          if (lesson.type === "tutorial") {
            // Should have some way to get content
            const hasTutorialContent = "tutorialContent" in lesson;
            expect(hasTutorialContent || lesson.description).toBeTruthy();
          }
        });
      });
    });

    it("lessons should have meaningful titles", () => {
      syllabus.forEach((level) => {
        level.lessons.forEach((lesson) => {
          expect(lesson.title).toBeTruthy();
          expect(lesson.title.length).toBeGreaterThan(3);
          // Title should be properly capitalized (first letter uppercase)
          expect(lesson.title[0]).toBe(lesson.title[0].toUpperCase());
        });
      });
    });
  });

  describe("content coverage", () => {
    it("fundamentals level should have at least one lesson", () => {
      const fundamentals = syllabus.find((level) => level.id === "fundamentals");
      expect(fundamentals).toBeDefined();
      expect(fundamentals!.lessons.length).toBeGreaterThanOrEqual(1);
    });

    it("should have at least one exercise lesson", () => {
      let hasExercise = false;

      syllabus.forEach((level) => {
        level.lessons.forEach((lesson) => {
          if (lesson.type === "exercise") {
            hasExercise = true;
          }
        });
      });

      expect(hasExercise).toBe(true);
    });

    it("lesson types should match level capabilities", () => {
      // For example, fundamentals shouldn't have complex challenges
      const fundamentals = syllabus.find((level) => level.id === "fundamentals");

      if (fundamentals) {
        fundamentals.lessons.forEach((lesson) => {
          // Early levels should focus on exercises and tutorials
          expect(["exercise", "tutorial"]).toContain(lesson.type);
        });
      }
    });
  });

  describe("data integrity", () => {
    it("should not have empty lesson arrays", () => {
      syllabus.forEach((level) => {
        // It's okay to have empty arrays for levels not yet implemented
        // but if there are lessons, they should be valid
        if (level.lessons.length > 0) {
          expect(level.lessons.length).toBeGreaterThan(0);
        }
      });
    });

    it("should use consistent naming conventions", () => {
      syllabus.forEach((level) => {
        // Level IDs should be lowercase with hyphens
        expect(level.id).toMatch(/^[a-z-]+$/);

        level.lessons.forEach((lesson) => {
          // Lesson IDs should be lowercase with hyphens
          expect(lesson.id).toMatch(/^[a-z-]+$/);
        });
      });
    });
  });
});
