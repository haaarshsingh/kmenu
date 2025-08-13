## Migrating from v1 to v2

v2 is a complete rewrite focused on a headless core with lightweight React bindings. The old provider/menu abstraction was replaced with a composable API. This guide maps the v1 concepts to v2 and shows how to migrate quickly.

### Install

```bash
npm install kmenu @kmenu/react
# or
pnpm add kmenu @kmenu/react
yarn add kmenu @kmenu/react
bun add kmenu @kmenu/react
```

### What changed at a glance

- MenuProvider → Command (root component)
- CommandWrapper → Compose `CommandInput`, `CommandList`, etc.
- CommandMenu → Render `CommandOption` items yourself
- Categories/subCommands → Use `group` and nested `children`
- perform → action
- useCommands → removed (pass options directly)
- useKmenu → useCommand
- Dimensions/section sizing → removed (headless; style via CSS)
- preventSearch → `shouldFilter` or custom `filter`
- loadingPlaceholder/loadingState → `CommandLoading` and conditional UI
- placeholder → `CommandInput` placeholder
- index/crumbs → removed; use `CommandBreadcrumbs`

### Core concepts in v2

- Headless engine (`kmenu`) exposes behavior/state, not UI.
- React adapter (`@kmenu/react`) provides small, unstyled components.
- Options are plain data with optional nesting for submenus.

```ts
// kmenu (core) types
interface CommandOption<T = any> {
  id?: string;
  label: string;
  keywords?: string[];
  disabled?: boolean;
  group?: string; // replaces v1 "category"
  data?: T; // arbitrary payload
  children?: CommandOption<T>[]; // replaces v1 "subCommands"
  action?: () => void | Promise<void> | CommandOption<T>[]; // replaces v1 "perform"
}
```

### Minimal React example (v2)

```tsx
import { useState } from "react";
import {
  Command,
  CommandInput,
  CommandList,
  CommandOption,
  CommandGroup,
  CommandEmpty,
  CommandBreadcrumbs,
} from "@kmenu/react";

const options = [
  {
    label: "Dashboard",
    group: "Utility",
    keywords: ["home", "back"],
    action: () => (window.location.href = "/dashboard"),
  },
  {
    label: "Deployments",
    group: "Utility",
    action: () => (window.location.href = "/deployments"),
  },
  {
    label: "Previous",
    group: "Utility",
    keywords: ["back"],
    action: () => window.history.back(),
  },
  {
    label: "More",
    children: [
      {
        label: "Home (new tab)",
        action: () => window.open("/", "_blank"),
      },
    ],
  },
];

export default function App() {
  const [open, setOpen] = useState(false);

  return (
    <Command open={open} onOpenChange={setOpen} options={options}>
      <CommandBreadcrumbs />
      <CommandInput placeholder="Type a command..." />
      <CommandList>
        <CommandEmpty>No results.</CommandEmpty>
        {options
          .filter((o) => !o.group)
          .map((o) => (
            <CommandOption key={o.label} value={o} />
          ))}
        <CommandGroup heading="Utility">
          {options
            .filter((o) => o.group === "Utility")
            .map((o) => (
              <CommandOption key={o.label} value={o} />
            ))}
        </CommandGroup>
      </CommandList>
    </Command>
  );
}
```

### v1 → v2 mapping

- MenuProvider/dimensions
  - Removed. v2 is headless; style with your own CSS. Heights/spacing are not managed by the library.

- Commands model
  - v1: `category`, `commands`, `subCommands`
  - v2: one `options` array; use `group` to label sections and `children` for submenus.

- Actions and links
  - v1: `perform`, `href`, `newTab`, `anchor`, `checkbox`
  - v2: use `action` for behavior. For links, call `window.location.href = "/path"` or your router; for new tabs, `window.open(url, "_blank")`. Custom UI like anchors/checkboxes are rendered inside `CommandOption` children.

- Wrapping components
  - v1: `CommandWrapper` + `CommandMenu`
  - v2: `Command` (root) + compose `CommandInput`, `CommandList`, `CommandOption`, `CommandGroup`, `CommandEmpty`, `CommandBreadcrumbs`, `CommandLoading`, `CommandSeparator`.

- Hooks
  - v1: `useKmenu`
  - v2: `useCommand` returns `{ command, state }`.
    - `state.input` (was `input`)
    - `command.setInput(value)` (was `setInput`)
    - `state.open` (was `isOpen`)
    - `command.open()/close()/toggle()` (was `setOpen`/`toggle`)

- Search/filtering
  - v1: `preventSearch`
  - v2: `shouldFilter` on `Command` or provide a custom `filter` from `kmenu`.

```tsx
import { fuzzyFilter } from "kmenu";

<Command options={options} filter={fuzzyFilter} />;
```

- Loading/empty states
  - v1: `loadingState`, `loadingPlaceholder`, `placeholder`
  - v2: use `CommandLoading`/`CommandEmpty` and set `placeholder` on `CommandInput`.

- Multiple menus/index/crumbs
  - v1: `index`, `crumbs`
  - v2: create separate `Command` instances as needed. Use `CommandBreadcrumbs` for path; nested menus are powered by `children` and built-in back navigation (Backspace on empty input).

### Before/after quick reference

```tsx
// v1
<MenuProvider dimensions={{ commandHeight: 54, sectionHeight: 31 }}>
  <CommandWrapper defaultValue="">
    <CommandMenu commands={main} index={1} crumbs={["Home"]} />
  </CommandWrapper>
</MenuProvider>

// v2
<Command options={options}>
  <CommandBreadcrumbs />
  <CommandInput placeholder="Search…" />
  <CommandList>
    <CommandEmpty>No results</CommandEmpty>
    {options.map((o) => (
      <CommandOption key={o.id ?? o.label} value={o} />
    ))}
  </CommandList>
</Command>
```

### Keyboard shortcuts

- v2 core binds `Cmd/Ctrl + K` globally to toggle the menu by default. You can also control the menu with `open`/`onOpenChange` on the `Command` component or call `command.toggle()` from `useCommand()`.

### TypeScript notes

- Strongly typed options: `CommandOption<T>`; pass generics through `Command` if you keep structured data on `option.data`.

```tsx
interface Extra {
  icon: string;
  run: () => void;
}

const opts: import("@kmenu/react").CommandOptionType<Extra>[] = [
  { label: "Home", data: { icon: "🏠", run: () => {} } },
];

<Command<Extra> options={opts} onSelect={(opt) => opt.data?.run()} />;
```

### Migration tips

- Start by flattening your v1 categories into `options` with `group` set to the old `category`.
- Move `perform` to `action`; replace `href/newTab` with `action` that performs navigation.
- Replace `CommandWrapper`/`CommandMenu` with `Command` + composition.
- Replace `useKmenu` calls with `useCommand` equivalents.

If you run into gaps, check `packages/react/README.md` and `packages/core/README.md` for the complete v2 API surface.
