import { describe, it, expect } from "vitest";
import { levels, getLevel, hasLevel, getLevelIds } from "../../src/levels";

describe("Level Registry", () => {
  describe("levels object", () => {
    it("should contain fundamentals level", () => {
      expect(levels.fundamentals).toBeDefined();
      expect(levels.fundamentals.id).toBe("fundamentals");
    });

    it("should contain variables level", () => {
      expect(levels.variables).toBeDefined();
      expect(levels.variables.id).toBe("variables");
    });
  });

  describe("getLevel", () => {
    it("should return fundamentals level when requested", () => {
      const level = getLevel("fundamentals");
      expect(level.id).toBe("fundamentals");
      expect(level.title).toBe("Programming Fundamentals");
      expect(level.description).toContain("function calls");
    });

    it("should return variables level when requested", () => {
      const level = getLevel("variables");
      expect(level.id).toBe("variables");
      expect(level.title).toBe("Variables and Assignments");
      expect(level.description).toContain("declare variables");
    });

    it("should throw error for invalid level ID", () => {
      // @ts-expect-error Testing invalid input
      expect(() => getLevel("invalid-level")).toThrow("Level 'invalid-level' not found");
    });

    it("should return the same object reference from registry", () => {
      const level1 = getLevel("fundamentals");
      const level2 = getLevel("fundamentals");
      expect(level1).toBe(level2); // Same reference
    });
  });

  describe("hasLevel", () => {
    it("should return true for existing levels", () => {
      expect(hasLevel("fundamentals")).toBe(true);
      expect(hasLevel("variables")).toBe(true);
    });

    it("should return false for non-existent levels", () => {
      expect(hasLevel("advanced")).toBe(false);
      expect(hasLevel("expert")).toBe(false);
      expect(hasLevel("")).toBe(false);
    });

    it("should act as type guard for LevelId", () => {
      const testId: string = "fundamentals";
      if (hasLevel(testId)) {
        // TypeScript should now know testId is LevelId
        const level = getLevel(testId); // Should not error
        expect(level).toBeDefined();
      }
    });
  });

  describe("getLevelIds", () => {
    it("should return array of all level IDs", () => {
      const ids = getLevelIds();
      expect(ids).toContain("fundamentals");
      expect(ids).toContain("variables");
      expect(ids.length).toBeGreaterThanOrEqual(2);
    });

    it("should return IDs in definition order", () => {
      const ids = getLevelIds();
      expect(ids[0]).toBe("fundamentals");
      expect(ids[1]).toBe("variables");
    });

    it("should return array of proper LevelId type", () => {
      const ids = getLevelIds();
      ids.forEach((id) => {
        // Should be able to use each ID with getLevel without type errors
        const level = getLevel(id);
        expect(level).toBeDefined();
      });
    });
  });

  describe("level structure validation", () => {
    it("all levels should have required properties", () => {
      const ids = getLevelIds();
      ids.forEach((id) => {
        const level = getLevel(id);
        expect(level).toHaveProperty("id");
        expect(level).toHaveProperty("title");
        expect(level).toHaveProperty("languageFeatures");
        expect(typeof level.id).toBe("string");
        expect(typeof level.title).toBe("string");
        expect(level.id).toBe(id); // ID should match registry key
      });
    });

    it("all levels should have at least one language configured", () => {
      const ids = getLevelIds();
      ids.forEach((id) => {
        const level = getLevel(id);
        const hasJS = level.languageFeatures.javascript !== undefined;
        const hasPython = level.languageFeatures.python !== undefined;
        expect(hasJS || hasPython).toBe(true);
      });
    });
  });
});
