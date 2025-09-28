# Syllabus

## Overview

The syllabus organizes exercises, tutorials, and other learning content into a structured curriculum. It maps levels to specific lessons, tracks student progress, and provides navigation through the learning path. The syllabus supports both JavaScript and Python, with exercises automatically adapting their function names to match the chosen language's conventions.

## Syllabus Structure

### Core Types

```typescript
interface Syllabus {
  levels: SyllabusLevel[];
}

interface SyllabusLevel {
  id: string; // Matches Level.id
  title: string;
  description: string;
  lessons: Lesson[];
  requiredLessons?: string[]; // Lessons that must be completed
}

interface Lesson {
  id: string;
  type: LessonType;
  title: string;
  description?: string;
  exerciseId?: string; // For exercise lessons
  content?: any; // For other lesson types
  requiredFor?: string[]; // Lessons this unlocks
}

type LessonType = "exercise" | "tutorial" | "challenge" | "assessment" | "reading";
```

## Current Syllabus

### Level: Fundamentals

**Lessons:**

1. **Hello World** (tutorial)
   - Introduction to the interface
   - Writing your first line of code

2. **Basic Movement** (exercise)
   - Learn function calls
   - Move a character around the screen

3. **Sequence Matters** (exercise)
   - Understanding execution order
   - Complete tasks in the right sequence

### Level: Variables

**Lessons:**

1. **Introduction to Variables** (reading)
   - What are variables?
   - Why do we need them?

2. **Variable Practice** (exercise)
   - Declare and use variables
   - Perform basic operations

3. **Counter Challenge** (challenge)
   - Build a working counter
   - Use increment/decrement operators

## Navigation System

The syllabus provides navigation helpers:

```typescript
// Get all lessons for a level
getLessonsForLevel("fundamentals");

// Get next available lesson
getNextLesson(currentLessonId, completedLessons);

// Check if lesson is unlocked
isLessonUnlocked(lessonId, completedLessons);

// Get lesson by ID
getLesson(lessonId);
```

## Lesson Types

### Exercise

- Interactive coding challenges with language-specific function naming
- Links to Exercise classes that define their own unique functions
- Provides hands-on practice in JavaScript or Python
- Example: "Move the robot to the goal" using `moveForward()` (JS) or `move_forward()` (Python)

### Tutorial

- Guided walkthroughs for both JavaScript and Python
- Step-by-step instructions with language-appropriate syntax
- Introduces new concepts
- Example: "How to use variables" with `let x = 5` (JS) or `x = 5` (Python)

### Challenge

- Open-ended problems
- Tests understanding
- Multiple solutions possible
- Example: "Sort the list efficiently"

### Assessment

- Formal evaluations
- Checks level mastery
- Gates progression
- Example: "Variables quiz"

### Reading

- Conceptual content
- Background information
- Theory and best practices
- Example: "Why functions matter"

## Progress Tracking

The syllabus integrates with progress tracking:

```typescript
interface StudentProgress {
  completedLessons: string[];
  currentLesson: string;
  levelProgress: {
    [levelId: string]: {
      completed: boolean;
      lessonsCompleted: number;
      totalLessons: number;
    };
  };
}
```

## Adding Content to Syllabus

### Step 1: Create the Lesson

```typescript
const newLesson: Lesson = {
  id: "loops-intro",
  type: "tutorial",
  title: "Introduction to Loops",
  description: "Learn how to repeat actions efficiently",
  content: {
    slides: [...],
    examples: [...]
  }
};
```

### Step 2: Add to Level

```typescript
const controlFlowLevel: SyllabusLevel = {
  id: "control-flow",
  title: "Control Flow",
  description: "Learn conditionals and loops",
  lessons: [
    // ... existing lessons
    newLesson
  ],
  requiredLessons: ["loops-intro", "loop-practice"]
};
```

### Step 3: Define Prerequisites

```typescript
// This lesson requires completion of basics
newLesson.requiredFor = ["advanced-loops"];

// Advanced loops requires this lesson
advancedLoopsLesson.requires = ["loops-intro"];
```

## Syllabus Design Principles

### Pedagogical Structure

1. **Scaffolding**: Build complexity gradually
2. **Repetition**: Practice concepts multiple times
3. **Variety**: Mix lesson types for engagement
4. **Assessment**: Regular knowledge checks

### Technical Considerations

1. **Modularity**: Lessons should be self-contained
2. **Flexibility**: Support different learning paths
3. **Extensibility**: Easy to add new content
4. **Tracking**: Clear progress indicators

## Integration with Frontend

The frontend uses the syllabus to:

1. Display course structure
2. Navigate between lessons
3. Track completion status
4. Unlock new content
5. Show progress bars

## Testing the Syllabus

Syllabus tests verify:

- All exercises exist in the exercise registry
- No circular dependencies in prerequisites
- Level IDs match between syllabus and levels
- Required lessons are actually in the level
- Navigation functions work correctly

See `tests/syllabus/` for test examples.

## Future Enhancements

### Adaptive Learning

- Adjust difficulty based on performance
- Skip lessons if concepts are mastered
- Provide remedial content when needed

### Branching Paths

- Multiple tracks (e.g., web dev vs data science)
- Optional deep-dives
- Student choice in progression

### Social Features

- Share progress with classmates
- Collaborative challenges
- Peer review exercises

### Analytics

- Track time per lesson
- Identify struggle points
- Optimize lesson order based on data
