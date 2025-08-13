import { StateMachine } from "./state-machine";

function generateIdFromLabel(label: string): string {
  return label
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, "")
    .replace(/\s+/g, "-")
    .replace(/^-+|-+$/g, "")
    .substring(0, 50);
}

/**
 * Describes an actionable or navigable option in the command menu.
 */
export interface CommandOption<T = any> {
  id?: string;
  label: string;
  keywords?: string[];
  disabled?: boolean;
  group?: string;
  data?: T;
  children?: CommandOption<T>[];
  parent?: string;
  action?: () => void | Promise<void> | CommandOption<T>[];
}

/**
 * Breadcrumb segment representing the current submenu path.
 */
export interface Breadcrumb {
  id: string;
  label: string;
}

/**
 * Complete immutable snapshot of the command system state.
 */
export interface CommandState<T = any> {
  open: boolean;
  input: string;
  activeId?: string;
  activeIndex: number;
  filtered: CommandOption<T>[];
  options: CommandOption<T>[];
  groups: Map<string, CommandOption<T>[]>;
  menuStack: string[];
  currentLevel: number;
  breadcrumbs: Breadcrumb[];
  allOptions: CommandOption<T>[];
  currentOptions: CommandOption<T>[];
}

/**
 * Discriminated union of events emitted by the command core.
 */
export type CommandEvent<T = any> =
  | { type: "open" }
  | { type: "close" }
  | { type: "change"; input: string }
  | { type: "select"; option: CommandOption<T> }
  | { type: "navigate"; activeId: string | undefined; activeIndex: number }
  | { type: "submenu"; option: CommandOption<T>; level: number }
  | { type: "back"; level: number };

/** Handler for a specific command event type. */
export type EventHandler<T = any> = (event: CommandEvent<T>) => void;
/** Function that filters `options` using a text `query`. */
export type FilterFunction<T = any> = (
  options: CommandOption<T>[],
  query: string
) => CommandOption<T>[];
/** Callback to unsubscribe an event handler. */
export type Unsubscribe = () => void;

/**
 * Configuration for the `CommandCore` behavior and callbacks.
 */
export interface CommandCoreConfig<T = any> {
  filter?: FilterFunction<T>;
  onOpen?: () => void;
  onClose?: () => void;
  onChange?: (input: string) => void;
  onSelect?: (option: CommandOption<T>) => void;
}

/**
 * Headless command menu engine with filtering, navigation, and submenu support.
 * Provides ARIA props and emits events for UI integration.
 */
export class CommandCore<T = any> {
  private stateMachine: StateMachine;
  private state: CommandState<T>;
  private listeners = new Map<CommandEvent<T>["type"], Set<EventHandler<T>>>();
  private filter: FilterFunction<T>;
  private keydownHandler?: (e: KeyboardEvent) => void;
  private globalKeyHandler?: (e: KeyboardEvent) => void;
  private inputElement?: HTMLInputElement;
  private listElement?: HTMLElement;
  private optionElements = new Map<string, HTMLElement>();
  private destroyed = false;
  private lastScrollTime = 0;

  constructor(config: CommandCoreConfig<T> = {}) {
    this.stateMachine = new StateMachine("idle");

    this.state = {
      open: false,
      input: "",
      activeId: undefined,
      activeIndex: -1,
      filtered: [],
      options: [],
      groups: new Map(),
      menuStack: [],
      currentLevel: 0,
      breadcrumbs: [],
      allOptions: [],
      currentOptions: [],
    };

    this.filter = config.filter || this.defaultFilter;

    this.setupStateMachine();
    this.setupGlobalKeyboardShortcut();

    if (config.onOpen) this.on("open", config.onOpen);
    if (config.onClose) this.on("close", config.onClose);
    if (config.onChange)
      this.on(
        "change",
        (e) => e.type === "change" && config.onChange!(e.input)
      );
    if (config.onSelect)
      this.on(
        "select",
        (e) => e.type === "select" && config.onSelect!(e.option)
      );
  }

  private setupStateMachine(): void {
    this.stateMachine.defineTransition("open", { from: "idle", to: "open" });
    this.stateMachine.defineTransition("startNavigating", {
      from: ["open", "filtering"],
      to: "navigating",
    });
    this.stateMachine.defineTransition("startFiltering", {
      from: ["open", "navigating"],
      to: "filtering",
    });
    this.stateMachine.defineTransition("select", {
      from: ["navigating", "filtering"],
      to: "selected",
    });
    this.stateMachine.defineTransition("close", {
      from: ["open", "navigating", "filtering", "selected"],
      to: "idle",
    });

    this.stateMachine.onStateEnter("open", () => {
      this.state.open = true;
      this.emit({ type: "open" });
      this.updateFiltered();
      this.selectFirstAvailableOption();
      requestAnimationFrame(() => this.inputElement?.focus());
    });

    this.stateMachine.onStateEnter("idle", () => {
      this.state.open = false;
      this.state.input = "";
      this.state.activeId = undefined;
      this.state.activeIndex = -1;
      this.emit({ type: "close" });
    });

    this.stateMachine.onStateEnter("selected", () => {
      this.stateMachine.transition("close");
    });
  }

  private setupGlobalKeyboardShortcut(): void {
    this.globalKeyHandler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        this.toggle();
      }
    };

    if (typeof window !== "undefined") {
      window.addEventListener("keydown", this.globalKeyHandler);
    }
  }

  private defaultFilter: FilterFunction<T> = (options, query) => {
    if (!query) return options;

    const normalizedQuery = query.toLowerCase();

    return options.filter((option) => {
      if (option.disabled) return false;

      const labelMatch = option.label.toLowerCase().includes(normalizedQuery);
      const keywordMatch = option.keywords?.some((k) =>
        k.toLowerCase().includes(normalizedQuery)
      );

      return labelMatch || keywordMatch;
    });
  };

  /** Open the command menu if not destroyed. */
  open(): void {
    if (this.destroyed) return;
    this.stateMachine.transition("open");
  }

  /** Close the command menu if not destroyed. */
  close(): void {
    if (this.destroyed) return;
    this.stateMachine.transition("close");
  }

  /** Toggle the command menu open/closed state. */
  toggle(): void {
    if (this.destroyed) return;
    this.state.open ? this.close() : this.open();
  }

  /**
   * Set the input query and update the filtered options.
   * Emits a `change` event with the latest input.
   */
  setInput(value: string): void {
    if (this.destroyed) return;

    this.state.input = value;
    this.stateMachine.transition("startFiltering");
    this.updateFiltered();
    this.emit({ type: "change", input: value });
  }

  /**
   * Replace the registered options and rebuild all derived state.
   */
  registerOptions(options: CommandOption<T>[]): void {
    if (this.destroyed) return;

    const processedOptions = this.processOptionsWithIds(options);

    this.state.options = [...processedOptions];
    this.state.groups.clear();

    this.state.allOptions = this.flattenOptions(processedOptions);

    this.state.currentOptions = [...processedOptions];

    this.state.menuStack = [];
    this.state.currentLevel = 0;
    this.state.breadcrumbs = [];

    this.rebuildGroups();

    this.updateFiltered();
  }

  private processOptionsWithIds(
    options: CommandOption<T>[]
  ): CommandOption<T>[] {
    const usedIds = new Set<string>();

    const processOption = (option: CommandOption<T>): CommandOption<T> => {
      let id = option.id;
      if (!id) {
        const baseId = generateIdFromLabel(option.label);
        id = this.ensureUniqueId(baseId, usedIds);
      }

      usedIds.add(id);

      const children = option.children
        ? option.children.map((child) => processOption(child))
        : undefined;

      return {
        ...option,
        id,
        children,
      };
    };

    return options.map((option) => processOption(option));
  }

  private ensureUniqueId(baseId: string, usedIds: Set<string>): string {
    if (!usedIds.has(baseId)) {
      return baseId;
    }

    let counter = 1;
    let uniqueId = `${baseId}-${counter}`;

    while (usedIds.has(uniqueId)) {
      counter++;
      uniqueId = `${baseId}-${counter}`;
    }

    return uniqueId;
  }

  private rebuildGroups(): void {
    this.state.groups.clear();

    this.state.currentOptions.forEach((option) => {
      if (option.group) {
        if (!this.state.groups.has(option.group)) {
          this.state.groups.set(option.group, []);
        }
        this.state.groups.get(option.group)!.push(option);
      }
    });
  }

  private reorderByGroups(options: CommandOption<T>[]): CommandOption<T>[] {
    if (this.state.groups.size === 0) {
      return options;
    }

    const reordered: CommandOption<T>[] = [];
    const ungroupedItems = options.filter((opt) => !opt.group);

    reordered.push(...ungroupedItems);

    const groupOrder: string[] = [];
    for (const option of this.state.currentOptions) {
      if (option.group && !groupOrder.includes(option.group)) {
        groupOrder.push(option.group);
      }
    }

    for (const group of groupOrder) {
      const groupItems = options.filter((opt) => opt.group === group);
      reordered.push(...groupItems);
    }

    return reordered;
  }

  private flattenOptions(
    options: CommandOption<T>[],
    parentId?: string
  ): CommandOption<T>[] {
    const flattened: CommandOption<T>[] = [];

    options.forEach((option) => {
      if (parentId) {
        option.parent = parentId;
      }

      flattened.push(option);

      if (option.children && option.children.length > 0) {
        const childOptions = this.flattenOptions(option.children, option.id);
        flattened.push(...childOptions);
      }
    });

    return flattened;
  }

  /**
   * Set the active option by filtered index. Optionally provide the
   * navigation direction to optimize scroll behavior.
   */
  setActiveByIndex(index: number, direction?: "up" | "down"): void {
    if (this.destroyed) return;

    const option = this.state.filtered[index];
    if (!option || option.disabled) return;

    this.state.activeIndex = index;
    this.state.activeId = option.id;
    this.stateMachine.transition("startNavigating");

    this.emit({ type: "navigate", activeId: option.id, activeIndex: index });
    this.updateAriaActiveDescendant();
    this.scrollActiveIntoView(direction);
  }

  private scrollActiveIntoView(direction?: "up" | "down"): void {
    if (!this.state.activeId || !this.listElement) return;

    const activeElement = this.optionElements.get(this.state.activeId);
    if (!activeElement) return;

    const listRect = this.listElement.getBoundingClientRect();
    const activeRect = activeElement.getBoundingClientRect();

    const now = Date.now();
    const isRapidScroll = now - this.lastScrollTime < 100;
    const scrollBehavior: ScrollBehavior = isRapidScroll ? "auto" : "smooth";
    this.lastScrollTime = now;

    const extraMargin = 8;

    if (direction === "up") {
      const topThreshold = listRect.top + listRect.height * 0.25;

      if (activeRect.top < topThreshold) {
        const itemHeight = activeRect.height;
        const bufferItems = 2;
        const targetScroll =
          this.listElement.scrollTop - itemHeight * bufferItems - extraMargin;

        this.listElement.scrollTo({
          top: Math.max(0, targetScroll),
          behavior: scrollBehavior,
        });
      }
    } else if (direction === "down") {
      if (activeRect.bottom > listRect.bottom) {
        const elementTop = activeElement.offsetTop;
        const elementHeight = activeElement.offsetHeight;
        const containerHeight = this.listElement.clientHeight;

        const targetScroll =
          elementTop - containerHeight + elementHeight + extraMargin;

        this.listElement.scrollTo({
          top: Math.max(0, targetScroll),
          behavior: scrollBehavior,
        });
      }
    } else {
      if (activeRect.top < listRect.top) {
        const elementTop = activeElement.offsetTop;
        const targetScroll = elementTop - extraMargin;

        this.listElement.scrollTo({
          top: Math.max(0, targetScroll),
          behavior: scrollBehavior,
        });
      } else if (activeRect.bottom > listRect.bottom) {
        const elementTop = activeElement.offsetTop;
        const elementHeight = activeElement.offsetHeight;
        const containerHeight = this.listElement.clientHeight;
        const targetScroll =
          elementTop - containerHeight + elementHeight + extraMargin;

        this.listElement.scrollTo({
          top: Math.max(0, targetScroll),
          behavior: scrollBehavior,
        });
      }
    }
  }

  /** Set the active option by option id. */
  setActiveById(id: string): void {
    if (this.destroyed) return;

    const index = this.state.filtered.findIndex((opt) => opt.id === id);
    if (index >= 0) {
      this.setActiveByIndex(index);
    }
  }

  /** Move the active selection to the previous enabled option. */
  navigateUp(): void {
    if (this.destroyed) return;

    let newIndex = this.state.activeIndex - 1;

    while (newIndex >= 0 && this.state.filtered[newIndex]?.disabled) {
      newIndex--;
    }

    if (newIndex >= 0) {
      this.setActiveByIndex(newIndex, "up");
    }
  }

  /** Move the active selection to the next enabled option. */
  navigateDown(): void {
    if (this.destroyed) return;

    let newIndex = this.state.activeIndex + 1;

    while (
      newIndex < this.state.filtered.length &&
      this.state.filtered[newIndex]?.disabled
    ) {
      newIndex++;
    }

    if (newIndex < this.state.filtered.length) {
      this.setActiveByIndex(newIndex, "down");
    }
  }

  /** Subscribe to a command event. Returns an unsubscribe function. */
  on(event: CommandEvent<T>["type"], handler: EventHandler<T>): Unsubscribe {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, new Set());
    }

    this.listeners.get(event)!.add(handler);

    return () => {
      this.listeners.get(event)?.delete(handler);
    };
  }

  /** Get a shallow-copied snapshot of the current state. */
  getState(): CommandState<T> {
    return { ...this.state };
  }

  private emit(event: CommandEvent<T>): void {
    const handlers = this.listeners.get(event.type);
    handlers?.forEach((handler) => handler(event));
  }

  private updateFiltered(): void {
    let optionsToFilter: CommandOption<T>[];

    if (this.state.input.trim()) {
      optionsToFilter =
        this.state.currentLevel === 0
          ? this.state.allOptions
          : this.state.currentOptions;
    } else {
      optionsToFilter = this.state.currentOptions;
    }

    const filtered = this.filter(optionsToFilter, this.state.input);

    this.state.filtered = this.reorderByGroups(filtered);

    if (
      this.state.activeId &&
      !this.state.filtered.some((opt) => opt.id === this.state.activeId)
    ) {
      this.state.activeId = undefined;
      this.state.activeIndex = -1;
      this.selectFirstAvailableOption();
    } else if (this.state.activeId) {
      this.state.activeIndex = this.state.filtered.findIndex(
        (opt) => opt.id === this.state.activeId
      );
    } else if (this.state.open) {
      this.selectFirstAvailableOption();
    }
  }

  private selectFirstAvailableOption(): void {
    const firstEnabled = this.state.filtered.findIndex((opt) => !opt.disabled);
    if (firstEnabled >= 0) {
      this.setActiveByIndex(firstEnabled);
    }
  }

  /** Enter a submenu using the given parent `option` with children. */
  enterSubmenu(option: CommandOption<T>): void {
    if (this.destroyed || !option.children || option.children.length === 0)
      return;

    this.state.menuStack.push(option.id!);
    this.state.currentLevel++;

    this.state.breadcrumbs.push({
      id: option.id!,
      label: option.group || option.label,
    });

    this.state.currentOptions = [...option.children];

    this.rebuildGroups();

    this.state.input = "";
    this.state.activeId = undefined;
    this.state.activeIndex = -1;

    this.updateFiltered();
    this.selectFirstAvailableOption();

    this.emit({ type: "submenu", option, level: this.state.currentLevel });
    this.emit({ type: "change", input: this.state.input });
  }

  /** Go back one submenu level. Returns `false` if already at root. */
  goBack(): boolean {
    if (this.destroyed || this.state.menuStack.length === 0) return false;

    this.state.menuStack.pop();
    this.state.currentLevel--;
    this.state.breadcrumbs.pop();

    if (this.state.currentLevel === 0) {
      this.state.currentOptions = [...this.state.options];
    } else {
      const parentMenuId =
        this.state.menuStack[this.state.menuStack.length - 1];
      if (parentMenuId) {
        const parentOption = this.findOptionById(parentMenuId);
        if (parentOption && parentOption.children) {
          this.state.currentOptions = [...parentOption.children];
        } else {
          this.state.currentOptions = [...this.state.options];
          this.state.menuStack = [];
          this.state.currentLevel = 0;
          this.state.breadcrumbs = [];
        }
      } else {
        this.state.currentOptions = [...this.state.options];
        this.state.menuStack = [];
        this.state.currentLevel = 0;
        this.state.breadcrumbs = [];
      }
    }

    this.rebuildGroups();

    this.state.input = "";
    this.state.activeId = undefined;
    this.state.activeIndex = -1;

    this.updateFiltered();

    this.emit({ type: "change", input: this.state.input });

    this.emit({ type: "back", level: this.state.currentLevel });

    return true;
  }

  private findOptionById(id: string): CommandOption<T> | undefined {
    return this.state.allOptions.find((option) => option.id === id);
  }

  private updateAriaActiveDescendant(): void {
    if (this.inputElement && this.state.activeId) {
      this.inputElement.setAttribute(
        "aria-activedescendant",
        `kmenu-option-${this.state.activeId}`
      );
    } else if (this.inputElement) {
      this.inputElement.removeAttribute("aria-activedescendant");
    }
  }

  /**
   * Return ARIA attributes for the combobox container element.
   */
  getComboboxProps() {
    return {
      role: "combobox" as const,
      "aria-expanded": this.state.open,
      "aria-haspopup": "listbox" as const,
      "aria-controls": "kmenu-listbox",
    };
  }

  /**
   * Return ARIA attributes and event handlers for the input element.
   */
  getInputProps() {
    return {
      ref: (el: HTMLInputElement | null) => {
        if (el) this.inputElement = el;
      },
      role: "combobox" as const,
      "aria-autocomplete": "list" as const,
      "aria-expanded": this.state.open,
      "aria-controls": "kmenu-listbox",
      "aria-activedescendant": this.state.activeId
        ? `kmenu-option-${this.state.activeId}`
        : undefined,
      value: this.state.input,
      onInput: (e: Event) => {
        const target = e.target as HTMLInputElement;
        this.setInput(target.value);
      },
      onKeyDown: (e: KeyboardEvent) => {
        this.handleKeyDown(e);
      },
    };
  }

  /** Return ARIA attributes for the listbox element. */
  getListboxProps() {
    return {
      ref: (el: HTMLElement | null) => {
        if (el) this.listElement = el;
      },
      id: "kmenu-listbox",
      role: "listbox" as const,
      "aria-label": "Commands",
      tabIndex: -1,
    };
  }

  /**
   * Return ARIA attributes and event handlers for an option element by id.
   */
  getOptionProps(id: string) {
    const option = this.state.allOptions.find((opt) => opt.id === id);
    const isActive = this.state.activeId === id;
    const index = this.state.filtered.findIndex((opt) => opt.id === id);

    return {
      ref: (el: HTMLElement | null) => {
        if (el) {
          this.optionElements.set(id, el);
        } else {
          this.optionElements.delete(id);
        }
      },
      id: `kmenu-option-${id}`,
      role: "option" as const,
      "aria-selected": isActive,
      "aria-disabled": option?.disabled,
      tabIndex: -1,
      onClick: () => {
        if (option && !option.disabled) {
          this.state.activeId = id;
          this.state.activeIndex = index;
          this.selectActive();
        }
      },
      onMouseEnter: () => {
        if (option && !option.disabled && index >= 0) {
          this.setActiveByIndex(index);
        }
      },
    };
  }

  private handleKeyDown(e: KeyboardEvent): void {
    switch (e.key) {
      case "ArrowUp":
        e.preventDefault();
        this.navigateUp();
        break;

      case "ArrowDown":
        e.preventDefault();
        this.navigateDown();
        break;

      case "Tab":
        e.preventDefault();
        if (e.shiftKey) {
          this.navigateUp();
        } else {
          this.navigateDown();
        }
        break;

      case "Enter":
        e.preventDefault();
        this.selectActive();
        break;

      case "Escape":
        e.preventDefault();
        this.close();
        break;

      case "Backspace":
        if (this.state.input === "" && this.state.currentLevel > 0) {
          e.preventDefault();
          this.goBack();
        }
        break;

      case "Home":
        if (e.ctrlKey || e.metaKey) {
          e.preventDefault();
          const firstEnabled = this.state.filtered.findIndex(
            (opt) => !opt.disabled
          );
          if (firstEnabled >= 0) {
            this.setActiveByIndex(firstEnabled);
          }
        }
        break;

      case "End":
        if (e.ctrlKey || e.metaKey) {
          e.preventDefault();
          for (let i = this.state.filtered.length - 1; i >= 0; i--) {
            if (!this.state.filtered[i]?.disabled) {
              this.setActiveByIndex(i);
              break;
            }
          }
        }
        break;
    }
  }

  /** Select the active option or enter its submenu if it has children. */
  selectActive(): void {
    if (this.destroyed || !this.state.activeId) return;

    const activeOption = this.state.filtered.find(
      (opt) => opt.id === this.state.activeId
    );

    if (!activeOption || activeOption.disabled) return;

    if (activeOption.children && activeOption.children.length > 0) {
      this.enterSubmenu(activeOption);
    } else {
      this.emit({ type: "select", option: activeOption });
      this.stateMachine.transition("select");

      if (activeOption.action) {
        const result = activeOption.action();
        if (result instanceof Promise) {
          result.catch(console.error);
        } else if (Array.isArray(result)) {
          activeOption.children = result;
          this.enterSubmenu(activeOption);
          return;
        }
      }
    }
  }

  /** Cleanup event listeners and internal references. Safe to call multiple times. */
  destroy(): void {
    if (this.destroyed) return;

    this.destroyed = true;
    this.close();

    if (this.globalKeyHandler && typeof window !== "undefined") {
      window.removeEventListener("keydown", this.globalKeyHandler);
    }

    this.listeners.clear();
    this.optionElements.clear();
    this.inputElement = undefined;
    this.listElement = undefined;
  }
}
