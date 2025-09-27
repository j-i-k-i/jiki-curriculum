import type { Level } from "./types";

export const fundamentalsLevel: Level = {
  id: "fundamentals",
  title: "Programming Fundamentals",
  description: "Learn the basics: function calls and literal values",

  languageFeatures: {
    javascript: {
      allowedNodes: [
        "ExpressionStatement",
        "LiteralExpression",
        "IdentifierExpression",
        "MemberExpression" // For console.log or object.method()
      ],
      featureFlags: {
        allowTruthiness: false,
        allowTypeCoercion: false,
        enforceStrictEquality: true,
        allowShadowing: false
      }
    }
    // Python support will be added when NodeType is defined in interpreters
  }
};
