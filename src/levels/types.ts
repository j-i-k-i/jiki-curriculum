// TODO: This will be imported from @jiki/interpreters eventually
// For now, we define a subset of JavaScript AST node types
export type JavaScriptNodeType =
  // Program structure
  | "Program"
  | "BlockStatement"
  // Statements
  | "ExpressionStatement"
  | "VariableDeclaration"
  | "FunctionDeclaration"
  | "IfStatement"
  | "WhileStatement"
  | "ForStatement"
  | "DoWhileStatement"
  | "BreakStatement"
  | "ContinueStatement"
  | "ReturnStatement"
  | "ThrowStatement"
  | "TryStatement"
  | "SwitchStatement"
  // Expressions
  | "CallExpression"
  | "MemberExpression"
  | "Identifier"
  | "Literal"
  | "TemplateLiteral"
  | "ArrayExpression"
  | "ObjectExpression"
  | "FunctionExpression"
  | "ArrowFunctionExpression"
  | "AssignmentExpression"
  | "BinaryExpression"
  | "UnaryExpression"
  | "UpdateExpression"
  | "LogicalExpression"
  | "ConditionalExpression"
  | "NewExpression"
  | "ThisExpression"
  | "SpreadElement"
  // Declarations
  | "VariableDeclarator"
  | "ClassDeclaration";

// TODO: This will be imported from @jiki/interpreters eventually
export type PythonNodeType =
  | "Module"
  | "Expr"
  | "Call"
  | "Name"
  | "Constant"
  | "Attribute"
  | "Assign"
  | "AugAssign"
  | "BinOp"
  | "UnaryOp"
  | "Compare"
  | "If"
  | "While"
  | "For"
  | "Break"
  | "Continue"
  | "Return"
  | "FunctionDef"
  | "ClassDef"
  | "Import"
  | "ImportFrom"
  | "Add"
  | "Sub"
  | "Mult"
  | "Div"
  | "Mod"
  | "Pow";

// Core level interface
export interface Level {
  id: string; // e.g., "fundamentals", "control-flow"
  title: string; // e.g., "Programming Fundamentals"
  description?: string; // What students learn at this level

  languageFeatures: {
    javascript?: JavaScriptFeatures;
    python?: PythonFeatures;
  };
}

// JavaScript-specific features
export interface JavaScriptFeatures {
  // AST node types that are allowed
  allowedNodes?: JavaScriptNodeType[];

  // Feature flags (matching interpreter's LanguageFeatures)
  featureFlags?: {
    allowShadowing?: boolean;
    allowTruthiness?: boolean;
    requireVariableInstantiation?: boolean;
    allowTypeCoercion?: boolean;
    oneStatementPerLine?: boolean;
    enforceStrictEquality?: boolean;
  };
}

// Python features (for future use)
export interface PythonFeatures {
  allowedNodes?: PythonNodeType[];
  featureFlags?: {
    // Python-specific flags will be added as needed
    allowTruthiness?: boolean;
    allowTypeCoercion?: boolean;
  };
}
