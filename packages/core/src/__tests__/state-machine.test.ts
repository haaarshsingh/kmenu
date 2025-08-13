import { describe, it, expect, beforeEach, vi } from "vitest";
import { StateMachine } from "../state-machine";

describe("StateMachine", () => {
  let sm: StateMachine;

  beforeEach(() => {
    sm = new StateMachine("idle");
  });

  it("should initialize with the given state", () => {
    expect(sm.getState()).toBe("idle");
  });

  it("should transition between states", () => {
    sm.defineTransition("open", { from: "idle", to: "open" });

    const result = sm.transition("open");

    expect(result).toBe(true);
    expect(sm.getState()).toBe("open");
  });

  it("should not transition from invalid state", () => {
    sm.defineTransition("open", { from: "idle", to: "open" });
    sm.transition("open");

    const result = sm.transition("open");

    expect(result).toBe(false);
    expect(sm.getState()).toBe("open");
  });

  it("should handle multiple from states", () => {
    sm.defineTransition("close", { from: ["open", "navigating"], to: "idle" });
    sm.defineTransition("open", { from: "idle", to: "open" });

    sm.transition("open");
    const result = sm.transition("close");

    expect(result).toBe(true);
    expect(sm.getState()).toBe("idle");
  });

  it("should respect guard conditions", () => {
    let canTransition = false;

    sm.defineTransition("open", {
      from: "idle",
      to: "open",
      guard: () => canTransition,
    });

    expect(sm.transition("open")).toBe(false);
    expect(sm.getState()).toBe("idle");

    canTransition = true;
    expect(sm.transition("open")).toBe(true);
    expect(sm.getState()).toBe("open");
  });

  it("should notify state enter listeners", () => {
    const openListener = vi.fn();
    const idleListener = vi.fn();

    sm.onStateEnter("open", openListener);
    sm.onStateEnter("idle", idleListener);

    sm.defineTransition("open", { from: "idle", to: "open" });
    sm.transition("open");

    expect(openListener).toHaveBeenCalledTimes(1);
    expect(idleListener).toHaveBeenCalledTimes(1);
  });

  it("should unsubscribe listeners", () => {
    const listener = vi.fn();
    const unsubscribe = sm.onStateEnter("open", listener);

    sm.defineTransition("open", { from: "idle", to: "open" });

    unsubscribe();
    sm.transition("open");

    expect(listener).not.toHaveBeenCalled();
  });
});
