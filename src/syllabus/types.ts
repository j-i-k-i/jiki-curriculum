import type { LevelId } from "../levels";
import type { ExerciseSlug } from "../exercises";

export interface Syllabus {
  title: string;
  description?: string;
  levelProgression: LevelProgression[];
}

export interface LevelProgression {
  levelId: LevelId; // References Level.id from levels registry
  lessons: Lesson[];
}

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
