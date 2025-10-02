// Import node types from interpreters - the canonical source
import type { javascript, python } from "@jiki/interpreters";

// Core level interface
export interface Level {
  id: string; // e.g., "fundamentals", "control-flow"
  title: string; // e.g., "Programming Fundamentals"
  description: string; // Student facing: What students learn at this level
  educationalGoal: string; // Internal facing: What's the educational goal.

  languageFeatures: {
    javascript?: JavaScriptFeatures;
    python?: PythonFeatures;
  };
}

// JavaScript-specific features
export interface JavaScriptFeatures {
  // AST node types that are allowed
  allowedNodes?: javascript.NodeType[];

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
  allowedNodes?: python.NodeType[];
  featureFlags?: {
    // Python-specific flags will be added as needed
    allowTruthiness?: boolean;
    allowTypeCoercion?: boolean;
  };
}
