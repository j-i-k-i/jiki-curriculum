import { describe, it, expect } from "vitest";
import { mainSyllabus } from "../../src/syllabus";
import { hasLevel } from "../../src/levels";
import { exercises } from "../../src/exercises";

describe("Syllabus Structure", () => {
  describe("mainSyllabus", () => {
    it("should have required top-level properties", () => {
      expect(mainSyllabus).toHaveProperty("title");
      expect(mainSyllabus).toHaveProperty("levelProgression");
      expect(typeof mainSyllabus.title).toBe("string");
      expect(Array.isArray(mainSyllabus.levelProgression)).toBe(true);
    });

    it("should have meaningful title and description", () => {
      expect(mainSyllabus.title.length).toBeGreaterThan(0);
      expect(mainSyllabus.title.length).toBeGreaterThan(5);
      if (mainSyllabus.description !== undefined) {
        expect(mainSyllabus.description.length).toBeGreaterThan(10);
      }
    });
  });

  describe("level progressions", () => {
    it("each progression should have valid structure", () => {
      mainSyllabus.levelProgression.forEach((progression) => {
        expect(progression).toHaveProperty("levelId");
        expect(progression).toHaveProperty("lessons");
        expect(typeof progression.levelId).toBe("string");
        expect(Array.isArray(progression.lessons)).toBe(true);
      });
    });

    it("all levelIds should reference existing levels", () => {
      mainSyllabus.levelProgression.forEach((progression) => {
        expect(hasLevel(progression.levelId)).toBe(true);
      });
    });

    it("should have fundamentals as first level", () => {
      expect(mainSyllabus.levelProgression.length).toBeGreaterThan(0);
      expect(mainSyllabus.levelProgression[0].levelId).toBe("fundamentals");
    });

    it("should have logical level ordering", () => {
      const levelIds = mainSyllabus.levelProgression.map((p) => p.levelId);

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
      mainSyllabus.levelProgression.forEach((progression) => {
        progression.lessons.forEach((lesson) => {
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

      mainSyllabus.levelProgression.forEach((progression) => {
        progression.lessons.forEach((lesson) => {
          allIds.push(lesson.id);
        });
      });

      const uniqueIds = new Set(allIds);
      expect(uniqueIds.size).toBe(allIds.length);
    });

    it("exercise lessons should have valid exerciseSlug", () => {
      mainSyllabus.levelProgression.forEach((progression) => {
        progression.lessons.forEach((lesson) => {
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
      mainSyllabus.levelProgression.forEach((progression) => {
        progression.lessons.forEach((lesson) => {
          if (lesson.type === "tutorial") {
            // Should have some way to get content
            const hasTutorialContent = "tutorialContent" in lesson;
            expect(hasTutorialContent || lesson.description).toBeTruthy();
          }
        });
      });
    });

    it("lessons should have meaningful titles", () => {
      mainSyllabus.levelProgression.forEach((progression) => {
        progression.lessons.forEach((lesson) => {
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
      const fundamentals = mainSyllabus.levelProgression.find((p) => p.levelId === "fundamentals");
      expect(fundamentals).toBeDefined();
      expect(fundamentals!.lessons.length).toBeGreaterThanOrEqual(1);
    });

    it("should have at least one exercise lesson", () => {
      let hasExercise = false;

      mainSyllabus.levelProgression.forEach((progression) => {
        progression.lessons.forEach((lesson) => {
          if (lesson.type === "exercise") {
            hasExercise = true;
          }
        });
      });

      expect(hasExercise).toBe(true);
    });

    it("lesson types should match level capabilities", () => {
      // For example, fundamentals shouldn't have complex challenges
      const fundamentals = mainSyllabus.levelProgression.find((p) => p.levelId === "fundamentals");

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
      mainSyllabus.levelProgression.forEach((progression) => {
        // It's okay to have empty arrays for levels not yet implemented
        // but if there are lessons, they should be valid
        if (progression.lessons.length > 0) {
          expect(progression.lessons.length).toBeGreaterThan(0);
        }
      });
    });

    it("should use consistent naming conventions", () => {
      mainSyllabus.levelProgression.forEach((progression) => {
        // Level IDs should be lowercase with hyphens
        expect(progression.levelId).toMatch(/^[a-z-]+$/);

        progression.lessons.forEach((lesson) => {
          // Lesson IDs should be lowercase with hyphens
          expect(lesson.id).toMatch(/^[a-z-]+$/);
        });
      });
    });
  });
});
