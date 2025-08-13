import React, { createContext, useContext, ReactNode } from "react";
import type { CommandCore, CommandOption } from "../../core/dist";

/**
 * Context value shared by command components.
 */
export interface CommandContextValue<T = any> {
  command: CommandCore<T> | null;
  state: {
    open: boolean;
    input: string;
    activeId?: string;
    activeIndex: number;
    filtered: CommandOption<T>[];
    options: CommandOption<T>[];
    menuStack: string[];
    currentLevel: number;
    breadcrumbs: { id: string; label: string }[];
  };
}

export const CommandContext = createContext<CommandContextValue | null>(null);

/**
 * Hook to access the command context. Throws if used outside of `Command`.
 */
export function useCommand<T = any>(): CommandContextValue<T> {
  const context = useContext(CommandContext);

  if (!context) {
    throw new Error("useCommand must be used within a <Command> component");
  }

  return context as CommandContextValue<T>;
}
