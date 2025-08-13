/**
 * All states for the internal state machine.
 */
export type State = "idle" | "open" | "navigating" | "filtering" | "selected";

/**
 * A named transition describing allowed `from` state(s) and the resulting `to` state.
 */
export interface StateTransition {
  from: State | State[];
  to: State;
  guard?: () => boolean;
}

export class StateMachine {
  private currentState: State;
  private transitions = new Map<string, StateTransition>();
  private listeners = new Map<State, Set<() => void>>();

  constructor(initialState: State = "idle") {
    this.currentState = initialState;
  }

  /** Register a named transition. */
  defineTransition(name: string, transition: StateTransition): void {
    this.transitions.set(name, transition);
  }

  /** Attempt a transition by name. Returns `true` if applied. */
  transition(name: string): boolean {
    const transition = this.transitions.get(name);
    if (!transition) return false;

    const fromStates = Array.isArray(transition.from)
      ? transition.from
      : [transition.from];

    if (!fromStates.includes(this.currentState)) return false;

    if (transition.guard && !transition.guard()) return false;

    const previousState = this.currentState;
    this.currentState = transition.to;

    this.notifyListeners(previousState);
    this.notifyListeners(this.currentState);

    return true;
  }

  /** Get the current state. */
  getState(): State {
    return this.currentState;
  }

  /** Subscribe to callbacks when a state is entered. */
  onStateEnter(state: State, callback: () => void): () => void {
    if (!this.listeners.has(state)) {
      this.listeners.set(state, new Set());
    }
    this.listeners.get(state)!.add(callback);

    return () => {
      this.listeners.get(state)?.delete(callback);
    };
  }

  private notifyListeners(state: State): void {
    this.listeners.get(state)?.forEach((callback) => callback());
  }
}
