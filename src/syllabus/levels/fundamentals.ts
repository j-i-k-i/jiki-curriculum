import type { Level } from "../types";

export const fundamentalsLevel: Level = {
  id: "fundamentals",
  title: "Programming Fundamentals",
  description: "Learn the basics: function calls and literal values",
  educationalGoal: "",

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
    },
    python: {
      allowedNodes: [
        "ExpressionStatement",
        "LiteralExpression",
        "IdentifierExpression"
        // Note: Python doesn't have MemberExpression equivalent yet
      ],
      featureFlags: {
        allowTruthiness: false,
        allowTypeCoercion: false
      }
    }
  },

  lessons: [
    {
      id: "first-function-call",
      title: "Your First Function Call",
      description: "Learn how to call functions to make things happen",
      type: "exercise",
      exerciseSlug: "basic-movement"
    }
    // Future lessons for fundamentals level:
    // {
    //   id: "multiple-calls",
    //   title: "Calling Functions Multiple Times",
    //   description: "Practice calling functions repeatedly",
    //   type: "exercise",
    //   exerciseSlug: "repeated-movement"
    // },
    // {
    //   id: "function-arguments",
    //   title: "Functions with Arguments",
    //   description: "Learn to pass values to functions",
    //   type: "exercise",
    //   exerciseSlug: "movement-with-distance"
    // }
  ]
};
