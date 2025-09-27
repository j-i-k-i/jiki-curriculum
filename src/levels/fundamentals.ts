import type { Level } from "./types";

export const fundamentalsLevel: Level = {
  id: "fundamentals",
  title: "Programming Fundamentals",
  description: "Learn the basics: function calls and literal values",

  languageFeatures: {
    javascript: {
      allowedNodes: [
        "Program",
        "ExpressionStatement",
        "CallExpression",
        "Identifier",
        "Literal",
        "MemberExpression" // For console.log or object.method()
      ],
      featureFlags: {
        allowTruthiness: false,
        allowTypeCoercion: false,
        enforceStrictEquality: true,
        allowShadowing: false
      }
    },
    python: {
      allowedNodes: [
        "Module",
        "Expr",
        "Call",
        "Name",
        "Constant",
        "Attribute" // For object.method()
      ],
      featureFlags: {
        allowTruthiness: false,
        allowTypeCoercion: false
      }
    }
  }
};
