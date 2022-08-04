![image](https://kmenu.hxrsh.in/Banner.png)

<p align="center">
  <a href="https://kmenu.hxrsh.in/">
    <h2 align="center">kmenu</h2>
  </a>
</p>

<p align="center">🌈 Animated and accessible cmdk interface</p>
<p align="center">
  <a href="https://kmenu.hxrsh.in">Demo</a>
    ·
  <a href="https://npmjs.com/package/kmenu">NPM</a>
      ·
  <a href="https://www.producthunt.com/products/kmenu">Product Hunt</a>
      ·
  <a href="https://stackblitz.com/edit/react-ts-fotwq9?file=App.tsx">StackBlitz</a>
      ·
  <a href="https://codesandbox.io/s/kmenu-demo-codesandbox-cqdhfl">CodeSandbox</a>
 </p>

# 🚀 Quickstart

Install the [npm package](https://www.npmjs.com/package/kmenu)

```zsh
yarn add kmenu
```

### Using the Provider

After you install, you must wrap your application around the `MenuProvider` component. Want to learn how you can customise your menu configuration? Check out the [MenuConfig section](https://github.com/harshhhdev/kmenu/README.md#menu-config).

Inside the `MenuProvider`, you can pass in the theme configuration which all of the palettes will use. 

Below is an example:

```jsx
import { MenuProvider, MenuConfig } from 'kmenu'

const App = () => {
  const config: MenuConfig = { /* ... */ }
  
  return (
    <MenuProvider config={config}>
       {/* ... */}
    </MenuProvider>
  )
}
```

### Adding commands 

After you've installed the package, you can now begin adding commands onto the command palette. 

The commands are broken up into two arrays. One array contains the different categories of the commands, and another array contains the commands itself. Here's a look at how you can define categories:

| Parameter | Description                                               | Type    | Optional | 
|-----------|-----------------------------------------------------------|---------|----------|
| category  | The name of the category the command will be displayed in | string  | ❌       |
| commands  | An array of commands passed onto the category             | Command | ❌       |

Awesome. Now here's a look at how you can create commands:

| Parameter       | Description                                                               | Type         | Optional | 
|-----------------|---------------------------------------------------------------------------|--------------|----------|
| icon            | The icon displayed next to the command                                    | ReactElement | ✅       |
| text            | The text displayed on the command                                         | String       | ❌       |
| perform         | The action to perform                                                     | void         | ✅       |
| href            | The link to open                                                          | void         | ✅       |
| newTab          | Whether or not the link should open in a new tab                          | boolean      | ✅       |
| keywords        | Search keywords for the command                                           | string       | ✅       |
| shorcuts        | The keyboard shortcuts to activate this command                           | Shortcut     | ✅       |
| closeOnComplete | Whether the palette should close when the command is run (default: false) | boolean      | ✅       |

As you might notice, the commands give you the ability to define custom shortcuts. 

Each shortcut can have two target keys and a modifier that would be used in conjunction with a single target key. Note that if you're using a modifier, you can only use a SINGLE target key. Here's a look at how you can create shortcuts:

| Parameter | Description                                              | Type                               | Optional | 
|-----------|----------------------------------------------------------|------------------------------------|----------|
| modifier  | The modifier key used in conjunction with the target key | shift, ctrl, alt, or meta (string) | ✅       |
| keys      | The target keys for this command                         | [string, string?]                  | ❌       |

After you've created all your commands, you must pass them into the `useCommands` hook, which returns a getter and a setter for the commands. For a reference, check out the section on the [useCommands hook](https://github.com/harshhhdev/kmenu/README.md#usecommands-hook). 

Anyways, now that you have an underlying idea of how commands work, here's an example of how to create the commands (using [TypeScript](https://typescriptlang.org/)): 

```ts
import {
  Search,
  Copy,
  Globe,
  GitHub,
  AlertCircle,
  GitPullRequest,
  Zap,
  Edit2,
  Plus,
  Settings,
  Code,
  Command as Cmd,
  Terminal
} from 'react-feather'

const main: Command[] = [
  {
    category: 'Socials',
    commands: [
      {
        icon: <FiGlobe />,
        text: 'Website',
        href: 'https://hxrsh.in',
        newTab: true,
        keywords: 'home'
      },

      {
        icon: <FiTwitter />,
        text: 'Twitter',
        href: 'https://twitter.com/harshhhdev',
        newTab: true,
        shortcuts: { modifier: 'alt', keys: ['t'] }
      },
      {
        icon: <FiGithub />,
        text: 'GitHub',
        href: 'https://github.com/harshhhdev',
        newTab: true,
        shortcuts: { keys: ['g', 'h'] }
      },
      {
        text: 'Dribbble',
        href: 'https://dribbble.com/harshhhdev',
        newTab: true
      },
      {
        icon: <FiLinkedin />,
        text: 'Linkedin',
        href: 'https://linkedin.com/in/harshhhdev',
        newTab: true
      }
    ]
  }
]

const Component = () => {
  const [commands, setCommands] = useCommands(main)
  
  /* ... */
}
```

### useKmenu Hook

`useKmenu` is a utility hook that gives you some useful functions and information about the current status of the palette. You can use these for a multitude of different things such as nested routes on the command menu or for toggling the palette through a button on your UI.

Here's a list of all the information it provides: 

| Parameter  | Description                                                              | Type                             |
|------------|--------------------------------------------------------------------------|----------------------------------|
| input      | The current text in the search bar of the palette that is currently open | string                           |
| open       | The index of the palette is currently open                               | number                           |
| setOpen    | The setter function to change the open state                             | Dispatch<SetStateAction<number>> |
| toggle     | The function for toggling the main palette open/close                    | void                             |

With that, here's also a code example of how you could use this hook!

_NOTE: YOU MUST WRAP YOUR COMPONENT INSIDE THE MENUPROVIDER TO USE THIS HOOK_

```jsx
import { useKmenu } from 'kmenu'

const Component = () => {
  const [input, open, setOpen, toggle] = useKmenu()
  
  return (
    <div>
      <p>The current text on the search bar is: {input}</p>
      <p>The index of the palette which is currently open is: {open}</p>
      <button onClick={toggle}>Toggle Menu</button>
    </div>
  )
}
```


### useCommands Hook

With [kmenu v1](https://www.npmjs.com/package/kmenu/v/1.0.0-dev), you can now dynamically compute and define commands.

When commands are inputted into the `useCommands` hook, they're returned into an object of command-menu parsable commands, and they require an initial value of the commands you'd like to pass in. 

*NOTE: YOU CANNOT USE `SETCOMMANDS` DIRECTLY INSIDE OF A USEEFFECT HOOK AT RENDER*

Here's an example of the hook live in action:

```jsx
import { CommandMenu, Command, useCommands } from 'kmenu'

const Component = () => {
  const main: Command[] = [ /* ... */ ]
  
  const [commands, setCommands] = useCommands(main)
  
  return 
    <CommandMenu commands={commands} index={1} main />
}
```

### Customising the Palette

You can easily customise the colours on your command palette as well. Here's a list of properties that are customisable: 

_NOTE: ALL PROPERTIES ARE **OPTIONAL**_

| Parameter        | Description                                                  | Type         | Default             | 
|------------------|--------------------------------------------------------------|--------------|---------------------|
| paletteMaxHeight | The max height of the palette (px)                           | number       | 320                 |
| backdropColor    | The colour of the backdrop (include opacity)                 | string       | #00000020           |
| backdropBlur     | The backround blur of the backdrop (px)                      | number       | 5px                 |
| backgroundColor  | The background colour of the palette                         | string       | #181818             |
| borderWidth      | Width of the border surrounding the palette                  | number       | 1px                 |
| borderColor      | The colour of the border surrounding the palette             | string       | #3F3F3F             |
| borderRadius     | The radius of the palette (px)                               | number       | 16px                |
| inputColor       | The colour of the text in the search bar                     | string       | #FFFFFF             |
| placeholderText  | The placeholder input text in the search bar                 | string       | 'What do you need?' |
| headingColor     | The colour of the command category headings                  | string       | #777777             |
| commandInactive  | The colour of the icon and text when the command is inactive | string       | #777777             |
| commandActive    | The colour of the icon and text when the command is active   | string       | #FFFFFF             |
| barBackground    | The background colour of the active bar (include opacity)    | string       | #FFFFFF20           |

### Setting up the palette

Here are all the options available on the palette: 

| Parameter  | Description                                                      | Type                             | Optional | 
|------------|------------------------------------------------------------------|----------------------------------|----------|
| open       | The index of which palette is currently open                     | number                           | ❌       |
| setOpen    | The hook to handle the state for which palette is currently open | Dispatch<SetStateAction<number>> | ❌       |
| index      | The index of this palette                                        | number                           | ❌       |
| commands   | The commands for this palette to display                         | Command[]                        | ❌       |
| categories | The categories which the commands have been assigned to          | string[]                         | ❌       |
| config     | The configuration for this colour palette                        | PaletteConfig                    | ✅       |
| main       | Whether or not this is the first palette that'll be displayed    | boolean                          | ✅       |

Once you have added commands to the palette and configured it to you likings, you can add it into your application. Add in the CSS file for styling. Optionally, if you'd like to FULLY customise the styles on the palette to your likings then you can copy the [index.css file](https://github.com/harshhhdev/harshhhdev.github.io/blob/master/compiled/index.css) from the [repository](https://github.com/harshhhdev/kmenu) and import that instead. You'll also need to create a [useState](https://reactjs.org/docs/hooks-state.html) hook for handling the state.

```jsx
import { useState } from 'react'
import { Palette, Command, PaletteConfig } from 'kmenu'
import 'kmenu/dist/index.css'

const Component = () => {
  const [open, setOpen] = useState(0)

  const commands: Command[] = [ /* ... */ ]
  const config: PaletteConfig = { /* ... */ }
  const categories: string[] = [ /* ... */ ]

  return (
    /* ... */
    <Palette
      open={open}
      setOpen={setOpen}
      index={1}
      commands={commands}
      config={config}
      categories={categories}
      main
    />
    /* ... */
  )
}
// ...
export default Component
```

That's about all the configuration you'll need to do in order to get a basic command palette to work!

### Nested Palettes 

This library also provides support for nested palettes and commands. Here's an example to help you out:

```tsx
import { useState } from 'react'
import Palette, { Command, PaletteConfig } from 'kmenu'
import 'kmenu/dist/index.css'

const Palette = () => {
  const [open, setOpen] = useState(0)

  const mainCommands: Command[] = [
    {
      icon: <FiGlobe />,
      text: 'Website',
      href: 'https://hxrsh.in',
      newTab: true,
      keywords: 'home',
      category: 'Socials'
    },
    {
      icon: <FiArrowRight />,
      text: 'Nested Example...',
      perform: () => setOpen(2),
      category: 'Utility'
    },
  ]

  const nestedExample: Command[] = [
    {
      icon: <FiGlobe />,
      text: 'Demo',
      href: 'https://kmenu.hxrsh.in',
      newTab: true,
      keywords: 'home',
      category: 'Resources'
    },
    {
      icon: <FiGlobe />,
      text: 'GitHub',
      href: 'https://github.com/harshhhdev/kmenu',
      newTab: true,
      keywords: 'source',
      category: 'Resources'
    },
  ]

  const config: PaletteConfig = { /* ... */ }
  const categories: string[] = [ /* ... */ ]

  return (
    /* ... */
    <Palette
      open={open}
      setOpen={setOpen}
      index={1}
      commands={mainCommands}
      config={config}
      categories={categories}
      main
    />
    <Palette
      open={open}
      setOpen={setOpen}
      index={2}
      commands={nestedExample}
      config={config}
      categories={categories}
    />
    /* ... */
  )
}
// ...
export default Palette
```

If this isn't enough, there's also an [example](https://github.com/harshhhdev/kmenu/blob/master/example) directory which you can clone and experiment around with to build nested routes!

### Using the useShortcut hook

This library also ships with a [custom React hook](https://reactjs.org/docs/hooks-custom.html) called `useShortcut` which you can use to define your own shortcuts within your application. 

| Parameter       | Description                                           | Type                       | Optional  | 
|-----------------|-------------------------------------------------------|----------------------------|-----------|
| targetKey       | The key that the shortcut is listening for            | string (must be valid key) | ❌        |
| modifier        | The modifier key which can will activate the shortcut | enum (shift/alt/ctrl)      | ✅        |

Here's an example: 

```jsx
import { useShortcut } from 'kmenu'

const Palette = () => {
  const shiftS = useShortcut('s', 'shift')

  // ...
}
// ...
export default Palette
```

The example below will run when someone uses the keyboard shortcut `shift+s`.

# 💻 Development

Run the project locally

```
git clone https://github.com/harshhhdev/kmenu.git
```

### Setting up the project

```zsh
cd kmenu

# Install dependencies
yarn
```

Next, start the development server:

```zsh
yarn start
```

This should compile an instance of your project to the `dist` folder. It should re-build everytime you save a new change.

### Using the package

You can test the built package locally by running the example repository:

```zsh
cd example

# Install dependencies
yarn

# Start development server
yarn start
```

Awesome. Your React development server should now be running on [port 3000](http://localhost:3000).

# 🔧 Tools Used

- [create-react-library](https://www.npmjs.com/package/create-react-library)
- [TypeScript](https://www.typescriptlang.org/)
- [Microbundle](https://github.com/developit/microbundle)
- [React](https://reactjs.org/)
- [Framer Motion](https://framer.com/motion/)
- [Prettier](https://prettier.io/)
- [ESLint](https://eslint.org/)

# 🤞 Contributing

After setting up the project, and making changes:

```git
git add .
git commit -m "commit message"
git push YOUR_REPO_URL YOUR_BRANCH
```

# Inspirations 

- [Vercel](https://vercel.com)
- [Ultra](https://ultra.tf) 
- [GitHub](https://github.com)
- [CommandBar](https://commandbar.com)
