import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { CommandCore, CommandOption } from "../core";

describe("CommandCore", () => {
  let command: CommandCore;
  const mockOptions: CommandOption[] = [
    { id: "1", label: "Option 1", keywords: ["first"] },
    { id: "2", label: "Option 2", keywords: ["second"] },
    { id: "3", label: "Option 3", disabled: true },
    { id: "4", label: "Option 4", group: "Group A" },
    { id: "5", label: "Option 5", group: "Group A" },
  ];

  beforeEach(() => {
    command = new CommandCore();
    command.registerOptions(mockOptions);
  });

  afterEach(() => {
    command.destroy();
  });

  describe("State Management", () => {
    it("should initialize with closed state", () => {
      const state = command.getState();
      expect(state.open).toBe(false);
      expect(state.input).toBe("");
      expect(state.activeId).toBeUndefined();
    });

    it("should open and close", () => {
      command.open();
      expect(command.getState().open).toBe(true);

      command.close();
      expect(command.getState().open).toBe(false);
    });

    it("should toggle state", () => {
      command.toggle();
      expect(command.getState().open).toBe(true);

      command.toggle();
      expect(command.getState().open).toBe(false);
    });
  });

  describe("Input Handling", () => {
    it("should update input value", () => {
      command.setInput("test");
      expect(command.getState().input).toBe("test");
    });

    it("should filter options based on input", () => {
      command.setInput("Option 1");
      const state = command.getState();
      expect(state.filtered).toHaveLength(1);
      expect(state.filtered[0].id).toBe("1");
    });

    it("should filter by keywords", () => {
      command.setInput("second");
      const state = command.getState();
      expect(state.filtered).toHaveLength(1);
      expect(state.filtered[0].id).toBe("2");
    });

    it("should not include disabled options in filtered results", () => {
      command.setInput("Option");
      const state = command.getState();
      expect(state.filtered.find((opt) => opt.id === "3")).toBeUndefined();
    });
  });

  describe("Navigation", () => {
    beforeEach(() => {
      command.open();
    });

    it("should navigate down through options", () => {
      command.navigateDown();
      expect(command.getState().activeIndex).toBe(0);
      expect(command.getState().activeId).toBe("1");

      command.navigateDown();
      expect(command.getState().activeIndex).toBe(1);
      expect(command.getState().activeId).toBe("2");
    });

    it("should navigate up through options", () => {
      command.setActiveByIndex(1);

      command.navigateUp();
      expect(command.getState().activeIndex).toBe(0);
      expect(command.getState().activeId).toBe("1");
    });

    it("should skip disabled options during navigation", () => {
      command.setActiveByIndex(1);

      command.navigateDown();
      expect(command.getState().activeId).toBe("4");
    });

    it("should wrap around when navigating", () => {
      command.setActiveByIndex(4);

      command.navigateDown();
      expect(command.getState().activeIndex).toBe(0);

      command.navigateUp();
      expect(command.getState().activeIndex).toBe(4);
    });
  });

  describe("Selection", () => {
    it("should select active option", () => {
      const selectHandler = vi.fn();
      command.on("select", selectHandler);

      command.setActiveByIndex(0);
      command.selectActive();

      expect(selectHandler).toHaveBeenCalledWith(
        expect.objectContaining({
          type: "select",
          option: mockOptions[0],
        })
      );
    });

    it("should not select disabled option", () => {
      const selectHandler = vi.fn();
      command.on("select", selectHandler);

      command.setActiveByIndex(2);
      command.selectActive();

      expect(selectHandler).not.toHaveBeenCalled();
    });

    it("should close after selection", () => {
      command.open();
      command.setActiveByIndex(0);
      command.selectActive();

      expect(command.getState().open).toBe(false);
    });
  });

  describe("Event Handling", () => {
    it("should emit open event", () => {
      const handler = vi.fn();
      command.on("open", handler);

      command.open();

      expect(handler).toHaveBeenCalledWith(
        expect.objectContaining({ type: "open" })
      );
    });

    it("should emit close event", () => {
      const handler = vi.fn();
      command.on("close", handler);

      command.open();
      command.close();

      expect(handler).toHaveBeenCalledWith(
        expect.objectContaining({ type: "close" })
      );
    });

    it("should emit change event", () => {
      const handler = vi.fn();
      command.on("change", handler);

      command.setInput("test");

      expect(handler).toHaveBeenCalledWith(
        expect.objectContaining({ type: "change", input: "test" })
      );
    });

    it("should unsubscribe events", () => {
      const handler = vi.fn();
      const unsubscribe = command.on("open", handler);

      unsubscribe();
      command.open();

      expect(handler).not.toHaveBeenCalled();
    });
  });

  describe("DOM Props", () => {
    it("should provide combobox props", () => {
      const props = command.getComboboxProps();

      expect(props.role).toBe("combobox");
      expect(props["aria-expanded"]).toBe(false);
      expect(props["aria-haspopup"]).toBe("listbox");
    });

    it("should provide input props", () => {
      const props = command.getInputProps();

      expect(props.role).toBe("combobox");
      expect(props["aria-autocomplete"]).toBe("list");
      expect(props.value).toBe("");
    });

    it("should provide listbox props", () => {
      const props = command.getListboxProps();

      expect(props.role).toBe("listbox");
      expect(props.id).toBe("kmenu-listbox");
      expect(props.tabIndex).toBe(-1);
    });

    it("should provide option props", () => {
      const props = command.getOptionProps("1");

      expect(props.role).toBe("option");
      expect(props.id).toBe("kmenu-option-1");
      expect(props["aria-selected"]).toBe(false);
    });

    it("should update aria-activedescendant", () => {
      command.setActiveByIndex(0);
      const props = command.getInputProps();

      expect(props["aria-activedescendant"]).toBe("kmenu-option-1");
    });
  });

  describe("Groups", () => {
    it("should organize options by groups", () => {
      const state = command.getState();

      expect(state.groups.has("Group A")).toBe(true);
      expect(state.groups.get("Group A")).toHaveLength(2);
    });
  });

  describe("Custom Filter", () => {
    it("should use custom filter function", () => {
      const customFilter = vi.fn((options) => options.slice(0, 2));
      const customCommand = new CommandCore({ filter: customFilter });
      customCommand.registerOptions(mockOptions);

      customCommand.setInput("test");

      expect(customFilter).toHaveBeenCalled();
      expect(customCommand.getState().filtered).toHaveLength(2);

      customCommand.destroy();
    });
  });
});
