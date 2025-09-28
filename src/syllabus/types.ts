// Import node types from interpreters - the canonical source
import type { javascript, python } from "@jiki/interpreters";
import type { ExerciseSlug } from "../exercises";

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

  lessons: Lesson[]; // Lessons for this level
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

// Lesson types
export type LessonType = "exercise" | "tutorial" | "challenge" | "assessment";

export interface BaseLesson {
  id: string;
  title: string;
  description?: string;
  type: LessonType;
}

export interface ExerciseLesson extends BaseLesson {
  type: "exercise";
  exerciseSlug: ExerciseSlug; // References exercise from exercises registry
}

export interface TutorialLesson extends BaseLesson {
  type: "tutorial";
  tutorialContent?: string; // Markdown content or reference to content
}

export interface ChallengeLesson extends BaseLesson {
  type: "challenge";
  challengeSlug?: string; // Reference to challenge definition
}

export interface AssessmentLesson extends BaseLesson {
  type: "assessment";
  assessmentSlug?: string; // Reference to assessment definition
}

export type Lesson = ExerciseLesson | TutorialLesson | ChallengeLesson | AssessmentLesson;
