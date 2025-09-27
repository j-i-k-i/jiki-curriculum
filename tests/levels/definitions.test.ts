import { describe, it, expect } from "vitest";
import { getLevel, getLevelIds } from "../../src/levels";

describe("Level Definitions", () => {
  describe("fundamentals level", () => {
    const level = getLevel("fundamentals");

    it("should have appropriate metadata", () => {
      expect(level.id).toBe("fundamentals");
      expect(level.title).toBe("Programming Fundamentals");
      expect(level.description).toBeDefined();
      expect(level.description).toContain("function calls");
      expect(level.description).toContain("literal values");
    });

    it("should only allow basic JavaScript nodes", () => {
      const jsFeatures = level.languageFeatures.javascript!;
      expect(jsFeatures.allowedNodes).toBeDefined();

      // Should allow basics
      expect(jsFeatures.allowedNodes).toContain("Program");
      expect(jsFeatures.allowedNodes).toContain("ExpressionStatement");
      expect(jsFeatures.allowedNodes).toContain("CallExpression");
      expect(jsFeatures.allowedNodes).toContain("Identifier");
      expect(jsFeatures.allowedNodes).toContain("Literal");
      expect(jsFeatures.allowedNodes).toContain("MemberExpression");

      // Should NOT allow advanced features
      expect(jsFeatures.allowedNodes).not.toContain("IfStatement");
      expect(jsFeatures.allowedNodes).not.toContain("ForStatement");
      expect(jsFeatures.allowedNodes).not.toContain("VariableDeclaration");
      expect(jsFeatures.allowedNodes).not.toContain("FunctionDeclaration");
    });

    it("should have restrictive feature flags", () => {
      const jsFlags = level.languageFeatures.javascript?.featureFlags!;

      expect(jsFlags.allowTruthiness).toBe(false);
      expect(jsFlags.allowTypeCoercion).toBe(false);
      expect(jsFlags.enforceStrictEquality).toBe(true);
      expect(jsFlags.allowShadowing).toBe(false);
    });

    it("should only allow basic Python nodes", () => {
      const pyFeatures = level.languageFeatures.python!;
      expect(pyFeatures.allowedNodes).toBeDefined();

      // Should allow basics
      expect(pyFeatures.allowedNodes).toContain("Module");
      expect(pyFeatures.allowedNodes).toContain("Expr");
      expect(pyFeatures.allowedNodes).toContain("Call");
      expect(pyFeatures.allowedNodes).toContain("Name");
      expect(pyFeatures.allowedNodes).toContain("Constant");

      // Should NOT allow advanced features
      expect(pyFeatures.allowedNodes).not.toContain("If");
      expect(pyFeatures.allowedNodes).not.toContain("While");
      expect(pyFeatures.allowedNodes).not.toContain("FunctionDef");
    });
  });

  describe("variables level", () => {
    const level = getLevel("variables");

    it("should have appropriate metadata", () => {
      expect(level.id).toBe("variables");
      expect(level.title).toBe("Variables and Assignments");
      expect(level.description).toBeDefined();
      expect(level.description).toContain("declare variables");
      expect(level.description).toContain("basic operations");
    });

    it("should include all fundamentals nodes plus variable-specific ones", () => {
      const fundamentalsJS = getLevel("fundamentals").languageFeatures.javascript!;
      const variablesJS = level.languageFeatures.javascript!;

      // Should include everything from fundamentals
      fundamentalsJS.allowedNodes?.forEach((node) => {
        expect(variablesJS.allowedNodes).toContain(node);
      });

      // Plus new variable-related nodes
      expect(variablesJS.allowedNodes).toContain("VariableDeclaration");
      expect(variablesJS.allowedNodes).toContain("VariableDeclarator");
      expect(variablesJS.allowedNodes).toContain("AssignmentExpression");
      expect(variablesJS.allowedNodes).toContain("BinaryExpression");
      expect(variablesJS.allowedNodes).toContain("UpdateExpression");
    });

    it("should enable variable-specific feature flags", () => {
      const jsFlags = level.languageFeatures.javascript?.featureFlags!;

      expect(jsFlags.requireVariableInstantiation).toBe(true);
      expect(jsFlags.allowShadowing).toBe(false); // Still restrictive

      // Should maintain restrictions from fundamentals
      expect(jsFlags.allowTruthiness).toBe(false);
      expect(jsFlags.allowTypeCoercion).toBe(false);
    });

    it("should add Python assignment nodes", () => {
      const pyFeatures = level.languageFeatures.python!;

      // Should have assignment-related nodes
      expect(pyFeatures.allowedNodes).toContain("Assign");
      expect(pyFeatures.allowedNodes).toContain("AugAssign");
      expect(pyFeatures.allowedNodes).toContain("BinOp");
      expect(pyFeatures.allowedNodes).toContain("Add");
      expect(pyFeatures.allowedNodes).toContain("Sub");
      expect(pyFeatures.allowedNodes).toContain("Mult");
      expect(pyFeatures.allowedNodes).toContain("Div");
    });
  });

  describe("level progression validation", () => {
    it("each level should be a superset of the previous", () => {
      const levelIds = getLevelIds();

      for (let i = 1; i < levelIds.length; i++) {
        const prevLevel = getLevel(levelIds[i - 1]);
        const currLevel = getLevel(levelIds[i]);

        // Check JavaScript nodes
        const prevJSNodes = prevLevel.languageFeatures.javascript?.allowedNodes || [];
        const currJSNodes = currLevel.languageFeatures.javascript?.allowedNodes || [];

        if (prevJSNodes.length > 0 && currJSNodes.length > 0) {
          prevJSNodes.forEach((node) => {
            expect(currJSNodes).toContain(node);
          });
          expect(currJSNodes.length).toBeGreaterThanOrEqual(prevJSNodes.length);
        }

        // Check Python nodes
        const prevPyNodes = prevLevel.languageFeatures.python?.allowedNodes || [];
        const currPyNodes = currLevel.languageFeatures.python?.allowedNodes || [];

        if (prevPyNodes.length > 0 && currPyNodes.length > 0) {
          prevPyNodes.forEach((node) => {
            expect(currPyNodes).toContain(node);
          });
          expect(currPyNodes.length).toBeGreaterThanOrEqual(prevPyNodes.length);
        }
      }
    });

    it("no level should enable dangerous features too early", () => {
      const levelIds = getLevelIds();

      levelIds.forEach((id) => {
        const level = getLevel(id);
        const jsFlags = level.languageFeatures.javascript?.featureFlags;

        if (jsFlags) {
          // Early levels should be restrictive
          if (id === "fundamentals" || id === "variables") {
            expect(jsFlags.allowTruthiness).toBe(false);
            expect(jsFlags.allowTypeCoercion).toBe(false);
            expect(jsFlags.allowShadowing).toBe(false);
          }
        }
      });
    });

    it("all levels should have consistent structure", () => {
      const levelIds = getLevelIds();

      levelIds.forEach((id) => {
        const level = getLevel(id);

        // Should have at least one language
        const hasJS = level.languageFeatures.javascript !== undefined;
        const hasPython = level.languageFeatures.python !== undefined;
        expect(hasJS || hasPython).toBe(true);

        // If has JavaScript, should have both nodes and flags
        if (hasJS) {
          expect(level.languageFeatures.javascript!.allowedNodes).toBeDefined();
          expect(Array.isArray(level.languageFeatures.javascript!.allowedNodes)).toBe(true);
          expect(level.languageFeatures.javascript!.allowedNodes!.length).toBeGreaterThan(0);
          expect(level.languageFeatures.javascript!.featureFlags).toBeDefined();
        }

        // If has Python, should have nodes
        if (hasPython) {
          expect(level.languageFeatures.python!.allowedNodes).toBeDefined();
          expect(Array.isArray(level.languageFeatures.python!.allowedNodes)).toBe(true);
          expect(level.languageFeatures.python!.allowedNodes!.length).toBeGreaterThan(0);
        }
      });
    });
  });
});
