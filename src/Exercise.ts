import type { ExecutionContext } from "@jiki/interpreters";

// Animation type that exercises produce
export interface Animation {
  targets: string; // CSS selector for the element to animate
  offset: number; // Time offset in milliseconds
  duration?: number; // Duration of the animation in milliseconds
  easing?: string; // Easing function name
  transformations: {
    // Subset of anime.js AnimationParams that exercises use
    left?: number;
    top?: number;
    translateX?: number;
    translateY?: number;
    rotate?: number;
    scale?: number;
    opacity?: number;
  };
}

// Base exercise class that all curriculum exercises extend
export abstract class Exercise {
  animations: Animation[] = [];
  view: HTMLElement;

  abstract availableFunctions: Array<{
    name: string;
    func: (ctx: ExecutionContext) => void;
    description?: string;
  }>;

  abstract getState(): Record<string, number | string | boolean>;

  constructor() {
    this.view = document.createElement("div");
    this.view.id = `exercise-${Math.random().toString(36).substr(2, 9)}`;
    this.view.style.display = "none";
    document.body.appendChild(this.view);

    this.populateView();
  }

  protected populateView() {}

  getView(): HTMLElement {
    return this.view;
  }
}
