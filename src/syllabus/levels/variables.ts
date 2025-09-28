import type { Level } from "../types";

export const variablesLevel: Level = {
  id: "variables",
  title: "Variables and Assignments",
  description: "Learn to declare variables, assign values, and perform basic operations",

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
  },

  lessons: [
    // {
    //   id: "intro-variables",
    //   title: "Introduction to Variables",
    //   description: "Understand what variables are and why we use them",
    //   type: "tutorial",
    //   tutorialContent: "Variables let you store values and use them later..."
    // },
    // {
    //   id: "declaring-variables",
    //   title: "Declaring and Using Variables",
    //   description: "Learn to create variables and use them in your code",
    //   type: "exercise",
    //   exerciseSlug: "variable-basics"
    // },
    // {
    //   id: "variable-math",
    //   title: "Math with Variables",
    //   description: "Perform calculations and store results",
    //   type: "exercise",
    //   exerciseSlug: "variable-arithmetic"
    // }
  ]
};
