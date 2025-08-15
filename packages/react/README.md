![image](https://kmenu.dev/og.png)

# kmenu [![kmenu minzip package size](https://img.shields.io/bundlephobia/minzip/kmenu)](https://www.npmjs.com/package/kmenu?activeTab=code) [![kmenu package version](https://img.shields.io/npm/v/kmenu.svg?colorB=green)](https://www.npmjs.com/package/kmenu)

A lightweight command menu library that supercharges your web app's navigation and feature discoverability. It's framework-agnostic, headless, composable, <6kB, and has no runtime dependencies.

### Installation

```bash
npm install kmenu @kmenu/react
```

### Quick Start

```tsx
import {
  Command,
  CommandInput,
  CommandList,
  CommandOption,
  CommandEmpty,
} from "@kmenu/react";

function App() {
  const [open, setOpen] = useState(false);

  const options = [
    { id: "1", label: "Home" },
    { id: "2", label: "Search" },
    { id: "3", label: "Settings" },
  ];

  return (
    <Command
      open={open}
      onOpenChange={setOpen}
      options={options}
      onSelect={(option) => console.log("Selected:", option)}
    >
      <CommandInput placeholder="Type a command..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        {options.map((option) => (
          <CommandOption key={option.id} value={option}>
            {option.label}
          </CommandOption>
        ))}
      </CommandList>
    </Command>
  );
}
```

### Components

#### Command

Root provider component.

```tsx
<Command
  open={open}
  onOpenChange={setOpen}
  options={options}
  filter={fuzzyFilter}
  onSelect={handleSelect}
  value={inputValue}
  onValueChange={setInputValue}
>
  {children}
</Command>
```

#### CommandInput

Search input field.

```tsx
<CommandInput placeholder="Search..." className="your-classes" />
```

#### CommandList

Container for options.

```tsx
<CommandList className="your-classes">{children}</CommandList>
```

#### CommandOption

Individual option item.

```tsx
<CommandOption value={option} disabled={false} className="your-classes">
  {option.label}
</CommandOption>
```

#### CommandGroup

Group related options.

```tsx
<CommandGroup heading="Navigation">
  <CommandOption value={home} />
  <CommandOption value={search} />
</CommandGroup>
```

#### CommandEmpty

Empty state when no results.

```tsx
<CommandEmpty>No results found.</CommandEmpty>
```

#### CommandLoading

Loading state for async data.

```tsx
<CommandLoading>Loading...</CommandLoading>
```

#### CommandSeparator

Visual separator between groups.

```tsx
<CommandGroup heading="File" />
<CommandSeparator />
<CommandGroup heading="Edit" />
```

### Hooks

#### useCommand

Access command instance and state.

```tsx
function CustomComponent() {
  const { command, state } = useCommand();

  // Access current state
  console.log(state.input);
  console.log(state.activeId);
  console.log(state.filtered);

  // Use command methods
  command?.navigateDown();
  command?.selectActive();
}
```

### Styling

Components are unstyled by default. Add your own styles:

```tsx
// Tailwind CSS
<CommandOption className="px-4 py-2 hover:bg-gray-100 data-[active=true]:bg-blue-50">
  {option.label}
</CommandOption>

// CSS Modules
<CommandOption className={styles.option}>
  {option.label}
</CommandOption>

// Styled Components
const StyledOption = styled(CommandOption)`
  padding: 0.5rem 1rem;
  &[data-active="true"] {
    background: #f0f0ff;
  }
`;
```

### Examples

#### Controlled Input

```tsx
function ControlledCommand() {
  const [value, setValue] = useState("");

  return (
    <Command value={value} onValueChange={setValue}>
      <CommandInput value={value} onValueChange={setValue} />
      {/* ... */}
    </Command>
  );
}
```

#### Async Options

```tsx
function AsyncCommand() {
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch('/api/commands')
      .then(res => res.json())
      .then(data => {
        setOptions(data);
        setLoading(false);
      });
  }, []);

  return (
    <Command options={options}>
      <CommandInput />
      <CommandList>
        {loading ? <CommandLoading /> : /* render options */}
      </CommandList>
    </Command>
  );
}
```

#### Custom Filter

```tsx
import { fuzzyFilter } from "kmenu";

<Command options={options} filter={fuzzyFilter}>
  {/* ... */}
</Command>;
```

### TypeScript

Full TypeScript support with generics:

```tsx
interface MyData {
  icon: string | ReactElement;
  action: () => void;
}

const options: CommandOption<MyData>[] = [
  {
    id: "1",
    label: "Home",
    data: {
      icon: <Home />,
      action: () => navigate("/home"),
    },
  },
];

<Command<MyData>
  options={options}
  onSelect={(option) => {
    option.data?.action();
  }}
/>;
```
