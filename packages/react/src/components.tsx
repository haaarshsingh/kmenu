import React, {
  useEffect,
  useRef,
  useState,
  ReactNode,
  forwardRef,
  useImperativeHandle,
  HTMLAttributes,
  InputHTMLAttributes,
  useCallback,
} from "react";
import {
  CommandCore,
  CommandOption as CommandOptionType,
  CommandCoreConfig,
  FilterFunction,
} from "../../core/dist";
import { CommandContext, useCommand } from "./context";

/**
 * Root command component props.
 */
export interface CommandProps<T = any>
  extends Omit<HTMLAttributes<HTMLDivElement>, "onChange" | "onSelect"> {
  children?: ReactNode;
  value?: string;
  onValueChange?: (value: string) => void;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  options?: CommandOptionType<T>[];
  filter?: FilterFunction<T>;
  onSelect?: (option: CommandOptionType<T>) => void;
  shouldFilter?: boolean;
}

/**
 * Ref handle exposed by `Command`.
 */
export interface CommandRef<T = any> {
  command: CommandCore<T> | null;
}

/**
 * Root component that wires the headless core to React and provides context.
 */
export const Command = forwardRef<CommandRef, CommandProps>(function Command<
  T = any,
>(
  {
    children,
    value,
    onValueChange,
    open,
    onOpenChange,
    options = [],
    filter,
    onSelect,
    shouldFilter = true,
    ...props
  }: CommandProps<T>,
  ref: React.Ref<CommandRef<T>>
) {
  const commandRef = useRef<CommandCore<T> | null>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const [state, setState] = useState(() => ({
    open: open ?? false,
    input: value ?? "",
    activeId: undefined as string | undefined,
    activeIndex: -1,
    filtered: options,
    options: options,
    menuStack: [] as string[],
    currentLevel: 0,
    breadcrumbs: [] as { id: string; label: string }[],
  }));

  useEffect(() => {
    const config: CommandCoreConfig<T> = {
      filter: shouldFilter ? filter : undefined,
      onOpen: () => {
        setState((prev) => ({ ...prev, open: true }));
        onOpenChange?.(true);
      },
      onClose: () => {
        setState((prev) => ({
          ...prev,
          open: false,
          input: "",
          activeId: undefined,
          activeIndex: -1,
        }));
        onOpenChange?.(false);
      },
      onChange: (input: string) => {
        setState((prev) => ({ ...prev, input }));
        onValueChange?.(input);
      },
      onSelect: (option: CommandOptionType<T>) => {
        onSelect?.(option);
      },
    };

    const command = new CommandCore<T>(config);
    commandRef.current = command;

    const unsubNavigate = command.on("navigate", (e) => {
      if (e.type === "navigate") {
        setState((prev) => ({
          ...prev,
          activeId: e.activeId,
          activeIndex: e.activeIndex,
        }));
      }
    });

    const unsubSubmenu = command.on("submenu", (e) => {
      if (e.type === "submenu") {
        const commandState = command.getState();
        setState((prev) => ({
          ...prev,
          menuStack: [...commandState.menuStack],
          currentLevel: commandState.currentLevel,
          breadcrumbs: [...commandState.breadcrumbs],
          input: commandState.input,
          activeId: commandState.activeId,
          activeIndex: commandState.activeIndex,
          filtered: [...commandState.filtered],
          options: [...commandState.currentOptions],
        }));
      }
    });

    const unsubBack = command.on("back", (e) => {
      if (e.type === "back") {
        const commandState = command.getState();
        setState((prev) => ({
          ...prev,
          menuStack: [...commandState.menuStack],
          currentLevel: commandState.currentLevel,
          breadcrumbs: [...commandState.breadcrumbs],
          input: commandState.input,
          activeId: commandState.activeId,
          activeIndex: commandState.activeIndex,
          filtered: [...commandState.filtered],
          options: [...commandState.currentOptions],
        }));
      }
    });

    command.registerOptions(options);

    const initialState = command.getState();
    setState({
      open: initialState.open,
      input: initialState.input,
      activeId: initialState.activeId,
      activeIndex: initialState.activeIndex,
      filtered: initialState.filtered,
      options: initialState.currentOptions,
      menuStack: initialState.menuStack,
      currentLevel: initialState.currentLevel,
      breadcrumbs: initialState.breadcrumbs,
    });

    if (open !== undefined && open) {
      command.open();
    }

    return () => {
      unsubNavigate();
      unsubSubmenu();
      unsubBack();
      command.destroy();
      commandRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (!commandRef.current) return;

    commandRef.current.registerOptions(options);
    setState((prev) => ({
      ...prev,
      options,
      filtered: commandRef.current!.getState().filtered,
    }));
  }, [options]);

  useEffect(() => {
    if (!commandRef.current) return;

    if (value !== undefined && value !== state.input) {
      commandRef.current.setInput(value);
    }
  }, [value]);

  useEffect(() => {
    if (!commandRef.current) return;

    if (open !== undefined) {
      if (open && !state.open) {
        commandRef.current.open();
      } else if (!open && state.open) {
        commandRef.current.close();
      }
    }
  }, [open]);

  useEffect(() => {
    if (!commandRef.current) return;

    const updateState = () => {
      const cmdState = commandRef.current!.getState();
      setState({
        open: cmdState.open,
        input: cmdState.input,
        activeId: cmdState.activeId,
        activeIndex: cmdState.activeIndex,
        filtered: cmdState.filtered,
        options: cmdState.currentOptions,
        menuStack: cmdState.menuStack,
        currentLevel: cmdState.currentLevel,
        breadcrumbs: cmdState.breadcrumbs,
      });
    };

    const unsubChange = commandRef.current.on("change", updateState);
    const unsubNavigate = commandRef.current.on("navigate", updateState);
    const unsubSubmenuState = commandRef.current.on("submenu", updateState);
    const unsubBackState = commandRef.current.on("back", updateState);
    const unsubOpen = commandRef.current.on("open", updateState);

    return () => {
      unsubChange();
      unsubNavigate();
      unsubSubmenuState();
      unsubBackState();
      unsubOpen();
    };
  }, [commandRef.current]);

  useEffect(() => {
    if (!state.open || !dialogRef.current) return;

    const dialog = dialogRef.current;
    const focusableElements = dialog.querySelectorAll(
      'input, button, [tabindex]:not([tabindex="-1"]), [contenteditable]'
    );
    const firstElement = focusableElements[0] as HTMLElement;
    const lastElement = focusableElements[
      focusableElements.length - 1
    ] as HTMLElement;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Tab") {
        return;
      }
    };

    if (firstElement) {
      firstElement.focus();
    }

    dialog.addEventListener("keydown", handleKeyDown);

    return () => {
      dialog.removeEventListener("keydown", handleKeyDown);
    };
  }, [state.open]);

  useImperativeHandle(ref, () => ({
    command: commandRef.current,
  }));

  const comboboxProps = commandRef.current?.getComboboxProps() || {};

  return (
    <CommandContext.Provider value={{ command: commandRef.current, state }}>
      <div ref={dialogRef} {...props} {...comboboxProps}>
        {children}
      </div>
    </CommandContext.Provider>
  );
});

/** Props for the command input element. */
export interface CommandInputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "value" | "onChange"> {
  value?: string;
  onValueChange?: (value: string) => void;
}

export const CommandInput = forwardRef<HTMLInputElement, CommandInputProps>(
  function CommandInput(
    { value: controlledValue, onValueChange, ...props },
    ref
  ) {
    const { command, state } = useCommand();
    const inputRef = useRef<HTMLInputElement>(null);

    useImperativeHandle(ref, () => inputRef.current!);

    const inputProps = command?.getInputProps() || {};
    const { ref: commandRef, ...restInputProps } = inputProps as {
      ref: (el: HTMLInputElement) => void;
    };

    useEffect(() => {
      if (inputRef.current && commandRef) {
        commandRef(inputRef.current);
      }
    }, [commandRef]);

    const handleInput = useCallback(
      (e: React.FormEvent<HTMLInputElement>) => {
        const value = e.currentTarget.value;
        command?.setInput(value);
        onValueChange?.(value);
      },
      [command, onValueChange]
    );

    return (
      <input
        ref={inputRef}
        data-kmenu-input
        {...restInputProps}
        {...props}
        value={controlledValue ?? state.input}
        onInput={handleInput}
        onKeyDown={(e) => {
          (restInputProps as any).onKeyDown?.(e);
          props.onKeyDown?.(e);
        }}
      />
    );
  }
);

/** Props for the listbox container. */
export interface CommandListProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
  indicatorOffsetY?: number;
}

export const CommandList = forwardRef<HTMLDivElement, CommandListProps>(
  function CommandList({ children, indicatorOffsetY = 0, ...props }, ref) {
    const { command, state } = useCommand();
    const listRef = useRef<HTMLDivElement>(null);
    const [indicatorStyle, setIndicatorStyle] = useState<{
      opacity: number;
      transform: string;
      width: string;
      height: string;
    }>({
      opacity: 0,
      transform: "translateY(0px)",
      width: "0px",
      height: "0px",
    });

    useImperativeHandle(ref, () => listRef.current!);

    const listProps = command?.getListboxProps() || {};
    const { ref: commandRef, ...restListProps } = listProps as {
      ref: (el: HTMLDivElement) => void;
    };

    useEffect(() => {
      if (listRef.current && commandRef) {
        commandRef(listRef.current);
      }
    }, [commandRef]);

    useEffect(() => {
      if (!listRef.current || !state.activeId) {
        setIndicatorStyle((prev) => ({ ...prev, opacity: 0 }));
        return;
      }

      const updateIndicatorPosition = () => {
        if (!listRef.current || !state.activeId) {
          setIndicatorStyle((prev) => ({ ...prev, opacity: 0 }));
          return;
        }

        let activeElement = listRef.current.querySelector(
          `[data-command-option-id="${state.activeId}"]`
        ) as HTMLElement;

        if (!activeElement) {
          activeElement = listRef.current.querySelector(
            `[data-active="true"]`
          ) as HTMLElement;
        }

        if (!activeElement) {
          setIndicatorStyle((prev) => ({ ...prev, opacity: 0 }));
          return;
        }

        const relativeTop = activeElement.offsetTop + indicatorOffsetY;

        setIndicatorStyle({
          opacity: 1,
          transform: `translateY(${relativeTop}px)`,
          width: `${activeElement.offsetWidth}px`,
          height: `${activeElement.offsetHeight}px`,
        });
      };

      let rafId1: number;
      let rafId2: number;

      rafId1 = requestAnimationFrame(() => {
        rafId2 = requestAnimationFrame(updateIndicatorPosition);
      });

      return () => {
        if (rafId1) cancelAnimationFrame(rafId1);
        if (rafId2) cancelAnimationFrame(rafId2);
      };
    }, [state.activeId, state.filtered, children, indicatorOffsetY]);

    return (
      <div ref={listRef} {...restListProps} {...props}>
        <div className="command-active-indicator" style={indicatorStyle} />
        {children}
      </div>
    );
  }
);

/** Props for an individual command option element. */
export interface CommandOptionProps<T = any>
  extends HTMLAttributes<HTMLDivElement> {
  value: CommandOptionType<T>;
  disabled?: boolean;
  children?: ReactNode;
}

export const CommandOption = forwardRef<HTMLDivElement, CommandOptionProps>(
  function CommandOption<T = any>(
    { value, disabled, children, ...props }: CommandOptionProps<T>,
    ref: React.Ref<HTMLDivElement>
  ) {
    const { command, state } = useCommand<T>();
    const optionRef = useRef<HTMLDivElement>(null);
    const isActive = state.activeId === value.id;
    const isFiltered = state.filtered.some((opt) => opt.id === value.id);

    const optionProps = command?.getOptionProps(value.id!) || {};
    const { ref: commandRef, ...restOptionProps } = optionProps as {
      ref: (el: HTMLDivElement) => void;
    };

    useImperativeHandle(ref, () => optionRef.current!);

    useEffect(() => {
      if (optionRef.current && commandRef && isFiltered) {
        commandRef(optionRef.current);
      }
    }, [commandRef, isFiltered]);

    if (!isFiltered) {
      return null;
    }

    return (
      <div
        ref={optionRef}
        {...restOptionProps}
        {...props}
        data-active={isActive}
        data-disabled={disabled || value.disabled}
        data-command-option-id={value.id}
      >
        {children || value.label}
      </div>
    );
  }
);

/** Props for a visual grouping of options. */
export interface CommandGroupProps extends HTMLAttributes<HTMLDivElement> {
  heading?: ReactNode;
  children?: ReactNode;
}

export const CommandGroup = forwardRef<HTMLDivElement, CommandGroupProps>(
  function CommandGroup({ heading, children, ...props }, ref) {
    return (
      <div ref={ref} role="group" {...props}>
        {heading && (
          <div role="presentation" aria-hidden="true">
            {heading}
          </div>
        )}
        {children}
      </div>
    );
  }
);

/** Props for the empty state container. */
export interface CommandEmptyProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
}

export const CommandEmpty = forwardRef<HTMLDivElement, CommandEmptyProps>(
  function CommandEmpty({ children, ...props }, ref) {
    const { state } = useCommand();

    if (state.filtered.length > 0) {
      return null;
    }

    return (
      <div ref={ref} role="presentation" {...props}>
        {children || "No results found."}
      </div>
    );
  }
);

/** Props for the breadcrumb navigation container. */
export interface CommandBreadcrumbsProps
  extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
}

export const CommandBreadcrumbs = forwardRef<
  HTMLDivElement,
  CommandBreadcrumbsProps
>(function CommandBreadcrumbs({ children, ...props }, ref) {
  const { command, state } = useCommand<any>();

  const handleBreadcrumbClick = (index: number) => {
    if (!command) return;

    const targetLevel = index + 1;
    let currentLevel = command.getState().currentLevel;

    while (currentLevel > targetLevel) {
      const success = command.goBack();
      if (!success) break;
      currentLevel = command.getState().currentLevel;
    }

    requestAnimationFrame(() => {
      const inputElement = document.querySelector(
        "[data-kmenu-input]"
      ) as HTMLInputElement;
      inputElement?.focus();
    });
  };

  return (
    <div ref={ref} role="navigation" aria-label="Menu breadcrumbs" {...props}>
      <span
        onClick={() => handleBreadcrumbClick(-1)}
        style={{ cursor: "pointer" }}
      >
        Home
      </span>
      {state.breadcrumbs.map(
        (crumb: { id: string; label: string }, index: number) => (
          <span key={crumb.id}>
            <span
              onClick={() => handleBreadcrumbClick(index)}
              style={{ cursor: "pointer" }}
            >
              {crumb.label}
            </span>
          </span>
        )
      )}
    </div>
  );
});

/** Props for the loading state container. */
export interface CommandLoadingProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
}

export const CommandLoading = forwardRef<HTMLDivElement, CommandLoadingProps>(
  function CommandLoading({ children, ...props }, ref) {
    return (
      <div
        ref={ref}
        role="status"
        aria-live="polite"
        aria-busy="true"
        {...props}
      >
        {children || "Loading..."}
      </div>
    );
  }
);

/** Props for a separator between list sections. */
export interface CommandSeparatorProps extends HTMLAttributes<HTMLDivElement> {}

export const CommandSeparator = forwardRef<
  HTMLDivElement,
  CommandSeparatorProps
>(function CommandSeparator(props, ref) {
  return (
    <div ref={ref} role="separator" aria-orientation="horizontal" {...props} />
  );
});
