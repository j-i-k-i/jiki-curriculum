import type { Level } from "./types";

export const variablesLevel: Level = {
  id: "variables",
  title: "Variables and Assignments",
  description: "Learn to declare variables, assign values, and perform basic operations",
  educationalGoal: "",

  languageFeatures: {
    javascript: {
      allowedNodes: [
        // Everything from fundamentals
        "ExpressionStatement",
        "LiteralExpression",
        "IdentifierExpression",
        "MemberExpression",
        // New additions for variables
        "VariableDeclaration",
        "AssignmentExpression",
        "BinaryExpression", // For basic math operations
        "UpdateExpression" // For ++ and --
      ],
      featureFlags: {
        allowShadowing: false,
        requireVariableInstantiation: true,
        allowTruthiness: false,
        allowTypeCoercion: false,
        enforceStrictEquality: true
      }
    }
    // Python support will be added when NodeType is defined in interpreters
  }
};
