![image](https://kmenu.harshsingh.me/og.png)

<p align="center">
  <a href="https://kmenu.harshsingh.me/">
    <h2 align="center">kmenu</h2>
  </a>
</p>

<p align="center">Headless, accessible, framework-agnostic command menu component.</p>

### About

This is the monorepo for kmenu, a tiny engine for building fast, accessible command palettes (⌘K menus). It contains the core headless library and a React adapter, plus an example app.

### Packages

- **core**: `kmenu` — headless engine with zero runtime dependencies. See `packages/core`.
- **react**: `@kmenu/react` — idiomatic React components and hooks. See `packages/react`.

### Apps

- **web**: Example/demo site (`apps/web`).

### Features

- **Headless**: Bring your own UI
- **Accessible**: WAI-ARIA compliant
- **Lightweight**: < 6KB min+gzip (core)
- **Framework-agnostic**: Works everywhere
- **Zero dependencies**: No runtime deps in core

### Install

Core only:

```bash
npm install kmenu
# or
pnpm add kmenu
# or
bun add kmenu
```

React adapter:

```bash
npm install kmenu @kmenu/react
# or
pnpm add kmenu @kmenu/react
# or
bun add kmenu @kmenu/react
```

### Monorepo development

Requirements: Node >= 18.

```bash
git clone https://github.com/haaarshsingh/kmenu
cd kmenu
bun install # or npm install / pnpm install

# develop example app and packages
bun run dev

# build all packages/apps
bun run build

# type-check, lint, and test
bun run check-types
bun run lint
bun run test
```

Scripts are powered by Turborepo and run across workspaces. See `package.json` and `turbo.json` for details.

### Links

- **Website / Demo**: https://kmenu.harshsingh.me
- **Repo**: https://github.com/haaarshsingh/kmenu
- **Core README**: `packages/core/README.md`
- **React README**: `packages/react/README.md`
