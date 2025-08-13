![image](https://kmenu.harshsingh.me/og.png)

<p align="center">
  <a href="https://kmenu.harshsingh.me/">
    <h2 align="center">kmenu</h2>
  </a>
</p>

<p align="center">Headless, accessible, framework-agnostic command menu component.</p>

### Features

- **Headless**: No styles, just behavior
- **Accessible**: WAI-ARIA compliant
- **Lightweight**: < 6KB min+gzip
- **Framework-agnostic**: Works everywhere
- **Zero dependencies**: No runtime deps

### Installation

```bash
npm install kmenu
```

### Usage

```typescript
import { CommandCore } from "kmenu";

const command = new CommandCore({
  onSelect: (option) => {
    console.log("Selected:", option);
  },
});

// Register options
command.registerOptions([
  { id: "1", label: "Home", keywords: ["main"] },
  { id: "2", label: "Search", keywords: ["find"] },
  { id: "3", label: "Settings" },
]);

// Open/close
command.open();
command.close();
command.toggle();

// Navigate
command.navigateDown();
command.navigateUp();
command.selectActive();

// Get DOM props
const inputProps = command.getInputProps();
const listProps = command.getListboxProps();
const optionProps = command.getOptionProps("1");

// Cleanup
command.destroy();
```

### API Reference

#### CommandCore

```typescript
interface CommandCore<T = any> {
  open(): void;
  close(): void;
  toggle(): void;
  setInput(value: string): void;
  registerOptions(options: CommandOption<T>[]): void;
  setActiveByIndex(index: number): void;
  navigateUp(): void;
  navigateDown(): void;
  selectActive(): void;
  on(event: EventType, handler: EventHandler): Unsubscribe;
  getState(): CommandState<T>;
  destroy(): void;
}
```

#### CommandOption

```typescript
interface CommandOption<T = any> {
  id: string;
  label: string;
  keywords?: string[];
  disabled?: boolean;
  group?: string;
  data?: T;
}
```

### Keyboard Shortcuts

- `Cmd/Ctrl + K` - Open menu
- `↑` / `↓` - Navigate options
- `Enter` - Select option
- `Escape` - Close menu

### Filters

```typescript
import { fuzzyFilter, simpleFilter } from "kmenu";

// Use built-in filters
const command = new CommandCore({
  filter: fuzzyFilter,
});

// Or create custom filter
const customFilter = (options, query) => {
  return options.filter((opt) =>
    opt.label.toLowerCase().includes(query.toLowerCase())
  );
};
```
