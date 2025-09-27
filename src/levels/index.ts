import { fundamentalsLevel } from "./fundamentals";
import { variablesLevel } from "./variables";
import type { Level } from "./types";

// Export types
export * from "./types";

// Registry of all levels
export const levels = {
  fundamentals: fundamentalsLevel,
  variables: variablesLevel
  // Future levels will be added here:
  // controlFlow: controlFlowLevel,
  // loops: loopsLevel,
  // functions: functionsLevel,
  // arrays: arraysLevel,
  // objects: objectsLevel,
} as const;

export type LevelId = keyof typeof levels;

// Helper to get level by ID
export function getLevel(id: LevelId): Level {
  const level = levels[id];
  if (level === undefined) {
    throw new Error(`Level '${id}' not found`);
  }
  return level;
}

// Helper to get allowed nodes for a language
export function getAllowedNodes(levelId: LevelId, language: "javascript" | "python"): string[] | undefined {
  const level = getLevel(levelId);
  const features = level.languageFeatures[language];
  return features?.allowedNodes;
}

// Helper to get feature flags for a language
export function getFeatureFlags(
  levelId: LevelId,
  language: "javascript" | "python"
): Record<string, number | boolean> | undefined {
  const level = getLevel(levelId);
  const features = level.languageFeatures[language];
  return features?.featureFlags;
}

// Helper to get combined language features for interpreter
export function getLanguageFeatures(
  levelId: LevelId | string,
  language: "javascript"
): {
  allowedNodes?: string[];
  allowShadowing?: boolean;
  allowTruthiness?: boolean;
  requireVariableInstantiation?: boolean;
  allowTypeCoercion?: boolean;
  oneStatementPerLine?: boolean;
  enforceStrictEquality?: boolean;
} {
  // Return empty object for invalid level
  if (!hasLevel(levelId)) {
    return {};
  }

  const level = getLevel(levelId as LevelId);
  const features = level.languageFeatures[language];

  if (!features) {
    return {};
  }

  return {
    allowedNodes: features.allowedNodes,
    ...features.featureFlags
  };
}

// Get all level IDs in order (useful for progression)
export function getLevelIds(): LevelId[] {
  return Object.keys(levels) as LevelId[];
}

// Check if a level exists
export function hasLevel(id: string): id is LevelId {
  return id in levels;
}
