import type { Level } from "./types";

export const variablesLevel: Level = {
  id: "variables",
  title: "Variables and Assignments",
  description: "Learn to declare variables, assign values, and perform basic operations",

  languageFeatures: {
    javascript: {
      allowedNodes: [
        // Everything from fundamentals
        "Program",
        "ExpressionStatement",
        "CallExpression",
        "Identifier",
        "Literal",
        "MemberExpression",
        // New additions for variables
        "VariableDeclaration",
        "VariableDeclarator",
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
    },
    python: {
      allowedNodes: [
        // Everything from fundamentals
        "Module",
        "Expr",
        "Call",
        "Name",
        "Constant",
        "Attribute",
        // New additions for variables
        "Assign",
        "AugAssign", // For += etc
        "BinOp", // For binary operations
        "Add",
        "Sub",
        "Mult",
        "Div",
        "Mod"
      ],
      featureFlags: {
        allowTruthiness: false,
        allowTypeCoercion: false
      }
    }
  }
};
