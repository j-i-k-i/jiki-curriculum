import { usingFunctions } from "./using-functions";
import { fundamentalsLevel } from "./fundamentals";
import { variablesLevel } from "./variables";

// Export types
export * from "./types";

// The levels registry - ordered progression of levels
export const levels = [
  usingFunctions,
  fundamentalsLevel,
  variablesLevel
  // Future levels will be added here:
  // controlFlowLevel,
  // loopsLevel,
  // functionsLevel,
  // arraysLevel,
  // objectsLevel,
] as const;

export type LevelId = (typeof levels)[number]["id"];

// Helper to get level by ID
export function getLevel(id: LevelId | string) {
  return levels.find((level) => level.id === id);
}

// Helper to get allowed nodes for a language
export function getAllowedNodes(levelId: LevelId | string, language: "javascript" | "python"): string[] | undefined {
  const level = getLevel(levelId);
  const features = level?.languageFeatures[language];
  return features?.allowedNodes;
}

// Helper to get feature flags for a language
export function getFeatureFlags(
  levelId: LevelId | string,
  language: "javascript" | "python"
): Record<string, number | boolean> | undefined {
  const level = getLevel(levelId);
  const features = level?.languageFeatures[language];
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
  const level = getLevel(levelId);
  if (!level) {
    return {};
  }

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
  return levels.map((level) => level.id) as LevelId[];
}

// Check if a level exists
export function hasLevel(id: string): boolean {
  return levels.some((level) => level.id === id);
}
