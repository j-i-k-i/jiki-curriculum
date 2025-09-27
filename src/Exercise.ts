// Base exercise class that all curriculum exercises extend
export abstract class Exercise {
  // Animations array - the actual Animation type is defined in the fe repo
  // We use a minimal interface here to avoid coupling
  animations: Array<{
    targets: string;
    duration: number;
    offset: number;
    [key: string]: any;
  }> = [];

  view: HTMLElement;

  abstract availableFunctions: Array<{
    name: string;
    func: (...args: any[]) => any;
    description?: string;
  }>;

  abstract getState(): Record<string, any>;

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
