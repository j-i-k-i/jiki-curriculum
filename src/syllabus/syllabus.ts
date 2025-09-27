import type { Syllabus } from "./types";

export const mainSyllabus: Syllabus = {
  title: "Introduction to Programming",
  description: "Learn programming from the ground up with interactive exercises",

  levelProgression: [
    {
      levelId: "fundamentals",
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
    },
    {
      levelId: "variables",
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
    }
    // Future levels will be added here:
    // {
    //   levelId: "control-flow",
    //   lessons: [...]
    // },
    // {
    //   levelId: "loops",
    //   lessons: [...]
    // },
    // {
    //   levelId: "functions",
    //   lessons: [...]
    // }
  ]
};
